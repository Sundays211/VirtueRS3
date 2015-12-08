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
import org.virtue.network.event.context.impl.out.ClanSettingsEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.OutgoingEventType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/12/2014
 */
public class ClanSettingsEventEncoder implements EventEncoder<ClanSettingsEventContext> {

	public static int VERSION = 5;

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, ClanSettingsEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(OutgoingEventType.CLANSETTINGS_FULL, player);
		buffer.putByte(context.isGuestData() ? 0 : 1);
		
		buffer.putByte(VERSION);
		int flags = 0;
		flags |= 0x2;//Use display names
		buffer.putByte(flags);
		buffer.putInt(context.getUpdateNumber());
		buffer.putInt(0);//TODO: Find out what this does
		buffer.putShort(context.getMembers().length);
		buffer.putByte(context.getBans().length);
		buffer.putString(context.getClanName());
		if (VERSION >= 4) {
			buffer.putInt(0);//This isn't currently used on the client side
		}
		buffer.putByte(context.allowNonMembers() ? 1 : 0);
		buffer.putByte(context.getMinTalk().getID());
		buffer.putByte(context.getMinKick().getID());
		buffer.putByte(0);//Lootshare - Not currently available for clans
		buffer.putByte(0);//TODO: Find out what this does
		for (ClanSettingsEventContext.Member member : context.getMembers()) {
			packMember(buffer, member);
		}
		
		for (String ban : context.getBans()) {
			buffer.putString(ban);
		}
		
		if (VERSION >= 3) {
			buffer.putShort(context.getVarValues().length);
			for (ClanSettingsEventContext.Variable var : context.getVarValues()) {
				packVarClanSetting(buffer, var.getKey(), var.getValue());
			}
		}
		
		buffer.finishVarShort();
		return buffer;
	}
	
	private void packVarClanSetting (OutboundBuffer buffer, int key, Object value) {
		int type = (value instanceof Integer) ? 0 : ((value instanceof Long) ? 1 : ((value instanceof String) ? 2 : 3));
		key &= 0x3fffffff;
		key |= type << 30;
		buffer.putInt(key);
		switch (type) {
		case 0:
			buffer.putInt((Integer) value);
			break;
		case 1:
			buffer.putLong((Long) value);
			break;
		case 2:
			buffer.putString((String) value);
			break;
		default:
			break;
		}
	}
	
	private void packMember (OutboundBuffer buffer, ClanSettingsEventContext.Member member) {
		buffer.putString(member.getDisplayName());
		buffer.putByte(member.getRank().getID());
		if (VERSION >= 2) {
			buffer.putInt(member.getVarValue());
		}
		if (VERSION >= 5) {
			buffer.putShort(member.getJoinDay());//Recruitment day (days since 22 February 2002)
		}
		if (VERSION >= 6) {
			buffer.putByte(0);//TODO: Find out what this boolean does
		}
	}

}
