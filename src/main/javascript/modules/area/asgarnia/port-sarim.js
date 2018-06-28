/**
 * Copyright (c) 2017 Virtue Studios
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
var map = require('shared/map');
var coords = require('shared/map/coords');
var dialog = require('shared/dialog');
var varbit = require('engine/var/bit');
var quest = require('../../quest');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.OPLOC1, 9472, function (ctx) {//Asgarnian ice dungeon
			map.setCoords(ctx.player, coords(3007, 9550, 0));
		});

		scriptManager.bind(EventType.OPLOC1, 10090, function (ctx) {//signpost
		    dialog.builder(ctx.player).mesbox("Mudskipper Point.<br> WARNING!<br> BEWARE OF THE MUDSKIPPERS!");
		});

		scriptManager.bind(EventType.OPLOC1, 39442, function (ctx) {//trapdoor betty's basement quest (swept away)
		    if(quest.hasStarted(ctx.player, 20) && varbit(ctx.player, 9868) == 0) {
		        varbit(ctx.player, 9868, 1); //open trapdoor
			} else if (varbit(ctx.player, 9868) == 1){
			    map.setCoords(ctx.player, coords(3221, 4522, 0));
			} else {
                dialog.builder(ctx.player).chatnpc(583, "Excuse me, my cellar isn't open to the public.")
		        .chatplayer("Oh, sorry.")
		        .finish();
			}
		});

		scriptManager.bind(EventType.OPLOC2, 39442, function (ctx) {//trapdoor betty's basement quest (swept away)
		    varbit(ctx.player, 9868, 0);
		});
	}
})();
