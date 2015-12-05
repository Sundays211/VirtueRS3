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
var Tile = Java.type('org.virtue.model.entity.region.Tile');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');
var SkillType = Java.type('org.virtue.model.entity.player.skill.SkillType');
var ContainerState = Java.type('org.virtue.model.entity.player.inv.ContainerState');
var Item = Java.type('org.virtue.model.entity.player.inv.Item');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */


var MysteriousRunes = {
		AIR : {
			objectID : 2452,
			destination : new Tile(2841, 4829, 0),
			talisman : 1438,
			tiara : 5527,
			staff : 13630
		},
		MIND : {
			objectID : 2453,
			destination : new Tile(2792, 4827, 0),
			talisman : 1448,
			tiara : 5529,
			staff : 13631
		},
		WATER : {
			objectID : 2454,
			destination : new Tile(3482, 4838, 0),
			talisman : 1444,
			tiara : 5531,
			staff : 13632
		},
		EARTH : {
			objectID : 2455,
			destination : new Tile(2655, 4830, 0),
			talisman : 1440,
			tiara : 5535,
			staff : 13633
		},
		FIRE : {
			objectID : 2456,
			destination : new Tile(2574, 4848, 0),
			talisman : 1442,
			tiara : 5537,
			staff : 13634
		},
		BODY : {
			objectID : 2457,
			destination : new Tile(2522, 4835, 0),
			talisman : 1446,
			tiara : 5533,
			staff : 13635
		},
		COSMIC : {
			objectID : 2458,
			destination : new Tile(2142, 4853, 0),
			talisman : 1454,
			tiara : 5539,
			staff : 13636
		},
		CHAOS : {
			objectID : 2461,
			destination : new Tile(2281, 4837, 0),
			talisman : 1452,
			tiara : 5543,
			staff : 13637
		},
		NATURE : {
			objectID : 2460,
			destination : new Tile(2398, 4841, 0),
			talisman : 1462,
			tiara : 5541,
			staff : 13638
		},
		LAW : {
			objectID : 2485,
			level : 54,
			xp : 45*9.5,
			runeID : 563,
			gfxID : 4756,
			pureOnly : true,
			multiplesAt : [110]
		},
		DEATH : {
			objectID : 2488,
			level : 65,
			xp : 45*10,
			runeID : 560,
			gfxID : 4758,
			pureOnly : true,
			multiplesAt : []
		},
		BLOOD : {
			objectID : 30624,
			level : 77,
			xp : 45*10.5,
			runeID : 565,
			gfxID : 4755,
			pureOnly : true,
			multiplesAt : []
		}
};

