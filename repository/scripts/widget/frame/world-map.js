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
var varc = require('../../core/var/client');

var util = require('../../core/util');
var widget = require('../common');
var anim = require('../../core/anim');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1422, function (ctx) {
			widget.setEvents(ctx.player, 1422, 38, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 39, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 40, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 41, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 42, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 43, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 44, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 45, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 46, 2, 2, 2);
			widget.setEvents(ctx.player, 1422, 47, 2, 2, 2);
			//varc(ctx.player, 622, getCoordHash(map.getCoords(ctx.player)));
			widget.setEvents(ctx.player, 1422, 86, 0, 19, 2);
			widget.hide(ctx.player, 1422, 49, true);
			varc(ctx.player, 4197, -1);
			//varc(ctx.player, 674, getCoordHash(map.getCoords(ctx.player)));
			anim.run(ctx.player, 22748);
		});
		
		scriptManager.bind(EventType.IF_CLOSE, 1422, function (ctx) {
			util.runClientScript(ctx.player, 8105, []);
			varc(ctx.player, 622, -1);
			varc(ctx.player, 674, -1);
			widget.openOverlaySub(ctx.player, 1015, 1215, true);
			widget.open(ctx.player, 1477, 16, 1482, true);
			anim.stop(ctx.player);
			anim.run(ctx.player, 22749);
		});
	}
})();
