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
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* globals EventType, MAP_ENGINE */
var coords = require('map/coords');

var chat = require('chat');
var entityMap = require('map/entity');
var common = require('map/common');
var location = require('map/location');

/**
 * @author Kayla
 * @date 11/17/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "makeregion", function (ctx) {
			var dynamicRegion = MAP_ENGINE.createArea();
			for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
				for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
					MAP_ENGINE.setChunk(dynamicRegion, xOffSet, yOffSet, 0, 14, 624, 0, 0);
				}
			}
			MAP_ENGINE.setChunk(dynamicRegion, 1, 1, 0, 18, 532, 0, 0);
			MAP_ENGINE.buildArea(dynamicRegion);
			var squareX = MAP_ENGINE.getSquareX(dynamicRegion);
			var squareY = MAP_ENGINE.getSquareY(dynamicRegion);
			entityMap.setCoords(ctx.player, coords(squareX, squareY, 0, 10, 10));
			chat.sendMessage(ctx.player, "You made a dynamic region!");
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "delregion", function (ctx) {
			var dynamicRegion = ctx.player.getArmarDynamicRegion();
			MAP_ENGINE.destroyArea(dynamicRegion);
			chat.sendMessage(ctx.player, "Dynamic Region deleted!");
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, ["loc", "location"], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1 || isNaN(args[0])) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" <locationId> [<shape>] [<rotation>]", ctx.console);				
				return;
			}
			
			var locId = parseInt(args[0]);
			var shape = 10;
			if (args.length >= 2 && !isNaN(args[1])) {
				shape = parseInt(args[1]);
			}
			var rotation = 0;
			if (args.length >= 3 && !isNaN(args[2])) {
				rotation = parseInt(args[2]);
			}
			
			location.add(locId, common.getCoords(player), shape, rotation);
			chat.sendCommandResponse(player, "Spawned location "+locId, ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "testRing", function () {
			location.add(13137, coords(3210, 3258, 0), 0, 3);//north
			location.add(13137, coords(3211, 3258, 0), 0, 3);//north2
			location.add(13137, coords(3209, 3258, 0), 0, 3);//north3
			location.add(13137, coords(3208, 3257, 0), 0, 2);//northwest
			location.add(13137, coords(3208, 3256, 0), 0, 2);//northwest2
			location.add(13137, coords(3208, 3255, 0), 0, 2);//northwest3
			location.add(13137, coords(3208, 3254, 0), 3, 1);//southwestCorner
			location.add(13137, coords(3208, 3258, 0), 3, 2);//northwestCorner
			location.add(13137, coords(3212, 3258, 0), 3, 3);//northeastCorner
			location.add(13137, coords(3212, 3254, 0), 3, 4);//southeastCorner
			location.add(13137, coords(3212, 3257, 0), 0, 0);//east
			location.add(13137, coords(3212, 3256, 0), 0, 0);//east2
			location.add(13137, coords(3212, 3255, 0), 0, 0);//east3
			location.add(13137, coords(3211, 3254, 0), 0, 1);//south
			location.add(13137, coords(3210, 3254, 0), 0, 1);//south2
			location.add(13137, coords(3209, 3254, 0), 0, 1);//south3
			location.add(13140, coords(3211, 3257, 0), 22, 2);//floor
			location.add(13140, coords(3210, 3257, 0), 22, 2);//floor1
			location.add(13140, coords(3209, 3257, 0), 22, 2);//floor2
			location.add(13140, coords(3211, 3256, 0), 22, 2);//floor3
			location.add(13140, coords(3210, 3256, 0), 22, 2);//floor4
			location.add(13140, coords(3209, 3256, 0), 22, 2);//floor5
			location.add(13140, coords(3209, 3255, 0), 22, 2);//floor6
			location.add(13140, coords(3210, 3255, 0), 22, 2);//floor7
			location.add(13140, coords(3211, 3255, 0), 22, 2);//floor8
		});
	}
})();
