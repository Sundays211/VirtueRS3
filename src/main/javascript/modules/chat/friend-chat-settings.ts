/**
 * Copyright (c) 2014 Virtue Studios
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
import { EventType } from 'engine/enums/event-type';
import { FriendChatData } from 'engine/enums/friend-chat-data';
import _events from 'engine/events';
import { setVarc } from 'engine/var';
import _config from 'engine/config';

import _component from 'shared/widget/component';
import { setWidgetEvents, setWidgetText } from 'shared/widget';
import { fromBase37Hash, toBase37Hash, runClientScript, defaultHandler } from 'shared/util';
import { stringDialog } from 'shared/dialog';
import { sendDebugMessage } from 'shared/chat';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */
_events.bindEventListener(EventType.IF_OPEN, 1108, (ctx) => {
	var player = ctx.player;
	//player.getVars().setVarp(1258, 299248);
	var nameHash = ENGINE.getFriendChatData(player, FriendChatData.NAME);
	setWidgetText(player, 1108, 9, nameHash ? fromBase37Hash(nameHash) : "Chat disabled");
	setWidgetText(player, 1108, 11, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKJOIN)));
	setWidgetText(player, 1108, 13, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKTALK)));
	setWidgetText(player, 1108, 15, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKKICK)));
	setVarc(player, 199, -1);
	setVarc(player, 3678, -1);
	runClientScript(player, 8178, []);
	setWidgetEvents(player, 1108, 2, 0, 199, 254);//Allow all rank options to be sent to the server
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(1108, 9), async (ctx) => {
	const value = await stringDialog(ctx.player, "Enter chat prefix:");
	var prefix = toBase37Hash(value);
	if (prefix === 0) {
		return;
	}
	ENGINE.setFriendChatData(ctx.player, FriendChatData.NAME, prefix);
	setWidgetText(ctx.player, 1108, 9, fromBase37Hash(prefix));
});

_events.bindEventListener(EventType.IF_BUTTON, 1108, (ctx) => {
	var player = ctx.player;
	var rankId;
	switch (ctx.component) {
		case 33://Close interface
			return;
		case 9://Set prefix/disable
			if (ctx.button === 2) {
				ENGINE.setFriendChatData(player, FriendChatData.NAME, toBase37Hash(""));
				setWidgetText(player, 1108, 9, "Chat disabled");
				return;
			}
			defaultHandler(ctx, "friends chat settings");
			return;
		case 11://Set join rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -8) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKJOIN, rankId);
				setWidgetText(player, 1108, 11, nameFromRank(rankId));
			}
			return;
		case 13://Set talk rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -1) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKTALK, rankId);
				setWidgetText(player, 1108, 13, nameFromRank(rankId));
			}
			return;
		case 15://Set kick rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -1) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKKICK, rankId);
				setWidgetText(player, 1108, 15, nameFromRank(rankId));
			}
			return;
		case 17://Set lootshare rank
		case 20://Toggle coinshare
			sendDebugMessage(player, "Loot Share is not implemented");
			return;
		default:
			defaultHandler(ctx, "friends chat settings");
			return;
	}
});

function rankFromButton(button: number, defaultValue: number): number {
	switch (button) {
		case 1:
			return -1;
		case 2:
			return 0;
		case 3:
			return 1;
		case 4:
			return 2;
		case 5:
			return 3;
		case 6:
			return 4;
		case 7:
			return 5;
		case 8:
			return 6;
		case 9:
			return 7;
		default:
			return defaultValue;
	}
}

function nameFromRank(rankId: number): string {
	return _config.enumValue(616, rankId + 1) as string;
}
