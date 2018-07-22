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

const workbench_options = [ 8375, 8376, 8377, 8378, 8379 ];
const crafting_table_options = [ 8380, 8381, 8382, 8383 ];
const tool_store_options = [ 8384, 8385, 8386, 8387, 8388 ];
const repair_bench_options = [ 8389, 8390, 8391 ];
const heraldry_options = [ 8392, 8393, 8394 ];

const workbench_locations = [-1, 13704, 13705, 13706, 13707, 13708, -1, -1 ];
const crafting_table_locations = [-1, 13709, 13710, 13711, 13712, -1, -1, -1 ];
const tool_store_locations = [-1, 13699, 13700, 13701, 13702, 13703, -1, -1 ];
const repair_bench_locations = [ -1, 13713, 13714, 13715 ];
const heraldry_locations = [ -1, 13716, 13717, 13718 ];

//Workbench
_events.bindEventListener(EventType.OPLOC5, 15439, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 1, workbench_options);
	buildWorkbench(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Workbench
_events.bindEventListener(EventType.OPLOC5, stripValues(workbench_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 1);
	buildWorkbench(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Crafting table
_events.bindEventListener(EventType.OPLOC5, 15441, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 2, crafting_table_options);
	buildCraftingTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Crafting table
_events.bindEventListener(EventType.OPLOC5, stripValues(crafting_table_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 2);
	buildCraftingTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//TODO: Building & removing tool storage

//Repair bench
_events.bindEventListener(EventType.OPLOC5, 15448, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 4, repair_bench_options);
	buildRepairBench(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Repair bench
_events.bindEventListener(EventType.OPLOC5, stripValues(repair_bench_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 4);
	buildRepairBench(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Heraldry
_events.bindEventListener(EventType.OPLOC5, 15450, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 5, heraldry_options);
	buildHeraldry(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Heraldry
_events.bindEventListener(EventType.OPLOC5, stripValues(heraldry_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 5);
	buildHeraldry(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

export const Workshop = new class implements Room {
	srcCoord = _coords(0,29,79,0,40);
	doors = [ true, false, true, false ];

	preview (player: Player, zoneCoord: CoordGrid, rotation: number) {
        buildWorkbench(player, zoneCoord, rotation);
        buildCraftingTable(player, zoneCoord, rotation);
        buildToolStore(player, zoneCoord, rotation);
        buildRepairBench(player, zoneCoord, rotation);
        buildHeraldry(player, zoneCoord, rotation);
	}

	build (player: Player, zoneCoord: CoordGrid, rotation: number) {
        buildWorkbench(player, zoneCoord, rotation);
        buildCraftingTable(player, zoneCoord, rotation);
        buildToolStore(player, zoneCoord, rotation);
        buildRepairBench(player, zoneCoord, rotation);
        buildHeraldry(player, zoneCoord, rotation);
	}
}

function buildWorkbench (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = workbench_locations[varbit(player, 1529)];
	if (locTypeId === -1) {
		locTypeId = 15439;
	}
	addZoneLoc(_coords(0,0,0,3,44), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildCraftingTable (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = crafting_table_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15441;
	}
	addZoneLoc(_coords(0,0,0,0,43), zoneCoord, rotation, locTypeId, 10, 3);
}

function buildToolStore (player: Player, zoneCoord: CoordGrid, rotation: number) {
    const toolStoreLevel = varbit(player, 1531) as number;
	const toolStore1 = toolStoreLevel >= 1 ? 13699 : 15443;
	addZoneLoc(_coords(0,0,0,1,40), zoneCoord, rotation, toolStore1, 5, 3);

	const toolStore2 = toolStoreLevel >= 2 ? 13700 : 15444;
	addZoneLoc(_coords(0,0,0,6,40), zoneCoord, rotation, toolStore2, 5, 3);

	const toolStore3 = toolStoreLevel >= 3 ? 13701 : 15445;
	addZoneLoc(_coords(0,0,0,0,41), zoneCoord, rotation, toolStore3, 5, 0);

	const toolStore4 = toolStoreLevel >= 4 ? 13702 : 15446;
	addZoneLoc(_coords(0,0,0,7,41), zoneCoord, rotation, toolStore4, 5, 2);

	const toolStore5 = toolStoreLevel >= 5 ? 13703 : 15447;
	addZoneLoc(_coords(0,0,0,0,46), zoneCoord, rotation, toolStore5, 5, 0);
}

function buildRepairBench (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = repair_bench_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15448;
	}
	addZoneLoc(_coords(0,0,0,7,43), zoneCoord, rotation, locTypeId, 10, 1);
}

function buildHeraldry (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = heraldry_locations[varbit(player, 1533)];
	if (locTypeId === -1) {
		locTypeId = 15450;
	}
	addZoneLoc(_coords(0,0,0,7,46), zoneCoord, rotation, locTypeId, 10, 1);
}
