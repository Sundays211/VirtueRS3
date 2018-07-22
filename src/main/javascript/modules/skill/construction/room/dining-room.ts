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
import { getZoneCoord, addZoneLoc } from 'shared/map';
import { stripValues } from 'shared/util';

import { buildFurniture, removeFurniture } from '../furniture';
import { Room } from './room';

const dining_bench_options = [ 8108, 8109, 8110, 8111, 8112, 8113, 8114 ];
const dining_table_options = [ 8115, 8116, 8117, 8118, 8119, 8120, 8121 ];
const fireplace_options = [ 8325, 8326, 8327 ];
const curtain_options = [ 8322, 8323, 8324 ];
const wall_decoration_options = [ 8102, 8103, 8104 ];
const bell_pull_options = [ 8099, 8100, 8101 ];

const dining_table_locations = [-1, 13293, 13294, 13295, 13296, 13297, 13298, 13299 ];
const dining_bench_locations = [-1, 13300, 13301, 13302, 13303, 13304, 13305, 13306 ];
const fireplace_locations = [ -1, 13609, 13611, 13613 ];
const curtain_locations = [ -1, 13603, 13604, 13605 ];
const wall_decoration_locations = [ -1, 13606, 13607, 13608 ];
const bell_pull_locations = [ -1, 13307, 13308, 13309 ];

//Dining Table
_events.bindEventListener(EventType.OPLOC5, 15298, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 1, dining_table_options);
	buildDiningTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Dining Table
