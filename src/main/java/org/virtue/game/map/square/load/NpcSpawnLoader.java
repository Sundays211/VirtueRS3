package org.virtue.game.map.square.load;

import java.nio.ByteBuffer;

import org.virtue.config.npctype.NpcType;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.game.map.square.MapSquare;

public class NpcSpawnLoader {
	
	private NpcTypeList npcTypeList;

	public NpcSpawnLoader(NpcTypeList npcTypeList) {
		this.npcTypeList = npcTypeList;
	}

	public int loadNpcs(ByteBuffer data, MapSquare square) {
		int npcCount = 0;
		while (data.hasRemaining() && npcCount < 511) {
			int posHash = data.getShort() & 0xffff;
			int level = posHash >> 14;
			int localX = posHash >> 7 & 0x3f;
			int localY = posHash & 0x3f;
			NpcType npcType = npcTypeList.list(data.getShort() & 0xffff);
			if ((npcType.moveFlags & 0x1) != 0) {
				square.addNpc(npcType, localX, localY, level);
			}
		}
		return npcCount;
	}

}
