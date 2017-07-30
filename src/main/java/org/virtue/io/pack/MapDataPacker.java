package org.virtue.io.pack;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.FileStore;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.sqlite.WritableSqliteCache;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.game.map.square.load.MapLoader;
import org.virtue.game.map.square.load.MapsFile;
import org.virtue.game.map.square.load.NpcSpawnLoader;

public class MapDataPacker {
	private static Logger LOGGER = LoggerFactory.getLogger(MapDataPacker.class);

	public static void main(String[] args) throws Exception {
		String cachePath = Constants.CACHE_REPOSITORY;
		Path srcPath = Paths.get("data/raw/map");
		Path destFile = Paths.get("data/packed/maps.js5");
		MapDataPacker packer = new MapDataPacker(cachePath);

		packer.pack(srcPath, destFile);
	}

	private Map<MapsFile, Js5DataWriter> dataWriters = new HashMap<>();

	public MapDataPacker(String cachePath) throws IOException {
		initWriters(cachePath);
	}

	private void initWriters (String cachePath) throws IOException {
		Cache cache = new Cache(FileStore.open(cachePath));
		NpcTypeList npcTypeList = new NpcTypeList(cache, null);
		NpcSpawnLoader npcSpawnWriter = new NpcSpawnLoader(npcTypeList);
		dataWriters.put(MapsFile.NPC_SPAWNS, npcSpawnWriter);
	}

	public void pack (Path srcFolder, Path destFile) throws Exception {
		try (WritableSqliteCache dataStore = new WritableSqliteCache(destFile)) {
			Files.walk(srcFolder, 2)
				.map(path -> srcFolder.relativize(path))
				.filter(path -> path.getNameCount() == 2).forEach(path -> {
					int squareX = parseSquareCoord(path.getName(0).toString());
					int squareY = parseSquareCoord(path.getName(1).toString());
					int archiveKey = MapLoader.getArchiveKey(squareX, squareY);
					try {
						int count = writeDataForFolder(dataStore, srcFolder.resolve(path), archiveKey);
						if (count == 0) {
							LOGGER.warn("No supported map files found in folder {},{}", squareX, squareY);
						} else if (count == -1) {
							LOGGER.debug("Skipping map square {},{} as archive is already up-to-date", squareX, squareY);
						} else {
							LOGGER.info("Wrote {} file(s) for map square {},{}", count, squareX, squareY);
						}
					} catch (IOException | RuntimeException ex) {
						throw new RuntimeException("Problem parsing map square "+squareX+","+squareY, ex);
					}
				});
		}
	}

	private int parseSquareCoord (String string) {
		int value = Integer.parseInt(string);
		if (value < 0 || value > 0xff) {
			throw new IllegalArgumentException("Invalid square coord: "+value);
		}
		return value;
	}

	private int writeDataForFolder(WritableSqliteCache dataStore, Path folder, int archiveKey) throws IOException {
		ReferenceTable.Entry indexEntry = dataStore.getIndexEntry(archiveKey)
				.orElse(new ReferenceTable.Entry(-1));
		int newestVersion = dataWriters.keySet().stream()
				.map(fileType -> folder.resolve(fileType.getFileName()))
				.filter(Files::exists)
				.map(file -> {
					try {
						return (int) Files.getLastModifiedTime(file).to(TimeUnit.SECONDS);
					} catch (IOException ex) {
						throw new RuntimeException(ex);
					}
				}).max(Integer::max).orElse(-1);

		if (newestVersion == -1) {
			return 0;
		} else if (newestVersion < indexEntry.getVersion()) {
			return -1;
		}

		SortedMap<Integer, ByteBuffer> files = new TreeMap<>();
		for (Map.Entry<MapsFile, Js5DataWriter> entry : dataWriters.entrySet()) {
			MapsFile fileType = entry.getKey();
			Path file = folder.resolve(fileType.getFileName());
			if (Files.exists(file)) {
				Files.getLastModifiedTime(file);
				indexEntry.putEntry(fileType.getJs5FileId(), new ReferenceTable.ChildEntry(-1));
				files.put(fileType.getJs5FileId(), entry.getValue().packData(file));
			}
		}

		Archive archive = new Archive(files.size());
		final AtomicInteger index = new AtomicInteger();
		files.values().forEach(data -> archive.putEntry(index.getAndIncrement(), data));
		dataStore.putGroup(archiveKey, archive, indexEntry);
		return files.size();
	}
}
