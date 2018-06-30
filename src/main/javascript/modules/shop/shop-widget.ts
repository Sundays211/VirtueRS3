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
import { EventType, Inv } from 'engine/enums';
import { Player } from 'engine/models';
import _events from 'engine/events';
import _config from 'engine/config';
import _inv from 'engine/inv';
import { varp, setVarp, setVarc, setVarBit } from 'engine/var';

import { sendDebugMessage, sendSpamMessage } from 'shared/chat';
import { isAdmin, defaultHandler } from 'shared/util';
import { takeItem, invTotal, giveItem } from 'shared/inv';
import { hideWidget, setWidgetText, setWidgetEvents } from 'shared/widget';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/02/2015
 */
_events.bindEventListener(EventType.IF_OPEN, 1265, (ctx) => {
	initShop(ctx.player);
});

_events.bindEventListener(EventType.IF_CLOSE, 1265, (ctx) => {
	setVarp(ctx.player, 304, -1);
	setVarp(ctx.player, 305, -1);
	setVarp(ctx.player, 306, -1);
	setVarp(ctx.player, 1876, -1);
	setVarc(ctx.player, 1878, -1);
});

_events.bindEventListener(EventType.IF_BUTTON, 1265, (ctx) => {
	var player = ctx.player;

	if (varp(player, 304) != -1 && !ENGINE.containerReady(player, varp(player, 304))) {
		if (isAdmin(player)) {
			sendDebugMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID=" + varp(player, 304));
		} else {
			sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
		}
		return;
	}

	const selectedObject = varp(player, 300) as number;
	const selectedAmount = varp(player, 302) as number;

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
			setVarp(player, 303, 0);
			return;
		case 29://Switch to "Sell Items"
			setVarp(player, 303, 1);
			return;
		case 49://Show full names
			setVarBit(player, 987, 1);
			return;
		case 50://Show icons
			setVarBit(player, 987, 0);
			return;
		case 205://Buy/Take/Sell
			if (varp(player, 299) === varp(player, 304)) {
				buyItem(player, selectedObject, selectedAmount);
			} else if (varp(player, 299) === Inv.BACKPACK) {
				sellItem(player, selectedObject, selectedAmount);
			} else if (varp(player, 299) === varp(player, 305)) {
				takeItem(player, selectedObject, selectedAmount);
			}
			return;
		case 15://Add one
			if (varp(player, 302) < getMaxBuySellAmount(player, selectedObject)) {
				setVarp(player, 302, selectedAmount + 1);
			}
			return;
		case 212://Add 5
			setVarp(player, 302, Math.min(selectedAmount + 5, getMaxBuySellAmount(player, selectedObject)));
			return;
		case 215://Set max amount
			setVarp(player, 302, getMaxBuySellAmount(player, selectedObject));
			return;
		case 218://Subtract 1
			if (varp(player, 302) > 1) {
				setVarp(player, 302, selectedAmount - 1);
			}
			return;
		case 221://Subtract 5
			setVarp(player, 302, Math.max(selectedAmount - 5, 1));
			return;
		case 224://Set min amount
			setVarp(player, 302, 1);
			return;
		case 256:
		case 266://Continue button
			hideWidget(player, 1265, 64, true);
			return;
		case 251://Confirm buy
			buyItem(player, selectedObject, selectedAmount, true);
			hideWidget(player, 1265, 62, true);
			return;
		case 242://Cancel buy
		case 232://Clicked area around buy warning
			hideWidget(player, 1265, 62, true);
			return;
		case 189://Confirm sell
			sellItem(player, selectedObject, selectedAmount, true);
			hideWidget(player, 1265, 62, true);
			return;
		case 197://Cancel sell
		case 1://Clicked area around sell warning
			hideWidget(player, 1265, 63, true);
			return;
		default:
			defaultHandler(ctx, "shop");
			return;
	}
});

