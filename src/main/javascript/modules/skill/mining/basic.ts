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
import { Stat, EventType } from 'engine/enums';
import { Player, Location } from 'engine/models';
import _config from 'engine/config';
import _events from 'engine/events';
import _map from 'engine/map';

import { sendMessage, sendSpamMessage } from 'shared/chat';
import { getId } from 'shared/util';
import { addLocation, getLocRotation, getLocShape } from 'shared/map';
import { giveItem, invHasSpace } from 'shared/inv';
import { giveXp } from 'shared/stat';

import { runMiningAction } from './common';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
_events.bindEventListener(EventType.OPLOC1, [11556, 11557, 72078, 72079, 72080, 72084, 72085, 72086, 72089, 72090, 72091], (ctx) => {
	sendMessage(ctx.player, "There is no ore currently available in this rock.");
});

_events.bindEventListener(EventType.OPLOC1, [
	2108, 2109, 5766, 5767, 9711, 9713, 10577, 10578, 10579, 10949, 11189, 11190, 11191, 14904, 14905, 15503, 15504, 15505, 32429, 32430, 32431, 67006, 67007, 67008, 72075, 72076, 72077, 75619, 75620
], (ctx) => {
	mineRock(ctx.player, ctx.location, CLAY_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2090, 2091, 3027, 3229, 5779, 5780, 5781, 9708, 9709, 9710, 11936, 11937, 11938, 11960, 11961, 11962, 14906, 14907, 18991, 18992, 18993, 21284, 21285, 21286, 29230, 29231, 67012, 67013, 67014, 72098, 72099, 72100, 75632, 75633, 75634, 88640, 88876, 88878
], (ctx) => {
	mineRock(ctx.player, ctx.location, COPPER_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2094, 2095, 3038, 3245, 5776, 5777, 5778, 9714, 9716, 11933, 11934, 11935, 11957, 11958, 11959, 14902, 14903, 18994, 18995, 18996, 19024, 19025, 19026, 21293, 21294, 21295, 29227, 29229, 67009, 67010, 67011, 72092, 72093, 72094, 75629, 75630, 75631, 88642, 88877, 88879
], (ctx) => {
	mineRock(ctx.player, ctx.location, TIN_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [2561, 33221], (ctx) => {
	mineRock(ctx.player, ctx.location, BLURITE_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2092, 2093, 5773, 5774, 5775, 6943, 6944, 9717, 9718, 9719, 11954, 11955, 11956, 14856, 14857, 14858, 14913, 14914, 19000, 19001, 19002, 21281, 21282, 21283, 29221, 29222, 29223, 32441, 32442, 32443, 32451, 32452, 37307, 37308, 37309, 67004, 67005, 72081, 72082, 72083, 75616, 75617, 75626, 75627, 75628, 88641
], (ctx) => {
	mineRock(ctx.player, ctx.location, IRON_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2100, 2101, 6945, 6946, 11186, 11187, 11188, 11948, 11949, 11950, 15579, 15580, 15581, 16998, 16999, 17000, 29224, 29225, 29226, 32444, 32445, 32446, 37304, 37305, 37306, 37670
], (ctx) => {
	mineRock(ctx.player, ctx.location, SILVER_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [2096, 2097, 3032, 3233, 5770, 5771, 5772, 10948, 11930, 11931,
	11932, 11963, 11964, 14850, 14851, 14852, 15246, 15247, 15248, 18997, 18998, 18999, 21287,
	21288, 21289, 29215, 29216, 29217, 31167, 31168, 31169, 32426, 32427, 32428, 32449, 32450,
	75623, 75624, 75625, 93018, 93019], function(ctx) {
		mineRock(ctx.player, ctx.location, COAL_ROCK);
	});

_events.bindEventListener(EventType.OPLOC1, [
	2098, 2099, 2609, 2610, 2611, 5768, 5769, 9720, 9722, 10574, 10575, 10576, 11183, 11184, 11185, 11951, 11952, 11953, 15576, 15577, 15578, 17001, 17002, 17003, 32432, 32433, 32434, 37310, 37312, 45067, 45068, 59426, 59427, 72087, 72088, 75621, 75622
], (ctx) => {
	mineRock(ctx.player, ctx.location, GOLD_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2102, 2103, 3041, 3280, 5784, 5785, 5786, 11942, 11943, 11944, 11946, 11947, 14853, 14854, 14855, 19012, 19013, 19014, 21278, 21279, 21280, 25368, 25369, 25370, 29236, 31170, 32438, 32439, 32440, 75637, 75638, 75639, 78908, 78909, 78910, 93016, 93017
], (ctx) => {
	mineRock(ctx.player, ctx.location, MITHRIL_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	2104, 2105, 3040, 3273, 5782, 5783, 11939, 11941, 14862, 14863, 14864, 19018, 19019, 19020, 21275, 21276, 21277, 29233, 29235, 31173, 31174, 32435, 32436, 32437, 75635, 75636, 93020, 93021
], (ctx) => {
	mineRock(ctx.player, ctx.location, ADAMANTITE_ROCK);
});

_events.bindEventListener(EventType.OPLOC1, [
	14859, 14860, 33078, 33079, 37208, 45069, 45070, 75615, 75618, 93022, 93023
], (ctx) => {
	mineRock(ctx.player, ctx.location, RUNITE_ROCK);
});



class Rock {

	public readonly level: number;
	public readonly xp: number;
	public readonly oreId: number;
	public readonly baseTime: number;
	public readonly randomTime: number;
	public readonly respawnDelay: number;
	public readonly randomLife: number;

	constructor({ level, xp, oreId, baseTime, randomTime, respawnDelay, randomLife }: Rock) {
		this.level = level;
		this.xp = xp;
		this.oreId = oreId;
		this.baseTime = baseTime;
		this.randomTime = randomTime;
		this.respawnDelay = respawnDelay;
		this.randomLife = randomLife;
	}
}

const CLAY_ROCK = new Rock({
	level: 1,
	xp: 5,
	oreId: 434,
	baseTime: 10,
	randomTime: 1,
	respawnDelay: 5,
	randomLife: 0
});

const COPPER_ROCK = new Rock({
	level: 1,
	xp: 17.5,
	oreId: 436,
	baseTime: 10,
	randomTime: 1,
	respawnDelay: 5,
	randomLife: 0
});

const TIN_ROCK = new Rock({
	level: 1,
	xp: 17.5,
	oreId: 438,
	baseTime: 10,
	randomTime: 1,
	respawnDelay: 5,
	randomLife: 0
});

const BLURITE_ROCK = new Rock({
	level: 10,
	xp: 18,
	oreId: 668,
	baseTime: 20,
	randomTime: 1,
	respawnDelay: 25,
	randomLife: 0
});

const IRON_ROCK = new Rock({
	level: 15,
	xp: 35,
	oreId: 440,
	baseTime: 15,
	randomTime: 1,
	respawnDelay: 10,
	randomLife: 0
});

const SILVER_ROCK = new Rock({
	level: 20,
	xp: 40,
	oreId: 442,
	baseTime: 25,
	randomTime: 1,
	respawnDelay: 20,
	randomLife: 0
});

const COAL_ROCK = new Rock({
	level: 30,
	xp: 50,
	oreId: 453,
	baseTime: 50,
	randomTime: 10,
	respawnDelay: 30,
	randomLife: 0
});

const GOLD_ROCK = new Rock({
	level: 40,
	xp: 60,
	oreId: 444,
	baseTime: 80,
	randomTime: 20,
	respawnDelay: 40,
	randomLife: 0
});

const MITHRIL_ROCK = new Rock({
	level: 55,
	xp: 80,
	oreId: 447,
	baseTime: 100,
	randomTime: 20,
	respawnDelay: 60,
	randomLife: 0
});

const ADAMANTITE_ROCK = new Rock({
	level: 70,
	xp: 95,
	oreId: 449,
	baseTime: 130,
	randomTime: 25,
	respawnDelay: 180,
	randomLife: 0
});

const RUNITE_ROCK = new Rock({
	level: 85,
	xp: 125,
	oreId: 451,
	baseTime: 150,
	randomTime: 30,
	respawnDelay: 360,
	randomLife: 0
});

//TODO: Seren stones need to go in their own script as they have different logic
/*SEREN : {
	mineIDs : [92713],
	level : 89,
	xp : 296,
	oreID : 32262,
	baseTime : 150,
	randomTime : 30,
	respawnDelay : 10,
	randomLife : 0
}*/

//Crystal-flecked sandstone ore id 32847

function mineRock(player: Player, location: Location, rock: Rock) {
	if (!invHasSpace(player)) {
		sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	runMiningAction(player, rock.level, function() {
		giveXp(player, Stat.MINING, rock.xp);
		setEmpty(location, rock.respawnDelay);

		giveItem(player, rock.oreId, 1);
		sendSpamMessage(player, "You mine some " + _config.objName(rock.oreId) + ".");
	});
}

function setEmpty(location: Location, respawnDelay: number) {
	var rockCoords = _map.getCoords(location);
	var fullId = getId(location);
	var emptyId = getEmptyId(fullId);
	var rotation = getLocRotation(location);
	var shape = getLocShape(location);

	addLocation(emptyId, rockCoords, shape, rotation);
	_map.delay(rockCoords, function() {
		addLocation(fullId, rockCoords, shape, rotation);
	}, respawnDelay);
}

//function getEmptyId (player, locTypeId) {
//	if (_config.locHasModel(locTypeId, 65251)) {
//		return 5765;
//	} else if (_config.locHasModel(locTypeId, 65253)) {
//		return 5764;
//	} else if (_config.locHasModel(locTypeId, 65252)) {
//		return 5763;
//	} else if (_config.locHasModel(locTypeId, 99106)) {
//		return 93014;
//	} else if (_config.locHasModel(locTypeId, 99109)) {
//		return 93015;
//	} else {
//		chat.sendDebugMessage(player, "Warning: No empty rock mesh for location "+locTypeId);
//		return 5763;
//   }
//   }


function getEmptyId(locTypeId: number) {
	switch (locTypeId) {

		//case 2096://coal



		case 3027://copper
		case 3032://coal
		case 3038://tin
		case 3040://adamantite
		case 3041://mithril
			return 3227;

		case 3229://copper
		case 3233://coal
		case 3245://tin
		case 3273://adamantite
		case 3280://mithril
			return 3281;
		///////////////limestone//////////////
		case 4027://limestone
			return 4028;

		case 4028://limestone
			return 4029;

		case 4029://limestone
			return 4030;
		//////////////////////////////////

		case 5766://clay
		case 5768://gold
		case 5770://coal
		case 5773://iron
		case 5776://tin
		case 5779://copper
		case 5782://adamantite
		case 5784://mithril
			return 5763;

		case 5767://clay
		case 5769://gold
		case 5771://coal
		case 5774://iron
		case 5777://tin
		case 5780://copper
		case 5785://mithril
			return 5764;

		case 5772://coal
		case 5775://iron
		case 5778://tin
		case 5781://copper
		case 5783://adamantite
		case 5786://mithril
			return 5765;

		case 10574://gold
			return 19003;

		case 10575://gold
			return 19004;

		case 10576://gold
			return 19005;

		case 10578://clay
			return 11553;

		case 10577://clay
		case 37307://iron
		case 37310://gold
			return 11552;

		case 10579://clay
		case 37309://iron
		case 37312://gold
			return 11554;

		case 11183://gold
		case 11186://silver
		case 11189://clay
			return 37700;

		case 11184://gold
		case 11187://silver
		case 11190://clay
			return 37701;

		case 11185://gold
		case 11188://silver
		case 11191://clay
			return 37702;

		case 11930://coal
		case 11933://tin
		case 11936://copper
			return 11552;

		case 11931://coal
		case 11934://tin
		case 11943://mithril
			return 11553;

		case 11932://coal
		case 11935://tin
		case 11938://copper
			return 11554;

		case 11948://silver
		case 11954://iron
		case 11957://tin
		case 11960://copper
		case 15503://clay
			return 11555;

		case 11949://silver
		case 11955://iron
		case 11958://tin
		case 11961://copper
		case 15504://clay
			return 11556;

		case 11950://silver
		case 11956://iron
		case 11959://tin
		case 11962://copper
		case 15505://clay
			return 11557;

		case 2611://gold
		case 14852://coal
		case 14855://mithril
		case 14858://iron
		case 14864://adamantite
			return 14834;

		case 2609://gold
		case 14850://coal
		case 14853://mithril
		case 14856://iron
		case 14859://runite
		case 14862://adamantite
			return 14832;

		case 2610://gold
		case 14851://coal
		case 14854://mithril
		case 14857://iron
		case 14860://runite
		case 14863://adamantite
			return 14833;

		case 14902://tin
		case 14904://clay
		case 14906://copper
		case 14913://iron
			return 14892;

		case 14903://tin
		case 14905://clay
		case 14907://copper
		case 14914://iron
			return 14893;


		case 2092://iron
		case 2096://coal
		case 2098://gold
		case 2100://silver
		case 2102://mithril
		case 21275://adamantite
		case 21278://mithril
		case 21281://iron
		case 21284://copper
		case 21287://coal
			return 21296;



		case 21276://adamantite
		case 21279://mithril
		case 21282://iron
		case 21285://copper
		case 21288://coal
			return 21297;

		case 2099://gold
		case 2093://iron
		case 2097://coal
		case 2103://mithril
		case 2105://adamantite
		case 21277://adamantite
		case 21280://mithril
		case 21283://iron
		case 21286://copper
		case 21289://coal
			return 21298;

		case 29215://coal
			return 29218;

		case 29216://coal
			return 29219;

		case 29217://coal
			return 29220;

		case 67006://clay
		case 67009://tin
		case 67012://copper
			return 72802;

		case 67007://clay
		case 67010://tin
		case 67013://copper
			return 72803;

		case 67008://clay
		case 67011://tin
		case 67014://copper
			return 72804;

		case 72075://clay
			return 72078;

		case 72076://clay
			return 72079;

		case 72077://clay
			return 72080;

		case 72081://iron
			return 72084;

		case 72082://iron
			return 72085;

		case 72083://iron
			return 72086;

		case 72087://gold
			return 72089;

		case 72088://gold
			return 72090;

		case 72092://tin
			return 72095;

		case 72093://tin
			return 72096;

		case 72094://tin
			return 72097;

		case 72098://copper
			return 72101;

		case 72099://copper
			return 72102;

		case 72100://copper
			return 72103;

		case 93016://mithril
		case 93018://coal
		case 93020://adamantite
		case 93022://runite
		case 93024://gem rock
			return 93014;

		case 93017://mithril
		case 93019://coal
		case 93021://adamantite
		case 93023://runite
		case 93025://gem rock
			return 93015;

		case 94218://soft clay
			return 94216;

		case 94219://soft clay
			return 94217;

		default:
			return 3227;
	}
}
