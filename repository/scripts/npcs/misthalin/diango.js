/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals EventType, Inv */

var dialog = require('dialog');
var varc = require('engine/var/client');
var varp = require('engine/var/player');
var widget = require('widget');
var chat = require('chat');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
	   scriptManager.bind(EventType.OPNPC1, 970, function (ctx) {
	        retrieve(ctx.player);
	   });
	   
	   scriptManager.bind(EventType.OPNPC3, 970, function (ctx) {
		    var player = ctx.player;
	        dialog.builder(player).chatnpc(ctx.npc, "Howdy there, partner.")  
			.chatplayer("Hi, Diango.")
			.chatnpc(ctx.npc, "Want to see my spinning plates or kites? Want to check<br> out my range of party items? Or did you want an item<br> back?")  
	        .multi4("SELECT AN OPTION", "Spinning plates?", function () {
			    dialog.builder(player).chatplayer("Spinning plates?") 	
				.chatnpc(ctx.npc, "That's right - there's a funny story behind them. Their<br> shipment was held up by thieves.") 
				.chatnpc(ctx.npc, "The crate was marked 'Dragon Plates'.<br> Apparently they thought it was some kind of armour,<br> when really it's just a plate with a dragon on it!") 
				.then(function () {
				    openshop(player);
				});
			}, "Wow, a kite!", function () {  
			    dialog.builder(player).chatplayer("Wow, a kite!") 	 
				.chatnpc(ctx.npc, "You're not the first to say that...") 
				.chatplayer("Can I have one, please?") 
				.chatnpc(ctx.npc, "Well, I suppose I did order more then I need... It's yours<br> for the bargain price of 100 coins.")
				.multi2("SELECT AN OPTION", "That's a bargain I'll take one.", function () {
					dialog.builder(player).chatplayer("That's a bargain I'll take one.")  
					.then(function () {
				        openshop(player);
				    });    
				}, "No, thanks, I don't want one.", function () {	
				    dialog.builder(player).chatplayer("No, thanks, I don't want one.")  
					.finish();
				});	
			}, "Party items, you say?", function () {
				dialog.builder(player).chatplayer("Party items, you say?")  
				.chatnpc(ctx.npc, "Yep! In a partnership with my pal Party Pete, we've<br> decided to launch a whole range of partyware to help<br> celebrate the Royal Wedding of the King Black Dragon and<br> the Kalphite Queen. Confetti, bubble makers, fireworks,")
				.chatnpc(ctx.npc, "firecrackers. We even have a commemorative mug!")
				.chatplayer("King Black Dragon and Kalphite... Wait, what?")  
				.chatnpc(ctx.npc, "Er, well, that's what I was told; perhaps our providers got<br> it wrong. Mind you, it wouldn't be the first time. Like, this<br> once, we were due to receive a shipment of dragon mail,<br> and we got a pile of slightly singed letters instead.")
				.chatnpc(ctx.npc, "Anyway, we've got all those items on sale, and I even have<br> a suitable bouquet available on members' worlds for those<br> who want to emulate the happy bride!")
				.chatplayer("She had a bouquet? The Kalphite Queen? Big bug beady-<br> eyed, occasionally flies about when it's not laying eggs...<br> Are we talking about the same creature?")  
				.chatnpc(ctx.npc, "Listen, partner, I'm not the one writing the advertising<br> pitch here. I got the goods and been told what to say in<br> order to sell them. It's not the most convincing pitch I've<br> ever had to do, but, if you ask me, the products don't")
				.chatnpc(ctx.npc, "need a pitch. They speak for themselves. Have a <br> butcher's.")
                .then(function () {
				    openshop(player);
				});  
			}, "I'd like to check my items, please.", function () {
				dialog.builder(player).chatnpc(ctx.npc, "Sure thing, let me just see what you're missing.")  
                .then(function () {
				retrieve(player);
				});
							
	        });		
				
	   });
	   
	   scriptManager.bind(EventType.OPNPC4, 970, function (ctx) {
	        openshop(ctx.player);
	   });
	   
	   scriptManager.bind(EventType.OPNPC5, 970, function (ctx) {//redeem code
	        dialog.builder(ctx.player).chatplayer("I'd like to redeem an item code, please.")  
	        .chatnpc(ctx.npc, "Of course. Here you go.") 
			.requestString("Please enter the redemption code.").then(function (code) {
				chat.sendMessage(ctx.player, "Please wait while the code is being processed.");	
				chat.sendMessage(ctx.player, "processing.....");	
				if (code == "0800488449") {//Treborn the Butterfly
				    dialog.builder(ctx.player).chatnpc(ctx.npc, "Congratulations! I've completely forgotten what I was<br> talking about.") 
					.chatplayer("Thanks! I can't remember either.")
					.finish();
					//todo add code to unlock
					chat.sendMessage(ctx.player, "You have unlocked a new pet, Treborn the Butterfly.");
				    //chat.sendMessage(ctx.player, "This code is no longer valid.");	
				} else if (code == "rflivestream2016") {//Honourable Foo Lion
				    //todo add code to unlock
				    chat.sendMessage(ctx.player, "You can now summon the RuneFest Foo Lion pet.");   
                    chat.sendMessage(ctx.player, "Your code has been succesfully processed."); 					
				    //chat.sendMessage(ctx.player, "This code is no longer valid."); 
				} else if (code == "28052016") {//Yak Scythe
				    dialog.builder(ctx.player).chatnpc(ctx.npc, "Congratulations! You've now unlocked the Yak Scythe<br> Override in your wardrobe.") 
					.chatplayer("Thanks! That's a scythe of relief.")
					.finish(); 
					//todo add code to unlock
					chat.sendMessage(ctx.player, "Your code has been succesfully processed.");
				} else {
				    chat.sendMessage(ctx.player, "Your code was not valid. Please check it and try again.");		
				}	
			});		
	   
	   });
	}
	
	function retrieve (player) {
	    widget.openCentral(player, 1387);
	}
	
	
	function openshop (player) {
      varp(player, 304, Inv.DIANGOS_TOY_STORE);
	  varc(player, 2360, "Diango's Toy Store");
	  widget.openCentral(player, 1265);
	}
	
	
})();
