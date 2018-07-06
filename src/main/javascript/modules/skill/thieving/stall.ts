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
import { Player, Location } from 'engine/models';
import _events from 'engine/events';
import _config from 'engine/config';

import { hasLevel, giveXp } from 'shared/stat';
import { sendMessage, sendSpamMessage } from 'shared/chat';
import { getId } from 'shared/util';
import { invHasSpace, giveItem } from 'shared/inv';
import { runAnim } from 'shared/anim';
import { mesbox } from 'shared/dialog';

/**
 * @author Kayla
 * @author rsJuuuuu
 * @since 01/16/2015
 */
_events.bindEventListener(EventType.OPLOC2, 34383, (ctx) => {
	if (checkRequirements(ctx.player, 20, ctx.location)) {
		sendSpamMessage(ctx.player, "You attempt to steal some silk from the silk stall.");
		stealFromStall(ctx.player, () => {
			giveXp(ctx.player, Stat.THIEVING, 24, false);
			giveItem(ctx.player, 950, 1);
			sendSpamMessage(ctx.player, "You steal a piece of silk.");
		});
	}

});

function stealFromStall(player: Player, onSuccess: () => void) {

	//TODO: This needs to check for nearby NPCs and allow the stall to respawn
	runAnim(player, 881, () => {
		onSuccess();
	});
}

function checkRequirements(player: Player, level: number, loc: Location): boolean {
	if (!invHasSpace(player)) {
		mesbox(player, "Your inventory is too full to hold any more.");
		return false;
	} else if (!hasLevel(player, Stat.THIEVING, level)) {
		const stallName = _config.locName(getId(loc)).toLowerCase();
		sendMessage(player, `You need a thieving level of ${level} to steal from the ${stallName}.`);
		return false;
	} else {
		return true;
	}
}
