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
package org.virtue.network.event.decoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.impl.in.CreationEventContext;
import org.virtue.network.event.context.impl.in.CreationEventContext.Type;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;
import org.virtue.utility.XTEACipher;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public class CreationEventDecoder implements EventDecoder<CreationEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public CreationEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		XTEACipher xtea = new XTEACipher(player.getDecodingCipher().getSeeds());
		xtea.decrypt(buffer.buffer(), 0, buffer.length());
		InboundBuffer xteaBuffer = new InboundBuffer(buffer.buffer());
		
		ClientProtocol packetType = ClientProtocol.forOpcode(opcode);
		CreationEventContext context = null;
		switch (packetType) {
		case CREATION_SUBMIT:			
			String email = xteaBuffer.getString();
			String password = xteaBuffer.getString();
			int age = xteaBuffer.getByte();
			boolean sendUpdates = xteaBuffer.getByte() == 1;
			String name = xteaBuffer.getString();
			context = new CreationEventContext(Type.SEND, email, password, age, sendUpdates, name);
			break;
		case CREATION_CHECK_NAME:
			context = new CreationEventContext(Type.CHECKNAME, xteaBuffer.getString());
			break;
		case CREATION_CHECK_EMAIL:
			context = new CreationEventContext(Type.CHECKEMAIL, xteaBuffer.getString());
			break;
		case CREATION_CHECK_AGE:
			context = new CreationEventContext(Type.CHECKAGE, xteaBuffer.getByte());
			break;
		default:
			return null;
		}
		return context;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] {
				ClientProtocol.CREATION_SUBMIT, ClientProtocol.CREATION_CHECK_NAME,
				ClientProtocol.CREATION_CHECK_EMAIL, ClientProtocol.CREATION_CHECK_AGE
		};
	}

}
