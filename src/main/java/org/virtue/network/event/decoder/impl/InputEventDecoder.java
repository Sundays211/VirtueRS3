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
import org.virtue.network.event.context.impl.in.InputEventContext;
import org.virtue.network.event.context.impl.in.InputEventContext.InputType;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 6/11/2014
 */
public class InputEventDecoder implements EventDecoder<InputEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(org.virtue.game.entity.player.Player, int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public InputEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		Object value;
		InputType type;
		switch (ClientProtocol.forOpcode(opcode)) {
		case RESUME_P_COUNTDIALOG:
			type = InputType.COUNT;
			value = buffer.getInt();
			break;
		case RESUME_P_STRINGDIALOG:
			type = InputType.STRING;
			value = buffer.getString();
			break;
		case RESUME_P_NAMEDIALOG:
			type = InputType.NAME;
			value = buffer.getString();
			break;
		case RESUME_PAUSEBUTTON:
			type = InputType.BUTTON;
			long slot = buffer.getLEShortA() & 0xffff;
			long ifHash = buffer.getInt();
			value = new Long((slot << 32) | ifHash);
			break;
		case RESUME_P_OBJDIALOG:
			type = InputType.OBJ;
			value = buffer.getUnsignedShort();
			break;
		case RESUME_P_HSLDIALOG:
			type = InputType.HSL;
			value = buffer.getUnsignedShort();
			break;
		default:
			value = null;
			type = null;
		}
		return new InputEventContext(type, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public ClientProtocol[] getTypes() {
		return new ClientProtocol[] { ClientProtocol.RESUME_P_COUNTDIALOG,
				ClientProtocol.RESUME_P_STRINGDIALOG, ClientProtocol.RESUME_P_NAMEDIALOG,
				ClientProtocol.RESUME_PAUSEBUTTON, ClientProtocol.RESUME_P_OBJDIALOG,
				ClientProtocol.RESUME_P_HSLDIALOG };
	}

}
