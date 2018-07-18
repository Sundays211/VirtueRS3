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
import _player from 'engine/player';

import { defaultHandler } from 'shared/util';
import { closeOverlaySub, setWidgetText, openWidget, openCentralWidget } from 'shared/widget';

_events.bindEventListener(EventType.IF_OPEN, 1446, (ctx) => {
	setWidgetText(ctx.player, 1446, 94, _entity.getName(ctx.player));
	setWidgetText(ctx.player, 1446, 93, _player.getPrefixTitle(ctx.player));
});

_events.bindEventListener(EventType.IF_OPEN, 1560, (ctx) => {
	openWidget(ctx.player, 1560, 16, 1558, true);//
	openWidget(ctx.player, 1560, 18, 1557, true);//Skills
	openWidget(ctx.player, 1560, 17, 1559, true);//Combat stats
});

_events.bindEventListener(EventType.IF_BUTTON, 1446, (ctx) => {
	switch (ctx.component) {
		case 108:
			openCentralWidget(ctx.player, 1561, false);
			break;
		default:
			defaultHandler(ctx, "hero-widget");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1560, (ctx) => {
	switch (ctx.component) {
		case 22:
			closeOverlaySub(ctx.player, 1024, true);
			break;
		default:
			defaultHandler(ctx, "hero-widget");
			return;
	}
});
