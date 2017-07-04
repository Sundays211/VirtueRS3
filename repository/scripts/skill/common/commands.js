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
/* globals EventType, Stat, ENGINE */
var stat = require('stat');
var chat = require('chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, [ "bxp", "bonusxp" ], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 2) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [skill] [amount]", ctx.console);
				return;
			}
			
			var statId = stat.lookup(args[0]);
			if (statId === -1) {
				chat.sendCommandResponse(player, "Invalid skill: "+args[0], ctx.console);
				return;
			}
			var xp = parseInt(args[1]);
			if (isNaN(xp)) {
				chat.sendCommandResponse(player, "Invalid xp: "+args[1], ctx.console);
				return;
			}
			stat.giveBonusXp(player, statId, xp);
			chat.sendCommandResponse(player, "Added "+xp+" bonus experience to "+args[0], ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "xp", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 2) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [skill] [amount]", ctx.console);
				return;
			}
			
			var statId = stat.lookup(args[0]);
			if (statId === -1) {
				chat.sendCommandResponse(player, "Invalid skill: "+args[0], ctx.console);
				return;
			}
			var xp = parseInt(args[1]);
			if (isNaN(xp)) {
				chat.sendCommandResponse(player, "Invalid xp: "+args[1], ctx.console);
				return;
			}
			stat.giveXp(player, statId, xp, false);
			chat.sendCommandResponse(player, "Added "+xp+" experience to "+args[0], ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "boost", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 2) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [skill] [boostAmount]", ctx.console);
				return;
			}
			var statId = stat.lookup(args[0]);
			if (statId === -1) {
				chat.sendCommandResponse(player, "Invalid skill: "+args[0], ctx.console);
				return;
			}
			var boost = parseInt(args[1]);
			if (isNaN(boost)) {
				chat.sendCommandResponse(player, "Invalid boost amount: "+args[1], ctx.console);
				return;
			}
			stat.boost(player, statId, boost);
			chat.sendCommandResponse(player, "Boosted "+args[0]+" by "+boost+" levels.", ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "god", function (ctx) {
			var player = ctx.player;
			
			stat.setLevel(player, Stat.STRENGTH, 255);
			stat.setLevel(player, Stat.ATTACK, 255);
			stat.setLevel(player, Stat.MAGIC, 255);
			stat.setLevel(player, Stat.RANGED, 255);
			stat.setLevel(player, Stat.DEFENCE, 255);
			stat.setLevel(player, Stat.PRAYER, 255);
			stat.setLevel(player, Stat.CONSTITUTION, 255);
			ENGINE.restoreLifePoints(player);
			ENGINE.setRenderAnim(player, 2987);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "normal", function (ctx) {
			var player = ctx.player;
			
			stat.reset(player, Stat.STRENGTH);
			stat.reset(player, Stat.ATTACK);
			stat.reset(player, Stat.MAGIC);
			stat.reset(player, Stat.RANGED);
			stat.reset(player, Stat.DEFENCE);
			stat.reset(player, Stat.PRAYER);
			stat.reset(player, Stat.CONSTITUTION);
			ENGINE.restoreLifePoints(player);
			ENGINE.setRenderAnim(player, -1);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, ["master", "max"], function (ctx) {
			var player = ctx.player;
			
			for (var statId=0; statId < 27; statId++) {
				stat.giveXp(player, statId, 13034431, false);
			}
			ENGINE.restoreLifePoints(player);
		});
	}
})();
