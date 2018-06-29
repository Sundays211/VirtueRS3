/**
 * Copyright (c) 2016 Virtue Studios
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
import { Inv, EventType } from 'engine/enums';
import { Player } from 'engine/models';
import _events from 'engine/events';
import _inv from 'engine/inv';
import _config from 'engine/config';
import { setVarc } from 'engine/var';

import { openOverlaySub, setWidgetEvents } from 'shared/widget';
import { runClientScript, defaultHandler } from 'shared/util';
import { requestCount } from 'shared/dialog';
import { sendMessage } from 'shared/chat';
import { invTotal, takeItem, giveItem } from 'shared/inv';
import { INTEGER_MAX } from 'shared/const';

const PRICE_VARCS = [700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727];

_events.bindEventListener(EventType.IF_OPEN, 206, (ctx) => {
	//Received if sub: parent=1477, parentSlot=426, ifID=206, options=0
	openOverlaySub(ctx.player, 1008, 207, false);
	ENGINE.sendInv(ctx.player, Inv.TRADE);
	//Run client script: [8178], params=
	runClientScript(ctx.player, 8865, [1]);
	setWidgetEvents(ctx.player, 206, 5, 0, 54, 1086);
	runClientScript(ctx.player, 150, ["Add-X<col=ff9040>", "Add-All<col=ff9040>", "Add-10<col=ff9040>", "Add-5<col=ff9040>", "Add<col=ff9040>", -1, 1, 7, 4, 93, 13565952]);
	setWidgetEvents(ctx.player, 207, 0, 0, 27, 2360382);
	runClientScript(ctx.player, 8862, [0, 2]);
});

_events.bindEventListener(EventType.IF_CLOSE, 206, function(ctx) {
	runClientScript(ctx.player, 8862, [1, 2]);
	removeAll(ctx.player);
});

_events.bindEventListener(EventType.IF_BUTTON, 206, function(ctx) {
	switch (ctx.component) {
		case 4://Close button
			return;
		case 5://Remove item
			var objId = _inv.getObject(ctx.player, Inv.TRADE, ctx.slot / 2);
			if (objId === -1) {
				return;
			}
			var count = 0;
			switch (ctx.button) {
				case 1://Add 1
					count = 1;
					break;
				case 2://Add 5
					count = 5;
					break;
				case 3://Add 10
					count = 10;
					break;
				case 4://Add All
					count = INTEGER_MAX;
					break;
				case 5://Add x
					requestCount(ctx.player, "Enter amount:")
						.then((selectedCount) => {
							removeItem(ctx.player, ctx.slot / 2, objId, selectedCount as number);
							updatePrices(ctx.player);
						});
					return;
				case 10://Examine
					sendMessage(ctx.player, _config.objDesc(objId));
					return;
			}
			if (count > 0) {
				removeItem(ctx.player, ctx.slot / 2, objId, count);
				updatePrices(ctx.player);
			}
			return;
		case 8://Add all
			addAll(ctx.player);
			return;
		default:
			defaultHandler(ctx, "price-checker");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 207, (ctx) => {
	var objId = _inv.getObject(ctx.player, Inv.BACKPACK, ctx.slot);
	if (objId === -1) {
		return;
	}
	var count = 0;
	switch (ctx.button) {
		case 1://Add 1
			count = 1;
			break;
		case 2://Add 5
			count = 5;
			break;
		case 3://Add 10
			count = 10;
			break;
		case 4://Add All
			count = INTEGER_MAX;
			break;
		case 5://Add x
			requestCount(ctx.player, "Enter amount:")
				.then((selectedCount) => {
					if (ENGINE.getExchangeCost(objId) == -1) {
						sendMessage(ctx.player, "That item isn't tradeable.");
					} else {
						addItem(ctx.player, ctx.slot, objId, selectedCount as number);
						updatePrices(ctx.player);
					}
				});
			return;
		case 10://Examine
			sendMessage(ctx.player, _config.objDesc(objId));
			return;
	}
	if (count > 0) {
		if (ENGINE.getExchangeCost(objId) == -1) {
			sendMessage(ctx.player, "That item isn't tradeable.");
		} else {
			addItem(ctx.player, ctx.slot, objId, count);
			updatePrices(ctx.player);
		}
	}
});

function addItem(player: Player, slot: number, objId: number, amount: number) {
	amount = Math.min(amount, invTotal(player, objId, Inv.BACKPACK));
	takeItem(player, objId, amount, Inv.BACKPACK, slot);
	giveItem(player, objId, amount, Inv.TRADE);
}

function removeItem(player: Player, slot: number, objId: number, amount: number) {
	amount = Math.min(amount, invTotal(player, objId, Inv.TRADE));
	takeItem(player, objId, amount, Inv.TRADE, slot);
	giveItem(player, objId, amount, Inv.BACKPACK);
}

function addAll(player: Player) {
	var partFail = false;
	for (var slot = 0; slot < 28; slot++) {
		var objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (objId !== -1) {
			if (ENGINE.getExchangeCost(objId) == -1) {
				partFail = true;
			} else {
				addItem(player, slot, objId, INTEGER_MAX);
			}
		}
	}
	if (partFail) {
		sendMessage(player, "One or more items were untradable, so couldn't be added.");
	}
	updatePrices(player);
}

function removeAll(player: Player) {
	for (var slot = 0; slot < 28; slot++) {
		var objId = _inv.getObject(player, Inv.TRADE, slot);
		if (objId !== -1) {
			removeItem(player, slot, objId, INTEGER_MAX);
		}
	}
	updatePrices(player);
}

function updatePrices(player: Player) {
	var total = 0;
	for (let slot = 0; slot < 28; slot++) {
		const objId = _inv.getObject(player, Inv.TRADE, slot);
		var price = -1;
		if (objId !== -1) {
			price = ENGINE.getExchangeCost(objId);
			total += price * _inv.getCount(player, Inv.TRADE, slot);
		}
		setVarc(player, PRICE_VARCS[slot], price);
	}
	setVarc(player, 728, total);
}
