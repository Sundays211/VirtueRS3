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
import { EventType, Stat } from 'engine/enums';
import _events from 'engine/events';

import { hasItem, giveItem, takeItem } from 'shared/inv';
import { mesbox } from 'shared/dialog';
import { sendSpamMessage } from 'shared/chat';
import { randomStatChance, hasLevel, giveXp } from 'shared/stat';

import { runFishingAction } from './logic';
import { Player } from 'engine/models';

/**
 * River lure fishing handler
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */
_events.bindEventListener(EventType.OPNPC3, [309, 310, 311, 314, 315, 317, 318, 328, 329], (ctx) => {
	const player = ctx.player;
	if (!checkRequirements(player)) {
		return;
	}
	const animId = 24934;
	sendSpamMessage(player, "You cast out your line...");
	runFishingAction(player, ctx.npc, animId, 4, () => {
		if (randomStatChance(player, Stat.FISHING, 10, 200)) {
			giveXp(player, Stat.FISHING, 60, false);
			takeItem(player, 313);
			giveItem(player, 349);
			sendSpamMessage(player, "You catch a pike.");

		}
		return checkRequirements(player);
	});
});

function checkRequirements(player: Player): boolean {
	if (!hasItem(player, 307)) {
		mesbox(player, "You need a fishing rod to bait these fish.");
		return false;
	} else if (!hasItem(player, 313)) {
		mesbox(player, "You don't have any fishing bait left.")
		return false;
	} else if (!hasLevel(player, Stat.FISHING, 25)) {
		mesbox(player, "You require a fishing level of 25 to fish here.")
		return false;
	} else {
		return true;
	}
}
