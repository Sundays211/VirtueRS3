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
/* globals EventType */
var coords = require('map/coords');

var chat = require('chat');
var map = require('map');
var coords = require('map/coords');
var util = require('util');

module.exports = (function () {
	return {
		init : init
	};
	function init (scriptManager) {
		
		//Surfboard anim 26597
		scriptManager.bind(EventType.OPLOC1, 97278, function (ctx) {//Beach ball rolling portal
			if (util.mapMembers()){
				map.setCoords(ctx.player, coords(0, 19, 83, 30, 7));
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to participate in beach ball rolling."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, [97313, 97318, 97320,  97323, 97326], function (ctx) {//palm tree
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to pick tropical coconuts."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 104332, function (ctx) {//Hook-a-Duck
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to play hook a duck."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 97424, function (ctx) {//Lumbridge Sandcastle
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to build sandcastles."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 97416, function (ctx) {//Wizards sandtower
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to build sandcastles."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 109550, function (ctx) {//Sand pyramid
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to build sandcastles."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 97420, function (ctx) {//Sand Exchange
			if (util.mapMembers()){
				chat.sendMessage(ctx.player, "todo"); 
			} else {
				chat.sendMessage(ctx.player, "You need to be on a members' world to build sandcastles."); 
			}
		});

		scriptManager.bind(EventType.OPLOC1, 97381, function (ctx) {//Deck chair
			//anim 26601 getting on chair
			//anim 26602 staying on
			//anim 26603 getting off
			chat.sendMessage(ctx.player, "todo"); 
		});
	}

})();