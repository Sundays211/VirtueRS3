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

import org.virtue.game.content.chat.ChatMode;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.impl.in.InMessageEventContext;
import org.virtue.network.event.context.impl.in.InQuickMessageEventContext;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;
import org.virtue.utility.text.Huffman;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 20, 2014
 */
public class PublicMessageEventDecoder implements EventDecoder<InMessageEventContext> {

	@Override
	public InMessageEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		ClientProtocol type = ClientProtocol.forOpcode(opcode);
		if (type == ClientProtocol.MESSAGE_QUICKCHAT_PUBLIC) {
			ChatMode mode = ChatMode.forOpcode(buffer.getUnsignedByte());
			int phraseId = buffer.getUnsignedShort();
			QuickChatMessage message = QuickChatMessage.decodeMessage(phraseId, buffer);
			return new InQuickMessageEventContext(message, mode);
		} else {
			int colourEffect = buffer.getUnsignedByte();
			int moveEffect = buffer.getUnsignedByte();
			String message = Huffman.decompress(buffer);
			return new InMessageEventContext(message, colourEffect, moveEffect);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] { ClientProtocol.MESSAGE_PUBLIC, ClientProtocol.MESSAGE_QUICKCHAT_PUBLIC };
	}

}