function initShop(player: Player) {
	//varp(player, 304, 4);
	//varp(player, 305, -1);
	setVarp(player, 306, 995);//Currency
	var shopId = varp(player, 304) as Inv;
	if (shopId != -1) {
		if (!ENGINE.containerReady(player, shopId)) {
			if (isAdmin(player)) {
				sendDebugMessage(player, "The stock for this shop has not been added to ContainerState.java. ContainerID=" + shopId);
			} else {
				sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}
			return;
		}
		ENGINE.sendInv(player, shopId);
	}
	var freeStockId = varp(player, 305);
	if (freeStockId !== -1) {
		if (!ENGINE.containerReady(player, freeStockId)) {
			if (isAdmin(player)) {
				sendDebugMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID=" + freeStockId);
			} else {
				sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
			}
			return;
		}
		ENGINE.sendInv(player, freeStockId);
	}
	sendBackpackCanSell(player, shopId);
	setWidgetEvents(player, 1265, 20, 0, 40, 2097406);
	setWidgetEvents(player, 1265, 21, 0, 40, 2097406);
	setWidgetEvents(player, 1265, 26, 0, 40, 10223616);
}

function handleBuyButton(player: Player, slot: number, option: number) {
	const invId = varp(player, 304) as Inv;
	setSelectedItem(player, invId, slot);
	var amount = 0;
	var objId = _inv.getObject(player, invId, slot);
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
			amount = invTotal(player, objId, invId);
			break;
	}
	if (amount) {
		buyItem(player, objId, amount);
	}
}

function handleTakeButton(player: Player, slot: number, option: number) {
	const invId = varp(player, 305) as Inv;
	if (!ENGINE.containerReady(player, invId)) {
		if (isAdmin(player)) {
			sendDebugMessage(player, "The free stock for this shop has not been added to ContainerState.java. ContainerID=" + invId);
		} else {
			sendDebugMessage(player, "This shop is not fully implemented. Please contact an admin for assistance.");
		}
		return;
	}
	setSelectedItem(player, invId, slot);
	var amount = 0;
	var objId = _inv.getObject(player, invId, slot);
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
			amount = invTotal(player, objId, invId);
			break;
	}
	if (amount > 0) {
		takeShopItem(player, objId, amount);
	}

}

