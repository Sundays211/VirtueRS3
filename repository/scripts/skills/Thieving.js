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
 * @author Kayla
 * @since 01/16/2015
 */
var api;
var THIEVING_SKILL = 17;
var BACKPACK = 93;

var Thieving = {
		MAN : {
	        level : 1,
	        npcID : 1,
	        xp : 45*8,
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
	        xp : 45*8,
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
	        xp : 45*14.5,
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
	        xp : 45*18.5,
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
	        xp : 45*22.5,
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
	        xp : 45*18.5,
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
	        xp : 45*35.5,
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
	        xp : 45*40,
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
	        xp : 45*40,
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
	        xp : 45*46.5,
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
	        xp : 45*8,
	        itemID : 995,
	        itemAmount : 20,
	        baseTime : 4,
	        randomTime : 0.2,
	        respawnDelay : 8,
	        randomLife : 0
	    }
};

var NpcListener = Java.extend(Java.type('org.virtue.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [1, 9, 2234, 5732, 187, 15, 1714, 1715, 1757, 4, 5919, 5920];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		switch (option) {
			case 3:
				ThievingStart(player, npc);
				break;
			default:
				api.sendMessage(player, "Unhandled thieving action: npcId="+npc.getID()+", option="+option);
				break;
		}
		return true;
	},
	
	getInteractRange : function (npc, option) {
		return 1;
	}

});

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		return [34383];
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		switch (option) {
			case 2:
				ThievingStallStart(player, object);
				break;
			default:
				//api.sendMessage(player, "Unhandled thieving action: objectId="+object.getID()+", option="+option);
				break;
		}
		return true;
	},
	
	getInteractRange : function (object, option) {
		return 1;
	}

});

function ThievingStallStart (player, object) {
	print(api.getLocType(object.getID()).name+"\n");
	var stall = forStall(api.getLocType(object).name);
	if (api.isPaused(player)) {
		return false;
	}
	if (api.getCurrentLevel(player, THIEVING_SKILL) < stall.level) {
		api.sendMessage(player, "You need a thieving level of "+stall.level+" to steal from this " + api.getLocType(stall.stallID).name + ".");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	api.runAnimation(player, 881);
		var delay = getThievingStallDelay(player, stall);
		api.pausePlayer(player, delay+1);
		var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
				api.runAnimation(player, 881);
				if(delay <= 0) {
					forStallItem(player, stall, object);
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
	}
	
	function forStallItem (player, stall, object) {
		api.addExperience(player, "thieving", stall.xp, true);
		api.addCarriedItem(player, stall.itemID, stall.itemAmount);
		api.sendFilterMessage(player, "You successfully stole from the " + api.getLocType(object).name + ".");
	}
	
	function getThievingStallDelay (player, stall) {
		return stall.baseTime;
	}
	
	function forStall(name) {
		switch (name) {
		case "Silk stall":
			return Stall.SILK;
		}
	}

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new NpcListener();
	var object = new LocationListener();
	scriptManager.registerNpcListener(listener, listener.getIDs());
	scriptManager.registerLocationListener(object, object.getIDs());
};

function ThievingStart (player, npc) {
	print(api.getNpcType(npc.getID()).name+"\n");
	var thieving = forNPC(npc.getID());
	if (api.isPaused(player)) {
		return false;
	}
	if (npc == null) {
		return;
	}
	player.queueUpdateBlock(new FaceEntityBlock(npc));
	if (api.getCurrentLevel(player, THIEVING_SKILL) < thieving.level) {
		api.sendMessage(player, "You need a thieving level of "+thieving.level+" to steal from this " + api.getNpcType(thieving.npcID).name + ".");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (Math.random() <= thieving.randomTime) {
		player.lock(5);
		npc.queueUpdateBlock(new FaceEntityBlock(player));
		api.runAnimation(player, 834);
		player.queueUpdateBlock(new GraphicsBlock(1, 80));
		api.pausePlayer(player, 5);//TODO: What is the correct stun time?
	} else {
		api.runAnimation(player, 881);
		var delay = getThievingDelay(player, thieving);
		api.pausePlayer(player, delay+1);
		var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
				api.runAnimation(player, 881);
				if(delay <= 0) {
					forThievingItem(player, thieving, npc);
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
	}
	
	function forThievingItem (player, thieving, npc) {
		api.addExperience(player, "thieving", thieving.xp, true);
		api.addCarriedItem(player, thieving.itemID, thieving.itemAmount);
		api.sendFilterMessage(player, "You successfully stole from the " + api.getNpcType(thieving.npcID).name + ".");
	}
	
	function getThievingDelay (player, thieving) {
		return thieving.baseTime;
	}

	function forNPC(id) {
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