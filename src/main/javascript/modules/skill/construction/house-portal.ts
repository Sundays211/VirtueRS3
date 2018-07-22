/**
 * Copyright (c) 2014 Virtue Studios
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
import _map from 'engine/map';
import { Player, Npc } from 'engine/models';

import _coords from 'shared/map/coords';
import { sendMessage } from 'shared/chat';
import { multi4, chatnpc, multi2, chatplayer, playerDialog } from 'shared/dialog';
import { buildHouse } from './house-builder';

//397 = Furnature creation (flatpacks)
//402 = (Possibly) Room creation
//1306 = Furnature creation #2
//1665 = house settings
//879 = pet house
//399 = there's no place like home
//1613 = aquarium planning
_events.bindEventListener(EventType.OPLOC1, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247],  (ctx) => {
	multi4(ctx.player, "SELECT AN OPTION", "Go to your house.", () => {
		sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
		//enterHouse(ctx.player);
	}, "Go to your house (building mode).", () => {
		sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
		sendMessage(ctx.player, "Build mode is not yet supported.");
	}, "Go to a friend's house.",() => {
		joinHouse(ctx.player);
	}, "Never mind.", () => {});
});

_events.bindEventListener(EventType.OPLOC2, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], (ctx) => {//your house
	//sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
	enterHouse(ctx.player);
});

_events.bindEventListener(EventType.OPLOC3, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], (ctx) => {//Build mode
	sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
	sendMessage(ctx.player, "Build mode is not yet supported.");
});

_events.bindEventListener(EventType.OPLOC4, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], (ctx) => {//friend's house
	joinHouse(ctx.player);
});

_events.bindEventListener(EventType.OPNPC1, [ 4247, 20105], async (ctx) => {//estate agent talk
	await chatnpc(ctx.player, ctx.npc, "Hello. Welcome to RuneScape Housing Agency! What<br> can I do for you?");
	buyhouse(ctx.player, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [ 4247, 20105], async (ctx) => {//estate agent redecorate
	await chatnpc(ctx.player, ctx.npc, "Hm, you don't seem to have a house that I can<br> redecorate. Perhaps you would like to buy a house first?");
	buyhouse(ctx.player, ctx.npc);
});

function buyhouse (player: Player, npc: Npc) {
	multi2(player, "SELECT AN OPTION", "How can I get a house?", async () => {
		await chatnpc(player, npc,"I can sell you a starting house in Taverley for 1,000 coins.<br> As your Construction level increases, you will be able to<br> move your house to other areas and redecorate it in<br> other styles.");
		await chatnpc(player, npc,"Do you wont to buy a starter house?")
		multi2(player, "SELECT AN OPTION", "Yes please!", () => {
		}, "No thanks", () => {
			chatnpc(player, npc, "Well enjoy your player-owned cardboard box or wherever<br> you're going to sleep tonight!");
		});
	}, "Tell me about houses", async () => {
		await chatplayer(player, "Tell me about houses!");
		await chatnpc(player, npc, "It all came out of the wizards' experiments. They found a<br> way to fold space, so that they could pack many acres of<br> land into an area only a foot across.");
		await chatnpc(player, npc,"They created several folded-space regions across<br> RuneScape. Each one contains hundreds of small plots<br> where people can build houses.");
		await chatplayer(player, "Ah, so that's how everyone can have a house without<br> them cluttering up the world!");
		await chatnpc(player, npc,"Quite. The wizards didn't want to get bogged down in the<br> business side of things so they hired me to sell the houses.");
		await chatnpc(player, npc,"There are various other people across RuneScape who can<br> help you furnish your house. You should start by buying<br> planks from the sawmill operator in Varrock.");
	});
}

export function enterHouse (player: Player) {
	var house = _map.createDynamicSquare();
	buildHouse(player, house);
	var houseCoords = _map.getCoords(house);
	var destCoords = _coords(houseCoords, 8, 8, 1);
	_entity.setCoords(player, destCoords);
	//player.setHouse(house);
	sendMessage(player, "Welcome to your house!");
}

async function joinHouse(player: Player) {
	var message = "Enter name:";
	const targetPlayer = await playerDialog(player, message);
	_entity.setCoords(player, _map.getCoords(targetPlayer));
	//chat.sendMessage(player, "They do not seem to be at home.");
	//chat.sendMessage(player, "That player is offline, or has privacy mode enabled.");
	//chat.sendMessage(player, "They don't own a house.");
}
