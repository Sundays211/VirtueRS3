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
import { setVarBit } from "engine/var";
import { Inv } from "engine/enums";

import { confirmDialog, pauseDialog } from "shared/dialog";
import { fillInv } from "shared/inv";
import { openCentralWidget } from "shared/widget";
import { sendDebugMessage } from "shared/chat";

import { loadRoom, storeRoomData } from "./room-data";

export async function removeFurniture(
	player: Player,
	roomCoord: CoordGrid,
	hotspotId: number
) {
	await confirmDialog(player, "Really remove it?");
	var zoneX = _map.getLocalX(roomCoord) >> 3;
	var zoneY = _map.getLocalY(roomCoord) >> 3;
	var level = _map.getLevel(roomCoord);
	var roomId = loadRoom(player, zoneX, zoneY, level);
	if (roomId === -1) {
		throw "Room not found at " + roomCoord;
	}
	setHotspot(player, hotspotId, 0);
	storeRoomData(player, roomId);
}

export async function buildFurniture(
	player: Player,
	roomCoord: CoordGrid,
	hotspotId: number,
	options: number[]
) {
	fillInv(player, Inv.HOUSE_FURNITURE_OPTIONS, options);
	openCentralWidget(player, 1306);
	const value = await pauseDialog(player) as number;
	handleSelectResponse(player, roomCoord, value & 0xffff, hotspotId);
}

function handleSelectResponse(
	player: Player,
	zoneCoord: CoordGrid,
	optionComponentId: number,
	hotspotId: number
) {
	var zoneX = _map.getLocalX(zoneCoord) >> 3;
	var zoneY = _map.getLocalY(zoneCoord) >> 3;
	var level = _map.getLevel(zoneCoord);
	var roomId = loadRoom(player, zoneX, zoneY, level);
	if (roomId === -1) {
		throw "Room not found at " + zoneCoord;
	}

	var slot;
	switch (optionComponentId) {
		case 8:
			slot = 1;
			break;
		case 15:
			slot = 2;
			break;
		case 22:
			slot = 3;
			break;
		case 29:
			slot = 4;
			break;
		case 36:
			slot = 5;
			break;
		case 43:
			slot = 6;
			break;
		case 50:
			slot = 7;
			break;
		default:
			sendDebugMessage(player, "Unhandled furniture creation resume pause: " + optionComponentId);
			return;
	}
	setHotspot(player, hotspotId, slot);
	storeRoomData(player, roomId);
}

function setHotspot(player: Player, hotspotId: number, value: number) {
	switch (hotspotId) {
		case 1:
			setVarBit(player, 1529, value);
			return;
		case 2:
			setVarBit(player, 1530, value);
			return;
		case 3:
			setVarBit(player, 1531, value);
			return;
		case 4:
			setVarBit(player, 1532, value);
			return;
		case 5:
			setVarBit(player, 1533, value);
			return;
		case 6:
			setVarBit(player, 1534, value);
			return;
		case 7:
			setVarBit(player, 1535, value);
			return;
	}
}
