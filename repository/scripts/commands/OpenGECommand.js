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
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/20/2015
 */
var api;

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The commands to bind to */
	getPossibleSyntaxes: function() {
		return [ "openge", "ge" ];
	},

	handle: function(player, syntax, args, clientCommand) {
		if (api.getAccountType(player) == 6 || api.getAccountType(player) == 7
				|| api.getAccountType(player) == 8) {
			player.getDispatcher().sendGameMessage("You cannot use Grand Exchange while being a Iron Man.");
			return false;
		}
		api.openCentralWidget(player, 105, false);
		return true;
	},
		
	adminCommand : function () {
		return false;
	}
	

});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};