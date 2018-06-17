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
var component = require('shared/widget/component');
var varbit = require('engine/var/bit');
var varp = require('engine/var/player');

var widget = require('shared/widget');
var util = require('shared/util');

var logic = require('shared/widget/overlay');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1477, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 39://Lock/unlock interfaces
				var locked = varbit(player, 19925) === 1;
				varbit(player, 19925, locked ? 0 : 1);
				return;
			case 45://Sheathing (TODO: Find which varp/varbit controls this)
				player.switchSheathing();
				break;
			case 71://Logout
				varp(player, 3813, 6);
				widget.open(player, 1477, 853, 26, true);
				return;
			case 496://Overlay tab switch
				switch (ctx.slot) {
				case 3:
					logic.setTab(player, 1);
					return;
				case 7:
					logic.setTab(player, 2);
					return;
				case 11:
					logic.setTab(player, 3);
					return;
				case 15:
					logic.setTab(player, 4);
					return;
				case 19:
					logic.setTab(player, 5);
					return;
				case 23:
					logic.setTab(player, 6);
					return;
				}
				return;
			case 499://Overlay close button
				logic.close(player);
				return;
			default:
				util.defaultHandler(ctx, "overlay");
				return;
			}
		});

		scriptManager.bind(EventType.IF_DRAG, [ component(1477, 251), component(1477, 89),
			component(1477, 295), component(1477, 164), component(1477, 186), component(1477, 328),
			component(1477, 118), component(1477, 100), component(1477, 127), component(1477, 136),
			component(1477, 78), component(1477, 154), component(1477, 145), component(1477, 262),
			component(1477, 306), component(1477, 219), component(1477, 197), component(1477, 208),
			component(1477, 230) ], function () {
				//Do nothing as this is handled on the client side
		});
	}
})();
