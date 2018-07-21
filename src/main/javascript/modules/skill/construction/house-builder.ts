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
import { Player, CoordGrid } from "engine/models";
import _map from 'engine/map';
import _config from 'engine/config';
import { varbit, setVarBit } from "engine/var";

import { sendDebugMessage } from "shared/chat";
import _coords from 'shared/map/coords';

import { loadRoomData, findEmptyRoom, storeRoomData, clearRoom, MAX_ROOMS } from "./room-data";
import { lookupRoom } from "./room";

//Real doors: 13098 to 13103
const grassCoord = _coords(0,29,79,8,0);

var rooms = [ -1, 8395, 8415, 8396, 8397, 8398, 8399,
	8401, 8402, 8403, 8404, 8405, 8406, 8407, 8408,
	8400, 8409, 8410, 8411, 8412, 8413, 8414, 8416,
	9842, 15221, 18800, 34685 ];

export function buildHouse (player: Player, houseSquare: CoordGrid) {
	for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
		for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
			_map.setZone(houseSquare, 1, xOffSet, yOffSet, grassCoord, 0);
		}
	}
	//This is just here to give you an initial room. It will be remove later on, once proper house purchasing is implemented
	//_map.setZone(houseSquare, 1, 1, 1, RoomType.GARDEN.srcCoord, 0);

	for (var roomId=0; roomId<MAX_ROOMS; roomId++) {
		loadRoomData(player, roomId);
		var roomTypeId = varbit(player, 1528);
		if (roomTypeId !== 0) {
			var zoneX = varbit(player, 1524);
			var zoneY = varbit(player, 1525);
			var level = varbit(player, 1526);
			var rotation = varbit(player, 1527);
			var roomObjId = getRoom(roomTypeId);
			if (roomObjId === -1) {
				throw "Unsupported room: "+roomTypeId+" at "+zoneX+", "+zoneY;
			}
			var room = lookupRoom(roomObjId);
			if (!room) {
				sendDebugMessage(player, _config.objName(roomObjId)+" is not yet supported");
			} else {
				_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
			}
		}
	}
	_map.build(houseSquare);

	buildRoomFurniture(player, houseSquare);
}

function getRoom (roomTypeId: number) {
	if (roomTypeId < rooms.length) {
		return rooms[roomTypeId];
	} else {
		return -1;
	}
}

function getRoomTypeId (roomObjId: number) {
	for (var i=0; i<rooms.length; i++) {
		if (rooms[i] === roomObjId) {
			return i;
		}
	}
	return -1;
}

function buildRoomFurniture (player: Player, houseSquare: CoordGrid) {
	for (var i=0; i<MAX_ROOMS; i++) {
		loadRoomData(player, i);
		var roomTypeId = varbit(player, 1528);
		if (roomTypeId !== 0) {
			var zoneX = varbit(player, 1524);
			var zoneY = varbit(player, 1525);
			var level = varbit(player, 1526);
			var rotation = varbit(player, 1527);
			var roomObjId = getRoom(roomTypeId);
			if (roomObjId === -1) {
				throw "Unsupported room: "+roomTypeId+" at "+zoneX+", "+zoneY;
			}
			var room = lookupRoom(roomObjId);
			if (!room || !room.build) {
				sendDebugMessage(player, "Furniture in the "+_config.objName(roomObjId)+" is not yet supported");
			} else {
				var zoneCoord = _coords(level, _map.getSquareX(houseSquare), _map.getSquareY(houseSquare), zoneX << 3, zoneY << 3);
				room.build(player, zoneCoord, rotation);
			}
		}
	}
}

export function addRoom (
	player: Player,
	roomObjId: number,
	zoneX: number,
	zoneY: number,
	level: number,
	rotation: number
) {
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

	var room = lookupRoom(roomObjId);
	if (roomTypeId === -1) {
		throw _config.objName(roomObjId)+" is not yet supported!";
	}

	setVarBit(player, 1524, zoneX);
	setVarBit(player, 1525, zoneY);
	setVarBit(player, 1526, level);
	setVarBit(player, 1527, rotation);
	setVarBit(player, 1528, roomTypeId);
	storeRoomData(player, roomId);

	var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
	_map.setZone(houseSquare, level, zoneX, zoneY, room.srcCoord, rotation);
	_map.build(houseSquare);
}

export function removeRoom (
	player: Player,
	roomId: number,
	zoneX: number,
	zoneY: number,
	level: number
) {
	if (roomId === -1 || varbit(player, 1528) === 0) {
		throw "No room exists at "+zoneX+", "+zoneY+", "+level;
	}
	clearRoom(player, roomId);

	var houseSquare = _map.getDynamicSquare(_map.getCoords(player));
	_map.setZone(houseSquare, level, zoneX, zoneY, grassCoord, 0);
	_map.build(houseSquare);
}
