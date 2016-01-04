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
package org.virtue.game.content.exchange;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.out.ExchangeEventContext;
import org.virtue.network.event.encoder.impl.ExchangeEventEncoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/02/2015
 */
public class ExchangeOffer {
	
	private ExchangeOfferStatus status;
	private int exchange;
	private final int slot;
	private boolean isSell;
	
	private int offerItem;
	private int offerPrice;
	private int offerCount;
	
	private int offerCompletedCount;
	private int offerCompletedGold;
	
	public ExchangeOffer (int exchange, int slot, boolean isSell, int itemID, int amount, int offerPrice) {
		this(exchange, slot, isSell, itemID, amount, offerPrice, 0, 0);
	}
	
	public ExchangeOffer (int exchange, int slot, boolean isSell, int itemID, int amount, int offerPrice, int processedAmount, int processedCoins) {
		if (amount < 1 || offerPrice < 1) {
			throw new IllegalArgumentException("Offer price and amount must be at least one! amount="+amount+", offerPrice="+offerPrice);
		}
		this.exchange = exchange;
		this.slot = slot;
		this.isSell = isSell;
		this.status = ExchangeOfferStatus.SUBMITTING;
		this.offerItem = itemID;
		this.offerCount = amount;
		this.offerPrice = offerPrice;
		processOffer(processedAmount, processedCoins);
	}
	
	public int getSlot () {
		return slot;
	}
	
	public boolean isSell () {
		return isSell;
	}

	public int getOfferItem () {
		return offerItem;
	}

	public int getOfferCount () {
		return offerCount;
	}

	public int getOfferPrice () {
		return offerPrice;
	}
	
	public ExchangeOfferStatus getStatus () {
		return status;
	}
	
	public int getCompletedCount () {
		return offerCompletedCount;
	}
	
	public int getCompletedGold () {
		return offerCompletedGold;
	}
	
	public int getRemainingAmount () {
		return offerCount - offerCompletedCount;
	}
	
	public void setStatus (ExchangeOfferStatus status) {
		this.status = status;
	}
	
	public void setActive () {
		status = ExchangeOfferStatus.PROCESSING;		
	}
	
	protected void processOffer (int amount, int coins) {
		if (offerCompletedCount + amount > this.offerCount) {
			throw new IllegalArgumentException("Invalid amount: "+amount+" specified, but only "+(this.offerCount - offerCompletedCount)+" remaining.");
		}
		this.offerCompletedCount += amount;
		this.offerCompletedGold += coins;
		if (offerCompletedCount == this.offerCount) {
			setFinished();
		}
	}
	
	public void setFinished () {
		status = ExchangeOfferStatus.FINISHED;
	}
	
	public boolean isFinished () {
		return ExchangeOfferStatus.FINISHED.equals(status);
	}
	
	public void clear () {
		status = ExchangeOfferStatus.EMPTY;
	}
	
	public void sendOffer (Player player) {
		ExchangeEventContext context = new ExchangeEventContext(exchange, slot, status, isSell, offerItem, offerPrice, offerCount, offerCompletedCount, offerCompletedGold);
		player.getDispatcher().sendEvent(ExchangeEventEncoder.class, context);
	}

	public int getExchange() {
		return exchange;
	}
}
