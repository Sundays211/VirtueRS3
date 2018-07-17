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

import { chatplayer, chatnpc } from 'shared/dialog';

_events.bindEventListener(EventType.OPNPC1, 6128, async (ctx) => {
	await chatplayer(ctx.player, "Hi there.");
	await chatnpc(ctx.player, ctx.npc, "Hey, ids me matesh!");
	await chatplayer(ctx.player, "Sorry, have we met?");
	await chatnpc(ctx.player, ctx.npc, "Yeah! you wazsh wiv me in dat pub overy by hill!");
	await chatplayer(ctx.player, "I have no idea what you're going on about.");
	await chatnpc(ctx.player, ctx.npc, "Glad yeeash remembers.");
});