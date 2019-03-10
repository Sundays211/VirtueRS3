/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
import { EventType } from "engine/enums";
import _events from 'engine/events';
import _entity from 'engine/entity';
import { CoordGrid, EventContext, Player } from "engine/models";

import _coords from "shared/map/coords";
import { defaultHandler } from "shared/util";
import { isWearing } from "shared/inv";
import { sendMessage } from "shared/chat";

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */
_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2452, function(ctx) {
	enterRunes(ctx.player, AIR_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2453, function(ctx) {
	enterRunes(ctx.player, MIND_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2454, function(ctx) {
	enterRunes(ctx.player, WATER_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2455, function(ctx) {
	enterRunes(ctx.player, EARTH_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2456, function(ctx) {
	enterRunes(ctx.player, FIRE_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2457, function(ctx) {
	enterRunes(ctx.player, BODY_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2458, function(ctx) {
	enterRunes(ctx.player, COSMIC_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2461, function(ctx) {
	enterRunes(ctx.player, CHAOS_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2460, function(ctx) {
	enterRunes(ctx.player, NATURE_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2459, function(ctx) {
	enterRunes(ctx.player, LAW_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2462, function(ctx) {
	enterRunes(ctx.player, DEATH_RUNES, ctx.useObjId, ctx);
});

_events.bindEventListener([EventType.OPLOCU, EventType.OPLOC1], 2464, function(ctx) {
	enterRunes(ctx.player, BLOOD_RUNES, ctx.useObjId, ctx);
});


function enterRunes(player: Player, runes: MysteriousRunes, useObjId: number, ctx: EventContext) {
	if (useObjId == runes.talisman) {	
	} else if (!isWearing(player, runes.tiara) && !isWearing(player, runes.staff)) {
		sendMessage(player, runes.noAccessMsg);
		return;
	}
	sendMessage(player, "You feel a powerful force take hold of you.");
	var dest = runes.destination;
	_entity.setCoords(player, dest);
}

class MysteriousRunes {
	public readonly destination: CoordGrid;
	public readonly talisman: number;
	public readonly tiara: number;
	public readonly staff: number;
	public readonly noAccessMsg: string;

	constructor({ destination, talisman, tiara, staff, noAccessMsg }: MysteriousRunes) {
		this.destination = destination;
		this.talisman = talisman;
		this.tiara = tiara;
		this.staff = staff;
		this.noAccessMsg = noAccessMsg;
	}
}

const AIR_RUNES = new MysteriousRunes({
	destination: _coords(2841, 4829, 0),
	talisman: 1438,
	tiara: 5527,
	staff: 13630,
	noAccessMsg: "You need an air talisman to access the Air Altar."
});

const MIND_RUNES = new MysteriousRunes({
	destination: _coords(2792, 4827, 0),
	talisman: 1448,
	tiara: 5529,
	staff: 13631,
	noAccessMsg: "You need a mind talisman to access the Mind Altar."
});

const WATER_RUNES = new MysteriousRunes({
	destination: _coords(3482, 4838, 0),
	talisman: 1444,
	tiara: 5531,
	staff: 13632,
	noAccessMsg: "You need a water talisman to access the Water Altar."
});

const EARTH_RUNES = new MysteriousRunes({
	destination: _coords(2655, 4830, 0),
	talisman: 1440,
	tiara: 5535,
	staff: 13633,
	noAccessMsg: "You need an earth talisman to access the Earth Altar."
});

const FIRE_RUNES = new MysteriousRunes({
	destination: _coords(2574, 4848, 0),
	talisman: 1442,
	tiara: 5537,
	staff: 13634,
	noAccessMsg: "You need a fire talisman to access the Fire Altar."
});

const BODY_RUNES = new MysteriousRunes({
	destination: _coords(2522, 4835, 0),
	talisman: 1446,
	tiara: 5533,
	staff: 13635,
	noAccessMsg: "You need a body talisman to access the Body Altar."
});

const COSMIC_RUNES = new MysteriousRunes({
	destination: _coords(2142, 4853, 0),
	talisman: 1454,
	tiara: 5539,
	staff: 13636,
	noAccessMsg: "You need a cosmic talisman to access the Cosmic Altar."
});

const CHAOS_RUNES = new MysteriousRunes({
	destination: _coords(2281, 4837, 0),
	talisman: 1452,
	tiara: 5543,
	staff: 13637,
	noAccessMsg: "You need a chaos talisman to access the Chaos Altar."
});

const NATURE_RUNES = new MysteriousRunes({
	destination: _coords(2398, 4841, 0),
	talisman: 1462,
	tiara: 5541,
	staff: 13638,
	noAccessMsg: "You need a nature talisman to access the Nature Altar."
});

const LAW_RUNES = new MysteriousRunes({
	destination: _coords(2464, 4818, 0),
	talisman: 1458,
	tiara: 5545,
	staff: 13639,
	noAccessMsg: "You need a law talisman to access the Law Altar."
});

const DEATH_RUNES = new MysteriousRunes({
	destination: _coords(2208, 4830, 0),
	talisman: 1456,
	tiara: 5547,
	staff: 13640,
	noAccessMsg: "You need a death talisman to access the Death Altar."
});

const BLOOD_RUNES = new MysteriousRunes({
	destination: _coords(2468, 4889, 1),
	talisman: 1450,
	tiara: 5549,
	staff: 13641,
	noAccessMsg: "You need a blood talisman to access the Blood Altar."
});
