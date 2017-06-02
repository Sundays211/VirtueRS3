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
/* globals EventType, ENGINE, Inv */
var varc = require('../core/var/client');
var varp = require('../core/var/player');
var varbit = require('../core/var/bit');

var util = require('../core/util');
var widget = require('../widget');
var inv = require('../inv');
var chat = require('../chat');
var config = require('../core/config');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/02/2015
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1265, function (ctx) {
		initShop(ctx.player);
	});
	
	scriptManager.bind(EventType.IF_CLOSE, 1265, function (ctx) {
		varp(ctx.player, 304, -1);
		varp(ctx.player, 305, -1);
		varp(ctx.player, 306, -1);
		varc(ctx.player, 1876, -1);
		varc(ctx.player, 1878, -1);
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1265, function (ctx) {
		var player = ctx.player;
		
		if (varp(player, 304) != -1 && !ENGINE.containerReady(player, varp(player, 304))) {
			if (util.isAdmin(player)) {
				chat.sendDebugMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID="+varp(player, 304));
			} else {
				chat.sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}				
			return;
		}
		
		switch (ctx.component) {
		case 89://Close button
			return;
		case 20://Selected item
			if (varp(player, 303) === 0) {
				handleBuyButton(player, ctx.slot, ctx.button);
			} else {
				handleSellButton(player, ctx.slot, ctx.button);
			}
			return;
		case 21://Free item stock
			handleTakeButton(player, ctx.slot, ctx.button);
			return;
		case 28://Switch to "Buy Items"
			varp(player, 303, 0);
			return;
		case 29://Switch to "Sell Items"
			varp(player, 303, 1);
			return;
		case 49://Show full names
			varbit(player, 987, 1);
			return;
		case 50://Show icons
			varbit(player, 987, 0);
			return;
		case 205://Buy/Take/Sell
			if (varp(player, 299) === varp(player, 304)) {
				buyItem(player, varp(player, 300), varp(player, 302));
			} else if (varp(player, 299) === Inv.BACKPACK) {
				sellItem(player, varp(player, 300), varp(player, 302));
			} else if (varp(player, 299) === varp(player, 305)) {
				takeItem(player, varp(player, 300), varp(player, 302));
			}
			return;
		case 15://Add one
			varp(player, 302, Math.min(varp(player, 302)+1, getMaxBuySellAmount(player, varp(player, 300))));
			return;
		case 212://Add 5
			varp(player, 302, Math.min(varp(player, 302)+5, getMaxBuySellAmount(player, varp(player, 300))));
			return;
		case 215://Set max amount
			varp(player, 302, getMaxBuySellAmount(player, varp(player, 300)));
			return;
		case 218://Subtract 1
			if (varp(player, 302) > 1) {
				ENGINE.incrementVarp(player, 302, -1);
			}
			return;
		case 221://Subtract 5
			varp(player, 302, Math.max(varp(player, 302)-5, 1));
			return;
		case 224://Set min amount
			varp(player, 302, 1);
			return;
		case 256:
		case 266://Continue button
			widget.hide(player, 1265, 64, true);
			return;
		case 251://Confirm buy
			buyItem(player, varp(player, 300), varp(player, 302), true);
			widget.hide(player, 1265, 62, true);
			return;
		case 242://Cancel buy
		case 232://Clicked area around buy warning
			widget.hide(player, 1265, 62, true);
			return;
		case 189://Confirm sell
			sellItem(player, varp(player, 300), varp(player, 302), true);
			widget.hide(player, 1265, 62, true);
			return;
		case 197://Cancel sell
		case 1://Clicked area around sell warning
			widget.hide(player, 1265, 63, true);
			return;
		default:
			util.defaultHandler(ctx, "shop");
			return;
		}
	});
	
	function initShop (player) {
		//varp(player, 304, 4);
		//varp(player, 305, -1);
		varp(player, 306, 995);//Currency
		var shopId = varp(player, 304);
		if (shopId != -1) {
			if (!ENGINE.containerReady(player, shopId)) {
				if (util.isAdmin(player)) {
					chat.sendDebugMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID="+shopId);
				} else {
					chat.sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
				}				
				return;
			}
			ENGINE.sendInv(player, shopId);
		}
		var freeStockId = varp(player, 305);
		if (freeStockId != -1) {
			if (!ENGINE.containerReady(player, freeStockId)) {
				if (util.isAdmin(player)) {
					chat.sendDebugMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID="+freeStockId);
				} else {
					chat.sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
				}				
				return;
			}
			ENGINE.sendInv(player, freeStockId);
		}
		var canSell = 0;
		for (var slot=0; slot<28; slot++) {
			var item = ENGINE.getItem(player, Inv.BACKPACK, slot);
			if (item !== null && canSellTo(player, varp(player, 304), ENGINE.getId(item))) {
				canSell |= 1 << slot;
			}			
		}
		varc(player, 1879, canSell);//Bitpacked can sell
		widget.setEvents(player, 1265, 20, 0, 40, 2097406);
		widget.setEvents(player, 1265, 21, 0, 40, 2097406);
		widget.setEvents(player, 1265, 26, 0, 40, 10223616);
	}
	
	function handleBuyButton (player, slot, option) {
		setSelectedItem(player, varp(player, 304), slot);
		var amount = 0;
		var objId = inv.getObjId(player, varp(player, 304), slot);
		switch (option) {
		case 2:
			amount = 1;
			break;
		case 3:
			amount = 5;
			break;
		case 4:
			amount = 10;
			break;
		case 5:
			amount = 50;
			break;
		case 6:
			amount = 500;
			break;
		case 7:
			amount = inv.total(player, objId, varp(player, 304));
			break;
		}
		if (amount) {
			buyItem(player, objId, amount);
		}
	}
	
	function handleTakeButton (player, slot, option) {
		if (!ENGINE.containerReady(player, varp(player, 305))) {
			if (util.isAdmin(player)) {
				chat.sendDebugMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID="+varp(player, 305));
			} else {
				chat.sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}				
			return;
		}
		setSelectedItem(player, varp(player, 305), slot);
		var amount = 0;
		var objId = inv.getObjId(player, varp(player, 305), slot);
		switch (option) {
		case 2:
			amount = 1;
			break;
		case 3:
			amount = 5;
			break;
		case 4:
			amount = 10;
			break;
		case 5:
			amount = 50;
			break;
		case 6:
			amount = 500;
			break;
		case 7:
			amount = inv.total(player, objId, varp(player, 305));
			break;
		}
		if (amount > 0) {
			takeItem(player, objId, amount);
		}
		
	}
	
	function handleSellButton (player, slot, option) {
		setSelectedItem(player, Inv.BACKPACK, slot);
		var amount = 0;
		var objId = inv.getObjId(player, Inv.BACKPACK, slot);
		switch (option) {
		case 2:
			amount = 1;
			break;
		case 3:
			amount = 5;
			break;
		case 4:
			amount = 10;
			break;
		case 5:
			amount = 50;
			break;
		case 6:
			amount = 500;
			break;
		}
		if (amount > 0) {
			sellItem(player, objId, amount);
		}
	}
	
	function setSelectedItem (player, invId, slot) {
		varp(player, 299, invId);
		varp(player, 301, slot);
		var objId = inv.getObjId(player, invId, slot);
		varp(player, 300, objId);
		varp(player, 302, Math.min(Math.max(varp(player, 302), 1), inv.total(player, objId, invId)));
		varc(player, 2361, config.objDesc(objId));//item examine
		//api.sendMessage(player, "Setting selected item to inv="+inv+", slot="+slot);
	}
	
	function showMessage (player, message) {
		ENGINE.sendFilterMessage(player, message);
		widget.hide(player, 1265, 64, false);
		widget.setText(player, 1265, 260, message);
	}
	

	function getBuyCost (player, objId) {
		return Math.max(config.objCost(objId), 1);
	}
	
	function getSellPrice (player, objId) {
		var price = Math.floor((config.objCost(objId) * 30) / 100);
		return Math.max(price, 1);
	}
	
	function canSellTo (player, invId, objId) {
		objId = config.objUncert(objId);
		if (config.enumValue(921, invId) != 1) {
			if (inv.baseStock(player, invId, objId) == -1) {
				return false;
			}
		} else if (!config.objSellToGeneralStore()) {
			return false;
		} else if (objId == 995 || objId == varp(player, 306)) {
			return false;
		}
		return true;
	}
	
	function sendBackpackCanSell (player, shopInv) {
		var canSell = 0;
		for (var slot=0; slot<28; slot++) {
			var objId = inv.getObjId(player, Inv.BACKPACK, slot);
			if (objId !== -1 && canSellTo(player, shopInv, objId)) {
				canSell |= 1 << slot;
			}			
		}
		varc(player, 1879, canSell);//Bitpacked can sell
	}
	
	function getMaxBuySellAmount (player, objId) {
		if (varp(player, 299) === Inv.BACKPACK) {
			return Math.max(inv.total(player, objId, Inv.BACKPACK), 1);
		} else {
			var shopStock = inv.total(player, objId, varp(player, 299));
			if (!config.objStackable(objId)) {
				var freeSpace = inv.freeSpace(player, Inv.BACKPACK);
				return Math.max(Math.min(shopStock, freeSpace), 1);
			} else {
				return Math.max(shopStock, 1);
			}				
		}
	}
	
	function buyItem (player, objId, amount, confirmed) {
		var invId = varp(player, 304);
		var currency = varp(player, 306);
		amount = Math.min(amount, inv.total(player, objId, invId));
		if (amount < 1) {
			return;//Shop has no stock
		}
		if (!config.objStackable(objId)) {
			amount = Math.min(amount, inv.freeSpace(player, Inv.BACKPACK));
		} else if (inv.total(player, objId, invId) < 1 && inv.freeSpace(player, Inv.BACKPACK) < 1) {
			showMessage(player, "You have no inventory space at the moment and cannot buy anything.");
			return;//Full backpack
		} 
		if (amount < 1) {
			showMessage(player, "You have no inventory space at the moment and cannot buy anything.");
			return;//Full backpack
		}
		var cost = getBuyCost(player, objId);
		
		//Make sure the player has enough money
		var currentMoneyAmount = inv.total(player, currency);
		if (amount > (currentMoneyAmount/cost)) {				
			showMessage(player, "You don't have enough coins to buy "+amount+".");
			amount = (currentMoneyAmount/cost);
		}
		if (amount < 1) {
			return;//Can't afford any
		}
		if (!confirmed && cost*amount > 100000) {
			//If the item costs more than 100k, warn the player first
			varp(player, 302, amount);
			varp(player, 300, objId);
			widget.hide(player, 1265, 62, false);
			return;
		}
		
		//Remove money from the player
		inv.take(player, currency, amount*cost);
		
		//Remove the item from the shop
		inv.take(player, objId, amount, invId);
		
		//Give the item to the player
		inv.give(player, objId, amount);
		
		sendBackpackCanSell(player, invId);
	}
	
	function sellItem (player, objId, amount, confirmed) {
		var shopInv = varp(player, 304);
		if (!canSellTo(player, shopInv, objId)) {
			return;//Can't sell this item
		}
		
		amount = Math.min(amount, inv.total(player, objId, Inv.BACKPACK));
		if (inv.total(player, objId, shopInv) < 1 &&
				inv.baseStock(player, shopInv, objId) === -1 &&
				inv.freeSpace(player, shopInv) < 1) {
			return;//Shop does not have space for item
		}
		
		var value = getSellPrice(player, objId);
		if (!confirmed && value*amount > 30000) {
			//If the player is trying to sell an item worth more than 30k, warn them first
			varp(player, 302, amount);
			varp(player, 300, objId);
			widget.hide(player, 1265, 63, false);
			return;
		}
		
		//Remove items from the player's backpack
		inv.take(player, objId, amount, Inv.BACKPACK);

		//Add items to the shop's stock
		inv.give(player, config.objUncert(objId), amount, shopInv);
		
		//Give currency back to the player
		inv.give(player, varp(player, 306), amount*value);
		
		//Refresh the sellability of items
		sendBackpackCanSell(player, shopInv);
	}
	
	function takeItem (player, objId, amount) {
		var invId = varp(player, 305);
		amount = Math.min(amount, inv.total(player, objId, invId));
		if (amount < 1) {
			return;//Shop has no stock
		}
		if (!config.objStackable(objId)) {
			amount = Math.min(amount, inv.freeSpace(player, Inv.BACKPACK));
		} else if (inv.total(player, objId, Inv.BACKPACK) < 1 &&
				inv.freeSpace(player, Inv.BACKPACK) < 1) {
			showMessage(player, "You don't have enough inventory space to take that.");
			return;//Full backpack
		} 
		if (amount < 1) {
			showMessage(player, "You don't have enough inventory space to take that.");
			return;//Full backpack
		}
		
		//Remove the item from the shop's stock
		inv.take(player, objId, amount, invId);
		
		//Add the item to the player's backpack
		inv.give(player, objId, amount);
		
		//Refresh the sellability of items
		sendBackpackCanSell(player, varp(player, 304));
	}
};