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
var component = require('../../widget/component');
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var util = require('../../core/util');
var widget = require('../../widget');

var logic = require('./logic');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
module.exports = (function () {
	return {
		init : init,
		dragOnto : dragOnto
	};
	
	function init (scriptManager) {
		//Script 11799 = get action bar interface ID by hud slot
		//Script 8447 = Set action bar value
		//Script 6995 = Update action bar value
		//Script 11797 = Action bar variables
		//Script 11800 = Active action bar variables
		scriptManager.bind(EventType.IF_OPEN, 1430, function (ctx) {
			var player = ctx.player;
			//1 = 57
			//2 = 70
			//3 = 83
			//4 = 96
			//5 = 109
			//6 = 122
			//7 = 135
			//8 = 148
			//9 = 161
			//10 = 174
			//11 = 187
			//12 = 200
			//13 = 213
			//14 = 228
			
			util.runClientScript(player, 8320, [1032]);
			util.runClientScript(player, 8320, [1033]);
			util.runClientScript(player, 8320, [1034]);
			util.runClientScript(player, 8320, [1035]);
			
			refreshSlotEvents(ctx.player);
			
			widget.setEvents(player, 1458, 33, 0, 35, 8388610);
			widget.setEvents(player, 1430, 14, -1, -1, 8388608);
			widget.setEvents(player, 1505, 4, -1, -1, 8388608);
			widget.setEvents(player, 1465, 49, -1, -1, 8388608);
			widget.setEvents(player, 1430, 8, -1, -1, 8650758);
			widget.setEvents(player, 1504, 6, -1, -1, 8388608);
			widget.setEvents(player, 1430, 19, -1, -1, 8388608);
			widget.setEvents(player, 1506, 0, -1, -1, 8388608);
			//widget.setEvents(player, 1460, 1, 0, 187, 8485894);
			//widget.setEvents(player, 1452, 1, 0, 187, 8485894);
			//widget.setEvents(player, 1461, 1, 0, 187, 8485958);
			//widget.setEvents(player, 1449, 1, 0, 187, 8485894);
			//widget.setEvents(player, 590, 8, 0, 196, 8388614);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1430, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 50://Toggle auto-retaliate
				varp(player, 462, varp(player, 462) ? 0 : 1);
				return;
			case 57://Slot 1
				logic.handleActionBarButton(player, 1, ctx.button);
				return;
			case 70://Slot 2
				logic.handleActionBarButton(player, 2, ctx.button);
				return;
			case 83://Slot 3
				logic.handleActionBarButton(player, 3, ctx.button);
				return;
			case 96://Slot 4
				logic.handleActionBarButton(player, 4, ctx.button);
				return;
			case 109://Slot 5
				logic.handleActionBarButton(player, 5, ctx.button);
				return;
			case 122://Slot 6
				logic.handleActionBarButton(player, 6, ctx.button);
				return;
			case 135://Slot 7
				logic.handleActionBarButton(player, 7, ctx.button);
				return;
			case 148://Slot 8
				logic.handleActionBarButton(player, 8, ctx.button);
				return;
			case 161://Slot 9
				logic.handleActionBarButton(player, 9, ctx.button);
				return;
			case 174://Slot 10
				logic.handleActionBarButton(player, 10, ctx.button);
				return;
			case 187://Slot 11
				logic.handleActionBarButton(player, 11, ctx.button);
				return;
			case 200://Slot 12
				logic.handleActionBarButton(player, 12, ctx.button);
				return;
			case 213://Slot 13
				logic.handleActionBarButton(player, 13, ctx.button);
				return;
			case 228://Slot 14
				logic.handleActionBarButton(player, 14, ctx.button);
				return;
			case 254://Lock action bar
				varbit(player, 1892, varbit(player, 1892) ? 0 : 1);
				refreshSlotEvents(player);
				return;
			case 256://Combat settings
				varbit(player, 18997, 6);//Combat Settings tab
				widget.openOverlay(player, 2);//Powers overlay
				return;
			default:
				util.defaultHandler(ctx, "action bar");
			}
		});
		
		scriptManager.bind(EventType.IF_DRAG, [ component(1430, 57), component(1430, 70), 
				component(1430, 83), component(1430, 96), component(1430, 109), component(1430, 122), 
				component(1430, 135), component(1430, 148), component(1430, 161), component(1430, 174), 
				component(1430, 187), component(1430, 200), component(1430, 213), component(1430, 228)
					], function (ctx) {
			var srcSlot = slotFromComponent(ctx.fromHash);
			var targetSlot = slotFromComponent(ctx.toHash);
			if (srcSlot != -1 && targetSlot != -1) {
				logic.swapActions(ctx.player, srcSlot, targetSlot);
				refreshSlotEvents(ctx.player);
			} else if (srcSlot != -1 && ctx.toHash === 96796685) {
				logic.clearAction(ctx.player, srcSlot);
				refreshSlotEvents(ctx.player);
			}
		});
	}
	
	function slotFromComponent (hash) {
		if (widget.getId(hash) != 1430) {
			return -1;
		}
		switch (widget.getComponent(hash)) {
		case 57://Slot 1
			return 1;
		case 70://Slot 2
			return 2;
		case 83://Slot 3
			return 3;
		case 96://Slot 4
			return 4;
		case 109://Slot 5
			return 5;
		case 122://Slot 6
			return 6;
		case 135://Slot 7
			return 7;
		case 148://Slot 8
			return 8;
		case 161://Slot 9
			return 9;
		case 174://Slot 10
			return 10;
		case 187://Slot 11
			return 11;
		case 200://Slot 12
			return 12;
		case 213://Slot 13
			return 13;
		case 228://Slot 14
			return 14;
		default:
			return -1;
		}
	}
	
	function refreshSlotEvents (player) {
		var events;
		
		//Slot 1
		events = getEvents(player, 1);
		widget.setEvents(player, 1430, 57, -1, -1, events);
		widget.setEvents(player, 1430, 62, -1, -1, events);
		
		//Slot 2
		events = getEvents(player, 2);
		widget.setEvents(player, 1430, 70, -1, -1, events);
		widget.setEvents(player, 1430, 75, -1, -1, events);
		
		//Slot 3
		events = getEvents(player, 3);
		widget.setEvents(player, 1430, 83, -1, -1, events);
		widget.setEvents(player, 1430, 88, -1, -1, events);
		
		//Slot 4
		events = getEvents(player, 4);
		widget.setEvents(player, 1430, 96, -1, -1, events);
		widget.setEvents(player, 1430, 101, -1, -1, events);
		
		//Slot 5
		events = getEvents(player, 5);
		widget.setEvents(player, 1430, 109, -1, -1, events);
		widget.setEvents(player, 1430, 114, -1, -1, events);
		
		//Slot 6
		events = getEvents(player, 6);
		widget.setEvents(player, 1430, 122, -1, -1, events);
		widget.setEvents(player, 1430, 127, -1, -1, events);
		
		//Slot 7
		events = getEvents(player, 7);
		widget.setEvents(player, 1430, 135, -1, -1, events);
		widget.setEvents(player, 1430, 140, -1, -1, events);
		
		//Slot 8
		events = getEvents(player, 8);
		widget.setEvents(player, 1430, 148, -1, -1, events);
		widget.setEvents(player, 1430, 153, -1, -1, events);
		
		//Slot 9
		events = getEvents(player, 9);
		widget.setEvents(player, 1430, 161, -1, -1, events);
		widget.setEvents(player, 1430, 166, -1, -1, events);
		
		//Slot 10
		events = getEvents(player, 10);
		widget.setEvents(player, 1430, 174, -1, -1, events);
		widget.setEvents(player, 1430, 179, -1, -1, events);
		
		//Slot 11
		events = getEvents(player, 11);
		widget.setEvents(player, 1430, 187, -1, -1, events);
		widget.setEvents(player, 1430, 192, -1, -1, events);
		
		//Slot 12
		events = getEvents(player, 12);
		widget.setEvents(player, 1430, 200, -1, -1, events);
		widget.setEvents(player, 1430, 205, -1, -1, events);
		
		//Slot 13
		events = getEvents(player, 13);
		widget.setEvents(player, 1430, 213, -1, -1, events);
		widget.setEvents(player, 1430, 218, -1, -1, events);
		
		//Slot 14
		events = getEvents(player, 14);
		widget.setEvents(player, 1430, 228, -1, -1, events);
		widget.setEvents(player, 1430, 233, -1, -1, events);
	}
	
	function getEvents(player, slot) {
		return logic.hasAction(player, slot) ? (varbit(player, 1892) ? 2195454 : 11108350) : 2098176;
	}
	
	function dragOnto (player, destHash, srcType, srcSlot) {
		var destPos = slotFromComponent(destHash);
		if (destPos !== -1) {
			logic.setAction(player, destPos, srcType, srcSlot);
			refreshSlotEvents(player);
		}
	}
})();
