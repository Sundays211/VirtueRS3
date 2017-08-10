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
/* globals EventType, */
var dialog = require('dialog');
var _entity = require('engine/entity');
var coords = require('map/coords');
var map = require('map');
var anim = require('anim');
var util = require('util');
module.exports = (function () {
	return {
	init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.OPNPC1, 844, function (ctx) {
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "Hello "+ util.getName(ctx.player)+", I'm Cromperty. Sedridor has told me<br> about you. As a wizard and a inventor, he has aided me in<br> my great invention!") 
		    .multi3("CHOOSE AN OPTION:", "Two jobs? That's got to be tough.", function () {
				dialog.builder(ctx.player).chatplayer("Two jobs? That's got to be tough.")  
				.chatnpc(ctx.npc, "Not when you combine them it isn't! I invent MAGIC things!")
				.multi2("SELECT AN OPTION", "So what have you invented?", function () {
					invented(ctx.player, ctx.npc);
				}, "Well, I shall leave you to your inventing.", function () {  
				    dialog.builder(ctx.player).chatplayer("Well, I shall leave you to your inventing.") 
					.chatnpc(ctx.npc, "Thanks for dropping by! Stop again anytime!")
					.finish();
				}); 
		    }, "So what have you invented?", function () {  
			    invented(ctx.player, ctx.npc);
			}, "Can you teleport me to the Rune Essence?", function () {  
			    dialog.builder(ctx.player).chatplayer("Can you teleport me to the Rune Essence?") 
				.then(function () {
				    teletoessmine(ctx.player, ctx.npc);	
				});	
		    });
		});

		scriptManager.bind(EventType.OPNPC3, 844, function (ctx) {
		    teletoessmine(ctx.player, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC4, 844, function (ctx) {
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "sorry, old chap, I haven't got anything for you.") 
			.mesbox("You must complete the Medium or hard Ardougne tasks to earn<br> Cromperty's rewards.")	 
			.finish(); 	
		});
		
	}
	
	function invented (player, npc) {
	    dialog.builder(player).chatplayer("So what have you invented?") 
        .chatnpc(npc, "Ah! My latest invention is my patent pending teleportation<br> block! It emits a low level magical signal, that will allow me<br> to locate it anywhere in the world, and teleport anything")				
		.chatnpc(npc, "directly to it! I hope to revolutionise the entire<br> teleportation system! Don't you think I'm great? Uh, I<br> mean it's great?")
		.multi3("SELECT AN OPTION", "So where is the other block?", function () {	
		    dialog.builder(player).chatplayer("So where is the other block?") 	
		    .chatnpc(npc, "Well... Hmm. I would guess some where between here and<br> the Wizards' Tower in Misthalin. All I know is that it hasn't<br> got there yet as the wizards there would have contacted<br> me.")
		    .chatnpc(npc,"I'm using the RPDT for delivery. They assured me it would<br> be delivered promptly.") 
		    .multi2("SELECT AN OPTION", "Can I be teleported plaease?", function () {
				teleported(player, npc);	
		    }, "Who are the RPDT?", function () { 
			    dialog.builder(player).chatplayer("Who are the RPDT?") 
				.chatnpc(npc, "The RuneScape Parcel Delivery Team. They come very<br> highly recommended. Their motto is: 'We aim to deliver<br> your stuff at some point after you have paid us!'")
                .finish();
			});
		}, "Can I be teleported plaease?", function () { 
		    teleported(player, npc);
		}, "Well done, That's very clever.", function () { 
		    dialog.builder(player).chatplayer("Well done, That's very clever.") 
			.chatnpc(npc, "Yes it is isn't it? Forgive me for feeling a little smug, this<br> is a major breakthrough in the field of teleportation!")
			.finish();
		});
	}
	
	function teleported (player, npc) {
	    dialog.builder(player).chatplayer("Can I be teleported plaease?") 
	    .chatnpc(npc, "By all means! I'm afraid I can't give you any specifics as<br> to where you will come out however. Presumably wherever<br> the other block is located.")
	    .multi2("SELECT AN OPTION", "Yes, that sounds good. Teleport me!", function () {
			dialog.builder(player).chatplayer("Yes, that sounds good. Teleport me!") 
		    .chatnpc(npc, "Okey dokey! Ready?")
			.then(function () {
			_entity.say(npc, "Dipsolum sententa sententi!");
			anim.addSpotAnim(npc, 108);
			//todo need spotanim 109 going to player
			anim.addSpotAnim(player, 110);
			map.setCoords(player, coords(0,41,51,25,7));
		    });
	    }, "That sounds dangerous. Leave me here.", function () { 	
	        dialog.builder(player).chatplayer("That sounds dangerous. Leave me here.") 
		    .chatnpc(npc, "As you wish.")
		    .finish();
	    });	
	}
	
	function teletoessmine (player, npc) {
		_entity.say(npc, "Senventior disthine molenko!");
		anim.addSpotAnim(npc, 108);
		//todo need spotanim 109 going from npc to player
		anim.addSpotAnim(player, 110);
		map.setCoords(player, coords(0,45,75,31,32));
	}
	
})();
