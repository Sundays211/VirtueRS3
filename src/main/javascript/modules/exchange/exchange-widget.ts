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
import _inv from 'engine/inv';
import _config from 'engine/config';
import { setVarp, setVarBit, varp, setVarc } from 'engine/var';

import { runClientScript, defaultHandler } from 'shared/util';
import { setWidgetEvents, inframeInput, openOverlay, setWidgetText } from 'shared/widget';
import { sendMessage } from 'shared/chat';
import { INTEGER_MAX, COINS_OBJ } from 'shared/const';
import { invTotal, takeItem, giveItem, hasItem, invHasSpace } from 'shared/inv';
import { requestCount } from 'shared/dialog';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/02/2015
 */
_events.bindEventListener(EventType.IF_OPEN, 105, (ctx) => {
	var player = ctx.player;

	setVarp(player, 163, 4);
	setVarp(player, 138, -1);//Exchange slot
	setVarp(player, 139, -1);//Buy or sell (1=buy, 0=sell)
	setVarp(player, 137, 1);//Amount
	setVarp(player, 135, -1);//Item ID
	//api.openOverlaySub(player, 1008, 107, false);
	runClientScript(player, 8178, []);
	runClientScript(player, 8865, [1]);
	setWidgetEvents(player, 105, 63, -1, -1, 8650758);
	setWidgetEvents(player, 105, 65, -1, -1, 8650758);
	setWidgetEvents(player, 105, 99, -1, -1, 263170);
});

_events.bindEventListener(EventType.IF_OPEN, 107, (ctx) => {
	setWidgetEvents(ctx.player, 107, 7, 0, 27, 14682110);
	runClientScript(ctx.player, 8862, [0, 2]);
	runClientScript(ctx.player, 8862, [0, 3]);
});

