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

var dialog = require('dialog');
var util = require('util');
//var anim = require('anim');
var varbit = require('engine/var/bit');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		//hide old man varbit 17975 
		//show cat varbit 17976
		//npc id cat 16849
	   scriptManager.bind(EventType.OPNPC1, 16872, function (ctx) {
	        dialog.builder(ctx.player).chatnpc(16873, "You'll do, "+ util.getName(ctx.player)+"!")
			.chatplayer("Me? I didn't do anything... Erm, I mean, I'll do for what?")
			.chatnpc(16873, "Don't worry! I'm not going to abduct you or<br> anything...honest!")
			.chatnpc(16873, "Nor will any of my other random friends!")
			    .multi5("WHAT WOULD YOU LIKE TO ASK THE MYSTERIOUS OLD MAN?", "Tell me about yourself.", function () {
			    }, "Ask about his 'random' friends.", function () {	
			    }, "What's in the trapdoor?", function () {
				}, "Why mention abductions?", function () {
				    dialog.builder(ctx.player).chatnpc(16873, "Oh, sorry - you may not know that about me. It's<br> something I used to do in my old job - there were a few of<br> us.")	  
			        .chatplayer("You abducted people?")
			        .chatnpc(16873, "You don't have to say it like that! It wasn't sinister; we<br> provided a valuable service!")
			        .chatnpc(16873, "We'd give people a little break from whatever it is they<br> were doing, and keep them attentive and active.") 
				    .chatnpc(16873, "Plus, we'd hand out prizes for those who completed our<br> games.")
				    .chatnpc(16873, "Well, there was one of us who was a bit sinister. He was<br> evil and lazy, and would toy with his victims like a cat with<br> a ball of wool.")
				    .chatnpc(16873, "I hear you can still summon him, if you say three letters<be> in a sequence.")
				    .chatplayer("Sounds like an urban myth to me. What letters?")
				    .chatnpc(16873, "C...")
				    .chatnpc(16873, "I...")
				    .chatnpc(16873, "...")
				    .chatplayer("And? What's the last letter?")
				    .chatnpc(16873, "...")
				    .chatplayer("Say it!")
				    .chatnpc(16873, "S!")
				    .then(function () {
					 varbit(ctx.player, 17976, 1);
					 //anim.addSpotAnim(16849, 1, 74);
				    });	
				}, "I really must be going.", function () {
	            });
	   });	

	}
	
})();
