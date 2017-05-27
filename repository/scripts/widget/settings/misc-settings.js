/**
 * Copyright (c) 2014 Virtue Studios
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
var varbit = require('../../core/var/bit');

var util = require('../../core/util');
var widget = require('../core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1674, function (ctx) {
			widget.setEvents(ctx.player, 1674, 91, 0, 8, 2359296);
			widget.setEvents(ctx.player, 1674, 92, 0, 8, 2);
			widget.setEvents(ctx.player, 1674, 67, 0, 8, 2359296);
			widget.setEvents(ctx.player, 1674, 68, 0, 8, 2);
		});
		
		scriptManager.bind(EventType.IF_DRAG, widget.getHash(1674, 67), function (ctx) {
			if (ctx.toslot >= 0 && ctx.toslot < 8) {
				varbit(ctx.player, 19011, ctx.toslot);
			}
		});
		
		scriptManager.bind(EventType.IF_DRAG, widget.getHash(1674, 91), function (ctx) {
			if (ctx.toslot >= 0 && ctx.toslot < 8) {
				varbit(ctx.player, 19010, ctx.toslot);
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1674, function (ctx) {
			var player = ctx.player;
			var enabled, newIcon;
			switch (ctx.component) {	
			case 17://Destroy empty vials when mixing potions
				enabled = varbit(player, 1723) == 1;
				varbit(player, 1723, enabled ? 0 : 1);
				return;
			case 28://Destroy empty pie dishes when eating
				enabled = varbit(player, 1726) == 1;
				varbit(player, 1726, enabled ? 0 : 1);
				return;
			case 33://Destroy empty bowls when cooking
				enabled = varbit(player, 1724) == 1;
				varbit(player, 1724, enabled ? 0 : 1);
				return;
			case 39://Destroy empty vials when drinking potions	
				enabled = varbit(player, 26774) == 1;
				varbit(player, 26774, enabled ? 0 : 1);
				return;
			case 44://Destroy empty bowls when eating
				enabled = varbit(player, 1725) == 1;
				varbit(player, 1725, enabled ? 0 : 1);
				return;
			case 49://Destroy empty beer glasses when drinking
				enabled = varbit(player, 1727) == 1;
				varbit(player, 1727, enabled ? 0 : 1);
				return;
			case 54://Destroy empty vials when decanting
				enabled = varbit(player, 1728) == 1;
				varbit(player, 1728, enabled ? 0 : 1);
				return;
			case 59://Previous xp cap icon
				newIcon = varbit(player, 19011)-1;
				varbit(player, 19011, newIcon >= 0 ? newIcon : 0);
				return;
			case 64://Next xp cap icon
				newIcon = varbit(player, 19011)+1;
				varbit(player, 19011, newIcon < 8 ? newIcon : 7);
				return;
			case 68://Xp cap icon slider (67 for drag)
				if (ctx.slot >= 0 && ctx.slot < 8) {
					varbit(player, 19011, ctx.slot);
				}
				return;
			case 83://Previous virtual level cap icon
				newIcon = varbit(player, 19010)-1;
				varbit(player, 19010, newIcon >= 0 ? newIcon : 0);
				return;
			case 88://Next virtual level cap icon
				newIcon = varbit(player, 19010)+1;
				varbit(player, 19010, newIcon < 8 ? newIcon : 7);
				return;
			case 92://Virtual level cap icon slider (91 for drag)
				if (ctx.slot >= 0 && ctx.slot < 8) {
					varbit(player, 19010, ctx.slot);
				}
				return;
			case 106://Toggle virtual leveling
				enabled = varbit(player, 19007) == 1;
				varbit(player, 19007, enabled ? 0 : 1);
				return;
			case 111://Toggle gold trim around max stats
				enabled = varbit(player, 19009) == 1;
				varbit(player, 19009, enabled ? 0 : 1);
				return;
			case 116://Destroy empty buckets when farming
				enabled = varbit(player, 29815) == 1;
				varbit(player, 29815, enabled ? 0 : 1);
				return;
			case 121://Destroy empty pot plants
				enabled = varbit(player, 29816) == 1;
				varbit(player, 29816, enabled ? 0 : 1);
				return;
			default:
				util.defaultHandler(ctx, "misc settings");
				return;
			}
		});
	}
})();
