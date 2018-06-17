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
var util = require('shared/util');
var widget = require('shared/widget');
var varp = require('engine/var/player');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1587, function (ctx) {
    widget.setEvents(ctx.player, 1587, 26, 0, 200, 6);
	widget.setEvents(ctx.player, 1587, 47, 0, 1, 2);
	widget.hide(ctx.player, 1587, 29, true);
	});
	scriptManager.bind(EventType.IF_BUTTON, 1587, function (ctx) {
	switch (ctx.component) {
	case 42://Close button
	return;
	case 26:
	widget.hide(ctx.player, 1587, 29, false);
	widget.setText(ctx.player, 1587, 98, "Are you sure you want to switch to world " + ctx.slot + "?");
	return;
	case 47:
	varp(ctx.player, 4735, 104005679);
	varp(ctx.player, 4734, 7230);
	varp(ctx.player, 4736, 0);
	widget.setEvents(ctx.player, 1477, 801, 0, 3, 2);
	return;
    case 84:
	varp(ctx.player, 20, -1761607680);
	widget.closeSub(ctx.player, 1477, 426);
	widget.open(ctx.player, 1477, 333, 1215, true);
	widget.hide(ctx.player, 1477, 333, false);
	widget.hide(ctx.player, 745, 2, true);
	return;
    case 93:
	widget.openCentral(ctx.player, 1587, false);
	return;
    default:
	util.defaultHandler(ctx, "hop-worlds");
	return;
	}
	});

	}
})();
