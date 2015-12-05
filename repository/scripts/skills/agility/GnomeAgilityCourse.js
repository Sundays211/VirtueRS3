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
var api;
var AGILITY_SKILL = 16;

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {
	
	/* The location ids to bind to */
	getIDs: function() {
			return [69526, 69383, 69508, 2312, 69507, 69384, 69377, 69378];
	},

	/* The first option on a loc */
	handleInteraction: function(player, loc, option) {
		switch (loc.getID()) {
		case 69526:
			if (option == 1) {
				if (loc.getTile().getX() == 2474 && loc.getTile().getY() == 3435) {
					api.sendMessage(player, "You walk carefully across the slippery log...");
					api.runAnimation(player, 828);
					api.teleportEntity(player, 2474, 3429, 0);
					api.addExperience(player, AGILITY_SKILL, 2000, true);
				} else if (loc.getTile().getX() == 2474 && loc.getTile().getY() == 3429) {
					api.sendMessage(player, "You walk carefully across the slippery log...");
					api.runAnimation(player, 9908);
					api.teleportEntity(player, 2474, 3436, 0);
				} else {
					return false;
				}
				return true;
			}
			return false;
		case 69383:
			if (option == 1) {
				if (loc.getTile().getX() == 3354 && loc.getTile().getY() == 2849) {
					api.teleportEntity(player, 3354, 2850, 1);
					api.runAnimation(player, 769);
					api.addExperience(player, "agility", 15, true);
				} else if (loc.getTile().getX() == 3200 && loc.getTile().getY() == 3243) {
					api.teleportEntity(player, 3200, 3245, 0);
				} else {
					return false;
				}
				return true;
			}
			return false;
		case 10860:
			if (option == 1) {
				if (loc.getTile().getX() == 3364 && loc.getTile().getY() == 2851) {
					api.teleportEntity(player, 3368, 2851, 1);
					api.runAnimation(player, 756);
					api.addExperience(player, "agility", 15, true);
				} else if (loc.getTile().getX() == 3200 && loc.getTile().getY() == 3243) {
					api.teleportEntity(player, 3200, 3242, 1);
				} else {
					return false;
				}
				return true;
			}
			return false;
		case 10868:
			if (option == 1) {
				if (loc.getTile().getX() == 3375 && loc.getTile().getY() == 2845) {
					api.teleportEntity(player, 3375, 2840, 1);
					api.runAnimation(player, 762);
					api.addExperience(player, "agility", 15, true);
				} else if (loc.getTile().getX() == 3200 && loc.getTile().getY() == 3243) {
					api.teleportEntity(player, 3200, 3242, 1);
				} else {
					return false;
				}
				return true;
			}
			return false;
		}		
		return false;
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (object, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var npcListener = new NpcListener();
	var locationListener = new LocationListener();
	scriptManager.registerNpcListener(npcListener, npcListener.getIDs());
	scriptManager.registerLocationListener(locationListener, locationListener.getIDs());
};