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
//var component = require('../../widget/component');
var varp = require('../../core/var/player');

var util = require('../../core/util');
var widget = require('../../widget');

var logic = require('./logic');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
module.exports = (function () {
	return {
		init : init
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
			default:
				util.defaultHandler(ctx, "action bar");
			}
		});
	}
	
	function refreshSlotEvents (player) {
		//Slot 1
		widget.setEvents(player, 1430, 57, -1, -1, 11108350);
		widget.setEvents(player, 1430, 62, -1, -1, 11108350);
		
		//Slot 2
		widget.setEvents(player, 1430, 70, -1, -1, 11108350);
		widget.setEvents(player, 1430, 75, -1, -1, 11108350);
		
		//Slot 3
		widget.setEvents(player, 1430, 83, -1, -1, 11108350);
		widget.setEvents(player, 1430, 88, -1, -1, 11108350);
		
		//Slot 4
		widget.setEvents(player, 1430, 96, -1, -1, 11108350);
		widget.setEvents(player, 1430, 101, -1, -1, 11108350);
		
		//Slot 5
		widget.setEvents(player, 1430, 109, -1, -1, 11108350);
		widget.setEvents(player, 1430, 114, -1, -1, 11108350);
		
		//Slot 6
		widget.setEvents(player, 1430, 122, -1, -1, 11108350);
		widget.setEvents(player, 1430, 127, -1, -1, 11108350);
		
		//Slot 7
		widget.setEvents(player, 1430, 135, -1, -1, 11108350);
		widget.setEvents(player, 1430, 140, -1, -1, 11108350);
		
		//Slot 8
		widget.setEvents(player, 1430, 148, -1, -1, 11108350);
		widget.setEvents(player, 1430, 153, -1, -1, 11108350);
		
		//Slot 9
		widget.setEvents(player, 1430, 161, -1, -1, 11108350);
		widget.setEvents(player, 1430, 166, -1, -1, 11108350);
		
		//Slot 10
		widget.setEvents(player, 1430, 174, -1, -1, 11108350);
		widget.setEvents(player, 1430, 179, -1, -1, 11108350);
		
		//Slot 11
		widget.setEvents(player, 1430, 187, -1, -1, 11108350);
		widget.setEvents(player, 1430, 192, -1, -1, 11108350);
		
		//Slot 12
		widget.setEvents(player, 1430, 200, -1, -1, 11108350);
		widget.setEvents(player, 1430, 205, -1, -1, 11108350);
		
		//Slot 13
		widget.setEvents(player, 1430, 213, -1, -1, 2098176);
		widget.setEvents(player, 1430, 218, -1, -1, 2098176);
		
		//Slot 14
		widget.setEvents(player, 1430, 228, -1, -1, 2098176);
		widget.setEvents(player, 1430, 233, -1, -1, 2098176);
	}
})();
