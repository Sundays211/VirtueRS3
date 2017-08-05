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
	        baseTime : 60,
	        randomTime : 4,
	        stumpID : 1341,
	        respawnDelay : 51,
	        randomLife : 15
	    },
	    MAPLE : {
	        level : 45,
	        xp : 100,
	        logId : 1517,
	        baseTime : 83,
	        randomTime : 16,
	        stumpID : 51843,
	        respawnDelay : 72,
	        randomLife : 10
	    },
	    YEW : {
	        level : 60,
	        xp : 175,
	        logId : 1515,
	        baseTime : 120,
	        randomTime : 17,
	        stumpID : 1341,
	        respawnDelay : 94,
	        randomLife : 10
	    },
	    IVY : {
	        level : 68,
	        xp : 332.5,
	        logId : -1,
	        baseTime : 120,
	        randomTime : 17,
	        stumpID : 46319,
	        respawnDelay : 58,
	        randomLife : 10
	    },
	    MAGIC : {
	        level : 75,
	        xp : 250,
	        logId : 1513,
	        baseTime : 150,
	        randomTime : 21,
	        stumpID : 37824,
	        respawnDelay : 121,
	        randomLife : 10
	    },
	    CURSED_MAGIC : {
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
		}
	};

	return {
		init : init,
		values : TreeType
	};

	function init (scriptManager) {
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
		
		/*this.registerTree(TreeType.NORMAL, 1276, 1342);
		this.registerTree(TreeType.NORMAL, 93384, 40352);
		this.registerTree(TreeType.NORMAL, 79813, 79814);			
		
		this.registerTree(TreeType.SWAMP, 9387, 10951);
		this.registerTree(TreeType.SWAMP, 9354, 11059);
		this.registerTree(TreeType.SWAMP, 9366, 11864);
		this.registerTree(TreeType.SWAMP, 9355, 11862);
		this.registerTree(TreeType.SWAMP, 3300, 11865);
		
		this.registerTree(TreeType.DEAD, 68903, 68906 );
		this.registerTree(TreeType.DEAD, 68901, 68904);
		this.registerTree(TreeType.DEAD, 68902, 68905 );
		this.registerTree(TreeType.DEAD, 11866, 9389);
		this.registerTree(TreeType.DEAD, 1286, 1351);
		this.registerTree(TreeType.DEAD, 1283, 1347);
		this.registerTree(TreeType.DEAD, 1282, 1347);
		this.registerTree(TreeType.DEAD, 1383, 1358);
		this.registerTree(TreeType.DEAD, 47600, 47601);
		this.registerTree(TreeType.DEAD, 47594, 47595);
		this.registerTree(TreeType.DEAD, 47598, 47599);
		this.registerTree(TreeType.DEAD, 47596, 47597);
		this.registerTree(TreeType.DEAD, 1289, 1353);
		this.registerTree(TreeType.DEAD, 69144, 69146);
		this.registerTree(TreeType.DEAD, 24168, 24169);//dying tree
		
		this.registerTree(TreeType.DEAD, 4820, 4821);//Jungle tree
		this.registerTree(TreeType.DEAD, 4818, 4819);//Jungle tree
		
		this.registerTree(TreeType.ACHEY, 69554, 69555);//achey tree
		
		this.registerTree(TreeType.EUCALYPTUS, 70071, 70073);//EUCALYPTUS tree needs fix
		this.registerTree(TreeType.EUCALYPTUS, 70068, 70070);//EUCALYPTUS tree needs fix
		
		this.registerTree(TreeType.OAK, 38732, 38754);
		this.registerTree(TreeType.OAK, 38731, 38741);
		
		this.registerTree(TreeType.WILLOW, 38616, 38725);
        this.registerTree(TreeType.WILLOW, 38627, 38725);
		this.registerTree(TreeType.WILLOW, 58006, 38725);
		
		this.registerTree(TreeType.MAPLE, 51843, 54766);
		
		this.registerTree(TreeType.YEW, 38755, 38759);
		
		this.registerTree(TreeType.MAGIC, 63176, 63179);*/
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
