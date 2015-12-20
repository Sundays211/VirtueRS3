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

/**
 * @author Titanium
 * @since 11/14/2015
 */

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		
		switch (locTypeId) {
		case 69526:
			if (api.getCoordX(location) == 2474 && api.getCoordY(location) == 3435) {
				api.sendMessage(player, "You walk carefully across the slippery log...");
				api.runAnimation(player, 828);
				api.teleportEntity(player, 2474, 3429, 0);
				api.addExperience(player, Stat.AGILITY, 2000, true);
			} else if (api.getCoordX(location) == 2474 && api.getCoordY(location) == 3429) {
				api.sendMessage(player, "You walk carefully across the slippery log...");
				api.runAnimation(player, 9908);
				api.teleportEntity(player, 2474, 3436, 0);
			} else {
				api.sendMessage("Unhandled gnome agility course: "+location);
			}
			return;
		case 69383:
			if (api.getCoordX(location) == 3354 && api.getCoordY(location) == 2849) {
				api.teleportEntity(player, 3354, 2850, 1);
				api.runAnimation(player, 769);
				api.addExperience(player, Stat.AGILITY, 15, true);
			} else if (api.getCoordX(location) == 3200 && api.getCoordY(location) == 3243) {
				api.teleportEntity(player, 3200, 3245, 0);
			} else {
				api.sendMessage("Unhandled gnome agility course: "+location);
			}
			return;
		case 10860:
			if (api.getCoordX(location) == 3364 && api.getCoordY(location) == 2851) {
				api.teleportEntity(player, 3368, 2851, 1);
				api.runAnimation(player, 756);
				api.addExperience(player, Stat.AGILITY, 15, true);
			} else if (api.getCoordX(location) == 3200 && api.getCoordY(location) == 3243) {
				api.teleportEntity(player, 3200, 3242, 1);
			} else {
				api.sendMessage("Unhandled gnome agility course: "+location);
			}
			return;
		case 10868:
			if (api.getCoordX(location) == 3375 && api.getCoordY(location) == 2845) {
				api.teleportEntity(player, 3375, 2840, 1);
				api.runAnimation(player, 762);
				api.addExperience(player, Stat.AGILITY, 15, true);
			} else if (api.getCoordX(location) == 3200 && api.getCoordY(location) == 3243) {
				api.teleportEntity(player, 3200, 3242, 1);
			} else {
				api.sendMessage("Unhandled gnome agility course: "+location);
			}
			return;
		default:
			api.sendMessage("Unhandled gnome agility course: "+location);
			return;
		}
	}
});

/* Listen to the locations specified */
var listen = function(scriptManager) {
	var locs = [ 69526, 69383, 69508, 2312, 69507, 69384, 69377, 69378 ];
	var locationListener = new LocationListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], locationListener);
	}
};