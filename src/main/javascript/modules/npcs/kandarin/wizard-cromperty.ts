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
import { Player, Npc } from 'engine/models';
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import _entity from 'engine/entity';

import _coords from 'shared/map/coords';
import { chatnpc, chatplayer, mesbox, multi2, multi3 } from 'shared/dialog';
import { } from 'shared/map';
import { addSpotAnim } from 'shared/anim';
import { getName } from 'shared/util';

_events.bindEventListener(EventType.OPNPC1, 844, async (ctx) => {
	await chatnpc(ctx.player, ctx.npc, "Hello " + getName(ctx.player) + ", I'm Cromperty. Sedridor has told me<br> about you. As a wizard and a inventor, he has aided me in<br> my great invention!")
	multi3(ctx.player, "CHOOSE AN OPTION:", "Two jobs? That's got to be tough.", async () => {
		await chatplayer(ctx.player, "Two jobs? That's got to be tough.");
		await chatnpc(ctx.player, ctx.npc, "Not when you combine them it isn't! I invent MAGIC things!");
		multi2(ctx.player, "SELECT AN OPTION", "So what have you invented?", () => {
			invented(ctx.player, ctx.npc);
		}, "Well, I shall leave you to your inventing.", async () => {
			await chatplayer(ctx.player, "Well, I shall leave you to your inventing.");
			await chatnpc(ctx.player, ctx.npc, "Thanks for dropping by! Stop again anytime!");
		});
	}, "So what have you invented?", () => {
		invented(ctx.player, ctx.npc);
	}, "Can you teleport me to the Rune Essence?", async () => {
		await chatplayer(ctx.player, "Can you teleport me to the Rune Essence?");
		teleToEssenceMmine(ctx.player, ctx.npc);
	});
});

_events.bindEventListener(EventType.OPNPC3, 844, (ctx) => {
	teleToEssenceMmine(ctx.player, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC4, 844, async (ctx) => {
	await chatnpc(ctx.player, ctx.npc, "sorry, old chap, I haven't got anything for you.")
	await mesbox(ctx.player, "You must complete the Medium or hard Ardougne tasks to earn<br> Cromperty's rewards.");
});

async function invented(player: Player, npc: Npc) {
	await chatplayer(player, "So what have you invented?");
	await chatnpc(player, npc, "Ah! My latest invention is my patent pending teleportation<br> block! It emits a low level magical signal, that will allow me<br> to locate it anywhere in the world, and teleport anything");
	await chatnpc(player, npc, "directly to it! I hope to revolutionise the entire<br> teleportation system! Don't you think I'm great? Uh, I<br> mean it's great?");
	multi3(player, "SELECT AN OPTION", "So where is the other block?", async () => {
		await chatplayer(player, "So where is the other block?");
		await chatnpc(player, npc, "Well... Hmm. I would guess some where between here and<br> the Wizards' Tower in Misthalin. All I know is that it hasn't<br> got there yet as the wizards there would have contacted<br> me.");
		await chatnpc(player, npc, "I'm using the RPDT for delivery. They assured me it would<br> be delivered promptly.");
		multi2(player, "SELECT AN OPTION", "Can I be teleported plaease?", () => {
			teleported(player, npc);
		}, "Who are the RPDT?", async () => {
			await chatplayer(player, "Who are the RPDT?");
			await chatnpc(player, npc, "The RuneScape Parcel Delivery Team. They come very<br> highly recommended. Their motto is: 'We aim to deliver<br> your stuff at some point after you have paid us!'");
		});
	}, "Can I be teleported plaease?", () => {
		teleported(player, npc);
	}, "Well done, That's very clever.", async () => {
		await chatplayer(player, "Well done, That's very clever.");
		await chatnpc(player, npc, "Yes it is isn't it? Forgive me for feeling a little smug, this<br> is a major breakthrough in the field of teleportation!");
	});
}

async function teleported(player: Player, npc: Npc) {
	await chatplayer(player, "Can I be teleported plaease?");
	await chatnpc(player, npc, "By all means! I'm afraid I can't give you any specifics as<br> to where you will come out however. Presumably wherever<br> the other block is located.");
	multi2(player, "SELECT AN OPTION", "Yes, that sounds good. Teleport me!", async () => {
		await chatplayer(player, "Yes, that sounds good. Teleport me!")
		await chatnpc(player, npc, "Okey dokey! Ready?");
		_entity.say(npc, "Dipsolum sententa sententi!");
		addSpotAnim(npc, 108);
		//todo need spotanim 109 going to player
		addSpotAnim(player, 110);
		_entity.setCoords(player, _coords(0, 41, 51, 25, 7));
	}, "That sounds dangerous. Leave me here.", async () => {
		await chatplayer(player, "That sounds dangerous. Leave me here.");
		await chatnpc(player, npc, "As you wish.");
	});
}

function teleToEssenceMmine(player: Player, npc: Npc) {
	_entity.say(npc, "Senventior disthine molenko!");
	addSpotAnim(npc, 108);
	//todo need spotanim 109 going from npc to player
	addSpotAnim(player, 110);
	_entity.setCoords(player, _coords(0, 45, 75, 31, 32));
}
