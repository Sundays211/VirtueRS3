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
import _events from 'engine/events';
import _inv from 'engine/inv';
import _config from 'engine/config';
import _entity from 'engine/entity';
import { varbit, setVarc, setVarBit } from 'engine/var';
import { Player } from 'engine/models';

import { setWidgetText, hideWidget, openOverlaySub, closeAllWidgets, setWidgetEvents, closeOverlaySub, openCentralWidget } from 'shared/widget';
import { invHasSpace } from 'shared/inv';
import { runClientScript, defaultHandler } from 'shared/util';
import { INTEGER_MAX, COINS_OBJ } from 'shared/const';
import { sendMessage } from 'shared/chat';
import { countDialog } from 'shared/dialog';

import { startTrade, removeTradeItem, removeLoanItem, offerLoanItem, offerTradeItem, tradeItems, clearTrade } from './trade-logic';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/01/2015
 */
_events.bindEventListener(EventType.IF_OPEN, 334, (ctx) => {
	var player = ctx.player;

	setWidgetText(player, 334, 14, "Are you sure you want to make this trade?");
	ENGINE.setTradeAccepted(player, false);
	if (!invHasSpace(player, Inv.LOAN_OFFER)) {
		var loanedObjId = _inv.getObject(player, Inv.LOAN_OFFER, 0);
		const duration = varbit(player, 1046);
		let durationString;
		if (duration === 0) {
			durationString = "until logout";
		} else if (duration == 1) {
			durationString = "for 1 hour";
		} else {
			durationString = "for " + duration + " hours";
		}
		//api.setVarBit(targetPlayer, 1047, value);
		hideWidget(player, 334, 17, false);
		setWidgetText(player, 334, 33, "Lend: <col=ffffff>" + _config.objName(loanedObjId) + ", " + durationString);
	}
});

_events.bindEventListener(EventType.IF_OPEN, 335, (ctx) => {
	var player = ctx.player;
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (!targetPlayer) {
		return;
	}
	startTrade(player, targetPlayer);
	openOverlaySub(player, 1008, 336, false);
	//api.openWidget(player, 1477, 391, 336, false);
	//api.openWidget(player, 1477, 390, 449, false);
	runClientScript(player, 8178, []);
	runClientScript(player, 8865, [1]);
	setWidgetText(player, 335, 31, "");
	setVarc(player, 2504, _entity.getName(targetPlayer));
	hideWidget(player, 335, 35, false);

	hideWidget(player, 335, 38, false);
	hideWidget(player, 335, 40, false);

	runClientScript(player, 150, ["Value<col=ff9040>", "Remove-X<col=ff9040>", "Remove-All<col=ff9040>", "Remove-10<col=ff9040>", "Remove-5<col=ff9040>", "Remove<col=ff9040>", -1, 0, 7, 4, 90, 21954584]);
	setWidgetEvents(player, 335, 24, 0, 27, 1150);
	runClientScript(player, 695, ["Value<col=ff9040>", -1, 0, 7, 4, 90, 21954587]);
	setWidgetEvents(player, 335, 27, 0, 27, 1026);
	runClientScript(player, 150, ["Lend<col=ff9040>", "Value<col=ff9040>", "Offer-X<col=ff9040>", "Offer-All<col=ff9040>", "Offer-10<col=ff9040>", "Offer-5<col=ff9040>", "Offer<col=ff9040>", -1, 0, 7, 4, 93, 22020096]);
	setWidgetEvents(player, 336, 0, 0, 27, 1278);
	setWidgetEvents(player, 335, 55, -1, -1, 1026);
	setWidgetEvents(player, 335, 56, -1, -1, 1030);
	setWidgetEvents(player, 335, 51, -1, -1, 1024);
	setVarc(player, 2519, _entity.getName(targetPlayer));
	refreshTrade(player);
	//api.setWidgetText(player, 335, 22, "has "+api.freeSpaceTotal(targetPlayer, Inv.BACKPACK)+" free inventory slots.");
	//api.setVarc(player, 729, 0);
	//api.setVarc(player, 697, 0);
});

