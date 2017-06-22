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
/* globals EventType, ENGINE */
var anim = require('anim');
var chat = require('chat');
var map = require('map');
var inv = require('inv');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		 scriptManager.bind(EventType.OPNPC1, [17101, 17102], function (ctx) {//Dance to Party/Masterwork Music Boxs
			 anim.run(ctx.player, 20156);
			 chat.sendMessage(ctx.player, "You start to dance to the music.");
		 });
		 
	     scriptManager.bind(EventType.OPNPC1, [18528], function (ctx) {//Dance to Morytanian Music Box
			 anim.run(ctx.player, 21846);
			 chat.sendMessage(ctx.player, "You start to dance to the music.");
		 });
	     
		 scriptManager.bind(EventType.OPNPC1, [18529], function (ctx) {//Dance to Kharidian Music Box
			 anim.run(ctx.player, 21847);
			 chat.sendMessage(ctx.player, "You start to dance to the music.");
		 });
		 
		 scriptManager.bind(EventType.OPNPC3, [17101, 17102], function (ctx) {//Listen to Party/Masterwork Music Boxs
			 chat.sendMessage(ctx.player, "This option is unavailable.");
		 });

	     scriptManager.bind(EventType.OPNPC3, [18528], function (ctx) {//Listen to Morytanian Music Box
	    	 chat.sendMessage(ctx.player, "This option is unavailable.");
		 });
	     
		 scriptManager.bind(EventType.OPNPC3, [18529], function (ctx) {//Listen to Kharidian Music Box
			 chat.sendMessage(ctx.player, "This option is unavailable.");
		 });
		 
		 scriptManager.bind(EventType.OPNPC4, [17102], function (ctx) {//Pickup Masterwork Music Box
			 if (!ctx.npc.isOwner(ctx.player)) {
				 chat.sendMessage(ctx.player, "You are not the owner of this Music Box.");
				 return;
			 }
			 ctx.npc.destroy();
			 ctx.player.setPet(null);
			 inv.give(ctx.player, 28142, 1);
		 });

	     scriptManager.bind(EventType.OPNPC4, [18528], function (ctx) {//Pickup Morytanian Music Box
	    	if(!ctx.npc.isOwner(ctx.player)) {
				chat.sendMessage(ctx.player, "You are not the owner of this Music Box.");
				return true;
			}
			ctx.npc.destroy();
			ctx.player.setPet(null);
			inv.give(ctx.player, 29952, 1);
		 });
	     
		 scriptManager.bind(EventType.OPNPC4, [18529], function (ctx) {//Pickup Kharidian Music Box
			if(!ctx.npc.isOwner(ctx.player)) {
				chat.sendMessage(ctx.player, "You are not the owner of this Music Box.");
				return true;
			}
			ctx.npc.destroy();
			ctx.player.setPet(null);
			inv.give(ctx.player, 29954, 1);
		 });
		 
		 scriptManager.bind(EventType.OPHELD1, [28142], function (ctx) {//put down Masterwork Music Box
			var npc = ENGINE.createNpc(17102, map.getCoords(ctx.player));
			if(npc.getOwner() !== null) {
				chat.sendMessage(ctx.player, "You already have a music box out.");
			} else {
			   npc.setOwner(ctx.player);
			   ENGINE.spawnNpc(npc);
			   anim.run(ctx.player, 827);
			   inv.take(ctx.player, 28142, 1);
			   ENGINE.moveAdjacent(ctx.player);
			}
		 });
		 
		 scriptManager.bind(EventType.OPHELD1, [29952], function (ctx) {//put down Morytanian Music Box
			var npc = ENGINE.createNpc(18528, map.getCoords(ctx.player));
			if (npc.getOwner() !== null) {
				chat.sendMessage(ctx.player, "You already have a music box out.");
			} else {
			   npc.setOwner(ctx.player);
			   ENGINE.spawnNpc(npc);
			   anim.run(ctx.player, 827);
			   inv.take(ctx.player, 29952, 1);
			   ENGINE.moveAdjacent(ctx.player);
			}
		 });
		 
	     scriptManager.bind(EventType.OPHELD1, [29954], function (ctx) {//put down Kharidian Music Box
	    	var npc = ENGINE.createNpc(18529, map.getCoords(ctx.player));
			if(npc.getOwner() !== null) {
				chat.sendMessage(ctx.player, "You already have a music box out.");
			} else {
			   npc.setOwner(ctx.player);
			   ENGINE.spawnNpc(npc);
			   anim.run(ctx.player, 827);
			   inv.take(ctx.player, 29954, 1);
			   ENGINE.moveAdjacent(ctx.player);
			}
		 });
	     
	     scriptManager.bind(EventType.OPHELD1, [28141], function (ctx) {//put down Party Music Box
			 //todo Multiples can be placed at once but they must be at least ten squares away from each other.
			 //The music box disappears after having been placed for an hour.
			 var npc = ENGINE.createNpc(17101, map.getCoords(ctx.player));
			 ENGINE.spawnNpc(npc);
			 anim.run(ctx.player, 827);
			 inv.take(ctx.player, 28141, 1);
			 ENGINE.moveAdjacent(ctx.player);
		 });
	
	}

})();