/**
 * Copyright (c) 2016 Virtue Studios
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
import { Player } from 'engine/models';
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import { setVarp, setVarc } from 'engine/var';

import { chatnpc, chatplayer, multi2 } from 'shared/dialog';
import { openCentralWidget } from 'shared/widget';

_events.bindEventListener(EventType.OPNPC1, 1860, async (ctx) => {
	var player = ctx.player;
	var npc = ctx.npc;
	await chatnpc(player, npc, "Would you like to buy some archery equipment?")
    await multi2(player, "SELECT AN OPTION", "No thanks, I've got all the archery equipment I need.", async () => {
	    await chatplayer(player, "No thanks, I've got all the archery equipment I need.")
	    await chatnpc(player, npc, "Okay. Fare well on your travels.")
	}, "Let's see what you've got, then.", () => {
        openshop(player);
	});
});

_events.bindEventListener(EventType.OPNPC3, 1860, (ctx) => {
	openshop(ctx.player);
});

function openshop (player: Player) {
        setVarp(player, 304, Inv.BRIANS_ARCHERY_SUPPLIES);
	    setVarc(player, 2360, "Brian's Archery Supplies");
	    openCentralWidget(player, 1265);
}