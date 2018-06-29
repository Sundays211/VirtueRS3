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
import { Stat } from 'engine/enums/stat';
import { Inv } from 'engine/enums/inventory';
import { WearPos } from 'engine/enums/wear-pos';
import { Player } from 'engine/models';
import _config from 'engine/config';
import _inv from 'engine/inv';
import { varbit } from 'engine/var';

import { hasTool } from 'shared/inv';
import { sendDebugMessage } from 'shared/chat';
import { getStatLevel } from 'shared/stat';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */

export class Pickaxe {

	public readonly objId: number;
	public readonly level: number;
	public readonly speed: number;
	public readonly bonus: number;
	public readonly anim: number;

	constructor({ objId, level, speed, bonus, anim }: Pickaxe) {
		this.objId = objId;
		this.level = level;
		this.speed = speed;
		this.bonus = bonus;
		this.anim = anim;
	}
}

export const BRONZE_PICKAXE = new Pickaxe({
	objId: 1265,
	level: 1,
	speed: 6,
	bonus: 1,
	anim: 625
});

export const IRON_PICKAXE = new Pickaxe({
	objId: 1267,
	level: 1,
	speed: 5,
	bonus: 2,
	anim: 626
});
export const STEEL_PICKAXE = new Pickaxe({
	objId: 1269,
	level: 6,
	speed: 4,
	bonus: 3,
	anim: 627
});
export const MITHRIL_PICKAXE = new Pickaxe({
	objId: 1273,
	level: 21,
	speed: 3,
	bonus: 5,
	anim: 629
});
export const ADAMANT_PICKAXE = new Pickaxe({
	objId: 1271,
	level: 31,
	speed: 3,
	bonus: 7,
	anim: 628
});
export const RUNE_PICKAXE = new Pickaxe({
	objId: 1275,
	level: 41,
	speed: 3,
	bonus: 10,
	anim: 624
});
export const DRAGON_PICKAXE = new Pickaxe({
	objId: 15259,
	level: 61,
	speed: 3,
	bonus: 13,
	anim: 12190
});
export const CRYSTAL_PICKAXE = new Pickaxe({
	objId: 32646,
	level: 71,
	speed: 3,
	bonus: 16,
	anim: 25004
});

const pickaxes = [
	BRONZE_PICKAXE,
	IRON_PICKAXE,
	STEEL_PICKAXE,
	MITHRIL_PICKAXE,
	ADAMANT_PICKAXE,
	RUNE_PICKAXE,
	DRAGON_PICKAXE,
	CRYSTAL_PICKAXE
];

interface PickaxeLookup {
	[objId: string]: Pickaxe
}

const _pickaxeLookup = pickaxes.reduce((map, pickaxe) => {
	map[pickaxe.objId] = pickaxe;
	return map;
}, {} as PickaxeLookup);

function lookupPickaxe(objId: number): Pickaxe {
	return _pickaxeLookup[objId];
}

export function getPickaxe(player: Player): Pickaxe {
	var playerLevel = getStatLevel(player, Stat.MINING);
	var objId = _inv.getObject(player, Inv.EQUIPMENT, WearPos.WEAPON);
	var pickaxe;
	if (objId !== -1 && _config.objCategory(objId) === 67) {
		pickaxe = lookupPickaxe(objId);
		if (typeof (pickaxe) === "undefined") {
			sendDebugMessage(player, "Worn item " + objId + " is categorised as a pickaxe but is not yet supported.");
		} else if (playerLevel >= pickaxe.level) {
			return pickaxe;
		}
	}
	var bestPickaxe = null;
	if (hasTool(player, 1265)) {
		bestPickaxe = lookupPickaxe(_config.enumValue(7501, varbit(player, 18521)) as number);
		if (playerLevel < bestPickaxe.level) {
			return findBestPickaxe(playerLevel);
		}
	}

	for (var slot = 0; slot < 28; slot++) {
		objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (objId !== -1 && _config.objCategory(objId) === 67) {
			pickaxe = lookupPickaxe(objId);
			if (typeof (pickaxe) === "undefined") {
				sendDebugMessage(player, "Item " + objId + " found in backpack slot " + slot + " is categorised as a pickaxe but is not yet supported.");
			} else if (!bestPickaxe || pickaxe.bonus > bestPickaxe.bonus &&
				playerLevel >= pickaxe.level) {
				bestPickaxe = pickaxe;
			}
		}
	}
	return bestPickaxe;
}

function findBestPickaxe(playerLevel: number): Pickaxe {
	var best = BRONZE_PICKAXE;
	for (let pickaxe of pickaxes) {
		if (pickaxe.bonus > best.bonus && pickaxe.level <= playerLevel) {
			best = pickaxe;
		}
	}
	return best;
}
