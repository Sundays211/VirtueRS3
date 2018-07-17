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
import { setVarp } from 'engine/var';

import { runAnim } from 'shared/anim';
import _coords from 'shared/map/coords';
import { openCentralWidget } from 'shared/widget';

_events.bindEventListener(EventType.OPLOC1, 87997, (ctx) => {//jump down well
	runAnim(ctx.player, 21924, function () {
		setVarp(ctx.player, 5142, 15364);//find right varbits that are used
		setVarp(ctx.player, 5144, 24181);
		openCentralWidget(ctx.player, 1591, false);
	});
	//getting kicked out anim 21922
});

_events.bindEventListener(EventType.OPLOC2, 87997, (ctx) => {//well graveyard
    _entity.setCoords(ctx.player, _coords(1,37,94,31,39));
	runAnim(ctx.player, 2924);
});