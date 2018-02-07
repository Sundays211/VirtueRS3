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
/* globals EventType, Stat */
var _config = require('engine/config');
var _map = require('engine/map');

var util = require('util');
var chat = require('chat');
var inv = require('inv');
var map = require('map');
var loc = require('map/location');
var stat = require('stat');

var mining = require('./common');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	var RockType = {
		CLAY : {
			level : 1,
			xp : 5,
			oreId : 434,
			baseTime : 10,
			randomTime : 1,
			respawnDelay : 5,
			randomLife : 0
		},
		COPPER : {
			level : 1,
			xp : 17.5,
			oreId : 436,
			baseTime : 10,
			randomTime : 1,
			respawnDelay : 5,
			randomLife : 0
		},
		TIN : {
			level : 1,
			xp : 17.5,
			oreId : 438,
			baseTime : 10,
			randomTime : 1,
			respawnDelay : 5,
			randomLife : 0
		},
		BLURITE : {
			level : 10,
			xp : 18,
			oreId : 668,
			baseTime : 20,
			randomTime : 1,
			respawnDelay : 25,
			randomLife : 0
		},
		IRON : {
			level : 15,
			xp : 35,
			oreId : 440,
			baseTime : 15,
			randomTime : 1,
			respawnDelay : 10,
			randomLife : 0
		},
		SILVER : {
			level : 20,
			xp : 40,
			oreId : 442,
			baseTime : 25,
			randomTime : 1,
			respawnDelay : 20,
			randomLife : 0
		},
		COAL : {
			level : 30,
			xp : 50,
			oreId : 453,
			baseTime : 50,
			randomTime : 10,
			respawnDelay : 30,
			randomLife : 0
		},
		GOLD : {
			level : 40,
			xp : 60,
			oreId : 444,
			baseTime : 80,
			randomTime : 20,
			respawnDelay : 40,
			randomLife : 0
		},
		MITHRIL : {
			level : 55,
			xp : 80,
			oreId : 447,
			baseTime : 100,
			randomTime : 20,
			respawnDelay : 60,
			randomLife : 0
		},
		ADAMANTITE : {
			level : 70,
			xp : 95,
			oreId : 449,
			baseTime : 130,
			randomTime : 25,
			respawnDelay : 180,
			randomLife : 0
		},
		RUNITE : {
			level : 85,
			xp : 125,
			oreId : 451,
			baseTime : 150,
			randomTime : 30,
			respawnDelay : 360,
			randomLife : 0
		}/*,
		//TODO: Seren stones need to go in their own script as they have different logic
		SEREN : {
			mineIDs : [92713],
			level : 89,
			xp : 296,
			oreID : 32262,
			baseTime : 150,
			randomTime : 30,
			respawnDelay : 10,
			randomLife : 0
		}*/
	};
	
	return {
		init : init,
		values : RockType
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 2108, 2109, 5766, 5767, 9711, 9713, 10577, 10578, 
			10579, 10949, 11189, 11190, 11191, 14904, 14905, 15503, 15504, 15505, 32429, 32430, 32431, 
	        72075, 72076, 72077, 72078, 72079, 72080, 75619, 75620 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.CLAY);
		});
		
		scriptManager.bind(EventType.OPLOC1, [2090, 2091, 3027, 3229, 5779, 5780, 5781, 9708, 9709, 
			9710, 11936, 11937, 11938, 11960, 11961, 11962, 14906, 14907, 18991, 18992, 18993, 21284, 21285, 
	        21286, 29230, 29231, 72098, 72099, 72100, 75632, 75633, 75634, 88640, 88876, 88878], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.COPPER);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2094, 2095, 3038, 3245, 5776, 5777, 5778, 9714, 9716, 11933, 
			11934, 11935, 11957, 11958, 11959, 14902, 14903, 18994, 18995, 18996, 19024, 19025, 19026, 21293, 21294, 
	        21295, 29227, 29229, 72092, 72093, 72094, 75629, 75630, 75631, 88642, 88877, 88879 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.TIN);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2561, 33221], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.BLURITE);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2092, 2093, 5773, 5774, 5775, 6943, 6944, 9717, 9718, 9719, 
			11954, 11955, 11956, 14856, 14857, 14858, 14913, 14914, 19000, 19001, 19002, 21281, 21282, 
			21283, 29221, 29222, 29223, 32441, 32442, 32443, 32451, 32452, 37307, 37308, 37309, 72081, 72082, 
			72083, 75616, 75617, 75626, 75627, 75628, 88641 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.IRON);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2100, 2101, 6945, 6946, 11186, 11187, 11188, 11948, 11949,
			11950, 15579, 15580, 15581, 16998, 16999, 17000, 29224, 29225, 29226, 32444, 32445, 32446, 
			37304, 37305, 37306, 37670 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.SILVER);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2096, 2097, 3032, 3233, 5770, 5771, 5772, 10948, 11930, 11931, 
			11932, 11963, 11964, 14850, 14851, 14852, 15246, 15247, 15248, 18997, 18998, 18999, 21287, 
			21288, 21289, 29215, 29216, 29217, 31167, 31168, 31169, 32426, 32427, 32428, 32449, 32450, 
			75623, 75624, 75625, 93018, 93019 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.COAL);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2098, 2099, 2609, 2610, 2611, 5768, 5769, 9720, 9722, 
			10574, 10575, 10576, 11183, 11184, 11185, 11951, 11952, 11953, 15576, 15577, 15578, 
			17001, 17002, 17003, 32432, 32433, 32434, 37310, 37312, 45067, 45068, 59426, 59427, 
			72087, 72088, 75621, 75622 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.GOLD);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2102, 2103, 3041, 3280, 5784, 5785, 5786, 11942, 11943, 
			11944, 11946, 11947, 14853, 14854, 14855, 19012, 19013, 19014, 21278, 21279, 21280, 25368, 
			25369, 25370, 29236, 31170, 32438, 32439, 32440, 75637, 75638, 
			75639, 78908, 78909, 78910, 93016, 93017 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.MITHRIL);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2104, 2105, 3040, 3273, 5782, 5783, 11939, 11941, 
			14862, 14863, 14864, 19018, 19019, 19020, 21275, 21276, 21277, 29233, 29235, 31173, 31174,
			32435, 32436, 32437, 75635, 75636, 93020, 93021 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.ADAMANTITE);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 14859, 14860, 33078, 33079, 37208, 45069, 
			45070, 75615, 75618, 93022, 93023 ], function (ctx) {
				mineRock(ctx.player, ctx.location, RockType.RUNITE);
		});
	}

	function mineRock(player, location, rockType) {
		if (!inv.hasSpace(player)) {
			chat.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		mining.runMiningAction(player, rockType.level, function () {
			stat.giveXp(player, Stat.MINING, rockType.xp);
			setEmpty(player, location, rockType.respawnDelay);
			
			inv.give(player, rockType.oreId, 1);
			chat.sendSpamMessage(player, "You mine some " + _config.objName(rockType.oreId) + ".");
		});
	}

	function setEmpty (player, location, respawnDelay) {
		var rockCoords = map.getCoords(location);
		var fullId = util.getId(location);
		var emptyId = getEmptyId(player, fullId);
		var rotation = loc.getRotation(location);
		var shape = loc.getShape(location);

		loc.add(emptyId, rockCoords, shape, rotation);
		_map.delay(rockCoords, function () {
			loc.add(fullId, rockCoords, shape, rotation);
		}, respawnDelay);
	}

	//function getEmptyId (player, locTypeId) {
	//	if (_config.locHasModel(locTypeId, 65251)) {
	//		return 5765;
	//	} else if (_config.locHasModel(locTypeId, 65253)) {
	//		return 5764;
	//	} else if (_config.locHasModel(locTypeId, 65252)) {
	//		return 5763;
	//	} else if (_config.locHasModel(locTypeId, 99106)) {
	//		return 93014;
	//	} else if (_config.locHasModel(locTypeId, 99109)) {
	//		return 93015;
	//	} else {
	//		chat.sendDebugMessage(player, "Warning: No empty rock mesh for location "+locTypeId);
	//		return 5763;
	//   }
	//   }	
	
	
	function getEmptyId (player, locTypeId) {
		switch (locTypeId) {
			
		    case 3027:
			case 3032:
		    case 3038:
			case 3040:
			case 3041:
		        return 3227;
				
			case 3229:
			case 3233:
			case 3245:
			case 3273:
			case 3280:
		        return 3281;			
			
			case 5782:
			case 5773:	
			case 5770:
			case 5776:
			case 5779:
			    return 5763;				
				
			case 5771:
            case 5774:			
			case 5777:
			case 5780:
			    return 5764;	
			
			case 5772:
			case 5775:
			case 5781:
			case 5783:
			    return 5765;
			
			case 72075:
			    return 72078;
			
			case 72077:
			    return 72080;
			
			case 72081:
			    return 72084;
			
			case 72082:
			    return 72085;
			
			case 72083:
			    return 72086;
				
			case 72092:
			    return 72095;	
			
			case 72094:
			    return 72097;
			
			case 72098:
			    return 72101;
			
			case 72099:
			    return 72102;
			
			case 72100:
			    return 72103;
			
			case 10578:	
				return 11553;
				
			case 10577:	
            case 37307:
			case 37310:
		        return 11552;
			
			case 10579:	
            case 37309:
			case 37312:
		        return 11554;
				
			case 11948:
			case 11954:
            case 11957:
			case 11960:
			case 15503:
		        return 11555;
			
			case 11949:
			case 11955:
			case 11958:
			case 11961:
			case 15504:
		        return 11556;
			
            case 11950:		
			case 11956:
			case 11959:
			case 11962:
			case 15505:
		        return 11557;	
				
		    default:
		        return 3227;
		}
	}
	
	
})();
