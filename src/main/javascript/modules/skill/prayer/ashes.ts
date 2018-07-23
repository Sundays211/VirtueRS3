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
import { EventType, Inv, Stat } from 'engine/enums';
import { Player } from 'engine/models';
import _events from 'engine/events';
import _inv from 'engine/inv';

import { runAnim, addSpotAnim } from 'shared/anim';
import { sendSpamMessage } from 'shared/chat';
import { giveXp } from 'shared/stat';
/**
 * @author Kayla
 * @since 19/11/2014
 */

_events.bindEventListener(EventType.OPHELD1, 20264, (ctx) => {
	scatterAshes(ctx.player, ctx.slot, 56, 4);
});

_events.bindEventListener(EventType.OPHELD1, 20266, (ctx) => {
	scatterAshes(ctx.player, ctx.slot, 47, 12.5);
});

_events.bindEventListener(EventType.OPHELD1, 20268, (ctx) => {
	scatterAshes(ctx.player, ctx.slot, 40, 62.5);
});
	

function scatterAshes (player: Player, slot: number, spotAnimId: number, xp: number) {
	_inv.clearSlot(player, Inv.BACKPACK, slot);
	addSpotAnim(player, spotAnimId);
	runAnim(player, 445, function () {
		sendSpamMessage(player, "You scatter the ashes into the wind.");
		giveXp(player, Stat.PRAYER, xp);
	});
}