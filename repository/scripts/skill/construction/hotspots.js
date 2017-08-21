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
/* globals EventType, Stat */
var _varbit = require('engine/var/bit');
var _map = require('engine/map');
var _config = require('engine/config');

var coords = require('map/coords');
var locMap = require('map/location');
var CONST = require('const');
var chat = require('chat');
var dialog = require('dialog');
var widget = require('widget');
var util = require('util');
var inv = require('inv');
var stat = require('stat');

var roomRegistry = require('./room-registry');
var houseBuilder = require('./house-builder');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		//Build option on door hotpots
		scriptManager.bind(EventType.OPLOC5, [ 15305, 15306, 15307, 15308, 15309, 15310, 15311, 15312,
				15313, 15314, 15315, 15316, 15317 ], function (ctx) {
			var player = ctx.player;
			var posX = _map.getLocalX(player);
			var posY = _map.getLocalY(player);
			var level = _map.getLevel(player);
			var zoneX = Math.floor(posX / 8);
			var zoneY = Math.floor(posY / 8);
			if (posX % 8 === 0) {
				zoneX--;//Building to the west
			} else if (posX % 8 === 7) {
				zoneX++;//Building to the east
			} else if (posY % 8 === 0) {
				zoneY--;//Building to the south
			} else if (posY % 8 === 7) {
				zoneY++;//Building to the north
			} else {
				throw "Invalid coordinates: "+_map.getCoords(player);
			}
			var roomId = houseBuilder.loadRoom(player, zoneX, zoneY, level);
			if (roomId !== -1 && _varbit(player, 1528) !== 0) {
				dialog.builder(player).confirm("TODO: Dialog for confirming room removal")
					.then(function () {
						houseBuilder.removeRoom(player, roomId, zoneX, zoneY, level);
					});
			} else {
				roomId = houseBuilder.findEmptyRoom(player);
				if (roomId === -1) {
					chat.sendMessage(player, "[TODO: Fix message] You already have too many rooms...");
				} else {
					_varbit(player, 1524, zoneX);
					_varbit(player, 1525, zoneY);
					_varbit(player, 1526, level);
					widget.openCentral(player, 402);
				}
			}
		});

		scriptManager.bind(EventType.IF_OPEN, 1306, function (ctx) {
			widget.setEvents(ctx.player, 1306, 5, 1, 1, 1);//exit button

			widget.setEvents(ctx.player, 1306, 8, 4, 4, 1);//Option 1
			widget.setEvents(ctx.player, 1306, 15, 4, 4, 1);//Option 2
			widget.setEvents(ctx.player, 1306, 22, 4, 4, 1);//Option 3
			widget.setEvents(ctx.player, 1306, 29, 4, 4, 1);//Option 4
			widget.setEvents(ctx.player, 1306, 36, 4, 4, 1);//Option 5
			widget.setEvents(ctx.player, 1306, 43, 4, 4, 1);//Option 6
			widget.setEvents(ctx.player, 1306, 50, 4, 4, 1);//Option 7
		});

		scriptManager.bind(EventType.IF_BUTTON, 402, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 73://Build parlor
				widget.closeAll(player);
				buildRoom(player, 8395);
				return;
			case 82://Build garden
				widget.closeAll(player);
				buildRoom(player, 8415);
				return;
			case 91://Build kitchen
				widget.closeAll(player);
				buildRoom(player, 8396);
				return;
			case 99://Build dining room
				widget.closeAll(player);
				buildRoom(player, 8397);
				return;
			case 107://Build workshop
				widget.closeAll(player);
				buildRoom(player, 8406);
				return;
			case 115://Build bedroom
				widget.closeAll(player);
				buildRoom(player, 8398);
				return;
			default:
				util.defaultHandler(ctx, "room selection");
				return;
			}
		});
	}

	function buildRoom(player, roomObjId) {
		if (stat.getLevel(player, Stat.CONSTRUCTION) < _config.objParam(roomObjId, 23)) {
			chat.sendDebugMessage(player, "You need a construction level of "+_config.objParam(roomObjId, 23)+" to build this room.");
			return;
		}
		chat.sendDebugMessage(player, "Building room: "+_config.objName(roomObjId));
		var zoneX = _varbit(player, 1524);
		var zoneY = _varbit(player, 1525);
		var level = _varbit(player, 1526);

		var playerZoneY = Math.floor(_map.getLocalY(player) / 8);
		var doorPos = -1;
		if (zoneY < playerZoneY) {
			doorPos = 0;//Door needed in the north
		} else if (zoneY > playerZoneY) {
			doorPos = 2;//Door needed in the south
		} else {
			var playerZoneX = Math.floor(_map.getLocalX(player) / 8);
			if (zoneX < playerZoneX) {
				doorPos = 1;//Door needed in the east
			} else if (zoneX > playerZoneX) {
				doorPos = 3;//Door needed in the south
			} else {
				throw "Invalid player position: "+_map.getCoords(player)+" for zone "+zoneX+","+zoneY+","+level;
			}
		}
		var squareX = _map.getSquareX(player);
		var squareY = _map.getSquareY(player);
		var destCoord = coords(level, squareX, squareY, zoneX << 3, zoneY << 3);
		var rotation = -1;
		var room = roomRegistry.lookup(roomObjId);
		if (!room) {
			throw "Room building not yet supported for room "+_config.objName(roomObjId);
		}

		var rotateRoom = function (delta) {
			do {
				rotation = (rotation + delta) & 0x3;
			} while (!room.doors[rotation]);
			room.preview(player, destCoord, rotation);
			for (var i=0;i<4;i++) {
				if (room.doors[i]) {
					locMap.addZoneLoc(coords(0,0,0,0,4), destCoord, (rotation+i) & 0x3, 15313, 0, 0);
					locMap.addZoneLoc(coords(0,0,0,0,3), destCoord, (rotation+i) & 0x3, 15314, 0, 0);
				}
			}
		};

		function showRotate () {
			dialog.multi4(player,
				"TODO: Add support for rotating rooms...",
				"Rotate Clockwise", function () {
					_map.clearZone(destCoord);
					rotateRoom(1);
					showRotate();
				},
				"Rotate Anticlockwise", function () {
					_map.clearZone(destCoord);
					rotateRoom(-1);
					showRotate();
				},
				"Build", function () {
					inv.take(player, CONST.COINS, _config.objCost(roomObjId));
					houseBuilder.addRoom(player, roomObjId, zoneX, zoneY, level, rotation);
				}, "Cancel");
		}
		rotateRoom(1);
		showRotate();
	}
})();
