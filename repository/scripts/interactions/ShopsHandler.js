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
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/02/2015
 */
var api;

var NpcListener = Java.extend(Java.type('org.virtue.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [546, 551, 522, 523, 5913, 550, 549, 519, 520, 521, 8864, 526, 527];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		switch (npc.getID()) {
		case 551://Varrock Sword Shop
			if (option == 3) {
				api.setVarp(player, 304, 6);
				api.setVarp(player, 305, 555);
				api.setVarc(player, 2360, "Varrock Sword Shop");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 522:
		case 523://General store assistant
			if (option == 3) {
				api.setVarp(player, 304, 3);
				api.setVarp(player, 305, 553);//NOTE: Make sure you add the stock information in ContainerState.java
				api.setVarc(player, 2360, "Varrock General Store");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 546://Zaff Staff Shop
			if (option == 3) {
				api.setVarp(player, 304, 9);
				api.setVarc(player, 2360, "Zaff's Superior Staves");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 549://Horviks Armour Shop
			if (option == 3) {
				api.setVarp(player, 304, 2);
				api.setVarc(player, 2360, "Horvik's Armour Shop");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 550://Lowe's Archery Emporium
			if (option == 3) {
				api.setVarp(player, 304, 7);
				api.setVarp(player, 305, 556);
				api.setVarc(player, 2360, "Lowe's Archery Emporium");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 5913://Aubury's Rune Shop
			if (option == 4) {
				api.setVarp(player, 304, 5);
				api.setVarp(player, 305, 557);
				api.setVarc(player, 2360, "Aubury's Rune Shop");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 519://Bob
			if (option == 3) {
				api.setVarp(player, 304, 1);
				api.setVarp(player, 305, 554);
				api.setVarc(player, 2360, "Bob's Brilliant Axes");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 520:
		case 521://General store assistant
			if (option == 3) {
				api.setVarp(player, 304, 3);
				api.setVarp(player, 305, 553);//NOTE: Make sure you add the stock information in ContainerState.java
				api.setVarc(player, 2360, "Lumbridge General Store");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 8864://Hank (Fishing shop)
			if (option == 3) {
				api.setVarp(player, 304, 562);
				api.setVarp(player, 305, 561);
				api.setVarc(player, 2360, "Lumbridge Fishing Supplies");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		case 526://General store assistant
		case 527://General store assistant
			if (option == 3) {
				api.setVarp(player, 304, 3);
				api.setVarp(player, 305, 553);//NOTE: Make sure you add the stock information in ContainerState.java
				api.setVarc(player, 2360, "Falador General Store");
				api.openCentralWidget(player, 1265, false);
				return true;
			}
			return false;
		default:
			return false;
		}
	},
	
	getInteractRange : function (npc, option) {
		return 1;
	}

});


var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {
	
	/* The location ids to bind to */
	getIDs: function() {
		return [ 36773, 36774, 36775, 36776, 36777, 36778, 45481, 45482 ];
	},

	/* The first option on a loc */
	handleInteraction: function(player, loc, option) {
		switch (loc.getID()) {
		
		/*South castle stairs*/
		case 36773://Ground
			if (option == 1) {
				api.teleportEntity(player, 3205, 3209, 1);
				return true;
			}
			return false;
		case 36774://Level 1
			if (option == 2) {
				api.teleportEntity(player, 3205, 3209, 2);
				return true;
			} else if (option == 3) {
				api.teleportEntity(player, 3205, 3209, 0);
				return true;
			}
			return false;
		case 36775://Level 2
			if (option == 1) {
				api.teleportEntity(player, 3205, 3209, 1);
				return true;
			}
			return false;
			
		/*North castle stairs*/
		case 36776://Ground
			if (option == 1) {
				api.teleportEntity(player, 3205, 3228, 1);
				return true;
			}
			return false;
		case 36777://Level 2
			if (option == 2) {
				api.teleportEntity(player, 3205, 3228, 2);
				return true;
			} else if (option == 3) {
				api.teleportEntity(player, 3205, 3228, 0);
				return true;
			}
			return false;
		case 36778://Level 2
			if (option == 1) {
				api.teleportEntity(player, 3205, 3228, 1);
				return true;
			}
			return false;
			
		/*Lumbridge general store*/
		case 45481://Ground
			if (option == 1) {
				if (loc.getTile().getX() == 3215 && loc.getTile().getY() == 3239) {
					api.teleportEntity(player, 3214, 3239, 1);
				} else if (loc.getTile().getX() == 3200 && loc.getTile().getY() == 3243) {
					api.teleportEntity(player, 3200, 3242, 1);
				} else {
					return false;
				}
				return true;
			}
			return false;
		case 45482://Level 1
			if (option == 1) {
				if (loc.getTile().getX() == 3215 && loc.getTile().getY() == 3239) {
					api.teleportEntity(player, 3217, 3239, 0);
				} else if (loc.getTile().getX() == 3200 && loc.getTile().getY() == 3243) {
					api.teleportEntity(player, 3200, 3245, 0);
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