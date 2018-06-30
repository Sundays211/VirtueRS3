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
import { Stat } from "engine/enums";
import { Player } from "engine/models";
import { sendMessage } from "shared/chat";

import { runAnim, stopAnim } from "shared/anim";
import { delayFunction } from "shared/util";
import { getStatLevel, randomStatChance } from "shared/stat";

import { Hatchet, findHatchet } from "./hatchet";

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */

export interface WoodcuttingAction {
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

export function runWoodcuttingAction(player: Player, action: WoodcuttingAction, onSuccess: () => void) {
	if (getStatLevel(player, Stat.WOODCUTTING) < action.levelReq) {
		sendMessage(player, "You require a woodcutting level of " + action.levelReq + " to chop this tree.");
		return;
	}
	var axe = findHatchet(player);//Find the highest hatchet the player holds and can use
	if (!axe) {
		sendMessage(player, "You need a hatchet to chop this tree.");
		return;
	}
	runAnim(player, axe.anim);
	delayFunction(player, 4, process, true);

	function process() {
		if (checkSuccess(player, action, axe)) {
			stopAnim(player);
			onSuccess();
		} else {
			runAnim(player, axe.anim);
			delayFunction(player, 4, process, true);
		}
	}
}

function checkSuccess(player: Player, action: WoodcuttingAction, axe: Hatchet): boolean {
	const extraChance = axe.bonus;
	//TODO: Add modifiers here

	return randomStatChance(
		player,
		Stat.WOODCUTTING,
		action.baseChance + extraChance,
		action.maxChance + extraChance
	);
}
