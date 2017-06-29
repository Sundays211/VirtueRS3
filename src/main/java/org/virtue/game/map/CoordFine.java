package org.virtue.game.map;

import java.nio.ByteBuffer;

public class CoordFine {
	public int x;
	public int y;
	public int z;
	public int level;

	public CoordFine() {
		level = -1;
	}
	
	public CoordFine(ByteBuffer buffer) {
		decode(buffer);
	}

	public String toString() {
		return new StringBuilder().append("Level: ")
				.append(level).append(" Coord: ")
				.append(x).append(",")
				.append(z).append(",")
				.append(y).append(" Coord Split: ")
				.append(x >> 15).append(",")
				.append(y >> 15).append(",")
				.append(x >> 9 & 0x3f).append(",")
				.append(y >> 9 & 0x3f).append(",")
				.append(x & 0x1ff).append(",")
				.append(y & 0x1ff).toString();
	}
	
	public void decode(ByteBuffer buffer) {
		level = buffer.get() & 0xff;
		x = buffer.getInt();
		z = buffer.getInt();
		y = buffer.getInt();
	}

}
