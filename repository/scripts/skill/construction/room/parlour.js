/**
 * Copyright (c) 2014 Virtue Studios
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
var _varbit = require('engine/var/bit');
var coords = require('map/coords');

var roomRegistry = require('../room-registry');
var locMap = require('map/location');
var mapUtil = require('map/common');

var common = require('../common');

module.exports = (function () {
	var chair_options = [ 8309, 8310, 8311, 8312, 8313, 8314, 8315 ];
	var rug_options = [ 8316, 8317, 8318 ];
	var bookcase_options = [ 8319, 8320, 8321 ];
	var fireplace_options = [ 8325, 8326, 8327 ];

	var chair_locations = [ -1, 13581, 13582, 13583, 13584, 13585, 13586, 13587 ];
	var rug_corner_locations = [ -1, 13588, 13591, 13594 ];
	var rug_edge_locations = [ -1, 13589, 13592, 13595 ];
	var rug_center_locations = [ -1, 13590, 13593, 13596 ];
	var bookcase_locations = [ -1, 13597, 13598, 13599 ];
	var fireplace_locations = [ -1, 13609, 13611, 13613 ];

	var room = {
		srcCoord : coords(0,29,79,0,56),
		doors : [ true, false, true, true ],
		init : init,
		preview : preview,
		build : build
	};
	return room;

	function init (scriptManager) {
		roomRegistry.register(room, 8395);

		scriptManager.bind(EventType.OPLOC5, 15410, function (ctx) {//Chair #1
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 1, chair_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildChair1(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15411, function (ctx) {//Chair #2
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 2, chair_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildChair2(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15412, function (ctx) {//Chair #3
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 3, chair_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildChair3(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, [ 15413, 15414, 15415 ], function (ctx) {//Rug
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 4, rug_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildRug(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15416, function (ctx) {//Bookcase
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 5, bookcase_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildBookcase(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15418, function (ctx) {//Fireplace
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 6, fireplace_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildFireplace(ctx.player, roomCoord, rotation);
			});
		});
	}

	function preview (player, zoneCoord, rotation) {
		//Chairs
		buildChair1(player, zoneCoord, rotation);
		buildChair2(player, zoneCoord, rotation);
		buildChair3(player, zoneCoord, rotation);
		//buildRug(player, zoneCoord, rotation);
		buildBookcase(player, zoneCoord, rotation);
		buildFireplace(player, zoneCoord, rotation);

		//Curtains
		locMap.addZoneLoc(coords(0,0,0,0,58), zoneCoord, rotation, 15419, 5, 0);
		locMap.addZoneLoc(coords(0,0,0,0,61), zoneCoord, rotation, 15419, 5, 0);
		locMap.addZoneLoc(coords(0,0,0,2,63), zoneCoord, rotation, 15419, 5, 1);
		locMap.addZoneLoc(coords(0,0,0,5,63), zoneCoord, rotation, 15419, 5, 1);
		locMap.addZoneLoc(coords(0,0,0,7,58), zoneCoord, rotation, 15419, 5, 2);
		locMap.addZoneLoc(coords(0,0,0,7,61), zoneCoord, rotation, 15419, 5, 2);
		locMap.addZoneLoc(coords(0,0,0,2,56), zoneCoord, rotation, 15419, 5, 3);
		locMap.addZoneLoc(coords(0,0,0,5,56), zoneCoord, rotation, 15419, 5, 3);
	}

	function build (player, zoneCoord, rotation) {
		buildChair1(player, zoneCoord, rotation);
		buildChair2(player, zoneCoord, rotation);
		buildChair3(player, zoneCoord, rotation);
		buildRug(player, zoneCoord, rotation);
		buildBookcase(player, zoneCoord, rotation);
		buildFireplace(player, zoneCoord, rotation);
	}

	function buildChair1 (player, zoneCoord, rotation) {
		var locTypeId = chair_locations[_varbit(player, 1529)];
		if (locTypeId === -1) {
			locTypeId = 15410;
		}
		locMap.addZoneLoc(coords(0,0,0,2,60), zoneCoord, rotation, locTypeId, 11, 2);
	}

	function buildChair2 (player, zoneCoord, rotation) {
		var locTypeId = chair_locations[_varbit(player, 1530)];
		if (locTypeId === -1) {
			locTypeId = 15411;
		}
		locMap.addZoneLoc(coords(0,0,0,5,60), zoneCoord, rotation, locTypeId, 11, 1);
	}

	function buildChair3 (player, zoneCoord, rotation) {
		var locTypeId = chair_locations[_varbit(player, 1531)];
		if (locTypeId === -1) {
			locTypeId = 15412;
		}
		locMap.addZoneLoc(coords(0,0,0,4,59), zoneCoord, rotation, locTypeId, 10, 2);
	}

	function buildRug (player, zoneCoord, rotation) {
		var locTypeId = rug_center_locations[_varbit(player, 1532)];
		if (locTypeId === -1) {
			locTypeId = 15413;
		}
		locMap.addZoneLoc(coords(0,0,0,3,59), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,3,60), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,59), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,60), zoneCoord, rotation, locTypeId, 22, 2);

		locTypeId = rug_edge_locations[_varbit(player, 1532)];
		if (locTypeId === -1) {
			locTypeId = 15414;
		}
		locMap.addZoneLoc(coords(0,0,0,2,59), zoneCoord, rotation, locTypeId, 22, 3);
		locMap.addZoneLoc(coords(0,0,0,2,60), zoneCoord, rotation, locTypeId, 22, 3);
		locMap.addZoneLoc(coords(0,0,0,3,58), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,58), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,3,61), zoneCoord, rotation, locTypeId, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,4,61), zoneCoord, rotation, locTypeId, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,5,59), zoneCoord, rotation, locTypeId, 22, 1);
		locMap.addZoneLoc(coords(0,0,0,5,60), zoneCoord, rotation, locTypeId, 22, 1);

		locTypeId = rug_corner_locations[_varbit(player, 1532)];
		if (locTypeId === -1) {
			locTypeId = 15415;
		}
		locMap.addZoneLoc(coords(0,0,0,2,61), zoneCoord, rotation, locTypeId, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,5,61), zoneCoord, rotation, locTypeId, 22, 1);
		locMap.addZoneLoc(coords(0,0,0,5,58), zoneCoord, rotation, locTypeId, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,2,58), zoneCoord, rotation, locTypeId, 22, 3);
	}

	function buildBookcase (player, zoneCoord, rotation) {
		var locTypeId = bookcase_locations[_varbit(player, 1533)];
		if (locTypeId === -1) {
			locTypeId = 15416;
		}
		locMap.addZoneLoc(coords(0,0,0,0,57), zoneCoord, rotation, locTypeId, 10, 0);
		locMap.addZoneLoc(coords(0,0,0,7,57), zoneCoord, rotation, locTypeId, 10, 2);
	}

	function buildFireplace (player, zoneCoord, rotation) {
		var locTypeId = fireplace_locations[_varbit(player, 1533)];
		if (locTypeId === -1) {
			locTypeId = 15418;
		}
		locMap.addZoneLoc(coords(0,0,0,3,63), zoneCoord, rotation, locTypeId, 10, 1);
	}
})();