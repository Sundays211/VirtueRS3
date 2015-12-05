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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
var api;

var MINING_SKILL = 14;
var BACKPACK = 93;

var Mine = {
	CLAY : {
		mineIDs : [2108, 2109, 5766, 5767, 9711, 9713, 10577, 10578, 10579, 10949, 11189, 
		           11190, 11191, 14904, 14905, 15503, 15504, 15505, 32429, 32430, 32431, 
		           72075, 72076, 72077, 72078, 72079, 72080, 75619, 75620],
		level : 1,
		xp : 45*5,
		oreID : 434,
		baseTime : 10,
		randomTime : 1,
		respawnDelay : 5,
		randomLife : 0
	},
	COPPER : {
		mineIDs : [2090, 2091, 3027, 3229, 5779, 5780, 5781, 9708, 9709, 9710, 11936, 11937, 
		           11938, 11960, 11961, 11962, 14906, 14907, 18991, 18992, 18993, 21284, 21285, 
		           21286, 29230, 29231, 72098, 72099, 72100, 75632, 75633, 75634, 88640, 88876, 88878],
		level : 1,
		xp : 45*17.5,
		oreID : 436,
		baseTime : 10,
		randomTime : 1,
		respawnDelay : 5,
		randomLife : 0
	},
	TIN : {
		mineIDs : [2094, 2095, 3038, 3245, 5776, 5777, 5778, 9714, 9716, 11933, 11934, 11935, 11957, 
		           11958, 11959, 14902, 14903, 18994, 18995, 18996, 19024, 19025, 19026, 21293, 21294, 
		           21295, 29227, 29229, 72092, 72093, 72094, 75629, 75630, 75631, 88642, 88877, 88879],
		level : 1,
		xp : 45*17.5,
		oreID : 438,
		baseTime : 10,
		randomTime : 1,
		respawnDelay : 5,
		randomLife : 0
	},
	IRON : {
		mineIDs : [2092, 2093, 5773, 5774, 5775, 6943, 6944, 9717, 9718, 9719, 11954, 11955, 11956, 14856, 14857, 
		           14858, 14913, 14914, 19000, 19001, 19002, 21281, 21282, 21283, 29221, 29222, 29223, 32441, 32442, 
		           32443, 32451, 32452, 37307, 37308, 37309, 72081, 72082, 72083, 75616, 75617, 75626, 75627, 75628, 88641],
		level : 15,
		xp : 45*35,
		oreID : 440,
		baseTime : 15,
		randomTime : 1,
		respawnDelay : 10,
		randomLife : 0
	},
	SILVER : {
		mineIDs : [2100, 2101, 6945, 6946, 11186, 11187, 11188, 11948, 11949, 11950, 15579, 15580, 15581, 
		           16998, 16999, 17000, 29224, 29225, 29226, 32444, 32445, 32446, 37304, 37305, 37306, 37670],
		level : 20,
		xp : 45*40,
		oreID : 442,
		baseTime : 25,
		randomTime : 1,
		respawnDelay : 20,
		randomLife : 0
	},
	COAL : {
		mineIDs : [2096, 2097, 3032, 3233, 5770, 5771, 5772, 10948, 11930, 11931, 11932, 11963, 11964, 14850, 
		           14851, 14852, 15246, 15247, 15248, 18997, 18998, 18999, 21287, 21288, 21289, 29215, 29216, 
		           29217, 31167, 31168, 31169, 32426, 32427, 32428, 32449, 32450, 75623, 75624, 75625, 93018, 93019],
		level : 30,
		xp : 45*50,
		oreID : 453,
		baseTime : 50,
		randomTime : 10,
		respawnDelay : 30,
		randomLife : 0
	},
	GOLD : {
		mineIDs : [2098, 2099, 2609, 2610, 2611, 5768, 5769, 9720, 9722, 10574, 10575, 10576, 11183, 11184,
		           11185, 11951, 11952, 11953, 15576, 15577, 15578, 17001, 17002, 17003, 32432, 32433, 32434,
		           37310, 37312, 45067, 45068, 59426, 59427, 72087, 72088, 75621, 75622],
		level : 40,
		xp : 45*60,
		oreID : 444,
		baseTime : 80,
		randomTime : 20,
		respawnDelay : 40,
		randomLife : 0
	},
	MITHRIL : {
		mineIDs : [2102, 2103, 3041, 3280, 5784, 5785, 5786, 11942, 11943, 11944, 11946, 11947, 14853,
		           14854, 14855, 19012, 19013, 19014, 21278, 21279, 21280, 25368, 25369, 25370, 29236, 
		           31170, 32438, 32439, 32440, 75637, 75638, 75639, 78908, 78909, 78910, 93016, 93017],
		level : 55,
		xp : 45*80,
		oreID : 447,
		baseTime : 100,
		randomTime : 20,
		respawnDelay : 60,
		randomLife : 0
	},
	ADAMANTITE : {
		mineIDs : [2104, 2105, 3040, 3273, 5782, 5783, 11939, 11941, 14862, 14863, 14864, 19018, 19019, 19020, 21275, 
		           21276, 21277, 29233, 29235, 31173, 31174, 32435, 32436, 32437, 75635, 75636, 93020, 93021],
		level : 70,
		xp : 45*95,
		oreID : 449,
		baseTime : 130,
		randomTime : 25,
		respawnDelay : 180,
		randomLife : 0
	},
	RUNITE : {
		mineIDs : [14859, 14860, 33078, 33079, 37208, 45069, 45070, 75615, 75618, 93022, 93023],
		level : 85,
		xp : 45*125,
		oreID : 451,
		baseTime : 150,
		randomTime : 30,
		respawnDelay : 360,
		randomLife : 0
	},
	SEREN : {
		mineIDs : [92713],
		level : 89,
		xp : 45*296,
		oreID : 32262,
		baseTime : 150,
		randomTime : 30,
		respawnDelay : 10,
		randomLife : 0
	}
};

