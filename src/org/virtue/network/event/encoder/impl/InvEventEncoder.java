package org.virtue.network.event.encoder.impl;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.network.event.OutgoingEventType;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.InvEventContext;
import org.virtue.network.event.encoder.GameEventEncoder;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 12/02/2015
 */
public class InvEventEncoder implements GameEventEncoder<InvEventContext> {

	@Override
	public OutboundBuffer encode(Player player, InvEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(context.getSlots() == null ? OutgoingEventType.UPDATE_INV_FULL 
				: OutgoingEventType.UPDATE_INV_PARTIAL, player);
		buffer.putShort(context.getContainerID());
		buffer.putByte(context.isOtherPlayer() ? 1 : 0);
		if (context.getSlots() == null) {
			packFull(buffer, context);
		} else {
			packUpdate(buffer, context);
		}
		buffer.finishVarShort();
		return buffer;
	}

	
	private void packFull (OutboundBuffer buffer, InvEventContext context) {
		buffer.putShort(context.getItems().length);
		for (Item item : context.getItems()) {
			int itemID = -1;
			int amount = 0;
			if (item != null) {
				itemID = item.getId();
				amount = item.getAmount();
			}
			if (amount >= 255) {
				buffer.putC(255);
				buffer.putIntA(amount);
			} else {
				buffer.putC(amount);
			}
			buffer.putShort(itemID + 1);
		}
	}
	
	private void packUpdate (OutboundBuffer buffer, InvEventContext context) {
		for (int slot : context.getSlots()) {
			if (slot < 0) {
				continue;
			}
			buffer.putSmart(slot);
			int itemID = -1;
			int amount = 0;
			Item item = context.getItems()[slot];
			if (item != null) {
				itemID = item.getId();
				amount = item.getAmount();
			}
			buffer.putShort(itemID + 1);
			if (item != null) {
				if (amount >= 255) {
					buffer.putByte(255);
					buffer.putInt(amount);
				} else {
					buffer.putByte(amount);
				}
			}
		}
	}
}
