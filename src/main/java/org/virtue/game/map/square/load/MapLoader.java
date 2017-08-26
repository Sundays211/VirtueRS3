package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
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
import org.virtue.game.map.square.DynamicMapSquare;
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
		int groupId = getArchiveKey(square.getBaseCoords().getRegionX(), square.getBaseCoords().getRegionY());
		ReferenceTable.Entry entry = index.getEntry(groupId);
		if (entry == null || entry.getEntry(0) == null) {
			throw new IllegalArgumentException("Unable to load map square "+square+": Invalid groupId "+groupId);
		}
		Archive archive = fetchMapSquare(groupId);

		int locCount=0, npcCount=0, extraNpcCount=0;

		//Load terrain
		square.setLoadStage(LoadStage.LOADING_TERRAIN);
		byte[][][] terrainData = terrainLoader.loadTerrain(fetchData(archive, entry, MapsFile.TERRAIN));
		terrainLoader.applyTerrain(terrainData, square.getClipMap());

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

	public void loadDynamicMapSquareUnchecked (DynamicMapSquare square) {
		try {
			loadDynamicMapSquare(square);
		} catch (Exception ex) {
			LOGGER.warn("Failed loading dynamic map square {}", square, ex);
		}
	}

	public void loadDynamicMapSquare (DynamicMapSquare square) throws IOException {
		square.setLoadStage(LoadStage.STARTING);
		long start = System.currentTimeMillis();
		square.preRebuild();//Removes all clips & locations so they can be re-applied
		
		int[][][] allZoneData = square.getZoneData();
		Map<Integer, Archive> baseSquareData = new HashMap<>();
		for (int destLevel = 0; destLevel < 4; destLevel++) {
			for (int destZoneX = 0; destZoneX < 8; destZoneX++) {
				for (int destZoneY = 0; destZoneY < 8; destZoneY++) {
					int zoneData = allZoneData[destLevel][destZoneX][destZoneY];
					if (zoneData != -1) {
						LOGGER.debug("Data for zone {}, {}, {}: {}", destLevel, destZoneX, destZoneY, zoneData);
						int srcZoneX = (zoneData >> 14) & 0x3ff;
						int srcZoneY = (zoneData >> 3) & 0x7ff;
						int groupId = getArchiveKey(srcZoneX / 8, srcZoneY / 8);
						if (!baseSquareData.containsKey(groupId)) {
							baseSquareData.put(groupId, fetchMapSquare(groupId));
						}
					}
				}
			}
		}

		square.setLoadStage(LoadStage.LOADING_TERRAIN);
		byte[][][] terrainData = new byte[4][64][64];
		for (byte destLevel = 0; destLevel < 4; destLevel++) {
			for (int destZoneX = 0; destZoneX < 8; destZoneX++) {
				for (int destZoneY = 0; destZoneY < 8; destZoneY++) {
					int zoneData = allZoneData[destLevel][destZoneX][destZoneY];
					if (zoneData != -1) {
						int srcZoneLevel = (zoneData >> 24) & 0x3;
						int srcZoneX = (zoneData >> 14) & 0x3ff;
						int srcZoneY = (zoneData >> 3) & 0x7ff;
						int mapRotation = (zoneData >> 1) & 0x3;
						int groupId = getArchiveKey(srcZoneX / 8, srcZoneY / 8);
						Archive archive = baseSquareData.get(groupId);
						terrainLoader.loadDynamicTerrain(
								fetchData(archive, index.getEntry(groupId), MapsFile.TERRAIN),
								(srcZoneX << 3) & 0x3f, (srcZoneY << 3) & 0x3f, srcZoneLevel, 
								mapRotation, terrainData, 
								(destZoneX << 3), (destZoneY << 3), destLevel);
					} else {
						for (int localX = 0; localX < 8; localX++) {
							for (int localY = 0; localY < 8; localY++) {
								terrainData[destLevel][destZoneX+localX][destZoneY+localY] = 0x1;
							}
						}
					}
				}
			}
		}
		terrainLoader.applyTerrain(terrainData, square.getClipMap());

		int locCount = 0;
		square.setLoadStage(LoadStage.LOADING_LOCS);
		for (byte destLevel = 0; destLevel < 4; destLevel++) {
			for (int destZoneX = 0; destZoneX < 8; destZoneX++) {
				for (int destZoneY = 0; destZoneY < 8; destZoneY++) {
					int zoneData = allZoneData[destLevel][destZoneX][destZoneY];
					if (zoneData != -1) {
						int srcZoneLevel = (zoneData >> 24) & 0x3;
						int srcZoneX = (zoneData >> 14) & 0x3ff;
						int srcZoneY = (zoneData >> 3) & 0x7ff;
						int mapRotation = (zoneData >> 1) & 0x3;
						int groupId = getArchiveKey(srcZoneX / 8, srcZoneY / 8);
						Archive archive = baseSquareData.get(groupId);
						locCount += locLoader.loadDynamicLocations(
								fetchData(archive, index.getEntry(groupId), MapsFile.LOCATIONS),
								(srcZoneX << 3) & 0x3f, (srcZoneY << 3) & 0x3f, srcZoneLevel, 
								mapRotation, terrainData, square, 
								(destZoneX << 3), (destZoneY << 3), destLevel);
					}
				}
			}
		}

		square.postRebuild();
		long loadTime = System.currentTimeMillis() - start;
		LOGGER.info("Finished loading dynamic map square {}. Source square count: {}, location count: {}, load time: {} ms.", square, baseSquareData.size(), locCount, loadTime);
		square.setLoadStage(LoadStage.COMPLETED);
	}

	public boolean mapExists (int squareX, int squareY) {
		ReferenceTable.Entry entry = index.getEntry(getArchiveKey(squareX, squareY)) ;
		return entry != null && entry.getEntry(0) != null;
	}

	private Archive fetchMapSquare (int groupId) throws IOException {
		ReferenceTable.Entry entry = index.getEntry(groupId);
		if (entry == null || entry.getEntry(0) == null) {
			throw new IllegalArgumentException("Invalid groupId "+groupId+" for square "+(groupId & 0x7f)+", "+(groupId >> 7));
		}
		return Archive.decode(cache.read(Js5Archive.MAPS.getArchiveId(), groupId).getData(), entry.size());
	}
	
	private ByteBuffer fetchData (Archive archive, ReferenceTable.Entry groupEntry, MapsFile file) {
		return archive.getEntry(groupEntry.getEntry(file.getJs5FileId()).index());
	}

	public static int getArchiveKey(int regionX, int regionY) {
		return regionX | regionY << 7;
	}
}
