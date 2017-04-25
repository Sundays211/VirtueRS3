package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.InvEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 *
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 12/02/2015
 */
public class InvEventEncoder implements EventEncoder<InvEventContext> {

	@Override
	public OutboundBuffer encode(Player player, InvEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(context.getSlots() == null ? ServerProtocol.UPDATE_INV_FULL : ServerProtocol.UPDATE_INV_PARTIAL, player);
		buffer.putShort(context.getContainerID());

		int flags = 0;
		if(context.isOtherPlayer()) {
			flags |= 0x1;
		}

//		TODO: no support yet :p
//		if(context.hasItemProperties())
//			flags |= 0x2;

		buffer.putByte(flags);
		if (context.getSlots() == null) {
			packFull(buffer, context,false); //TODO support needed.
		} else {
			packUpdate(buffer, context,false); //TODO support needed.
		}
		buffer.finishVarShort();
		return buffer;
	}


	private void packFull (OutboundBuffer buffer, InvEventContext context, boolean withProperties) {
		buffer.putShort(context.getItems().length);
		for (Item item : context.getItems()) {
			int itemID = -1;
			int amount = 0;
			if (item != null) {
				itemID = item.getId();
				amount = item.getAmount();
			}
			buffer.putShort(itemID + 1);
			if (amount >= 255) {
				buffer.putByte(255);
				buffer.putInt(amount);
			} else {
				buffer.putByte(amount);
			}
		}
	}

	private void packUpdate (OutboundBuffer buffer, InvEventContext context, boolean withProperties) {
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

				if(withProperties){
					buffer.putByte(0); // Amount of properties.
					//TODO support.
				}
			}
		}
	}
}
