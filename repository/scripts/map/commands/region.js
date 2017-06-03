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
var coords = require('../coords');

var chat = require('../../chat');
var entityMap = require('../entity');

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
	}
})();
