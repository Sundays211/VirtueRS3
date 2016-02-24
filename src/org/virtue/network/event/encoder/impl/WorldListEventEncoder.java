/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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

import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.WorldEntry;
import org.virtue.game.world.WorldList;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.WorldListEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 5, 2014
 */
public class WorldListEventEncoder implements EventEncoder<WorldListEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, WorldListEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.WORLDLIST, player);
		
		buffer.putByte(1);
		buffer.putByte(2);
		buffer.putByte(context.isFullUpdate() ? 1 : 0);
		
		if (context.isFullUpdate()) {
			buffer.putSmart(WorldList.entries().size());
			for (WorldEntry world : WorldList.entries()) {
				buffer.putSmart(world.getCountry());
				buffer.putJagString(world.getRegion());
			}
			buffer.putSmart(0);
			buffer.putSmart(WorldList.entries().size() + 1);
			buffer.putSmart(WorldList.entries().size());
			for (WorldEntry world : WorldList.entries()) {
				buffer.putSmart(world.getId());
				buffer.putByte(0);
				buffer.putInt(world.isMembers() ? world.isLootshare() ? 0x1 | 0x8 : 0x1 : 0x8);
				if (world.getActivity().equals("-")) {
					buffer.putSmart(1);
					buffer.putJagString(world.getRegion());
				} else {
					buffer.putSmart(0);
				}
				buffer.putJagString(world.getActivity());
				buffer.putJagString(world.getIp());
			}
			buffer.putInt(-1237212487);
		}
		
		for (WorldEntry world : WorldList.entries()) {
			buffer.putSmart(world.getId());
			buffer.putShort(World.getInstance().getPlayerCount());//World.getInstance().getSize());
		}
		
		buffer.finishVarShort();
		return buffer;
	}

}
