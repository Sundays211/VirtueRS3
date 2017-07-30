package org.virtue.game.map.zone;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.SceneLocation;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.game.map.CoordGrid;

public class LocationAnim implements ZoneUpdatePacket {
	
	private SceneLocation location;
	private int animId;
	private int delay;

	public LocationAnim(SceneLocation location, int animId) {
		this(location, animId, 0);
	}

	public LocationAnim(SceneLocation location, int animId, int delay) {
		this.location = location;
		this.animId = animId;
		this.delay = delay;
	}

	@Override
	public ZoneProtocol getType() {
		return ZoneProtocol.LOC_ANIM;
	}

	@Override
	public void encode(OutboundBuffer buffer, Entity player) {
		buffer.putByte(((location.getTile().getX() % 8) & 0x7) << 4 | (location.getTile().getY() % 8) & 0x7);
		buffer.putByte((location.getRotation() & 0x3) | (location.getShape().getId() << 2));
		buffer.putS(delay);
		buffer.putLEInt(animId);
	}

	@Override
	public CoordGrid getTile() {
		return location.getTile();
	}

}
