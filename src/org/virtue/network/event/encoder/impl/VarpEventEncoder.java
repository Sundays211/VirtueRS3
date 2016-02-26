package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.VarpEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Tom
 *
 */
public class VarpEventEncoder implements EventEncoder<VarpEventContext> {

	@Override
	public OutboundBuffer encode(Player player, VarpEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		if (context.isBit()) {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(ServerProtocol.VARBIT_LARGE, player);
				buffer.putIntAlt3(context.getValue());
				buffer.putShort(context.getKey());
			} else {
				buffer.putPacket(ServerProtocol.VARBIT_SMALL, player);
				buffer.putS(context.getValue());
				buffer.putShort(context.getKey());
			}
		} else {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(ServerProtocol.VARP_LARGE, player);
				buffer.putIntAlt3(context.getValue());
				buffer.putShort(context.getKey());
			} else {
				buffer.putPacket(ServerProtocol.VARP_SMALL, player);
				buffer.putS(context.getValue());
				buffer.putLEShortA(context.getKey());
			}
		}
		return buffer;
	}
}
