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
import { Player } from "engine/models";
import _config from "engine/config";
import _inv from "engine/inv";
import { Inv } from "engine/enums";
import { varbit, setVarBit } from "engine/var";

import { invTotal, takeItem, giveItem, invHasSpace, invUsedSpace } from "shared/inv";
import { sendDebugMessage, sendMessage } from "shared/chat";
import { isBorrowing, lendItem } from "./loan";
import { INTEGER_MAX } from "shared/const";
import { checkOverflow } from "shared/util";

export function offerTradeItem (player: Player, objId: number, amount: number, slot?: number) {
	amount = Math.min(amount, invTotal(player, objId));
	takeItem(player, objId, amount, Inv.BACKPACK, slot);
	giveItem(player, objId, amount, Inv.TRADE);
	sendDebugMessage(player, "Offering item: "+objId+", slot="+slot+", amount="+amount);
}

export function offerLoanItem (player: Player, objId: number, slot: number) {
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (!targetPlayer) {
		return;
	} else if (!isBorrowing(player)) {
		sendMessage(player, "[TODO:Message]Other player cannot accept lent item");
	} else if (!invHasSpace(player, Inv.LOAN_OFFER) || !invHasSpace(player, Inv.LOAN_RETURN)) {
		sendMessage(player, "You've already lent out an item; you cannot lend out any more items until it's been returned and you've collected it from your Returned Items box.");
		sendMessage(player, "Most bankers will let you access your Returned Items box.");
	} else if (_config.objLent(objId) === objId) {
		sendMessage(player, "That item cannot be lent.");
	} else {
		takeItem(player, objId, 1, Inv.BACKPACK, slot);
		giveItem(player, objId, 1, Inv.LOAN_OFFER);
		setVarBit(player, 1046, 0);
		setVarBit(targetPlayer, 1047, 0);
		//api.sendMessage(player, "Offering loan item: "+item+", slot="+slot);
	}
}

export function removeTradeItem (player: Player, objId: number, amount: number, slot: number) {
	amount = Math.min(amount, invTotal(player, objId, Inv.TRADE));
	takeItem(player, objId, amount, Inv.TRADE, slot);
	giveItem(player, objId, amount);
}

export function removeLoanItem (player: Player, objId: number) {
	takeItem(player, objId, 1, Inv.LOAN_OFFER);
	giveItem(player, objId, 1);
	setVarBit(player, 1046, 0);
	var targetPlayer = ENGINE.getInteractionTarget(player);
	if (targetPlayer) {
		setVarBit(targetPlayer, 1047, 0);
	}
}

export function startTrade (player: Player, targetPlayer: Player) {
	_inv.send(player, Inv.TRADE);
	_inv.sendOther(player, targetPlayer, Inv.TRADE);
	_inv.send(player, Inv.LOAN_OFFER);
	_inv.sendOther(player, targetPlayer, Inv.LOAN_OFFER);
	_inv.send(player, Inv.LOAN_RETURN);
}

export function clearTrade (player: Player) {
	ENGINE.setTradeAccepted(player, false);
	var objId = _inv.getObject(player, Inv.LOAN_OFFER, 0);
	if (objId !== -1) {
		removeLoanItem(player, objId);
	}
	for (var slot=0; slot<28; slot++) {
		objId = _inv.getObject(player, Inv.TRADE, slot);
		if (objId !== -1) {
			removeTradeItem(player, objId, INTEGER_MAX, slot);
		}
	}
}

export function tradeItems (player1: Player, player2: Player) {
	if (!hasSpaceForTrade(player1, player2)) {
		sendMessage(player1, "You don't have enough space in your inventory for this trade.");
		sendMessage(player2, "Other player doesn't have enough space in their inventory for this trade.");
	} else if (!hasSpaceForTrade(player2, player1)) {
		sendMessage(player2, "You don't have enough space in your inventory for this trade.");
		sendMessage(player1, "Other player doesn't have enough space in their inventory for this trade.");
	} else {
		var loanObj1 = _inv.getObject(player1, Inv.LOAN_OFFER, 0);
		var loanObj2 = _inv.getObject(player2, Inv.LOAN_OFFER, 0);
		var duration;
		if (loanObj1 !== -1) {
			duration = varbit(player1, 1046);
			takeItem(player1, loanObj1, 1, Inv.LOAN_OFFER);
			lendItem(player1, player2, loanObj1, duration);
		}
		if (loanObj2 !== -1) {
			duration = varbit(player2, 1046);
			takeItem(player2, loanObj2, 1, Inv.LOAN_OFFER);
			lendItem(player2, player1, loanObj2, duration);
		}
		sendTrade(player1, player2);
		sendTrade(player2, player1);

		sendMessage(player1, "Accepted trade.");
		sendMessage(player2, "Accepted trade.");
	}
}

function getTotalTradeSize (player: Player) {
	return invUsedSpace(player, Inv.TRADE) + invUsedSpace(player, Inv.LOAN_OFFER);
}

function hasSpaceForTrade (toPlayer: Player, fromPlayer: Player) {
	var tradeSize = getTotalTradeSize(fromPlayer);
	if (_inv.freeSpace(toPlayer, Inv.BACKPACK) < tradeSize) {
		return false;
	} else {
		for (var slot=0; slot<28; slot++) {
			var objId = _inv.getObject(fromPlayer, Inv.TRADE, slot);
			var count = _inv.getCount(fromPlayer, Inv.TRADE, slot);
			if (objId !== -1) {
				if (checkOverflow(invTotal(toPlayer, objId), count)) {
					return false;
				}
			}
		}
	}
	return true;
}

function sendTrade (fromPlayer: Player, toPlayer: Player) {
	for (var slot=0; slot<28; slot++) {
		var p1objId = _inv.getObject(fromPlayer, Inv.TRADE, slot);
		var p1objCount = _inv.getCount(fromPlayer, Inv.TRADE, slot);
		if (p1objId !== -1) {
			_inv.clearSlot(fromPlayer, Inv.TRADE, slot);
			giveItem(toPlayer, p1objId, p1objCount);
		}
	}
}
