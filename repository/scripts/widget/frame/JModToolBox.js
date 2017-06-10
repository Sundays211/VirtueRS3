/**
 * Copyright (c) 2016 Virtue Studios
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

var anim = require('../../core/anim');
var chat = require('../../chat');
var common = require('../common');
var util = require('../../core/util');
var map = require('../../map');
var coords = require('../../map/coords');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1610, function (ctx) {
		var player = ctx.player;
		switch (ctx.component) {
		case 82://Heal
		ENGINE.restoreLifePoints(ctx.player);
		chat.sendMessage(ctx.player, "You set your health to max.");
		return;
		case 115://Exit Button
		common.closeAll(ctx.player);
		return;
		case 145://invis
		ctx.player.getModel().setRender(Render.INVISIBLE);
	    ctx.player.getModel().refresh();
		return;
		case 185://Jmod Quick-Chat Option
		return;
		case 269://Panic!
		ENGINE.restoreLifePoints(ctx.player);
		map.setCoords(ctx.player, coords(2908, 3332, 2));
		return;
		default:
		util.defaultHandler(ctx, "JModToolBox");
		return;
		}
		});
	}
})();