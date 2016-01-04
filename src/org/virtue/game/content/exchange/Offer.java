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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/02/2015
 */
public class Offer {
	
	private int exchange;
	private long ownerHash;
	private long id;
	private int slot;
	private boolean isSell;
	
	private int itemID;
	private int offerPrice;
	private int offerCount;
	
	private int offerCompletedCount;
	private int offerCompletedGold;
	
	public Offer (int exchange, long ownerHash, long id, int slot, boolean isSell, int itemID, int amount, int offerPrice) {
		if (amount < 1 || offerPrice < 1) {
			throw new IllegalArgumentException("Offer price and amount must be at least one! amount="+amount+", offerPrice="+offerPrice);
		}
		this.exchange = exchange;
		this.ownerHash = ownerHash;
		this.id = id;
		this.slot = slot;
		this.isSell = isSell;
		this.itemID = itemID;
		this.offerCount = amount;
		this.offerPrice = offerPrice;
	}
	
	public Offer (Player owner, long id, ExchangeOffer offer) {
		this.ownerHash = owner.getUserHash();
		this.id = id;
		this.exchange = offer.getExchange();
		this.slot = offer.getSlot();
		this.isSell = offer.isSell();
		this.itemID = offer.getOfferItem();
		this.offerCount = offer.getOfferCount();
		this.offerPrice = offer.getOfferPrice();
	}
	
	public int getExchange() {
		return exchange;
	}
	
	public long getOwner () {
		return ownerHash;
	}
	
	public long getID () {
		return id;
	}
	
	public int getSlot () {
		return slot;
	}
	
	public boolean isSell () {
		return isSell;
	}

	public int getItemID () {
		return itemID;
	}

	public int getOfferCount () {
		return offerCount;
	}

	public int getOfferPrice () {
		return offerPrice;
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
	
	protected void processOffer (int amount, int coins) {
		if (offerCompletedCount + amount > this.offerCount) {
			throw new IllegalArgumentException("Invalid amount: "+amount+" specified, but only "+(this.offerCount - offerCompletedCount)+" remaining.");
		}
		if (this.offerCompletedGold > Integer.MAX_VALUE - coins) {
			throw new ArithmeticException("The addition of the specified number of coins would result in an overflow! Current="+this.offerCompletedGold+", amountToAdd="+coins);
		}
		this.offerCompletedCount += amount;
		this.offerCompletedGold += coins;
	}
	
	public boolean isFinished () {
		return this.offerCount == this.offerCompletedCount;
	}

}
