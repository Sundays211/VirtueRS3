package org.virtue.network.event.encoder.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.VarpEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.OutgoingEventType;

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
				buffer.putPacket(OutgoingEventType.VARPBIT_LARGE, player);
				buffer.putIntA(context.getValue());
				buffer.putLEShortA(context.getKey());
			} else {
				buffer.putPacket(OutgoingEventType.VARPBIT_SMALL, player);
				buffer.putA(context.getValue());
				buffer.putLEShort(context.getKey());
			}
		} else {
			if (context.getValue() <= Byte.MIN_VALUE || context.getValue() >= Byte.MAX_VALUE) {
				buffer.putPacket(OutgoingEventType.VARP_LARGE, player);
				buffer.putLEInt(context.getValue());
				buffer.putShortA(context.getKey());
			} else {
				buffer.putPacket(OutgoingEventType.VARP_SMALL, player);
				buffer.putByte(context.getValue());
				buffer.putLEShortA(context.getKey());
			}
		}
		return buffer;
	}
}
