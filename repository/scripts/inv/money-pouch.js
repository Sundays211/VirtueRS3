/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
/* globals EventType, ENGINE, Inv, MesType */
var CONST = require('../core/const');
var util = require('../core/util');
var chat = require('../chat');
var inv = require('../inv');
var dialog = require('../core/dialog');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 27/03/2016
 */
module.exports = (function () {
	return {
		init : init,
		addCoins : addCoins,
		removeCoins : removeCoins,
		getCoinCount : getCoinCount,
		updateCoins : updateCoins,
		examine : examine,
		requestWithdrawCoins : requestWithdrawCoins
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD4, CONST.COINS, function (ctx) {
			var amount = ENGINE.getCount(ctx.item);
			
			if (util.checkOverflow(getCoinCount(ctx.player), amount)) {
				chat.sendMessage(ctx.player, "You do not have enough space in your money pouch.");
				return;
			}
			addCoins(ctx.player, amount);
			ENGINE.delItem(ctx.player, Inv.BACKPACK, CONST.COINS, amount);
		});
	}
	
	function removeCoins (player, amount) {
		if (amount > 0) {
			ENGINE.delItem(player, Inv.MONEY_POUCH, CONST.COINS, amount);
			chat.sendMessage(player, util.toFormattedString(amount) +" coins have been removed from your money pouch.", MesType.GAME_SPAM);
			util.runClientScript(player, 5561, [0, amount]);
			updateCoins(player);
		}
	}
	
	function addCoins (player, amount) {
		if (amount > 0) {
			ENGINE.addItem(player, Inv.MONEY_POUCH, CONST.COINS, amount);
			chat.sendMessage(player, util.toFormattedString(amount) +" coins have been added to your money pouch.", MesType.GAME_SPAM);
			util.runClientScript(player, 5561 , [1, amount]);
			updateCoins(player);
		}			
	}
	
	function updateCoins (player) {
		//api.sendMessage(player, "Updating coins... ("+this.getCoinCount(player)+" total)");
		util.runClientScript(player, 5560,[ getCoinCount(player) ]);			
	}
	
	function getCoinCount (player) {
		return inv.total(player, CONST.COINS, Inv.MONEY_POUCH);
	}
	
	function examine (player) {
		var count = ENGINE.itemTotal(player, Inv.MONEY_POUCH, CONST.COINS);
		chat.sendMessage(player, "Your money pouch contains "+util.toFormattedString(count) +" coins.");
	}
	
	function requestWithdrawCoins (player) {
		if (ENGINE.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
			chat.sendMessage(player, "You don't have space in your inventory to do that.");
			return;
		}
		var message = "Your money pouch contains "+util.toFormattedString(getCoinCount(player))+" coins.";
		message += "<br>How many would you like to withdraw?";
		
		dialog.requestCount(player, message, function (value) {
			var amount = Math.min(value, getCoinCount(player));
			if (amount < 1) {
				return;
			}
			if (ENGINE.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				chat.sendMessage(player, "You don't have space in your inventory to do that.");
				return;
			}
			var heldCoins = ENGINE.itemTotal(player, Inv.BACKPACK, CONST.COINS);
			if (util.checkOverflow(heldCoins, amount)) {
				chat.sendMessage(player, "You don't have space in your inventory to do that.");
				return;
			}
			removeCoins(player, amount);
			ENGINE.addItem(player, Inv.BACKPACK, CONST.COINS, amount);
		});
	}
})();
