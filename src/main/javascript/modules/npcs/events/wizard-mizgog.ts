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

import { chatnpc, chatplayer } from 'shared/dialog';
import { getName } from 'shared/util';

_events.bindEventListener(EventType.OPNPC1, 14759, async (ctx) => {
	await chatplayer(ctx.player, "Merry Christmas Mizgog!");
	await chatnpc(ctx.player, ctx.npc, "Merry Christmas "+ getName(ctx.player)+"! Have you seen what<br> Wizard Grayzag is up to now? He has picked a fight with<br> Frumscone - They are fighting it out behind that screen<br> there...");
	await chatplayer(ctx.player, "What happened?");
	await chatnpc(ctx.player, ctx.npc, "I'm not sure, I didn't see. I have no doubt that it will be a<br> childish reason, though...");
});