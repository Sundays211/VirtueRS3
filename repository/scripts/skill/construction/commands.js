/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
var _config = require('engine/config');
var _map = require('engine/map');

var chat = require('chat');

var house = require('./house');
var houseBuilder = require('./house-builder');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND, "house", function (ctx) {
			house.enter(ctx.player);
		});

		scriptManager.bind(EventType.COMMAND, "room", function (ctx) {
			var args = ctx.cmdArgs;

			if (args.length < 1) {
				chat.sendCommandResponse(ctx.player, "Usage: room {room_id}", ctx.console);
				return;
			}
			var roomObjId = parseInt(args[0]);
			if (!roomObjId) {
				chat.sendCommandResponse(ctx.player, "Usage: room {room_id}", ctx.console);
				return;
			}
			var zoneX = Math.floor(_map.getLocalX(ctx.player) / 8);
			var zoneY = Math.floor(_map.getLocalY(ctx.player) / 8);
			var level = _map.getLevel(ctx.player);

			houseBuilder.addRoom(ctx.player, roomObjId, zoneX, zoneY, level, 0);
			chat.sendCommandResponse(ctx.player, "Added "+_config.objName(roomObjId)+" at "+zoneX+", "+zoneY, ctx.console);
		});

		scriptManager.bind(EventType.COMMAND, "delroom", function (ctx) {
			var zoneX = Math.floor(_map.getLocalX(ctx.player) / 8);
			var zoneY = Math.floor(_map.getLocalY(ctx.player) / 8);
			var level = _map.getLevel(ctx.player);

			houseBuilder.removeRoom(ctx.player, zoneX, zoneY, level);
			chat.sendCommandResponse(ctx.player, "Removed room at "+zoneX+", "+zoneY+", "+level, ctx.console);
		});
	}
})();