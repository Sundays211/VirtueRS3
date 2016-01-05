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
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */


var MysteriousRunes = {
		AIR : {
			locTypeId : 2452,
			destination : api.getCoords(2841, 4829, 0),
			talisman : 1438,
			tiara : 5527,
			staff : 13630
		},
		MIND : {
			locTypeId : 2453,
			destination : api.getCoords(2792, 4827, 0),
			talisman : 1448,
			tiara : 5529,
			staff : 13631
		},
		WATER : {
			locTypeId : 2454,
			destination : api.getCoords(3482, 4838, 0),
			talisman : 1444,
			tiara : 5531,
			staff : 13632
		},
		EARTH : {
			locTypeId : 2455,
			destination : api.getCoords(2655, 4830, 0),
			talisman : 1440,
			tiara : 5535,
			staff : 13633
		},
		FIRE : {
			locTypeId : 2456,
			destination : api.getCoords(2574, 4848, 0),
			talisman : 1442,
			tiara : 5537,
			staff : 13634
		},
		BODY : {
			locTypeId : 2457,
			destination : api.getCoords(2522, 4835, 0),
			talisman : 1446,
			tiara : 5533,
			staff : 13635
		},
		COSMIC : {
			locTypeId : 2458,
			destination : api.getCoords(2142, 4853, 0),
			talisman : 1454,
			tiara : 5539,
			staff : 13636
		},
		CHAOS : {
			locTypeId : 2461,
			destination : api.getCoords(2281, 4837, 0),
			talisman : 1452,
			tiara : 5543,
			staff : 13637
		},
		NATURE : {
			locTypeId : 2460,
			destination : api.getCoords(2398, 4841, 0),
			talisman : 1462,
			tiara : 5541,
			staff : 13638
		}
		//TODO: Law, Death, & Blood
};

var Alter = {
		AIR : {
			locTypeId : 2478,
			level : 1,
			xp : 5,
			runeID : 556,
			gfxID : 4746,
			pureOnly : false,
			multiplesAt : [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
		},
		MIND : {
			locTypeId : 2479,
			level : 2,
			xp : 5.5,
			runeID : 558,
			gfxID : 4750,
			pureOnly : false,
			multiplesAt : [14, 28, 42, 56, 70, 84, 98, 112]
		},
		WATER : {
			locTypeId : 2480,
			level : 5,
			xp : 6,
			runeID : 555,
			gfxID : 4747,
			pureOnly : false,
			multiplesAt : [19, 38, 57, 76, 95]
		},
		EARTH : {
			locTypeId : 2481,
			level : 9,
			xp : 6.5,
			runeID : 557,
			gfxID : 4749,
			pureOnly : false,
			multiplesAt : [26, 52, 78, 104]
		},
		FIRE : {
			locTypeId : 2482,
			level : 14,
			xp : 7,
			runeID : 554,
			gfxID : 4748,
			pureOnly : false,
			multiplesAt : [35, 70, 105]
		},
		BODY : {
			locTypeId : 2483,
			level : 20,
			xp : 7.5,
			runeID : 559,
			gfxID : 4751,
			pureOnly : false,
			multiplesAt : [46, 92]
		},
		COSMIC : {
			locTypeId : 2484,
			level : 27,
			xp : 8,
			runeID : 564,
			gfxID : 4754,
			pureOnly : true,
			multiplesAt : [59]
		},
		CHAOS : {
			locTypeId : 2487,
			level : 35,
			xp : 8.5,
			runeID : 562,
			gfxID : 4752,
			pureOnly : true,
			multiplesAt : [74]
		},
		ASTRAL : {
			locTypeId : 17010,
			level : 40,
			xp : 8.7,
			runeID : 9075,
			gfxID : 4757,
			pureOnly : true,
			multiplesAt : [82]
		},
		NATURE : {
			locTypeId : 2486,
			level : 44,
			xp : 9,
			runeID : 561,
			gfxID : 4753,
			pureOnly : true,
			multiplesAt : [91]
		},
		LAW : {
			locTypeId : 2485,
			level : 54,
			xp : 9.5,
			runeID : 563,
			gfxID : 4756,
			pureOnly : true,
			multiplesAt : [110]
		},
		DEATH : {
			locTypeId : 2488,
			level : 65,
			xp : 10,
			runeID : 560,
			gfxID : 4758,
			pureOnly : true,
			multiplesAt : []
		},
		BLOOD : {
			locTypeId : 30624,
			level : 77,
			xp : 10.5,
			runeID : 565,
			gfxID : 4755,
			pureOnly : true,
			multiplesAt : []
		}
};

var ExitPortal = {
		AIR : {
			locTypeId : 2465,
			destination : api.getCoords(3129, 3407, 0)
		},
		MIND : {
			locTypeId : 2466,
			destination : api.getCoords(2980, 3515, 0)
		},
		WATER : {
			locTypeId : 2467,
			destination : api.getCoords(3157, 3160, 0)
		},
		EARTH : {
			locTypeId : 2468,
			destination : api.getCoords(3304, 3476, 0)
		},
		FIRE : {
			locTypeId : 2469,
			destination : api.getCoords(3311, 3257, 0)
		},
		BODY : {
			locTypeId : 2470,
			destination : api.getCoords(3055, 3443, 0)
		},
		COSMIC : {
			locTypeId : 2471,
			destination : api.getCoords(2406, 4379, 0)
		},
		CHAOS : {
			locTypeId : 2474,
			destination : api.getCoords(3059, 3588, 0)
		},
		NATURE : {
			locTypeId : 2473,
			destination : api.getCoords(2867, 3017, 0)
		},
		LAW : {
			locTypeId : 2472,
			destination : api.getCoords(2856, 3379, 0)
		},
		DEATH : {
			locTypeId : 2475,
			destination : api.getCoords(1863, 4637, 0)
		},
		BLOOD : {
			locTypeId : 2477,
			destination : api.getCoords(3560, 9779, 0)
		}
};

var RunesListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;		
		var runes = Runecrafting.forRunes(locTypeId);
		if (runes !== null && Runecrafting.canEnter(player, runes)) {
			api.teleportEntity(player, runes.destination);
		}
	}
});

var PortalListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var portal = Runecrafting.forPortal(locTypeId);
		if (portal !== null) {
			api.teleportEntity(args.player, portal.destination);
		}
	}
});

var AlterListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var alter = Runecrafting.forAlter(locTypeId);
		if (alter !== null) {
			Runecrafting.craftRunes(args.player, alter);
		}
	}
});

/* Listen to the events specified */
var listen = function(scriptManager) {	
	var locs = [];
	for (var runes in MysteriousRunes) {
		locs.push(MysteriousRunes[runes].locTypeId);
	}
	var runesListener = new RunesListener();
	for (var i in locs) {
		//Bind option one on all mysterious runes to this listener
		scriptManager.registerListener(EventType.OPLOC1, locs[i], runesListener);
	}
	
	var locs = [];
	for (var portal in ExitPortal) {
		locs.push(ExitPortal[portal].locTypeId);
	}
	var portalListener = new PortalListener();
	for (var i in locs) {
		//Bind option one on all runecrafting exit portals to this listener
		scriptManager.registerListener(EventType.OPLOC1, locs[i], portalListener);
	}
	
	locs = [];
	for (var alter in Alter) {
		locs.push(Alter[alter].locTypeId);
	}
	var alterListener = new AlterListener();
	for (var i in locs) {
		//Bind option one on all runecrafting alters to this listener
		scriptManager.registerListener(EventType.OPLOC1, locs[i], alterListener);
	}	
};

var Runecrafting = {
		craftRunes : function (player, alter) {
			var level = api.getStatLevel(player, Stat.RUNECRAFTING);
			if (level < alter.level) {
				api.sendMessage(player, "You need a runecrafting level of "+alter.level+" to craft this rune.");
				return;
			}
			var essCount = api.itemTotal(player, Inv.BACKPACK, 7936);//Pure essence
			var pureEss = true;
			if (essCount < 1) {
				if (!alter.pureOnly) {
					pureEss = false;
					essCount = api.itemTotal(player, Inv.BACKPACK, 1436);//Normal essence
				}
				if (essCount < 1) {
					api.sendMessage(player, "You don't have any "+(alter.pureOnly ? "pure" : "rune")+" essence.");
					return;
				}
			}
			var totalXp = essCount * alter.xp;
			player.lock(7);
			api.delItem(player, Inv.BACKPACK, pureEss ? 7936 : 1436, essCount);
			api.runAnimation(player, 23250);
			api.queueSpot(player, 1, alter.gfxID, 0, 5, 0);
			api.addExperience(player, Stat.RUNECRAFTING, totalXp, true);
			api.addItem(player, Inv.BACKPACK, alter.runeID, essCount * this.getHighestMultiple(alter, level))
			api.sendMessage(player, "You bind the temple's power into "+api.getItemType(alter.runeID).name.toLowerCase()+"s.");
		},
		forRunes : function (locTypeId) {
			for (var ordinal in MysteriousRunes) {
				if (MysteriousRunes[ordinal].locTypeId === locTypeId) {
					return MysteriousRunes[ordinal];
				}
			}
			return null;
		},
		forAlter : function (locTypeId) {
			for (var ordinal in Alter) {
				if (Alter[ordinal].locTypeId === locTypeId) {
					return Alter[ordinal];
				}
			}
			return null;
		},
		forPortal : function (locTypeId) {
			for (var ordinal in ExitPortal) {
				if (ExitPortal[ordinal].locTypeId === locTypeId) {
					return ExitPortal[ordinal];
				}
			}
			return null;
		},
		getHighestMultiple : function (alter, level) {
			var multiple = 1;
			for (var ordinal in alter.multiplesAt) {
				if (alter.multiplesAt[ordinal] <= level) {
					multiple++;
				}
			}
			return multiple;
		},
		canEnter : function (player, runes) {
			return true;//TODO: Check for talisman/tiara
		}
}