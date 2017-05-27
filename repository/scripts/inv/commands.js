/**
 * Copyright (c) 2014 Virtue Studios
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
/* globals EventType, ENGINE, Exchange */
var widget = require('../core/widget');
var dialog = require('../core/dialog');
var config = require('../core/config');
var util = require('../core/util');
var chat = require('../chat');
var inv = require('./core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND, "bank", function (ctx) {
			//Open Bank
			widget.openOverlaySub(ctx.player, 1017, 762, false);
		});
		
		scriptManager.bind(EventType.COMMAND, [ "openge", "ge" ], function (ctx) {
			//Open Grand Exchange
			Exchange.open(ctx.player);
		});
		
		scriptManager.bind(EventType.COMMAND, [ "removeitem", "delitem", "clearitem", "takeitem" 
				], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id] [amount]", ctx.console);
				return;
			}
			var amount = 1;
			var objId = parseInt(args[0]);
			if (isNaN(objId)) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id] [amount]", ctx.console);
				return;
			}
			
			if (args.length == 2) {
				amount = parseInt(args[1]);
			}
			inv.take(player, objId, amount);
		});
		
		scriptManager.bind(EventType.COMMAND, [ "item", "give" ], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1 || isNaN(args[0])) {
				dialog.requestItem(player, "Choose an item to spawn.", function (objId) {
					var amount = 1;
					if (config.objStackable(objId)) {
						dialog.requestCount(player, "Enter the number of items to spawn: ", function (amount) {
							inv.give(player, objId, amount);
						});	
					} else if (inv.hasSpace(player, amount)) {
						inv.give(player, objId, amount);
					} else {
						chat.sendMessage(player, "You do not have enough space in your backpack to store this item.");
					}
				});
			} else {
				if (args.length < 1) {
					chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id] [amount]", ctx.console);
					return;
				}
				var amount = 1;
				var objId = parseInt(args[0]);
				if (args.length >= 2) {
					amount = parseInt(args[1]);
				}
				if (!ENGINE.itemExists(objId)) {
					chat.sendCommandResponse(player, "The item you specified does not exist.", ctx.console);
					return;
				}

				var value = ENGINE.getExchangeCost(objId) * amount;
				if (config.objStackable(objId) || inv.hasSpace(player, amount)) {
					inv.give(player, objId, amount);
					if (value == -1) {
						chat.sendCommandResponse(player, "This item cannot be traded on the Grand Exchange.", ctx.console);
					} else {
						chat.sendCommandResponse(player, "This item is worth: "+value+"gp on the Grand Exchange.", ctx.console);
					}				
				} else {
					chat.sendCommandResponse(player, "You do not have enough space in your backpack to store this item.", ctx.console);
				}
			}
		});
	}
})();
