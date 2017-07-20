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
var util = require('util');
var widget = require('widget');
var varbit = require('engine/var/bit');
var config = require('engine/config');
var chat = require('chat');
var varc = require('engine/var/client');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1405, function (ctx) {//Bug report
			switch (ctx.component) {
			case 47://Selected main category
				varbit(ctx.player, 18336, ctx.slot*10);
				var subCats = config.enumValue(7427, ctx.slot);
				if (subCats == -1) {
					varbit(ctx.player, 18337, ctx.slot*10);
				} else {
					var size = config.enumSize(subCats);
					widget.setEvents(ctx.player, 1405, 61, 0, size, 2);
				 	varbit(ctx.player, 18337, 0);
				}
				return;
			case 61://Select sub category
				if (ctx.slot !== 0) {
					varbit(ctx.player, 18337, varbit(ctx.player, 18336) + ctx.slot);
				}
				return;
			case 91://Submit button.
				return;
		    default:
				util.defaultHandler(ctx, "report");
				return;		
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1406, function (ctx) {
			switch (ctx.component) {
			case 16://Report player
				chat.sendMessage(ctx.player, "Player reporting is not yet available.");
				widget.closeAll(ctx.player);
				//widget.openCentral(ctx.player, 594, false);
				return;
			case 24://Report bug
				widget.openCentral(ctx.player, 1405, false);
				return;
		    default:
				util.defaultHandler(ctx, "report");
				return;		
			}
		});
		
		scriptManager.bind(EventType.IF_CLOSE, 1405, function (ctx) {//Bug report
			varbit(ctx.player, 18336, 0);
			varbit(ctx.player, 18337, 0);
		});
		
		scriptManager.bind(EventType.IF_OPEN, 594, function (ctx) {//Player report
			varc(ctx.player, 2578, "");
			widget.hide(ctx.player, 594, 18, false);//Set interface hidden: if=594, comp=18, hidden=0
			varc(ctx.player, 790, 1);//Received varc: key=790, value=1
			varc(ctx.player, 2579, "[My name]");
			widget.hide(ctx.player, 594, 38, false);//Mute option on first screen
			widget.hide(ctx.player, 594, 9, false);//Mute option on second screen
			widget.hide(ctx.player, 594, 28, false);//Another mute option
			util.runClientScript(ctx.player, 7674, []);
		});
		
		scriptManager.bind(EventType.IF_OPEN, 1405, function (ctx) {//Bug report
			varc(ctx.player, 2911, -1);
			util.runClientScript(ctx.player, 187, [1, 4]);
			util.runClientScript(ctx.player, 7657, []);
			widget.setEvents(ctx.player, 1405, 47, 0, 10, 2);//Category select
		});
	}
})();
