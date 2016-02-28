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
package org.virtue.network.event.decoder.impl;

import org.virtue.game.content.social.ChannelRank;
import org.virtue.game.content.social.SocialType;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.impl.in.SocialEventContext;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 13, 2014
 */
public class SocialEventDecoder implements EventDecoder<SocialEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public SocialEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		ClientProtocol type = ClientProtocol.forOpcode(opcode);		
		String name = buffer.available() > 0 ? buffer.getString() : "";
		String note;
		switch (type) {
		case FRIENDLIST_ADD:
			return new SocialEventContext(SocialType.ADD_FRIEND, name);
		case IGNORELIST_ADD:
			return new SocialEventContext(SocialType.ADD_IGNORE, name);
		case FRIENDLIST_DEL:
			return new SocialEventContext(SocialType.REMOVE_FRIEND, name);
		case IGNORELIST_DEL:
			return new SocialEventContext(SocialType.REMOVE_IGNORE, name);
		case FRIENDCHAT_JOIN_LEAVE:
			return new SocialEventContext(SocialType.JOIN_LEAVE_FRIENDCHAT, name);
		case FRIENDCHAT_KICK:
			return new SocialEventContext(SocialType.KICK_FRIENDCHAT, name);
		case FRIEND_SETRANK:
			ChannelRank rank = ChannelRank.forID(buffer.getByte());
			return new SocialEventContext(SocialType.SET_FRIEND_RANK, name, rank);
		case FRIEND_SETNOTES:
			note = buffer.getString();
			return new SocialEventContext(SocialType.SET_FRIEND_NOTE, note, name);
		case IGNORE_SETNOTES:
			note = buffer.getString();
			return new SocialEventContext(SocialType.SET_IGNORE_NOTE, note, name);
		default:
			break;
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] { ClientProtocol.FRIEND_SETRANK,
				ClientProtocol.FRIENDLIST_ADD, ClientProtocol.FRIENDLIST_DEL,
				ClientProtocol.IGNORELIST_ADD, ClientProtocol.IGNORELIST_DEL,
				ClientProtocol.FRIENDCHAT_JOIN_LEAVE, ClientProtocol.FRIENDCHAT_KICK,
				ClientProtocol.FRIEND_SETNOTES, ClientProtocol.IGNORE_SETNOTES };
	}

}
