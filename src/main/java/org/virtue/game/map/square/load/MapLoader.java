package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.ResourceProvider;
import org.virtue.cache.sqlite.SqliteCache;
import org.virtue.config.ConfigProvider;
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
	
	private ResourceProvider extraData;

	private TerrainLoader terrainLoader;

	private LocationLoader locLoader;

	private NpcSpawnLoader npcLoader;

	public MapLoader(Cache cache, ConfigProvider configProvider, Properties properties) throws IOException {
		this.cache = cache;
		this.terrainLoader = new TerrainLoader();
		this.locLoader = new LocationLoader(configProvider.getLocTypes());
		this.npcLoader = new NpcSpawnLoader(configProvider.getNpcTypes());
		
		String extraDataFilename = properties.getProperty("map.data.file");
		if (extraDataFilename != null) {
			Path extraDataFile = Paths.get(extraDataFilename);
			if (Files.exists(extraDataFile)) {
				this.extraData = new SqliteCache(extraDataFile);
			} else {
				LOGGER.warn("Extra map data not found at {}", extraDataFile);
			}
		}

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

		int locCount=0, npcCount=0, extraNpcCount=0;

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
		} else if (extraData != null && extraData.fileExists(groupId, MapsFile.NPC_SPAWNS)) {
			square.setLoadStage(LoadStage.LOADING_NPCS);
			extraNpcCount = npcLoader.loadNpcs(extraData.getFile(groupId, MapsFile.NPC_SPAWNS), square);
		}

		square.setLoadStage(LoadStage.COMPLETED);
		LOGGER.info("Found {} locations, {} stored npcs, and {} extra npcs in map square {}", locCount, npcCount, extraNpcCount, square);
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