_events.bindEventListener(EventType.IF_CLOSE, 105, (ctx) => {
	clearOffer(ctx.player);
	setVarBit(ctx.player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
});

_events.bindEventListener(EventType.IF_CLOSE, 107, (ctx) => {
	runClientScript(ctx.player, 8862, [1, 2]);
	runClientScript(ctx.player, 8862, [1, 3]);
});

_events.bindEventListener(EventType.IF_BUTTON, 107, (ctx) => {
	if (ctx.component != 7) {
		defaultHandler(ctx, "exchange inventory");
		return;
	}
	if (ctx.button == 1) {
		offerItem(ctx.player, ctx.slot);
	} else if (ctx.button == 10) {
		var objId = _inv.getObject(ctx.player, Inv.BACKPACK, ctx.slot);
		var desc = _config.objDesc(objId);
		sendMessage(ctx.player, desc);
	} else {
		defaultHandler(ctx, "exchange inventory");
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1666, function(ctx) {
	defaultHandler(ctx, "exchange money pouch");
});

_events.bindEventListener(EventType.IF_BUTTON, 105, function(ctx) {
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
				setVarp(player, 136, (varp(player, 136) as number) - 1);
			}
			return;
		case 124://Increase quantity by one
			if (varp(player, 137) < INTEGER_MAX) {
				setVarp(player, 136, (varp(player, 136) as number) + 1);
			}
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
				setVarp(player, 137, (varp(player, 137) as number) - 1);
			}
			return;
		case 148://Increase price by 1gp
			if (varp(player, 137) < INTEGER_MAX) {
				setVarp(player, 137, (varp(player, 137) as number) + 1);
			}
			return;
		case 152://Decrease price by 5%
			setPrice(player, 95);
			return;
		case 158://Set to exchange price
			setVarp(player, 137, varp(player, 140));
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
			inframeInput(player, 105, 289, (value) => {
				if (value > 0) {
					setVarp(player, 136, (value as number) - 1);
				}
			}, 7, 7);
			return;
		case 298://Custom price
			inframeInput(player, 105, 295, (value) => {
				if (value > 0) {
					setVarp(player, 137, (value as number) - 1);
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
			defaultHandler(ctx, "exchange");
			return;
	}
});


export function openExchange(player: Player) {
	if (ENGINE.getAccountType(player) == 6 || ENGINE.getAccountType(player) == 7 ||
		ENGINE.getAccountType(player) == 8) {
		sendMessage(player, "You cannot use Grand Exchange while an Iron Man.");
		return;
	}
	setVarBit(player, 444, 1);//Pin entered successfully
	setVarBit(player, 29044, 0);//0 - Unlock : 1 - Lock Exchange Tab
	openOverlay(player, 5);
	//api.openCentralWidget(player, 105, false);
}

function openOffer(player: Player, slot: number, isSell: boolean) {
	setVarp(player, 138, slot);
	setVarp(player, 139, isSell ? 1 : 0);
	if (!isSell) {
		searchForItem(player);
	}
}

function viewOffer(player: Player, slot: number) {
	var offer = ENGINE.getExchangeOffer(player, 1, slot);
	if (offer !== null) {
		var returnInv = _config.enumValue(1079, slot) as Inv;
		if (_inv.freeSpace(player, returnInv) == 2 && ENGINE.exchangeOfferFinished(player, 1, slot)) {
			ENGINE.clearExchangeOffer(player, 1, slot);
		} else {
			ENGINE.sendInv(player, returnInv);
			var objId = offer.getOfferItem();
			setVarp(player, 135, objId);
			var exchangePrice = ENGINE.getExchangeCost(objId);
			setVarp(player, 140, exchangePrice);
			setVarc(player, 2354, _config.objDesc(objId));
			setWidgetText(player, 105, 14, _config.objDesc(objId));
			setVarp(player, 138, slot);
		}
	}
}

function clearOffer(player: Player) {
	setVarp(player, 138, -1);
	setVarp(player, 139, -1);
	setVarp(player, 137, 1);
	setVarp(player, 136, 0);
	setVarp(player, 135, -1);
	runClientScript(player, 571, []);
}

function offerItem(player: Player, invSlot: number) {
	if (varp(player, 139) != 1) {
		if (varp(player, 139) == -1) {
			for (var slot = 0; slot < 6; slot++) {
				if (ENGINE.getExchangeOffer(player, 1, slot) === null) {
					setVarp(player, 139, 1);
					setVarp(player, 138, slot);
					break;
				}
			}
			if (varp(player, 139) != 1) {
				sendMessage(player, "Unable to set up Sell Offer at this time.");
				return;
			}
		} else {
			return;
		}
	}

	var objId = _inv.getObject(player, Inv.BACKPACK, invSlot);
	if (objId !== -1) {
		var exchangePrice = ENGINE.getExchangeCost(objId);
		if (exchangePrice != -1) {
			objId = _config.objUncert(objId);
			setVarp(player, 140, exchangePrice);
			setVarp(player, 135, objId);
			setVarp(player, 137, exchangePrice);
			setVarp(player, 136, invTotal(player, objId));
			setVarc(player, 2354, _config.objDesc(objId));
			setWidgetText(player, 105, 14, _config.objDesc(objId));
		} else {
			sendMessage(player, "You can't buy or sell that item on the GE.");
		}
	}
}

function searchForItem(player: Player) {
	inframeInput(player, 105, 301, (objId) => {
		var exchangePrice = ENGINE.getExchangeCost(objId);
		if (exchangePrice != -1) {
			setVarp(player, 140, exchangePrice);
			setVarp(player, 135, objId);
			setVarp(player, 137, exchangePrice);
			setVarc(player, 2354, _config.objDesc(objId as number));
			setWidgetText(player, 105, 14, _config.objDesc(objId as number));
		}
	}, 10, 0);
}

function setPrice(player: Player, percent: number) {
	if (varp(player, 135) === -1) {
		return;
	}
	var currentPrice = varp(player, 137) as number;
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
	setVarp(player, 137, newPrice);
}

function handleQuantityButton(player: Player, button: number) {
	var isSell = varp(player, 139) == 1;
	var offset = isSell ? 0 : varp(player, 136) as number;
	switch (button) {
		case 1:
			setVarp(player, 136, offset + 1);
			break;
		case 2:
			setVarp(player, 136, offset + 10);
			break;
		case 3:
			setVarp(player, 136, offset + 100);
			break;
		case 4:
			if (!isSell) {
				ENGINE.incrementVarp(player, 136, 1000);
			} else if (varp(player, 135) != -1) {
				var objId = varp(player, 135) as number;
				var itemTotal = invTotal(player, objId);
				var certId = _config.objUncert(objId);
				if (certId !== objId) {
					itemTotal += invTotal(player, certId);
				}
				setVarp(player, 136, itemTotal);
			}
			break;
		case 5://Choose amount
			requestCount(player, "Enter the amount you wish to " + (isSell ? "sell" : "purchase") + ":")
				.then((value) => {
					setVarp(player, 136, value);
				});
			break;
	}
}

function submitOffer(player: Player) {
	var slot = varp(player, 138) as number;
	var isSell = varp(player, 139) === 1;
	var objId = varp(player, 135) as number;
	var amount = varp(player, 136) as number;
	var price = varp(player, 137) as number;
	if (amount * price > INTEGER_MAX) {
		sendMessage(player, "Cannot process - total cost is too high!");
		return;
	}
	if (objId !== -1 && amount > 0) {
		var offerInv = _config.enumValue(1078, slot) as number;
		ENGINE.sendInv(player, offerInv);
		if (isSell) {
			var carriedTotal = invTotal(player, objId);
			var certId = _config.objUncert(objId);
			var certTotal = 0;
			if (certId !== objId) {
				certTotal += invTotal(player, certId);
			}
			if ((carriedTotal + certTotal) >= amount) {
				var fullAmount = amount;

				//Grab as much as we can as un-certed objects
				amount = Math.min(carriedTotal, amount);
				takeItem(player, objId, amount, Inv.BACKPACK);

				//And grab the rest as certed objects
				amount = fullAmount - carriedTotal;
				if (amount > 0) {
					takeItem(player, certId, amount, Inv.BACKPACK);
				}

				giveItem(player, objId, fullAmount, offerInv);
				ENGINE.sendExchangeOffer(player, 1, slot, isSell, objId, fullAmount, price);
				clearOffer(player);
			} else {
				sendMessage(player, "You do not have enough of this item in your inventory to cover the offer.");
			}
		} else {
			var totalCoins = price * amount;
			if (hasItem(player, COINS_OBJ, totalCoins)) {
				takeItem(player, COINS_OBJ, totalCoins);
				giveItem(player, COINS_OBJ, totalCoins, offerInv);

				ENGINE.sendExchangeOffer(player, 1, slot, isSell, objId, amount, price);
				clearOffer(player);
			} else {
				sendMessage(player, "You do not have enough coins to cover the offer.");
			}
		}

	}
}

function collectItems(player: Player, slot: number, option: number) {
	var exchangeSlot = varp(player, 138) as number;
	var returnInv = _config.enumValue(1079, exchangeSlot) as Inv;
	var objId = _inv.getObject(player, returnInv, slot);
	var amount = _inv.getCount(player, returnInv, slot);
	if (objId !== COINS_OBJ && !invHasSpace(player)) {
		sendMessage(player, "You don't have enough room in your inventory.");
		return;
	}
	if (!_config.objStackable(objId) &&
		amount > _inv.freeSpace(player, Inv.BACKPACK)) {
		amount = _inv.freeSpace(player, Inv.BACKPACK);
	}
	takeItem(player, objId, amount, returnInv);

	if (option === 1 && amount > 1) {
		objId = _config.objCert(objId);
	}
	giveItem(player, objId, amount);

	if (_inv.freeSpace(player, returnInv) == 2 && ENGINE.exchangeOfferFinished(player, 1, exchangeSlot)) {
		ENGINE.clearExchangeOffer(player, 1, exchangeSlot);
	}
}
