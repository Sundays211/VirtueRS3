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
import _map from 'engine/map';
 
import { locationAnim, addLocation, getLocShape, getLocRotation } from 'shared/map/location';
import { runAnim } from 'shared/anim';
import { multi3 } from 'shared/dialog';

_events.bindEventListener(EventType.OPLOC1, 26194, (ctx) => {//party room lever
	locationAnim(ctx.location, 6934);
	runAnim(ctx.player, 6933, function () {
		multi3(ctx.player, "SELECT AN OPTION", "Balloon Bonanza (1000 coins).", function () {
		}, "Nightly Dance (500 coins).", function () {
		}, "No action.", function () {
		});
	});
});

_events.bindEventListener(EventType.OPLOC1, 26193, (ctx) => {//party room chest
	runAnim(ctx.player, 536, function () {
	    addLocation(2418, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
	});
});

_events.bindEventListener(EventType.OPLOC2, 2418, (ctx) => {//party room chest
	//deposit
});

_events.bindEventListener(EventType.OPLOC3, 2418, (ctx) => {//party room chest
	runAnim(ctx.player, 535, function () {
		addLocation(26193, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
	});
});