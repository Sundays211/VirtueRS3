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

import { setWidgetEvents, hideWidget, openCentralWidget, closeWidgetSub, setWidgetText, openWidget } from 'shared/widget';
import { setVarp } from 'engine/var';
import { defaultHandler } from 'shared/util';

_events.bindEventListener(EventType.IF_OPEN, 1587, (ctx) => {
	setWidgetEvents(ctx.player, 1587, 26, 0, 200, 6);
	setWidgetEvents(ctx.player, 1587, 47, 0, 1, 2);
	hideWidget(ctx.player, 1587, 29, true);
});

_events.bindEventListener(EventType.IF_BUTTON, 1587, (ctx) => {
	switch (ctx.component) {
		case 42://Close button
			return;
		case 26:
			hideWidget(ctx.player, 1587, 29, false);
			setWidgetText(ctx.player, 1587, 98, "Are you sure you want to switch to world " + ctx.slot + "?");
			return;
		case 47:
			setVarp(ctx.player, 4735, 104005679);
			setVarp(ctx.player, 4734, 7230);
			setVarp(ctx.player, 4736, 0);
			setWidgetEvents(ctx.player, 1477, 801, 0, 3, 2);
			return;
		case 84:
			setVarp(ctx.player, 20, -1761607680);
			closeWidgetSub(ctx.player, 1477, 426);
			openWidget(ctx.player, 1477, 333, 1215, true);
			hideWidget(ctx.player, 1477, 333, false);
			hideWidget(ctx.player, 745, 2, true);
			return;
		case 93:
			openCentralWidget(ctx.player, 1587, false);
			return;
		default:
			defaultHandler(ctx, "hop-worlds");
			return;
	}
});
