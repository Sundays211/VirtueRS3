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
import { addZoneLoc, getZoneCoord } from 'shared/map';
import { giveItem } from 'shared/inv';
import { multi2, multi3, multi4, multi5 } from 'shared/dialog';
import { sendMessage } from 'shared/chat';
import { runAnim } from 'shared/anim';

import { Room } from './room';
import { buildFurniture, removeFurniture } from '../furniture';

const range_options = [ 8216, 8217, 8218, 8219, 8220, 8221, 8222 ];
const shelves_options = [ 8223, 8224, 8225, 8226, 8227, 8228, 8229 ];
const beer_barrel_options = [ 8239, 8240, 8241, 8242, 8243, 8244 ];
const cat_basket_options = [ 8236, 8237, 8238 ];
const larder_options = [ 8233, 8234, 8235 ];
const sink_options = [ 8230, 8231, 8232 ];
const table_options = [ 8246, 8247, 8248 ];

const range_locations = [ -1, 13528, 13529, 13531, 13533, 13536, 13539, 13542 ];
const shelves_1_locations = [ -1, 13545, 13546, 13547, 13548, 13549, 13550, 13551 ];
const shelves_2_locations = [ -1, 13552, 13553, 13554, 13555, 13556, 13557, 13558 ];
const shelves_locations = [ ...shelves_1_locations, ...shelves_2_locations ];
const beer_barrel_locations = [ -1, 13568, 13569, 13570, 13571, 13572, 13573 ];
const cat_basket_locations = [ -1, 13574, 13575, 13576 ];
const larder_locations = [ -1, 13565, 13566, 13567 ];
const sink_locations = [ -1, 13559, 13561, 13563 ];
const table_locations = [ -1, 13577, 13578, 13579 ];


_events.bindEventListener(EventType.OPLOCU, 13563, async (ctx) => {//Stove
	switch (ctx.useObjId) {
	    case 7688://kettle
		    runAnim(ctx.player, 3625, function () {
		        sendMessage(ctx.player, "kettle");
				runAnim(ctx.player, -1);
	        });
	    return;
	}
});

//Stove
_events.bindEventListener(EventType.OPLOC5, 15398, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 1, range_options);
	buildStove(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Stove
_events.bindEventListener(EventType.OPLOC5, stripValues(range_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 1);
	buildStove(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//build Shelves
_events.bindEventListener(EventType.OPLOC5, [ 15399, 15400 ], async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 2, shelves_options);
	buildShelves(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//search Wooden shelves 1
_events.bindEventListener(EventType.OPLOC1,[ 13545, 13552 ], async (ctx) => {
	multi3(ctx.player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(ctx.player, 7688, 1);
	}, "Teapot", () => {
		giveItem(ctx.player, 7702, 1);
	}, "Cup", () => {
		giveItem(ctx.player, 7728, 1);
	});
});


//search Wooden shelves 2
_events.bindEventListener(EventType.OPLOC1,[ 13546, 13553 ], async (ctx) => {
	multi4(ctx.player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(ctx.player, 7688, 1);
	}, "Teapot", () => {
		giveItem(ctx.player, 7702, 1);
	}, "Cup", () => {
		giveItem(ctx.player, 7728, 1);
	}, "Beer glass", () => {
		giveItem(ctx.player, 7742, 1);	
	});
});

//search Wooden shelves 3
_events.bindEventListener(EventType.OPLOC1,[ 13547, 13554 ], async (ctx) => {
	multi5(ctx.player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(ctx.player, 7688, 1);
	}, "Teapot", () => {
		giveItem(ctx.player, 7714, 1);
	}, "Cup", () => {
		giveItem(ctx.player, 7732, 1);
	}, "Beer glass", () => {
		giveItem(ctx.player, 7742, 1);	
	}, "Cake tin", () => {
		giveItem(ctx.player, 1887, 1);	
	});
});

//search Oak shelves 1
_events.bindEventListener(EventType.OPLOC1,[ 13548, 13555 ], async (ctx) => {
	Oakshelves1(ctx.player);
});

async function Oakshelves1 (player: Player) {
	multi5(player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(player, 7688, 1);
	}, "Teapot", () => {
		giveItem(player, 7702, 1);
	}, "Cup", () => {
		giveItem(player, 7728, 1);
	}, "Beer glass", () => {
		giveItem(player, 7742, 1);	
	}, "More...", () => {
		Oakshelves1more(player);
	});
}

