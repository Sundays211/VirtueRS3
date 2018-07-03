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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import { Stat } from 'engine/enums';

import { getStatLevel } from 'shared/stat';
import { chatnpc, chatplayer, mesbox, multi2, multi3 } from 'shared/dialog';

_events.bindEventListener(EventType.OPNPC1, 604, async (ctx) => {
	if (getStatLevel(ctx.player, Stat.SMITHING) >= 99) {
		await multi3(ctx.player, "WHAT WOULD YOU LIKE TO ASK ABOUT", "Skillcape of smithing.", async () => {
			await chatplayer(ctx.player, "That's an unusual cape you're wearing, what is it?");
			await chatnpc(ctx.player, ctx.npc, "It's a Skillcape of Smithing. Shows that I am a master<br> blacksmith, but of course that's only to be expected. I am<br> an Imcando dwarf after all and everybody knows we're<br> the best blacksmiths.");
		}, "I've noticed there are a couple of versions of each skillcape.", async () => {
			await chatnpc(ctx.player, ctx.npc, "Yes! We, the skill masters, have crafted new versions of<br> all skillcapes! We felt like it was time for a change.");
			//check if old model here
			await chatnpc(ctx.player, ctx.npc, "You can still choose to wear the old model skillcape if you<br> want. Would you like to change which model you are<br> currently using?");
			await multi2(ctx.player, "SELECT AN OPTION", "Yes, I would like to wear the old version of the skillcape.", async () => {
				await chatnpc(ctx.player, ctx.npc, "Would you like to wear the old model for just this cape, or<br> for the Quest point cape and all of the skillcapes you own?");
				await multi3(ctx.player, "SELECT AN OPTION", "I would just like to change the Smithing skillcape.", () => {
				}, "I would just like to change all my skillcapes.", async () => {
				//find varp id
				//setvarp here
				await chatnpc(ctx.player, ctx.npc, "No problem, you will now use the older model for all of<br> your skillcapes!");
		        }, "I've changed my mind!", () => {
		        });
		    }, "No, thank you.", async () => {
				await chatnpc(ctx.player, ctx.npc, "Great! I'm glad you're enjoying our new version!");
			});
		}, "Something else.", async () => {
			await mesbox(ctx.player, "Thurgo doesn't appear to be interested in talking.");
		});
	}else{
        await multi2(ctx.player, "WHAT WOULD YOU LIKE TO ASK ABOUT", "Skillcape of smithing.", async () => {
			await chatplayer(ctx.player, "That's an unusual cape you're wearing, what is it?");
			await chatnpc(ctx.player, ctx.npc, "It's a Skillcape of Smithing. Shows that I am a master<br> blacksmith, but of course that's only to be expected. I am<br> an Imcando dwarf after all and everybody knows we're<br> the best blacksmiths.");
		}, "Something else.", async () => {
			await mesbox(ctx.player, "Thurgo doesn't appear to be interested in talking.");
		});
	}
});