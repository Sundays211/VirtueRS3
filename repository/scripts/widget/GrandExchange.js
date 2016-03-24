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
var ExchangeOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 105:
			api.setVarp(player, 163, 4);
			api.setVarp(player, 138, -1);//Exchange slot
			api.setVarp(player, 139, -1);//Buy or sell (1=buy, 0=sell)
			api.setVarp(player, 137, 1);//Amount
			api.setVarp(player, 135, -1);//Item ID
			//api.openOverlaySub(player, 1008, 107, false);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 8865, [1]);
			api.setWidgetEvents(player, 105, 63, -1, -1, 8650758);
			api.setWidgetEvents(player, 105, 65, -1, -1, 8650758);
			api.setWidgetEvents(player, 105, 99, -1, -1, 263170);
			return;
		case 107:
			api.setWidgetEvents(player, 107, 7, 0, 27, 14682110);
			api.runClientScript(player, 8862, [0, 2]);
			api.runClientScript(player, 8862, [0, 3]);
			return;
		}
	}
});

var ExchangeButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 105:
			switch (args.component) {	
			case -1://Select item to buy
				Exchange.searchForItem(player);
				return;
			case 15://Pressed "Back" button
				Exchange.clearOffer(player);
				return;
			case 17://View offer 0
				Exchange.viewOffer(player, 0);
				return;
			case 18://View offer 1
				Exchange.viewOffer(player, 1);
				return;
			case 19://View offer 2
				Exchange.viewOffer(player, 2);
				return;
			case 20://View offer 3
				Exchange.viewOffer(player, 3);
				return;
			case 21://View offer 4
				Exchange.viewOffer(player, 4);
				return;
			case 22://View offer 5
				Exchange.viewOffer(player, 5);
				return;
			case 23://View offer 6
				Exchange.viewOffer(player, 6);
				return;
			case 24://View offer 7
				Exchange.viewOffer(player, 7);
				return;
			case 61://Abort current offer
				var slot = api.getVarp(player, 138);
				if (slot >= 0 && slot < 8) {
					api.abortExchangeOffer(player, 1, slot);
				}				
				return;
			case 63://Collect item
				Exchange.collectItems(player, 0, args.button);
				return;
			case 65://Collect coins
				Exchange.collectItems(player, 1, args.button);
				return;
			case 121://Decrease quantity by one
				if (api.getVarp(player, 136) > 0) {
					api.incrementVarp(player, 136, -1);
				}				
				return;
			case 124://Increase quantity by one
				api.incrementVarp(player, 136, 1);			
				return;
			case 128://Increase quantity by ten
				Exchange.handleQuantityButton(player, 2);
				return;
			case 134://Increase quantity by 100
				Exchange.handleQuantityButton(player, 3);
				return;
			case 140://Increase quantity by 1000
				Exchange.handleQuantityButton(player, 4);
				return;
			case -1://Select custom quantity
				Exchange.handleQuantityButton(player, 5);
				return;
			case 145://Decrease price by 1gp
				if (api.getVarp(player, 137) > 1) {
					api.incrementVarp(player, 137, -1);
				}				
				return;
			case 148://Increase price by 1gp
				if (api.getVarp(player, 137) < 2147483647) {
					api.incrementVarp(player, 137, 1);
				}
				return;
			case 152://Decrease price by 5%
				Exchange.setPrice(player, 95);
				return;
			case 158://Set to exchange price
				api.setVarp(player, 137, api.getVarp(player, 140));
				return;
			case 163://Increase price by 5%
				Exchange.setPrice(player, 105);
				return;
			case 169://Submit offer
				Exchange.submitOffer(player);
				return;
			case 175://Buy offer 0
				Exchange.openOffer(player, 0, false);
				return;
			case 180://Sell offer 0
				Exchange.openOffer(player, 0, true);
				return;
			case 186://Buy offer 1
				Exchange.openOffer(player, 1, false);
				return;
			case 192://Sell offer 1
				Exchange.openOffer(player, 1, true);
				return;
			case 198://Buy offer 2
				Exchange.openOffer(player, 2, false);
				return;
			case 204://Sell offer 2
				Exchange.openOffer(player, 2, true);
				return;
			case 211://Buy offer 3
				Exchange.openOffer(player, 3, false);
				return;
			case 217://Sell offer 3
				Exchange.openOffer(player, 3, true);
				return;
			case 227://Buy offer 4
				Exchange.openOffer(player, 4, false);
				return;
			case 233://Sell offer 4
				Exchange.openOffer(player, 4, true);
				return;
			case 243://Buy offer 5
				Exchange.openOffer(player, 5, false);
				return;
			case 249://Sell offer 5
				Exchange.openOffer(player, 5, true);
				return;
			case 260://Buy offer 6
				Exchange.openOffer(player, 6, false);
				return;
			case 266://Sell offer 6
				Exchange.openOffer(player, 6, true);
				return;
			case 277://Buy offer 7
				Exchange.openOffer(player, 7, false);
				return;
			case 283://Sell offer 7
				Exchange.openOffer(player, 7, true);
				return;
			case 292://Custom quantity
				inframeInput(player, 105, 289, function (value) {
					if (value > 0) {
						api.setVarp(player, 136, value-1);
					}
				}, 7, 7);
				return;
			case 298://Custom price
				inframeInput(player, 105, 295, function (value) {
					if (value > 0) {
						api.setVarp(player, 137, value-1);
					}
				}, 7, 7);
				return;
			case 304://Search for item
				Exchange.searchForItem(player);
				return;
			case 311://Increase quantity by one
				Exchange.handleQuantityButton(player, 1);
				return;
			//Abort request acknowledged. Please be aware that your offer may have already been completed.
			default:
				api.sendMessage(player, "Unhandled exchange button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
			return;
		case 107:
			if (args.component != 7) {
				api.sendMessage(player, "Unhandled exchange inventory button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
			if (args.button == 1) {
				Exchange.offerItem(player, args.slot);
			} else if (args.button == 10) {
				var item = api.getItem(player, Inv.BACKPACK, args.slot);
				var desc = api.getItemDesc(item);
				api.sendMessage(player, desc);
			} else {
				api.sendMessage(player, "Unhandled exchange inventory button: comp="+args.component+", button="+args.button+", slot="+args.slot);
			}
			return;
		case 1666://Money pouch option
			api.sendMessage(player, "Unhandled exchange money pouch button: comp="+args.component+", button="+args.button+", slot="+args.slot);
			return;
		}
	}
});

var ExchangeCloseListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 105:
			Exchange.clearOffer(player);
			api.setVarBit(player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
			return;
		case 107:
			api.runClientScript(player, 8862, [1, 2]);
			api.runClientScript(player, 8862, [1, 3]);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {	
	var listener = new ExchangeOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 105, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 107, listener);
	
	listener = new ExchangeButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 105, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 107, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1666, listener);
	
	listener = new ExchangeCloseListener();
	scriptManager.registerListener(EventType.IF_CLOSE, 105, listener);
	scriptManager.registerListener(EventType.IF_CLOSE, 107, listener);
};

var Exchange = {
		open : function (player) {
			if (api.getAccountType(player) == 6 || api.getAccountType(player) == 7
					|| api.getAccountType(player) == 8) {
				api.sendMessage(player, "You cannot use Grand Exchange while an Iron Man.");
				return;
			}
			api.setVarBit(player, 444, 1);//Pin entered successfully
			api.setVarBit(player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
			Overlay.openOverlay(player, 5);
			//api.openCentralWidget(player, 105, false);
		},
		openOffer : function (player, slot, isSell) {
			api.setVarp(player, 138, slot);
			api.setVarp(player, 139, isSell ? 1 : 0);
			if (!isSell) {
				this.searchForItem(player);
			}
		},
		viewOffer : function (player, slot) {
			var offer = api.getExchangeOffer(player, 1, slot);
			if (offer != null) {
				var returnInv = api.getEnumValue(1079, slot);
				if (api.freeSpaceTotal(player, returnInv) == 2 && api.exchangeOfferFinished(player, 1, slot)) {
					api.clearExchangeOffer(player, 1, slot);
				} else {
					api.sendInv(player, returnInv);
					var objId = offer.getOfferItem();
					api.setVarp(player, 135, objId);
					var exchangePrice = api.getExchangeCost(objId);
					api.setVarp(player, 140, exchangePrice);
					api.setVarc(player, 2354, api.getItemDesc(objId));
					api.setWidgetText(player, 105, 14, api.getItemDesc(objId));
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
						if (api.getExchangeOffer(player, 1, slot) == null) {
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

			var item = api.getItem(player, Inv.BACKPACK, invSlot);
			if (item != null) {
				var exchangePrice = api.getExchangeCost(item);
				if (exchangePrice != -1) {
					var itemID = item.getID();
					if (api.getItemType(item).certtemplate != -1) {
						itemID = api.getItemType(item).certlink;
					}
					api.setVarp(player, 140, exchangePrice);
					api.setVarp(player, 135, itemID);
					api.setVarp(player, 137, exchangePrice);
					api.setVarp(player, 136, api.carriedItemTotal(player, api.getId(item)));
					api.setVarc(player, 2354, api.getItemDesc(api.getId(item)));
					api.setWidgetText(player, 105, 14, api.getItemDesc(api.getId(item)));
				} else {
					api.sendMessage(player, "You can't buy or sell that item on the GE.");
				}
			}
		},
		searchForItem : function (player) {
			inframeInput(player, 105, 301, function (objId) {
				var exchangePrice = api.getExchangeCost(objId);
				if (exchangePrice != -1) {
					api.setVarp(player, 140, exchangePrice);
					api.setVarp(player, 135, objId);
					api.setVarp(player, 137, exchangePrice);
					api.setVarc(player, 2354, api.getItemDesc(objId));
					api.setWidgetText(player, 105, 14, api.getItemDesc(objId));
				}
			}, 10, 0);
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
				requestCount(player, "Enter the amount you wish to "+(isSell ? "sell" : "purchase")+":", function (value) {
					api.setVarp(player, 136, value);
				});
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
				var offerInv = api.getEnumValue(1078, slot);
				api.sendInv(player, offerInv);
				if (isSell) {
					var carriedTotal = api.carriedItemTotal(player, itemID);
					if (api.getItemType(itemID).certlink != -1) {
						carriedTotal += api.carriedItemTotal(player, api.getItemType(itemID).certlink);
					}
					if (carriedTotal >= amount) {
						var fullAmount = amount;
						amount -= api.delItem(player, Inv.BACKPACK, itemID, amount);
						if (api.getItemType(itemID).certlink != -1) {
							api.delItem(player, Inv.BACKPACK, api.getItemType(itemID).certlink, amount);
						}
						api.addItem(player, offerInv, itemID, fullAmount);
						api.sendExchangeOffer(player, 1, slot, isSell, itemID, fullAmount, price);
						Exchange.clearOffer(player);
					} else {
						api.sendMessage(player, "You do not have enough of this item in your inventory to cover the offer.")
					}
				} else {
					var totalCoins = price*amount;
					if (api.carriedItemTotal(player, 995) >= totalCoins) {
						api.delCarriedItem(player, 995, totalCoins);
						api.addItem(player, offerInv, 995, totalCoins);
						api.sendExchangeOffer(player, 1, slot, isSell, itemID, amount, price);
						Exchange.clearOffer(player);
					} else {
						api.sendMessage(player, "You do not have enough coins to cover the offer.")
					}
				}
				
			}
		},
		collectItems : function (player, slot, option) {
			var exchangeSlot = api.getVarp(player, 138);
			var returnInv = api.getEnumValue(1079, exchangeSlot);
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
			if (api.freeSpaceTotal(player, returnInv) == 2 && api.exchangeOfferFinished(player, 1, exchangeSlot)) {
				api.clearExchangeOffer(player, 1, exchangeSlot);
			}
		}
}