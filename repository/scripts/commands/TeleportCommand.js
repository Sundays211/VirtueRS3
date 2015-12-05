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
		
		if (args.length < 2) {
			sendCommandResponse(player, "Usage: "+syntax+" [x-coord] [y-coord]", scriptArgs.console);
			return;
		}
		if (args.length >= 5) {
			var level = parseInt(args[0]);
			var squareX = parseInt(args[1]);
			var squareY = parseInt(args[2]);
			var localX = parseInt(args[3]);
			var localY = parseInt(args[4]);
			
			api.teleportEntity(player, level, squareX, squareY, localX, localY);
		} else	if (args.length == 2) {
			var level = api.getCoordLevel(player);
			api.teleportEntity(player, parseInt(args[0]), parseInt(args[1]), level);
		} else {
			api.teleportEntity(player, parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "tele", "goto", "move" ];
	var listener = new CommandListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND, commands[i], listener);
	}
};