var Pickaxe = {
	BRONZE : {
		itemID : 1265,
		level : 1,
		time : 1,
		anim : 625
	},
	IRON : {
		itemID : 1267,
		level : 1,
		time : 2,
		anim : 626
	},
	STEEL : {
		itemID : 1269,
		level : 6,
		time : 3,
		anim : 627
	},
	MITHRIL : {
		itemID : 1273,
		level : 21,
		time : 5,
		anim : 629
	},
	ADAMANT : {
		itemID : 1271,
		level : 31,
		time : 7,
		anim : 628
	},
	RUNE : {
		itemID : 1275,
		level : 41,
		time : 10,
		anim : 624
	},
	DRAGON : {
		itemID : 15259,
		level : 61,
		time : 13,
		anim : 12190
	},
	CRYSTAL : {
		itemID : 32646,
		level : 71,
		time : 16,
		anim : 12190
	}
};


var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		var ids = [];
		for (ordial in Mine) {
			ids = ids.concat(Mine[ordial].mineIDs);
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		switch (option) {
			case 1:
				runMiningAction(player, object);
				break;
			default:
				player.getDispatcher().sendGameMessage("Unhandled mining action: objectid="+object.getID()+", option="+option);
				break;
		}
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
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
};

function runMiningAction (player, object) {
	var pickaxe = forPickaxe(player);//Find the highest pickaxe the player holds and can use
	if (pickaxe === null) {
		api.sendMessage(player, "You need a pickaxe to mine this rock.");
		return;
	}
	var rock = forMine(object.getID());	//Find the rock type
	if (api.getCurrentLevel(player, MINING_SKILL) < rock.level) {
		api.sendMessage(player, "You require a mining level of "+rock.level+"  to mine this rock.");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	var delay = getMiningDelay(player, rock, pickaxe);//Calculates the time taken to mine this rock
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			api.runAnimation(player, pickaxe.anim);
			if (delay <= 0) {
				miningSuccess(player, rock, object);
				return true;
			}
			delay--;
			return false;
		},
		stop : function (player) {//Clear the current animation and graphics block
			api.clearAnimation(player);
		}

	});
	player.setAction(new Action());	
}

