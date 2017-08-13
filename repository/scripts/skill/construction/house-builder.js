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
var _varp = require('engine/var/player');
var _varbit = require('engine/var/bit');
var _config = require('engine/config');
var _map = require('engine/map');

var coords = require('map/coords');
var util = require('util');

var RoomType = require('./room');

module.exports = (function () {
	var grassCoord = coords(0,29,79,8,0);
	var maxRooms = 10;

	return {
		buildHouse : buildHouse,
		addRoom : addRoom,
		removeRoom : removeRoom
	};

	function buildHouse (player, houseSquare) {
		for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
			for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
				_map.setZone(houseSquare, 1, xOffSet, yOffSet, grassCoord, 0);
			}
		}

		for (var i=0; i<maxRooms; i++) {
			loadRoomData(player, i);
			var roomType = _varbit(player, 1528);
			if (roomType !== 0) {
				var zoneX = _varbit(player, 1524);
				var zoneY = _varbit(player, 1525);
				var level = _varbit(player, 1526);
				var rotation = _varbit(player, 1527);
				var room = util.lookupValue(RoomType, 'typeId', roomType);
				if (!room) {
					throw "Unsupported room: "+room+" at "+zoneX+", "+zoneY;
				}
				_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
			}
		}

		_map.build(houseSquare);
	}

	function addRoom (player, roomObjId, zoneX, zoneY, level, rotation) {
		if (_config.objCategory(roomObjId) !== 483) {
			throw "Object '"+_config.objName(roomObjId)+"' ("+roomObjId+") is not a room!";
		}

		var roomId;
		var found = false;
		for (roomId=0; roomId<maxRooms; roomId++) {
			loadRoomData(player, roomId);
			if (_varbit(player, 1528) === 0 || (
					_varbit(player, 1524) === zoneX &&
					_varbit(player, 1525) === zoneY &&
					_varbit(player, 1526) === level)) {
				found = true;
				break;
			}
		}
		if (!found) {
			throw "No empty room slots available!";
		}

		var room = util.lookupValue(RoomType, 'objId', roomObjId);
		if (!room) {
			throw _config.objName(roomObjId)+" is not yet supported!";
		}

		_varbit(player, 1524, zoneX);
		_varbit(player, 1525, zoneY);
		_varbit(player, 1526, level);
		_varbit(player, 1527, rotation);
		_varbit(player, 1528, room.typeId);
		storeRoomData(player, roomId);

		var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
		_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
		_map.build(houseSquare);
	}

	function removeRoom (player, zoneX, zoneY, level) {
		var roomId;
		var found = false;
		for (roomId=0; roomId<maxRooms; roomId++) {
			loadRoomData(player, roomId);
			if (_varbit(player, 1524) === zoneX &&
					_varbit(player, 1525) === zoneY &&
					_varbit(player, 1526) === level) {
				found = true;
				break;
			}
		}
		if (!found || _varbit(player, 1528) === 0) {
			throw "No room exists at "+zoneX+", "+zoneY+", "+level;
		}
		_varbit(player, 1528, 0);
		storeRoomData(player, roomId);

		var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
		_map.setZone(houseSquare, level, zoneX, zoneY, grassCoord, 0);
		_map.build(houseSquare);
	}

	function loadRoomData (player, roomId) {
		switch (roomId) {
		case 0:
			_varp(player, 482, _varp(player, 485));
			return;
		case 1:
			_varp(player, 482, _varp(player, 486));
			return;
		case 2:
			_varp(player, 482, _varp(player, 487));
			return;
		case 3:
			_varp(player, 482, _varp(player, 488));
			return;
		case 4:
			_varp(player, 482, _varp(player, 489));
			return;
		case 5:
			_varp(player, 482, _varp(player, 490));
			return;
		case 6:
			_varp(player, 482, _varp(player, 491));
			return;
		case 7:
			_varp(player, 482, _varp(player, 492));
			return;
		case 8:
			_varp(player, 482, _varp(player, 493));
			return;
		case 9:
			_varp(player, 482, _varp(player, 494));
			return;
		}
	}

	function storeRoomData (player, roomId) {
		switch (roomId) {
		case 0:
			_varp(player, 485, _varp(player, 482));
			return;
		case 1:
			_varp(player, 486, _varp(player, 482));
			return;
		case 2:
			_varp(player, 487, _varp(player, 482));
			return;
		case 3:
			_varp(player, 488, _varp(player, 482));
			return;
		case 4:
			_varp(player, 489, _varp(player, 482));
			return;
		case 5:
			_varp(player, 490, _varp(player, 482));
			return;
		case 6:
			_varp(player, 491, _varp(player, 482));
			return;
		case 7:
			_varp(player, 492, _varp(player, 482));
			return;
		case 8:
			_varp(player, 493, _varp(player, 482));
			return;
		case 9:
			_varp(player, 494, _varp(player, 482));
			return;
		}
	}

})();
