package org.virtue.game.map.zone;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.buffer.OutboundBuffer;

public class RevealObject implements ZoneUpdatePacket {
	
	private GroundItem object;

	public RevealObject(GroundItem object) {
		this.object = object;
	}

	@Override
	public ZoneProtocol getType() {
		return ZoneProtocol.OBJ_REVEAL;
	}

	@Override
	public void encode(OutboundBuffer buffer, Entity player) {
		buffer.putLEShortA(object.getOwner().getIndex());
		buffer.putShortA(object.getAmount() & 0x7fff);
		buffer.putShortA(object.getId());
		buffer.putC((object.getOffsetX() & 0x7) << 4 | object.getOffsetY() & 0x7);
	}

	@Override
	public CoordGrid getTile() {
		return object.getTile();
	}

}
