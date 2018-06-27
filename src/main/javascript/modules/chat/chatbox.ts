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
import { Player } from 'engine/models';
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import { varbit, setVarBit } from 'engine/var';

import { openCentralWidget } from 'shared/widget';
import { sendDebugMessage } from 'shared/chat';
import { openModalBase } from 'shared/dialog';
import { defaultHandler, runClientScript } from 'shared/util';

import {
	toggleGameFilter,
	togglePublicFilter,
	togglePrivateFilter,
	toggleFriendChatFilter,
	toggleClanFilter,
	toggleGuestClanFilter,
	toggleTradeFilter,
	toggleAssistFilter,
	toggleGroupFilter,
	toggleProfanityFilter,
	toggleBroadcastsFilter,
	setGameFilter,
	setPublicFilter,
	setPrivateFilter,
	setFriendChatFilter,
	setClanFilter,
	setGuestClanFilter,
	setTradeFilter,
	setAssistFilter,
	setGroupFilter
} from './chatbox-filters';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/01/2015
 */
_events.bindEventListener(EventType.IF_BUTTON, 1529, (ctx) => {
	switch (ctx.component) {
		case 58://Chat box
			return;
		case 81:
			toggleGameFilter(ctx.player, 25);
			return;
		case 107:
			toggleGroupFilter(ctx.player, 25);
			return;
		case 105:
			toggleProfanityFilter(ctx.player, 25);
			return;
		case 222://Toggle online status - This is handled via a different packet
			return;
		case 225:
			toggleAlwaysOn(ctx.player);
			return;
		case 236:
			toggleVipBadge(ctx.player);
			return;
		case 240:
			createGroup(ctx.player);
			return;
		case 242:
			switchGroupTeam(ctx.player);
			return;
		default:
			defaultHandler(ctx, "chatbox 1529");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 464, (ctx) => {
	switch (ctx.component) {//Trade/Assist
		case 6:
			toggleGameFilter(ctx.player, 23);
			return;
		case 9:
			togglePublicFilter(ctx.player, 23);
			return;
		case 24:
			toggleTradeFilter(ctx.player, 23);
			return;
		case 27:
			toggleAssistFilter(ctx.player, 23);
			return;
		case 30:
			toggleProfanityFilter(ctx.player, 23);
			return;
		case 218://Chat box
			return;
		case 223://Toggle online status - This is handled via a different packet
			return;
		case 226:
			toggleAlwaysOn(ctx.player);
			return;
		case 237:
			toggleVipBadge(ctx.player);
			return;
		case 239:
			assistTime(ctx.player);
			return;
		default:
			defaultHandler(ctx, "trade/assist chatbox");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1470, (ctx) => {
	switch (ctx.component) {//Guest clan chat
		case 58://Chat box
			return;
		case 188:
			toggleGameFilter(ctx.player, 22);
			return;
		case 203:
			toggleGuestClanFilter(ctx.player, 22);
			return;
		case 212:
			toggleProfanityFilter(ctx.player, 22);
			return;
		case 223://Toggle online status - This is handled via a different packet
			return;
		case 226:
			toggleAlwaysOn(ctx.player);
			return;
		case 237:
			toggleVipBadge(ctx.player);
			return;
		case 234:
			joinLeaveGuestClanChat(ctx.player);
			return;
		default:
			defaultHandler(ctx, "guest clan chatbox");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1471, (ctx) => {
	switch (ctx.component) {//Clan chat
		case 60://Chat box
			return;
		case 84://Game
			toggleGameFilter(ctx.player, 21);
			return;
		case 96:
			toggleClanFilter(ctx.player, 21);
			return;
		case 108:
			toggleProfanityFilter(ctx.player, 21);
			return;
		case 224://Toggle online status - This is handled via a different packet
			return;
		case 227:
			toggleAlwaysOn(ctx.player);
			return;
		case 237:
			toggleVipBadge(ctx.player);
			return;
		case 232:
			joinLeaveClanChat(ctx.player);
			return;
		default:
			defaultHandler(ctx, "clan chatbox");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1472, (ctx) => {
	switch (ctx.component) {//Friends chat
		case 58://Chat box
			return;
		case 82://Game
			toggleGameFilter(ctx.player, 20);
			return;
		case 91:
			toggleFriendChatFilter(ctx.player, 20);
			return;
		case 106:
			toggleProfanityFilter(ctx.player, 20);
			return;
		case 223://Toggle online status - This is handled via a different packet
			return;
		case 226:
			toggleAlwaysOn(ctx.player);
			return;
		case 237:
			toggleVipBadge(ctx.player);
			return;
		case 227:
			joinLeaveFriendChat(ctx.player);
			return;
		case 230:
			friendChatSettings(ctx.player);
			return;
		default:
			defaultHandler(ctx, "friends chat chatbox");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1467, (ctx) => {
	switch (ctx.component) {//Private chat
		case 58://Chat box
			return;
		case 81://Game
			toggleGameFilter(ctx.player, 19);
			return;
		case 87://Private
			togglePrivateFilter(ctx.player, 19);
			return;
		case 99://Trade
			toggleTradeFilter(ctx.player, 19);
			return;
		case 102://Assist
			toggleAssistFilter(ctx.player, 19);
			return;
		case 105://Profanity
			toggleProfanityFilter(ctx.player, 19);
			return;
		case 221://Toggle online status - This is handled via a different packet
			return;
		case 224:
			toggleAlwaysOn(ctx.player);
			return;
		case 235:
			toggleVipBadge(ctx.player);
			return;
		default:
			defaultHandler(ctx, "private chatbox");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 137, (ctx) => {
	switch (ctx.component) {
		case 65://Toggle game filter
			toggleGameFilter(ctx.player, 18);
			return;
		case 68:
			togglePublicFilter(ctx.player, 18);
			return;
		case 71:
			togglePrivateFilter(ctx.player, 18);
			return;
		case 74:
			toggleFriendChatFilter(ctx.player, 18);
			return;
		case 77:
			toggleClanFilter(ctx.player, 18);
			return;
		case 80:
			toggleGuestClanFilter(ctx.player, 18);
			return;
		case 83:
			toggleTradeFilter(ctx.player, 18);
			return;
		case 86:
			toggleAssistFilter(ctx.player, 18);
			return;
		case 89:
			toggleProfanityFilter(ctx.player, 18);
			return;
		case 90:
			toggleBroadcastsFilter(ctx.player, 18);
			return;
		case 91:
			toggleGroupFilter(ctx.player, 18);
			return;
		case 100://Toggle online status - This is handled via a different packet
			return;
		case 103://Toggle always-on chat mode
			toggleAlwaysOn(ctx.player);
			return;
		case 114:
			toggleVipBadge(ctx.player);
			return;
		case 117:
			report(ctx.player);
			return;
		case 122://Open examine settings
			openExamineSettings(ctx.player);
			return;
		case 127://Clicked quick chat bubble
			return;
		case 130://Clicked chat box
			return;
		case 255://Legacy switch to "All"
			return;
		case 259://Legacy "Game"
			if (ctx.button == 2) {
				setGameFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setGameFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setGameFilter(ctx.player, 2);
			}
			return;
		case 264://Legacy "Public"
			if (ctx.button == 2) {
				setPublicFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setPublicFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setPublicFilter(ctx.player, 2);
			}
			return;
		case 269://Legacy "Private"
			if (ctx.button == 2) {
				setPrivateFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setPrivateFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setPrivateFilter(ctx.player, 2);
			}
			return;
		case 274://Legacy "Friends"
			if (ctx.button == 2) {
				setFriendChatFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setFriendChatFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setFriendChatFilter(ctx.player, 2);
			}
			return;
		case 279://Legacy "Clan"
			if (ctx.button == 2) {
				setClanFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setClanFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setClanFilter(ctx.player, 2);
			}
			return;
		case 284://Legacy "Guest"
			if (ctx.button == 2) {
				setGuestClanFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setGuestClanFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setGuestClanFilter(ctx.player, 2);
			}
			return;
		case 289://Legacy "Trade"
			if (ctx.button == 2) {
				setTradeFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setTradeFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setTradeFilter(ctx.player, 2);
			}
			return;
		case 293://Legacy "Assist"
			if (ctx.button == 2) {
				setAssistFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setAssistFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setAssistFilter(ctx.player, 2);
			} else if (ctx.button == 5) {
				assistTime(ctx.player);
			}
			return;
		case 295://Legacy "Group"
			if (ctx.button == 2) {
				setGroupFilter(ctx.player, 0);
			} else if (ctx.button == 3) {
				setGroupFilter(ctx.player, 1);
			} else if (ctx.button == 4) {
				setGroupFilter(ctx.player, 2);
			}
			return;
		case 298://Legacy "Report"
			report(ctx.player);
			return;
		default:
			defaultHandler(ctx, "chatbox");
			return;
	}
});

function toggleAlwaysOn(player: Player) {
	var on = varbit(player, 22310) == 1;
	setVarBit(player, 22310, on ? 0 : 1);
}

function toggleVipBadge(player: Player) {
	sendDebugMessage(player, "Unhandled VIP badge toggle.");
}

function report(player: Player) {
	openCentralWidget(player, 1406, false);
}

function assistTime(player: Player) {
	sendDebugMessage(player, "Unhandled assist time button.");
}

function joinLeaveFriendChat(player: Player) {
	if (player.getChat().getFriendChatOwner() !== 0) {
		runClientScript(player, 194, [1]);
		return;
	}
	openModalBase(player);
	runClientScript(player, 8178, []);
	runClientScript(player, 8537, []);
	runClientScript(player, 194, [1]);
}

function friendChatSettings(player: Player) {
	openCentralWidget(player, 1108, false);
}

function joinLeaveClanChat(player: Player) {
	sendDebugMessage(player, "Unhandled join/leave clan chat button.");
}

function joinLeaveGuestClanChat(player: Player) {
	sendDebugMessage(player, "Unhandled join/leave guest clan chat button.");
}

function createGroup(player: Player) {
	sendDebugMessage(player, "Unhandled group create button.");
}

function switchGroupTeam(player: Player) {
	sendDebugMessage(player, "Unhandled switch group team button.");
}

function openExamineSettings(player: Player) {
	openCentralWidget(player, 1561, false);
}
