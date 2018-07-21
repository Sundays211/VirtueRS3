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
import { Player } from "engine/models";
import { varp, setVarp, varbit } from "engine/var";

export const MAX_ROOMS = 10;

export function loadRoom(
	player: Player,
	zoneX: number,
	zoneY: number,
	level: number
): number {
	for (let roomId = 0; roomId < MAX_ROOMS; roomId++) {
		loadRoomData(player, roomId);
		if (varbit(player, 1524) === zoneX &&
			varbit(player, 1525) === zoneY &&
			varbit(player, 1526) === level) {
			return roomId;
		}
	}
	return -1;
}

export function findEmptyRoom(player: Player): number {
	for (let roomId = 0; roomId < MAX_ROOMS; roomId++) {
		if (getRoomData(player, roomId) === 0) {
			return roomId;
		}
	}
	return -1;
}

export function loadRoomData(player: Player, roomId: number) {
	setVarp(player, 482, getRoomData(player, roomId));
}

export function storeRoomData(player: Player, roomId: number) {
	setRoomData(player, roomId, varp(player, 482) as number);
}

export function clearRoom(player: Player, roomId: number) {
	setRoomData(player, roomId, 0);
}

function getRoomData(player: Player, roomId: number): number {
	switch (roomId) {
		case 0:
			return varp(player, 485) as number;
		case 1:
			return varp(player, 486) as number;
		case 2:
			return varp(player, 487) as number;
		case 3:
			return varp(player, 488) as number;
		case 4:
			return varp(player, 489) as number;
		case 5:
			return varp(player, 490) as number;
		case 6:
			return varp(player, 491) as number;
		case 7:
			return varp(player, 492) as number;
		case 8:
			return varp(player, 493) as number;
		case 9:
			return varp(player, 494) as number;
	}
}

function setRoomData(player: Player, roomId: number, roomData: number) {
	switch (roomId) {
		case 0:
			setVarp(player, 485, roomData);
			return;
		case 1:
			setVarp(player, 486, roomData);
			return;
		case 2:
			setVarp(player, 487, roomData);
			return;
		case 3:
			setVarp(player, 488, roomData);
			return;
		case 4:
			setVarp(player, 489, roomData);
			return;
		case 5:
			setVarp(player, 490, roomData);
			return;
		case 6:
			setVarp(player, 491, roomData);
			return;
		case 7:
			setVarp(player, 492, roomData);
			return;
		case 8:
			setVarp(player, 493, roomData);
			return;
		case 9:
			setVarp(player, 494, roomData);
			return;
	}
}
