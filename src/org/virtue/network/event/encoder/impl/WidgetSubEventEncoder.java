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

import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.OutgoingEventType;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.WidgetSubEventContext;
import org.virtue.network.event.encoder.GameEventEncoder;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 14/02/2015
 */
public class WidgetSubEventEncoder implements GameEventEncoder<WidgetSubEventContext> {

	@Override
	public OutboundBuffer encode(Player player, WidgetSubEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		if (context.getParentEntity() != null) {
			if (context.getParentEntity() instanceof NPC) {
				NPC npc = (NPC) context.getParentEntity();
				buffer.putPacket(OutgoingEventType.IF_OPENSUB_ACTIVE_NPC, player);
				buffer.putIntB(context.getKeys()[2]);
				buffer.putIntB(context.getKeys()[0]);
				buffer.putA(context.alwaysOpen() ? 1 : 0);
				buffer.putShort(context.getWidgetId());
				buffer.putIntA(context.getKeys()[3]);
				buffer.putShortA(npc.getIndex());
				buffer.putInt(context.getKeys()[1]);
				buffer.putInt(context.getRoot() << 16 | context.getComponent());
			}
		} else if (context.getParentLoc() != null) {
			SceneLocation loc = context.getParentLoc();
			buffer.putPacket(OutgoingEventType.IF_OPENSUB_ACTIVE_LOC, player);
			buffer.putByte((loc.getNodeType() << 2) | (loc.getRotation() & 0x3));
			buffer.putIntB(context.getKeys()[3]);
			buffer.putInt(context.getKeys()[1]);
			buffer.putC(context.alwaysOpen() ? 1 : 0);
			buffer.putShort(context.getWidgetId());
			buffer.putIntA(loc.getID());
			buffer.putIntB(context.getRoot() << 16 | context.getComponent());
			buffer.putIntA(context.getKeys()[2]);
			buffer.putIntA(loc.getTile().getTileHash());
			buffer.putLEInt(context.getKeys()[0]);
		} else {
			buffer.putPacket(OutgoingEventType.IF_OPENSUB, player);
			buffer.putIntB(context.getKeys()[3]);
			buffer.putInt(context.getRoot() << 16 | context.getComponent());
			buffer.putLEShort(context.getWidgetId());
			buffer.putIntB(context.getKeys()[0]);
			buffer.putIntB(context.getKeys()[2]);
			buffer.putA(context.alwaysOpen() ? 1 : 0);
			buffer.putIntB(context.getKeys()[1]);
		}
		return buffer;
	}
}
