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
var Tile = Java.type('org.virtue.model.entity.region.Tile');
var DynamicRegion = Java.type('org.virtue.model.entity.region.DynamicRegion');
var RegionTools = Java.type('org.virtue.model.entity.region.RegionTools');
var ClipFlag = Java.type('org.virtue.model.entity.region.ClipFlag');
var Region = Java.type('org.virtue.model.entity.region.Region');
/**
 * @author Kayla
 * @date 11/17/2015
 */

var CommandListener = Java.extend(Java
		.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes : function() {
		return [ "makeregion", "delregion" ];
	},

	/* The first option on an object */
	handle : function(player, syntax, args, clientCommand) {
		if (syntax.toLowerCase() == "makeregion") {
			DynamicRegion = RegionTools.createRegion();
			for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
				for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
					RegionTools.setChunk(DynamicRegion, xOffSet, yOffSet, 0, 69, 80, 0, 0);
				}
			}
			RegionTools.buildRegion(DynamicRegion);
			player.getMovement().teleportTo(DynamicRegion.getBaseTile());
			player.setArmarDynamicRegion(DynamicRegion);
			api.sendMessage(player, "You made a dynamic region!");
		} else if (syntax.toLowerCase() == "delregion") {
			DynamicRegion = player.getArmarDynamicRegion();
			RegionTools.destroyRegion(DynamicRegion);
			api.sendMessage(player, "Dynamic Region deleted!");
		}
		return true;
	},

	adminCommand : function() {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener
			.getPossibleSyntaxes());
};