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
import { EventType, Inv } from 'engine/enums';
import { Player, Npc } from 'engine/models';
import _events from 'engine/events';
import { setVarp, setVarc } from 'engine/var';

import { openCentralWidget } from 'shared/widget';
import { chatnpc, multi3 } from 'shared/dialog';

/**
 *  @author Alex
 */
_events.bindEventListener(EventType.OPNPC1, 14866, async (ctx) => {
 	await chatnpc(ctx.player, ctx.npc, "If you want to know how to bring forth magical creatures from the ether, you've come to the right place!");
 	maintalk(ctx.player, ctx.npc);
 });

_events.bindEventListener(EventType.OPNPC5, 14866, (ctx) => {
 	openShop(ctx.player);
 });

 function openShop (player: Player) {
 	setVarp(player, 304, Inv.SUMMONING_SHOP_1);
 	setVarp(player, 305, Inv.SUMMONING_SHOP_FREE);
 	setVarc(player, 2360, "Magestix's Summoning Shop");
 	openCentralWidget(player, 1265, false);
 }

 function maintalk (player: Player, npc: Npc) {
 	multi3(player, "CHOOSE AN OPTION", "I need summoning supplies.", () => {
 		openShop(player);
 	}, "I want to train summoning.", () => {
 		howtotrain(player, npc);
 	}, "Tell me more about summoning.", () => {
 		moreinfo(player, npc);
 	});
 }

 function howtotrain (player: Player, npc: Npc) {
 	chatnpc(player, npc, "You need to create pouches, by combining reagents with spirit shards.");
 }

 async function moreinfo (player: Player, npc: Npc) {
 	await chatnpc(player, npc, "There is another world, besides this one. That world is filled with wondrous creatures, great and small. Summoning is the art of drawing those creatures forth to server you.");
 	await chatnpc(player, npc, "By combining rare reagents with our spirit shards, you can create pouches to perform this act.");
 }

 /*function farewell (player: Player, npc: Npc) {
 	dialog.builder(player).chatnpc(npc, "Thank you for the information about Summoning.").finish();
 }*/
