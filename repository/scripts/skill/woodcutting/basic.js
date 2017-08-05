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
var coords = require('map/coords');
var _config = require('engine/config');

var util = require('util');
var chat = require('chat');
var inv = require('inv');
var map = require('map');
var locMap = require('map/location');
var stat = require('stat');

var woodcutting = require('./common');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	var TreeType = {
		NORMAL : {
			level : 1,
			xp : 25,
			logId : 1511,
			respawnDelay : 8
		},
		ACHEY : {
			level : 1,
			xp : 25,
			logId : 2862,
			respawnDelay : 8
		},
		EUCALYPTUS : {
			level : 1,
			xp : 25,
			logId : 12581,
			respawnDelay : 8
		},
		OAK : {
			level : 15,
			xp : 35.7,
			logId : 1521,
			respawnDelay : 15
		},
		WILLOW : {
			level : 30,
			xp : 67.5,
			logId : 1519,
			respawnDelay : 51
		},
		MAPLE : {
			level : 45,
			xp : 100,
			logId : 1517,
			respawnDelay : 72
		},
		YEW : {
			level : 60,
			xp : 175,
			logId : 1515,
			respawnDelay : 94
		},
		/*IVY : {//TODO: Ivy needs to go in it's own script as it has custom logic
	        level : 68,
	        xp : 332.5,
	        logId : -1
	        respawnDelay : 58
	    },*/
		MAGIC : {
			level : 75,
			xp : 250,
			logId : 1513,
			baseTime : 150
		},
		/*CURSED_MAGIC : {//TODO: These all need to go in their own scripts as they have custom logic
	        level : 82,
	        xp : 250,
	        logId : 1513,
	        baseTime : 150,
	        randomTime : 21,
	        stumpID : 37822,
	        respawnDelay : 121,
	        randomLife : 10
	    },
		ELDER_TREE : {
			level : 90,
			xp : 500,
			logId : 29556,
			baseTime : 175,
			randomTime : 21,
			stumpID : -1,
			respawnDelay : 130,
			randomLife : 15
		},
		CRYSTAL_TREE : {
			level : 94,
			xp : 25000,
			logId : -1,
			baseTime : 180,
			randomTime : 21,
			stumpID : -1,
			respawnDelay : 130,
			randomLife : 15
		}*/
	};

	return {
		init : init,
		values : TreeType
	};

	function init (scriptManager) {
		//Regular trees
		scriptManager.bind(EventType.OPLOC1, 38760, function (ctx) {
				chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40350);
		});

		scriptManager.bind(EventType.OPLOC1, 38782, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40351);
		});

		scriptManager.bind(EventType.OPLOC1, 38783, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40352);
		});

		scriptManager.bind(EventType.OPLOC1, 38784, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40353);
		});

		scriptManager.bind(EventType.OPLOC1, 38785, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40354);
		});

		scriptManager.bind(EventType.OPLOC1, 38786, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40355);
		});

		scriptManager.bind(EventType.OPLOC1, 38787, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40356);
		});

		scriptManager.bind(EventType.OPLOC1, 38788, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40357);
		});

		scriptManager.bind(EventType.OPLOC1, 38789, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 40358);
		});

		//Swamp trees
		scriptManager.bind(EventType.OPLOC1, 9387, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 10951);
		});

		scriptManager.bind(EventType.OPLOC1, 9354, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 11059);
		});

		scriptManager.bind(EventType.OPLOC1, 9366, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 11864);
		});

		scriptManager.bind(EventType.OPLOC1, 9355, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 11862);
		});

		scriptManager.bind(EventType.OPLOC1, 3300, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 11865);
		});

		//Dead trees
		scriptManager.bind(EventType.OPLOC1, 47594, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 47595);
		});

		scriptManager.bind(EventType.OPLOC1, 47596, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 47597);
		});

		scriptManager.bind(EventType.OPLOC1, 47598, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 47599);
		});

		scriptManager.bind(EventType.OPLOC1, 47600, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 47601);
		});

		scriptManager.bind(EventType.OPLOC1, 68901, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 68904);
		});

		scriptManager.bind(EventType.OPLOC1, 68902, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 68905);
		});

		scriptManager.bind(EventType.OPLOC1, 68903, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 68906);
		});

		scriptManager.bind(EventType.OPLOC1, 69144, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 69146);
		});

		scriptManager.bind(EventType.OPLOC1, 11866, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 9389);
		});

		scriptManager.bind(EventType.OPLOC1, 1282, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 1347);
		});

		scriptManager.bind(EventType.OPLOC1, 1383, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 1358);
		});

		scriptManager.bind(EventType.OPLOC1, 1286, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 1351);
		});

		scriptManager.bind(EventType.OPLOC1, 1289, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 1353);
		});

		//Dying tree
		scriptManager.bind(EventType.OPLOC1, 24168, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 24169);
		});

		//Jungle tree
		scriptManager.bind(EventType.OPLOC1, 4818, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 4819);
		});

		scriptManager.bind(EventType.OPLOC1, 4820, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.NORMAL, 4821);
		});

		//Alchey tree
		scriptManager.bind(EventType.OPLOC1, 69554, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.ACHEY, 69555);
		});

		//Eucalyptus
		scriptManager.bind(EventType.OPLOC1, 70068, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.EUCALYPTUS, 70070);
		});

		scriptManager.bind(EventType.OPLOC1, 70071, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.EUCALYPTUS, 70073);
		});

		//Oak
		scriptManager.bind(EventType.OPLOC1, 38731, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.OAK, 38741);
		});

		scriptManager.bind(EventType.OPLOC1, 38732, function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.OAK, 38754);
		});

		//Willow
		scriptManager.bind(EventType.OPLOC1, [ 38616, 38627, 58006 ] , function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.WILLOW, 38725);
		});

		//Maple
		scriptManager.bind(EventType.OPLOC1, 51843 , function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.MAPLE, 54766);
		});

		//Yew
		scriptManager.bind(EventType.OPLOC1, 38755 , function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.YEW, 38759);
		});

		//Magic
		scriptManager.bind(EventType.OPLOC1, 63176 , function (ctx) {
			chopTree(ctx.player, ctx.location, TreeType.MAGIC, 63179);
		});
	}

	function chopTree(player, location, treeType, stumpId) {
		if (!inv.hasSpace(player)) {
			chat.sendMessage(player, "Your inventory is too full to hold any more logs.");
			return;
		}
		var shape = locMap.getShape(location);
		var treeCoords = map.getCoords(location);
		var onSuccess = function () {
			if (locMap.get(treeCoords, shape) != location) {
				return;//This means the tree has already been felled
			}
			stat.giveXp(player, Stat.WOODCUTTING, treeType.xp);
			inv.give(player, treeType.logId, 1);
			chat.sendSpamMessage(player, "You get some some " + _config.objName(treeType.logId) + ".");

			if (treeType == TreeType.NORMAL || Math.random() < 0.2) {
				//If the tree is not a normal tree, there is a 1 in 5 chance of felling it
				fellTree(player, location, stumpId, treeType.respawnDelay);
			} else {
				woodcutting.runWoodcuttingAction(player, treeType.level, onSuccess);
			}
		};

		chat.sendSpamMessage(player, "You swing your hatchet at the tree.");
		woodcutting.runWoodcuttingAction(player, treeType.level, onSuccess);
	}

	function fellTree (player, location, stumpId, respawnDelay) {
		var treeCoords = map.getCoords(location);
		var treeId = util.getId(location);
		var rotation = locMap.getRotation(location);
		var shape = locMap.getShape(location);
		
		var treeTop = locMap.get(coords(treeCoords, -1, -1, 1), shape);
		if (!treeTop) {
			treeTop = locMap.get(coords(treeCoords, 0, 0, 1), shape);
		}
		if (treeTop) {
			locMap.del(treeTop);
		}

		var treeStump = locMap.add(stumpId, treeCoords, shape, rotation);
		
		locMap.delay(treeStump, respawnDelay, function () {
			locMap.add(treeId, treeCoords, shape, rotation);
			if (treeTop) {
				locMap.add(util.getId(treeTop), map.getCoords(treeTop), shape, locMap.getRotation(treeTop));
			}
		});
	}
})();
