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
		scriptManager.bind(EventType.IF_OPEN, 1449, function (ctx) {
			widget.setEvents(ctx.player, 1449, 1, 0, 187, 10320902);
			widget.setEvents(ctx.player, 1449, 7, 0, 16, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1449, 7), function (ctx) {
			//Save selected defence tab
			varbit(ctx.player, 18793, common.tabIdFromSlot(ctx.slot));
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1449, 1), function (ctx) {
			var enumId = -1;
			switch (varbit(ctx.player, 18793)) {
			case 0://Defence
				enumId = 6736;
				break;
			case 1://Constitution
				enumId = 6737;
				break;
			default:
				throw "Unsupported tab: "+varbit(ctx.player, 18793);
			}
			var abilityId = config.enumValue(enumId, ctx.slot);
			common.runAbility(ctx.player, abilityId);
		});
	}
})();
