package org.virtue.core.constants;

public enum MoveSpeed {
	STATIONARY(0, (byte) -1),
	CRAWL(1, (byte) 0),
	WALK(2, (byte) 1),
	RUN(3, (byte) 2),
	INSTANT(4, (byte) 3);

	private byte id;
	
	MoveSpeed(int i, byte id) {
		this.id = id;
	}
	
	public byte getId () {
		return id;
	}
	
	public static MoveSpeed getById (int id) {
		for (MoveSpeed s : values()) {
			if (s.id == id) {
				return s;
			}
		}
		return null;
	}
}
