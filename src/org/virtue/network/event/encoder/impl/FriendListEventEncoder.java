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

import org.virtue.game.content.social.friend.Friend;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.FriendListEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 13, 2014
 */
public class FriendListEventEncoder implements EventEncoder<FriendListEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, FriendListEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.UPDATE_FRIENDLIST, player);
		for (Friend f : context.getFriends()) {
			buffer.putByte(context.isNameChange() ? 1 : 0);//Is name change
			packFriend(f, buffer);
		}
		/*if (!context.isEmpty()) {
			buffer.putByte(0);//Is name change
			buffer.putString(context.getFriend().getDisplayName());
			buffer.putString(context.getFriend().getPrevName() == null ? "" : context.getFriend().getPrevName());
			buffer.putShort(context.getFriend().getNodeID());
			buffer.putByte(0);
			buffer.putByte(0);
			if (context.getFriend().getNodeID() > 0) {
				buffer.putString(context.getFriend().getWorldName());
				buffer.putByte(4);
				buffer.putInt(0);
			}
			buffer.putString(context.getFriend().getNote());
		}*/
		buffer.finishVarShort();
		return buffer;
	}
	
	private void packFriend (Friend friend, OutboundBuffer buffer) {
		buffer.putString(friend.getDisplayName());
		buffer.putString(friend.getPrevName() == null ? "" : friend.getPrevName());
		buffer.putShort(friend.getNodeID());
		buffer.putByte(friend.getRank().getId());//Rank
		buffer.putByte(0);//Flags
		if (friend.getNodeID() > 0) {
			buffer.putString(friend.getWorldName());
			buffer.putByte(4);
			buffer.putInt(0);//World flags
		}
		buffer.putString(friend.getNote());
	}

}
