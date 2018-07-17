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

import { closeOverlay, openWidget } from 'shared/widget';
import { defaultHandler } from 'shared/util';

_events.bindEventListener(EventType.IF_BUTTON, 1607, (ctx) => {
	switch (ctx.component) {
		case 34://Treasure Hunter
			closeOverlay(ctx.player);
			openWidget(ctx.player, 1477, 749, 1252, true);
			openWidget(ctx.player, 1477, 561, 1253, false);
			return;
		case 9://Membership
		case 59://Bonds
		case 85://Soloman's General Store
			break;
		default:
			defaultHandler(ctx, "upgrades-and-extras");
			return;
	}
});
