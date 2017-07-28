package org.virtue.game.map.square.load;

import org.virtue.io.Js5FileType;

public enum MapsFile implements Js5FileType {
	LOCATIONS(0, "locations.txt"),
	FILE_1(1, "unk1"),
	NPC_SPAWNS(2, "npcs.txt"),
	TERRAIN(3, "terrain.txt"),
	FILE_4(4, "unk4"),
	FILE_5(5, "unk5"),
	FILE_6(6, "unk6"),
	FILE_7(7, "unk7"),
	FILE_8(8, "unk8");

	private final int js5FileId;

	private final String fileName;

	MapsFile(int id, String fileName) {
		this.js5FileId = id;
		this.fileName = fileName;
	}

	@Override
	public int getJs5FileId () {
		return js5FileId;
	}

	public String getFileName() {
		return fileName;
	}
}
