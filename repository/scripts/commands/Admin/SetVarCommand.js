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

var EventListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, args) {
		var player = args.player;
		if (args.cmdArgs.length < 2) {
			api.sendCommandResponse(player, "Usage: "+syntax+" [id] [value]", args.console);
			return;
		}
		var key = parseInt(args.cmdArgs[0]);
		var value = args.cmdArgs[1];
		switch (syntax) {
		case "setvarp":
		case "varp":
			api.setVarp(player, key, parseInt(value));
			sendCommandResponse(player, "Setting varp "+key+" to "+value, args.console);
			return;
		case "varbit":
		case "setvarbit":
			if (api.setVarBit(player, key, parseInt(value))) {
				sendCommandResponse(player, "Setting varbit "+key+" to "+value, args.console);
			} else {
				sendCommandResponse(player, "Failed to set varbit "+key, args.console);
			}
			return;
		case "varc":
		case "setvarc":
			api.setVarc(player, key, parseInt(value));
			sendCommandResponse(player, "Setting varc "+key+" to "+value, args.console);
			return;
		case "varcstr":
		case "setvarcstr":
			api.setVarc(player, key, value);
			sendCommandResponse(player, "Setting varcstr "+key+" to "+value, args.console);
			return;
		}
	}
});

function sendCommandResponse (player, message, console) {
	api.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
}

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = ["varp", "varbit", "varc", "varcstr"];
	var listener = new EventListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
		scriptManager.registerListener(EventType.COMMAND_ADMIN, "set"+commands[i], listener);
	}	
};