package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.VarcEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.OutgoingEventType;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 12/02/2015
 */
public class VarcEventEncoder implements EventEncoder<VarcEventContext> {

	@Override
	public OutboundBuffer encode(Player player, VarcEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		if (context.isBit()) {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(OutgoingEventType.VARCBIT_LARGE, player);//Large
				buffer.putLEInt(context.getValue());
				buffer.putLEShort(context.getKey());
			} else {
				buffer.putPacket(OutgoingEventType.VARCBIT_SMALL, player);//Small
				buffer.putLEShortA(context.getKey());
				buffer.putS(context.getValue());
			}
		} else {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(OutgoingEventType.VARC_LARGE, player);
				buffer.putInt(context.getValue());
				buffer.putLEShortA(context.getKey());
			} else {
				buffer.putPacket(OutgoingEventType.VARC_SMALL, player);
				buffer.putLEShortA(context.getKey());
				buffer.putA(context.getValue());
			}
		}
		return buffer;
	}
}
