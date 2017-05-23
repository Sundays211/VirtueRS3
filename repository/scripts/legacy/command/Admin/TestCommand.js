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

var EventListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var customobjects;
		var args = scriptArgs.cmdArgs;
		var stage = 0;
		if (args.length >= 1) {
			stage = parseInt(args[0]);
		}
		switch (stage) {
		case 0:
			api.sendMessage(player, "<sprite=6228,0>Test Message<sprite=2270,0>.");
			return;
		case 1:
			if (args.length >= 4) {
				player.getHeadIcons().setIcon(parseInt(args[3]), parseInt(args[1]), parseInt(args[2]));
				player.getHeadIcons().refresh();
			} else {
				api.sendConsoleMessage(player, "You must provide two args to this method.");
			}
			
			//api.sendMessage(player, "Test", 115);
			return;
		case 2:
			player.getTreasureHunter().open();
			return;
		case 3://Set display name
			requestName(player, "Please enter your desired display name: ", function (name) {
				var userHash = api.getUserHash(player);
				var oldName = api.getName(userHash);
				var success = api.setDisplayName(player, userHash, name);
				if (success) {
					api.sendMessage(player, "Your display name has been changed from "+oldName+" to "+name+".");
					api.sendMessage(player, "You might need to log out for the change to take effect.");
					api.sendMessage(player, "NOTE: This change has no effect on the name you use to log in.");
				} else {
					api.sendMessage(player, "Sorry, "+name+" is not available.");
				}
			});
			return;
		case 4:
			if (args.length < 2 || isNaN(args[1])) {
				sendCommandResponse(player, "You must provide a channel type argument", scriptArgs.console);
				return;
			}
			var mesType = args[1];
			api.sendMessage(player, "Test", mesType);
			return;
		case 5:
			api.createLocation(84873, 3108, 6098, 0, 10, 4);
			api.createLocation(84871, 3108, 6107, 0, 10, 3);
			api.createLocation(84873, 3108, 6116, 0, 10, 3);
			api.createLocation(84871, 3099, 6098, 0, 10, 4);
			api.createLocation(84869, 3099, 6107, 0, 10, 4);
			api.createLocation(84871, 3099, 6116, 0, 10, 2);
			api.createLocation(84873, 3090, 6098, 0, 10, 1);
			api.createLocation(84871, 3090, 6107, 0, 10, 1);
			api.createLocation(84873, 3090, 6116, 0, 10, 2);
			return;
		case 6:
			var loc = api.createLocation(38787, api.getCoords(player), 10, 0);
			api.spawnLocation(loc, 100);
			Java.type("org.virtue.Virtue").getInstance().getWidgetRepository().open(1477, 386, 673, false, player, loc);
			api.sendMessage(player, "Opened interface on location...");
			return;
		case 7:
			api.openCentralWidget(player, 1709, false);
			return;
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new EventListener();
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "test", listener);
};