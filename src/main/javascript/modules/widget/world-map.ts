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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import { setVarc } from 'engine/var';

import { runClientScript } from 'shared/util';
import { openOverlaySub, setWidgetEvents, hideWidget, openWidget } from 'shared/widget';
import { stopAnim, runAnim } from 'shared/anim';
import { getCoordHash } from 'shared/map';

_events.bindEventListener(EventType.IF_OPEN, 1422, (ctx) => {
 	setWidgetEvents(ctx.player, 1422, 38, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 39, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 40, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 41, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 42, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 43, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 44, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 45, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 46, 2, 2, 2);
 	setWidgetEvents(ctx.player, 1422, 47, 2, 2, 2);
 	setVarc(ctx.player, 622, getCoordHash(_entity.getCoords(ctx.player)));
 	setWidgetEvents(ctx.player, 1422, 86, 0, 19, 2);
 	hideWidget(ctx.player, 1422, 49, true);
 	setVarc(ctx.player, 4197, -1);
 	setVarc(ctx.player, 674, getCoordHash(_entity.getCoords(ctx.player)));
 	runAnim(ctx.player, 22748);
 });

_events.bindEventListener(EventType.IF_CLOSE, 1422, (ctx) => {
 	runClientScript(ctx.player, 8105, []);
 	setVarc(ctx.player, 622, -1);
 	setVarc(ctx.player, 674, -1);
 	openOverlaySub(ctx.player, 1015, 1215, true);
 	openWidget(ctx.player, 1477, 16, 1482, true);
 	stopAnim(ctx.player);
 	runAnim(ctx.player, 22749);
 });
