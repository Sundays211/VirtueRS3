package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.VarcEventContext;
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
public class VarcEventEncoder implements EventEncoder<VarcEventContext> {

	@Override
	public OutboundBuffer encode(Player player, VarcEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		if (context.isBit()) {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(ServerProtocol.VARCBIT_LARGE, player);//Large
				buffer.putLEShort(context.getKey());
				buffer.putInt(context.getValue());
			} else {
				buffer.putPacket(ServerProtocol.VARCBIT_SMALL, player);//Small
				buffer.putC(context.getValue());
				buffer.putShort(context.getKey());
			}
		} else {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(ServerProtocol.VARC_LARGE, player);
				buffer.putShort(context.getKey());
				buffer.putInt(context.getValue());
			} else {
				buffer.putPacket(ServerProtocol.VARC_SMALL, player);
				buffer.putC(context.getValue());
				buffer.putLEShort(context.getKey());
			}
		}
		return buffer;
	}
}
