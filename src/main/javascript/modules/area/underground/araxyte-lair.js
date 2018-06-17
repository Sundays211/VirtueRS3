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
var coords = require('shared/map/coords');
var map = require('shared/map');
var anim = require('shared/anim');
var dialog = require('shared/dialog');
var widget = require('shared/widget');
var varp = require('engine/var/player');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.OPLOC1, 91500, function (ctx) {//Webbed entrance
	        dialog.builder(ctx.player).mesbox("<col=7f0000>Beyound this point is the Araxyte hive.<br><col=7f0000> There is no way out other then death or Victory.<br><col=7f0000> Only those who can endure dangerous encouters should proceed.")
            .multi2("SELECT AN OPTION", "Enter encounter", function () {
			}, "Start/join custom encounter", function () {
				varp(ctx.player, 5142, 15362);//find right varbits that are used
				varp(ctx.player, 5144, 28799);
				widget.openCentral(ctx.player, 1591, false);
	        });
        });

	    scriptManager.bind(EventType.OPLOC1, 91553, function (ctx) {//rope out of lair
	        anim.run(ctx.player, 15456, function () {
		    anim.run(ctx.player, -1);
            map.setCoords(ctx.player, coords(0,57,53,52,27));
	        });
        });

         scriptManager.bind(EventType.OPLOC1, 91661, function (ctx) {//Gap
	        anim.run(ctx.player, 10738, function () {
           // map.setCoords(ctx.player, coords(1,70,98,26,15)); //and 1,70,98,31,17
	        });
        });

	}

})();
