package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.config.loctype.LocShape;
import org.virtue.config.loctype.LocType;
import org.virtue.config.loctype.LocTypeList;
import org.virtue.game.map.square.MapSquare;
import org.virtue.network.event.buffer.InboundBuffer;

public class LocationLoader {

	private static Logger LOGGER = LoggerFactory.getLogger(MapLoader.class);

	private LocTypeList locTypeList;

	public LocationLoader(LocTypeList locTypeList) {
		this.locTypeList = locTypeList;
	}

	public int loadLocations (ByteBuffer data, byte[][][] terrainData, MapSquare mapSquare) throws IOException {
		InboundBuffer buffer = new InboundBuffer(data.array());
		int locTypeId = -1;
		int count = 0;
		for (int modifier = buffer.getSmart2(); modifier != 0; modifier = buffer.getSmart2()) {
			locTypeId += modifier;
			LocType locType = locTypeList.list(locTypeId);
			int posHash = 0;
			for (int posModifier = buffer.getUnsignedSmart(); posModifier != 0; posModifier = buffer.getUnsignedSmart()) {
				count++;
				posHash += posModifier - 1;
				int localY = posHash & 0x3f;
				int localX = posHash >> 6 & 0x3f;
				int level = posHash >> 12;
				int settings = buffer.getUnsignedByte();
				LocShape shape = LocShape.getById(settings >> 2);
				int rotation = settings & 0x3;
				if (terrainData != null && (terrainData[1][localX][localY] & 0x2) == 2) {
					level--;
				}
				if (level < 0 || level >= 4) {
					continue;
				}
				mapSquare.addBaseLocation(locType, localX, localY, level, shape, rotation);
			}
		}
		return count;
	}

	public int loadDynamicLocations(ByteBuffer data, int srcX, int srcY, int srcLevel, int mapRotation,
			byte[][][] terrainData, MapSquare mapSquare,
			int destX, int destY, int destLevel) {
		InboundBuffer buffer = new InboundBuffer(data);
		int locTypeId = -1;
		int count = 0;
		for (int modifier = buffer.getSmart2(); modifier != 0; modifier = buffer.getSmart2()) {
			locTypeId += modifier;
			int posHash = 0;
			for (int posModifier = buffer.getUnsignedSmart(); posModifier != 0; posModifier = buffer.getUnsignedSmart()) {
				posHash += posModifier - 1;
				int locPosY = posHash & 0x3f;
				int locPosX = posHash >> 6 & 0x3f;
				int locLevel = posHash >> 12;
				int settings = buffer.getUnsignedByte();
				if (srcLevel == locLevel
						&& locPosX >= srcX && locPosX < srcX + 8
						&& locPosY >= srcY && locPosY < srcY + 8) {
					count++;
					LocType locType = locTypeList.list(locTypeId);
					if (locType == null) {
						throw new RuntimeException("Invalid locTypeId: "+locTypeId+" at "+locPosX+", "+locPosY+", "+locLevel);
					}
					LocShape shape = LocShape.getById(settings >> 2);
					int locRotation = settings & 0x3;

					int x = destX + getRotatedXPos(locPosX & 0x7, locPosY & 0x7, mapRotation, locType.sizeX, locType.sizeY, locRotation);
					int y = destY + getRotatedYPos(locPosX & 0x7, locPosY & 0x7, mapRotation, locType.sizeX, locType.sizeY, locRotation);

					int newDestLevel = destLevel;
					if (terrainData != null && (terrainData[1][x][y] & 0x2) == 2) {
						newDestLevel--;
					}
					if (newDestLevel >= 0 && newDestLevel < 4) {
						mapSquare.addBaseLocation(locType, x, y, newDestLevel, shape, (locRotation + mapRotation) & 0x3);
					} else {
						LOGGER.warn("Not placing location {} at {},{} because it's level is invalid: {}", locTypeId, x, y, newDestLevel);
					}
				}
			}
		}
		return count;
	}

	public static int getRotatedXPos(int x, int y, int mapRotation, int sizeX, int sizeY, int locRotation) {
		if (1 == (locRotation & 0x1)) {
			int tmp = sizeX;
			sizeX = sizeY;
			sizeY = tmp;
		}
		mapRotation &= 0x3;
		if (0 == mapRotation) {
			return x;
		}
		if (1 == mapRotation) {
			return y;
		}
		if (2 == mapRotation) {
			return 7 - x - (sizeX - 1);
		}
		return 7 - y - (sizeY - 1);
	}

	public static int getRotatedYPos(int x, int y, int mapRotation, int sizeX, int sizeY, int locRotation) {
		if (1 == (locRotation & 0x1)) {
			int tmp = sizeX;
			sizeX = sizeY;
			sizeY = tmp;
		}
		mapRotation &= 0x3;
		if (mapRotation == 0) {
			return y;
		}
		if (mapRotation == 1) {
			return 7 - x - (sizeX - 1);
		}
		if (2 == mapRotation) {
			return 7 - y - (sizeY - 1);
		}
		return x;
	}
}
