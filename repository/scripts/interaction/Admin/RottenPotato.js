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
		var target = args.target;
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
		} else if (event == EventType.OPPLAYERU) {//use on player
			multi4(player, "OPTIONS"
			, "Player Info", function () {
				api.sendMessage(player, "Not yet implemented.");
			}, "Bank Stats", function () {
			api.openCentralWidget(player, 1691, false);
			api.setWidgetText(player, 1691, 7, "115");
			api.setWidgetText(player, 1691, 11, "item1");
			api.setWidgetText(player, 1691, 12, "item2");
			api.setWidgetText(player, 1691, 13, "item3");
			api.setWidgetText(player, 1691, 14, "item4");
			api.setWidgetText(player, 1691, 15, "item5");
			api.setWidgetText(player, 1691, 16, "item1 amount");
			api.setWidgetText(player, 1691, 17, "item2 amount");
	     	api.setWidgetText(player, 1691, 18, "item3 amount");
			api.setWidgetText(player, 1691, 19, "item4 amount");
			api.setWidgetText(player, 1691, 20, "item5 amount");
			api.setWidgetText(player, 1691, 21, "21");
			api.setWidgetText(player, 1691, 22, "22");
			api.setWidgetText(player, 1691, 23, "23");
			api.setWidgetText(player, 1691, 24, "24");
			api.setWidgetText(player, 1691, 25, "25");
			
			
			
			
			}, "Send "+ target.getUsername() + " to Botany Bay", function () {
				multi2(player, "DEFINITELY SEND "+ target.getUsername() + " TO BOTANY BAY?", 
			   "yes", function () {
				var frame = 0;
			   var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				   process : function (player) {
					if (frame === 0) {
						api.setSpotAnim(target, 1, 3402);
			        	api.runAnimation(target, 17542);
					} else if (frame == 2) {
				target.getAppearance().setRender(Render.NPC);
			    target.getAppearance().setNPCId(15782);
				target.getAppearance().refresh();
					} else if (frame == 3) {
						target.getAppearance().setRender(Render.PLAYER);
						target.getAppearance().refresh();
					}
					frame++;
					return false;
				},
				stop : function (player) {
					api.stopAnimation(player);
					api.clearSpotAnim(player, 1);
				}
			});
			player.setAction(new Action());


			}, "no", function () {
				api.sendMessage(player, "Not yet implemented.");
			});
			}, "Cancel", function () {
			}
			);

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
	scriptManager.registerListener(EventType.OPPLAYERU, 5733, itemListener);
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
				api.addCarriedItem(player, 5733, 1);
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
				for (var skill=0; skill < 27; skill++) {
					api.addExperience(player, skill, 140344310, false);
				}
			}, "test quest completed", function () {
				api.openCentralWidget(player, 1244, false);
				api.setWidgetText(player, 1244, 25, "You have completed Cook's Assistant!");	
				api.setWidgetText(player, 1244, 26, "<br>1 Quest point<br>300 Cooking XP<br>500 coins<br>20 sardines<br>Access to the cook's range<br>Tow Treasure Hunter keys");
				api.setWidgetText(player, 1244, 27, "Quest points:<col=ee1111> 12");
	
				
			}, "Clear Title", function () {
				player.getAppearance().setPrefixTitle("");
				player.getAppearance().refresh();
			}, "Log Out", function () {

			});
		},
		handleCommandListOption : function (player) {
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
}
