package org.virtue.game.map.square.load;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;

import org.virtue.config.npctype.NpcType;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.game.map.square.MapSquare;
import org.virtue.io.pack.Js5DataWriter;
import org.virtue.network.event.buffer.OutboundBuffer;

public class NpcSpawnLoader implements Js5DataWriter {

	private NpcTypeList npcTypeList;

	public NpcSpawnLoader(NpcTypeList npcTypeList) {
		this.npcTypeList = npcTypeList;
	}

	public int loadNpcs(ByteBuffer data, MapSquare square) {
		int npcCount = 0;
		while (data.hasRemaining() && npcCount < 511) {
			npcCount++;
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

	@Override
	public ByteBuffer packData (Path file) throws IOException {
		OutboundBuffer buffer = new OutboundBuffer();
		Files.lines(file).map(line -> line.replaceAll("//.*", "").trim())
				.filter(line -> !line.isEmpty())
				.forEach(line -> {
			String[] parts = line.split("-");
			int npcTypeId = Integer.parseInt(parts[0].trim());
			if (!npcTypeList.exists(npcTypeId)) {
				throw new IllegalArgumentException("Invalid npcTypeId: "+npcTypeId);
			}
			String[] coordParts = parts[1].split(",");
			byte level = Byte.parseByte(coordParts[0].trim());
			if (level < 0 || level > 3) {
				throw new IllegalArgumentException("Invalid level: "+level);
			}
			int localX = Integer.parseInt(coordParts[1].trim());
			if (localX < 0 || localX > 0x3f) {
				throw new IllegalArgumentException("Invalid localX: "+localX);
			}
			int localY = Integer.parseInt(coordParts[2].trim());
			if (localY < 0 || localY > 0x3f) {
				throw new IllegalArgumentException("Invalid localY: "+localY);
			}
			int posHash = level << 14 | localX << 7 | localY;

			buffer.putShort(posHash);
			buffer.putShort(npcTypeId);
		});
		return ByteBuffer.wrap(buffer.buffer(), 0, buffer.offset());
	}
}
