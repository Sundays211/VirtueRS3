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

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 1/05/2015
 */

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		api.openDialog(args.player, "Dispenser");	
	}
});

var Dispenser = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendMultichoice("Which training dummy would you prefer?", ["Range Dummy", "Melee Dummy", "Magic Dummy"], [1, 2, 3]);
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
		case 1:
			api.sendMessage(player, "Training Dummy content coming soon.");
			return true;
		case 2:
			api.sendMessage(player, "Training Dummy content coming soon.");
			return true;
		case 3:
			api.sendMessage(player, "Training Dummy content coming soon.");
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

/* Listen to the location ids specified */
var listen = function(scriptManager) {
	var listener = new LocationListener();
	scriptManager.registerListener(EventType.OPLOC1, 79034, listener);
	scriptManager.registerDialogListener(new Dispenser(), "Dispenser");
};