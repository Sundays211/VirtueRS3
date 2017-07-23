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
package org.virtue.game.entity.player;

import org.virtue.Virtue;
import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Inventory;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.parser.ParserType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 18/02/2015
 */
public class ExchangeOffers {
	
	private Player player;	
	private ExchangeOffer[][] offers = new ExchangeOffer[3][8];
	private boolean needsSave = false;
	
	public ExchangeOffers (Player player) {
		this.player = player;
	}
	
	public void init () {
		offers = (ExchangeOffer[][]) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserType.EXCHANGE);
		

		if (offers == null || offers.length != 3) {
			offers = new ExchangeOffer[3][8];
		}
		
		boolean hasOffersWaiting = false;
		for(int exchange = 0; exchange < 3; exchange++) {
			for (int slot=0; slot<8; slot++) {
				if (offers[exchange][slot] != null) {
					if (offers[exchange][slot].isFinished()) {//Finished offers will not be in the database anymore
						offers[exchange][slot].sendOffer(player);
						hasOffersWaiting = true;
					} else {
						Virtue.getInstance().getExchange().requestOffer(player, exchange, slot);
					}
				}
			}
		}
		if (hasOffersWaiting) {
			player.getDispatcher().sendGameMessage("You have items from the Grand Exchange waiting in your collection box.");
		}
	}
	
	public void save () {
		if (needsSave) {
			Virtue.getInstance().getParserRepository().getParser().saveObjectDefinition(offers, player.getUsername(), ParserType.EXCHANGE);
		}
	}
	
	public void onAbort (int exchange, int slot) {
		ExchangeOffer offer = offers[exchange][slot];
		if (offer == null) {
			return;
		}
		offer.setFinished();
		onUpdate(exchange, slot, 0, 0);
	}
	
	public void onUpdate (int exchange, int slot, int totalProcessed, int totalCoins) {
		ExchangeOffer offer = offers[exchange][slot];
		if (offer == null) {
			return;
		}
		if (ExchangeOfferStatus.SUBMITTING.equals(offer.getStatus())) {
			offer.setActive();
		}
		int processed = totalProcessed - offer.getCompletedCount();
		int coins = totalCoins - offer.getCompletedGold();
		int offerInvID = Virtue.getInstance().getConfigProvider().getEnumTypes().list(1078).getValueInt(slot);
		ContainerState offerContainer = ContainerState.getById(offerInvID);
		int returnInvID = Virtue.getInstance().getConfigProvider().getEnumTypes().list(1079).getValueInt(slot);
		ContainerState returnContainer = ContainerState.getById(returnInvID);
		if (offerContainer == null || returnContainer == null) {
			return;
		}
		Inventory offeredItems = player.getInvs().loadContainer(offerContainer);
		Inventory returnedItems = player.getInvs().loadContainer(returnContainer);
		if (processed > 0) {
			offer.processOffer(processed, coins);
			if (offer.isSell()) {
				offeredItems.remove(Item.create(offer.getOfferItem(), processed));
				returnedItems.add(Item.create(995, coins));
				player.getDispatcher().sendGameMessage("<col=66ffff>Grand Exchange: Finished selling " + offer.getCompletedCount() + " x " + Virtue.getInstance().getConfigProvider().getObjTypes().list(offer.getOfferItem()).name + "");
			} else {
				int extraCoins = (coins - offer.getOfferPrice()*processed);
				offeredItems.remove(Item.create(995, coins));
				returnedItems.add(Item.create(offer.getOfferItem(), processed));
				if (extraCoins > 0) {
					returnedItems.add(Item.create(995, extraCoins));
				}
				player.getDispatcher().sendGameMessage("<col=66ffff>Grand Exchange: Finished buying " + offer.getCompletedCount() + " x " + Virtue.getInstance().getConfigProvider().getObjTypes().list(offer.getOfferItem()).name + "");
			}
		}
		
		if (offer.isFinished()) {//If offer was aborted
			Item item = offeredItems.clearSlot(0);
			if (item != null) {
				returnedItems.add(item);
			}
		}
		offer.sendOffer(player);
		player.getInvs().sendContainer(returnContainer);
		needsSave = true;
	}
	
	public void clearOffer (int exchange, int slot) {
		if (slot >= 0 && slot < 8 && exchange >= 0 && exchange < 3) {
			if (offers[exchange][slot] != null) {
				offers[exchange][slot].clear();
				offers[exchange][slot].sendOffer(player);
				needsSave = true;
			}
			offers[exchange][slot] = null;			
		}
	}
	
	public ExchangeOffer getOffer (int exchange, int slot) {
		return offers[exchange][slot];
	}
	
	public void submitOffer (int exchange, int slot, ExchangeOffer offer) {
		offers[exchange][slot] = offer;
		offer.sendOffer(player);
		Virtue.getInstance().getExchange().submitOffer(player, offer);
	}
	
	public void abortOffer (int exchange, int slot) {
		ExchangeOffer offer = offers[exchange][slot];
		if (offer != null && ExchangeOfferStatus.PROCESSING.equals(offer.getStatus())) {
			offer.setFinished();
			Virtue.getInstance().getExchange().abortOffer(player, exchange, slot);
			player.getDispatcher().sendGameMessage("Abort request acknowledged. Please be aware that your offer may have already been completed.");
		} else /*if (offer.isFinished()) {
			player.getActionSender().sendGameMessage("This offer has already finished.");
		} else*/ {
			player.getDispatcher().sendGameMessage("Unable to abort offer at this time - please try again later.");
		}
	}

}
