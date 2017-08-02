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
var util = require('util');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPNPC1, 14747, function (ctx) {
	        dialog.builder(ctx.player).chatplayer("Merry Christmas, Thormac!")
			.chatnpc(ctx.npc, "Merry Christmas "+ util.getName(ctx.player)+"!")
			.chatnpc(ctx.npc, "You have not seen my pet scorpion around here, have<br> you?")
			.chatplayer("No! Sorry, I've had enough of chasing animals for one day<br> thank you.")
			.chatnpc(ctx.npc, "Well, okay. Can you let me know if you find it, please?")
			.chatplayer("Sure.")
			.finish();
	   });	
	   
    }
	
})();
