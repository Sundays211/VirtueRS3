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
/* globals EventType, Java */
var ActionBar = Java.type('org.virtue.game.entity.combat.impl.ability.ActionBar');

var anim = require('../../core/anim');
var widget = require('../../widget');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 01/02/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1460, function (ctx) {
			//Melee
			widget.setEvents(ctx.player, 1460, 1, 0, 171, 97286);
			widget.setEvents(ctx.player, 1460, 4, 6, 14, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1460, function (ctx) {
			var ability = ActionBar.getAbilities().get(1460 << 6 | ctx.component);
			if (ability !== null) {
				ctx.player.getCombatSchedule().run(ability);
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1458, function (ctx) {
			var player = ctx.player;//Prayer
			
			if(!player.getCombat().getPrayer().usingPrayer) {
				player.getCombat().getPrayer().activate(ctx.slot);
				anim.run(player, 18018);
			} else {
				player.getCombat().getPrayer().deactivate(ctx.slot);
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1452, function () {
			//Ranged
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1449, function () {
			//Defence
		});
	}
})();
