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
var ContainerState = Java.type('org.virtue.model.entity.player.inv.ContainerState');

var ForceTalkBlock = Java.type('org.virtue.model.entity.update.block.ForceTalkBlock');
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */
var api;

var NpcListener = Java.extend(Java.type('org.virtue.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [548, 6539, 0, 16014, 16098, 16099, 16100, 16101];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		npc.queueUpdateBlock(new FaceEntityBlock(player));
		npc.stopAll();
		switch (npc.getID()) {
			case 0:
				switch (option) {
					case 1:
						player.getDialogs().sendNpcChat("Hello. What are you doing here?", 0);
						return true;
					case 3:
						player.getDialogs().sendNpcChat("Would you like to purchase a cape?", 0);		
						return true;
				}
				return true;
			case 548:
				switch (option) {
					case 1:
						player.getDialogs().sendNpcChat("Would you like to buy any fine clothes?", 548);
						return true;
					case 3:
						api.setVarp(player, 304, 8);
						api.setVarc(player, 2360, "Thessalia's Fine Clothes");
						api.openCentralWidget(player, 1265, false);
						return true;
					case 4:
						startMakeover(player, npc);			
						return true;
				}
				return true;
			case 6539:
				switch (option) {
					case 1:
						startNastroth (player, npc);
						return true;
				}
				return true;
			case 16014:
				switch (option) {
					case 1:
						player.getDialogs().sendNpcChat("You can start your journey by picking one of the starter set's beside the bank chest.", 16014);
						api.runAnimation(npc, 21985);
						return true;
				}
				return true;
			case 16098:
				switch (option) {
					case 1:
						//player.getDialogs().sendNpcChat("Welcome to VirtueRS3! Hope you have a good time.", 16098);
						return true;
				}
				return true;
			case 16099:
				switch (option) {
					case 1:
						//player.getDialogs().sendNpcChat("Welcome to VirtueRS3! Hope you have a good time.", 16099);
						return true;
				}
				return true;
			case 16100:
				switch (option) {
					case 1:
						//player.getDialogs().sendNpcChat("Welcome to VirtueRS3! Hope you have a good time.", 16100);
						return true;
				}
				return true;
			case 16101:
				switch (option) {
					case 1:
						//player.getDialogs().sendNpcChat("Welcome to VirtueRS3! Hope you have a good time.", 16101);				
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
	api = scriptManager.getApi();	
	var listener = new NpcListener();
	scriptManager.registerNpcListener(listener, listener.getIDs());
};

function startMakeover (player, npc) {
	print(api.getNpcType(npc).name+"\n");
	if(player.getInvs().getContainer(ContainerState.EQUIPMENT).getUsedSlots() > 0) {
		player.getDialogs().sendNpcChat("You're not able to try on my clothes with all that armour. Take it off and then speak to me again.", 548);
		return false;
	}
	api.openCentralWidget(player, 729, false);
	
} 

function startNastroth (player, npc) {
	print(api.getNpcType(npc).name+"\n");
	if (api.freeSpaceTotal(player, "backpack") < 28) {
		player.getDialogs().sendNpcChat("Sorry! I cannot give you any item's if you have something in your inventory already. You must have atleast 28 empty inventory slots. Come talk to me later.", 6539);
		return;
	}
	api.addCarriedItem(player, 995, 100000);
	api.addCarriedItem(player, 15273, 1000);
	api.addCarriedItem(player, 6585, 1);
	api.addCarriedItem(player, 4151, 1);
	api.addCarriedItem(player, 1163, 1);
	api.addCarriedItem(player, 1127, 1);
	api.addCarriedItem(player, 1201, 1);
	api.addCarriedItem(player, 1079, 1);
	api.addCarriedItem(player, 4131, 1);
	api.addCarriedItem(player, 6570, 1);
	api.addCarriedItem(player, 7462, 1);
	player.getDialogs().sendNpcChat("Here you go! Enjoy your starter kit.", 6539);
} 