_events.bindEventListener(EventType.IF_OPEN, 336, (ctx) => {
	runClientScript(ctx.player, 8862, [0, 2]);
	runClientScript(ctx.player, 8862, [0, 3]);
});

_events.bindEventListener(EventType.IF_BUTTON, 334, (ctx) => {
	switch (ctx.component) {//Confirm screen
		case 47://Accept
			acceptTrade(ctx.player, true);
			return true;
		case 52://Decline
			//Trade.cancelTrade(player);
			closeAllWidgets(ctx.player);
			return true;
		default:
			return false;
	}
});

_events.bindEventListener(EventType.IF_CLOSE, [334, 335], (ctx) => {
	setVarc(ctx.player, 2504, "");
	clearTrade(ctx.player);
	cancelTrade(ctx.player);
	ENGINE.clearInteractionTarget(ctx.player);
});

_events.bindEventListener(EventType.IF_CLOSE, 336, (ctx) => {
	runClientScript(ctx.player, 8862, [1, 2]);
	runClientScript(ctx.player, 8862, [1, 3]);
});

_events.bindEventListener(EventType.IF_BUTTON, 335, async (ctx) => {
	var player = ctx.player;

	let objId, targetPlayer, count = 0;

	switch (ctx.component) {
		case 24://Trade screen
			objId = _inv.getObject(player, Inv.TRADE, ctx.slot);
			if (objId === -1) {
				return;
			}
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
					count = await countDialog(player, "Remove how many items from your offer?");
					return;
				case 6://Value
					showValue(player, objId);
					return;
				case 10://Examine
					sendMessage(player, _config.objDesc(objId));
					return;
				default:
					defaultHandler(ctx, "trade");
					return;
			}
			if (count > 0) {
				removeTradeItem(player, objId, count, ctx.slot);
				refreshTrade(player);
			}
			return;
		case 27://Other player offer
			targetPlayer = ENGINE.getInteractionTarget(player);
			if (!targetPlayer) {
				return;
			}
			objId = _inv.getObject(targetPlayer, Inv.TRADE, ctx.slot);
			if (objId === -1) {
				return;
			}
			if (ctx.button == 1) {
				showValue(player, objId);
			} else if (ctx.button == 10) {
				sendMessage(player, _config.objDesc(objId));
			} else {
				defaultHandler(ctx, "trade");
			}
			return;
		case 38://Add from money pouch
			count = await countDialog(player, "Add how many coins to your offer?");
			offerCoins(player, count);
			refreshTrade(player);
			return;
		case 51://Other player loan item
			targetPlayer = ENGINE.getInteractionTarget(player);
			if (!targetPlayer) {
				return;
			}
			objId = _inv.getObject(targetPlayer, Inv.LOAN_OFFER, 0);
			if (objId !== -1) {
				sendMessage(player, _config.objDesc(objId));
			}
			return;
		case 55://Remove loan item
			objId = _inv.getObject(targetPlayer, Inv.LOAN_OFFER, 0);
			if (objId === -1) {
				return;
			}
			if (ctx.button == 1) {
				removeLoanItem(player, objId);
				refreshTrade(player);
			} else if (ctx.button == 10) {
				sendMessage(player, _config.objDesc(objId));
			} else {
				defaultHandler(ctx, "trade");
			}
			return false;
		case 56://Select loan duration
			selectLoanDuration(player);
			return;
		case 60://Accept
			acceptTrade(player);//For now, trade only has one screen.
			return;
		case 66://Decline
			//Trade.cancelTrade(player);
			closeAllWidgets(player);
			return;
		default:
			defaultHandler(ctx, "trade");
			return;
	}
});
_events.bindEventListener(EventType.IF_BUTTON, 336, async (ctx) => {
	var player = ctx.player;

	if (ctx.component !== 0) {
		defaultHandler(ctx, "trade inventory");
		return;
	}
	var objId = _inv.getObject(player, Inv.BACKPACK, ctx.slot);
	if (objId === -1) {
		return;
	}
	if (ENGINE.getCentralWidget(player) !== 335) {
		if (ctx.button == 10) {
			sendMessage(player, _config.objDesc(objId));
		} else {
			sendMessage(player, "You cannot add new items in this trade screen!");
		}
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
			count = await countDialog(player, "Add how many items to your offer?");
			return;
		case 6://Value
			showValue(player, objId);
			return;
		case 7://Lend
			offerLoanItem(player, objId, ctx.slot);
			refreshTrade(player);
			return;
		case 10://Examine
			sendMessage(player, _config.objDesc(objId));
			return;
	}
	if (count > 0) {
		if (!_config.objTradable(objId)) {
			sendMessage(player, "That item isn't tradeable.");
		} else {
			offerTradeItem(player, objId, count, ctx.slot);
			refreshTrade(player);
		}
	}
});

