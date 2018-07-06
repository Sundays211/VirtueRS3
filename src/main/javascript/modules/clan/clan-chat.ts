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

import { defaultHandler, runClientScript } from 'shared/util';
import { sendMessage } from 'shared/chat';

import { inClan, leaveClan } from './logic/core';
import { setWidgetEvents, openWidget, openCentralWidget } from 'shared/widget';
import { addClanBan, removeClanBan } from './logic/bans';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
 _events.bindEventListener(EventType.IF_OPEN, 1110, (ctx) => {
 	setWidgetEvents(ctx.player, 1110, 34, 0, 200, 2);
 	setWidgetEvents(ctx.player, 1110, 72, 0, 600, 2);//Clan members list
 	setWidgetEvents(ctx.player, 1110, 70, 0, 600, 1040);
 	setWidgetEvents(ctx.player, 1110, 42, 0, 600, 1040);
 });

_events.bindEventListener(EventType.IF_BUTTON, 1110, (ctx) => {
 	switch (ctx.component) {
 	case 109://Expand clan actions
 		openWidget(ctx.player, 1477, 542, 234, true);
 		runClientScript(ctx.player, 8787, [-6, -24, 2, -1, 72745069, 40, 160]);
 		return;
 	case 168://Clan chat
 	case 170://Visited clan chat
 	case 166://Clan ban list
 		return;//Prevents swapping chat tabs from triggering a debug message
 	case 159://Leave clan
 		leaveClan(ctx.player);
 		return;
 	case 142://Clan settings
 		if (!inClan(ctx.player)) {
 			sendMessage(ctx.player, "You're not in a clan.");
 		} else {
 			openCentralWidget(ctx.player, 1096);
 		}
 		return;
 	case 20://Add ban
 		addClanBan(ctx.player);
 		return;
 	case 28://Remove ban
 		removeClanBan(ctx.player, -1);
 		return;
 	case 34://Clan ban list interaction
 		removeClanBan(ctx.player, ctx.slot);
 		return;
 	case 118://Leave clan channel
 	case 126://Clan details
 	case 134://Clan noticeboard
 		//You do not have sufficient rank in your clan to do this.
 	case 59://Join clan as guest
 	case 72://Show clanmate options
 	case 101://Close clanmate options
 	case 83://Temp ban clan member
 	case 97://Show clanmate resources
 		defaultHandler(ctx, "clan chat");
 		return;
 	default:
 		defaultHandler(ctx, "clan chat");
 		return;
 	}
 });

_events.bindEventListener(EventType.IF_BUTTON, 234, (ctx) => {
 	switch (ctx.component) {
 	case 4://Leave clan
 		leaveClan(ctx.player);
 		return;
 	case 16://Clan settings
 		if (!inClan(ctx.player)) {
 			sendMessage(ctx.player, "You're not in a clan.");
 		} else {
 			openCentralWidget(ctx.player, 1096, false);
 		}
 		return;
 	case 34://Leave clan channel
 	case 28://Clan details
 	case 22://Clan noticeboard
 		defaultHandler(ctx, "clan action button");
 		return;
 	default:
 		defaultHandler(ctx, "clan action button");
 		return;
 	}
 });
