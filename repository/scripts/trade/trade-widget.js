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
var varbit = require('../core/var/bit');
var varc = require('../core/var/client');
var varp = require('../core/var/player');
var CONST = require('../core/const');

var config = require('../core/config');
var util = require('../core/util');
var chat = require('../chat');
var widget = require('../widget');
var inv = require('../inv');
var dialog = require('../dialog');

var loan = require('./loan');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/01/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 334, function (ctx) {
			var player = ctx.player;
			
			widget.setText(player, 334, 14, "Are you sure you want to make this trade?");
			ENGINE.setTradeAccepted(player, false);
			if (!inv.hasSpace(player, Inv.LOAN_OFFER)) {
				var loanedObjId = inv.getObjId(player, Inv.LOAN_OFFER, 0);
				var duration = varbit(player, 1046);
				if (duration === 0) {
					duration = "until logout";
				} else if (duration == 1) {
					duration = "for 1 hour";
				} else {
					duration = "for "+duration+" hours";
				}
				//api.setVarBit(targetPlayer, 1047, value);
				widget.hide(player, 334, 17, false);
				widget.setText(player, 334, 33, "Lend: <col=ffffff>"+config.objName(loanedObjId)+", "+duration);				
			}
		});
		
		scriptManager.bind(EventType.IF_OPEN, 335, function (ctx) {
			var player = ctx.player;
			var targetPlayer = ENGINE.getInteractionTarget(player);
			if (!targetPlayer) {
				return;
			}
			ENGINE.sendInv(player, Inv.TRADE);
			ENGINE.sendInvTo(player, targetPlayer, Inv.TRADE);
			ENGINE.sendInv(player, Inv.LOAN_OFFER);
			ENGINE.sendInvTo(player, targetPlayer, Inv.LOAN_OFFER);
			ENGINE.sendInv(player, Inv.LOAN_RETURN);
			widget.openOverlaySub(player, 1008, 336, false);
			//api.openWidget(player, 1477, 391, 336, false);
			//api.openWidget(player, 1477, 390, 449, false);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 8865, [1]);
			widget.setText(player, 335, 31, "");
			varc(player, 2504, util.getName(targetPlayer));
			widget.hide(player, 335, 35, false);
			
			widget.hide(player, 335, 38, false);
			widget.hide(player, 335, 40, false);
			
			util.runClientScript(player, 150, ["Value<col=ff9040>", "Remove-X<col=ff9040>", "Remove-All<col=ff9040>", "Remove-10<col=ff9040>", "Remove-5<col=ff9040>", "Remove<col=ff9040>", -1, 0, 7, 4, 90, 21954584]);
			widget.setEvents(player, 335, 24, 0, 27, 1150);
			util.runClientScript(player, 695, ["Value<col=ff9040>", -1, 0, 7, 4, 90, 21954587]);
			widget.setEvents(player, 335, 27, 0, 27, 1026);
			util.runClientScript(player, 150, ["Lend<col=ff9040>", "Value<col=ff9040>", "Offer-X<col=ff9040>", "Offer-All<col=ff9040>", "Offer-10<col=ff9040>", "Offer-5<col=ff9040>", "Offer<col=ff9040>", -1, 0, 7, 4, 93, 22020096]);
			widget.setEvents(player, 336, 0, 0, 27, 1278);
			widget.setEvents(player, 335, 55, -1, -1, 1026);
			widget.setEvents(player, 335, 56, -1, -1, 1030);
			widget.setEvents(player, 335, 51, -1, -1, 1024);
			varc(player, 2519, util.getName(targetPlayer));
			refreshTrade(player);
			//api.setWidgetText(player, 335, 22, "has "+api.freeSpaceTotal(targetPlayer, Inv.BACKPACK)+" free inventory slots.");
			//api.setVarc(player, 729, 0);
			//api.setVarc(player, 697, 0);
		});
		
		scriptManager.bind(EventType.IF_OPEN, 336, function (ctx) {
			util.runClientScript(ctx.player, 8862, [0, 2]);
			util.runClientScript(ctx.player, 8862, [0, 3]);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 334, function (ctx) {
			switch (ctx.component) {//Confirm screen
			case 47://Accept
				acceptTrade(ctx.player, true);
				return true;
			case 52://Decline
				//Trade.cancelTrade(player);
				widget.closeAll(ctx.player);
				return true;
			default:
				return false;
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 335, handleTradeButton);
		scriptManager.bind(EventType.IF_BUTTON, 336, handleTradeInvButton);
		
		scriptManager.bind(EventType.IF_CLOSE, [ 334, 335 ], function (ctx) {
			varc(ctx.player, 2504, "");
			removeAll(ctx.player);
			cancelTrade(ctx.player);
			ENGINE.clearInteractionTarget(ctx.player);
		});
		
		scriptManager.bind(EventType.IF_CLOSE, 336, function (ctx) {
			util.runClientScript(ctx.player, 8862, [1, 2]);
			util.runClientScript(ctx.player, 8862, [1, 3]);
		});
	}
	
	function handleTradeButton (ctx) {
		var player = ctx.player;
		
		var objId, targetPlayer;
		
		switch (ctx.component) {
		case 24://Trade screen
			objId = inv.getObjId(player, Inv.TRADE, ctx.slot);
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
				count = CONST.INTEGER_MAX;
				break;
			case 5://Add x
				dialog.requestCount(player, "Remove how many items from your offer?").then(function (value) {
					removeItem(player, objId, value, ctx.slot);
					refreshTrade(player);
				});
				return;
			case 6://Value
				showValue(player, objId);
				return;
			case 10://Examine
				chat.sendMessage(player, config.objDesc(objId));
				return;
			default:
				util.defaultHandler(ctx, "trade");
				return;
			}
			if (count > 0) {
				removeItem(player, objId, count, ctx.slot);
				refreshTrade(player);
			}
			return;
		case 27://Other player offer
			targetPlayer = ENGINE.getInteractionTarget(player);
			if (!targetPlayer) {
				return;
			}
			objId = inv.getObjId(targetPlayer, Inv.TRADE, ctx.slot);
			if (objId === -1) {
				return;
			}
			if (ctx.button == 1) {
				showValue(player, objId);
			} else if (ctx.button == 10) {
				chat.sendMessage(player, config.objDesc(objId));
			} else {
				util.defaultHandler(ctx, "trade");
			}
			return;
		case 38://Add from money pouch
			dialog.requestCount(player, "Add how many coins to your offer?").then(function (value) {
				offerCoins(player, value);
				refreshTrade(player);
			});
			return;
		case 51://Other player loan item
			targetPlayer = ENGINE.getInteractionTarget(player);
			if (!targetPlayer) {
				return;
			}
			objId = inv.getObjId(targetPlayer, Inv.LOAN_OFFER, 0);
			if (objId !== -1) {
				chat.sendMessage(player, config.objDesc(objId));
			}
			return;
		case 55://Remove loan item
			objId = inv.getObjId(targetPlayer, Inv.LOAN_OFFER, 0);
			if (objId === -1) {
				return;		
			}
			if (ctx.button == 1) {
				removeLoanItem(player, objId);
				refreshTrade(player);
			} else if (ctx.button == 10) {
				chat.sendMessage(player, config.objDesc(objId));
			} else {
				util.defaultHandler(ctx, "trade");
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
			widget.closeAll(player);
			return;
		default:
			util.defaultHandler(ctx, "trade");
			return;
		}
	}
	
	function handleTradeInvButton (ctx) {
		var player = ctx.player;
		
		if (ctx.component !== 0) {
			util.defaultHandler(ctx, "trade inventory");
			return;
		}
		var objId = inv.getObjId(player, Inv.BACKPACK, ctx.slot);
		if (objId === -1) {
			return;
		}
		if (ENGINE.getCentralWidget(player) != 335) {
			if (ctx.button == 10) {
				chat.sendMessage(player, config.objDesc(objId));
			} else {
				chat.sendMessage(player, "You cannot add new items in this trade screen!");
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
			count = CONST.INTEGER_MAX;
			break;
		case 5://Add x
			dialog.requestCount(player, "Add how many items to your offer?", function (value) {
				offerItem(player, objId, value, ctx.slot);
				refreshTrade(player);
			});
			return;
		case 6://Value
			showValue(player, objId);
			return;
		case 7://Lend
			offerLoanItem(player, objId, ctx.slot);
			refreshTrade(player);
			return;
		case 10://Examine
			chat.sendMessage(player, config.objDesc(objId));
			return;
		}
		if (count > 0) {
			if (!config.objTradable(objId)) {
				chat.sendMessage(player, "That item isn't tradeable.");
			} else {
				offerItem(player, objId, count, ctx.slot);
				refreshTrade(player);
			}				
		}
	}
	
	function offerItem (player, objId, amount, slot) {
		amount = Math.min(amount, inv.total(player, objId));
		inv.take(player, objId, amount, Inv.BACKPACK, slot);
		inv.give(player, objId, amount, Inv.TRADE);			
		chat.sendDebugMessage(player, "Offering item: "+objId+", slot="+slot+", amount="+amount);
	}
	
	function offerCoins (player, amount) {
		//Money pouch uses the same inv methods
		offerItem(player, CONST.COINS, amount);
	}
	
	function offerLoanItem (player, objId, slot) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (!targetPlayer) {
			return;
		} else if (!canAcceptLoanItems(player)) {
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
	
	function removeItem (player, objId, amount, slot) {
		amount = Math.min(amount, inv.total(player, objId, Inv.TRADE));
		inv.take(player, objId, amount, Inv.TRADE, slot);
		inv.give(player, objId, amount);
		//api.sendMessage(player, "Removing item: item="+item+", slot="+slot+", amount="+amount);
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
	
	function removeAll (player) {
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
		//Trade.refreshTrade(player);
	}
	
	function refreshTrade (player) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (targetPlayer) {
			ENGINE.sendInvTo(player, targetPlayer, Inv.TRADE);
			ENGINE.sendInvTo(player, targetPlayer, Inv.LOAN_OFFER);
		}
		widget.setText(player, 335, 31, "");
		ENGINE.setTradeAccepted(targetPlayer, false);
		ENGINE.setTradeAccepted(player, false);//Remove "accept" if the trade is modified
		var total = 0;
		for (var slot=0; slot<28; slot++) {
			var objId = inv.getObjId(player, Inv.TRADE, slot);
			var objCount = inv.getCount(player, Inv.TRADE, slot);
			if (objId !== -1) {
				if (ENGINE.getExchangeCost(objId) !== -1) {
					total += ENGINE.getExchangeCost(objId) * objCount;
				} else if (objId == CONST.COINS) {
					total += objCount;
				}					
			}
		}
		varc(player, 729, total);
		varc(targetPlayer, 697, total);
		widget.setText(targetPlayer, 335, 22, "has "+inv.freeSpace(player, Inv.BACKPACK)+" free inventory slots.");
	}
	
	function showValue (player, objId) {
		var value = ENGINE.getExchangeCost(objId);
		if (value !== -1) {
			chat.sendMessage(player, config.objName(objId)+": market price is "+value+" coins.");
		}
	}
	
	function selectLoanDuration (player) {
		dialog.requestCount(player, "Set the loan duration in hours: (1-72)<br>"+
				"(Enter 0 for 'Just until logout'.)").then(function (value) {
			if (value <= 72) {
				var targetPlayer = ENGINE.getInteractionTarget(player);
				if (targetPlayer) {
					varbit(player, 1046, value);
					varbit(targetPlayer, 1047, value);
				}
			}
		});
	}
	
	function canAcceptLoanItems (player) {
		if (varp(player, 430) > 0) {
			return false;
		} else if (varp(player, 428) != -1) {
			return false;
		} else {
			return true;
		}
	}
	
	function cancelTrade (player) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (targetPlayer) {
			widget.closeOverlaySub(targetPlayer, 1007, false);
			widget.closeOverlaySub(targetPlayer, 1008, false);
			util.runClientScript(targetPlayer, 8862, [1, 2]);
			util.runClientScript(targetPlayer, 8862, [1, 3]);
			removeAll(targetPlayer);
			ENGINE.clearInteractionTarget(targetPlayer);
			chat.sendMessage(targetPlayer, "Other player declined trade.");
		}
	}
	
	function acceptTrade (player, isConfirm) {
		var targetPlayer = ENGINE.getInteractionTarget(player);
		if (!targetPlayer) {
			return;
		}
		widget.setText(targetPlayer, 335, 31, "Other player has accepted.");
		widget.setText(targetPlayer, 334, 14, "Other player has accepted.");
		if (!ENGINE.tradeAccepted(targetPlayer)) {
			ENGINE.setTradeAccepted(player, true);
			widget.setText(player, 335, 31, "Waiting for other player...");
			widget.setText(player, 334, 14, "Waiting for other player...");
		} else if (isConfirm) {
			processTrade(player, targetPlayer);
		} else {
			widget.closeOverlaySub(targetPlayer, 1007, false);
			widget.openCentral(targetPlayer, 334, false);
			widget.closeOverlaySub(player, 1007, false);
			widget.openCentral(player, 334, false);
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
	
	function processTrade (player1, player2) {
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
				loan.lendItem(player1, player2, loanObj1, duration);
			}
			if (loanObj2 !== -1) {
				duration = varbit(player2, 1046);
				loan.lendItem(player2, player1, loanObj2, duration);
			}
			sendTrade(player1, player2);
			sendTrade(player2, player1);
			
			chat.sendMessage(player1, "Accepted trade.");
			chat.sendMessage(player2, "Accepted trade.");
		}
		widget.closeOverlaySub(player1, 1007, false);
		widget.closeOverlaySub(player2, 1007, false);
		widget.closeAll(player1);
		widget.closeAll(player2);
	}
})();
