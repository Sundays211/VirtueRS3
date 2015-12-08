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
package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.WidgetModelEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.OutgoingEventType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/12/2014
 */
public class WidgetModelEventEncoder implements EventEncoder<WidgetModelEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, WidgetModelEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		switch (context.getType()) {
		case PLAYER_MODEL_OTHER:
			buffer.putPacket(OutgoingEventType.IF_SETPLAYERMODEL_OTHER);
			buffer.putIntB((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			buffer.putIntB(context.getSettings());
			buffer.putLEShortA(context.getMediaID());
			break;
		case PLAYER_MODEL_SELF:
			buffer.putPacket(OutgoingEventType.IF_SETPLAYERMODEL_SELF);
			buffer.putIntA((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			break;
		case NPC_HEAD:
			buffer.putPacket(OutgoingEventType.IF_SETNPCHEAD);
			buffer.putInt(context.getMediaID());
			buffer.putLEInt((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			break;
		case PLAYER_HEAD_SELF:
			buffer.putPacket(OutgoingEventType.IF_SETPLAYERHEAD_SELF);
			buffer.putInt((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			break;
		case PLAYER_HEAD_OTHER:
			buffer.putPacket(OutgoingEventType.IF_SETPLAYERHEAD_OTHER);
			buffer.putShort(context.getMediaID());
			buffer.putLEInt(context.getSettings());
			buffer.putLEInt((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			break;
		case ANIMATION:
			buffer.putPacket(OutgoingEventType.IF_SETANIM);
			buffer.putIntB(context.getMediaID());
			buffer.putLEInt((context.getWidgetID() << 16) | (context.getComponentID() & 0xffff));
			break;
		}
		return buffer;
	}

}
