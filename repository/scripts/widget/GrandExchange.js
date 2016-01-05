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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/02/2015
 */
var api;

var BACKPACK = 93;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 105, 107 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 105) {
			api.setVarp(player, 163, 4);
			api.setVarp(player, 138, -1);//Exchange slot
			api.setVarp(player, 139, -1);//Buy or sell (1=buy, 0=sell)
			api.setVarp(player, 137, 1);//Amount
			api.setVarp(player, 135, -1);//Item ID
			//player.getDispatcher().sendCloseWidget(13, 2);
			api.setVarc(player, 199, -1);
			api.setVarc(player, 3678, -1);
			api.openOverlaySub(player, 1008, 107, false);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 8865, [1]);
			api.setWidgetEvents(player, 107, 4, 0, 27, 14682110);
			api.setWidgetEvents(player, 105, 77, -1, -1, 8650758);
			api.setWidgetEvents(player, 105, 79, -1, -1, 8650758); 
		} else if (interfaceID == 107) {
			api.runClientScript(player, 8862, [0, 2]);
			api.runClientScript(player, 8862, [0, 3]);			
		}
	},

	/* Pressed a button on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 107 && component == 4) {
			switch (option) {
			case 1:
				Exchange.offerItem(player, slot);
				return true;
			}
			return false;
		} else if (interfaceID == 105) {
			switch (component) {	
			case 9://Select item to buy
				Exchange.searchForItem(player);
				return true;
			case 28://View offer 0
				Exchange.viewOffer(player, 0);
				return true;
			case 30://View offer 1
				Exchange.viewOffer(player, 1);
				return true;
			case 33://View offer 2
				Exchange.viewOffer(player, 2);
				return true;
			case 34://View offer 3
				Exchange.viewOffer(player, 3);
				return true;
			case 36://View offer 4
				Exchange.viewOffer(player, 4);
				return true;
			case 38://View offer 5
				Exchange.viewOffer(player, 5);
				return true;
			case 42://Pressed "Back" button
				Exchange.clearOffer(player);
				return true;
			case 75://Abort current offer
				var slot = api.getVarp(player, 138);
				if (slot >= 0 && slot < 6) {
					api.abortExchangeOffer(player, slot);
				}				
				return true;
			case 77://Collect item
				Exchange.collectItems(player, 0, option);
				return true;
			case 79://Collect coins
				Exchange.collectItems(player, 1, option);
				return true;
			case 87://Close button
				return true;
			case 98://Decrease quantity by one
				if (api.getVarp(player, 136) > 0) {
					api.incrementVarp(player, 136, -1);
				}				
				return true;
			case 101://Increase quantity by one
				api.incrementVarp(player, 136, 1);			
				return true;
			case 105:
				Exchange.handleQuantityButton(player, 1);
				return true;
			case 111://Increase quantity by ten
				Exchange.handleQuantityButton(player, 2);
				return true;
			case 117://Increase quantity by 100
				Exchange.handleQuantityButton(player, 3);
				return true;
			case 123://Increase quantity by 1000
				Exchange.handleQuantityButton(player, 4);
				return true;
			case 129://Select custom quantity
				Exchange.handleQuantityButton(player, 5);
				return true;
			case 134://Decrease price by 1gp
				if (api.getVarp(player, 137) > 1) {
					api.incrementVarp(player, 137, -1);
				}				
				return true;
			case 137://Increase price by 1gp
				if (api.getVarp(player, 137) < 2147483647) {
					api.incrementVarp(player, 137, 1);
				}
			case 141://Decrease price by 5%
				Exchange.setPrice(player, 95);
				return true;
			case 147://Set to exchange price
				api.setVarp(player, 137, api.getVarp(player, 140));
				return true;
			case 152://Select custom price
				var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
					handle : function (value) {
						if (value > 0) {
							api.setVarp(player, 137, value);
						}									
					}
				});
				player.getDialogs().requestInteger("Enter the price you wish to buy for:", new Handler());
				return true;
			case 158://Increase price by 5%
				Exchange.setPrice(player, 105);
				return true;
			case 164://Submit offer
				Exchange.submitOffer(player);
				return true;
			case 170://Buy offer 0
				Exchange.openOffer(player, 0, false);
				return true;
			case 175://Sell offer 0
				Exchange.openOffer(player, 0, true);
				return true;
			case 181://Buy offer 1
				Exchange.openOffer(player, 1, false);
				return true;
			case 187://Sell offer 1
				Exchange.openOffer(player, 1, true);
				return true;
			case 193://Buy offer 2
				Exchange.openOffer(player, 2, false);
				return true;
			case 199://Sell offer 2
				Exchange.openOffer(player, 2, true);
				return true;
			case 206://Buy offer 3
				Exchange.openOffer(player, 3, false);
				return true;
			case 212://Sell offer 3
				Exchange.openOffer(player, 3, true);
				return true;
			case 222://Buy offer 4
				Exchange.openOffer(player, 4, false);
				return true;
			case 228://Sell offer 4
				Exchange.openOffer(player, 4, true);
				return true;
			case 238://Buy offer 5
				Exchange.openOffer(player, 5, false);
				return true;
			case 244://Sell offer 5
				Exchange.openOffer(player, 5, true);
				return true;
			//Abort request acknowledged. Please be aware that your offer may have already been completed.
			
			default:
				return false;
			}
		} else {
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 107) {
			api.runClientScript(player, 8862, [1, 2]);
			api.runClientScript(player, 8862, [1, 3]);
		} else if (interfaceID == 105) {
			Exchange.clearOffer(player);
		}
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

var Exchange = {
		openOffer : function (player, slot, isSell) {
			api.setVarp(player, 138, slot);
			api.setVarp(player, 139, isSell ? 1 : 0);
			if (isSell) {
				api.hideWidget(player, 105, 25, true);
			} else {
				Exchange.searchForItem(player);
			}
		},
		viewOffer : function (player, slot) {
			var offer = api.getExchangeOffer(player, slot);
			if (offer != null) {
				var returnInv = api.getEnumType(1079).getValueInt(slot);
				if (api.freeSpaceTotal(player, returnInv) == 2 && api.exchangeOfferFinished(player, slot)) {
					api.clearExchangeOffer(player, slot);
				} else {
					api.sendInv(player, returnInv);
					var exchangePrice = api.getItemType(offer.getOfferItem()).getExchangeValue();
					api.setVarp(player, 140, exchangePrice);
					api.setVarp(player, 138, slot);
				}				
			}			
		},
		clearOffer : function (player) {
			api.setVarp(player, 138, -1);
			api.setVarp(player, 139, -1);
			api.setVarp(player, 137, 1);
			api.setVarp(player, 136, 0);
			api.setVarp(player, 135, -1);
			api.runClientScript(player, 571, []);
		},
		offerItem : function (player, invSlot) {
			if (api.getVarp(player, 139) != 1) {
				if (api.getVarp(player, 139) == -1) {
					for (var slot=0; slot<6; slot++) {
						if (api.getExchangeOffer(player, slot) == null) {
							api.setVarp(player, 139, 1);
							api.setVarp(player, 138, slot);
							break;
						}
					}
					if (api.getVarp(player, 139) != 1) {
						api.sendMessage(player, "Unable to set up Sell Offer at this time.");
						return;						
					}
				} else {
					return;
				}				
			}

			var item = api.getItem(player, 93, invSlot);
			if (item != null) {
				var exchangePrice = api.getItemType(item).getExchangeValue();
				if (exchangePrice != -1) {
					var itemID = item.getID();
					if (api.getItemType(item).certtemplate != -1) {
						itemID = api.getItemType(item).certlink;
					}
					api.setVarp(player, 140, exchangePrice);
					api.setVarp(player, 135, itemID);
					api.setVarp(player, 137, exchangePrice);
					api.setVarp(player, 136, api.carriedItemTotal(player, item.getID()));
				} else {
					api.sendMessage(player, "You can't buy or sell that item on the GE.");
				}
			}
		},
		searchForItem : function (player) {
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				handle : function (value) {
					//print(value);
					var exchangePrice = api.getItemType(value).getExchangeValue();
					if (exchangePrice != -1) {
						api.setVarp(player, 140, exchangePrice);
						api.setVarp(player, 135, value);
						api.setVarp(player, 137, exchangePrice);
					}					
				}
			});
			player.getDialogs().requestItem("Grand Exchange Item Search", new Handler());
		},
		setPrice : function (player, percent) {
			if (api.getVarp(player, 135) == -1) {
				return;
			}
			var currentPrice = api.getVarp(player, 137);
			var newPrice = 0;
			if (percent > 100 && currentPrice > 2045222520) {
				newPrice = 2147483647;
			} else if (percent < 100 && currentPrice <= 1) {
				newPrice = 1;
			} else {
				newPrice = Math.floor(currentPrice * percent / 100);
				if (newPrice == currentPrice) {
					if (percent > 100) {
						newPrice += 1;
					} else {
						newPrice -= 1;
					}
				}
			}
			api.setVarp(player, 137, newPrice);
		},
		handleQuantityButton : function (player, button) {
			var isSell = api.getVarp(player, 139) == 1;
			var offset = isSell ? 0 : api.getVarp(player, 136);
			switch (button) {
			case 1:
				api.setVarp(player, 136, offset+1);
				break;
			case 2:
				api.setVarp(player, 136, offset+10);
				break;
			case 3:
				api.setVarp(player, 136, offset+100);
				break;
			case 4:
				if (!isSell) {
					api.incrementVarp(player, 136, 1000);
				} else if (api.getVarp(player, 135) != -1) {
					var itemID = api.getVarp(player, 135);
					var itemTotal = api.carriedItemTotal(player, itemID);
					if (api.getItemType(itemID).certlink != -1) {
						itemTotal += api.carriedItemTotal(player, api.getItemType(itemID).certlink);
					}
					api.setVarp(player, 136, itemTotal);					
				}	
				break;
			case 5://Choose amount
				var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
					handle : function (value) {
						api.setVarp(player, 136, value);				
					}
				});
				player.getDialogs().requestInteger("Enter the amount you wish to "+(isSell ? "sell" : "purchase")+":", new Handler());
				break;
			}
		},
		submitOffer : function (player) {
			var slot = api.getVarp(player, 138);
			var isSell = api.getVarp(player, 139) == 1;
			var itemID = api.getVarp(player, 135);
			var amount = api.getVarp(player, 136);
			var price = api.getVarp(player, 137);
			if (amount * price > 2147483647) {
				api.sendMessage(player, "Cannot process - total cost is too high!");
				return;
			}
			if (itemID != -1 && amount > 0) {
				var offerInv = api.getEnumType(1078).getValueInt(slot);
				api.sendInv(player, offerInv);
				if (isSell) {
					var carriedTotal = api.carriedItemTotal(player, itemID);
					if (api.getItemType(itemID).certlink != -1) {
						carriedTotal += api.carriedItemTotal(player, api.getItemType(itemID).certlink);
					}
					if (carriedTotal >= amount) {
						var fullAmount = amount;
						amount -= api.delItem(player, BACKPACK, itemID, amount);
						if (api.getItemType(itemID).certlink != -1) {
							api.delItem(player, BACKPACK, api.getItemType(itemID).certlink, amount);
						}
						api.addItem(player, offerInv, itemID, fullAmount);
						api.sendExchangeOffer(player, slot, isSell, itemID, fullAmount, price);
						Exchange.clearOffer(player);
					} else {
						api.sendMessage(player, "You do not have enough of this item in your inventory to cover the offer.")
					}
				} else {
					var totalCoins = price*amount;
					if (api.carriedItemTotal(player, 995) >= totalCoins) {
						api.delCarriedItem(player, 995, totalCoins);
						api.addItem(player, offerInv, 995, totalCoins);
						api.sendExchangeOffer(player, slot, isSell, itemID, amount, price);
						Exchange.clearOffer(player);
					} else {
						api.sendMessage(player, "You do not have enough coins to cover the offer.")
					}
				}
				
			}
		},
		collectItems : function (player, slot, option) {
			var exchangeSlot = api.getVarp(player, 138);
			var returnInv = api.getEnumType(1079).getValueInt(exchangeSlot);
			var item = api.getItem(player, returnInv, slot);
			var itemID = item.getID();
			if (option == 1 && item.getAmount() > 1 && api.getItemType(item).certlink != -1) {
				itemID = api.getItemType(item).certlink;
			}
			if (itemID != 995 && api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "You don't have enough room in your inventory.");
				return;
			}
			var amount = item.getAmount();
			if (!api.getItemType(itemID).isStackable()) {
				if (amount > api.freeSpaceTotal(player, Inv.BACKPACK)) {
					amount = api.freeSpaceTotal(player, Inv.BACKPACK);
				}
			}
			api.delItem(player, returnInv, item.getID(), amount);
			api.addCarriedItem(player, itemID, amount);
			if (api.freeSpaceTotal(player, returnInv) == 2 && api.exchangeOfferFinished(player, exchangeSlot)) {
				api.clearExchangeOffer(player, exchangeSlot);
			}
		}
}