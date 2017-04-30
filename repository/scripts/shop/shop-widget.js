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
var util = require('../core/util');
var widget = require('../core/widget');
var inv = require('../core/inv');
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
		ENGINE.setVarp(ctx.player, 304, -1);
		ENGINE.setVarp(ctx.player, 305, -1);
		ENGINE.setVarp(ctx.player, 306, -1);
		ENGINE.setVarc(ctx.player, 1876, -1);
		ENGINE.setVarc(ctx.player, 1878, -1);
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1265, function (ctx) {
		var player = ctx.player;
		
		if (ENGINE.getVarp(player, 304) != -1 && !ENGINE.containerReady(player, ENGINE.getVarp(player, 304))) {
			if (util.isAdmin(player)) {
				ENGINE.sendMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID="+ENGINE.getVarp(player, 304));
			} else {
				ENGINE.sendMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}				
			return;
		}
		
		switch (ctx.component) {
		case 89://Close button
			return;
		case 20://Selected item
			if (ENGINE.getVarp(player, 303) === 0) {
				handleBuyButton(player, ctx.slot, ctx.button);
			} else {
				handleSellButton(player, ctx.slot, ctx.button);
			}
			return;
		case 21://Free item stock
			handleTakeButton(player, ctx.slot, ctx.button);
			return;
		case 28://Switch to "Buy Items"
			ENGINE.setVarp(player, 303, 0);
			return;
		case 29://Switch to "Sell Items"
			ENGINE.setVarp(player, 303, 1);
			return;
		case 49://Show full names
			ENGINE.setVarBit(player, 987, 1);
			return;
		case 50://Show icons
			ENGINE.setVarBit(player, 987, 0);
			return;
		case 205://Buy/Take/Sell
			if (ENGINE.getVarp(player, 299) === ENGINE.getVarp(player, 304)) {
				buyItem(player, ENGINE.getVarp(player, 300), ENGINE.getVarp(player, 302));
			} else if (ENGINE.getVarp(player, 299) === Inv.BACKPACK) {
				sellItem(player, ENGINE.getVarp(player, 300), ENGINE.getVarp(player, 302));
			} else if (ENGINE.getVarp(player, 299) === ENGINE.getVarp(player, 305)) {
				takeItem(player, ENGINE.getVarp(player, 300), ENGINE.getVarp(player, 302));
			}
			return;
		case 15://Add one
			ENGINE.setVarp(player, 302, Math.min(ENGINE.getVarp(player, 302)+1, getMaxBuySellAmount(player, ENGINE.getVarp(player, 300))));
			return;
		case 212://Add 5
			ENGINE.setVarp(player, 302, Math.min(ENGINE.getVarp(player, 302)+5, getMaxBuySellAmount(player, ENGINE.getVarp(player, 300))));
			return;
		case 215://Set max amount
			ENGINE.setVarp(player, 302, getMaxBuySellAmount(player, ENGINE.getVarp(player, 300)));
			return;
		case 218://Subtract 1
			if (ENGINE.getVarp(player, 302) > 1) {
				ENGINE.incrementVarp(player, 302, -1);
			}
			return;
		case 221://Subtract 5
			ENGINE.setVarp(player, 302, Math.max(ENGINE.getVarp(player, 302)-5, 1));
			return;
		case 224://Set min amount
			ENGINE.setVarp(player, 302, 1);
			return;
		case 256:
		case 266://Continue button
			widget.hide(player, 1265, 64, true);
			return;
		case 251://Confirm buy
			buyItem(player, ENGINE.getVarp(player, 300), ENGINE.getVarp(player, 302), true);
			widget.hide(player, 1265, 62, true);
			return;
		case 242://Cancel buy
		case 232://Clicked area around buy warning
			widget.hide(player, 1265, 62, true);
			return;
		case 189://Confirm sell
			sellItem(player, ENGINE.getVarp(player, 300), ENGINE.getVarp(player, 302), true);
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
		//ENGINE.setVarp(player, 304, 4);
		//ENGINE.setVarp(player, 305, -1);
		ENGINE.setVarp(player, 306, 995);//Currency
		var shopId = ENGINE.getVarp(player, 304);
		if (shopId != -1) {
			if (!ENGINE.containerReady(player, shopId)) {
				if (util.isAdmin(player)) {
					ENGINE.sendMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID="+shopId);
				} else {
					ENGINE.sendMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
				}				
				return;
			}
			ENGINE.sendInv(player, shopId);
		}
		var freeStockId = ENGINE.getVarp(player, 305);
		if (freeStockId != -1) {
			if (!ENGINE.containerReady(player, freeStockId)) {
				if (util.isAdmin(player)) {
					ENGINE.sendMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID="+freeStockId);
				} else {
					ENGINE.sendMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
				}				
				return;
			}
			ENGINE.sendInv(player, freeStockId);
		}
		var canSell = 0;
		for (var slot=0; slot<28; slot++) {
			var item = ENGINE.getItem(player, Inv.BACKPACK, slot);
			if (item !== null && canSellTo(player, ENGINE.getVarp(player, 304), ENGINE.getId(item))) {
				canSell |= 1 << slot;
			}			
		}
		ENGINE.setVarc(player, 1879, canSell);//Bitpacked can sell
		widget.setEvents(player, 1265, 20, 0, 40, 2097406);
		widget.setEvents(player, 1265, 21, 0, 40, 2097406);
		widget.setEvents(player, 1265, 26, 0, 40, 10223616);
	}
	
	function handleBuyButton (player, slot, option) {
		setSelectedItem(player, ENGINE.getVarp(player, 304), slot);
		var amount = 0;
		var objId = inv.getObjId(player, ENGINE.getVarp(player, 304), slot);
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
			amount = inv.total(player, objId, ENGINE.getVarp(player, 304));
			break;
		}
		if (amount) {
			buyItem(player, objId, amount);
		}
	}
	
	function handleTakeButton (player, slot, option) {
		if (!ENGINE.containerReady(player, ENGINE.getVarp(player, 305))) {
			if (util.isAdmin(player)) {
				ENGINE.sendMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID="+ENGINE.getVarp(player, 305));
			} else {
				ENGINE.sendMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}				
			return;
		}
		setSelectedItem(player, ENGINE.getVarp(player, 305), slot);
		var amount = 0;
		var objId = inv.getObjId(player, ENGINE.getVarp(player, 305), slot);
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
			amount = inv.total(player, objId, ENGINE.getVarp(player, 305));
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
		ENGINE.setVarp(player, 299, invId);
		ENGINE.setVarp(player, 301, slot);
		var objId = inv.getObjId(player, invId, slot);
		ENGINE.setVarp(player, 300, objId);
		ENGINE.setVarp(player, 302, Math.min(Math.max(ENGINE.getVarp(player, 302), 1), inv.total(player, objId, invId)));
		ENGINE.setVarc(player, 2361, config.objDesc(objId));//item examine
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
		} else if (objId == 995 || objId == ENGINE.getVarp(player, 306)) {
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
		ENGINE.setVarc(player, 1879, canSell);//Bitpacked can sell
	}
	
	function getMaxBuySellAmount (player, objId) {
		if (ENGINE.getVarp(player, 299) === Inv.BACKPACK) {
			return Math.max(inv.total(player, objId, Inv.BACKPACK), 1);
		} else {
			var shopStock = inv.total(player, objId, ENGINE.getVarp(player, 299));
			if (!config.objStackable(objId)) {
				var freeSpace = inv.freeSpace(player, Inv.BACKPACK);
				return Math.max(Math.min(shopStock, freeSpace), 1);
			} else {
				return Math.max(shopStock, 1);
			}				
		}
	}
	
	function buyItem (player, objId, amount, confirmed) {
		var invId = ENGINE.getVarp(player, 304);
		var currency = ENGINE.getVarp(player, 306);
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
			ENGINE.setVarp(player, 302, amount);
			ENGINE.setVarp(player, 300, objId);
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
		var shopInv = ENGINE.getVarp(player, 304);
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
			ENGINE.setVarp(player, 302, amount);
			ENGINE.setVarp(player, 300, objId);
			widget.hide(player, 1265, 63, false);
			return;
		}
		
		//Remove items from the player's backpack
		inv.take(player, objId, amount, Inv.BACKPACK);

		//Add items to the shop's stock
		inv.give(player, config.objUncert(objId), amount, shopInv);
		
		//Give currency back to the player
		inv.give(player, ENGINE.getVarp(player, 306), amount*value);
		
		//Refresh the sellability of items
		sendBackpackCanSell(player, shopInv);
	}
	
	function takeItem (player, objId, amount) {
		var invId = ENGINE.getVarp(player, 305);
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
		sendBackpackCanSell(player, ENGINE.getVarp(player, 304));
	}
};