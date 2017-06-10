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
var dialog = require('../dialog');
var anim = require('../../core/anim');
var map = require('../../map');
var loc = require('../../map/location');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) { 
	 scriptManager.bind(EventType.OPLOC1, 26194, function (ctx) {//party room lever
	 anim.run(ctx.player, 6933);
	// object.anim(6934)
	 dialog.multi3(ctx.player, "SELECT AN OPTION", "Balloon Bonanza (1000 coins).", function () { 
	 }, "Nightly Dance (500 coins).", function () {
	 }, "No action.", function () {
	 });
	 });
	 
	 scriptManager.bind(EventType.OPLOC1, 26193, function (ctx) {//party room chest
	 anim.run(ctx.player, 536, function () {
	 loc.add(2418, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));
	 });
	 });
	 scriptManager.bind(EventType.OPLOC2, 2418, function (ctx) {//party room chest
	//deposit
	 });
	 scriptManager.bind(EventType.OPLOC3, 2418, function (ctx) {//party room chest
	 anim.run(ctx.player, 535, function () {
	 loc.add(26193, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));
	 });
	 });
	 
	}

})();