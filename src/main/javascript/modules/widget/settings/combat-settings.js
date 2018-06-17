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
var varbit = require('engine/var/bit');
var util = require('shared/util');
var chat = require('shared/chat');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1503, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
            case 2://sheathe
				player.switchSheathing();
				return;
			case 4://special attack
				player.getCombatSchedule().updateAdrenaline(1000);
			    player.getCombatSchedule().setSpecialEnabled(!player.getCombatSchedule().isSpecialEnabled());
				player.getCombatSchedule().setDefaultAttack();
				chat.sendMessage(ctx.player, "Special is " + (player.getCombatSchedule().isSpecialEnabled() ? "enabled." : "disabled."));
				return;
		    case 49://retaliate
				var wasRetaliating = varbit(ctx.player, 462) === 0;
				varbit(ctx.player, 462, wasRetaliating ? 1 : 0);
				return;
		    case 32://attack
		    case 36://balance
		    case 40://strength
		    case 44://defence
		    	util.defaultHandler(ctx, "Combat Settings");
				return;
			default:
				util.defaultHandler(ctx, "Combat Settings");
				return;
			}
		});
	}
})();
