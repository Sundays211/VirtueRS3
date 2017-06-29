/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.game.map.zone;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 4/11/2014
 */
public class AddUpdateLocation implements ZoneUpdatePacket {
	
	private SceneLocation location;
	
	private int locTypeID;
	
	public AddUpdateLocation (SceneLocation location, int newID) {
		this.location = location;
		this.locTypeID = newID;
	}
	
	public AddUpdateLocation (SceneLocation location) {
		this.location = location;
		this.locTypeID = location.getID();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.packets.SceneUpdatePacket#getType()
	 */
	@Override
	public ZoneProtocol getType() {
		return ZoneProtocol.LOC_ADD_CHANGE;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.packets.SceneUpdatePacket#encode(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.player.Player)
	 */
	@Override
	public void encode(OutboundBuffer buffer, Entity player) {
		buffer.putIntAlt2(locTypeID);
		buffer.putS(((location.getTile().getX() % 8) & 0x7) << 4 | (location.getTile().getY() % 8) & 0x7);
		buffer.putC((location.getRotation() & 0x3) | (location.getShape() << 2));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.packets.SceneUpdatePacket#getTile()
	 */
	@Override
	public CoordGrid getTile() {
		return location.getTile();
	}

}
