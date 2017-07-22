package org.virtue.game.map.square.load;

import java.nio.ByteBuffer;

import org.virtue.game.map.square.ClipMap;
import org.virtue.network.event.buffer.InboundBuffer;

public class TerrainLoader {

	public TerrainLoader() {
		// TODO Auto-generated constructor stub
	}

	public byte[][][] loadTerrain (ByteBuffer data) {
		InboundBuffer buffer = new InboundBuffer(data.array());
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
}
