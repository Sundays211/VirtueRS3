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
var _map = require('engine/map');

var anim = require('anim');
var util = require('util');
var dialog = require('dialog');
var inv = require('inv');
var map = require('map');
var loc = require('map/location');
var chat = require('chat');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC2, [ 2646, 67263, 67264, 67265 ], function (ctx) {//flax
			if(util.mapMembers()){
				anim.run(ctx.player, 827, function () {
					inv.give(ctx.player, 1779, 1);
					var coord = map.getCoords(ctx.location);
					var shape = loc.getShape(ctx.location);
					var rotation = loc.getRotation(ctx.location);
					_map.delay(coord, function () {
						_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
					}, 60);
				});
			} else {
				dialog.mesbox(ctx.player, "Only members can pick flax."); 
			}
		});

		scriptManager.bind(EventType.OPLOC2, [ 15506, 15507, 15508 ], function (ctx) {//wheat
			anim.run(ctx.player, 827, function () {
				chat.sendMessage(ctx.player, "You pick some wheat.");
				inv.give(ctx.player, 1947, 1);
				var coord = map.getCoords(ctx.location);
				var shape = loc.getShape(ctx.location);
				var rotation = loc.getRotation(ctx.location);
				_map.delay(coord, function () {
					_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

		scriptManager.bind(EventType.OPLOC2, 1161, function (ctx) {//cabbage
			anim.run(ctx.player, 827, function () {
				chat.sendMessage(ctx.player, "You pick a cabbage.");
				inv.give(ctx.player, 1965, 1);
				var coord = map.getCoords(ctx.location);
				var shape = loc.getShape(ctx.location);
				var rotation = loc.getRotation(ctx.location);
				_map.delay(coord, function () {
					_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

		scriptManager.bind(EventType.OPLOC1, [ 86687,86688,86689, 86690, 86691 ], function (ctx) {//cabbage
			anim.run(ctx.player, 827);
			inv.give(ctx.player, 1965, 1);	
		});

		scriptManager.bind(EventType.OPLOC1, 11494, function (ctx) {//cabbage
			anim.run(ctx.player, 827, function () {
				chat.sendMessage(ctx.player, "You pick a cabbage.");
				inv.give(ctx.player, 1967, 1);
				var coord = map.getCoords(ctx.location);
				var shape = loc.getShape(ctx.location);
				var rotation = loc.getRotation(ctx.location);
				_map.delay(coord, function () {
					_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

		scriptManager.bind(EventType.OPLOC2, 3366, function (ctx) {//Onion
			anim.run(ctx.player, 827, function () {
				chat.sendMessage(ctx.player, "You pick a onion.");
				inv.give(ctx.player, 1957, 1);
				var coord = map.getCoords(ctx.location);
				var shape = loc.getShape(ctx.location);
				var rotation = loc.getRotation(ctx.location);
				_map.delay(coord, function () {
					_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

		scriptManager.bind(EventType.OPLOC2, 312, function (ctx) {//Potato
			anim.run(ctx.player, 827, function () {
				chat.sendMessage(ctx.player, "You pick a potato.");
				inv.give(ctx.player, 1942, 1);
				var coord = map.getCoords(ctx.location);
				var shape = loc.getShape(ctx.location);
				var rotation = loc.getRotation(ctx.location);
				_map.delay(coord, function () {
					_map.addLoc(util.getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});
	}

})();