_events.bindEventListener(EventType.OPLOC5, stripValues(dining_table_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 1);
	buildDiningTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Dining Bench 1
_events.bindEventListener(EventType.OPLOC5, 15299, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 2, dining_bench_options);
	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Bench 1
//TODO: Bench removal (it's complicated because both hotspots have the same location IDs...)
// _events.bindEventListener(EventType.OPLOC5, stripValues(dining_bench_locations, -1), async (ctx) => {
// 	const roomCoord = getZoneCoord(ctx.location);
// 	await removeFurniture(ctx.player, roomCoord, 2);
// 	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
// });

//Dining Bench 2
_events.bindEventListener(EventType.OPLOC5, 15300, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 3, dining_bench_options);
	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Bench 2
// _events.bindEventListener(EventType.OPLOC5, stripValues(dining_bench_locations, -1), async (ctx) => {
// 	const roomCoord = getZoneCoord(ctx.location);
// 	await removeFurniture(ctx.player, roomCoord, 3);
// 	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
// });

//Fireplace
_events.bindEventListener(EventType.OPLOC5, 15301, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 4, fireplace_options);
	buildFireplace(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Fireplace
//TODO: Fireplace removal (the same location IDs are also used in several other rooms)
// _events.bindEventListener(EventType.OPLOC5, stripValues(fireplace_locations, -1), async (ctx) => {
// 	const roomCoord = getZoneCoord(ctx.location);
// 	await removeFurniture(ctx.player, roomCoord, 4);
// 	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
// });

//Curtains
_events.bindEventListener(EventType.OPLOC5, 15302, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 5, curtain_options);
	buildFireplace(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Curtains
//TODO: Curtain removal (the same location IDs are also used in several other rooms)
// _events.bindEventListener(EventType.OPLOC5, stripValues(curtain_locations, -1), async (ctx) => {
// 	const roomCoord = getZoneCoord(ctx.location);
// 	await removeFurniture(ctx.player, roomCoord, 5);
// 	buildDiningBench1(ctx.player, roomCoord, varbit(ctx.player, 1527));
// });

//Wall Decorations
_events.bindEventListener(EventType.OPLOC5, 15303, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 6, wall_decoration_options);
	buildWallDecorations(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Wall Decorations
_events.bindEventListener(EventType.OPLOC5, stripValues(wall_decoration_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 6);
	buildWallDecorations(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Bell Pull
_events.bindEventListener(EventType.OPLOC5, 15304, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 7, bell_pull_options);
	buildBellPull(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Bell Pull
_events.bindEventListener(EventType.OPLOC5, stripValues(bell_pull_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 7);
	buildBellPull(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

export const DiningRoom = new class implements Room {
	srcCoord = _coords(0,29,79,32,56);
	doors = [ false, true, true, true ];

	preview (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildDiningTable(player, zoneCoord, rotation);
        buildDiningBench1(player, zoneCoord, rotation);
        buildDiningBench2(player, zoneCoord, rotation);
        buildFireplace(player, zoneCoord, rotation);
        buildCurtains(player, zoneCoord, rotation);
        buildWallDecorations(player, zoneCoord, rotation);
        buildBellPull(player, zoneCoord, rotation);
	}

	build (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildDiningTable(player, zoneCoord, rotation);
        buildDiningBench1(player, zoneCoord, rotation);
        buildDiningBench2(player, zoneCoord, rotation);
        buildFireplace(player, zoneCoord, rotation);
        buildCurtains(player, zoneCoord, rotation);
        buildWallDecorations(player, zoneCoord, rotation);
        buildBellPull(player, zoneCoord, rotation);
	}
}

function buildDiningTable (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = dining_table_locations[varbit(player, 1529)];
	if (locTypeId === -1) {
		locTypeId = 15298;
	}
	addZoneLoc(_coords(0,0,0,34,59), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildDiningBench1 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = dining_bench_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15299;
	}
	addZoneLoc(_coords(0,0,0,34,61), zoneCoord, rotation, locTypeId, 10, 0);
	addZoneLoc(_coords(0,0,0,35,61), zoneCoord, rotation, locTypeId, 10, 0);
	addZoneLoc(_coords(0,0,0,36,61), zoneCoord, rotation, locTypeId, 10, 0);
	addZoneLoc(_coords(0,0,0,37,61), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildDiningBench2 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = dining_bench_locations[varbit(player, 1531)];
	if (locTypeId === -1) {
		locTypeId = 15300;
	}
	addZoneLoc(_coords(0,0,0,34,58), zoneCoord, rotation, locTypeId, 10, 2);
	addZoneLoc(_coords(0,0,0,35,58), zoneCoord, rotation, locTypeId, 10, 2);
	addZoneLoc(_coords(0,0,0,36,58), zoneCoord, rotation, locTypeId, 10, 2);
	addZoneLoc(_coords(0,0,0,37,58), zoneCoord, rotation, locTypeId, 10, 2);
}

function buildFireplace (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = fireplace_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15301;
	}
	addZoneLoc(_coords(0,0,0,35,63), zoneCoord, rotation, locTypeId, 10, 1);
}

function buildCurtains (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = curtain_locations[varbit(player, 1533)];
	if (locTypeId === -1) {
		locTypeId = 15302;
	}
    addZoneLoc(_coords(0,0,0,32,61), zoneCoord, rotation, locTypeId, 5, 0);
    addZoneLoc(_coords(0,0,0,32,58), zoneCoord, rotation, locTypeId, 5, 0);
    addZoneLoc(_coords(0,0,0,34,56), zoneCoord, rotation, locTypeId, 5, 3);
    addZoneLoc(_coords(0,0,0,37,56), zoneCoord, rotation, locTypeId, 5, 3);
    addZoneLoc(_coords(0,0,0,39,58), zoneCoord, rotation, locTypeId, 5, 2);
    addZoneLoc(_coords(0,0,0,39,61), zoneCoord, rotation, locTypeId, 5, 2);
}

function buildWallDecorations (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = wall_decoration_locations[varbit(player, 1534)];
	if (locTypeId === -1) {
		locTypeId = 15301;
	}
    addZoneLoc(_coords(0,0,0,34,63), zoneCoord, rotation, locTypeId, 5, 1);
    addZoneLoc(_coords(0,0,0,37,63), zoneCoord, rotation, locTypeId, 5, 1);
}

function buildBellPull (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = bell_pull_locations[varbit(player, 1535)];
	if (locTypeId === -1) {
		locTypeId = 15301;
	}
	addZoneLoc(_coords(0,0,0,32,56), zoneCoord, rotation, locTypeId, 10, 2);
}
