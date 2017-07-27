package org.virtue.io.pack;

import java.nio.file.Path;

import org.virtue.game.map.square.load.MapsFile;
import org.virtue.io.sqlite.WritableSqliteCache;

public class MapDataPacker {

	private WritableSqliteCache dataStore;

	public MapDataPacker() {
		// TODO Auto-generated constructor stub
	}

	private void parseMapFiles(Path folder) {
		for (MapsFile file : MapsFile.values()) {
			
		}
	}
}