function handleSellButton(player: Player, slot: number, option: number) {
	setSelectedItem(player, Inv.BACKPACK, slot);
	var amount = 0;
	var objId = _inv.getObject(player, Inv.BACKPACK, slot);
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

function setSelectedItem(player: Player, invId: Inv, slot: number) {
	setVarp(player, 299, invId);
	setVarp(player, 301, slot);
	var objId = _inv.getObject(player, invId, slot);
	setVarp(player, 300, objId);
	const amount = Math.min(Math.max(varp(player, 302) as number, 1), invTotal(player, objId, invId));
	setVarp(player, 302, amount);
	setVarc(player, 2361, _config.objDesc(objId));//item examine
	//api.sendMessage(player, "Setting selected item to inv="+inv+", slot="+slot);
}

function showMessage(player: Player, message: string) {
	sendSpamMessage(player, message);
	hideWidget(player, 1265, 64, false);
	setWidgetText(player, 1265, 260, message);
}


function getBuyCost(objId: number): number {
	return Math.max(_config.objCost(objId), 1);
}

function getSellPrice(objId: number): number {
	var price = Math.floor((_config.objCost(objId) * 30) / 100);
	return Math.max(price, 1);
}

function canSellTo(player: Player, invId: Inv, objId: number): boolean {
	objId = _config.objUncert(objId);
	if (_config.enumValue(921, invId) != 1) {
		if (_inv.baseStock(invId, objId) == -1) {
			return false;
		}
	} else if (!_config.objSellToGeneralStore(objId)) {
		return false;
	} else if (objId === 995 || objId === varp(player, 306)) {
		return false;
	}
	return true;
}

function sendBackpackCanSell(player: Player, shopInv: Inv) {
	var canSell = 0;
	for (let slot = 0; slot < 28; slot++) {
		let objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (objId !== -1 && canSellTo(player, shopInv, objId)) {
			canSell |= 1 << slot;
		}
	}
	setVarc(player, 1879, canSell);//Bitpacked can sell
}

function getMaxBuySellAmount(player: Player, objId: number) {
	if (varp(player, 299) === Inv.BACKPACK) {
		return Math.max(invTotal(player, objId, Inv.BACKPACK), 1);
	} else {
		var shopStock = invTotal(player, objId, varp(player, 299) as number);
		if (!_config.objStackable(objId)) {
			var freeSpace = _inv.freeSpace(player, Inv.BACKPACK);
			return Math.max(Math.min(shopStock, freeSpace), 1);
		} else {
			return Math.max(shopStock, 1);
		}
	}
}

function buyItem(player: Player, objId: number, amount: number, confirmed: boolean = false) {
	var invId = varp(player, 304) as Inv;
	var currency = varp(player, 306) as number;
	amount = Math.min(amount, invTotal(player, objId, invId));
	if (amount < 1) {
		return;//Shop has no stock
	}
	if (!_config.objStackable(objId)) {
		amount = Math.min(amount, _inv.freeSpace(player, Inv.BACKPACK));
	} else if (invTotal(player, objId, invId) < 1 && _inv.freeSpace(player, Inv.BACKPACK) < 1) {
		showMessage(player, "You have no inventory space at the moment and cannot buy anything.");
		return;//Full backpack
	}
	if (amount < 1) {
		showMessage(player, "You have no inventory space at the moment and cannot buy anything.");
		return;//Full backpack
	}
	var cost = getBuyCost(objId);

	//Make sure the player has enough money
	var currentMoneyAmount = invTotal(player, currency);
	if (amount > (currentMoneyAmount / cost)) {
		showMessage(player, "You don't have enough coins to buy " + amount + ".");
		amount = (currentMoneyAmount / cost);
	}
	if (amount < 1) {
		return;//Can't afford any
	}
	if (!confirmed && cost * amount > 100000) {
		//If the item costs more than 100k, warn the player first
		setVarp(player, 302, amount);
		setVarp(player, 300, objId);
		hideWidget(player, 1265, 62, false);
		return;
	}

	//Remove money from the player
	takeItem(player, currency, amount * cost);

	//Remove the item from the shop
	takeItem(player, objId, amount, invId);

	//Give the item to the player
	giveItem(player, objId, amount);

	sendBackpackCanSell(player, invId);
}

function sellItem(player: Player, objId: number, amount: number, confirmed: boolean = false) {
	var shopInv = varp(player, 304) as Inv;
	if (!canSellTo(player, shopInv, objId)) {
		return;//Can't sell this item
	}

	amount = Math.min(amount, invTotal(player, objId, Inv.BACKPACK));
	if (invTotal(player, objId, shopInv) < 1 &&
		_inv.baseStock(shopInv, objId) === -1 &&
		_inv.freeSpace(player, shopInv) < 1) {
		return;//Shop does not have space for item
	}

	var value = getSellPrice(objId);
	if (!confirmed && value * amount > 30000) {
		//If the player is trying to sell an item worth more than 30k, warn them first
		setVarp(player, 302, amount);
		setVarp(player, 300, objId);
		hideWidget(player, 1265, 63, false);
		return;
	}

	//Remove items from the player's backpack
	takeItem(player, objId, amount, Inv.BACKPACK);

	//Add items to the shop's stock
	giveItem(player, _config.objUncert(objId), amount, shopInv);

	//Give currency back to the player
	giveItem(player, varp(player, 306) as number, amount * value);

	//Refresh the sellability of items
	sendBackpackCanSell(player, shopInv);
}

function takeShopItem(player: Player, objId: number, amount: number) {
	var invId = varp(player, 305) as Inv;
	amount = Math.min(amount, invTotal(player, objId, invId));
	if (amount < 1) {
		return;//Shop has no stock
	}
	if (!_config.objStackable(objId)) {
		amount = Math.min(amount, _inv.freeSpace(player, Inv.BACKPACK));
	} else if (invTotal(player, objId, Inv.BACKPACK) < 1 &&
		_inv.freeSpace(player, Inv.BACKPACK) < 1) {
		showMessage(player, "You don't have enough inventory space to take that.");
		return;//Full backpack
	}
	if (amount < 1) {
		showMessage(player, "You don't have enough inventory space to take that.");
		return;//Full backpack
	}

	//Remove the item from the shop's stock
	takeItem(player, objId, amount, invId);

	//Add the item to the player's backpack
	giveItem(player, objId, amount);

	//Refresh the sellability of items
	sendBackpackCanSell(player, varp(player, 304) as Inv);
}
