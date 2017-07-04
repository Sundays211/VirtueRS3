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
 * @since 01/29/2015
 */

var Wisp = {
		PALE : {
	        level : 1,
	        wispID : 18150,
	        springID : 612,
	        xp : 1,
	        convertXp : 3,
	        memoryID : 29384,
	        energyID : 29189,
	        memoryGfx : 4235
	    },
	    FLICKERING : {
	        level : 10,
	        wispID : 18151,
	        springID : 4603,
	        xp : 2,
	        convertXp : 4,
	        memoryID : 29385,
	        energyID : 29190,
	        memoryGfx : 4235
	    },	    
	    BRIGHT : {
	        level : 20,
	        wispID : 18153,
	        springID : 4604,
	        xp : 3,
	        convertXp : 5,
	        memoryID : 29386,
	        energyID : 29191,
	        memoryGfx : 4235
	    },//TODO: Update all wisp types below here to use the same format as the wisps above
	    GLOWING : {
	        level : 30,
	        wispID : 18155,
	        springID : 4605,
	        xp : 4,
	        memoryID : 29387,
	        memoryAmount: 1,
	        energyID : 29192,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    SPARKLING : {
	        level : 40,
	        wispID : 18157,
	        springID : 18180,
	        xp : 5,
	        memoryID : 29388,
	        memoryAmount: 1,
	        energyID : 29193,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    GLEAMING : {
	        level : 50,
	        wispID : 18159,
	        springID : 18182,
	        xp : 6,
	        memoryID : 29389,
	        memoryAmount: 1,
	        energyID : 29194,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    VIBRANT : {
	        level : 60,
	        wispID : 18146,
	        springID : 18184,
	        xp : 7,
	        memoryID : 29390,
	        memoryAmount: 1,
	        energyID : 29195,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    LUSTROUS : {
	        level : 70,
	        wispID : 18163,
	        springID : 18186,
	        xp : 8,
	        memoryID : 29391,
	        memoryAmount: 1,
	        energyID : 29196,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    ELDER : {
	        level : 75,
	        wispID : 13614,
	        springID : 13616,
	        xp : 8.5,
	        memoryID : 31326,
	        memoryAmount: 1,
	        energyID : 31312,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    BRILLIANT : {
	        level : 80,
	        wispID : 18165,
	        springID : 18188,
	        xp : 9,
	        memoryID : 29392,
	        memoryAmount: 1,
	        energyID : 29197,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    RADIANT : {
	        level : 85,
	        wispID : 18149,
	        springID : 18190,
	        xp : 10,
	        memoryID : 29393,
	        memoryAmount: 1,
	        energyID : 29198,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    LUMINOUS : {
	        level : 90,
	        wispID : 18169,
	        springID : 18192,
	        xp : 11,
	        memoryID : 29394,
	        memoryAmount: 1,
	        energyID : 29323,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    INCANDESCENT : {
	        level : 95,
	        wispID : 18171,
	        springID : 18194,
	        xp : 12,
	        memoryID : 29395,
	        memoryAmount: 1,
	        energyID : 29324,
	        energyAmount : 3,
	        memoryGfx : 4235,
	        baseTime : 50,
	        randomLife : 0
	    },
	    ENRICHED_FLICKERING : {
	        level : 10,
	        wispID : 18152,
	        springID : 18175,
	        xp : 4,
	        memoryID : 29396,
	        memoryAmount: 1,
	        memoryGfx : 4236,
	        baseTime : 80,
	        enriched : true,
	        randomLife : 0
	    },
	    ENRICHED_BRIGHT : {
	        level : 20,
	        wispID : 18154,
	        springID : 18177,
	        xp : 6,
	        memoryID : 29397,
	        memoryAmount: 1,
	        memoryGfx : 4236,
	        baseTime : 80,
	        enriched : true,
	        randomLife : 0
	    },
	    ENRICHED_GLOW : {
	        level : 30,
	        wispID : 18156,
	        springID : 18179,
	        xp : 8,
	        memoryID : 29398,
	        memoryAmount: 1,
	        memoryGfx : 4236,
	        baseTime : 80,
	        enriched : true,
	        randomLife : 0
	    },
	    ENRICHED_SPARKLING : {
	        level : 40,
	        wispID : 18158,
	        springID : 18181,
	        xp : 10,
	        memoryID : 29399,
	        memoryAmount: 1,
	        memoryGfx : 4236,
	        baseTime : 80,
	        enriched : true,
	        randomLife : 0
	    }
	    
};

var DivinationSelectListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 1://Convert to energy
			Divination.convertMemories(player, getCarriedMemory(player), 1);
			api.closeCentralWidgets(player);
			return true;
		case 6://Convert to xp
			Divination.convertMemories(player, getCarriedMemory(player), 2);
			api.closeCentralWidgets(player);
			return true;
		case 7://Convert to enhanced xp
		default:
			api.sendMessage(player, "Unhandled divination button: comp="+args.component+", button="+args.button);
			return false;
		}
	}
});

var EnergyRiftListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1:
			api.openCentralWidget(player, 91, false);
			api.setVarc(player, 3711, getCarriedMemory(player) == null ? 0 : 1);
			//varc 3711 = Has memories
			//varc 3713 = Has energy
			return;
		case EventType.OPLOC2:
			Divination.convertMemories(player, getCarriedMemory(player), 1);
			return;
		case EventType.OPLOC3:
			Divination.convertMemories(player, getCarriedMemory(player), 2);
			return;
		}
	}
});

var WispListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		Divination.startHarvest(args.player, args.npc);
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var locs = [ 87306 ];
	var energyRift = new EnergyRiftListener();	
	for (var i in locs) {
		//Bind options one, two, and three on all energy rifts to this listener
		scriptManager.registerListener(EventType.OPLOC1, locs[i], energyRift);
		scriptManager.registerListener(EventType.OPLOC2, locs[i], energyRift);
		scriptManager.registerListener(EventType.OPLOC3, locs[i], energyRift);
	}
	
	var npcs = [ 18150, 18151, 18153, 18155, 18157, 18159, 18163, 18165, 18141, 18142, 18143, 612, 18180, 18182, 18184, 18186, 13616, 18188, 18190, 18192, 18194,
	   		 18144, 18145, 18146, 18147, 13614, 18148, 18149, 18169, 18171, 18152, 18175, 18154, 18177, 18156, 18179, 18158, 18181 ];
	var wispListener = new WispListener();
	for (var i in npcs) {
		//Binds option one on all wisps to this listener
		scriptManager.registerListener(EventType.OPNPC1, npcs[i], wispListener);
	}
	
	var selectListener = new DivinationSelectListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 91, selectListener);
};

