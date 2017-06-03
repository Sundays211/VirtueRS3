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
/* globals EventType, Inv, ENGINE */
var varp = require('../../core/var/player');
var varc = require('../../core/var/client');
var varbit = require('../../core/var/bit');

var widget = require('../../widget');
var dialog = require('../../dialog');
var util = require('../../core/util');
var config = require('../../core/config');
var chat = require('../../chat');
var common = require('../common');
var CONST = require('../../core/const');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/02/2015
 */
module.exports = (function () {
	return {
		init : init,
		open : openExchange
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 105, function (ctx) {
			var player = ctx.player;
			
			varp(player, 163, 4);
			varp(player, 138, -1);//Exchange slot
			varp(player, 139, -1);//Buy or sell (1=buy, 0=sell)
			varp(player, 137, 1);//Amount
			varp(player, 135, -1);//Item ID
			//api.openOverlaySub(player, 1008, 107, false);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 8865, [1]);
			widget.setEvents(player, 105, 63, -1, -1, 8650758);
			widget.setEvents(player, 105, 65, -1, -1, 8650758);
			widget.setEvents(player, 105, 99, -1, -1, 263170);
		});
		
		scriptManager.bind(EventType.IF_OPEN, 107, function (ctx) {
			widget.setEvents(ctx.player, 107, 7, 0, 27, 14682110);
			util.runClientScript(ctx.player, 8862, [0, 2]);
			util.runClientScript(ctx.player, 8862, [0, 3]);
		});

		scriptManager.bind(EventType.IF_CLOSE, 105, function (ctx) {
			clearOffer(ctx.player);
			varbit(ctx.player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
		});
		
		scriptManager.bind(EventType.IF_CLOSE, 107, function (ctx) {
			util.runClientScript(ctx.player, 8862, [1, 2]);
			util.runClientScript(ctx.player, 8862, [1, 3]);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 107, function (ctx) {
			if (ctx.component != 7) {
				util.defaultHandler(ctx, "exchange inventory");
				return;
			}
			if (ctx.button == 1) {
				offerItem(ctx.player, ctx.slot);
			} else if (ctx.button == 10) {
				var objId = common.getObjId(ctx.player, Inv.BACKPACK, ctx.slot);
				var desc = config.objDesc(objId);
				chat.sendMessage(ctx.player, desc);
			} else {
				util.defaultHandler(ctx, "exchange inventory");
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1666, function (ctx) {
			util.defaultHandler(ctx, "exchange money pouch");
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 105, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {	
			case -1://Select item to buy
				searchForItem(player);
				return;
			case 15://Pressed "Back" button
				clearOffer(player);
				return;
			case 17://View offer 0
				viewOffer(player, 0);
				return;
			case 18://View offer 1
				viewOffer(player, 1);
				return;
			case 19://View offer 2
				viewOffer(player, 2);
				return;
			case 20://View offer 3
				viewOffer(player, 3);
				return;
			case 21://View offer 4
				viewOffer(player, 4);
				return;
			case 22://View offer 5
				viewOffer(player, 5);
				return;
			case 23://View offer 6
				viewOffer(player, 6);
				return;
			case 24://View offer 7
				viewOffer(player, 7);
				return;
			case 61://Abort current offer
				var slot = varp(player, 138);
				if (slot >= 0 && slot < 8) {
					ENGINE.abortExchangeOffer(player, 1, slot);
				}				
				return;
			case 63://Collect item
				collectItems(player, 0, ctx.button);
				return;
			case 65://Collect coins
				collectItems(player, 1, ctx.button);
				return;
			case 121://Decrease quantity by one
				if (varp(player, 136) > 0) {
					ENGINE.incrementVarp(player, 136, -1);
				}				
				return;
			case 124://Increase quantity by one
				ENGINE.incrementVarp(player, 136, 1);			
				return;
			case 128://Increase quantity by ten
				handleQuantityButton(player, 2);
				return;
			case 134://Increase quantity by 100
				handleQuantityButton(player, 3);
				return;
			case 140://Increase quantity by 1000
				handleQuantityButton(player, 4);
				return;
			case -1://Select custom quantity
				handleQuantityButton(player, 5);
				return;
			case 145://Decrease price by 1gp
				if (varp(player, 137) > 1) {
					ENGINE.incrementVarp(player, 137, -1);
				}				
				return;
			case 148://Increase price by 1gp
				if (varp(player, 137) < CONST.INTEGER_MAX) {
					ENGINE.incrementVarp(player, 137, 1);
				}
				return;
			case 152://Decrease price by 5%
				setPrice(player, 95);
				return;
			case 158://Set to exchange price
				varp(player, 137, varp(player, 140));
				return;
			case 163://Increase price by 5%
				setPrice(player, 105);
				return;
			case 169://Submit offer
				submitOffer(player);
				return;
			case 175://Buy offer 0
				openOffer(player, 0, false);
				return;
			case 180://Sell offer 0
				openOffer(player, 0, true);
				return;
			case 186://Buy offer 1
				openOffer(player, 1, false);
				return;
			case 192://Sell offer 1
				openOffer(player, 1, true);
				return;
			case 198://Buy offer 2
				openOffer(player, 2, false);
				return;
			case 204://Sell offer 2
				openOffer(player, 2, true);
				return;
			case 211://Buy offer 3
				openOffer(player, 3, false);
				return;
			case 217://Sell offer 3
				openOffer(player, 3, true);
				return;
			case 227://Buy offer 4
				openOffer(player, 4, false);
				return;
			case 233://Sell offer 4
				openOffer(player, 4, true);
				return;
			case 243://Buy offer 5
				openOffer(player, 5, false);
				return;
			case 249://Sell offer 5
				openOffer(player, 5, true);
				return;
			case 260://Buy offer 6
				openOffer(player, 6, false);
				return;
			case 266://Sell offer 6
				openOffer(player, 6, true);
				return;
			case 277://Buy offer 7
				openOffer(player, 7, false);
				return;
			case 283://Sell offer 7
				openOffer(player, 7, true);
				return;
			case 292://Custom quantity
				widget.inframeInput(player, 105, 289, function (value) {
					if (value > 0) {
						varp(player, 136, value-1);
					}
				}, 7, 7);
				return;
			case 298://Custom price
				widget.inframeInput(player, 105, 295, function (value) {
					if (value > 0) {
						varp(player, 137, value-1);
					}
				}, 7, 7);
				return;
			case 304://Search for item
				searchForItem(player);
				return;
			case 311://Increase quantity by one
				handleQuantityButton(player, 1);
				return;
			//Abort request acknowledged. Please be aware that your offer may have already been completed.
			default:
				util.defaultHandler(ctx, "exchange");
				return;
			}
		});
	}
	
	function openExchange (player) {
		if (ENGINE.getAccountType(player) == 6 || ENGINE.getAccountType(player) == 7 ||
				ENGINE.getAccountType(player) == 8) {
			chat.sendMessage(player, "You cannot use Grand Exchange while an Iron Man.");
			return;
		}
		varbit(player, 444, 1);//Pin entered successfully
		varbit(player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
		widget.openOverlay(player, 5);
		//api.openCentralWidget(player, 105, false);
	}
	
	function openOffer (player, slot, isSell) {
		varp(player, 138, slot);
		varp(player, 139, isSell ? 1 : 0);
		if (!isSell) {
			searchForItem(player);
		}
	}
	
	function viewOffer (player, slot) {
		var offer = ENGINE.getExchangeOffer(player, 1, slot);
		if (offer !== null) {
			var returnInv = config.enumValue(1079, slot);
			if (common.freeSpace(player, returnInv) == 2 && ENGINE.exchangeOfferFinished(player, 1, slot)) {
				ENGINE.clearExchangeOffer(player, 1, slot);
			} else {
				ENGINE.sendInv(player, returnInv);
				var objId = offer.getOfferItem();
				varp(player, 135, objId);
				var exchangePrice = ENGINE.getExchangeCost(objId);
				varp(player, 140, exchangePrice);
				varc(player, 2354, config.objDesc(objId));
				widget.setText(player, 105, 14, config.objDesc(objId));
				varp(player, 138, slot);
			}				
		}			
	}
	
	function clearOffer (player) {
		varp(player, 138, -1);
		varp(player, 139, -1);
		varp(player, 137, 1);
		varp(player, 136, 0);
		varp(player, 135, -1);
		util.runClientScript(player, 571, []);
	}
	
	function offerItem (player, invSlot) {
		if (varp(player, 139) != 1) {
			if (varp(player, 139) == -1) {
				for (var slot=0; slot<6; slot++) {
					if (ENGINE.getExchangeOffer(player, 1, slot) === null) {
						varp(player, 139, 1);
						varp(player, 138, slot);
						break;
					}
				}
				if (varp(player, 139) != 1) {
					chat.sendMessage(player, "Unable to set up Sell Offer at this time.");
					return;						
				}
			} else {
				return;
			}				
		}

		var objId = common.getObjId(player, Inv.BACKPACK, invSlot);
		if (objId !== -1) {
			var exchangePrice = ENGINE.getExchangeCost(objId);
			if (exchangePrice != -1) {
				objId = config.objUncert(objId);
				varp(player, 140, exchangePrice);
				varp(player, 135, objId);
				varp(player, 137, exchangePrice);
				varp(player, 136, common.total(player, objId));
				varc(player, 2354, config.objDesc(objId));
				widget.setText(player, 105, 14, config.objDesc(objId));
			} else {
				chat.sendMessage(player, "You can't buy or sell that item on the GE.");
			}
		}
	}
	
	function searchForItem (player) {
		widget.inframeInput(player, 105, 301, function (objId) {
			var exchangePrice = ENGINE.getExchangeCost(objId);
			if (exchangePrice != -1) {
				varp(player, 140, exchangePrice);
				varp(player, 135, objId);
				varp(player, 137, exchangePrice);
				varc(player, 2354, config.objDesc(objId));
				widget.setText(player, 105, 14, config.objDesc(objId));
			}
		}, 10, 0);
	}
	
	function setPrice (player, percent) {
		if (varp(player, 135) == -1) {
			return;
		}
		var currentPrice = varp(player, 137);
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
		varp(player, 137, newPrice);
	}
	
	function handleQuantityButton (player, button) {
		var isSell = varp(player, 139) == 1;
		var offset = isSell ? 0 : varp(player, 136);
		switch (button) {
		case 1:
			varp(player, 136, offset+1);
			break;
		case 2:
			varp(player, 136, offset+10);
			break;
		case 3:
			varp(player, 136, offset+100);
			break;
		case 4:
			if (!isSell) {
				ENGINE.incrementVarp(player, 136, 1000);
			} else if (varp(player, 135) != -1) {
				var objId = varp(player, 135);
				var itemTotal = common.total(player, objId);
				var certId = config.objUncert(objId);
				if (certId !== objId) {
					itemTotal += common.total(player, certId);
				}
				varp(player, 136, itemTotal);					
			}	
			break;
		case 5://Choose amount
			dialog.requestCount(player, "Enter the amount you wish to "+(isSell ? "sell" : "purchase")+":", function (value) {
				varp(player, 136, value);
			});
			break;
		}
	}
	
	function submitOffer (player) {
		var slot = varp(player, 138);
		var isSell = varp(player, 139) == 1;
		var objId = varp(player, 135);
		var amount = varp(player, 136);
		var price = varp(player, 137);
		if (amount * price > CONST.INTEGER_MAX) {
			chat.sendMessage(player, "Cannot process - total cost is too high!");
			return;
		}
		if (objId !== -1 && amount > 0) {
			var offerInv = config.enumValue(1078, slot);
			ENGINE.sendInv(player, offerInv);
			if (isSell) {
				var carriedTotal = common.total(player, objId);
				var certId = config.objUncert(objId);
				var certTotal = 0;
				if (certId !== objId) {
					certTotal += common.total(player, certId);
				}
				if ((carriedTotal+certTotal) >= amount) {
					var fullAmount = amount;
					
					//Grab as much as we can as un-certed objects
					amount = Math.min(carriedTotal, amount);
					common.take(player, objId, amount, Inv.BACKPACK);
					
					//And grab the rest as certed objects
					amount = fullAmount - carriedTotal;
					if (amount > 0) {
						common.take(player, certId, amount, Inv.BACKPACK);
					}
					
					common.give(player, objId, fullAmount, offerInv);
					ENGINE.sendExchangeOffer(player, 1, slot, isSell, objId, fullAmount, price);
					clearOffer(player);
				} else {
					chat.sendMessage(player, "You do not have enough of this item in your inventory to cover the offer.");
				}
			} else {
				var totalCoins = price*amount;
				if (common.has(player, CONST.COINS, totalCoins)) {
					common.take(player, CONST.COINS, totalCoins);
					common.give(player, CONST.COINS, totalCoins, offerInv);
					
					ENGINE.sendExchangeOffer(player, 1, slot, isSell, objId, amount, price);
					clearOffer(player);
				} else {
					chat.sendMessage(player, "You do not have enough coins to cover the offer.");
				}
			}
			
		}
	}
	
	function collectItems (player, slot, option) {
		var exchangeSlot = varp(player, 138);
		var returnInv = config.enumValue(1079, exchangeSlot);
		var objId = common.getObjId(player, returnInv, slot);
		var amount = common.getCount(player, returnInv, slot);
		if (objId !== CONST.COINS && common.hasSpace(player)) {
			chat.sendMessage(player, "You don't have enough room in your inventory.");
			return;
		}
		if (!config.objStackable(objId) &&
				amount > common.freeSpace(player, Inv.BACKPACK)) {
			amount = common.freeSpace(player, Inv.BACKPACK);
		}
		common.take(player, objId, amount, returnInv);
		
		if (option === 1 && amount > 1) {
			objId = config.objCert(objId);
		}		
		common.give(player, objId, amount);
		
		if (common.freeSpace(player, returnInv) == 2 && ENGINE.exchangeOfferFinished(player, 1, exchangeSlot)) {
			ENGINE.clearExchangeOffer(player, 1, exchangeSlot);
		}
	}

})();
