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
/* globals EventType, Expression */
var dialog = require('shared/dialog');
var _map = require('engine/map');
var loc = require('shared/map/location');
var inv = require('shared/inv');
var anim = require('shared/anim');
var map = require('shared/map');
var util = require('shared/util');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.OPLOC1, 9662, function (ctx) {//spade in mining area
		    anim.run(ctx.player, 832, function () {
		    inv.give(ctx.player, 952, 1);
		    _map.delay(loc.add(10626, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location)), function () {
		    loc.add(util.getId(ctx.location), map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));
		    }, 40);
		    });
		});

		scriptManager.bind(EventType.OPLOC1, 31459, function (ctx) {//Customs Sergeant
			dialog.chatnpc(ctx.player, 7830, "Zzzzzzzzzzzzzzzzzzz", Expression.NEUTRAL);//just need the right chat head
		});

		scriptManager.bind(EventType.OPLOC1, 71969, function (ctx) {//locker
			dialog.chatnpc(ctx.player, 7831, "Hey! Nobody stores anything in there unless thay are<br> under arrest.", Expression.NEUTRAL);//just need the right chat head
		});

		scriptManager.bind(EventType.OPLOC1, 71970, function (ctx) {//notices outside Customs Sergeant
			dialog.mesbox(ctx.player, "There are no new notices here.");
		});

		scriptManager.bind(EventType.OPLOC1, 72434, function (ctx) {//Sleeping man
			dialog.chatnpc(ctx.player, 15476, "...ears to pour their course...", Expression.NEUTRAL);//just need the right chat head
		});

		scriptManager.bind(EventType.OPLOC1, 72442, function (ctx) {//Waylan
			dialog.chatnpc(ctx.player, 15471, "...wending through the willows...", Expression.NEUTRAL);//just need the right chat head
		});
	}
})();
