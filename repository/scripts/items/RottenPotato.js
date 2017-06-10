/**
 * Copyright (c) 2017 Virtue Studios
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


var inv = require('../../inv');
var map = require('../../map');
var entityMap = require('../../map/entity');
var widget = require('../../widget');
var util = require('../../core/util');
var stat = require('../../skill/logic/stat');
var chat = require('../../chat');
var anim = require('../../core/anim');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	 scriptManager.bind(EventType.OPPLAYERU, 5733, function (ctx) {//Item On Player
	 multi4(ctx.player, "Options", "Player Info", function() {			
	 }, "Bank Stats", function() {
	 widget.openCentral(ctx.player, 1691, false);
	 var total = 0;
	 for (var slot=0; slot<28; slot++) {
	 var item = ENGINE.getItem(ctx.target, Inv.BANK, slot) || ENGINE.getItem(ctx.target, Inv.BACKPACK, slot)|| ENGINE.getItem(ctx.target, Inv.EQUIPMENT, slot);
	 var price = -1;
	 if (item != null) {
	 price = ENGINE.getExchangeCost(item);
	 total += price * item.getAmount();
	 }
	 }
	 widget.setText(ctx.player, 1691, 7, util.toFormattedString(total)); //Total Bank Value
	 }, "Send "+util.getName(ctx.target)+" to Botany Bay", function() {
	 multi2(ctx.player, "DEFINITELY SEND "+ util.getName(ctx.target) + " TO BOTANY BAY?",  "Yes", function () {
     var hash = util.getUserHash(ctx.target);
	 if (hash) { 
 	 var targetPlayer = entityMap.getPlayer(hash); 
 	 if (targetPlayer) { 

 	//var frame = 0;
			   //var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				  // process : function (ctx.player) {
					//if (frame === 0) {
					//	anim.addSpotAnim(ctx.target, 3402);
			      //  	anim.run(ctx.target, 17542);
				//	} else if (frame == 2) {
				//ctx.target.getModel().setRender(Render.PLAYER);
				//ctx.target.getModel().setRender(Render.NPC);
				//ctx.target.getModel().setNPCId(15782);
				//ctx.target.getModel().refresh();
					//} else if (frame == 3) {
					//	ctx.target.getModel().setRender(Render.PLAYER);
					//	ctx.target.getModel().refresh();
				//	}
				//	frame++;
				//	return false;
			//	},
			//	stop : function (ctx.player) {
				//	anim.stop(player);
				//	api.clearSpotAnim(player, 1);
				//}
		//	});
		//	player.setAction(new Action()); 
		 
	// });
 	 } else { 
 	 chat.sendMessage(ctx.player, "The specified player is not currently in the game world."); 
 	 } 
 	 } else { 
 	 chat.sendMessage(ctx.player, ctx.target+" is not registered on this server."); 
 	 } 
	 }, "No", function() {		
	 });
	 }, "Cancel", function() {
	 });
     });
     scriptManager.bind(EventType.OPHELD1, 5733, function (ctx) {//Eat Option
     multi5(ctx.player, "Eat", "Transform me", function () {
	 ctx.player.getModel().setRender(Render.NPC);
	 ctx.player.getModel().setNPCId(49);
	 ctx.player.getModel().refresh();
	 }, "Change me back.", function () {
	 ctx.player.getModel().setRender(Render.PLAYER);
	 ctx.player.getModel().refresh();
	 }, "Wipe inventory", function () {
     ENGINE.emptyInv(ctx.player, Inv.BACKPACK);
	 inv.give(ctx.player, 5733, 1);
	 }, "Invisible mode", function () {
	 ctx.player.getModel().setRender(Render.INVISIBLE);
	 ctx.player.getModel().refresh();
	 }, "Spawn aggressive NPC", function () {
	 var npc = ENGINE.createNpc(90, map.getCoords(ctx.player));
	 ENGINE.spawnNpc(npc);
	 });
	 });
	scriptManager.bind(EventType.OPHELD2, 5733, function (ctx) {//Heal Option
	ENGINE.restoreLifePoints(ctx.player);
	chat.sendMessage(ctx.player, "You set your health to max.");
    });
    scriptManager.bind(EventType.OPHELD3, 5733, function (ctx) {//Jmod-Tools
	multi4(ctx.player, "CM-Tool", "Open Bank", function () {
	widget.closeAll(ctx.player);
	widget.openOverlaySub(ctx.player, 1017, 762, false);
	}, "Max Stats", function () {
	for (var skill=0; skill < 27; skill++) {
	stat.giveXp(ctx.player, skill, 140344310);
	}
	}, "Clear Title", function () {
	ctx.player.getModel().setPrefixTitle("");
	ctx.player.getModel().refresh();
	}, "Log Out", function () {
	});
    });
	scriptManager.bind(EventType.OPHELD4, 5733, function (ctx) {//Commands list
	multi5(ctx.player, "How would you like to be logged?", "Keep me logged in.", function () {
    }, "Kick me out.", function () {
	ENGINE.kickPlayer(ctx.player, true);
	}, "Never mind logging, just wipe my bank.", function () {
	ENGINE.emptyInv(ctx.player, Inv.BANK);
	chat.sendMessage(ctx.player, "Bank is now clear!");
	}, "QP Cape please!", function () {
	if (inv.freeSpace(ctx.player, Inv.BACKPACK) < 1) {
	chat.sendMessage(ctx.player, "Not enough space in your inventory.");
	return;
	}
	inv.give(ctx.player, 9813, 1);
	}, "QP Hood Please!", function () {
	if (inv.freeSpace(ctx.player, Inv.BACKPACK) < 1) {
	chat.sendMessage(ctx.player, "Not enough space in your inventory.");
	return;
	}
	inv.give(ctx.player, 9814, 1);
	});
    });		
		
	}


})();
