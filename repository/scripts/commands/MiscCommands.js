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
 * @since 26/12/2014
 */
var api;


var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The commands to bind to */
	getPossibleSyntaxes: function() {
		return [ "finishtut", "removetitle", "cleartitle", "spellbook", "prayer" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		switch (syntax) {
		case "prayer":
			if (args.length < 1) {
				api.sendMessage(player, "Use either 'prayer regular', 'prayer curses'.");
				return true;
			} else if (args[0] == "regular") {
				api.setVarBit(player, 16789, 0);
				api.sendMessage(player, "Regular Prayer book enabled.");
				return true;
			} else if (args[0] == "curses") {
				api.setVarBit(player, 16789, 1);
				api.sendMessage(player, "Curses Prayers book enabled.");
				return true;
			}
		case "spellbook":
			if (args.length < 1) {
				api.sendMessage(player, "Use either 'spellbook standard', 'spellbook ancient' or 'spellbook lunar'.");
				return true;
			} else if (args[0] == "standard") {
				api.setVarBit(player, 0, 0);
				api.sendMessage(player, "Standard spells enabled.");
				return true;
			} else if (args[0] == "ancient") {
				api.setVarBit(player, 0, 1);
				api.sendMessage(player, "Ancient spells enabled.");
				return true;
			} else if (args[0] == "lunar") {
				api.setVarBit(player, 0, 2);
				api.sendMessage(player, "Lunar spells enabled.");
				return true;
			} else {
				api.sendMessage(player, "Use either 'spellbook standard', 'spellbook ancient' or 'spellbook lunar'.");
				return true;
			}
		case "finishtut":
			api.setVarp(player, 1295, 1000);
			api.sendMessage(player, "The tutorial has been successfully marked as finished.");
			return true;
		}
		if (syntax == "removetitle" || syntax == "cleartitle") {
			player.getAppearance().setPrefixTitle("");
			player.getAppearance().setSuffixTitle("");
			player.getAppearance().refresh();
			api.sendMessage(player, "You have deleted your title.");
			return true;
		} else {
			return false;
		}
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
