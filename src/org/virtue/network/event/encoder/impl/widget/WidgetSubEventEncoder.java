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
package org.virtue.network.event.encoder.impl.widget;

import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.widget.WidgetSubEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 *
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 14/02/2015
 */
public class WidgetSubEventEncoder implements EventEncoder<WidgetSubEventContext> {

	@Override
	public OutboundBuffer encode(Player player, WidgetSubEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		if (context.getParentEntity() != null) {
			if (context.getParentEntity() instanceof NPC) {
				NPC npc = (NPC) context.getParentEntity();
				buffer.putPacket(ServerProtocol.IF_OPENSUB_ACTIVE_NPC, player);
				buffer.putInt(context.getKeys()[3]);
				buffer.putInt(context.getRoot() << 16 | context.getComponent());
				buffer.putIntAlt2(context.getKeys()[1]);
				buffer.putInt(context.getKeys()[0]);
				buffer.putC(context.alwaysOpen() ? 1 : 0);
				buffer.putShortA(npc.getIndex());
				buffer.putShort(context.getWidgetId());
				buffer.putIntAlt2(context.getKeys()[2]);
			}
		} else if (context.getParentLoc() != null) {
			SceneLocation loc = context.getParentLoc();
			buffer.putPacket(ServerProtocol.IF_OPENSUB_ACTIVE_LOC, player);
			buffer.putIntAlt3(context.getKeys()[0]);
			buffer.putInt(context.getRoot() << 16 | context.getComponent());
			buffer.putLEInt(loc.getTile().getTileHash());
			buffer.putIntAlt3(context.getKeys()[1]);
			buffer.putC((loc.getNodeType() << 2) | (loc.getRotation() & 0x3));
			buffer.putLEInt(context.getKeys()[3]);
			buffer.putByte(context.alwaysOpen() ? 1 : 0);
			buffer.putLEInt(loc.getID());
			buffer.putIntAlt2(context.getKeys()[2]);
			buffer.putShortA(context.getWidgetId());
		} else {
			buffer.putPacket(ServerProtocol.IF_OPENSUB, player);
			buffer.putLEShortA(context.getWidgetId());
			buffer.putIntAlt2(context.getRoot() << 16 | context.getComponent());
			buffer.putLEInt(context.getKeys()[2]);
			buffer.putIntAlt3(context.getKeys()[1]);
			buffer.putIntAlt2(context.getKeys()[0]);
			buffer.putInt(context.getKeys()[3]);
			buffer.putByte(context.alwaysOpen() ? 1 : 0);
		}
		return buffer;
	}
}
