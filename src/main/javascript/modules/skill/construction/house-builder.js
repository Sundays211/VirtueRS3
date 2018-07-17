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

var coords = require('shared/map/coords');
var chat = require('shared/chat');

var roomRegistry = require('./room-registry');

//Real doors: 13098 to 13103
module.exports = (function () {
	var grassCoord = coords(0,29,79,8,0);
	var maxRooms = 10;

	var rooms = [ -1, 8395, 8415, 8396, 8397, 8398, 8399,
		8401, 8402, 8403, 8404, 8405, 8406, 8407, 8408,
		8400, 8409, 8410, 8411, 8412, 8413, 8414, 8416,
		9842, 15221, 18800, 34685 ];

	return {
		buildHouse : buildHouse,
		addRoom : addRoom,
		removeRoom : removeRoom,
		loadRoom : loadRoom,
		findEmptyRoom : findEmptyRoom,
		storeRoomData : storeRoomData
	};

	function getRoom (roomTypeId) {
		if (roomTypeId < rooms.length) {
			return rooms[roomTypeId];
		} else {
			return -1;
		}
	}

	function getRoomTypeId (roomObjId) {
		for (var i=0; i<rooms.length; i++) {
			if (rooms[i] === roomObjId) {
				return i;
			}
		}
		return -1;
	}

	function buildHouse (player, houseSquare) {
		for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
			for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
				_map.setZone(houseSquare, 1, xOffSet, yOffSet, grassCoord, 0);
			}
		}
		//This is just here to give you an initial room. It will be remove later on, once proper house purchasing is implemented
		//_map.setZone(houseSquare, 1, 1, 1, RoomType.GARDEN.srcCoord, 0);

		for (var roomId=0; roomId<maxRooms; roomId++) {
			loadRoomData(player, roomId);
			var roomTypeId = _varbit(player, 1528);
			if (roomTypeId !== 0) {
				var zoneX = _varbit(player, 1524);
				var zoneY = _varbit(player, 1525);
				var level = _varbit(player, 1526);
				var rotation = _varbit(player, 1527);
				var roomObjId = getRoom(roomTypeId);
				if (roomObjId === -1) {
					throw "Unsupported room: "+roomTypeId+" at "+zoneX+", "+zoneY;
				}
				var room = roomRegistry.lookup(roomObjId);
				if (!room) {
					chat.sendDebugMessage(player, _config.objName(roomObjId)+" is not yet supported");
				} else {
					_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
				}
			}
		}
		_map.build(houseSquare);

		buildRoomFurniture(player, houseSquare);
	}

	function buildRoomFurniture (player, houseSquare) {
		for (var i=0; i<maxRooms; i++) {
			loadRoomData(player, i);
			var roomTypeId = _varbit(player, 1528);
			if (roomTypeId !== 0) {
				var zoneX = _varbit(player, 1524);
				var zoneY = _varbit(player, 1525);
				var level = _varbit(player, 1526);
				var rotation = _varbit(player, 1527);
				var roomObjId = getRoom(roomTypeId);
				if (roomObjId === -1) {
					throw "Unsupported room: "+roomTypeId+" at "+zoneX+", "+zoneY;
				}
				var room = roomRegistry.lookup(roomObjId);
				if (!room || !room.build) {
					chat.sendDebugMessage(player, "Furniture in the "+_config.objName(roomObjId)+" is not yet supported");
				} else {
					var zoneCoord = coords(level, _map.getSquareX(houseSquare), _map.getSquareY(houseSquare), zoneX << 3, zoneY << 3);
					room.build(player, zoneCoord, rotation);
				}
			}
		}
	}

	function addRoom (player, roomObjId, zoneX, zoneY, level, rotation) {
		if (_config.objCategory(roomObjId) !== 483) {
			throw "Object '"+_config.objName(roomObjId)+"' ("+roomObjId+") is not a room!";
		}

		var roomId = findEmptyRoom(player);
		if (roomId === -1) {
			throw "No empty room slots available!";
		}

		var roomTypeId = getRoomTypeId(roomObjId);
		if (roomTypeId === -1) {
			throw _config.objName(roomObjId)+" is not yet supported!";
		}

		var room = roomRegistry.lookup(roomObjId);
		if (roomTypeId === -1) {
			throw _config.objName(roomObjId)+" is not yet supported!";
		}

		_varbit(player, 1524, zoneX);
		_varbit(player, 1525, zoneY);
		_varbit(player, 1526, level);
		_varbit(player, 1527, rotation);
		_varbit(player, 1528, roomTypeId);
		storeRoomData(player, roomId);

		var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
		_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
		_map.build(houseSquare);
	}

	function removeRoom (player, roomId, zoneX, zoneY, level) {
		if (roomId === -1 || _varbit(player, 1528) === 0) {
			throw "No room exists at "+zoneX+", "+zoneY+", "+level;
		}
		setRoomData(player, roomId, 0);

		var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
		_map.setZone(houseSquare, level, zoneX, zoneY, grassCoord, 0);
		_map.build(houseSquare);
	}

	function loadRoom (player, zoneX, zoneY, level) {
		for (var roomId=0; roomId<maxRooms; roomId++) {
			loadRoomData(player, roomId);
			if (_varbit(player, 1524) === zoneX &&
					_varbit(player, 1525) === zoneY &&
					_varbit(player, 1526) === level) {
				return roomId;
			}
		}
		return -1;
	}

	function findEmptyRoom (player) {
		for (var roomId=0; roomId<maxRooms; roomId++) {
			if (getRoomData(player, roomId) === 0) {
				return roomId;
			}
		}
		return -1;
	}

	function loadRoomData (player, roomId) {
		_varp(player, 482, getRoomData(player, roomId));
	}

	function storeRoomData (player, roomId) {
		setRoomData(player, roomId, _varp(player, 482));
	}

	function getRoomData (player, roomId) {
		switch (roomId) {
		case 0:
			return _varp(player, 485);
		case 1:
			return _varp(player, 486);
		case 2:
			return _varp(player, 487);
		case 3:
			return _varp(player, 488);
		case 4:
			return _varp(player, 489);
		case 5:
			return _varp(player, 490);
		case 6:
			return _varp(player, 491);
		case 7:
			return _varp(player, 492);
		case 8:
			return _varp(player, 493);
		case 9:
			return _varp(player, 494);
		}
	}

	function setRoomData(player, roomId, roomData) {
		switch (roomId) {
		case 0:
			_varp(player, 485, roomData);
			return;
		case 1:
			_varp(player, 486, roomData);
			return;
		case 2:
			_varp(player, 487, roomData);
			return;
		case 3:
			_varp(player, 488, roomData);
			return;
		case 4:
			_varp(player, 489, roomData);
			return;
		case 5:
			_varp(player, 490, roomData);
			return;
		case 6:
			_varp(player, 491, roomData);
			return;
		case 7:
			_varp(player, 492, roomData);
			return;
		case 8:
			_varp(player, 493, roomData);
			return;
		case 9:
			_varp(player, 494, roomData);
			return;
		}
	}
})();
