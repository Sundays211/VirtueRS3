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
import _config from 'engine/config';
import { Player, Npc } from 'engine/models';
import { setVarp } from 'engine/var';

import { chatnpc, chatplayer, objbox, multi2, multi4, multi5 } from 'shared/dialog';
import { giveItem, hasItem } from 'shared/inv';

_events.bindEventListener(EventType.OPNPC1, 278, async (ctx) => {
	var player = ctx.player;
	var npc = ctx.npc;
	if(_config.questFinished(player, 6)) {
		await chatnpc(player, npc, "Hello, friend, how is the adventuring going?");
		cookFinished(player, npc);
	} else if(_config.questStarted(player, 6)) {
		await chatnpc(player, npc, "How are you getting on with finding the ingredients?");
		cookStarted(player, npc);
	} else {
		await chatnpc(player, npc, "What am I to do?");
		startCookDialog(player, npc);
	}
});
	
async function startCookDialog (player: Player, npc: Npc) {
	multi5(player, "SELECT AN OPTION", "What's wrong?", () => {
        cookStartQuest(player, npc);
	}, "Can you make me a cake?", async () => {
		await chatnpc(player, npc, "*sniff* Don't talk to me about cakes...");
		cookStartQuest(player, npc);
	}, "You don't look very happy.", async () => {
		await chatnpc(player, npc, "No, I'm not. The world is caving in around me. I'm<br> overcome with dark feelings of impending doom.");
		multi2(player, "SELECT AN OPTION", "What's wrong?", () => {
			cookStartQuest(player, npc);
		}, "I'd take the rest of the day off, if I were you.", async () => {
			await chatnpc(player, npc, "No, that's the worst thing I could do. I'd get in terrible<br> trouble.");
			await chatplayer(player, "Well, maybe you need to take a holiday...");
			await chatnpc(player, npc, "That would be nice, but the Duke doesn't allow holidays<br> for core staff.");
			await chatplayer(player, "Hmm, why not run away to the sea and start a new life as<br> a pirate?");
			await chatnpc(player, npc, "My wife gets seasick and I have an irrational fear of<br> eyepatches. I don't see it working.");
			await chatplayer(player, "I'm afraid I've run out of ideas.");
			await chatnpc(player, npc, "I know, I'm doomed.");
			cookStartQuest(player, npc);
		});
	}, "Nice hat!", async () => {
		await chatnpc(player, npc, "Er, thank you. It's a pretty ordinary cook's hat, really.");
		await chatplayer(player, "Still, it suits you. The trousers are pretty special too.");
		await chatnpc(player, npc, "It's all standard-issue cook's uniform.");
		await chatplayer(player, "The whole hat, apron and stripy trousers ensemble...it<br> works. It makes you look like a real cook.");
		await chatnpc(player, npc, "I AM a real cook! I haven't got time to be chatting about culinary fashion, I'm in desperate need of help!");
		cookStartQuest(player, npc);
	}, "What happened to the castle?", async () => {
		await chatnpc(player, npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over");
		await chatnpc(player, npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!");
		await chatnpc(player, npc, "In fact, even now I'm preparing a cake for the Duke's<br> birthday! Although...umm...");
		multi2(player, "SELECT AN OPTION", "What's the problem?", () => {
			cookStartQuest(player, npc);
		}, "I'll let you get on with it!", () => {
		});
	});
}

async function cookStartQuest (player: Player, npc: Npc) {
	await chatnpc(player, npc, "Oh dear, oh dear, oh dear, I'm in a terrible, terrible mess!<br> It's the Duke's birthday today, and I should be making him<br> a lovely, big birthday cake using special ingredients...");
	await chatnpc(player, npc, "...but I've forgotten to get the ingredients. I'll never get<br> them in time now. He'll sack me! Whatever will I do? I have<br> four children and a goat to look after. Would you help me?<br> Please?");
	//start quest
    multi2(player, "start quest?", "yes", async () => {//todo get the intrface to start the quest
		setVarp(player, 2492, 1);
		await chatnpc(player, npc, "Oh, thank you, thank you. I must tell you that this is no<br> ordinary cake, though - only the best ingredients will do! I<br> need a super large egg, top-quality milk and some extra<br> fine flour.");
		await chatplayer(player, "Where can I find those, then?");
		await chatnpc(player, npc, "That's the problem: I dont exactly know. I usually send<br> my assistant to get them for me but he quit.");
		await chatnpc(player, npc, "I've marked some places on your world map in red. You<br> might want to consider investigating them.");
	}, "Not right now", async () => {
		await chatnpc(player, npc, "Fine. I always knew you adventurer types were callous<br> beasts. Go on your merry way!");
	});
}

function cookStarted (player: Player, npc: Npc) {// jshint ignore:line
	//TODO: Remove jshint ignore when implemented
	//TODO: Implement this
}

async function cookFinished (player: Player, npc: Npc) {
	multi4(player, "SELECT AN OPTION", "I'm getting strong and mighty.", async () => {
		await chatplayer(player, "I'm getting strong and mighty. Grr.");
		await chatnpc(player, npc, "Glad to hear it.");
	}, "I keep on dying.", async () => {
		await chatplayer(player, "I keep on dying.");
		await chatnpc(player, npc, "Ah, well, at least you keep coming back to life too!");
	}, "Can i use your range?", async () => {
		await chatplayer(player, "Can i use your range?");
		await chatnpc(player, npc, "Go ahead! It's a very good range it's better than most<br> other ranges.");
		await chatnpc(player, npc, "It's called the Cook-o-Matic 25 and it uses a combination<br> of state-of-the-art temperature regulation and magic.");
		await chatplayer(player, "will it mean my food will burn less often?");
		await chatnpc(player, npc, "As long as the food is fairly easy to cook in the first place!");
		if(hasItem(player, 15411)) {
			await chatnpc(player, npc, "The manual you have in your inventory should tell you<br> more.");
			await chatplayer(player, "Thanks!");
		} else {
			await chatnpc(player, npc, "Here, take this manual. It should tell you everything you<br> need to know about this range.");
			giveItem(player, 15411, 1);
			await objbox(player, 15411, "The cook hands you a manual.");
			await chatplayer(player, "Thanks!");
		}
	}, "What happened to the castle?", async () => {
		await chatnpc(player, npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over");
		await chatnpc(player, npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!");
    });
}