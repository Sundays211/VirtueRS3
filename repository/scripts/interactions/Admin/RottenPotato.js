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
 
var NPC = Java.type('org.virtue.game.entity.npc.NPC');
var Tile = Java.type('org.virtue.game.entity.region.Tile');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays21
 * @since 24/01/2015
 */
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.ItemListener'), {
	
	/* The item ids to bind to */
	getItemIDs: function() {
		return [ 5733 ];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		if (!api.isAdmin(player)) {
				player.getDialogs().sendNpcChat("Eww! This was yuck! I don't think I want another bite.", 2253);
				api.runAnimation(player, 18001);
				api.delCarriedItem(player, item.getID(), 1);
				return true;
		}
		switch (option) {
		case 1://Eat Option
			api.openDialog(player, "RottenPotato2");
			return true;
		case 2://Heal Option
			api.sendMessage(player, "You set your health to max.");
			player.getImpactHandler().restoreLifepoints();
			return true;
		case 3://CM-Tool
			api.openDialog(player, "RottenPotato");
			return true;
		case 4://commands list
			api.openDialog(player, "RottenPotato3");		
			return false;
		default:
			return false;
		}
	},
	
	getExamine : function (player, item) {
		return null;
	}

});

var DialogListener = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendMultichoice("CM-Tool", ["Open Bank", "Max Stats", "Set Display", "Clear Title", "Log Out"], [1, 2, 3, 4, 5]);
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
		case 1:
			api.closeCentralWidgets(player);
			api.openOverlaySub(player, 1017, 762, false);
			return false;//This will prevent the interface from closing
		case 2:
			for (skill=0; skill < 26; skill++) {
				player.getSkills().addExperience(SkillType.forID(skill), 13034431);
			}
			return true;
		case 3:
			return true;
		case 4:
			player.getAppearance().setPrefixTitle("");
			player.getAppearance().refresh();
			return true;
		case 5:
			player.getDialogs().sendMultichoice("How would you like to be logged?", ["Keep me logged in.", "Kick me out.", "Never mind logging, just wipe my bank.", "QP Cape please!", "QP Hood Please!"], [6, 7, 8, 9, 10]);
			return false;
		case 6:
			api.sendMessage(player, "Idle is now disabled.");
			return true;
		case 7:
			player.kick();
			return true;
		case 8:
			api.sendMessage(player, "Bank is now clear!");
			return true;
		case 9:
			if (api.freeSpaceTotal(player, "backpack") < 1) {
				api.sendMessage(player, "Not enough space in your inventory space.");
				return;
			}
			api.addCarriedItem(player, 9813, 1);
			return true;
		case 10:
			if (api.freeSpaceTotal(player, "backpack") < 1) {
				api.sendMessage(player, "Not enough space in your inventory space.");
				return;
			}
			api.addCarriedItem(player, 9814, 1);
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

var DialogListener2 = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendMultichoice("Eat", ["Transform me", "Change me back.", "Wipe inventory", "Invisible mode", "Spawn aggressive NPC"], [1, 2, 3, 4, 5]);
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
		case 1:
			player.getAppearance().setRender(Render.NPC);
			player.getAppearance().setNPCId(49);
			player.getAppearance().refresh();
			return true;
		case 2:
			player.getAppearance().setRender(Render.PLAYER);
			player.getAppearance().refresh();
			return true;
		case 3:
			return true;
		case 4:
			player.getAppearance().setRender(Render.INVISIBLE);
			player.getAppearance().refresh();
			return true;
		case 5:
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(90, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

var DialogListener3 = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendMultichoice("What would you like to do?", ["Spawn Fake Rare", "Balloon Animals Event", "Nothing", "Nothing", "Spawn List"], [1, 2, 3, 4, 5]);
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
			case 1:
			var npc = NPC.create(20588, new Tile(player.getCurrentTile()));
			if(npc.getOwner() != null) {
				api.sendMessage(player, "You already have a rare item out.");
			} else {
				npc.setOwner(player);
				npc.setCanRespawn(false);
				//Java.type('org.virtue.game.World').getInstance().addNPC(npc);
				api.runAnimation(player, 827);
				player.getMovement().moveAdjacent();
			}
			return true;
		case 2:
			World.getInstance().sendAdminBroadcast("The balloon animal event has started. Start popping your balloons for a chance of the big prize!");
			SpawnBalloonEvent(player);
			return true;
		case 3:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 4:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 5:
			player.getDialogs().sendMultichoice("JMOD Spawn List ", ["Spawn Jad", "Spawn Araxxor", "Spawn Vorago", "Spawn KBD", "Spawn KQ"], [6, 7, 8, 9, 10]);
			return false;
		case 6:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 7:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 8:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 9:
			api.sendMessage(player, "Coming Soon");
			return true;
		case 10:
			api.sendMessage(player, "Coming Soon");
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

function SpawnBalloonEvent(player) {
			var npc = NPC.create(2276, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2277, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2278, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2276, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2277, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2278, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2275, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2276, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2277, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2278, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2277, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2278, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2275, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2276, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2277, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
			
			var npc = NPC.create(2278, new Tile(player.getCurrentTile()));
			Java.type('org.virtue.game.World').getInstance().addNPC(npc);
}

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var itemListener = new ItemListener();
	scriptManager.registerItemListener(itemListener, itemListener.getItemIDs());
	scriptManager.registerDialogListener(new DialogListener(), "RottenPotato");
	scriptManager.registerDialogListener(new DialogListener2(), "RottenPotato2");
	scriptManager.registerDialogListener(new DialogListener3(), "RottenPotato3");
}