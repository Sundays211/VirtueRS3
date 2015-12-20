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
var ContainerState = Java.type('org.virtue.game.entity.player.container.ContainerState');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */

var NpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [5915, 13633];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		if (option != 1) {
			return false;
		}
		switch (npc.getID()) {
			case 5915:
				switch (option) {
				case 1:
					player.getDialogs().sendNpcChat("Hey "+api.getName(player)+", I am giving away free clan vex. If you right click me and click get vex. ", 5915);
					return true;
				case 3:
					startClanVexGiver(player, npc);			
					return true;
				}
				return true;
			case 13633:		
				switch (option) {
				case 1:
					player.getDialogs().sendNpcChat("Hey "+api.getName(player)+", You can get a clan cape from me.", 13633);
					return true;
				case 3:
					startClanCloakGiver(player, npc);			
					return true;
				}
				return true;
			default:
				//api.sendMessage(player, "Unhandled NPC Interaction action: npcId="+npc.getID()+", option="+option);
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
	var listener = new NpcListener();
	scriptManager.registerNpcListener(listener, listener.getIDs());
};

function startClanVexGiver (player, npc) {
	print(api.getNpcType(npc).name+"\n");
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to get a clan vex.");
		return;
	}
	if (api.carriedItemTotal(player, 20709) > 0
			|| api.itemTotal(player, "bank", 20709) > 0) {
		api.sendMessage(player, "You already own a clan vexillum.");
		return;
	}
	api.addCarriedItem(player, 20709, 1);
	player.getDialogs().sendNpcChat("Here you go "+api.getName(player)+".", 5915);

} 

function startClanCloakGiver (player, npc) {
	print(api.getNpcType(npc).name+"\n");
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to get a clan cloak.");
		return;
	}
	if (api.carriedItemTotal(player, 20708) > 0
			|| api.itemTotal(player, "bank", 20709) > 0) {
		api.sendMessage(player, "You already own a clan cloak.");
		return;
	}
	api.addCarriedItem(player, 20708, 1);
	player.getDialogs().sendNpcChat("Here you go "+api.getName(player)+".", 13633);

} 