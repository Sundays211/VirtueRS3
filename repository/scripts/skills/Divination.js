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
 
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/29/2015
 */
var api;
var DIVINATION_SKILL = 25;
var BACKPACK = 93;

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


var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {


	/* The npc ids to bind to */
	getIDs: function() {
		return [87306];
	},

	/* The first option on an npc */
	handleInteraction: function(player, object, option) {
		switch (option) {
			case 1:
				api.openCentralWidget(player, 91, false);
				break;
			case 2:
				convertMemories(player, getCarriedMemory(player), 1);
				break;
			case 3:
				convertMemories(player, getCarriedMemory(player), 2);
				return true;
			default:
				api.sendMessage(player, "Unhandled energy rift action: energyRiftID="+object.getID()+", option="+option);
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

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [91];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.setVarc(player, 3711, getCarriedMemory(player) == null ? 0 : 1);
		//varc 3711 = Has memories
		//varc 3713 = Has energy
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 1://Convert to energy
			convertMemories(player, getCarriedMemory(player), 1);
			api.closeCentralWidgets(player);
			return true;
		case 6://Convert to xp
			convertMemories(player, getCarriedMemory(player), 2);
			api.closeCentralWidgets(player);
			return true;
		case 7://Convert to enhanced xp
		default:
			return false;
		}		
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}
});


function startEnergyRift(player, object) {
	var memoryType = getCarriedMemory(item.getID());
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	//if (api.carriedItemTotal(player, item.getID()) < 1) {
		//api.sendMessage(player, "You need to have "+api.getItemType(energyRift.memoryID).name+" in your inventory.");
		//return true;
	//}
	var delay = 0;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			if (delay <= 0) {
				if (api.carriedItemTotal(player, memoryType.memoryID) < 1) {
					return true;
				}
				convertMemory(player, memoryType, object);
				delay = 3;
			}
			delay--;
			return false;
		},
		stop : function (player) {//Clear the current animation block
			player.getAppearance().setRenderAnimation(-1);
			player.getAppearance().refresh();
		}

	});
	player.setAction(new Action());
}

function convertMemories (player, memoryType, convertType) {
	if (memoryType == null) {
		api.sendMessage(player, "You are not carrying any memories.");
		return;
	}
	var delay = 3;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			if (delay <= 0) {
				if (api.carriedItemTotal(player, memoryType.memoryID) < 1) {
					memoryType = getCarriedMemory(player);
					if (memoryType == null) {
						return true;
					}					
				}
				api.runAnimation(player, 21234);
				player.queueUpdateBlock(new GraphicsBlock(1, 4240));
				convertMemory(player, memoryType, convertType);
				delay = 3;
			}
			delay--;
			return false;
		},
		stop : function (player) {//Clear the current animation block
			player.getAppearance().setRenderAnimation(-1);
			player.getAppearance().refresh();
		}

	});
	player.setAction(new Action());
}

function convertMemory(player, memoryType, convertType) {
	if (memoryType == null || api.carriedItemTotal(player, memoryType.memoryID) < 1) {
		api.sendMessage(player, "You are not carrying any memories.");
		return;
	}
	api.delCarriedItem(player, memoryType.memoryID, 1);	
	if (convertType == 1) {//To energy
		var amount = 2+Math.floor(Math.random() * 4);
		api.addCarriedItem(player, memoryType.energyID, amount);
		api.addExperience(player, "divination", 1, true);
	} else if (convertType == 2) {//To xp
		api.addExperience(player, "divination", memoryType.convertXp, true);		
	} else if (convertType == 3) {//To enhanced xp
		
	}
}

function getCarriedMemory(player) {
	for (var ordinal in Wisp) {
		if (api.carriedItemTotal(player, Wisp[ordinal].memoryID) > 1) {
			return Wisp[ordinal];
		}
	}
	return null;
}

var NpcListener = Java.extend(Java.type('org.virtue.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [18150, 18151, 18153, 18155, 18157, 18159, 18163, 18165, 18141, 18142, 18143, 612, 18180, 18182, 18184, 18186, 13616, 18188, 18190, 18192, 18194,
		 18144, 18145, 18146, 18147, 13614, 18148, 18149, 18169, 18171, 18152, 18175, 18154, 18177, 18156, 18179, 18158, 18181];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		switch (option) {
			case 1:
				startHarvest(player, npc);
				break;
			default:
				api.sendMessage(player, "Unhandled divination action: wispID="+npc.getID()+", option="+option);
				break;
		}
		return true;
	},
	
	getInteractRange : function (npc, option) {
		return 1;
	}

});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var harvest = new NpcListener();
	var energyRift = new LocationListener();
	var widgetListener = new WidgetListener();
	scriptManager.registerNpcListener(harvest, harvest.getIDs());
	scriptManager.registerLocationListener(energyRift, energyRift.getIDs());
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function startHarvest (player, npc) {
	print(api.getNpcType(npc.getID()).name+"\n");
	var harvest = forHarvestNPC(npc.getID());
	if (api.getStatLevel(player, DIVINATION_SKILL) < harvest.level) {
		api.sendMessage(player, "You need a Divination level of "+harvest.level+" to harvest from this " + api.getNpcType(harvest.wispID).name + ".");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	player.queueUpdateBlock(new FaceEntityBlock(npc));		
	if (npc.getID() == harvest.wispID) {
		openWisp(npc, harvest);
	}
	
	var stop = getHarvestDelay(player, harvest);
	var delay = 5;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			api.runAnimation(player, 21231);

			if (delay <= 0) {
				if (api.freeSpaceTotal(player, "backpack") < 1) {
						api.sendMessage(player, "Not enough space in your inventory.");
						return true;
				}
				if (stop <= 0) {
					return true;
				}
				forHarvestItem(player, harvest);
				delay = 5;
			}
			stop--;
			delay--;
			return !npc.exists();
		},
		stop : function (player) {
			api.clearAnimation(player);
			api.runAnimation(player, 21229);
		}
		
	});
	player.setAction(new Action());
}

function openWisp (npc, harvest) {
	api.transformNpc(npc, harvest.springID);
	var lifespan = 50;
	var Action = Java.extend(Java.type('org.virtue.model.entity.npc.NpcAction'), {	
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
}

function forHarvestItem (player, harvest) {
	var energyAmount = 1;
	if (api.getBaseLevel(player, DIVINATION_SKILL) > 54) {
		energyAmount = 2;
	}
	if (api.getBaseLevel(player, DIVINATION_SKILL) > 74) {
		energyAmount = 3;
	}
	if (harvest.enriched) {
		player.queueUpdateBlock(new GraphicsBlock(1, harvest.memoryGfx));
		api.addExperience(player, "divination", harvest.xp, true);
		api.addCarriedItem(player, harvest.memoryID, 1);
		api.addCarriedItem(player, harvest.energyID, energyAmount*2);
	} else {
		player.queueUpdateBlock(new GraphicsBlock(1, harvest.memoryGfx));
		api.addExperience(player, "divination", harvest.xp, true);
		api.addCarriedItem(player, harvest.memoryID, 1);
		api.addCarriedItem(player, harvest.energyID, energyAmount);
	}
}

function getHarvestDelay (player, harvest) {
	return harvest.enriched ? 80 : 50;
}


function forHarvestNPC(id) {
	for (ordinal in Wisp) {
		if (Wisp[ordinal].wispID == id
			|| Wisp[ordinal].springID == id) {
			return Wisp[ordinal];
		}
	}
	return null;
}