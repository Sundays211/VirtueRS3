package org.virtue.game.map.square.load;

public enum MapsFile {
	LOCATIONS(0),
	FILE_1(1),
	NPC_SPAWNS(2),
	TERRAIN(3),
	FILE_4(4),
	FILE_5(5),
	FILE_6(6),
	FILE_7(7),
	FILE_8(8);

	private final int js5FileId;

	MapsFile(int id) {
    	js5FileId = id;
    }
	
	public int getJs5FileId () {
		return js5FileId;
	}
}
