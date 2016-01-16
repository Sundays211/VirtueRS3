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
import org.virtue.network.event.context.impl.in.WidgetDragEventContext;
import org.virtue.network.event.decoder.EventDecoder;
import org.virtue.network.event.decoder.IncomingEventType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 16/11/2014
 */
public class WidgetDragEventDecoder implements EventDecoder<WidgetDragEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#createContext(org.virtue.game.entity.player.Player, int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public WidgetDragEventContext createContext(Player player, int opcode, InboundBuffer buffer) {		
		int toSlot = buffer.getShortA() & 0xffff;
		toSlot = (toSlot == 65535) ? -1 : toSlot;
		
		int toObject = buffer.getLEShortA() & 0xffff;
		toObject = (toObject == 65535) ? -1 : toObject;
		
		int fromHash = buffer.getIntB();
		
		int fromSlot = buffer.getShortA() & 0xffff;
		fromSlot = (fromSlot == 65535) ? -1 : fromSlot;
		
		int fromObject = buffer.getLEShort() & 0xffff;
		fromObject = (fromObject == 65535) ? -1 : fromObject;
		
		int toHash = buffer.getLEInt();
		
		return new WidgetDragEventContext(fromHash, fromSlot, fromObject, toHash, toSlot, toObject);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.EventDecoder#getTypes()
	 */
	@Override
	public IncomingEventType[] getTypes() {
		return new IncomingEventType[] { IncomingEventType.IF_DRAG };
	}

}
