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
var api;

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs: function() {
		return [79034];
	},

	/* The first option on an object */
	handleInteraction: function(player, loc, option) {
		switch (loc.getID()) {
		case 79034://Dispenser
				api.openDialog(player, "Dispenser");
				return true;
			default:
				return false;
		}		
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (object, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

var Dispenser = Java.extend(Java.type('org.virtue.script.listeners.DialogListener'), {
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

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
	scriptManager.registerDialogListener(new Dispenser(), "Dispenser");
};