function offerCoins(player: Player, amount: number) {
	//Money pouch uses the same inv methods
	offerTradeItem(player, COINS_OBJ, amount);
}

function refreshTrade(player: Player) {
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (targetPlayer) {
		_inv.sendOther(player, targetPlayer, Inv.TRADE);
		_inv.sendOther(player, targetPlayer, Inv.LOAN_OFFER);
	}
	setWidgetText(player, 335, 31, "");
	ENGINE.setTradeAccepted(targetPlayer, false);
	ENGINE.setTradeAccepted(player, false);//Remove "accept" if the trade is modified
	var total = 0;
	for (var slot = 0; slot < 28; slot++) {
		var objId = _inv.getObject(player, Inv.TRADE, slot);
		var objCount = _inv.getCount(player, Inv.TRADE, slot);
		if (objId !== -1) {
			if (ENGINE.getExchangeCost(objId) !== -1) {
				total += ENGINE.getExchangeCost(objId) * objCount;
			} else if (objId === COINS_OBJ) {
				total += objCount;
			}
		}
	}
	setVarc(player, 729, total);
	setVarc(targetPlayer, 697, total);
	setWidgetText(targetPlayer, 335, 22, "has " + _inv.freeSpace(player, Inv.BACKPACK) + " free inventory slots.");
}

function showValue(player: Player, objId: number) {
	var value = ENGINE.getExchangeCost(objId);
	if (value !== -1) {
		sendMessage(player, _config.objName(objId) + ": market price is " + value + " coins.");
	}
}

async function selectLoanDuration(player: Player) {
	const duration = await countDialog(player, "Set the loan duration in hours: (1-72)<br>" +
		"(Enter 0 for 'Just until logout'.)");
	if (duration <= 72) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (targetPlayer) {
			setVarBit(player, 1046, duration);
			setVarBit(targetPlayer, 1047, duration);
		}
	}
}

function cancelTrade(player: Player) {
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (targetPlayer) {
		closeOverlaySub(targetPlayer, 1007, false);
		closeOverlaySub(targetPlayer, 1008, false);
		runClientScript(targetPlayer, 8862, [1, 2]);
		runClientScript(targetPlayer, 8862, [1, 3]);
		clearTrade(targetPlayer);
		ENGINE.clearInteractionTarget(targetPlayer);
		sendMessage(targetPlayer, "Other player declined trade.");
	}
}

function acceptTrade(player: Player, isConfirm = false) {
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (!targetPlayer) {
		return;
	}
	setWidgetText(targetPlayer, 335, 31, "Other player has accepted.");
	setWidgetText(targetPlayer, 334, 14, "Other player has accepted.");
	if (!ENGINE.tradeAccepted(targetPlayer)) {
		ENGINE.setTradeAccepted(player, true);
		setWidgetText(player, 335, 31, "Waiting for other player...");
		setWidgetText(player, 334, 14, "Waiting for other player...");
	} else if (isConfirm) {
		tradeItems(player, targetPlayer);

		closeOverlaySub(player, 1007, false);
		closeAllWidgets(player);
		closeOverlaySub(targetPlayer, 1007, false);
		closeAllWidgets(targetPlayer);
	} else {
		closeOverlaySub(targetPlayer, 1007, false);
		openCentralWidget(targetPlayer, 334, false);
		closeOverlaySub(player, 1007, false);
		openCentralWidget(player, 334, false);
	}
}