function miningSuccess (player, rock, object) {
	api.addExperience(player, "mining", rock.xp, true);
	api.transformLoc(object, getEmptyID(object), rock.respawnDelay);
	api.addCarriedItem(player, rock.oreID, 1);
	api.sendMessage(player, "You mine some " + api.getItemType(rock.oreID).name + ".", 109);
}

function getMiningDelay (player, mine, pickaxe) {
	timer = mine.baseTime - api.getCurrentLevel(player, MINING_SKILL) - Math.floor(Math.random() * pickaxe.time);
	print(timer+"\n");
	if (timer < 1 + mine.randomTime) {
		timer = 1 + Math.floor((Math.random() * mine.randomTime));
		print(timer+"\n");
	}
	return timer;
}

function forMine(objectID) {
	for (ordial in Mine) {
		if (Mine[ordial].mineIDs.indexOf(objectID) !== -1) {
			return Mine[ordial];
		}
	}
	return null;
}

function getEmptyID (loc) {
	if (api.getLocType(loc).hasMesh(65251)) {
		return 5765;
	} else if (api.getLocType(loc).hasMesh(65253)) {
		return 5764;
	} else if (api.getLocType(loc).hasMesh(65252)) {
		return 5763;
	} else if (api.getLocType(loc).hasMesh(99106)) {
		return 93014;
	} else if (api.getLocType(loc).hasMesh(99109)) {
		return 93015;
	} else {
		print("Warning: No empty rock mesh for object "+loc.getID()+"\n");
		return 5763;
	}
	/*var objectID = object.getID();
	if ([2093, 5775, 9719, 11956, 14858, 19002, 21283, 29223, 32443, 37309, 72083, 75628, 
	     	2095, 3038, 5778, 9716, 11935, 11959, 18996, 19026, 21295, 29229, 72094, 75631].indexOf(objectID) !== -1) {
		return 5765;//65251 => [3042, 6671, 18954, 37644, 37647]
		//[451, 452, 3227, 5765, 8830, 9725, 10582, 10586, 11554, 11557, 14834, 15251, 15584, 17009, 17028, 17390, 19005, 19011, 19017, 19023, 
		//19029, 21298, 25373, 29220, 31061, 33402, 37650, 37702, 61186, 73686, 78913]
	} else if ([5774, 6944, 9718, 11955, 14857, 14914, 19001, 21282, 29222, 32442, 32452, 37308, 
	        72082, 75617, 75627, 5777, 11934, 11958, 14903, 18995, 19025, 21294, 72093, 75630].indexOf(objectID) !== -1) {
		return 5764;//65253 => [6670, 18953, 37643, 37646]
		//[453, 5764, 6948, 8829, 9724, 10581, 10587, 10945, 11553, 11556, 14833, 14893, 14895, 14897, 14899, 14916, 15250, 15583, 17008, 17027, 
		//17389, 19004, 19010, 19016, 19022, 19028, 21297, 25372, 29219, 31060, 32448, 33401, 34279, 37649, 37701, 61185, 78912]
	} else {
		return 5763;//65252 => [2704, 3043, 6669, 18952, 37637, 37638, 37642, 37645]
		//[450, 3281, 3431, 4616, 5763, 6947, 8828, 9723, 10580, 10585, 10944, 11552, 11555, 14832, 14892, 14894, 14896, 14898, 14915, 15249, 15582, 
		//17007, 17026, 17388, 18961, 19003, 19009, 19015, 19021, 19027, 21296, 25371, 29218, 31059, 32447, 33400, 37639, 37648, 37669, 37700, 42366, 61184, 78911, 90310]
	}*/
}

function forPickaxe(player) {
	var pickaxe;
	for (ordial in Pickaxe) {
		pickaxe = Pickaxe[ordial];//TODO: Run this backwards (from best to worst)
		if (api.itemTotal(player, BACKPACK, pickaxe.itemID) >= 1) {
			return pickaxe;
		}
	}
	return Pickaxe.BRONZE;
} 