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
/* globals EventType, Inv */
var _varbit = require('engine/var/bit');
var coords = require('map/coords');

var roomRegistry = require('../room-registry');
var locMap = require('map/location');
var mapUtil = require('map/common');
var inv = require('inv');
var widget = require('widget');
var dialog = require('dialog');

var common = require('../common');

module.exports = (function () {
	var centerpiece_options = [ 8168, 8169, 8170, 8171, 8172 ];
	var tree_options = [ 8173, 8174, 8175, 8176, 8177, 8178, 8179 ];
	var big_plant_1_options = [ 8186, 8187, 8188 ];
	var big_plant_2_options = [ 8189, 8190, 8191 ];
	var small_plant_1_options = [ 8180, 8181, 8182 ];
	var small_plant_2_options = [ 8183, 8184, 8185 ];

	var centerpiece_locations = [ -1, 13405, 13406, 13407, 13408, 13409, -1, -1 ];
	var big_tree_locations = [ -1, 13411, 13412, 13413, 13414, 13415, 13416, 13417 ];
	var tree_locations = [ -1, 13418, 13419, 13420, 13421, 13422, 13423, 13424 ];
	var big_plant_1_locations = [ -1, 13425, 13426, 13427 ];
	var big_plant_2_locations = [ -1, 13428, 13429, 13430 ];
	var small_plant_1_locations = [ -1, 13431, 13432, 13433 ];
	var small_plant_2_locations = [ -1, 13434, 13435, 13436 ];

	var room = {
		init : init,
		preview : preview
	};
	return room;

	function init (scriptManager) {
		roomRegistry.register(room, 8415);

		scriptManager.bind(EventType.OPLOC5, 15361, function (ctx) {//Centerpiece
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, centerpiece_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 1, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildCenterpiece(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15362, function (ctx) {//Big Tree
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, tree_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 2, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildBigTree(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15363, function (ctx) {//Tree
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, tree_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 3, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildTree(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15364, function (ctx) {//Big Plant 1
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, big_plant_1_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 4, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildBigPlant1(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15365, function (ctx) {//Big Plant 2
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, big_plant_2_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 5, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildBigPlant2(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15366, function (ctx) {//Small Plant 1
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, small_plant_1_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 6, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildSmallPlant1(player, zoneCoord, rotation);
				});
			});
		});

		scriptManager.bind(EventType.OPLOC5, 15367, function (ctx) {//Small Plant 2
			var player = ctx.player;
			inv.fill(player, Inv.HOUSE_FURNITURE_OPTIONS, small_plant_2_options);
			widget.openCentral(player, 1306);
			dialog.setResumeHandler(player, function (value) {
				common.buildFurniture(player, value & 0xffff, 7, function () {
					var zoneCoord = mapUtil.getZoneCoord(player);
					var rotation = _varbit(player, 1527);
					buildSmallPlant2(player, zoneCoord, rotation);
				});
			});
		});
	}

	function preview (player, zoneCoord, rotation) {
		buildCenterpiece(player, zoneCoord, rotation);
		buildBigTree(player, zoneCoord, rotation);
		buildTree(player, zoneCoord, rotation);
		buildBigPlant1(player, zoneCoord, rotation);
		buildBigPlant2(player, zoneCoord, rotation);
		buildSmallPlant1(player, zoneCoord, rotation);
		buildSmallPlant2(player, zoneCoord, rotation);
		//locMap.addZoneLoc(coords(0,29,79,3,11), zoneCoord, rotation, 15361, 10, 0);//Centerpiece
		//locMap.addZoneLoc(coords(0,29,79,1,13), zoneCoord, rotation, 15362, 10, 0);//Big Tree
		//locMap.addZoneLoc(coords(0,29,79,6,14), zoneCoord, rotation, 15363, 10, 1);//Tree
		//locMap.addZoneLoc(coords(0,29,79,6,8), zoneCoord, rotation, 15364, 10, 0);//Big Plant 1
		//locMap.addZoneLoc(coords(0,29,79,0,8), zoneCoord, rotation, 15365, 10, 0);//Big Plant 2
		//locMap.addZoneLoc(coords(0,29,79,3,9), zoneCoord, rotation, 15366, 10, 0);//Small Plant 1
		//locMap.addZoneLoc(coords(0,29,79,4,13), zoneCoord, rotation, 15367, 10, 0);//Small Plant 2

		//Doors
		locMap.addZoneLoc(coords(0,0,0,0,4), zoneCoord, rotation, 15313, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,0,3), zoneCoord, rotation, 15314, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,4,7), zoneCoord, rotation, 15313, 0, 1);
		locMap.addZoneLoc(coords(0,0,0,3,7), zoneCoord, rotation, 15314, 0, 1);
		locMap.addZoneLoc(coords(0,0,0,7,3), zoneCoord, rotation, 15313, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,7,4), zoneCoord, rotation, 15314, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,3,0), zoneCoord, rotation, 15313, 0, 3);
		locMap.addZoneLoc(coords(0,0,0,4,0), zoneCoord, rotation, 15314, 0, 3);
	}

	function buildCenterpiece (player, zoneCoord, rotation) {
		var locTypeId = centerpiece_locations[_varbit(player, 1529)];
		if (locTypeId === -1) {
			locTypeId = 15361;
		}
		locMap.addZoneLoc(coords(0,0,0,3,11), zoneCoord, rotation, locTypeId, 10, 0);
	}

	function buildBigTree (player, zoneCoord, rotation) {
		var locTypeId = big_tree_locations[_varbit(player, 1530)];
		if (locTypeId === -1) {
			locTypeId = 15362;
		}
		locMap.addZoneLoc(coords(0,0,0,1,13), zoneCoord, rotation, locTypeId, 10, 0);
	}

	function buildTree (player, zoneCoord, rotation) {
		var locTypeId = tree_locations[_varbit(player, 1531)];
		if (locTypeId === -1) {
			locTypeId = 15363;
		}
		locMap.addZoneLoc(coords(0,0,0,6,14), zoneCoord, rotation, locTypeId, 10, 1);
	}

	function buildBigPlant1 (player, zoneCoord, rotation) {
		var locTypeId = big_plant_1_locations[_varbit(player, 1532)];
		if (locTypeId === -1) {
			locTypeId = 15364;
		}
		locMap.addZoneLoc(coords(0,29,79,6,8), zoneCoord, rotation, locTypeId, 10, 0);
	}

	function buildBigPlant2 (player, zoneCoord, rotation) {
		var locTypeId = big_plant_2_locations[_varbit(player, 1533)];
		if (locTypeId === -1) {
			locTypeId = 15365;
		}
		locMap.addZoneLoc(coords(0,29,79,0,8), zoneCoord, rotation, locTypeId, 10, 0);
	}

	function buildSmallPlant1 (player, zoneCoord, rotation) {
		var locTypeId = small_plant_1_locations[_varbit(player, 1534)];
		if (locTypeId === -1) {
			locTypeId = 15366;
		}
		locMap.addZoneLoc(coords(0,29,79,3,9), zoneCoord, rotation, locTypeId, 10, 0);
	}

	function buildSmallPlant2 (player, zoneCoord, rotation) {
		var locTypeId = small_plant_2_locations[_varbit(player, 1535)];
		if (locTypeId === -1) {
			locTypeId = 15367;
		}
		locMap.addZoneLoc(coords(0,29,79,4,13), zoneCoord, rotation, locTypeId, 10, 0);
	}
})();