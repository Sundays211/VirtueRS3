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
import org.virtue.network.event.context.impl.in.MoveEventContext;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 18, 2014
 */
public class MoveEventDecoder implements EventDecoder<MoveEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public MoveEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		boolean forceRun = buffer.getByte() == 1;
		int baseX = buffer.getLEShortA();
		int baseY = buffer.getLEShort();
		return new MoveEventContext(baseX, baseY, forceRun);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] { 
				ClientProtocol.MOVE_MINIMAPCLICK, ClientProtocol.MOVE_GAMECLICK 
		};
	}

}
