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

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2015
 */

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		
		if (api.isPaused(player)) {
			return false;
		}
		
		switch (locTypeId) {
			case 1804://Varrock dungeon Door
				if(api.getCoordX(player) == 3115 && api.getCoordY(player) == 3449) {
					api.teleportEntity(player, 3115, 3450, 0);
				} else if(api.getCoordX(player) == 3115 && api.getCoordY(player) == 3450) {
					api.teleportEntity(player, 3115, 3449, 0);
				}
			return true;
			case 12389://Varrock dungeon Latter
				api.teleportEntity(player, 3117, 9852, 0);
			return true;
			case 29335://Varrock dungeon Latter
				api.teleportEntity(player, 3115, 3452, 0);
			return true;
			case 79061://Food Table
				api.runAnimation(player, 881);
				api.addCarriedItem(player, 385, 1); //Sharks
				api.sendMessage(player, "You take food from the table.");
				return true;
			case 79041://Melee Setup
				api.runAnimation(player, 881);
				api.addCarriedItem(player, 1163, 1);
				api.addCarriedItem(player, 1127, 1);
				api.addCarriedItem(player, 1079, 1);
				api.addCarriedItem(player, 1201, 1);
				api.addCarriedItem(player, 7462, 1);	
				api.addCarriedItem(player, 4151, 1);
				api.addCarriedItem(player, 1215, 1);	
				api.addCarriedItem(player, 1725, 1);
				api.addCarriedItem(player, 6570, 1);
				api.addCarriedItem(player, 11732, 1);			
				api.sendMessage(player, "You take the melee setup!");
				return true;
			case 79042://Range Setup
				api.runAnimation(player, 881);
				api.addCarriedItem(player, 3749, 1);//archer helm
				api.addCarriedItem(player, 24382, 1);//royal dhide body
				api.addCarriedItem(player, 24379, 1);//royal dhide chaps
				api.addCarriedItem(player, 7462, 1);//barrows gloves
				api.addCarriedItem(player, 9185, 1);//rune crossbow
				api.addCarriedItem(player, 25891, 1);//offhand rune crossbow
				api.addCarriedItem(player, 9144, 1000);//runite bolts
				api.addCarriedItem(player, 6733, 1);//archer's ring
				api.addCarriedItem(player, 6585, 1);//fury
				api.addCarriedItem(player, 6570, 1);//fire cape
				api.addCarriedItem(player, 10499, 1);//avas accumalator			
				api.sendMessage(player, "You take the ranged setup!");
				return true;	
			case 79043://Magic Setup
				api.runAnimation(player, 881);
				api.addCarriedItem(player, 25825, 1);
				api.addCarriedItem(player, 25827, 1);
				api.addCarriedItem(player, 25831, 1);
				api.addCarriedItem(player, 25802, 1);
				api.addCarriedItem(player, 30825, 1);	
				api.addCarriedItem(player, 30828, 1);
				api.addCarriedItem(player, 22494, 1);	
				api.addCarriedItem(player, 1727, 1);
				api.addCarriedItem(player, 6922, 1);
				api.addCarriedItem(player, 6920, 1);
				api.addCarriedItem(player, 6570, 1);							
				api.sendMessage(player, "You take the magic setup!");
				return true;					
			case 79037://Combat Setup
				api.openDialog(player, "Combat");
				return true;		
			case 77834://KBD Lair
				api.teleportEntity(player, 2273, 4681, 0);
				return true;
			case 1817:
				api.teleportEntity(player, 3051, 3519, 0);
				return true;
			case 14304://Boat to Void Knight's Outpost
				api.teleportEntity(player, 2662, 2676, 1);
				return true;
			case 14305://Get off Port Sarim Boat
				api.teleportEntity(player, 3041, 3202, 0);
				return true;	
			case 14306://Leave Void Knight's Outpost
				api.teleportEntity(player, 3041, 3199, 1);
				return true;
			case 14307://Get off Void Knight's Boat
				api.teleportEntity(player, 2659, 2676, 0);
				return true;
			case 68134://Enter Tzhaar City
				api.teleportEntity(player, 4667, 5059, 0);
				return true;
			case 68135://Exit Tzhaar City
				api.teleportEntity(player, 2845, 3170, 0);
				return true;
			case 20604://gamer grotto
				api.teleportEntity(player, 3018, 3404, 0);
				return true;
			case 20602://gamer grotto
				api.teleportEntity(player, 2954, 9675, 0);
				return true;
			case 68223:
				api.teleportEntity(player, 4585, 5076, 0);
				return true;
			case 38698:
				api.teleportEntity(player, 2815, 5511, 0);
				return true;
			case 9356:
				api.teleportEntity(player, 4585, 5076, 0);
				return true;
			case 65084://Wildy Ditch
			case 65086:
			case 65082:
			case 65079:
			case 65077:
				if(api.getCoordY(player) == 3520) {
					api.runAnimation(player, 6132);
					api.teleportEntityBy(player, 0, 3, 0);
				}
				return true;
			default:
				return false;
		}		
	}
});

/* Listen to the location ids specified */
var listen = function(scriptManager) {
	var locs = [ 77834, 1817, 14304, 14305, 14306, 14307, 68134, 68135, 65084,
					68223, 9356, 65086, 65082, 65079, 65077, 38698, 20604, 20602, 79061, 79041, 79042, 79043,
					1804, 12389, 29335 ];
	var listener = new LocationListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
	}
};