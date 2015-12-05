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
import org.virtue.network.event.context.impl.in.WidgetOnWidgetEventContext;
import org.virtue.network.event.decoder.GameEventDecoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 6/11/2014
 */
public class WidgetOnWidgetEventDecoder implements GameEventDecoder<WidgetOnWidgetEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.GameEventDecoder#createContext(org.virtue.model.entity.player.Player, int, org.virtue.network.event.buffer.InboundBuffer)
	 */
	@Override
	public WidgetOnWidgetEventContext createContext(Player player, int opcode, InboundBuffer buffer) {
		int if2_hash = buffer.getIntB();
		int if2_itemID = buffer.getShort() & 0xffff;
		int if1_hash = buffer.getIntB();
		int if2_slot = buffer.getLEShortA() & 0xffff;
		int if1_itemID = buffer.getShortA() & 0xffff;	
		int if1_slot = buffer.getLEShortA() & 0xffff;
		return new WidgetOnWidgetEventContext(if1_hash, if1_slot == 65535 ? -1 : if1_slot, 
				if1_itemID == 65535 ? -1 : if1_itemID, if2_hash, 
				if2_slot == 65535 ? -1 : if2_slot, if2_itemID == 65535 ? -1 : if2_itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.event.decoder.GameEventDecoder#getTypes()
	 */
	@Override
	public IncomingEventType[] getTypes() {
		return new IncomingEventType[] { IncomingEventType.IF_ON_IF };
	}

}
