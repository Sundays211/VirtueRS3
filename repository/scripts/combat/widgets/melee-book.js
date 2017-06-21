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
var varbit = require('../../core/var/bit');

var config = require('../../core/config');
var widget = require('../../widget');

var abilities = require('../logic/abilities');
var actionBar = require('./action-bar');
var common = require('./common');

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
		//Script 8426 = ability book options
		
		//Melee ability book
		scriptManager.bind(EventType.IF_OPEN, 1460, function (ctx) {
			widget.setEvents(ctx.player, 1460, 1, 0, 187, 10320902);
			widget.setEvents(ctx.player, 1460, 5, 0, 16, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1460, 5), function (ctx) {
			if (ctx.slot === 11) {
				//Toggle hide
				varbit(ctx.player, 27344, !varbit(ctx.player, 27344) ? 1 : 0);
			} else {
				//Save selected melee tab
				varbit(ctx.player, 18787, common.tabIdFromSlot(ctx.slot));
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1460, 1), function (ctx) {
			//Script 8437 = ability enums
			var enumId = -1;
			switch (varbit(ctx.player, 18787)) {
			case 0://Attack
				enumId = 6734;
				break;
			case 1://Strength
				enumId = 6735;
				break;
			default:
				throw "Unsupported tab: "+varbit(ctx.player, 18787);
			}
			var abilityId = config.enumValue(enumId, ctx.slot);
			abilities.run(ctx.player, abilityId);
		});
		
		scriptManager.bind(EventType.IF_DRAG, component(1460, 1), function (ctx) {
			var hash = ctx.toHash;
			if (widget.getId(hash) == 1430) {
				actionBar.dragOnto(ctx.player, hash, varbit(ctx.player, 18787) ? 2 : 1, ctx.fromslot);
			}
		});
	}
})();
