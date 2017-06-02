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

var CommandListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		switch (syntax) {
		case "bxp":
		case "bonusxp":
			var stat = api.getStatByName(args[0]);
			if (stat == -1) {
				sendCommandResponse(player, "Invalid skill: "+args[0], scriptArgs.console);
				return;
			}
			var xp = parseInt(args[1]);
			if (isNaN(xp)) {
				sendCommandResponse(player, "Invalid xp: "+args[1], scriptArgs.console);
				return;
			}
			addBonusExperience(player, stat, xp);
			sendCommandResponse(player, "Added "+xp+" bonus experience to "+args[0], scriptArgs.console);
			return;
		case "xp":
			if (args.length < 2) {
				sendCommandResponse(player, "Usage: "+syntax+" [skill] [amount]", scriptArgs.console);
				return;
			}
			var stat = api.getStatByName(args[0]);
			if (stat == -1) {
				sendCommandResponse(player, "Invalid skill: "+args[0]);
				return;
			}
			var xp = parseInt(args[1]);
			if (isNaN(xp)) {
				sendCommandResponse(player, "Invalid xp: "+args[1], scriptArgs.console);
				return;
			}
			api.addExperience(player, stat, xp, false);
			sendCommandResponse(player, "Added "+xp+" experience to "+args[0]);
			return;
		case "boost":
			if (args.length < 2) {
				sendCommandResponse(player, "Usage: "+syntax+" [skill] [boostAmount]", scriptArgs.console);
				return;
			}
			var stat = api.getStatByName(args[0]);
			if (stat == -1) {
				api.sendConsoleMessage(player, "Invalid skill: "+args[0]);
				return false;
			}
			var boost = parseInt(args[1]);
			if (isNaN(boost)) {
				sendCommandResponse(player, "Invalid boost amount: "+args[1], scriptArgs.console);
				return;
			}
			api.boostStat(player, stat, boost);
			sendCommandResponse(player, "Boosted "+args[0]+" by "+boost+" levels.", scriptArgs.console);
			return;
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "bxp", "bonusxp", "xp", "boost" ];
	
	var listener = new CommandListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}
};