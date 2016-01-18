/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
 * @author Sundays21
 * @since 24/01/2015
 */
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		
		if (!api.isAdmin(player)) {
			chatplayer(player, "Eww! This was yuck! I don't think I want another bite.");
			api.runAnimation(player, 18001);
			api.delCarriedItem(player, objTypeId, 1);
			return;
		}
		if (event == EventType.OPHELD1) {//Eat Option
			RottenPotato.handleEatOption(player);
		} else if (event == EventType.OPHELD2) {//Heal Option
			api.sendMessage(player, "You set your health to max.");
			api.restoreLifePoints(player);	
		} else if (event == EventType.OPHELD3) {//CM-Tool
			RottenPotato.handleCmOption(player);	
		} else if (event == EventType.OPHELD4) {//Commands list
			RottenPotato.handleCommandListOption(player);
		}
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var itemListener = new ItemListener();
	scriptManager.registerListener(EventType.OPHELD1, 5733, itemListener);
	scriptManager.registerListener(EventType.OPHELD2, 5733, itemListener);
	scriptManager.registerListener(EventType.OPHELD3, 5733, itemListener);
	scriptManager.registerListener(EventType.OPHELD4, 5733, itemListener);
}

var RottenPotato = {
		handleEatOption : function (player) {
			multi5(player, "Eat", "Transform me", function () {
				player.getAppearance().setRender(Render.NPC);
				player.getAppearance().setNPCId(49);
				player.getAppearance().refresh();
			}, "Change me back.", function () {
				player.getAppearance().setRender(Render.PLAYER);
				player.getAppearance().refresh();
			}, "Wipe inventory", function () {
				api.emptyInv(player, Inv.BACKPACK);
			}, "Invisible mode", function () {
				player.getAppearance().setRender(Render.INVISIBLE);
				player.getAppearance().refresh();
			}, "Spawn aggressive NPC", function () {
				var npc = api.createNpc(90, api.getCoords(player));
				api.spawnNpc(npc);
			});
		},
		handleCmOption : function (player) {
			multi5(player, "CM-Tool", "Open Bank", function () {
				api.closeCentralWidgets(player);
				api.openOverlaySub(player, 1017, 762, false);
			}, "Max Stats", function () {
				for (var skill=0; skill < 26; skill++) {
					api.addExperience(player, skill, 13034431, false);
				}
			}, "Set Display", function () {
				api.sendMessage(player, "Not yet implemented.");
			}, "Clear Title", function () {
				player.getAppearance().setPrefixTitle("");
				player.getAppearance().refresh();
			}, "Log Out", function () {
				RottenPotato.handleLogOutOption(player);
			});
		},
		handleLogOutOption : function (player) {
			multi5(player, "How would you like to be logged?", "Keep me logged in.", function () {
				api.sendMessage(player, "Idle is now disabled.");
			}, "Kick me out.", function () {
				api.kickPlayer(player, true);
			}, "Never mind logging, just wipe my bank.", function () {
				api.emptyInv(player, Inv.BANK);
				api.sendMessage(player, "Bank is now clear!");
			}, "QP Cape please!", function () {
				if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
					api.sendMessage(player, "Not enough space in your inventory space.");
					return;
				}
				api.addCarriedItem(player, 9813, 1);
			}, "QP Hood Please!", function () {
				if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
					api.sendMessage(player, "Not enough space in your inventory space.");
					return;
				}
				api.addCarriedItem(player, 9814, 1);
			});
		},
		handleCommandListOption : function (player) {
			multi3(player, "What would you like to do?", "Spawn Fake Rare", function () {
				var npc = api.createNpc(20588, api.getCoords(player));
				if(npc.getOwner() != null) {
					api.sendMessage(player, "You already have a rare item out.");
				} else {
					npc.setOwner(player);
					api.spawnNpc(npc);
					api.runAnimation(player, 827);
					api.moveAdjacent(player);
				}
			}, "Balloon Animals Event", function () {
				World.getInstance().sendAdminBroadcast("The balloon animal event has started. Start popping your balloons for a chance of the big prize!");
				RottenPotato.spawnBalloonEvent(player);
			}, "Nothing", function () {
				//Do nothing, like they told you to!
			});
		},
		spawnBalloonEvent : function (player) {
			var npc = api.createNpc(2276, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2277, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2278, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2276, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2277, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2278, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2275, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2276, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2277, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2278, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2277, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2278, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2275, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2276, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2277, api.getCoords(player));
			api.spawnNpc(npc);
			
			npc = api.createNpc(2278, api.getCoords(player));
			api.spawnNpc(npc);
		}
}
