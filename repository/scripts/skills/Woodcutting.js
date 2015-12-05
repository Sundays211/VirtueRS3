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
 * @author Kayla <skype:ashbysmith1996>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */

var Trees = {
    NORMAL : {
        level : 1,
        xp : 45*25,
        logID : 1511,
        baseTime : 20,
        randomTime : 4,
        stumpID : 1341,
        respawnDelay : 8,
        randomLife : 0
    },
    EVERGREEN : {
        level : 1,
        xp : 45*25,
        logID : 1511,
        baseTime : 20,
        randomTime : 4,
        stumpID : 57931,
        respawnDelay : 8,
        randomLife : 0
    },
    DEAD : {
        level : 1,
        xp : 45*25,
        logID : 1511,
        baseTime : 20,
        randomTime : 4,
        stumpID : 12733,
        respawnDelay : 8,
        randomLife : 0
    },
    SWAMP : {//TODO Find the correct ids for this tree
        level : 1,
        xp : 45*25,
        logID : 1511,
        baseTime : 20,
        randomTime : 4,
        stumpID : 12733,
        respawnDelay : 8,
        randomLife : 0
    },
    OAK : {
        level : 15,
        xp : 45*35.7,
        logID : 1521,
        baseTime : 30,
        randomTime : 4,
        stumpID : 78118,
        respawnDelay : 15,
        randomLife : 15
    },
    WILLOW : {
        level : 30,
        xp : 45*67.5,
        logID : 1519,
        baseTime : 60,
        randomTime : 4,
        stumpID : 1341,
        respawnDelay : 51,
        randomLife : 15
    },
    MAPLE : {
        level : 45,
        xp : 45*100,
        logID : 1517,
        baseTime : 83,
        randomTime : 16,
        stumpID : 51843,
        respawnDelay : 72,
        randomLife : 10
    },
    YEW : {
        level : 60,
        xp : 45*175,
        logID : 1515,
        baseTime : 120,
        randomTime : 17,
        stumpID : 1341,
        respawnDelay : 94,
        randomLife : 10
    },
    IVY : {
        level : 68,
        xp : 45*332.5,
        logID : -1,
        baseTime : 120,
        randomTime : 17,
        stumpID : 46319,
        respawnDelay : 58,
        randomLife : 10
    },
    MAGIC : {
        level : 75,
        xp : 45*250,
        logID : 1513,
        baseTime : 150,
        randomTime : 21,
        stumpID : 37824,
        respawnDelay : 121,
        randomLife : 10
    },
    CURSED_MAGIC : {
        level : 82,
        xp : 45*250,
        logID : 1513,
        baseTime : 150,
        randomTime : 21,
        stumpID : 37822,
        respawnDelay : 121,
        randomLife : 10
    },
	ELDER_TREE : {
		level : 90,
		xp : 45*500,
		logID : 29556,
		baseTime : 175,
		randomTime : 21,
		stumpID : -1,
		respawnDelay : 130,
		randomLife : 15
	},
	CRYSTAL_TREE : {
		level : 94,
		xp : 45*25000,
		logID : -1,
		baseTime : 180,
		randomTime : 21,
		stumpID : -1,
		respawnDelay : 130,
		randomLife : 15
	}
};

var Hatchet = {
	BRONZE : {
		level : 1,
		time : 1,
		anim : 879,
		itemID : 1351
	},
	IRON : {
		level : 1,
		time : 2,
		anim : 877,
		itemID : 1349
	},
	STEEL : {
		level : 6,
		time : 3,
		anim : 875,
		itemID : 1353
	},
	BLACK : {
		level : 11,
		time : 4,
		anim : 873,
		itemID : 1361
	},
	MITHRIL : {
		level : 21,
		time : 5,
		anim : 871,
		itemID : 1355
	},
	ADAMANT : {
		level : 31,
		time : 7,
		anim : 869,
		itemID : 1357
	},
	RUNE : {
		level : 41,
		time : 10,
		anim : 867,
		itemID : 1359
	},
	DRAGON : {
		level : 61,
		time : 13,
		anim : 21192,
		itemID : 6739
	},
	CRYSTAL : {
		level : 71,
		time : 7,
		anim : 21192,
		itemID : 32645
	}
};

var EventListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, args) {
		var player = args.player;
		Woodcutting.chopTree(player, args.location);
	}
});

/* Listen to the events specified */
var listen = function(scriptManager) {
	var listener = new EventListener();
	var locs = [38760, 38788, 38786, 61192, 47600, 38627, 61191, 38783, 38731, 46322, 46320, 46324, 38732, 38616, 9387, 9355, 87516, 87533];
	for (var i in locs) {
		//Bind option one on all trees to this listener
		scriptManager.registerListener(EventType.LOC_OP1, locs[i], listener);
	}
};

var Woodcutting = {
		chopTree : function (player, location) {
			var tree = this.forTree(api.getLocType(location).name);
			var hatchet = this.forHatchet(player);
			if (hatchet == null) {
				api.sendMessage(player, "You need a hatchet to chop this tree.");
				return;
			}
			if (api.getCurrentLevel(player, Stat.WOODCUTTING) < tree.level) {
				api.sendMessage(player, "You require a woodcutting level of "+tree.level+"  to cut this tree.");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			api.runAnimation(player, hatchet.anim);
			api.sendMessage(player, "You begin to swing your axe.", 109);
			var delay = this.getDelay(player, tree, hatchet);//Calculates the time taken to mine this rock
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
					process : function (player) {
					api.runAnimation(player, hatchet.anim);
					if(delay <= 0) {
						Woodcutting.success(player, tree, location);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) {
					api.clearAnimation(player);
				}
				
			});
			player.setAction(new Action());
		},
		success : function (player, tree, location) {
			api.addExperience(player, Stat.WOODCUTTING, tree.xp, true);
			api.addCarriedItem(player, tree.logID, 1);
			api.sendMessage(player, "You cut some " + api.getItemType(tree.logID).name + ".", 109);
			if (tree == Trees.NORMAL || Math.random() < 0.2) {//If the tree is not a normal tree, there is a 1 in 5 chance of felling it
				api.transformLoc(location, tree.stumpID, tree.respawnDelay);
				var treeTop = api.getLocationByNodeType(location.getTile().getX(), location.getTile().getY(), location.getTile().getPlane()+1, location.getNodeType());
				if (treeTop == null) {
					api.sendMessage(player, "Failed to remove tree top.");
				} else {
					api.transformLoc(treeTop, -1, tree.respawnDelay);
				}
			}
		},
		getDelay : function (player, tree, hatchet) {
			var timer = tree.baseTime - api.getCurrentLevel(player, Stat.WOODCUTTING) - Math.floor(Math.random() * hatchet.time);
			if (timer < 1 + tree.randomTime) {
				timer = 1 + Math.floor((Math.random() * tree.randomTime));
			}
			return timer;
		},
		forTree : function (name) {
			switch (name) {
			case "Tree":
				return Trees.NORMAL;
			case "Evergreen":
				return Trees.EVERGREEN;
			case "Dead tree":
				return Trees.DEAD;
			case "Swamp tree":
				return Trees.SWAMP;
			case "Oak":
				return Trees.OAK;
			case "Willow":
				return Trees.WILLOW;
			case "Maple":
				return Trees.MAPLE;
			case "Yew":
				return Trees.YEW;
			case "Ivy":
				return Trees.IVY;
			case "Magic":
				return Trees.MAGIC;
			case "Cursed Magic":
				return Trees.CURSED_MAGIC;
			case "Elder Tree":
				return Trees.ELDER_TREE;
			case "Crystal Tree":
				return Trees.CRYSTAL_TREE;
			}
		},
		forHatchet : function(player) {
			var hatchet;
			for (var ordial in Hatchet) {
				hatchet = Hatchet[ordial];//TODO: Run this backwards (from best to worst)
				if (api.itemTotal(player, Inv.BACKPACK, hatchet.itemID) >= 1) {
					return hatchet;
				}
			}
			return Hatchet.BRONZE;
			return Hatchet.IRON;
			return Hatchet.STEEL;
			return Hatchet.BLACK;
			return Hatchet.MITHRIL;
			return Hatchet.ADAMANT;
			return Hatchet.RUNE;
			return Hatchet.DRAGON;
			return Hatcjet.CRYSTAL;
		} 
}