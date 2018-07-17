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
import { Stat } from 'engine/enums';
import { Player } from 'engine/models';

import { getStatLevel, randomStatChance } from 'shared/stat';
import { sendMessage } from 'shared/chat';
import { delayFunction } from 'shared/util';
import { runAnim, stopAnim } from 'shared/anim';

import { Pickaxe, getPickaxe } from './pickaxe';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */

export interface MiningAction {
	/**
	 * Minimum level required to perform the action
	 */
	levelReq: number;

	/**
	 * The chance, out of 255, to perform the action successfully at level 1.
	 * Note: This doesn't take into account modifiers (better hatchets, familiars, boosts, etc)
	 */
	baseChance: number;

	/**
	 * The chance, out of 255, to perform the action successfully at level 99.
	 * Note: This doesn't take into account modifiers (better hatchets, familiars, boosts, etc)
	 */
	maxChance: number;
}

export function runMiningAction(player: Player, action: MiningAction, onSuccess: () => void) {
	if (getStatLevel(player, Stat.MINING) < action.levelReq) {
		sendMessage(player, "You require a mining level of " + action.levelReq + "  to mine this rock.");
		return;
	}
	var pic = getPickaxe(player);//Find the highest pickaxe the player holds and can use
	if (!pic) {
		sendMessage(player, "You need a pickaxe to mine this rock.");
		return;
	}
	runAnim(player, pic.anim);
	delayFunction(player, pic.speed, process, true);

	function process() {
		if (checkSuccess(player, action, pic)) {
			stopAnim(player);
			onSuccess();
		} else {
			runAnim(player, pic.anim);
			delayFunction(player, pic.speed, process, true);
		}
	}
}

function checkSuccess(player: Player, action: MiningAction, pic: Pickaxe): boolean {
	const extraChance = pic.bonus;
	//TODO: Add modifiers here

	return randomStatChance(
		player,
		Stat.MINING,
		action.baseChance + extraChance,
		action.maxChance + extraChance
	);
}
