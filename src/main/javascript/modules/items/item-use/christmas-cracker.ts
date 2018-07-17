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
import _entity from 'engine/entity';
import _inv from 'engine/inv';
import { Inv } from 'engine/enums/inventory';

import { runAnim } from 'shared/anim';
import { giveItem, takeItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';
 
_events.bindEventListener(EventType.OPPLAYERU, 962, (ctx) => {
	var possibles = [1046, 1042, 1044, 1048, 1040, 1038];
	var extraPossibles = [1127, 1079, 1201, 1163, 2581, 6571, 563, 554, 555, 995, 1973, 1635, 950, 1897, 1969, 1217];
	var idx = Math.floor(Math.random()*possibles.length);
	var idx2 = Math.floor(Math.random()*extraPossibles.length);
	var choice = possibles[idx];
	var choice2 = extraPossibles[idx2];
	if (_inv.freeSpace(ctx.player, Inv.BACKPACK) < 3) {
		sendMessage(ctx.player, "Not enough space in your inventory.");
		return;
	}
	if (_inv.freeSpace(ctx.target, Inv.BACKPACK) < 3) {
		sendMessage(ctx.player, "The person you are trying to use this item on does not have enough inventory space.");
		return;
	}
	sendMessage(ctx.player, "You pulled the Christmas Cracker... ");
	runAnim(ctx.player, 15153);
	ENGINE.faceEntity(ctx.player, ctx.target);
	runAnim(ctx.target, 15153);
	ENGINE.faceEntity(ctx.target, ctx.player);
	if (Math.random() <= 0.5) {
		ENGINE.clearFaceEntity(ctx.player);
		_entity.say(ctx.player, "Hey! I got the cracker!");
		giveItem(ctx.player, choice2, 1); //Extra reward random
		giveItem(ctx.player, choice, 1); //Random Partyhat
		giveItem(ctx.player, 995, 100000); //Extra 100k for opening
		takeItem(ctx.player, 962, 1, ctx.slot);
	} else {
		ENGINE.clearFaceEntity(ctx.target);
		_entity.say(ctx.target, "Hey! I got the cracker!");
		giveItem(ctx.target, choice2, 1); //Extra reward random
		giveItem(ctx.target, choice, 1); //Random Partyhat
		giveItem(ctx.target, 995, 100000); //Extra 100k for opening
		takeItem(ctx.player, 962, 1, ctx.slot);
	}
});