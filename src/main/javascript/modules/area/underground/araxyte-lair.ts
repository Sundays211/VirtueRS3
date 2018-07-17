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
import _map from 'engine/map';
import { setVarp } from 'engine/var';

import { runAnim } from 'shared/anim';
import { mesbox, multi2 } from 'shared/dialog';
import { openCentralWidget } from 'shared/widget';
import _coords from 'shared/map/coords';

_events.bindEventListener(EventType.OPLOC1, 91500, async (ctx) => {//Webbed entrance
	await mesbox(ctx.player, "<col=7f0000>Beyound this point is the Araxyte hive.<br><col=7f0000> There is no way out other then death or Victory.<br><col=7f0000> Only those who can endure dangerous encouters should proceed.");
    multi2(ctx.player, "SELECT AN OPTION", "Enter encounter", () => {
	}, "Start/join custom encounter", () => {
		setVarp(ctx.player, 5142, 15362);//find right varbits that are used
		setVarp(ctx.player, 5144, 28799);
		openCentralWidget(ctx.player, 1591, false);
	});
});

_events.bindEventListener(EventType.OPLOC1, 91553, (ctx) => {//rope out of lair
	runAnim(ctx.player, 15456, function () {
		runAnim(ctx.player, -1);
        _entity.setCoords(ctx.player, _coords(0,57,53,52,27));
	});
});

_events.bindEventListener(EventType.OPLOC1, 91661, (ctx) => {//Gap
	runAnim(ctx.player, 10738, function () {
        //_entity.setCoords(ctx.player, _coords(1,70,98,26,15)); //and 1,70,98,31,17
	});
});