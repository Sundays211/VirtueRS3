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

var Animals = {
		BALLOON : {
	        balloonID : 2275
	    },
	    BALLOON2 : {
	        balloonID : 2276
	    },
	    BALLOON3 : {
	        balloonID : 2277
	    },
	    BALLOON4 : {
	        balloonID : 2278
	    }
};

var PartyNpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		startParty(args.player, args.npc);
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var npcs = [ 2275, 2276, 2277, 2278 ];
	var listener = new PartyNpcListener();
	for (var i in npcs) {
		scriptManager.registerListener(EventType.OPNPC1, npcs[i], listener);
	}
};

function startParty (player, npc) {
	if (api.isPaused(player)) {
		return false;
	}
	//print(api.getNpcType(npc.getID()).name+"\n");
	var party = forPartyNPC(npc.getID());
	player.queueUpdateBlock(new FaceEntityBlock(npc));
	api.runAnimation(player, 794);
	npc.setCanRespawn(false);
	npc.setExists(false);
	giveRandomItem(player, npc);
	api.pausePlayer(player, 2);
}

function giveRandomItem (player, npc) {
	if (api.isPaused(player)) {
		return false;
	}
	if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
		api.sendMessage(player, "Not enough space in your inventory space.");
		return;
	}
	if (Math.random() <= 0.01) {
		World.getInstance().sendBroadcast(api.getName(player) + " has received the big prize from the balloon animal event! ");
		api.runAnimation(player, 862);
		api.setSpotAnim(player, 1, 199);
		api.addCarriedItem(player, 1050, 1);
		api.pausePlayer(player, 2);
	} else {
		api.sendMessage(player, "<col=0099CC>You didn't get the big prize, but you get 1k Coins!</col>");
		api.addCarriedItem(player, 995, 1000);
		api.pausePlayer(player, 2);
	}
}


function forPartyNPC(id) {
	for (ordinal in Animals) {
		if (Animals[ordinal].ballonID == id) {
			return Animals[ordinal];
		}
	}
	return null;
}