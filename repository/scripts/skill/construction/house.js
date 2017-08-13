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
/* globals EventType */
var _map = require('engine/map');

var entityMap = require('map/entity');
var coords = require('map/coords');
var chat = require('chat');
var dialog = require('dialog');

//397 = Furnature creation (flatpacks)
//402 = (Possibly) Room creation
//1306 = Furnature creation #2
//1665 = house settings 
//879 = pet house
//399 = there's no place like home
//1613 = aquarium planning
var houseBuilder = require('./house-builder');

module.exports = (function () {
	return {
		init : init,
		enter : enterHouse
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {
			dialog.multi4(ctx.player, "SELECT AN OPTION", "Go to your house.", function () {
				chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
				//enterHouse(ctx.player);
			}, "Go to your house (building mode).", function () {
				chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
				chat.sendMessage(ctx.player, "Build mode is not yet supported.");
			}, "Go to a friend's house.", function () {
				joinHouse(ctx.player);
			}, "Never mind.", function () {
			});
		});
		
		scriptManager.bind(EventType.OPLOC2, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//your house
			chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
			//enterHouse(ctx.player);
		});
		
		scriptManager.bind(EventType.OPLOC3, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//Build mode
			chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
			chat.sendMessage(ctx.player, "Build mode is not yet supported.");
		});
		
		scriptManager.bind(EventType.OPLOC4, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//friend's house
			joinHouse(ctx.player);
		});
		
		scriptManager.bind(EventType.OPNPC1, [ 4247, 20105], function (ctx) {//estate agent talk
			dialog.builder(ctx.player).chatnpc(ctx.npc, "Hello. Welcome to RuneScape Housing Agency! What<br> can I do for you?")
			.then(function () {
				buyhouse(ctx.player, ctx.npc);
			});
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 4247, 20105], function (ctx) {//estate agent redecorate
			dialog.builder(ctx.player).chatnpc(ctx.npc, "Hm, you don't seem to have a house that I can<br> redecorate. Perhaps you would like to buy a house first?")
			.then(function () {
				buyhouse(ctx.player, ctx.npc);
			});
		});
		
	}

	function buyhouse (player, npc) {
		dialog.builder(player).multi2("SELECT AN OPTION", "How can I get a house?", function () {
			dialog.builder(player).chatnpc(npc,"I can sell you a starting house in Taverley for 1,000 coins.<br> As your Construction level increases, you will be able to<br> move your house to other areas and redecorate it in<br> other styles.")
			.chatnpc(npc,"Do you wont to buy a starter house?")
			.multi2("SELECT AN OPTION", "Yes please!", function () {
			}, "No thanks", function () {
				dialog.builder(player).chatnpc(npc,"Well enjoy your player-owned cardboard box or wherever<br> you're going to sleep tonight!") 
				.finish();
			});
		}, "Tell me about houses", function () {
			dialog.builder(player).chatplayer("Tell me about houses!")
				.chatnpc(npc,"It all came out of the wizards' experiments. They found a<br> way to fold space, so that they could pack many acres of<br> land into an area only a foot across.")  
				.chatnpc(npc,"They created several folded-space regions across<br> RuneScape. Each one contains hundreds of small plots<br> where people can build houses.")  
				.chatplayer("Ah, so that's how everyone can have a house without<br> them cluttering up the world!") 
				.chatnpc(npc,"Quite. The wizards didn't want to get bogged down in the<br> business side of things so they hired me to sell the houses.") 
				.chatnpc(npc,"There are various other people across RuneScape who can<br> help you furnish your house. You should start by buying<br> planks from the sawmill operator in Varrock.") 
				.finish();
		});
	}

	function enterHouse (player) {
		var house = _map.createDynamicSquare();
		houseBuilder.buildHouse(player, house);
		var houseCoords = _map.getCoords(house);
		var destCoords = coords(houseCoords, 8, 8, 1);
		entityMap.setCoords(player, destCoords);
		player.setHouse(house);
		chat.sendMessage(player, "Welcome to your house!");
	}

	function joinHouse(player) {
		var message = "Enter name:";
		dialog.requestPlayer(player, message, function (targetPlayer) {
			entityMap.setCoords(player, entityMap.getCoords(targetPlayer));
			//chat.sendMessage(player, "They do not seem to be at home.");
			//chat.sendMessage(player, "That player is offline, or has privacy mode enabled.");
			//chat.sendMessage(player, "They don't own a house.");
		}); 
	}
})();
