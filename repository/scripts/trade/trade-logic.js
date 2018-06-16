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
/* globals Inv, ENGINE */
var varbit = require('engine/var/bit');
var CONST = require('shared/const');

var config = require('engine/config');
var util = require('shared/util');
var inv = require('shared/inv');
var chat = require('shared/chat');

var loan = require('./loan');

module.exports = (function () {
	return {
		offerItem : offerItem,
		offerLoanItem : offerLoanItem,
		tradeItems : tradeItems,
		startTrade : startTrade,
		clearTrade : clearTrade,
		removeItem : removeItem,
		removeLoanItem : removeLoanItem
	};

	function offerItem (player, objId, amount, slot) {
		amount = Math.min(amount, inv.total(player, objId));
		inv.take(player, objId, amount, Inv.BACKPACK, slot);
		inv.give(player, objId, amount, Inv.TRADE);
		chat.sendDebugMessage(player, "Offering item: "+objId+", slot="+slot+", amount="+amount);
	}

	function offerLoanItem (player, objId, slot) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (!targetPlayer) {
			return;
		} else if (!loan.isBorrowing(player)) {
			chat.sendMessage(player, "[TODO:Message]Other player cannot accept lent item");
		} else if (!inv.hasSpace(player, Inv.LOAN_OFFER) || !inv.hasSpace(player, Inv.LOAN_RETURN)) {
			chat.sendMessage(player, "You've already lent out an item; you cannot lend out any more items until it's been returned and you've collected it from your Returned Items box.");
			chat.sendMessage(player, "Most bankers will let you access your Returned Items box.");
		} else if (config.objLent(objId) === objId) {
			chat.sendMessage(player, "That item cannot be lent.");
		} else {
			inv.take(player, objId, 1, Inv.BACKPACK, slot);
			inv.give(player, objId, 1, Inv.LOAN_OFFER);
			varbit(player, 1046, 0);
			varbit(targetPlayer, 1047, 0);
			//api.sendMessage(player, "Offering loan item: "+item+", slot="+slot);
		}
	}

	function removeLoanItem (player, objId) {
		inv.take(player, objId, 1, Inv.LOAN_OFFER);
		inv.give(player, objId, 1);
		varbit(player, 1046, 0);
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (targetPlayer) {
			varbit(targetPlayer, 1047, 0);
		}
	}

	function removeItem (player, objId, amount, slot) {
		amount = Math.min(amount, inv.total(player, objId, Inv.TRADE));
		inv.take(player, objId, amount, Inv.TRADE, slot);
		inv.give(player, objId, amount);
	}

	function startTrade (player, targetPlayer) {
		ENGINE.sendInv(player, Inv.TRADE);
		ENGINE.sendInvTo(player, targetPlayer, Inv.TRADE);
		ENGINE.sendInv(player, Inv.LOAN_OFFER);
		ENGINE.sendInvTo(player, targetPlayer, Inv.LOAN_OFFER);
		ENGINE.sendInv(player, Inv.LOAN_RETURN);
	}

	function clearTrade (player) {
		ENGINE.setTradeAccepted(player, false);
		var objId = inv.getObjId(player, Inv.LOAN_OFFER, 0);
		if (objId !== -1) {
			removeLoanItem(player, objId);
		}
		for (var slot=0; slot<28; slot++) {
			objId = inv.getObjId(player, Inv.TRADE, slot);
			if (objId !== -1) {
				removeItem(player, objId, CONST.INTEGER_MAX, slot);
			}
		}
	}

	function tradeItems (player1, player2) {
		if (!hasSpaceForTrade(player1, player2)) {
			chat.sendMessage(player1, "You don't have enough space in your inventory for this trade.");
			chat.sendMessage(player2, "Other player doesn't have enough space in their inventory for this trade.");
		} else if (!hasSpaceForTrade(player2, player1)) {
			chat.sendMessage(player2, "You don't have enough space in your inventory for this trade.");
			chat.sendMessage(player1, "Other player doesn't have enough space in their inventory for this trade.");
		} else {
			var loanObj1 = inv.getObjId(player1, Inv.LOAN_OFFER, 0);
			var loanObj2 = inv.getObjId(player2, Inv.LOAN_OFFER, 0);
			var duration;
			if (loanObj1 !== -1) {
				duration = varbit(player1, 1046);
				inv.take(player1, loanObj1, 1, Inv.LOAN_OFFER);
				loan.lendItem(player1, player2, loanObj1, duration);
			}
			if (loanObj2 !== -1) {
				duration = varbit(player2, 1046);
				inv.take(player2, loanObj2, 1, Inv.LOAN_OFFER);
				loan.lendItem(player2, player1, loanObj2, duration);
			}
			sendTrade(player1, player2);
			sendTrade(player2, player1);

			chat.sendMessage(player1, "Accepted trade.");
			chat.sendMessage(player2, "Accepted trade.");
		}
	}

	function getTotalTradeSize (player) {
		return inv.usedSpace(player, Inv.TRADE) + inv.usedSpace(player, Inv.LOAN_OFFER);
	}

	function hasSpaceForTrade (toPlayer, fromPlayer) {
		var tradeSize = getTotalTradeSize(fromPlayer);
		if (inv.freeSpace(toPlayer, Inv.BACKPACK) < tradeSize) {
			return false;
		} else {
			for (var slot=0; slot<28; slot++) {
				var objId = inv.getObjId(fromPlayer, Inv.TRADE, slot);
				var count = inv.getCount(fromPlayer, Inv.TRADE, slot);
				if (objId !== -1) {
					if (util.checkOverflow(inv.total(toPlayer, objId), count)) {
						return false;
					}
				}
			}
		}
		return true;
	}

	function sendTrade (fromPlayer, toPlayer) {
		for (var slot=0; slot<28; slot++) {
			var p1objId = inv.getObjId(fromPlayer, Inv.TRADE, slot);
			var p1objCount = inv.getCount(fromPlayer, Inv.TRADE, slot);
			if (p1objId !== -1) {
				inv.clearSlot(fromPlayer, Inv.TRADE, slot);
				inv.give(toPlayer, p1objId, p1objCount);
			}
		}
	}
})();
