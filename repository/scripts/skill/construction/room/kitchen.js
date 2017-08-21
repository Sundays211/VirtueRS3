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
	var range_options = [ 8216, 8217, 8218, 8219, 8220, 8221, 8222 ];
	var shelves_options = [ 8223, 8224, 8225, 8226, 8227, 8228, 8229 ];
	var beer_barrel_options = [ 8239, 8240, 8241, 8242, 8243, 8244 ];
	var cat_basket_options = [ 8236, 8237, 8238 ];
	var larder_options = [ 8233, 8234, 8235 ];
	var sink_options = [ 8230, 8231, 8232 ];
	var table_options = [ 8246, 8247, 8248 ];

	var range_locations = [ -1, 13528, 13529, 13531, 13533, 13536, 13539, 13542 ];
	var shelves_1_locations = [ -1, 13545, 13546, 13547, 13548, 13549, 13550, 13551 ];
	var shelves_2_locations = [ -1, 13552, 13553, 13554, 13555, 13556, 13557, 13558 ];
	var beer_barrel_locations = [ -1, 13568, 13569, 13570, 13571, 13572, 13573 ];
	var cat_basket_locations = [ -1, 13574, 13575, 13576 ];
	var larder_locations = [ -1, 13565, 13566, 13567 ];
	var sink_locations = [ -1, 13559, 13561, 13563 ];
	var table_locations = [ -1, 13577, 13578, 13579 ];

	var room = {
		srcCoord : coords(0,29,79,16,56),
		doors : [ true, false, false, true ],
		init : init,
		preview : preview,
		build : build
	};
	return room;

	function init (scriptManager) {
		roomRegistry.register(room, 8396);

		//Stove
		scriptManager.bind(EventType.OPLOC5, 15398, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 1, range_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildStove(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Stove
		scriptManager.bind(EventType.OPLOC5, [ 13528, 13529, 13531, 13533, 13536, 13539, 13542 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 1, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildStove(ctx.player, roomCoord, rotation);
			});
		});

		scriptManager.bind(EventType.OPLOC5, [ 15399, 15400 ], function (ctx) {//Shelves
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 2, shelves_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildShelves(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Shelves
		scriptManager.bind(EventType.OPLOC5, [ 13545, 13546, 13547, 13548, 13549, 13550, 13551,
				13552, 13553, 13554, 13555, 13556, 13557, 13558 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 2, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildShelves(ctx.player, roomCoord, rotation);
			});
		});

		//Beer barrel
		scriptManager.bind(EventType.OPLOC5, 15401, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 3, beer_barrel_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildBeerBarrel(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Beer barrel
		scriptManager.bind(EventType.OPLOC5, [ 13568, 13569, 13570, 13571, 13572, 13573 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 3, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildBeerBarrel(ctx.player, roomCoord, rotation);
			});
		});

		//Cat basket
		scriptManager.bind(EventType.OPLOC5, 15402, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 4, cat_basket_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildCatBasket(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Cat basket
		scriptManager.bind(EventType.OPLOC5, [ 13574, 13575, 13576 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 4, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildCatBasket(ctx.player, roomCoord, rotation);
			});
		});

		//Larder
		scriptManager.bind(EventType.OPLOC5, 15403, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 5, larder_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildLarder(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Larder
		scriptManager.bind(EventType.OPLOC5, [ 13565, 13566, 13567 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 5, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildLarder(ctx.player, roomCoord, rotation);
			});
		});

		//Sink
		scriptManager.bind(EventType.OPLOC5, 15404, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 6, sink_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildSink(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Sink
		scriptManager.bind(EventType.OPLOC5, [ 13559, 13561, 13563 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 6, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildSink(ctx.player, roomCoord, rotation);
			});
		});

		//Table
		scriptManager.bind(EventType.OPLOC5, 15405, function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.buildFurniture(ctx.player, roomCoord, 7, table_options, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildTable(ctx.player, roomCoord, rotation);
			});
		});

		//Remove Sink
		scriptManager.bind(EventType.OPLOC5, [ 13577, 13578, 13579 ], function (ctx) {
			var roomCoord = mapUtil.getZoneCoord(ctx.location);
			common.removeFurniture(ctx.player, roomCoord, 7, function () {
				var rotation = _varbit(ctx.player, 1527);
				buildTable(ctx.player, roomCoord, rotation);
			});
		});
	}

	function preview (player, zoneCoord, rotation) {
		buildStove(player, zoneCoord, rotation);
		buildShelves(player, zoneCoord, rotation);
		buildBeerBarrel(player, zoneCoord, rotation);
		buildCatBasket(player, zoneCoord, rotation);
		buildLarder(player, zoneCoord, rotation);
		buildSink(player, zoneCoord, rotation);
		buildTable(player, zoneCoord, rotation);
	}

	function build (player, zoneCoord, rotation) {
		buildStove(player, zoneCoord, rotation);
		buildShelves(player, zoneCoord, rotation);
		buildBeerBarrel(player, zoneCoord, rotation);
		buildCatBasket(player, zoneCoord, rotation);
		buildLarder(player, zoneCoord, rotation);
		buildSink(player, zoneCoord, rotation);
		buildTable(player, zoneCoord, rotation);
	}

	function buildStove (player, zoneCoord, rotation) {
		var locTypeId = range_locations[_varbit(player, 1529)];
		if (locTypeId === -1) {
			locTypeId = 15398;
		}
		locMap.addZoneLoc(coords(0,0,0,19,63), zoneCoord, rotation, locTypeId, 10, 1);
	}

	function buildShelves (player, zoneCoord, rotation) {
		var locTypeId = shelves_1_locations[_varbit(player, 1530)];
		if (locTypeId === -1) {
			locTypeId = 15399;
		}
		locMap.addZoneLoc(coords(0,0,0,23,62), zoneCoord, rotation, locTypeId, 5, 2);
		
		locTypeId = shelves_2_locations[_varbit(player, 1530)];
		if (locTypeId === -1) {
			locTypeId = 15400;
		}
		locMap.addZoneLoc(coords(0,0,0,17,63), zoneCoord, rotation, locTypeId, 5, 1);
		locMap.addZoneLoc(coords(0,0,0,22,63), zoneCoord, rotation, locTypeId, 5, 1);
	}

	function buildBeerBarrel (player, zoneCoord, rotation) {
		var locTypeId = beer_barrel_locations[_varbit(player, 1531)];
		if (locTypeId === -1) {
			locTypeId = 15401;
		}
		locMap.addZoneLoc(coords(0,0,0,16,62), zoneCoord, rotation, locTypeId, 10, 3);
	}

	function buildCatBasket (player, zoneCoord, rotation) {
		var locTypeId = cat_basket_locations[_varbit(player, 1532)];
		if (locTypeId === -1) {
			locTypeId = 15402;
		}
		locMap.addZoneLoc(coords(0,0,0,16,56), zoneCoord, rotation, locTypeId, 22, 0);
	}

	function buildLarder (player, zoneCoord, rotation) {
		var locTypeId = larder_locations[_varbit(player, 1533)];
		if (locTypeId === -1) {
			locTypeId = 15403;
		}
		locMap.addZoneLoc(coords(0,0,0,22,56), zoneCoord, rotation, locTypeId, 10, 2);
	}

	function buildSink (player, zoneCoord, rotation) {
		var locTypeId = sink_locations[_varbit(player, 1534)];
		if (locTypeId === -1) {
			locTypeId = 15404;
		}
		locMap.addZoneLoc(coords(0,0,0,23,59), zoneCoord, rotation, locTypeId, 10, 2);
	}

	function buildTable (player, zoneCoord, rotation) {
		var locTypeId = table_locations[_varbit(player, 1535)];
		if (locTypeId === -1) {
			locTypeId = 15405;
		}
		locMap.addZoneLoc(coords(0,0,0,19,59), zoneCoord, rotation, locTypeId, 10, 2);
	}
})();