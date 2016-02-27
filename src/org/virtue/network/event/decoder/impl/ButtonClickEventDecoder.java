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

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.impl.in.ButtonClickEventContext;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 5, 2014
 */
public class ButtonClickEventDecoder implements EventDecoder<ButtonClickEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public ButtonClickEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		int hash = buffer.getLEInt();
		int slot = buffer.getShortA() & 0xffff;
		int objectId = buffer.getShortA() & 0xffff;
		if (slot == 65535) {
			slot = -1;
		}

		return new ButtonClickEventContext(hash, slot, objectId == 65535 ? -1 : objectId, opcode);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] {
				ClientProtocol.IF_BUTTON1, ClientProtocol.IF_BUTTON2,
				ClientProtocol.IF_BUTTON3, ClientProtocol.IF_BUTTON4,
				ClientProtocol.IF_BUTTON5, ClientProtocol.IF_BUTTON6,
				ClientProtocol.IF_BUTTON7, ClientProtocol.IF_BUTTON8,
				ClientProtocol.IF_BUTTON9, ClientProtocol.IF_BUTTON10
		};
	}

}
