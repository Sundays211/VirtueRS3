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
/* globals EventType, Java */
var Gender = Java.type('org.virtue.game.entity.player.PlayerModel.Gender');
var World = Java.type('org.virtue.game.World');
var Render = Java.type('org.virtue.game.entity.player.PlayerModel.Render');
var GlowColorBlock = Java.type('org.virtue.network.protocol.update.block.GlowColorBlock');

var chat = require('chat');
var anim = require('anim');

/**
 * 
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "anim", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1 || isNaN(args[0])) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id]", ctx.console);
				return;
			}
			var animId = parseInt(args[0]);
			anim.run(player, animId, function () {
				chat.sendMessage(player, "Finished animation "+animId);
			});
			chat.sendCommandResponse(player, "Running animation "+animId, ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "gender", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args[0] == 0) {
				player.getModel().setGender(Gender.MALE);
				player.getModel().refresh();
			} else if (args[0] == 1) {
				player.getModel().setGender(Gender.FEMALE);
				player.getModel().refresh();
			}
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, [ "spot", "spotanim" ], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1 || isNaN(args[0])) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id] [type]", ctx.console);
				return;
			}
			var spotAnimId = parseInt(args[0]);
			anim.addSpotAnim(player, spotAnimId);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, [ "hair", "hairstyle" ], function (ctx) {
			ctx.player.getModel().setTempStyle(0, parseInt(ctx.cmdArgs[0]));
			ctx.player.getModel().refresh();
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, [ "bas", "baseanim" ], function (ctx) {
			var player = ctx.player;
			
			if (ctx.cmdArgs.length < 1) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id]", ctx.console);
				return;
			}
			var animID = parseInt(ctx.cmdArgs[0]);
			player.getModel().setRenderAnimation(animID);
			player.getModel().refresh();
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "render", function (ctx) {
			var player = ctx.player;
			
			if (ctx.cmdArgs[0] === 0) {
				player.getModel().setRender(Render.PLAYER);
				player.getModel().refresh();
			} else if (ctx.cmdArgs[0] === 1) {
				player.getModel().setRender(Render.NPC);
				player.getModel().setNPCId(ctx.cmdArgs[1]);
				player.getModel().refresh();
			} else if (ctx.cmdArgs[0] === 2) {
				player.getModel().setRender(Render.INVISIBLE);
				player.getModel().refresh();
			}
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "render", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 4) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [red] [green] [blue] [alpha]", ctx.console);
				return;
			}
			
			var iterate = World.getInstance().getPlayers().iterator();
			var players = null;
			while (iterate.hasNext()) {
				players = iterate.next();
				players.queueUpdateBlock(new GlowColorBlock(args[0], args[1], args[2], args[3], 0, 100));
			}
		});
	}
})();