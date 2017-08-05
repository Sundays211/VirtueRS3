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
		
		scriptManager.bind(EventType.OPLOC1, 69735, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to Ardougne Zoo."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69736, function (ctx) {
			chat.sendMessage(ctx.player, "South-east to Ardougne Monastery, Tower of Life, Port Khazard and Yanille."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69737, function (ctx) {
			chat.sendMessage(ctx.player, "West to the Clocktower."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69738, function (ctx) {
			chat.sendMessage(ctx.player, "East to the Tower of Life."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69739, function (ctx) {
			chat.sendMessage(ctx.player, "South to Ardougne Monastery."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69740, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to the Clocktower and Ardougne."); 
		});
	}
})();
