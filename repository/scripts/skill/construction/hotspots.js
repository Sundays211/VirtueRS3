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
var _map = require('engine/map');
var _config = require('engine/config');

var CONST = require('const');
var chat = require('chat');
var dialog = require('dialog');
var widget = require('widget');
var util = require('util');
var inv = require('inv');

var houseBuilder = require('./house-builder');
var RoomType = require('./room');

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

		scriptManager.bind(EventType.IF_BUTTON, 402, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 73://Build parlor
				widget.closeAll(player);
				buildRoom(player, RoomType.PARLOUR);
				return;
			case 82://Build garden
				widget.closeAll(player);
				buildRoom(player, RoomType.GARDEN);
				return;
			case 91://Build kitchen
				widget.closeAll(player);
				buildRoom(player, RoomType.KITCHEN);
				return;
			case 99://Build dining room
				widget.closeAll(player);
				buildRoom(player, RoomType.DINING);
				return;
			case 107://Build workshop
				widget.closeAll(player);
				buildRoom(player, RoomType.WORKSHOP);
				return;
			case 115://Build bedroom
				widget.closeAll(player);
				buildRoom(player, RoomType.BEDROOM);
				return;
			default:
				util.defaultHandler(ctx, "room selection");
				return;
			}
		});
	}

	function buildRoom(player, roomType) {
		chat.sendDebugMessage(player, "Building room: "+_config.objName(roomType.objId));
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
		var rotation = 0;
		while (!roomType.doors[(rotation+doorPos) & 0x3]) {
			rotation++;
		}

		dialog.multi2(player, 
			"TODO: Add support for rotating rooms...", 
			"Build", function () {
				inv.take(player, CONST.COINS, _config.objCost(roomType.objId));
				houseBuilder.addRoom(player, roomType.objId, zoneX, zoneY, level, rotation);
			}, "Cancel");
	}
})();
