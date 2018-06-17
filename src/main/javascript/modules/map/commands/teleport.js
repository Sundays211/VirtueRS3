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
/* globals EventType */
var coords = require('shared/map/coords');

var dialog = require('shared/dialog');
var chat = require('shared/chat');
var entityMap = require('shared/map/entity');
var common = require('shared/map/common');

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
		scriptManager.bind(EventType.COMMAND, [ "tele", "goto", "move" ], function (ctx) {
			var args = ctx.cmdArgs;
			var x, y, level;
			var currentCoords = entityMap.getCoords(ctx.player);
			var targetCoords;
			if (args[0] == "home") {
			    entityMap.setCoords(ctx.player, coords(0, 50, 50, 21, 19));
			    return;
			}
			if (args.length < 2) {
				chat.sendCommandResponse(ctx.player, "Usage: "+ctx.syntax+" [x-coord] [y-coord]", ctx.console);
				return;
			}
			if (args.length >= 5) {
				level = parseInt(args[0]);
				var squareX = parseInt(args[1]);
				var squareY = parseInt(args[2]);
				var localX = parseInt(args[3]);
				var localY = parseInt(args[4]);
				targetCoords = coords(level, squareX, squareY, localX, localY);
			} else	if (args.length == 2) {
				x = parseInt(args[0]);
				y = parseInt(args[1]);
				level = common.getLevel(currentCoords);
				targetCoords = coords(x, y, level);
			} else {
				x = parseInt(args[0]);
				y = parseInt(args[1]);
				level = parseInt(args[2]);
				targetCoords = coords(x, y, level);
			}
			entityMap.setCoords(ctx.player, targetCoords);
		});

		scriptManager.bind(EventType.COMMAND_ADMIN, "up", function (ctx) {
			var currentCoords = entityMap.getCoords(ctx.player);
			var x = common.getCoordX(currentCoords);
			var y = common.getCoordY(currentCoords);
			var level = Math.min(common.getLevel(currentCoords)+1, 3);
			entityMap.setCoords(ctx.player, coords(x, y, level));
		});

		scriptManager.bind(EventType.COMMAND_ADMIN, "down", function (ctx) {
			var currentCoords = entityMap.getCoords(ctx.player);
			var x = common.getCoordX(currentCoords);
			var y = common.getCoordY(currentCoords);
			var level = Math.max(common.getLevel(currentCoords)-1, 0);
			entityMap.setCoords(ctx.player, coords(x, y, level));
		});

		scriptManager.bind(EventType.COMMAND_ADMIN, "teleto", function (ctx) {
			var message = "Please enter the display name of the player you wish to teleport to:";
			dialog.requestPlayer(ctx.player, message, function (targetPlayer) {
				entityMap.setCoords(ctx.player, entityMap.getCoords(targetPlayer));
			});
		});

		scriptManager.bind(EventType.COMMAND_ADMIN, "teletome", function (ctx) {
			var message = "Please enter the display name of the player you wish to teleport to you:";
			dialog.requestPlayer(ctx.player, message, function (targetPlayer) {
				entityMap.setCoords(targetPlayer, entityMap.getCoords(ctx.player));
			});
		});
	}

})();
