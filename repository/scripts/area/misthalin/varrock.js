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
		
	   scriptManager.bind(EventType.OPLOC1, 69649, function (ctx) {
	       chat.sendMessage(ctx.player, "North to the Lumber Yard and the Jolly Boar Inn.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69650, function (ctx) {
	       chat.sendMessage(ctx.player, "East to Paterdomus and Morytania.");
	   });	 
	
       scriptManager.bind(EventType.OPLOC1, 69651, function (ctx) {
	       chat.sendMessage(ctx.player, "South-west to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69673, function (ctx) {
	       chat.sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69674, function (ctx) {
	       chat.sendMessage(ctx.player, "South to Al Kharid and the Duel Arena.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69675, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Lumbridge and Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69709, function (ctx) {
	       chat.sendMessage(ctx.player, "North to the Grand Exchange.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69710, function (ctx) {
	       chat.sendMessage(ctx.player, "East to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69711, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Barbarian Village.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69714, function (ctx) {
	       chat.sendMessage(ctx.player, "North-east to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69715, function (ctx) {
	       chat.sendMessage(ctx.player, "South-west to Lumbridge and Draynor.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69716, function (ctx) {
	       chat.sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69717, function (ctx) {
	       chat.sendMessage(ctx.player, "West to the Champions' Guild.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69718, function (ctx) {
	       chat.sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69719, function (ctx) {
	       chat.sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69720, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69721, function (ctx) {
	       chat.sendMessage(ctx.player, "North to the Lumber Yard.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69722, function (ctx) {
	       chat.sendMessage(ctx.player, "South to Al Kharid and Lumbridge.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69723, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69822, function (ctx) {
	       chat.sendMessage(ctx.player, "North to the Cook's Guild and on to the Grand Exchange.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69823, function (ctx) {
	       chat.sendMessage(ctx.player, "East into Varrock.");
	   });	
	
	   scriptManager.bind(EventType.OPLOC1, 69824, function (ctx) {
	       chat.sendMessage(ctx.player, "West to Barbarian Village and Falador.");
	   });	
	
	}
})();
