package org.virtue.network.event.encoder.impl;

import org.virtue.model.entity.player.Player;
import org.virtue.network.event.OutgoingEventType;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.VarcStringEventContext;
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
public class VarcStringEventEncoder implements GameEventEncoder<VarcStringEventContext> {

	@Override
	public OutboundBuffer encode(Player player, VarcStringEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
			if (context.getValue().length() >= Byte.MAX_VALUE) {
				buffer.putVarShort(OutgoingEventType.VARCSTR_LARGE, player);
				buffer.putShortA(context.getKey());
				buffer.putString(context.getValue());
				buffer.finishVarShort();
			} else {
				buffer.putVarByte(OutgoingEventType.VARCSTR_SMALL, player);
				buffer.putShort(context.getKey());
				buffer.putString(context.getValue());
				buffer.finishVarByte();
			}
		return buffer;
	}
}
