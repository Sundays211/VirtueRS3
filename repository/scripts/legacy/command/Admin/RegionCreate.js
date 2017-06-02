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
/**
 * @author Kayla
 * @date 11/17/2015
 */

var CommandListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		if (syntax.toLowerCase() == "makeregion") {
			var dynamicRegion = mapApi.createArea();
			for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
				for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
					mapApi.setChunk(dynamicRegion, xOffSet, yOffSet, 0, 14, 624, 0, 0);
				}
			}
			mapApi.setChunk(dynamicRegion, 1, 1, 0, 18, 532, 0, 0);
			mapApi.buildArea(dynamicRegion);
			var squareX = mapApi.getSquareX(dynamicRegion);
			var squareY = mapApi.getSquareY(dynamicRegion);
			api.teleportEntity(player, 0, squareX, squareY, 10, 10);
			api.sendMessage(player, "You made a dynamic region!");
		} else if (syntax.toLowerCase() == "delregion") {
			var dynamicRegion = player.getArmarDynamicRegion();
			mapApi.destroyArea(dynamicRegion);
			api.sendMessage(player, "Dynamic Region deleted!");
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "makeregion", listener);
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "delregion", listener);
};