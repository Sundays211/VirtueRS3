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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { varbit } from 'engine/var';
import { Player, CoordGrid } from 'engine/models';

import _coords from 'shared/map/coords';
import { stripValues } from 'shared/util';
import { addZoneLoc, getZoneCoord } from 'shared/map';

import { Room } from './room';
import { buildFurniture, removeFurniture } from '../furniture';

const chair_options = [ 8309, 8310, 8311, 8312, 8313, 8314, 8315 ];
const rug_options = [ 8316, 8317, 8318 ];
const bookcase_options = [ 8319, 8320, 8321 ];
const fireplace_options = [ 8325, 8326, 8327 ];

const chair_locations = [ -1, 13581, 13582, 13583, 13584, 13585, 13586, 13587 ];
const rug_corner_locations = [ -1, 13588, 13591, 13594 ];
const rug_edge_locations = [ -1, 13589, 13592, 13595 ];
const rug_center_locations = [ -1, 13590, 13593, 13596 ];
const rug_locations = [ ...rug_corner_locations, ...rug_edge_locations, ...rug_center_locations ];
const bookcase_locations = [ -1, 13597, 13598, 13599 ];
const fireplace_locations = [ -1, 13609, 13611, 13613 ];

//Chair #1
_events.bindEventListener(EventType.OPLOC5, 15410, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 1, chair_options);
	buildChair1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Chair #2
_events.bindEventListener(EventType.OPLOC5, 15411, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 2, chair_options);
	buildChair2(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Chair #3
_events.bindEventListener(EventType.OPLOC5, 15412, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 3, chair_options);
	buildChair3(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//TODO: Chair removal (it's complicated because all three hotspots have the same location IDs...)

//Rug
_events.bindEventListener(EventType.OPLOC5, [ 15413, 15414, 15415 ], async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 4, rug_options);
	buildRug(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Rug
_events.bindEventListener(EventType.OPLOC5, stripValues(rug_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 4);
	buildRug(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Bookcase
_events.bindEventListener(EventType.OPLOC5, 15416, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 5, bookcase_options);
	buildBookcase(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Bookcase
_events.bindEventListener(EventType.OPLOC5, stripValues(bookcase_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 5);
	buildBookcase(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Fireplace
_events.bindEventListener(EventType.OPLOC5, 15418, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 6, fireplace_options);
	buildFireplace(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Fireplace
_events.bindEventListener(EventType.OPLOC5, stripValues(fireplace_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 6);
	buildFireplace(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

export const Parlour = new class implements Room {
	srcCoord = _coords(0,29,79,0,56);
	doors = [ true, false, true, true ];

	preview (player: Player, zoneCoord: CoordGrid, rotation: number) {
		//Chairs
		buildChair1(player, zoneCoord, rotation);
		buildChair2(player, zoneCoord, rotation);
		buildChair3(player, zoneCoord, rotation);
		//buildRug(player, zoneCoord, rotation);
		buildBookcase(player, zoneCoord, rotation);
		buildFireplace(player, zoneCoord, rotation);

		//Curtains
		addZoneLoc(_coords(0,0,0,0,58), zoneCoord, rotation, 15419, 5, 0);
		addZoneLoc(_coords(0,0,0,0,61), zoneCoord, rotation, 15419, 5, 0);
		addZoneLoc(_coords(0,0,0,2,63), zoneCoord, rotation, 15419, 5, 1);
		addZoneLoc(_coords(0,0,0,5,63), zoneCoord, rotation, 15419, 5, 1);
		addZoneLoc(_coords(0,0,0,7,58), zoneCoord, rotation, 15419, 5, 2);
		addZoneLoc(_coords(0,0,0,7,61), zoneCoord, rotation, 15419, 5, 2);
		addZoneLoc(_coords(0,0,0,2,56), zoneCoord, rotation, 15419, 5, 3);
		addZoneLoc(_coords(0,0,0,5,56), zoneCoord, rotation, 15419, 5, 3);
	}

	build (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildChair1(player, zoneCoord, rotation);
		buildChair2(player, zoneCoord, rotation);
		buildChair3(player, zoneCoord, rotation);
		buildRug(player, zoneCoord, rotation);
		buildBookcase(player, zoneCoord, rotation);
		buildFireplace(player, zoneCoord, rotation);
	}
}

function buildChair1 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = chair_locations[varbit(player, 1529)];
	if (locTypeId === -1) {
		locTypeId = 15410;
	}
	addZoneLoc(_coords(0,0,0,2,60), zoneCoord, rotation, locTypeId, 11, 2);
}

function buildChair2 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = chair_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15411;
	}
	addZoneLoc(_coords(0,0,0,5,60), zoneCoord, rotation, locTypeId, 11, 1);
}

function buildChair3 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = chair_locations[varbit(player, 1531)];
	if (locTypeId === -1) {
		locTypeId = 15412;
	}
	addZoneLoc(_coords(0,0,0,4,59), zoneCoord, rotation, locTypeId, 10, 2);
}

function buildRug (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = rug_center_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15413;
	}
	addZoneLoc(_coords(0,0,0,3,59), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,3,60), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,4,59), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,4,60), zoneCoord, rotation, locTypeId, 22, 2);

	locTypeId = rug_edge_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15414;
	}
	addZoneLoc(_coords(0,0,0,2,59), zoneCoord, rotation, locTypeId, 22, 3);
	addZoneLoc(_coords(0,0,0,2,60), zoneCoord, rotation, locTypeId, 22, 3);
	addZoneLoc(_coords(0,0,0,3,58), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,4,58), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,3,61), zoneCoord, rotation, locTypeId, 22, 0);
	addZoneLoc(_coords(0,0,0,4,61), zoneCoord, rotation, locTypeId, 22, 0);
	addZoneLoc(_coords(0,0,0,5,59), zoneCoord, rotation, locTypeId, 22, 1);
	addZoneLoc(_coords(0,0,0,5,60), zoneCoord, rotation, locTypeId, 22, 1);

	locTypeId = rug_corner_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15415;
	}
	addZoneLoc(_coords(0,0,0,2,61), zoneCoord, rotation, locTypeId, 22, 0);
	addZoneLoc(_coords(0,0,0,5,61), zoneCoord, rotation, locTypeId, 22, 1);
	addZoneLoc(_coords(0,0,0,5,58), zoneCoord, rotation, locTypeId, 22, 2);
	addZoneLoc(_coords(0,0,0,2,58), zoneCoord, rotation, locTypeId, 22, 3);
}

function buildBookcase (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = bookcase_locations[varbit(player, 1533)];
	if (locTypeId === -1) {
		locTypeId = 15416;
	}
	addZoneLoc(_coords(0,0,0,0,57), zoneCoord, rotation, locTypeId, 10, 0);
	addZoneLoc(_coords(0,0,0,7,57), zoneCoord, rotation, locTypeId, 10, 2);
}

function buildFireplace (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = fireplace_locations[varbit(player, 1534)];
	if (locTypeId === -1) {
		locTypeId = 15418;
	}
	addZoneLoc(_coords(0,0,0,3,63), zoneCoord, rotation, locTypeId, 10, 1);
}
