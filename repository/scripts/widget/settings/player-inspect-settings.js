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
var varp = require('../../core/var/player');
var varc = require('../../core/var/client');

var util = require('../../core/util');
var widget = require('../common');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1561, function (ctx) {
			var messsage = varc(ctx.player, 4982);
			varc(ctx.player, 4670, messsage);
			//varcstr id=4670, value=
			widget.setEvents(ctx.player, 1561, 35, 0, 22, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1561, function (ctx) {
			switch (ctx.component) {
			case 21://Enter new message
				widget.inframeInput(ctx.player, 1561, 18, function (value) {
					if (value.length > 80) {
						value = value.substring(0, 80);
					}
					varp(ctx.player, 4982, value);
					varc(ctx.player, 4670, value);
				}, 9, 80);
				return;
			case 30://Close
				return;
			case 40://Clear message
				varp(ctx.player, 4982, "");
				varc(ctx.player, 4670, "");
				return;
			//case 35://Set status
			//	widget.setEvents(ctx.player, 1477, 867, 0, 10, 2);
				//IF events: if=1477, comp=867, from=0, to=11, events=2
			//case 45://Toggle privacy mode
			default:
				util.defaultHandler(ctx, "examine settings");
				return;
			}	
		});
	}
})();
