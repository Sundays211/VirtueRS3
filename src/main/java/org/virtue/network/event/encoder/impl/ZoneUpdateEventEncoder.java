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
package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.game.map.prot.ZoneUpdatePacket;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.ZoneUpdateEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class ZoneUpdateEventEncoder implements EventEncoder<ZoneUpdateEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, ZoneUpdateEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putPacket(context.isFull() ? ServerProtocol.UPDATE_ZONE_FULL_FOLLOWS : ServerProtocol.UPDATE_ZONE_PARTIAL_FOLLOWS, player);
		int localX = context.getCoord().getLocalX(player.getViewport().getBaseTile());
		int localY = context.getCoord().getLocalY(player.getViewport().getBaseTile());
		if (context.isFull()) {
			buffer.putA(context.getCoord().getLevel());
			buffer.putC(localY >> 3);
			buffer.putS(localX >> 3);
		} else {
			buffer.putA(localX >> 3);
			buffer.putS(localY >> 3);
			buffer.putA(context.getCoord().getLevel());
		}
		for (ZoneUpdatePacket packet : context.getPackets()) {
			buffer.putPacket(packet.getType().getServerTransmitID(), player);
			packet.encode(buffer, player);
		}
		return buffer;
	}

}
