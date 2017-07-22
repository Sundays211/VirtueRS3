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
/* globals EventType, Inv */
var anim = require('anim');
var inv = require('inv');
var map = require('map');
var coords = require('map/coords');
var chat = require('chat');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPWORN1, [1708,1710,1712], function (ctx) {//Edgeville
			chat.sendMessage(ctx.player, "you use a charge");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3086, 3502, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, ctx.item-2, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN2, [1708,1710,1712], function (ctx) {//Karamja
			chat.sendMessage(ctx.player, "you use a charge");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(2918, 3176, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, ctx.item-2, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN3, [1708,1710,1712], function (ctx) {//Draynor Village
			chat.sendMessage(ctx.player, "you use a charge");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3081, 3251, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, ctx.item-2, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN4, [1708,1710,1712], function (ctx) {//Al Kharid
			chat.sendMessage(ctx.player, "you use a charge");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3304, 3124, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, ctx.item-2, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN1, 1706, function (ctx) {//Edgeville
			chat.sendMessage(ctx.player, "<col=ff0000>You use your amulet's last charge.</col>");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3086, 3502, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, 1704, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN2, 1706, function (ctx) {//Karamja
			chat.sendMessage(ctx.player, "<col=ff0000>You use your amulet's last charge.</col>");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(2918, 3176, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, 1704, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN3, 1706, function (ctx) {//Draynor Village
			chat.sendMessage(ctx.player, "<col=ff0000>You use your amulet's last charge.</col>");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3081, 3251, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, 1704, 1); 
			});
		});
		
		scriptManager.bind(EventType.OPWORN4, 1706, function (ctx) {//Al Kharid
			chat.sendMessage(ctx.player, "<col=ff0000>You use your amulet's last charge.</col>");//get right Message
			anim.addSpotAnim(ctx.player, 1684);	
			anim.run(ctx.player, 9603, function () {
				map.setCoords(ctx.player, coords(3304, 3124, 0));
				anim.run(ctx.player, -1);
				inv.setSlot(ctx.player, Inv.EQUIPMENT, ctx.slot, 1704, 1); 
			});
		});
	}

})();