var Alter = {
		AIR : {
			objectID : 2478,
			level : 1,
			xp : 45*5,
			runeID : 556,
			gfxID : 4746,
			pureOnly : false,
			multiplesAt : [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
		},
		MIND : {
			objectID : 2479,
			level : 2,
			xp : 45*5.5,
			runeID : 558,
			gfxID : 4750,
			pureOnly : false,
			multiplesAt : [14, 28, 42, 56, 70, 84, 98, 112]
		},
		WATER : {
			objectID : 2480,
			level : 5,
			xp : 45*6,
			runeID : 555,
			gfxID : 4747,
			pureOnly : false,
			multiplesAt : [19, 38, 57, 76, 95]
		},
		EARTH : {
			objectID : 2481,
			level : 9,
			xp : 45*6.5,
			runeID : 557,
			gfxID : 4749,
			pureOnly : false,
			multiplesAt : [26, 52, 78, 104]
		},
		FIRE : {
			objectID : 2482,
			level : 14,
			xp : 45*7,
			runeID : 554,
			gfxID : 4748,
			pureOnly : false,
			multiplesAt : [35, 70, 105]
		},
		BODY : {
			objectID : 2483,
			level : 20,
			xp : 45*7.5,
			runeID : 559,
			gfxID : 4751,
			pureOnly : false,
			multiplesAt : [46, 92]
		},
		COSMIC : {
			objectID : 2484,
			level : 27,
			xp : 45*8,
			runeID : 564,
			gfxID : 4754,
			pureOnly : true,
			multiplesAt : [59]
		},
		CHAOS : {
			objectID : 2487,
			level : 35,
			xp : 45*8.5,
			runeID : 562,
			gfxID : 4752,
			pureOnly : true,
			multiplesAt : [74]
		},
		ASTRAL : {
			objectID : 17010,
			level : 40,
			xp : 45*8.7,
			runeID : 9075,
			gfxID : 4757,
			pureOnly : true,
			multiplesAt : [82]
		},
		NATURE : {
			objectID : 2486,
			level : 44,
			xp : 45*9,
			runeID : 561,
			gfxID : 4753,
			pureOnly : true,
			multiplesAt : [91]
		},
		LAW : {
			objectID : 2485,
			level : 54,
			xp : 45*9.5,
			runeID : 563,
			gfxID : 4756,
			pureOnly : true,
			multiplesAt : [110]
		},
		DEATH : {
			objectID : 2488,
			level : 65,
			xp : 45*10,
			runeID : 560,
			gfxID : 4758,
			pureOnly : true,
			multiplesAt : []
		},
		BLOOD : {
			objectID : 30624,
			level : 77,
			xp : 45*10.5,
			runeID : 565,
			gfxID : 4755,
			pureOnly : true,
			multiplesAt : []
		}
};

var ExitPortal = {
		AIR : {
			objectID : 2465,
			destination : new Tile(3129, 3407, 0)
		},
		MIND : {
			objectID : 2466,
			destination : new Tile(2980, 3515, 0)
		},
		WATER : {
			objectID : 2467,
			destination : new Tile(3157, 3160, 0)
		},
		EARTH : {
			objectID : 2468,
			destination : new Tile(3304, 3476, 0)
		},
		FIRE : {
			objectID : 2469,
			destination : new Tile(3311, 3257, 0)
		},
		BODY : {
			objectID : 2470,
			destination : new Tile(3055, 3443, 0)
		},
		COSMIC : {
			objectID : 2471,
			destination : new Tile(2406, 4379, 0)
		},
		CHAOS : {
			objectID : 2474,
			destination : new Tile(3059, 3588, 0)
		},
		NATURE : {
			objectID : 2473,
			destination : new Tile(2867, 3017, 0)
		},
		LAW : {
			objectID : 2472,
			destination : new Tile(2856, 3379, 0)
		},
		DEATH : {
			objectID : 2475,
			destination : new Tile(1863, 4637, 0)
		},
		BLOOD : {
			objectID : 2477,
			destination : new Tile(3560, 9779, 0)
		}
};

var RunesListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		var ids = [];
		var ordinal = 0;
		for (runes in MysteriousRunes) {
			ids[ordinal++] = MysteriousRunes[runes].objectID;
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		var runes = forRunes(object.getID());
		if (runes !== null && option === 1) {
			if (canEnter(player, runes)) {
				player.getMovement().teleportTo(runes.destination);
				return true;
			}
		}
		player.getDispatcher().sendGameMessage("Unhandled runecrafting action: object="+object+", option="+api.getLocType(object).op[option-1]+" ("+option+")");
		return true;
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (location, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

var PortalListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		var ids = [];
		var ordinal = 0;
		for (runes in ExitPortal) {
			ids[ordinal++] = ExitPortal[runes].objectID;
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		var portal = forPortal(object.getID());
		if (portal !== null && option === 1) {
			player.getMovement().teleportTo(portal.destination);
			return true;
		}
		player.getDispatcher().sendGameMessage("Unhandled portal action: object="+object+", option="+api.getLocType(object).op[option-1]+" ("+option+")");
		return true;
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (location, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

var AlterListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		var ids = [];
		var ordinal = 0;
		for (alter in Alter) {
			ids[ordinal++] = Alter[alter].objectID;
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		var alter = forAlter(object.getID());
		if (alter !== null && option === 1) {
			craftRunes(player, alter);
			return true;
		}
		player.getDispatcher().sendGameMessage("Unhandled runecrafting alter action: object="+object+", option="+api.getLocType(object).op[option-1]+" ("+option+")");
		return true;
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (location, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptLoader) {
	var runesListener = new RunesListener();
	var portalListener = new PortalListener();
	var alterListener = new AlterListener();
	
	scriptLoader.registerLocationListener(runesListener, runesListener.getIDs());
	scriptLoader.registerLocationListener(portalListener, portalListener.getIDs());
	scriptLoader.registerLocationListener(alterListener, alterListener.getIDs());
};

function craftRunes (player, alter) {
	var rcLevel = player.getSkills().getCurrentLevel(SkillType.RUNECRAFTING);
	if (rcLevel < alter.level) {
		player.getDispatcher().sendGameMessage("You need a runecrafting level of "+alter.level+" to craft this rune.");
		return;
	}
	var essCount = player.getInvs().getContainer(ContainerState.BACKPACK).getNumberOf(7936);//Pure essence
	var pureEss = true;
	if (essCount < 1) {
		if (!alter.pureOnly) {
			pureEss = false;
			essCount = player.getInvs().getContainer(ContainerState.BACKPACK).getNumberOf(1436);//Normal essence
		}
		if (essCount < 1) {
			player.getDispatcher().sendGameMessage("You don't have any "+(alter.pureOnly ? "pure" : "rune")+" essence.");
			return;
		}
	}
	var totalXp = essCount * alter.xp;
	player.lock(7);
	player.getInvs().getContainer(ContainerState.BACKPACK).removeAll(pureEss ? 7936 : 1436);
	var runes = Item.create(alter.runeID, essCount * getHighestMultiple(alter, rcLevel));
	player.queueUpdateBlock(new AnimationBlock(23250));
	player.queueUpdateBlock(new GraphicsBlock(1, alter.gfxID, 0, 5, 0));
	player.getSkills().addExperience(SkillType.RUNECRAFTING, totalXp);
	player.getInvs().getContainer(ContainerState.BACKPACK).add(runes);
	player.getInvs().sendContainer(ContainerState.BACKPACK);
	player.getDispatcher().sendGameMessage("You bind the temple's power into "+runes.getType().name.toLowerCase()+"s.");
}

function forRunes (objectID) {
	for (var ordinal in MysteriousRunes) {
		if (MysteriousRunes[ordinal].objectID === objectID) {
			return MysteriousRunes[ordinal];
		}
	}
	return null;
}

function forAlter (objectID) {
	for (var ordinal in Alter) {
		if (Alter[ordinal].objectID === objectID) {
			return Alter[ordinal];
		}
	}
	return null;
}

function forPortal (objectID) {
	for (var ordinal in ExitPortal) {
		if (ExitPortal[ordinal].objectID === objectID) {
			return ExitPortal[ordinal];
		}
	}
	return null;
}


function getHighestMultiple (alter, level) {
	var multiple = 1;
	for (var ordinal in alter.multiplesAt) {
		if (alter.multiplesAt[ordinal] <= level) {
			multiple++;
		}
	}
	return multiple;
}

function canEnter (player, runes) {
	return true;//TODO: Check for talisman/tiara
}