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
/* globals EventType, ENGINE */
var filters = require('./chatbox-filters');
var util = require('../core/util');
var widget = require('../core/widget');
var dialog = require('../core/dialog');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/01/2015
 */
module.exports = function(scriptManager) {
	scriptManager.bind(EventType.IF_BUTTON, 1529, function (ctx) {
		switch (ctx.component) {
		case 58://Chat box
			return;
		case 81:
			filters.toggleGame(ctx.player, 25);
			return;
		case 107:
			filters.toggleGroup(ctx.player, 25);
			return;
		case 105:
			filters.toggleProfanity(ctx.player, 25);
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
			util.defaultHandler(ctx, "chatbox 1529");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 464, function (ctx) {
		switch (ctx.component) {//Trade/Assist
		case 6:
			filters.toggleGame(ctx.player, 23);
			return;
		case 9:
			filters.togglePublic(ctx.player, 23);
			return;
		case 24:
			filters.toggleTrade(ctx.player, 23);
			return;
		case 27:
			filters.toggleAssist(ctx.player, 23);
			return;
		case 30:
			filters.toggleProfanity(ctx.player, 23);
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
			util.defaultHandler(ctx, "trade/assist chatbox");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1470, function (ctx) {
		switch (ctx.component) {//Guest clan chat
		case 58://Chat box
			return;
		case 188:
			filters.toggleGame(ctx.player, 22);
			return;
		case 203:
			filters.toggleGuestClan(ctx.player, 22);
			return;
		case 212:
			filters.toggleProfanity(ctx.player, 22);
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
			util.defaultHandler(ctx, "guest clan chatbox");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1471, function (ctx) {
		switch (ctx.component) {//Clan chat
		case 60://Chat box
			return;
		case 84://Game
			filters.toggleGame(ctx.player, 21);
			return;
		case 96:
			filters.toggleClan(ctx.player, 21);
			return;
		case 108:
			filters.toggleProfanity(ctx.player, 21);
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
			util.defaultHandler(ctx, "clan chatbox");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1472, function (ctx) {
		switch (ctx.component) {//Friends chat
		case 58://Chat box
			return;
		case 82://Game
			filters.toggleGame(ctx.player, 20);
			return;
		case 91:
			filters.toggleFriendChat(ctx.player, 20);
			return;
		case 106:
			filters.toggleProfanity(ctx.player, 20);
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
			util.defaultHandler(ctx, "friends chat chatbox");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1467, function (ctx) {
		switch (ctx.component) {//Private chat
		case 58://Chat box
			return;
		case 81://Game
			filters.toggleGame(ctx.player, 19);
			return;
		case 87://Private
			filters.togglePrivate(ctx.player, 19);
			return;
		case 99://Trade
			filters.toggleTrade(ctx.player, 19);
			return;
		case 102://Assist
			filters.toggleAssist(ctx.player, 19);
			return;
		case 105://Profanity
			filters.toggleProfanity(ctx.player, 19);
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
			util.defaultHandler(ctx, "private chatbox");
			return;
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 137, function (ctx) {
		switch (ctx.component) {
		case 65://Toggle game filter
			filters.toggleGame(ctx.player, 18);
			return;
		case 68:
			filters.togglePublic(ctx.player, 18);
			return;
		case 71:
			filters.togglePrivate(ctx.player, 18);
			return;	
		case 74:
			filters.toggleFriendChat(ctx.player, 18);
			return;
		case 77:
			filters.toggleClan(ctx.player, 18);
			return;
		case 80:
			filters.toggleGuestClan(ctx.player, 18);
			return;
		case 83:
			filters.toggleTrade(ctx.player, 18);
			return;
		case 86:
			filters.toggleAssist(ctx.player, 18);
			return;
		case 89:
			filters.toggleProfanity(ctx.player, 18);
			return;
		case 90:
			filters.toggleBroadcasts(ctx.player, 18);
			return;
		case 91:
			filters.toggleGroup(ctx.player, 18);
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
				filters.setGame(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setGame(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setGame(ctx.player, 18, 2);
			}
			return;
		case 264://Legacy "Public"
			if (ctx.button == 2) {
				filters.setPublic(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setPublic(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setPublic(ctx.player, 18, 2);
			}
			return;
		case 269://Legacy "Private"
			if (ctx.button == 2) {
				filters.setPrivate(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setPrivate(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setPrivate(ctx.player, 18, 2);
			}
			return;
		case 274://Legacy "Friends"
			if (ctx.button == 2) {
				filters.setFriendChat(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setFriendChat(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setFriendChat(ctx.player, 18, 2);
			}
			return;
		case 279://Legacy "Clan"
			if (ctx.button == 2) {
				filters.setClan(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setClan(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setClan(ctx.player, 18, 2);
			}
			return;
		case 284://Legacy "Guest"
			if (ctx.button == 2) {
				filters.setGuestClan(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setGuestClan(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setGuestClan(ctx.player, 18, 2);
			}
			return;
		case 289://Legacy "Trade"
			if (ctx.button == 2) {
				filters.setTrade(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setTrade(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setTrade(ctx.player, 18, 2);
			}
			return;
		case 293://Legacy "Assist"
			if (ctx.button == 2) {
				filters.setAssist(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setAssist(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setAssist(ctx.player, 18, 2);
			} else if (ctx.button == 5) {
				assistTime(ctx.player);
			}
			return;
		case 295://Legacy "Group"
			if (ctx.button == 2) {
				filters.setGroup(ctx.player, 18, 0);
			} else if (ctx.button == 3) {
				filters.setGroup(ctx.player, 18, 1);
			} else if (ctx.button == 4) {
				filters.setGroup(ctx.player, 18, 2);
			}
			return;
		case 298://Legacy "Report"
			report(ctx.player);
			return;
		default:
			util.defaultHandler(ctx, "chatbox");
			return;
		}
	});
	
	function toggleAlwaysOn (player) {
		var on = ENGINE.getVarBit(player, 22310) == 1;
		ENGINE.setVarBit(player, 22310, on ? 0 : 1);
	}
	
	function toggleVipBadge (player) {
		ENGINE.sendMessage(player, "Unhandled VIP badge toggle.");
	}
	
	function report (player) {
		widget.openCentral(player, 1406, false);
	}
	
	function assistTime (player) {
		ENGINE.sendMessage(player, "Unhandled assist time button.");
	}
	
	function joinLeaveFriendChat (player) {
		if (player.getChat().getFriendChatOwner() !== 0) {
			ENGINE.runClientScript(player, 194, [1]);
			return;
		}
		dialog.openModalBase(player);
		ENGINE.runClientScript(player, 8178, []);
		ENGINE.runClientScript(player, 8537, []);
		ENGINE.runClientScript(player, 194, [1]);
	}
	
	function friendChatSettings (player) {
		widget.openCentral(player, 1108, false);
	}
	
	function joinLeaveClanChat (player) {
		ENGINE.sendMessage(player, "Unhandled join/leave clan chat button.");
	}
	
	function joinLeaveGuestClanChat (player) {
		ENGINE.sendMessage(player, "Unhandled join/leave guest clan chat button.");
	}
	
	function createGroup (player) {
		ENGINE.sendMessage(player, "Unhandled group create button.");
	}
	
	function switchGroupTeam (player) {
		ENGINE.sendMessage(player, "Unhandled switch group team button.");
	}
	
	function openExamineSettings (player) {
		widget.openCentral(player, 1561, false);
	}
};
