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
import { Stat, WearPos, Inv } from 'engine/enums';
import { Player } from 'engine/models';
import _config from 'engine/config';
import _inv from 'engine/inv';

import { getStatLevel } from 'shared/stat';
import { sendDebugMessage } from 'shared/chat';
import { hasTool } from 'shared/inv';
import { varbit } from 'engine/var';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */

export class Hatchet {

	public readonly objId: number;
	public readonly level: number;
	public readonly bonus: number;
	public readonly anim: number;

	constructor({ objId, level, bonus, anim }: Hatchet) {
		this.objId = objId;
		this.level = level;
		this.bonus = bonus;
		this.anim = anim;
	}
}

export const BRONZE_HATCHET = new Hatchet({
	objId: 1351,
	level: 1,
	bonus: 1,
	anim: 21668
});

export const IRON_HATCHET = new Hatchet({
	objId: 1349,
	level: 1,
	bonus: 2,
	anim: 21667
});

export const STEEL_HATCHET = new Hatchet({
	objId: 1353,
	level: 6,
	bonus: 3,
	anim: 21666
});

export const BLACK_HATCHET = new Hatchet({
	objId: 1361,
	level: 11,
	bonus: 4,
	anim: 21665
});

export const MITHRIL_HATCHET = new Hatchet({
	objId: 1355,
	level: 21,
	bonus: 5,
	anim: 21664
});

export const ADAMANT_HATCHET = new Hatchet({
	objId: 1357,
	level: 31,
	bonus: 7,
	anim: 21663
});

export const RUNE_HATCHET = new Hatchet({
	objId: 1359,
	level: 41,
	bonus: 10,
	anim: 21662
});

export const DRAGON_HATCHET = new Hatchet({
	objId: 6739,
	level: 61,
	bonus: 13,
	anim: 21669
});

export const CRYSTAL_HATCHET = new Hatchet({
	objId: 32645,
	level: 71,
	bonus: 16,
	anim: 25003 //25182 for canoe ?
});

const hatchets = [
	BRONZE_HATCHET,
	IRON_HATCHET,
	STEEL_HATCHET,
	BLACK_HATCHET,
	MITHRIL_HATCHET,
	ADAMANT_HATCHET,
	RUNE_HATCHET,
	DRAGON_HATCHET,
	CRYSTAL_HATCHET
];

interface HatchetLookup {
	[objId: string]: Hatchet
}

const _hatchetLookup = hatchets.reduce((map, hatchet) => {
	map[hatchet.objId] = hatchet;
	return map;
}, {} as HatchetLookup);

function lookupHatchet(objId: number): Hatchet {
	return _hatchetLookup[objId];
}

export function findHatchet(player: Player): Hatchet {
	var playerLevel = getStatLevel(player, Stat.WOODCUTTING);
	var objId = _inv.getObject(player, Inv.EQUIPMENT, WearPos.WEAPON);
	var hatchet;
	if (objId !== -1 && _config.objCategory(objId) === 35) {
		hatchet = lookupHatchet(objId);
		if (typeof (hatchet) === "undefined") {
			sendDebugMessage(player, "Worn item " + objId + " is categorised as a hatchet but is not yet supported.");
		} else if (playerLevel >= hatchet.level) {
			return hatchet;
		}
	}
	var bestHatchet = null;
	if (hasTool(player, 1265)) {
		bestHatchet = lookupHatchet(_config.enumValue(7503, varbit(player, 18522)) as number);
		if (playerLevel < bestHatchet.level) {
			return findBestHatchet(playerLevel);
		}
	}

	for (var slot = 0; slot < 28; slot++) {
		objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (objId !== -1 && _config.objCategory(objId) === 35) {
			hatchet = lookupHatchet(objId);
			if (typeof (hatchet) === "undefined") {
				sendDebugMessage(player, "Item " + objId + " found in backpack slot " + slot + " is categorised as a hatchet but is not yet supported.");
			} else if (!bestHatchet || hatchet.bonus > bestHatchet.bonus &&
				playerLevel >= hatchet.level) {
				bestHatchet = hatchet;
			}
		}
	}
	return bestHatchet;
}

function findBestHatchet(playerLevel: number): Hatchet {
	var best = BRONZE_HATCHET;
	for (let axe of hatchets) {
		if (axe.bonus > best.bonus && axe.level <= playerLevel) {
			best = axe;
		}
	}
	return best;
}
