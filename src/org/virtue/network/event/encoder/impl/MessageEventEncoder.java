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

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.MessageEventContext;
import org.virtue.network.event.context.impl.out.QuickMessageEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.utility.text.Huffman;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 7, 2014
 */
public class MessageEventEncoder implements EventEncoder<MessageEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, MessageEventContext context) {
		OutboundBuffer buffer;
		switch (context.getChannelType()) {
		case PUBLIC_UNFILTERABLE:
		case PUBLIC:
		case PUBLIC_QUICKCHAT:
			buffer = encodePublicMessage(player, context);
			break;
		case PRIVATE:
		case PRIVATE_UNFILTERABLE:
			buffer = encodePrivateMessage(player, context);
			break;
		case PRIVATE_QUICKCHAT:
			buffer = encodePrivateQuickMessage(player, (QuickMessageEventContext) context);
			break;
		case PRIVATE_ECHO:
			buffer = encodePrivateEchoMessage(player, context);
			break;
		case PRIVATE_ECHO_QUICKCHAT:
			buffer = encodePrivateEchoQuickMessage(player, (QuickMessageEventContext) context);
			break;
		case FRIENDCHANNEL:
			buffer = encodeFriendChatMessage(player, context);
			break;
		case FRIENDCHANNEL_QUICKCHAT:
			buffer = encodeFriendQuickMessage(player, (QuickMessageEventContext) context);
			break;
		case CLANCHANNEL:
			buffer = encodeClanChatMessage(player, context, true);
			break;
		case CLANCHANNEL_SYSTEM:
			buffer = encodeClanBroadcast(player, context, true);
			break;
		case CLANCHANNEL_QUICKCHAT:
			buffer = encodeClanQuickMessage(player, (QuickMessageEventContext) context, true);
			break;
		case CLANCHANNEL_GUEST:
			buffer = encodeClanChatMessage(player, context, false);
			break;
		case CLANCHANNEL_GUEST_SYSTEM:
			buffer = encodeClanBroadcast(player, context, false);
			break;
		case CLANCHANNEL_GUEST_QUICKCHAT:
			buffer = encodeClanQuickMessage(player, (QuickMessageEventContext) context, false);
			break;
		case FRIENDCHANNEL_SYSTEM:
		case PRIVATE_SYSTEM:
		default:
			buffer = encodeSystemMessage(player, context);
			break;
		}
		return buffer;
	}
	
	private OutboundBuffer encodeSystemMessage(Player player, MessageEventContext context) {
		int flags = 0x0;
		if (context.getName() != null && !context.getName().isEmpty()) {
			flags |= 0x1;
			if (context.hasFilteredName()) {
				flags |= 0x2;
			}
		}
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_GAME, player);
		buffer.putSmart(context.getChannelType().getType());
		buffer.putInt(0);
		buffer.putByte(flags);
		if ((flags & 0x1) != 0) {
			buffer.putString(context.getName());
			if ((flags & 0x2) != 0) {
				buffer.putString(context.getNameUnfiltered());
			}
		}

		int maxSize = 255 - buffer.offset();
		String message = context.getMessage();
		if (message.length() > maxSize) {
			message = message.substring(0, maxSize);
		}
		buffer.putString(message);
		buffer.finishVarByte();
		return buffer;
	}

	private OutboundBuffer encodePublicMessage(Player player, MessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_PUBLIC, player);
		buffer.putShort(context.getPlayerIndex());
		int flags = context.getEffects();
		if (context instanceof QuickMessageEventContext) {
			flags |= 0x8000;
		}
		buffer.putShort(flags);
		buffer.putByte(context.getRights().getId());
		if (context instanceof QuickMessageEventContext) {
			QuickChatMessage message = ((QuickMessageEventContext) context).getQuickMessage();
			buffer.putShort(message.getType().getId());
			message.getType().pack(buffer, message.getCommands());
		} else {
			Huffman.compress(buffer, context.getMessage());
		}
		buffer.finishVarByte();
		return buffer;
	}

	private OutboundBuffer encodePrivateMessage(Player player, MessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.MESSAGE_PRIVATE, player);
		buffer.putByte(context.hasFilteredName() ? 1 : 0);
		buffer.putString(context.getName());
		if (context.hasFilteredName()) {
			buffer.putString(context.getNameUnfiltered());
		}
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		Huffman.compress(buffer, context.getMessage());
		buffer.finishVarShort();
		return buffer;
	}

	private OutboundBuffer encodePrivateQuickMessage(Player player, QuickMessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_QUICKCHAT_PRIVATE, player);
		buffer.putByte(context.hasFilteredName() ? 1 : 0);
		buffer.putString(context.getName());
		if (context.hasFilteredName()) {
			buffer.putString(context.getNameUnfiltered());
		}
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		buffer.putShort(context.getQuickMessage().getType().getId());
		context.getQuickMessage().getType().pack(buffer, context.getQuickMessage().getCommands());
		buffer.finishVarByte();
		return buffer;
	}

	private OutboundBuffer encodePrivateEchoMessage(Player player, MessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.MESSAGE_PRIVATE_ECHO, player);
		buffer.putString(context.getName());
		Huffman.compress(buffer, context.getMessage());
		buffer.finishVarShort();
		return buffer;
	}

	private OutboundBuffer encodePrivateEchoQuickMessage(Player player, QuickMessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_QUICKCHAT_PRIVATE_ECHO, player);
		buffer.putString(context.getName());
		buffer.putShort(context.getQuickMessage().getType().getId());
		context.getQuickMessage().getType().pack(buffer, context.getQuickMessage().getCommands());
		buffer.finishVarByte();
		return buffer;
	}

	private OutboundBuffer encodeFriendChatMessage(Player player, MessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_FRIENDCHAT, player);
		buffer.putByte(context.hasFilteredName() ? 1 : 0);
		buffer.putString(context.getName());
		if (context.hasFilteredName()) {
			buffer.putString(context.getNameUnfiltered());
		}
		buffer.putString(context.getClan());
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		Huffman.compress(buffer, context.getMessage());
		buffer.finishVarByte();
		return buffer;
	}

	private OutboundBuffer encodeFriendQuickMessage(Player player, QuickMessageEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_QUICKCHAT_FRIENDCHAT, player);
		buffer.putByte(context.hasFilteredName() ? 1 : 0);
		buffer.putString(context.getName());
		if (context.hasFilteredName()) {
			buffer.putString(context.getNameUnfiltered());
		}
		buffer.putString(context.getClan());
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		buffer.putShort(context.getQuickMessage().getType().getId());
		context.getQuickMessage().getType().pack(buffer, context.getQuickMessage().getCommands());
		buffer.finishVarByte();
		return buffer;
	}
	
	private OutboundBuffer encodeClanChatMessage(Player player, MessageEventContext context, boolean isAffined) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_CLANCHANNEL, player);
		buffer.putByte(isAffined ? 1 : 0);
		buffer.putString(context.getName());
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		Huffman.compress(buffer, context.getMessage());
		buffer.finishVarByte();
		return buffer;
	}
	
	private OutboundBuffer encodeClanQuickMessage(Player player, QuickMessageEventContext context, boolean isAffined) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_QUICKCHAT_CLANCHANNEL, player);
		buffer.putByte(isAffined ? 1 : 0);
		buffer.putString(context.getName());
		buffer.putBytes(context.getHash());
		buffer.putByte(context.getRights().getId());
		buffer.putShort(context.getQuickMessage().getType().getId());
		context.getQuickMessage().getType().pack(buffer, context.getQuickMessage().getCommands());
		buffer.finishVarByte();
		return buffer;
	}
	
	private OutboundBuffer encodeClanBroadcast(Player player, MessageEventContext context, boolean isAffined) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarByte(ServerProtocol.MESSAGE_CLANCHANNEL_SYSTEM, player);
		buffer.putByte(isAffined ? 1 : 0);
		buffer.putBytes(context.getHash());
		Huffman.compress(buffer, context.getMessage());
		buffer.finishVarByte();
		return buffer;
	}

}
