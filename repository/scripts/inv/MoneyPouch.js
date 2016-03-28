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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 27/03/2016
 */
var AddCoinsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		var amount = api.getCount(args.item);
		if (checkOverflow(MoneyPouch.getCoinCount(player), amount)) {
			api.sendMessage(player, "You do not have enough space in your money pouch.");
			return;
		}
		MoneyPouch.addCoins(player, amount);
		api.delItem(player, Inv.BACKPACK, COINS, amount, args.slot);
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new AddCoinsListener();
	scriptManager.registerListener(EventType.OPHELD4, COINS, listener);
};

var MoneyPouch = {
		removeCoins : function (player, amount) {
			api.delItem(player, Inv.MONEY_POUCH, COINS, amount);
			api.sendMessage(player, api.getFormattedNumber(amount) +" coins have been removed from your money pouch.", MesType.GAME_SPAM);
			api.runClientScript(player, 5561, [0, amount]);
			this.updateCoins(player);
		},
		addCoins : function (player, amount) {
			api.addItem(player, Inv.MONEY_POUCH, COINS, amount);
			api.sendMessage(player, api.getFormattedNumber(amount) +" coins have been added to your money pouch.", MesType.GAME_SPAM);
			api.runClientScript(player, 5561 , [1, amount]);
			this.updateCoins(player);
		},
		updateCoins : function (player) {
			api.runClientScript(player, 5560,[ this.getCoinCount(player) ]);			
		},
		getCoinCount : function (player) {
			return api.itemTotal(player, Inv.MONEY_POUCH, COINS);
		},
		requestWithdrawCoins : function (player) {
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "You don't have space in your inventory to do that.");
				return;
			}
			var message = "Your money pouch contains "+api.getFormattedNumber(this.getCoinCount(player))+" coins.";
			message += "<br>How many would you like to withdraw?";
			
			var that = this;
			
			requestCount(player, message, function (value) {
				var amount = Math.min(value, that.getCoinCount(player));
				if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
					api.sendMessage(player, "You don't have space in your inventory to do that.");
					return;
				}
				var heldCoins = api.itemTotal(player, Inv.BACKPACK, COINS);
				if (checkOverflow(heldCoins, amount)) {
					api.sendMessage(player, "You don't have space in your inventory to do that.");
					return;
				}
				that.removeCoins(player, amount);
				api.addItem(player, Inv.BACKPACK, COINS, amount);
			});
		}
}