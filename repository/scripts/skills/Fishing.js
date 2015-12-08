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

var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */
var api;
var FISHING_SKILL = 10;
var BACKPACK = 93;
var option;

var Spots = {
		NORMAL : {
	        level : 1,
	        xp : 25*45,
	        catches : [317],
	        catchLevels : [1],
	        baseTime : 20,
	        randomTime : 10,
	        spotID : 1341,
	        respawnDelay : 8,
	        randomLife : 0
	    },
	    RIVER_LURE : {
	    	level : 1,
	        xp : 25*45,
	        catches : [335, 331],
	        catchLevels : [1, 1],//TODO: Fix levels and times
	        baseTime : 20,
	        randomTime : 15,
	        spotID : 329,
	        respawnDelay : 8,
	        randomLife : 0
	    },
	    RIVER_BAIT : {
	    	level : 1,
	        xp : 25*45,
	        catches : [335],
	        catchLevels : [1],
	        baseTime : 20,
	        randomTime : 20,
	        spotID : 329,
	        respawnDelay : 8,
	        randomLife : 0
	    }
};

var Tool = {
	SMALL_FISHING_NET : {
		level : 1,
		time : 5,
		anim : 24930,//TODO: Find the new fishing animations (old ones no longer work)
		itemID : 303
	},
	FISHING_ROD : {
		level : 1,
		time : 5,
		anim : 24934,//TODO: Find the new fishing animations (old ones no longer work)
		itemID : 307
	}
};

var NpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [233, 329];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		player.queueUpdateBlock(new FaceEntityBlock(npc));
		switch (option) {
			case 1:
				startFish(player, npc);
				break;
			case 2:
				startFish(player, npc);
				break;
			case 3:
				startFish(player, npc);
				break;
			default:
				api.sendMessage(player, "Unhandled fishing action: npcId="+npc.getID()+", option="+option);
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
	var listener = new NpcListener();
	scriptManager.registerNpcListener(listener, listener.getIDs());
};

function startFish (player, npc) {
	print(api.getNpcType(npc.getID()).name+"\n");
	var spots = forSpots(npc.getID(), option);
	var tool = forTool(player);
	if (api.isPaused(player)) {
		return false;
	}
	if (tool == null) {
		api.sendMessage(player, "You need a fishing item to fish here.");
		return;
	}
	if (api.getStatLevel(player, FISHING_SKILL) < spots.level) {
		api.sendMessage(player, "You require a fishing level of "+spots.level+"  to fish here.");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	api.runAnimation(player, tool.anim);
	api.sendFilterMessage(player, "You cast out your " + api.getItemType(tool.itemID).name +"...");
	api.pausePlayer(player, delay+10);
	var delay = getDelay(player, spots, tool);//Calculates the time taken to catch a fish
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
			if(delay <= 0) {
				fishingSuccess(player, spots, npc);
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

function fishingSuccess (player, spots, npc) {
	api.addExperience(player, "fishing", spots.xp, true);
	var fishID = getCatch(player, spots);
	api.addCarriedItem(player, fishID, 1);
	api.sendFilterMessage(player, "You catch some " + api.getItemType(fishID).name + ".");
}

function getDelay (player, spots, tool) {
	var timer = spots.baseTime - api.getStatLevel(player, FISHING_SKILL) - Math.floor(Math.random() * tool.time);
	print(timer+"\n");
	if (timer < 1 + spots.randomTime) {
		timer = 1 + Math.floor((Math.random() * spots.randomTime));
		print(timer+"\n");
	}
	return timer;
}

function getCatch (player, spots) {
	var possibleCatches = [];
	for (var i in spots.catchLevels) {
		if (spots.catchLevels[i] <= api.getStatLevel(player, FISHING_SKILL)) {
			possibleCatches.push(spots.catches[i]);
		}
	}
	return possibleCatches[Math.floor(possibleCatches.length * Math.random())];
}

function forSpots(id, option) {
	switch (id) {
	case 233:
		return Spots.RIVER_BAIT;
	case 329:
		return option == 1 ? Spots.RIVER_LURE : Spots.RIVER_BAIT;
	}
}

function forTool(player) {
	var tool;
	for (ordial in Tool) {
		tool = Tool[ordial];//TODO: Run this backwards (from best to worst)
		if (api.itemTotal(player, BACKPACK, tool.itemID) >= 1) {
			return tool;
		}
	}
	return Tool.SMALL_FISHING_NET;
} 