async function Oakshelves1more (player: Player) {
	multi3(player, "SELECT AN OPTION", "Cake tin", () => {
		giveItem(player, 1887, 1);
	}, "Bowl", () => {
		giveItem(player, 1923, 1);	
	}, "More...", () => {
		Oakshelves1(player);
	});
}


//search Oak shelves 2
_events.bindEventListener(EventType.OPLOC1,[ 13549, 13556 ], async (ctx) => {
	Oakshelves2(ctx.player);
});

async function Oakshelves2 (player: Player) {
	multi5(player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(player, 7688, 1);
	}, "Teapot", () => {
		giveItem(player, 7714, 1);
	}, "Cup", () => {
		giveItem(player, 7732, 1);
	}, "Beer glass", () => {
		giveItem(player, 7742, 1);	
	}, "More...", () => {
		Oakshelves2more(player);
	});
}

async function Oakshelves2more (player: Player) {
	multi4(player, "SELECT AN OPTION", "Cake tin", () => {
		giveItem(player, 1887, 1);
	}, "Bowl", () => {
		giveItem(player, 1923, 1);	
	}, "Pie dish", () => {
		giveItem(player, 2313, 1);		
	}, "More...", () => {
		Oakshelves2(player);
	});
}


//search Teak shelves 1
_events.bindEventListener(EventType.OPLOC1,[ 13550, 13557 ], async (ctx) => {
	Teakshelves1(ctx.player);
});

async function Teakshelves1 (player: Player) {
	multi5(player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(player, 7688, 1);
	}, "Teapot", () => {
		giveItem(player, 7714, 1);
	}, "Cup", () => {
		giveItem(player, 7732, 1);
	}, "Beer glass", () => {
		giveItem(player, 7742, 1);	
	}, "More...", () => {
		Teakshelves1more(player);
	});
}

async function Teakshelves1more (player: Player) {
	multi5(player, "SELECT AN OPTION", "Cake tin", () => {
		giveItem(player, 1887, 1);
	}, "Bowl", () => {
		giveItem(player, 1923, 1);	
	}, "Pie dish", () => {
		giveItem(player, 2313, 1);	
    }, "Pot", () => {
		giveItem(player, 1931, 1);			
	}, "More...", () => {
		Teakshelves1(player);
	});
}


//search Teak shelves 2
_events.bindEventListener(EventType.OPLOC1,[ 13551, 13558 ], async (ctx) => {
	Teakshelves2(ctx.player);
});

async function Teakshelves2 (player: Player) {
	multi5(player, "SELECT AN OPTION", "Kettle", () => {
		giveItem(player, 7688, 1);
	}, "Teapot", () => {
		giveItem(player, 7726, 1);
	}, "Cup", () => {
		giveItem(player, 7735, 1);
	}, "Beer glass", () => {
		giveItem(player, 7742, 1);	
	}, "More...", () => {
		Teakshelves2more(player);
	});
}

async function Teakshelves2more (player: Player) {
	multi5(player, "SELECT AN OPTION", "Cake tin", () => {
		giveItem(player, 1887, 1);
	}, "Bowl", () => {
		giveItem(player, 1923, 1);	
	}, "Pie dish", () => {
		giveItem(player, 2313, 1);	
    }, "Pot", () => {
		giveItem(player, 1931, 1);			
	}, "More...", () => {
		Teakshelves2moremore(player);
	});
}

async function Teakshelves2moremore (player: Player) {
	multi2(player, "SELECT AN OPTION", "Chef's hat", () => {
		giveItem(player, 1949, 1);		
	}, "More...", () => {
		Teakshelves2(player);
	});
}

