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

		var world = api.getWorld();
		var lobby = api.getLobby();
		
		sendCommandResponse(player, "There are " + api.getPlayerCount(world) + " player(s) online.", scriptArgs.console);
		if (api.isAdmin(player)) {
			var iterator = api.getPlayerIterator(world);
			while (iterator.hasNext()) {
				var p2 = iterator.next()
				sendCommandResponse(player, api.getName(p2)+": "+api.getCoords(p2), scriptArgs.console);
			}
		}		
		sendCommandResponse(player, "There are " + api.getPlayerCount(lobby) + " player(s) in the lobby.", scriptArgs.console);
		if (api.isAdmin(player)) {
			var iterator = api.getPlayerIterator(lobby);
			while (iterator.hasNext()) {
				var p2 = iterator.next()
				sendCommandResponse(player, api.getName(p2), scriptArgs.console);
			}
		}

	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND, "players", listener);
};