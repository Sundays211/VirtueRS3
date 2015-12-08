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
package org.virtue.network.event.context.impl.out;

import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/02/2015
 */
public class ExchangeEventContext implements GameEventContext {
	
	private int slot;
	private ExchangeOfferStatus status;
	private boolean isSell;
	private int itemID;
	private int offerPrice;
	private int offerCount;
	private int offerCompletedCount;
	private int offerCompletedGold;
	
	public ExchangeEventContext (int slot, ExchangeOfferStatus status, boolean isSell, int itemID, int offerPrice, int amount, int amountProcessed, int coinsReceived) {
		this.slot = slot;
		this.status = status;
		this.isSell = isSell;
		this.itemID = itemID;
		this.offerPrice = offerPrice;
		this.offerCount = amount;
		this.offerCompletedCount = amountProcessed;
		this.offerCompletedGold = coinsReceived;
	}
	
	public int getSlot () {
		return slot;
	}
	
	public ExchangeOfferStatus getStatus () {
		return status;
	}
	
	public boolean isSellOffer () {
		return isSell;
	}
	
	public int getItemID () {
		return itemID;
	}
	
	public int getOfferPrice () {
		return offerPrice;
	}
	
	public int getOfferCount () {
		return offerCount;
	}
	
	public int getCompletedCount () {
		return offerCompletedCount;
	}
	
	public int getCompletedGold () {
		return offerCompletedGold;
	}

}