var Divination = {
		startEnergyRift : function (player, object) {
			var memoryType = this.getCarriedMemory(player);
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			//if (api.carriedItemTotal(player, item.getID()) < 1) {
				//api.sendMessage(player, "You need to have "+api.getItemName(energyRift.memoryID)+" in your inventory.");
				//return true;
			//}
			var delay = 0;
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (api.carriedItemTotal(player, memoryType.memoryID) < 1) {
							return true;
						}
						that.convertMemories(player, memoryType, object);
						delay = 3;
					}
					delay--;
					return false;
				},
				stop : function (player) {//Clear the current animation block
					api.resetRenderAnim(player);
				}

			});
			player.setAction(new Action());
		},
		convertMemories : function (player, memoryType, convertType) {
			if (memoryType == null) {
				api.sendMessage(player, "You are not carrying any memories.");
				return;
			}
			var delay = 3;
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (api.carriedItemTotal(player, memoryType.memoryID) < 1) {
							memoryType = that.getCarriedMemory(player);
							if (memoryType == null) {
								return true;
							}					
						}
						api.runAnimation(player, 21234);
						api.setSpotAnim(player, 1, 4240);
						that.convertMemory(player, memoryType, convertType);
						delay = 3;
					}
					delay--;
					return false;
				},
				stop : function (player) {//Clear the current animation block
					api.resetRenderAnim(player);
				}

			});
			player.setAction(new Action());
		},
		convertMemory : function (player, memoryType, convertType) {
			if (memoryType == null || api.carriedItemTotal(player, memoryType.memoryID) < 1) {
				api.sendMessage(player, "You are not carrying any memories.");
				return;
			}
			api.delCarriedItem(player, memoryType.memoryID, 1);	
			if (convertType == 1) {//To energy
				var amount = 2+Math.floor(Math.random() * 4);
				api.addCarriedItem(player, memoryType.energyID, amount);
				api.addExperience(player, Stat.DIVINATION, 1, true);
			} else if (convertType == 2) {//To xp
				api.addExperience(player, Stat.DIVINATION, memoryType.convertXp, true);		
			} else if (convertType == 3) {//To enhanced xp
				
			}
		},
		getCarriedMemory : function (player) {
			for (var ordinal in Wisp) {
				if (api.carriedItemTotal(player, Wisp[ordinal].memoryID) > 1) {
					return Wisp[ordinal];
				}
			}
			return null;
		},
		startHarvest : function (player, npc) {
			var harvest = this.forHarvestNPC(api.getId(npc));
			if (api.getStatLevel(player, Stat.DIVINATION) < harvest.level) {
				api.sendMessage(player, "You need a Divination level of "+harvest.level+" to harvest from this " + api.getNpcType(harvest.wispID).name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			api.faceEntity(player, npc);	
			if (npc.getID() == harvest.wispID) {
			Divination.openWisp(npc, harvest);
			}
			
			var stop = this.getHarvestDelay(player, harvest);
			var delay = 5;
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					api.runAnimation(player, 21231);

					if (delay <= 0) {
						if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
								api.sendMessage(player, "Not enough space in your inventory.");
								return true;
						}
						if (stop <= 0) {
							return true;
						}
						that.forHarvestItem(player, harvest);
						delay = 5;
					}
					stop--;
					delay--;
					return !npc.exists();
				},
				stop : function (player) {
					api.stopAnimation(player);
					api.runAnimation(player, 21229);
				}
				
			});
			player.setAction(new Action());
		},
		openWisp : function (npc, harvest) {
			api.transformNpc(npc, harvest.springID);
			var lifespan = 50;
			var Action = Java.extend(Java.type('org.virtue.game.entity.npc.NpcAction'), {	
				process : function (npc) {
					if (lifespan == 3) {
						api.runAnimation(npc, 21203);
					}
					if (lifespan <= 0) {
						return true
					}
					lifespan--;
					return !npc.exists();
				},
				stop : function (npc) {			
					api.despawnNpc(npc, 10);//TODO: Correct respawn delay
					api.transformNpc(npc, harvest.wispID);
				}
				
			});
			npc.setAction(new Action());
		},
		forHarvestItem : function (player, harvest) {
			var energyAmount = 1;
			if (api.getBaseLevel(player, Stat.DIVINATION) > 54) {
				energyAmount = 2;
			}
			if (api.getBaseLevel(player, Stat.DIVINATION) > 74) {
				energyAmount = 3;
			}
			if (harvest.enriched) {
				api.setSpotAnim(player, 1, harvest.memoryGfx);
				api.addExperience(player, Stat.DIVINATION, harvest.xp, true);
				api.addCarriedItem(player, harvest.memoryID, 1);
				api.addCarriedItem(player, harvest.energyID, energyAmount*2);
			} else {
				api.setSpotAnim(player, 1, harvest.memoryGfx);
				api.addExperience(player, Stat.DIVINATION, harvest.xp, true);
				api.addCarriedItem(player, harvest.memoryID, 1);
				api.addCarriedItem(player, harvest.energyID, energyAmount);
			}
		},
		getHarvestDelay : function (player, harvest) {
			return harvest.enriched ? 80 : 50;
		},
		forHarvestNPC : function (id) {
			for (ordinal in Wisp) {
				if (Wisp[ordinal].wispID == id
					|| Wisp[ordinal].springID == id) {
					return Wisp[ordinal];
				}
			}
			return null;
		}
}
