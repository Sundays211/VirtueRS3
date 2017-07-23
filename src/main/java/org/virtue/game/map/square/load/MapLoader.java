package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.ConfigProvider;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.game.map.square.LoadStage;
import org.virtue.game.map.square.MapSquare;

public final class MapLoader {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger LOGGER = LoggerFactory.getLogger(MapLoader.class);

	private ReferenceTable index;
	
	private Cache cache;
	
	private TerrainLoader terrainLoader;
	
	private LocationLoader locLoader;
	
	private NpcSpawnLoader npcLoader;

	public MapLoader(Cache cache, ConfigProvider configProvider) throws IOException {
		this.cache = cache;
		this.terrainLoader = new TerrainLoader();
		this.locLoader = new LocationLoader(configProvider.getLocTypes());
		this.npcLoader = new NpcSpawnLoader(configProvider.getNpcTypes());
		
		ByteBuffer indexData = cache.getStore().read(255, Js5Archive.MAPS.getArchiveId());
		this.index = ReferenceTable.decode(Container.decode(indexData).getData());
		LOGGER.info("Found {} map squares", index.size());
	}
	
	public void loadMapSquare(MapSquare square) {
		try {
			loadSquareChecked(square);
		} catch (Exception ex) {
			LOGGER.warn("Failed loading map square {}", square, ex);
		}
	}
	
	public void loadSquareChecked (MapSquare square) throws IOException {
		square.setLoadStage(LoadStage.STARTING);
		int groupId = getArchiveKey(square.getBaseTile().getRegionX(), square.getBaseTile().getRegionY());
		ReferenceTable.Entry entry = index.getEntry(groupId);
		if (entry == null || entry.getEntry(0) == null) {
			throw new IllegalArgumentException("Unable to load map square "+square+": Invalid groupId "+groupId);
		}
		Archive archive = Archive.decode(cache.read(Js5Archive.MAPS.getArchiveId(), groupId).getData(), entry.size());
		
		int locCount=0, npcCount=0;
		
		//Load terrain
		square.setLoadStage(LoadStage.LOADING_TERRAIN);
		byte[][][] terrainData = terrainLoader.loadTerrain(fetchData(archive, entry, MapsFile.TERRAIN));
		
		//Load locations
		square.setLoadStage(LoadStage.LOADING_LOCS);
		locCount = locLoader.loadLocations(fetchData(archive, entry, MapsFile.LOCATIONS), terrainData, square);
		
		//Load npc spawns, if they exist
		if (entry.getEntry(MapsFile.NPC_SPAWNS.getJs5FileId()) != null) {
			square.setLoadStage(LoadStage.LOADING_NPCS);
			npcCount = npcLoader.loadNpcs(fetchData(archive, entry, MapsFile.NPC_SPAWNS), square);
		}
		
		square.setLoadStage(LoadStage.COMPLETED);
		LOGGER.info("Found {} locations and {} npcs in map square {}", locCount, npcCount, square);
	}
	
	public boolean mapExists (int squareX, int squareY) {
		ReferenceTable.Entry entry = index.getEntry(getArchiveKey(squareX, squareY)) ;
		return entry != null && entry.getEntry(0) != null;
	}
	
	private ByteBuffer fetchData (Archive archive, ReferenceTable.Entry groupEntry, MapsFile file) {
		return archive.getEntry(groupEntry.getEntry(file.getJs5FileId()).index());
	}

	public static int getArchiveKey(int regionX, int regionY) {
		return regionX | regionY << 7;
	}
}
