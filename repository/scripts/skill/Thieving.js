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
 * @author Kayla
 * @since 01/16/2015
 */
var BACKPACK = 93;

var Thieving = {
	MAN : {
		level : 1,
		npcID : 1,
		xp : 8,
		itemID : 995,
		itemAmount : 20,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	WOMEN : {
		level : 1,
		npcID : 4,
		xp : 8,
		itemID : 995,
		itemAmount : 20,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	FARMER : {
		level : 10,
		npcID : 1757,
		xp : 14.5,
		itemID : 995,
		itemAmount : 9,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	HAM_MEMBER_FEMALE : {
		level : 15,
		npcID : 1715,
		xp : 18.5,
		itemID : 995,
		itemAmount : 250,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	HAM_MEMBER_MALE : {
		level : 20,
		npcID : 1714,
		xp : 22.5,
		itemID : 995,
		itemAmount : 100,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	WARRIOR : {
		level : 25,
		npcID : 15,
		xp : 18.5,
		itemID : 995,
		itemAmount : 250,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	ROGUE : {
		level : 32,
		npcID : 187,
		xp : 35.5,
		itemID : 995,
		itemAmount : 400,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	CAVE_GOBLIN : {
		level : 36,
		npcID : 5752,
		xp : 40,
		itemID : 995,
		itemAmount : 250,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	MASTER_FARMER : {
		level : 38,
		npcID : 2234,
		xp : 40,
		itemID : 995,
		itemAmount : 250,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	},
	GUARD : {
		level : 40,
		npcID : 9,
		xp : 46.5,
		itemID : 995,
		itemAmount : 250,
		baseTime : 3,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	}

};

var Stall = {
	SILK : {
		level : 1,
		stallID : 34383,
		xp : 8,
		itemID : 995,
		itemAmount : 20,
		baseTime : 4,
		randomTime : 0.2,
		respawnDelay : 8,
		randomLife : 0
	}
};

var PickpocketListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function(event, npcTypeId, args) {
		Thieving.startPickpocket(args.player, args.npc);
	}
});

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function(event, locTypeId, args) {
		Thieving.startStall(args.player, args.location);
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var stalls = [ 34383 ];
	var stallListener = new LocationListener();
	for ( var i in stalls) {
		scriptManager.registerListener(EventType.OPLOC2, stalls[i], stallListener);
	}

	var npcs = [ 1, 9, 2234, 5732, 187, 15, 1714, 1715, 1757, 4, 5919, 5920 ];
	var listener = new PickpocketListener();
	for ( var i in npcs) {
		scriptManager.registerListener(EventType.OPNPC3, npcs[i], listener);
	}
};

var Thieving = {
		startStall : function (player, loc) {
			var stall = this.forStall(api.getLocType(loc).name);
			if (api.isPaused(player)) {
				return false;
			}
			if (api.getStatLevel(player, Stat.THIEVING) < stall.level) {
				api.sendMessage(player, "You need a thieving level of " + stall.level + " to steal from this " + api.getLocType(stall.stallID).name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			api.runAnimation(player, 881);
			var delay = this.getStallDelay(player, stall);
			api.freezeEntity(player, delay + 1);
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				process : function(player) {
					api.runAnimation(player, 881);
					if (delay <= 0) {
						Thieving.forStallItem(player, stall, loc);
						return true;
					}
					delay--;
					return false;
				},
				stop : function(player) {
					api.stopAnimation(player);
				}

			});
			player.setAction(new Action());
		},
		
		forStallItem : function (player, stall, object) {
			api.addExperience(player, Stat.THIEVING, stall.xp, true);
			api.addCarriedItem(player, stall.itemID, stall.itemAmount);
			api.sendFilterMessage(player, "You successfully stole from the " + api.getLocType(object).name + ".");
		},
		
		getStallDelay : function (player, stall) {
			return stall.baseTime;
		},
		
		forStall : function (name) {
			switch (name) {
			case "Silk stall":
				return Stall.SILK;
			}
		},
		
		startPickpocket : function (player, npc) {
			print(api.getNpcType(npc.getID()).name + "\n");
			var thieving = this.forNPC(npc.getID());
			if (api.isPaused(player)) {
				return false;
			}
			if (npc == null) {
				return;
			}
			api.faceEntity(player, npc);
			if (api.getStatLevel(player, Stat.THIEVING) < thieving.level) {
				api.sendMessage(player, "You need a thieving level of "
						+ thieving.level + " to steal from this "
						+ api.getNpcType(thieving.npcID).name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			if (Math.random() <= thieving.randomTime) {
				player.lock(5);
				api.faceEntity(npc, player);
				api.runAnimation(player, 834);
				api.setSpotAnim(player, 1, 80);
				api.freezeEntity(player, 5);//TODO: What is the correct stun time?
			} else {
				api.runAnimation(player, 881);
				var delay = this.getThievingDelay(player, thieving);
				api.freezeEntity(player, delay + 1);
				var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
					process : function(player) {
						api.runAnimation(player, 881);
						if (delay <= 0) {
							Thieving.forThievingItem(player, thieving, npc);
							return true;
						}
						delay--;
						return false;
					},
					stop : function(player) {
						api.stopAnimation(player);
					}

				});
				player.setAction(new Action());
			}
		},
		
		forThievingItem : function (player, thieving, npc) {
			api.addExperience(player, Stat.THIEVING, thieving.xp, true);
			api.addCarriedItem(player, thieving.itemID, thieving.itemAmount);
			api.sendFilterMessage(player, "You successfully stole from the "
					+ api.getNpcType(thieving.npcID).name + ".");
		},
		
		getThievingDelay : function (player, thieving) {
			return thieving.baseTime;
		},
		
		forNPC : function (id) {
			switch (id) {
			case 1:
				return Thieving.MAN;
			case 4:
				return Thieving.WOMEN;
			case 1757:
				return Thieving.FARMER;
			case 1715:
				return Thieving.HAM_MEMBER_FEMALE;
			case 1714:
				return Thieving.HAM_MEMBER_MALE;
			case 15:
				return Thieving.WARRIOR;
			case 187:
				return Thieving.ROGUE;
			case 5752:
				return Thieving.CAVE_GOBLIN;
			case 2234:
				return Thieving.MASTER_FARMER;
			case 5919:
			case 5920:
			case 9:
				return Thieving.GUARD;
			}
		}
}