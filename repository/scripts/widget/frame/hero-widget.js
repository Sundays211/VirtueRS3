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

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1446, function (ctx) {
	widget.setText(ctx.player, 1446, 94, util.getName(ctx.player));
	widget.setText(ctx.player, 1446, 93, ctx.player.getModel().setPrefixTitle());
	});
	scriptManager.bind(EventType.IF_OPEN, 1560, function (ctx) {
	widget.open(ctx.player, 1560, 16, 1558, true);//
	widget.open(ctx.player, 1560, 18, 1557, true);//Skills
	widget.open(ctx.player, 1560, 17, 1559, true);//Combat stats
	});
	scriptManager.bind(EventType.IF_BUTTON, 1446, function (ctx) {
	switch (ctx.component) {
	case 108:
	widget.openCentral(ctx.player, 1561, false);
	break;
    default:
	util.defaultHandler(ctx, "hero-widget");
	return;
	}
	});
	scriptManager.bind(EventType.IF_BUTTON, 1560, function (ctx) {
	switch (ctx.component) {
	case 22:
	widget.closeOverlaySub(ctx.player, 1024, true);
	break;
    default:
	util.defaultHandler(ctx, "hero-widget");
	return;
	}
	});
	}
})();
