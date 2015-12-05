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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		/*****************************************WARNING****************************************
		 * DO NOT PUT THIS COMMAND IN PlayerCommands.js! 
		 * It will eventually be restricted to admin-only, and separating it will be more difficult if it's part of the player command script
		 */
		
		if (args.length < 1 || isNaN(args[0])) {
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
				handle : function (value) {
					var amount = 1;
					if (api.getItemType(value).isStackable()) {
						requestCount(player, "Enter the number of items to spawn: ", function (amount) {
							api.addItem(player, Inv.BACKPACK, value, amount);
						});	
					} else if (api.freeSpaceTotal(player, Inv.BACKPACK) >= amount) {
						api.addItem(player, Inv.BACKPACK, value, amount);
					} else {
						api.sendMessage(player, "You do not have enough space in your backpack to store this item.");
					}
				}
			});
			player.getDialogs().requestItem("Choose an item to spawn.", new Handler());
			return true;
		} else {
			if (args.length < 1) {
				sendCommandResponse(player, "Usage: "+syntax+" [id] [amount]", scriptArgs.console);
				return;
			}
			var amount = 1;
			var itemID = parseInt(args[0]);
			if (args.length >= 2) {
				amount = parseInt(args[1]);
			}
			if (!api.itemExists(itemID)) {
				sendCommandResponse(player, "The item you specified does not exist.", scriptArgs.console);
				return;
			}

			var value = api.getItemType(itemID).getExchangeValue() * amount;
			if (api.getItemType(itemID).isStackable() || api.freeSpaceTotal(player, Inv.BACKPACK) >= amount) {
				api.addItem(player, Inv.BACKPACK, itemID, amount);
				if (value == -1) {
					sendCommandResponse(player, "This item cannot be traded on the Grand Exchange.", scriptArgs.console);
				} else {
					sendCommandResponse(player, "This item is worth: "+value+"gp on the Grand Exchange.", scriptArgs.console);
				}				
			} else {
				sendCommandResponse(player, "You do not have enough space in your backpack to store this item.", scriptArgs.console);
			}
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND, "item", listener);
};