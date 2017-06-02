/**
 * Copyright (c) 2014 Virtue Studios
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
var map = require('../../core/map');
var chat = require('../../chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, 2465, function (ctx) {
			map.teleport(ctx.player, 3129, 3407, 0);//Air exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2466, function (ctx) {
			map.teleport(ctx.player, 2980, 3515, 0);//Mind exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2467, function (ctx) {
			map.teleport(ctx.player, 3157, 3160, 0);//Water exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2468, function (ctx) {
			map.teleport(ctx.player, 3304, 3476, 0);//Earth exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2469, function (ctx) {
			map.teleport(ctx.player, 3311, 3257, 0);//Fire exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2470, function (ctx) {
			map.teleport(ctx.player, 3055, 3443, 0);//Body exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2471, function (ctx) {
			map.teleport(ctx.player, 2406, 4379, 0);//Cosmic exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2474, function (ctx) {
			map.teleport(ctx.player, 3059, 3588, 0);//Chaos exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2473, function (ctx) {
			map.teleport(ctx.player, 2867, 3017, 0);//Nature exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2472, function (ctx) {
			map.teleport(ctx.player, 2856, 3379, 0);//Law exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2475, function (ctx) {
			map.teleport(ctx.player, 1863, 4637, 0);//Death exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
		
		scriptManager.bind(EventType.OPLOC1, 2477, function (ctx) {
			map.teleport(ctx.player, 3560, 9779, 0);//Blood exit portal
			chat.sendMessage(ctx.player, "You step through the portal.");		
		});
	}
})();