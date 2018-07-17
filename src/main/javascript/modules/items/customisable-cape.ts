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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import _entity from 'engine/entity'; 

import { openCentralWidget } from 'shared/widget';
import _coords from 'shared/map/coords';
import { sendMessage } from 'shared/chat';

_events.bindEventListener(EventType.OPWORN1, [20769,20771,32152,32153], (ctx) => {//comp cape Kandarin Monastery
	_entity.setCoords(ctx.player, _coords(3086, 3502, 0));
});

_events.bindEventListener(EventType.OPWORN2, [20769,20771,32152,32153], (ctx) => {//comp cape Ardougne farm
	_entity.setCoords(ctx.player, _coords(2663, 3374, 0));
});

_events.bindEventListener(EventType.OPWORN3, [20769,20771,32152,32153], (ctx) => {//comp cape Max Guild
	_entity.setCoords(ctx.player, _coords(2276, 3314, 1));
});

_events.bindEventListener(EventType.OPWORN4, [20769,20771,32152,32153], (ctx) => {//comp cape Summoning restore
	sendMessage(ctx.player, "<col=ff0000>will be added soon. bugged atm.");
});

_events.bindEventListener(EventType.OPWORN5, [20769,20771,32152,32153], (ctx) => {//comp cape Customise
	openCentralWidget(ctx.player, 20, false);
});

_events.bindEventListener(EventType.OPWORN1, [20767,32151], (ctx) => {//max cape Customise
	openCentralWidget(ctx.player, 20, false);
});

_events.bindEventListener(EventType.OPWORN2, [20767,32151], (ctx) => {//max cape Max Guild
	_entity.setCoords(ctx.player, _coords(2276, 3314, 1));
});