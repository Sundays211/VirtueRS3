package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.virtue.config.loctype.LocShape;
import org.virtue.config.loctype.LocType;
import org.virtue.config.loctype.LocTypeList;
import org.virtue.game.map.square.MapSquare;
import org.virtue.network.event.buffer.InboundBuffer;

public class LocationLoader {
	
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
				mapSquare.addLocation(locType, localX, localY, level, shape, rotation);
		    }
		}
		return count;
	}
}
