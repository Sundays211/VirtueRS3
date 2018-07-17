/**
 * Copyright (c) 2014 Virtue Studios
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';

import { sendCommandResponse } from 'shared/chat';
import { setResumeHandler } from 'shared/dialog';
import { closeWidgetSub, openWidget } from 'shared/widget';

import { inClan, getClanHash } from './logic/core';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/12/2014
 */
_events.bindEventListener(EventType.COMMAND, "makeclan", (ctx) => {
	if (inClan(ctx.player)) {
		sendCommandResponse(ctx.player, "You need to leave your current clan before you can use this command (clan=" + getClanHash(ctx.player) + ")", ctx.console);
		return;
	}
	openWidget(ctx.player, 1477, 437, 1094, false);
	setResumeHandler(ctx.player, (value) => {
		closeWidgetSub(ctx.player, 1477, 437);
		if (value) {
			CLAN_ENGINE.createClan(value, ctx.player, []);
		}
	});
});
