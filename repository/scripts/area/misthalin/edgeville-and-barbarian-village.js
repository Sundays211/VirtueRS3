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
var chat = require('chat');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPLOC1, 69701, function (ctx) {
	       chat.sendMessage(ctx.player, "East to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69702, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Barbarian Village and Falador.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69697, function (ctx) {
	       chat.sendMessage(ctx.player, "East to Barbarian Village and Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69696, function (ctx) {
	       chat.sendMessage(ctx.player, "North to the monastery, the Dwarven Mine and Ice Mountain.");
	   });
	
	   scriptManager.bind(EventType.OPLOC1, 69700, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Falador, Taverley and Burthorpe.");
	   });
	
	   scriptManager.bind(EventType.OPLOC1, 69648, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Ice Mountain and the Dwarven Mine, also the Black Knights' Fortress.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69645, function (ctx) {
	       chat.sendMessage(ctx.player, "South to Barbarian Village and Draynor.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69644, function (ctx) {
	       chat.sendMessage(ctx.player, "North-east to Edgeville and Varrock's Greand Exchange.");
	   });
	
	   scriptManager.bind(EventType.OPLOC1, 69643, function (ctx) {
	       chat.sendMessage(ctx.player, "North to Edgeville Monastery and the Wilderness.");
	   });
	
	}
})();
