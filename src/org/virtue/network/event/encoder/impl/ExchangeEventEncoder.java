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

import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.ExchangeEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/02/2015
 */
public class ExchangeEventEncoder implements EventEncoder<ExchangeEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, ExchangeEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putPacket(ServerProtocol.UPDATE_EXCHANGE, player);
		buffer.putByte(context.getExchange());
		buffer.putByte(context.getSlot());
		int status = context.getStatus().getCode();
		if (context.isSellOffer() && !ExchangeOfferStatus.EMPTY.equals(context.getStatus())) {
			status |= 0x8;
		}
		buffer.putByte(status);
		if (status != 0) {
			buffer.putShort(context.getItemID());
			buffer.putInt(context.getOfferPrice());
			buffer.putInt(context.getOfferCount());
			buffer.putInt(context.getCompletedCount());
			buffer.putInt(context.getCompletedGold());
		} else {
			buffer.putShort(-1);
			buffer.putInt(1);
			buffer.putInt(1);
			buffer.putInt(1);
			buffer.putInt(1);
		}
		return buffer;
	}

}
