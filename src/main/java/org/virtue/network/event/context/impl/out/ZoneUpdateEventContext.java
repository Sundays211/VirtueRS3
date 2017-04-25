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
package org.virtue.network.event.context.impl.out;

import java.util.Collection;

import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.zone.ZoneUpdatePacket;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class ZoneUpdateEventContext implements GameEventContext {
	
	private Collection<ZoneUpdatePacket> packets;
	
	private ZoneUpdatePacket packet;
	
	private Tile tile;
	
	public ZoneUpdateEventContext (Collection<ZoneUpdatePacket> packets, Tile tile) {
		this.packets = packets;
		this.tile = tile;
	}
	
	public ZoneUpdateEventContext (ZoneUpdatePacket packet) {
		this.packet = packet;
		this.tile = packet.getTile();
	}
	
	public Collection<ZoneUpdatePacket> getPackets () {
		return packets;
	}
	
	public ZoneUpdatePacket getPacket () {
		return packet;
	}
	
	public boolean isSingle () {
		return packets == null;
	}
	
	public Tile getTile () {
		return tile;
	}
}