//Remove Shelves
_events.bindEventListener(EventType.OPLOC5, stripValues(shelves_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 2);
	buildShelves(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Beer barrel
_events.bindEventListener(EventType.OPLOC5, 15401, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 3, beer_barrel_options);
	buildBeerBarrel(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Beer barrel
_events.bindEventListener(EventType.OPLOC5, stripValues(beer_barrel_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 3);
	buildBeerBarrel(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Cat basket
_events.bindEventListener(EventType.OPLOC5, 15402, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 4, cat_basket_options);
	buildCatBasket(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Cat basket
_events.bindEventListener(EventType.OPLOC5, stripValues(cat_basket_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 4);
	buildCatBasket(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Larder
_events.bindEventListener(EventType.OPLOC5, 15403, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 5, larder_options);
	buildLarder(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Larder
_events.bindEventListener(EventType.OPLOC5, stripValues(larder_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 5);
	buildLarder(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Sink
_events.bindEventListener(EventType.OPLOC5, 15404, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 6, sink_options);
	buildSink(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Sink
_events.bindEventListener(EventType.OPLOC5, stripValues(sink_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 6);
	buildSink(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Table
_events.bindEventListener(EventType.OPLOC5, 15405, async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await buildFurniture(ctx.player, roomCoord, 7, table_options);
	buildTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

//Remove Sink
_events.bindEventListener(EventType.OPLOC5, stripValues(sink_locations, -1), async (ctx) => {
	const roomCoord = getZoneCoord(ctx.location);
	await removeFurniture(ctx.player, roomCoord, 7);
	buildTable(ctx.player, roomCoord, varbit(ctx.player, 1527));
});

export const Kitchen = new class implements Room {
	srcCoord = _coords(0,29,79,16,56);
	doors = [ true, false, false, true ];

	preview (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildStove(player, zoneCoord, rotation);
		buildShelves(player, zoneCoord, rotation);
		buildBeerBarrel(player, zoneCoord, rotation);
		buildCatBasket(player, zoneCoord, rotation);
		buildLarder(player, zoneCoord, rotation);
		buildSink(player, zoneCoord, rotation);
		buildTable(player, zoneCoord, rotation);
	}

	build (player: Player, zoneCoord: CoordGrid, rotation: number) {
		buildStove(player, zoneCoord, rotation);
		buildShelves(player, zoneCoord, rotation);
		buildBeerBarrel(player, zoneCoord, rotation);
		buildCatBasket(player, zoneCoord, rotation);
		buildLarder(player, zoneCoord, rotation);
		buildSink(player, zoneCoord, rotation);
		buildTable(player, zoneCoord, rotation);
	}
}

function buildStove (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = range_locations[varbit(player, 1529)];
	if (locTypeId === -1) {
		locTypeId = 15398;
	}
	addZoneLoc(_coords(0,0,0,19,63), zoneCoord, rotation, locTypeId, 10, 1);
}

function buildShelves (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = shelves_1_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15399;
	}
	addZoneLoc(_coords(0,0,0,23,62), zoneCoord, rotation, locTypeId, 5, 2);

	locTypeId = shelves_2_locations[varbit(player, 1530)];
	if (locTypeId === -1) {
		locTypeId = 15400;
	}
	addZoneLoc(_coords(0,0,0,17,63), zoneCoord, rotation, locTypeId, 5, 1);
	addZoneLoc(_coords(0,0,0,22,63), zoneCoord, rotation, locTypeId, 5, 1);
}

function buildBeerBarrel (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = beer_barrel_locations[varbit(player, 1531)];
	if (locTypeId === -1) {
		locTypeId = 15401;
	}
	addZoneLoc(_coords(0,0,0,16,62), zoneCoord, rotation, locTypeId, 10, 3);
}

function buildCatBasket (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = cat_basket_locations[varbit(player, 1532)];
	if (locTypeId === -1) {
		locTypeId = 15402;
	}
	addZoneLoc(_coords(0,0,0,16,56), zoneCoord, rotation, locTypeId, 22, 0);
}

function buildLarder (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = larder_locations[varbit(player, 1533)];
	if (locTypeId === -1) {
		locTypeId = 15403;
	}
	addZoneLoc(_coords(0,0,0,22,56), zoneCoord, rotation, locTypeId, 10, 2);
}

function buildSink (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = sink_locations[varbit(player, 1534)];
	if (locTypeId === -1) {
		locTypeId = 15404;
	}
	addZoneLoc(_coords(0,0,0,23,59), zoneCoord, rotation, locTypeId, 10, 2);
}

function buildTable (player: Player, zoneCoord: CoordGrid, rotation: number) {
	var locTypeId = table_locations[varbit(player, 1535)];
	if (locTypeId === -1) {
		locTypeId = 15405;
	}
	addZoneLoc(_coords(0,0,0,19,59), zoneCoord, rotation, locTypeId, 10, 2);
}
