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
import { Player, CoordGrid } from 'engine/models';
import { varbit } from 'engine/var';

import _coords from 'shared/map/coords';
import { stripValues } from 'shared/util';
import { getZoneCoord, addZoneLoc } from 'shared/map';

import { Room } from './room';
import { buildFurniture, removeFurniture } from '../furniture';

const centerpiece_options = [ 8168, 8169, 8170, 8171, 8172 ];
const tree_options = [ 8173, 8174, 8175, 8176, 8177, 8178, 8179 ];
const big_plant_1_options = [ 8186, 8187, 8188 ];
const big_plant_2_options = [ 8189, 8190, 8191 ];
const small_plant_1_options = [ 8180, 8181, 8182 ];
const small_plant_2_options = [ 8183, 8184, 8185 ];

const centerpiece_locations = [ -1, 13405, 13406, 13407, 13408, 13409, -1, -1 ];
const big_tree_locations = [ -1, 13411, 13412, 13413, 13414, 13415, 13416, 13417 ];
const tree_locations = [ -1, 13418, 13419, 13420, 13421, 13422, 13423, 13424 ];
const big_plant_1_locations = [ -1, 13425, 13426, 13427 ];
const big_plant_2_locations = [ -1, 13428, 13429, 13430 ];
const small_plant_1_locations = [ -1, 13431, 13432, 13433 ];
const small_plant_2_locations = [ -1, 13434, 13435, 13436 ];

//Build Centerpiece
_events.bindEventListener(EventType.OPLOC5, 15361, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 1, centerpiece_options);
	buildCenterpiece(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Centerpiece
_events.bindEventListener(EventType.OPLOC5, stripValues(centerpiece_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 1);
	buildCenterpiece(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Big Tree
_events.bindEventListener(EventType.OPLOC5, 15362, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 2, tree_options);
	buildBigTree(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Big Tree
_events.bindEventListener(EventType.OPLOC5, stripValues(big_tree_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 2);
	buildBigTree(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Tree
_events.bindEventListener(EventType.OPLOC5, 15363, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 3, tree_options);
	buildTree(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Tree
_events.bindEventListener(EventType.OPLOC5, stripValues(tree_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 3);
	buildTree(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Big Plant 1
_events.bindEventListener(EventType.OPLOC5, 15364, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 4, big_plant_1_options);
	buildBigPlant1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Big Plant 1
_events.bindEventListener(EventType.OPLOC5, stripValues(big_plant_1_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 4);
	buildBigPlant1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Big Plant 2
_events.bindEventListener(EventType.OPLOC5, 15365, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 5, big_plant_2_options);
	buildBigPlant2(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Big Plant 2
_events.bindEventListener(EventType.OPLOC5, stripValues(big_plant_2_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 5);
	buildBigPlant2(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Small Plant 1
_events.bindEventListener(EventType.OPLOC5, 15366, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 6, small_plant_1_options);
	buildSmallPlant1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Small Plant 1
_events.bindEventListener(EventType.OPLOC5, stripValues(small_plant_1_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 6);
	buildSmallPlant1(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Small Plant 2
_events.bindEventListener(EventType.OPLOC5, 15367, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 7, small_plant_2_options);
	buildSmallPlant2(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Small Plant 2
_events.bindEventListener(EventType.OPLOC5, stripValues(small_plant_2_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 7);
	buildSmallPlant2(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

export const Garden = new class implements Room {
	srcCoord = _coords(0,29,79,0,8);
	doors = [true, true, true, true];

	preview (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildCenterpiece(player, zoneCoord, rotation);
		buildBigTree(player, zoneCoord, rotation);
		buildTree(player, zoneCoord, rotation);
		buildBigPlant1(player, zoneCoord, rotation);
		buildBigPlant2(player, zoneCoord, rotation);
		buildSmallPlant1(player, zoneCoord, rotation);
		buildSmallPlant2(player, zoneCoord, rotation);
	}

	build (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildCenterpiece(player, zoneCoord, rotation);
		buildBigTree(player, zoneCoord, rotation);
		buildTree(player, zoneCoord, rotation);
		buildBigPlant1(player, zoneCoord, rotation);
		buildBigPlant2(player, zoneCoord, rotation);
		buildSmallPlant1(player, zoneCoord, rotation);
		buildSmallPlant2(player, zoneCoord, rotation);
	}
};

function buildCenterpiece (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = centerpiece_locations[varbit(player, 1529)];
	if (locTypeId === -1) {
		locTypeId = 15361;
	}
	addZoneLoc(_coords(0,0,0,3,11), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildBigTree (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = big_tree_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15362;
	}
	addZoneLoc(_coords(0,0,0,1,13), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildTree (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = tree_locations[varbit(player, 1531)];
	if (locTypeId === -1) {
		locTypeId = 15363;
	}
	addZoneLoc(_coords(0,0,0,6,14), zoneCoord, rotation, locTypeId, 10, 1);
}

function buildBigPlant1 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = big_plant_1_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15364;
	}
	addZoneLoc(_coords(0,29,79,6,8), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildBigPlant2 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = big_plant_2_locations[varbit(player, 1533)];
	if (locTypeId === -1) {
		locTypeId = 15365;
	}
	addZoneLoc(_coords(0,29,79,0,8), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildSmallPlant1 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = small_plant_1_locations[varbit(player, 1534)];
	if (locTypeId === -1) {
		locTypeId = 15366;
	}
	addZoneLoc(_coords(0,29,79,3,9), zoneCoord, rotation, locTypeId, 10, 0);
}

function buildSmallPlant2 (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = small_plant_2_locations[varbit(player, 1535)];
	if (locTypeId === -1) {
		locTypeId = 15367;
	}
	addZoneLoc(_coords(0,29,79,4,13), zoneCoord, rotation, locTypeId, 10, 0);
}
