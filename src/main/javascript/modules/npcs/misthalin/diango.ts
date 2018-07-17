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

import { mapMembers } from 'shared/util';
import { openCentralWidget } from 'shared/widget';
import { chatnpc, chatplayer, multi2, multi4, requestString } from 'shared/dialog';
import { sendMessage } from 'shared/chat';

_events.bindEventListener(EventType.OPNPC1, 970, (ctx) => {
	retrieve(ctx.player);
});

_events.bindEventListener(EventType.OPNPC3, 970, async (ctx) => {
    var player = ctx.player;
	var npc = ctx.npc;
	await chatnpc(player, npc, "Howdy there, partner.");
	await chatplayer(player, "Hi, Diango.");
	await chatnpc(player, npc, "Want to see my spinning plates or kites? Want to check<br> out my range of party items? Or did you want an item<br> back?");
	multi4(player, "SELECT AN OPTION", "Spinning plates?", async () => {
		await chatplayer(player, "Spinning plates?")
		await chatnpc(player, npc, "That's right - there's a funny story behind them. Their<br> shipment was held up by thieves.");
		await chatnpc(player, npc, "The crate was marked 'Dragon Plates'.<br> Apparently they thought it was some kind of armour,<br> when really it's just a plate with a dragon on it!");
		openshop(player);
	}, "Wow, a kite!", async () => {
		await chatplayer(player, "Wow, a kite!");
		await chatnpc(player, npc, "You're not the first to say that...");
		await chatplayer(player, "Can I have one, please?");
		await chatnpc(player, npc, "Well, I suppose I did order more then I need... It's yours<br> for the bargain price of 100 coins.");
		multi2(player, "SELECT AN OPTION", "That's a bargain I'll take one.", async () => {
			await chatplayer(player, "That's a bargain I'll take one.");
			openshop(player);
		}, "No, thanks, I don't want one.", async () => {
			await chatplayer(player, "No, thanks, I don't want one.");
		});
	}, "Party items, you say?", async () => {
		await chatplayer(player, "Party items, you say?");
		await chatnpc(player, npc, "Yep! In a partnership with my pal Party Pete, we've<br> decided to launch a whole range of partyware to help<br> celebrate the Royal Wedding of the King Black Dragon and<br> the Kalphite Queen. Confetti, bubble makers, fireworks,");
		await chatnpc(player, npc, "firecrackers. We even have a commemorative mug!");
		await chatplayer(player, "King Black Dragon and Kalphite... Wait, what?");
		await chatnpc(player, npc, "Er, well, that's what I was told; perhaps our providers got<br> it wrong. Mind you, it wouldn't be the first time. Like, this<br> once, we were due to receive a shipment of dragon mail,<br> and we got a pile of slightly singed letters instead.");
		await chatnpc(player, npc, "Anyway, we've got all those items on sale, and I even have<br> a suitable bouquet available on members' worlds for those<br> who want to emulate the happy bride!");
		await chatplayer(player, "She had a bouquet? The Kalphite Queen? Big bug beady-<br> eyed, occasionally flies about when it's not laying eggs...<br> Are we talking about the same creature?");
		await chatnpc(player, npc, "Listen, partner, I'm not the one writing the advertising<br> pitch here. I got the goods and been told what to say in<br> order to sell them. It's not the most convincing pitch I've<br> ever had to do, but, if you ask me, the products don't");
		await chatnpc(player, npc, "need a pitch. They speak for themselves. Have a <br> butcher's.");
		openshop(player);
	}, "I'd like to check my items, please.", async () => {
		await chatnpc(player, npc, "Sure thing, let me just see what you're missing.");
		retrieve(player);
	});
});

_events.bindEventListener(EventType.OPNPC4, 970, (ctx) => {
	openshop(ctx.player);
});

_events.bindEventListener(EventType.OPNPC5, 970, async (ctx) => {//redeem code
	await chatplayer(ctx.player, "I'd like to redeem an item code, please.");
	await chatnpc(ctx.player, ctx.npc, "Of course. Here you go.");
	const code = await requestString(ctx.player, "Please enter the redemption code.");
		sendMessage(ctx.player, "Please wait while the code is being processed.");
		sendMessage(ctx.player, "processing.....");
		if (code == "0800488449") {//Treborn the Butterfly
			await chatnpc(ctx.player, ctx.npc, "Congratulations! I've completely forgotten what I was<br> talking about.");
			await chatplayer(ctx.player, "Thanks! I can't remember either.");
			//todo add code to unlock
			sendMessage(ctx.player, "You have unlocked a new pet, Treborn the Butterfly.");
			//sendMessage(ctx.player, "This code is no longer valid.");
		} else if (code == "back2ourroots") {//RuneFest 2017 Shield (Live Stream)
			sendMessage(ctx.player, "Your code has been succesfully processed. Please claim your item from<br> Diango or Ianto.");
		} else if (code == "rflivestream2016") {//Honourable Foo Lion
			//todo add code to unlock
			sendMessage(ctx.player, "You can now summon the RuneFest Foo Lion pet.");
            sendMessage(ctx.player, "Your code has been succesfully processed.");
			//sendMessage(ctx.player, "This code is no longer valid.");
		} else if (code == "28052016") {//Yak Scythe
			await chatnpc(ctx.player, ctx.npc, "Congratulations! You've now unlocked the Yak Scythe<br> Override in your wardrobe.");
			await chatplayer(ctx.player, "Thanks! That's a scythe of relief.");
			//todo add code to unlock
			sendMessage(ctx.player, "Your code has been succesfully processed.");
		} else {
			sendMessage(ctx.player, "Your code was not valid. Please check it and try again.");
		}
});


function retrieve(player: Player) {
	openCentralWidget(player, 1387);
}

function openshop(player: Player) {
	if(mapMembers()){
	    setVarp(player, 304, Inv.DIANGOS_TOY_STORE_MEMBERS);
    } else {
        setVarp(player, 304, Inv.DIANGOS_TOY_STORE);
    }
	setVarc(player, 2360, "Diango's Toy Store");
	openCentralWidget(player, 1265);
}