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
 * @since 01/16/2015
 */

var MusicBoxListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		switch (event) {
			case EventType.OPNPC1:
				switch (npcTypeId) {
				case 17101:
				case 17102:
					startMusicBox(player, npc);
					return;
				case 18528:
					startMorytanianMusicBox(player, npc);
					return;
				case 18529:
					startKharidianMusicBox(player, npc);
					return;
				default:
					return;
				}
			case EventType.OPNPC2:
				api.sendMessage(player, "This option is unavailable.");
				return;
			case EventType.OPNPC3:
				api.sendMessage(player, "This option is unavailable.");
				return;
			case EventType.OPNPC4:
				checkOwnership(player, npc);
				return;
			default:
				api.sendMessage(player, "Unhandled NPC Interaction action: npc="+npc);
				break;
		}
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var npcs = [ 17101, 17102, 18528, 18529 ];
	var listener = new MusicBoxListener();
	for (var i in npcs) {
		//Binds all options on all music boxes to this listener
		scriptManager.registerListener(EventType.OPNPC1, npcs[i], listener);
		scriptManager.registerListener(EventType.OPNPC2, npcs[i], listener);
		scriptManager.registerListener(EventType.OPNPC3, npcs[i], listener);
		scriptManager.registerListener(EventType.OPNPC4, npcs[i], listener);
	}
};

function checkOwnership(player, npc) {
	if(!npc.isOwner(player)) {
		api.sendMessage(player, "You are not the owner of this Music Box.");
		return true;
	}
	npc.destroy();
	player.setPet(null);
	
}

function placeMusicBox (player, item, slot) {
	var npc = NPC.create(17102, new Tile(player.getCurrentTile()));
	if(npc.getOwner() != null) {
		api.sendMessage(player, "You already have a music box out.");
	} else {
	   npc.setOwner(player);
	   npc.setCanRespawn(false);
	   Java.type('org.virtue.game.World').getInstance().addNPC(npc);
	   api.runAnimation(player, 827);
	   player.getMovement().moveAdjacent();
	}
}

function startMusicBox (player, npc) {
	api.runAnimation(player, 20156);
	api.sendFilterMessage(player, "You start to dance to the music.");
} 

function startMorytanianMusicBox (player, npc) {
	api.runAnimation(player, 21846);
	api.sendMessage(player, "You start to dance to the music", 109);
} 

function startKharidianMusicBox (player, npc) {
	api.runAnimation(player, 21847);
	api.sendMessage(player, "You start to dance to the music", 109);
} 