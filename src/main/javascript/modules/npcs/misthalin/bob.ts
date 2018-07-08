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
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import { setVarp, setVarc } from 'engine/var';
import { Player, Npc } from 'engine/models';

import { openCentralWidget } from 'shared/widget';
import { chatnpc, chatplayer, mesbox, multi2, multi3 } from 'shared/dialog';

_events.bindEventListener(EventType.OPNPC1, 519, (ctx) => {
	var player = ctx.player;
	var npc = ctx.npc;
    multi3(player, "SELECT AN OPTION", "I'd like to trade.", async () => {
	    await chatplayer(player, "I'd like to trade.", 9827);
	    await chatnpc(player, npc, "Great! I buy and sell pickaxes and hatchets. There are<br> plenty to choose from, and I've some free samples too.<br> Take your pick...or hatchet.");
        openshop(player);
	}, "Can you repair my items for me?", async () => {
	    await chatplayer(player, "Can you repair my items for me?");
	    await chatnpc(player, npc, "of course I can, though the materials may cost you. Just<br> hand me the item and I'll have a look.");
    }, "About the Task System...", () => {
		multi2(player, "CHOOSE AN OPTION", "Tell me about the Task System.", () => {
			tasksystem(player,npc);
		}, "Sorry, I was just leaving.", () => {
	    });
	});
});
	   
_events.bindEventListener(EventType.OPNPC3, 519, (ctx) => {
	openshop(ctx.player);
});

async function tasksystem (player: Player, npc: Npc) {
	await chatnpc(player, npc, "Very well: the Task System is a collection of deeds you<br> may wish to complete while adventuring around<br> RuneScape.");
	await chatnpc(player, npc, "You van earn special rewards for completing Tasks; at<br> the very least, each is worth a cash bounty from Explorer<br> Jack in Lumbridge.");
    await chatnpc(player, npc, "Some also give items that will help complete other Tasks,<br> and many count as progress towards the set of area<br> they're in.");
	multi3(player, "CHOOSE AN OPTION", "Tell me about the set reward for this locality.", async () => {
		await chatnpc(player, npc, "For completing the Lumbridge and Draynor set, you are<br> presented with an explorer's ring.");
        await chatnpc(player, npc, "This ring will become increasingly useful with each<br> difficulty level of the set that you complete.");
		await chatnpc(player, npc, "When you are presented with your rewards, you will be<br> told of their uses.");
		await mesbox(player, "You may also select a set Task (denoted in the main Task System<br> interface by a small shield icon) and choose 'Rewards' to see what rewards<br> a set item provdes.");
		multi3(player, "CHOOSE AN OPTION", "Tell me about the Task System.", () => {
			tasksystem(player,npc);
		}, "How do I claim these rewards?", () => {
			claimtheserewards(player,npc);
        }, "Sorry, I was just leaving.", () => {
        });
	}, "How do I claim these rewards?", () => {
		claimtheserewards(player,npc);
    }, "Sorry, I was just leaving.", () => {
    });
}
	
async function claimtheserewards (player: Player, npc: Npc) {
	await chatnpc(player, npc, "You need to complete all of the Tasks in the set of a<br> particular difficulty, then you can claim your reward. Most<br> of the Lumbridge set's Tasks are straightforward,<br> although you might find some require quests to be");
	await chatnpc(player, npc, "started, if not finished.");
	await chatnpc(player, npc, "To claim the Lumbridge set rewards, speak to Ned in<br> Draynor Village, Explorer Jack in Lumbridge, or myself.");
	multi2(player, "CHOOSE AN OPTION", "Tell me about the Task System.", () => {
		tasksystem(player,npc);
	}, "Sorry, I was just leaving.", () => {
    });
}
	
function openshop(player: Player) {
    setVarp(player, 304, Inv.BOBS_AXES);
	setVarp(player, 305, Inv.BOBS_AXES_FREE_STOCK);
	setVarc(player, 2360, "Bob's Brilliant Axes");
	openCentralWidget(player, 1265, false);
}