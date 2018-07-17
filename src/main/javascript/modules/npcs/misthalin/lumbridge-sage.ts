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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import { Player, Npc } from 'engine/models';

import { chatnpc, multi2, multi3, multi4 } from 'shared/dialog';
import _coords from 'shared/map/coords';
import { isAdmin } from 'shared/util';
 
_events.bindEventListener(EventType.OPNPC1, 2244, async (ctx) => {
	var player = ctx.player;
	var npc = ctx.npc;
	await chatnpc(player, npc, "Greetings, adventurer. How may i help you?", 9847);
	if (isAdmin(player)) {
	    multi4(player, "CHOOSE AN OPTION", "Who are you?", () => {
	        iamphileas(player, npc);
	    }, "Tell me about the town of Lumbridge.", () => {
	        townofLumbridge(player, npc);
	    }, "I'm fine for now, thanks.", () => {
	    }, "I would like to access the P-Mod room.", () => {
	        _entity.setCoords(player, _coords(2845, 5158, 0));
	    });
	} else {
	    multi3(player, "CHOOSE AN OPTION", "Who are you?", () => {
	        iamphileas(player, npc);
	    }, "Tell me about the town of Lumbridge.", () => {
	        townofLumbridge(player, npc);
	    }, "I'm fine for now, thanks.", () => {
	    });
	}
});

async function iamphileas (player: Player, npc: Npc) {
	await chatnpc(player, npc, "I am Phileas, the Lumbridge Sage. In times past, people<br>came from all around to ask me for advice. My renown<br>seems to have diminished somewhat in recent years,<br>though. Can i help you with anything?", 9810);
    await multi2(player, "CHOOSE AN OPTION", "Tell me about the town of lumbridge.", () => {
	    townofLumbridge(player, npc);
	}, "I'm fine for now, thanks.", () => {
	});
}

async function townofLumbridge (player: Player, npc: Npc) {
	await chatnpc(player, npc, "Lumbridge is one of the older towns in the human-<br>controlled kingdoms. It was founded over two hundred<br> years ago towards the end of the Fourth Age. It's called<br> Lumbridge because of this bridge built over the River Lum.", 9810);
	await chatnpc(player, npc, "The town is governed by Duke Horacio, who is a good<br> friend of our monarch, King Roald of Misthalin.", 9810);
	await chatnpc(player, npc, "Recently, however,there have been great changes due to<br> the Battle of Lumbridge");
	multi3(player, "CHOOSE AN OPTION", "Who are you?", () => {
	    iamphileas(player, npc);
    }, "What about the battle?", async () => {
	    await chatnpc(player, npc, "Indeed, not long ago there was a great fight between<br> Saradomin and Zamorak on the battlefield to the west of<br> the castle.");
	    await chatnpc(player, npc, "Titanic forces were unleasheded as neither side could gain<br> the upper hand. Each side sought advantages, but it was<br> close until the end.");
	    await chatnpc(player, npc, "The battle lasted for months, but in the end the forces of<be> the holy Saradomin where triumphant. Zamorak was<br> defeated... but...");
	    await chatnpc(player, npc, "befor Saradomin could complete his victory, Moia the<br> general of Zamorak's transported him away.");
	    await chatnpc(player, npc, "Now, the battlefield lies empty save for a single<br> Saradominist devotee.");
	    multi2(player, "SELECT AN OPTION", "Who are you?",() => {
	        iamphileas(player, npc);
	    }, "Goodbye", async () => {
	        await chatnpc(player, npc, "Good adventuring, traveller.");
	    });
	}, "Goodbye!", () => {
	});
}