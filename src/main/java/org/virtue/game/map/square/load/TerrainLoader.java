package org.virtue.game.map.square.load;

import java.nio.ByteBuffer;

import org.virtue.game.map.square.ClipMap;
import org.virtue.network.event.buffer.InboundBuffer;

public class TerrainLoader {

	public TerrainLoader() {
		// TODO Auto-generated constructor stub
	}

	public byte[][][] loadTerrain (ByteBuffer data) {
		InboundBuffer buffer = new InboundBuffer(data);
		byte[][][] terrainData = new byte[4][64][64];
		for (int plane = 0; plane < 4; plane++) {
			for (int localX = 0; localX < 64; localX++) {
				for (int localY = 0; localY < 64; localY++) {
					int flags = buffer.getUnsignedByte();
					if ((flags & 0x1) != 0) {
						buffer.getByte();
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x2) != 0) {
						terrainData[plane][localX][localY] = buffer.getByte();
					}
					if ((flags & 0x4) != 0) {
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x8) != 0) {
						buffer.getByte();
					}
				}
			}
		}
		return terrainData;
	}

	public void loadDynamicTerrain (ByteBuffer data, int srcX, int srcY, int srcLevel, int mapRotation,
			byte[][][] terrainData, int destX, int destY, byte destLevel) {
		InboundBuffer buffer = new InboundBuffer(data);
		for (byte level = 0; level < 4; level++) {
			for (int x = 0; x < 64; x++) {
				for (int y = 0; y < 64; y++) {
					int flags = buffer.getUnsignedByte();
					if ((flags & 0x1) != 0) {
						buffer.getByte();
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x2) != 0) {
						if (level == srcLevel
								&& x >= srcX && x < srcX + 8
								&& y >= srcY && y < srcY + 8) {
							int newX = destX + getRotatedXPos(x & 0x7, y & 0x7, mapRotation);
							int newY = destY + getRotatedYPos(x & 0x7, y & 0x7, mapRotation);
							terrainData[destLevel][newX][newY] = buffer.getByte();
						}
					}
					if ((flags & 0x4) != 0) {
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x8) != 0) {
						buffer.getByte();
					}
				}
			}
		}
	}

	public void applyTerrain (byte[][][] terrainData, ClipMap clipMap) {
		for (int plane = 0; plane < 4; plane++) {
			for (int localX = 0; localX < 64; localX++) {
				for (int localY = 0; localY < 64; localY++) {
					if ((terrainData[plane][localX][localY] & 0x1) == 1) {
						int z = plane;
						if ((terrainData[1][localX][localY] & 0x2) == 2) {
							z--;
						}
						if (z >= 0 && z <= 3) {
							clipMap.clipFloor(localX, localY, z);
						}
					}
				}
			}
		}
	}
	
	public static int getRotatedXPos(int x, int y, int rotation) {
		rotation &= 0x3;
		if (0 == rotation) {
			return x;
		}
		if (1 == rotation) {
			return y;
		}
		if (2 == rotation) {
			return 7 - x;
		}
		return 7 - y;
	}

	public static int getRotatedYPos(int x, int y, int rotation) {
		rotation &= 0x3;
		if (rotation == 0) {
			return y;
		}
		if (rotation == 1) {
			return 7 - x;
		}
		if (rotation == 2) {
			return 7 - y;
		}
		return x;
	}
}
