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

import org.virtue.model.entity.player.Player;
import org.virtue.network.event.IncomingEventType;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.impl.in.WidgetDragEventContext;
import org.virtue.network.event.decoder.GameEventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 16/11/2014
 */
public class WidgetDragEventDecoder implements GameEventDecoder<WidgetDragEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.GameEventDecoder#createContext(org.virtue.model.entity.player.Player, int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public WidgetDragEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		int from_slot = buffer.getShortA() & 0xffff;
		from_slot = (from_slot == 65535) ? -1 : from_slot;
		
		int from_item = buffer.getShort() & 0xffff;
		from_item = (from_item == 65535) ? -1 : from_item;
		
		int to_item = buffer.getLEShortA() & 0xffff;
		to_item = (to_item == 65535) ? -1 : to_item;
		
		int to_hash = buffer.getIntA();
		
		int from_hash = buffer.getIntB();
		
		int to_slot = buffer.getShort() & 0xffff;
		to_slot = (to_slot == 65535) ? -1 : to_slot;
		
		return new WidgetDragEventContext(from_hash, from_slot, from_item, to_hash, to_slot, to_item);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.GameEventDecoder#getTypes()
	 */
	@Override
	public IncomingEventType[] getTypes() {
		return new IncomingEventType[] { IncomingEventType.IF_DRAG };
	}

}
