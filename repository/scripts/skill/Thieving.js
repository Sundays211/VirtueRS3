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
 * @author rsJuuuuu
 */
var BACKPACK = 93;

var PickpocketNPCs = {
	MAN : {
		level : 1,
		xp : 8,
		items : [[995,3]],
		stunTime : 5, //in seconds
		stunDamage : 10, //in lp (990 max)
		multiples: [[11,1],[21,11],[31,21]] //double,triple,quadruple (thief,agility)
	},
	WOMEN : {
		level : 1,
        xp : 8,
        items : [995,3],
        stunTime : 5, //in seconds
        stunDamage : 10,
        multiples: [[11,1],[21,11],[31,21]] //double,triple,quadruple (thief,agility)
	},
	FARMER : {
		level : 10,
		xp : 14.5,
		items : [[995,9],[5318]],
		stunTime : 5,
		stunDamage : 10,
		multiples : [[20,10],[30,20],[40,30]]
	},
	//TODO add rest
	GUARD : {
		level : 40,
		xp : 46.5,
		items : [[995,30]],
		stunTime : 5,
		stunDamage : 20,
		multiples : [[50,40],[60,50],[70,60]]
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
	}
};

var PickpocketListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function(event, npcTypeId, args) {
	    if (api.isPaused(args.player) || api.isFrozen(args.player)) {
	        api.sendMessage(args.player, "You can't do that while stunned.");
	        return false;
        }
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
			var thieving = this.forNPC(npc.getID());
			if (npc == null) {
				return;
			}
			api.faceEntity(player, npc);
			if (api.getStatLevel(player, Stat.THIEVING) < thieving.level) {
				api.sendMessage(player, "You need a thieving level of "
						+ thieving.level + " to steal from this "
						+ npc.name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			if (Math.random() <= Thieving.getThievingChance(thieving)) {
			    api.sendMessage(player, "You fail to pick the " + npc.name.toLowerCase() + "'s pocket.")
				api.freezeEntity(player, thieving.stunTime/0.6);
				api.sendMessage(player, "You've been stunned.");
				api.setSpotAnim(player, 1, 80);
				api.runAnimation(player, 834);
				//TODO add damage
				api.entitySay(npc, "What do you think you're doing?")
			} else {
				api.runAnimation(player, 881);
				var delay = 3
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
		//TODO implement multiples
			api.addExperience(player, Stat.THIEVING, thieving.xp, true);
			var rand = Math.round(Math.random()*(thieving.items.length-1));
			print(thieving.items[0]);
			print(rand);
			if(thieving.items[rand][1] === null)
			    api.addCarriedItem(player, thieving.items[rand][0], 1);
			else
			    api.addCarriedItem(player, thieving.items[rand][0], thieving.items[rand][1]);
			api.sendFilterMessage(player, "You pick the "
					+ npc.name.toLowerCase() + "'s pocket.");
		},

		getThievingChance : function (player, thieving) {
		    return 0.5; //TODO Figure out this
		},
		
		forNPC : function (id) {
			switch (id) {
			case 1:
				return PickpocketNPCs.MAN;
			case 4:
				return PickpocketNPCs.WOMEN;
			case 1757:
				return PickpocketNPCs.FARMER;
			case 1715:
				return PickpocketNPCs.HAM_MEMBER_FEMALE;
			case 1714:
				return PickpocketNPCs.HAM_MEMBER_MALE;
			case 15:
				return PickpocketNPCs.WARRIOR;
			case 187:
				return PickpocketNPCs.ROGUE;
			case 5752:
				return PickpocketNPCs.CAVE_GOBLIN;
			case 2234:
				return PickpocketNPCs.MASTER_FARMER;
			case 5919:
			case 5920:
			case 9:
				return PickpocketNPCs.GUARD;
			}
		}
}