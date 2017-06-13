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
/* globals EventType, Inv */
var varp = require('../core/var/player');
var CONST = require('../core/const');

var inv = require('../inv');
var chat = require('../chat');
var config = require('../core/config');
var util = require('../core/util');

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
		init : init,
		processLogin : processLogin,
		lendItem : lendItem
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "loan", function () {
			
		});
	}
	
	function lendItem (fromPlayer, toPlayer, objId, duration) {
		inv.take(fromPlayer, objId, 1, Inv.LOAN_OFFER);
		inv.give(fromPlayer, objId, 1, Inv.LOAN_RETURN);
		
		var lentId = config.objLent(objId);
		inv.give(toPlayer, lentId, 1);
		
		if (duration === 0) {
			varp(toPlayer, 428, fromPlayer);//Loan from
			varp(fromPlayer, 429, toPlayer);//Loan to
		} else {
			duration *= 60;//Convert from hours to minutes
			varp(toPlayer, 430, duration);//Loan from duration
			varp(fromPlayer, 431, duration);//Loan to duration
			
			checkLoanedItem(fromPlayer);
			checkLentItem(toPlayer);
		}
		chat.sendMessage(toPlayer, "The borrowed item will be returned to the owner's Returned Items box, "+
				"immediately, if either you or "+util.textGender(toPlayer, "he", "she")+" logs out.");
		chat.sendMessage(fromPlayer, "Your item has been lent to "+util.getName(toPlayer)+"."+
				"It will be sent to your Returned Items box if either you or "+util.getName(toPlayer)+" logs out.");
		chat.sendMessage(fromPlayer, "Speak to a banker to view your returned item box.");
	}
	
	function processLogin (ctx) {
		var player = ctx.player;
		var minutesPassed = Math.floor(ctx.tickDifference / CONST.CYCLES_PER_MIN);
		
		//Checks the item currently being loaned
		if (varp(player, 430)) {
			if (varp(player, 430)-minutesPassed < 0) {
				varp(player, 430, 0);
				if (player.getEquipment().destroyBorrowedItems()) {
					chat.sendMessage(player, "The item you were borrowing has been returned.");
				}
			} else {
				varp(player, 430, varp(player, 430)-minutesPassed);
				checkLoanedItem(player);
			}
		}
		
		//Checks the item currently loaned out
		if (varp(player, 431)) {
			if (varp(player, 431)-minutesPassed < 0) {
				varp(player, 431, 0);
				chat.sendMessage(player, "Your item has been returned.");
			} else {
				varp(player, 431, varp(player, 431)-minutesPassed);
				checkLentItem(player);
			}
		}
	}
	
	function checkLoanedItem (player) {
		util.delayFunction(player, CONST.CYCLES_PER_MIN, function () {
			if (varp(player, 430) > 0) {
				varp(player, 430, varp(player, 430)-1);
				if (varp(player, 430) === 0) {
					player.getEquipment().destroyBorrowedItems();
				} else {
					checkLoanedItem(player);
				}
			}
		}, false);
	}
	
	function checkLentItem (player) {
		util.delayFunction(player, CONST.CYCLES_PER_MIN, function () {
			if (varp(player, 431) > 0) {
				varp(player, 431, varp(player, 431)-1);
				if (varp(player, 431) === 0) {
					chat.sendMessage(player, "Your item has been returned.");
				} else {
					checkLentItem(player);
				}
			}
		}, false);
	}
})();
