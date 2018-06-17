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
var component = require('shared/widget/component');

var config = require('engine/config');
var widget = require('shared/widget');

var abilities = require('shared/combat/abilities');
var actionBar = require('./action-bar');

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
		scriptManager.bind(EventType.IF_OPEN, 1452, function (ctx) {
			widget.setEvents(ctx.player, 1452, 1, 0, 187, 10320902);
			widget.setEvents(ctx.player, 1452, 7, 0, 16, 2);
		});

		scriptManager.bind(EventType.IF_BUTTON1, component(1452, 1), function (ctx) {
			var abilityId = config.enumValue(6738, ctx.slot);
			abilities.run(ctx.player, abilityId);
		});

		scriptManager.bind(EventType.IF_DRAG, component(1452, 1), function (ctx) {
			var hash = ctx.toHash;
			if (widget.getId(hash) == 1430) {
				actionBar.dragOnto(ctx.player, hash, 5, ctx.fromslot);
			}
		});
	}
})();
