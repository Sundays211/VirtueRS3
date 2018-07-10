/**
 * Copyright (c) 2017 Virtue Studios
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _map from 'engine/map';

import { runAnim } from 'shared/anim';
import { sendMessage } from 'shared/chat';
import { giveItem, takeItem } from 'shared/inv';

_events.bindEventListener(EventType.OPNPC1, [17101, 17102], (ctx) => {//Dance to Party/Masterwork Music Boxs
	runAnim(ctx.player, 20156);
	sendMessage(ctx.player, "You start to dance to the music.");
});

_events.bindEventListener(EventType.OPNPC1, 18528, (ctx) => {//Dance to Morytanian Music Box
	runAnim(ctx.player, 21846);
	sendMessage(ctx.player, "You start to dance to the music.");
});

_events.bindEventListener(EventType.OPNPC1, 18529, (ctx) => {//Dance to Kharidian Music Box
	runAnim(ctx.player, 21847);
	sendMessage(ctx.player, "You start to dance to the music.");
});

_events.bindEventListener(EventType.OPNPC3, [17101, 17102], (ctx) => {//Listen to Party/Masterwork Music Boxs
	sendMessage(ctx.player, "This option is unavailable.");
});

_events.bindEventListener(EventType.OPNPC3, 18528, (ctx) => {//Listen to Morytanian Music Box
	sendMessage(ctx.player, "This option is unavailable.");
});

_events.bindEventListener(EventType.OPNPC3, 18529, (ctx) => {//Listen to Kharidian Music Box
	sendMessage(ctx.player, "This option is unavailable.");
});

_events.bindEventListener(EventType.OPNPC4, 17102, (ctx) => {//Pickup Masterwork Music Box
	if(!ctx.npc.isOwner(ctx.player)) {
		sendMessage(ctx.player, "You are not the owner of this Music Box.");
		return;
	}
	ctx.npc.destroy();
	ctx.player.setPet(null);
	giveItem(ctx.player, 28142, 1);
});

_events.bindEventListener(EventType.OPNPC4, 18528, (ctx) => {//Pickup Morytanian Music Box
	if(!ctx.npc.isOwner(ctx.player)) {
		sendMessage(ctx.player, "You are not the owner of this Music Box.");
		return;
	}
	ctx.npc.destroy();
	ctx.player.setPet(null);
	giveItem(ctx.player, 29952, 1);
});

_events.bindEventListener(EventType.OPNPC4, 18529, (ctx) => {//Pickup Kharidian Music Box
	if(!ctx.npc.isOwner(ctx.player)) {
		sendMessage(ctx.player, "You are not the owner of this Music Box.");
		return;
	}
	ctx.npc.destroy();
	ctx.player.setPet(null);
	giveItem(ctx.player, 29954, 1);
});

_events.bindEventListener(EventType.OPHELD1, 28142, (ctx) => {//put down Masterwork Music Box
	var npc = ENGINE.createNpc(17102, _map.getCoords(ctx.player));
	if(npc.getOwner() !== null) {
		sendMessage(ctx.player, "You already have a music box out.");
	} else {
		npc.setOwner(ctx.player);
		ENGINE.spawnNpc(npc);
		runAnim(ctx.player, 827);
		takeItem(ctx.player, 28142, 1);
		ENGINE.moveAdjacent(ctx.player);
	}
});

_events.bindEventListener(EventType.OPHELD1, 29952, (ctx) => {//put down Morytanian Music Box
	var npc = ENGINE.createNpc(18528, _map.getCoords(ctx.player));
	if (npc.getOwner() !== null) {
		sendMessage(ctx.player, "You already have a music box out.");
	} else {
		npc.setOwner(ctx.player);
		ENGINE.spawnNpc(npc);
		runAnim(ctx.player, 827);
		takeItem(ctx.player, 29952, 1);
		ENGINE.moveAdjacent(ctx.player);
	}
});

_events.bindEventListener(EventType.OPHELD1, 29954, (ctx) => {//put down Kharidian Music Box
	var npc = ENGINE.createNpc(18529, _map.getCoords(ctx.player));
	if(npc.getOwner() !== null) {
		sendMessage(ctx.player, "You already have a music box out.");
	} else {
		npc.setOwner(ctx.player);
		ENGINE.spawnNpc(npc);
		runAnim(ctx.player, 827);
		takeItem(ctx.player, 29954, 1);
		ENGINE.moveAdjacent(ctx.player);
	}
});

_events.bindEventListener(EventType.OPHELD1, 28141, (ctx) => {//put down Party Music Box
	//todo Multiples can be placed at once but they must be at least ten squares away from each other.
	//The music box disappears after having been placed for an hour.
	var npc = ENGINE.createNpc(17101, _map.getCoords(ctx.player));
	ENGINE.spawnNpc(npc);
	runAnim(ctx.player, 827);
	takeItem(ctx.player, 28141, 1);
	ENGINE.moveAdjacent(ctx.player);
});