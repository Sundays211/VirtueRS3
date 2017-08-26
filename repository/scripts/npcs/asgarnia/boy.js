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
/* globals EventType */
var quest = require('../../quest');
var varp = require('engine/var/player');
var dialog = require('dialog');
var util = require('util');
var inv = require('inv');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPNPC1, 895, function (ctx) { 
            var player = ctx.player;
			var npc = ctx.npc;	   
			if(util.mapMembers()){
                if(quest.hasFinished(player, 7)) {	
			        dialog.builder(player).chatnpc(npc, "Thank you for getting my ball back!") 
				    .chatplayer("You're welcome.")
				    .finish();
                } else if(quest.hasStarted(player, 7)) {
					if (inv.has(ctx.player, 2407)) {
						dialog.builder(player).chatplayer("HI, I have got your ball back. It was MUCH harder then I<br> thought it would be.")  
						.chatnpc(npc, "Thank you so much!") 
						.then(function () {
							inv.take(ctx.player, 2407, 1);
							varp(player, 2276, 7);
							//show quest finished
						});
	                } else {
					    dialog.builder(player).chatnpc(npc, "Have you got my ball back yet?") 
					    .chatplayer("Not yet.") 
					    .chatnpc(npc, "Well, it's in the shed in that garden.") 
					    .finish();
					}
				} else {
					dialog.builder(player).chatplayer("Hello young man.")  
					.mesbox("The boy sobs.")
					.multi2("SELECT AN OPTION", "What's the matter?", function () {
					    dialog.builder(player).chatplayer("What's the matter?")	
						.chatnpc(npc, "I've kicked my ball over that hedge, into that garden! The<br> old lady who lives there is scary... She's locked the ball in<br> her wooden shed! Can you get my ball back for me please?") 
						.multi2("SELECT AN OPTION", "Ok, I'll see what i can do.", function () {
							dialog.builder(player).chatplayer("Ok, I'll see what i can do.")  
							.chatnpc(npc, "Thanks mister!") 
							.then(function () {
							    varp(player, 2276, 1);
							});
						}, "Get it back yourself.", function () {	
						    dialog.builder(player).chatplayer("Get it back yourself.") 
							.chatnpc(npc, "You're a meany!") 
							.mesbox("The boy starts crying again.")
							.finish()
                        });
					}, "Well if you're not going to answer. I'll go.", function () {
						dialog.builder(player).chatplayer("Well if you're not going to answer. I'll go.") 
						.mesbox("The boy sniffs slightly.")
				        .finish()
                    });
				}	
			} else {
			    dialog.builder(player).chatplayer("Hello young man.")
				.chatnpc(npc, "Leave me alone...") 
				.finish();	
            }   	
	   });	
	   
	}

	
})();
