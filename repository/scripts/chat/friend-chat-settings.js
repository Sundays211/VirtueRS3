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
/* globals EventType, FriendChatData, ENGINE */
var varc = require('engine/var/client');
var config = require('engine/config');
var util = require('shared/util');
var dialog = require('shared/dialog');
var widget = require('shared/widget');
var chat = require('shared/chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1108, function (ctx) {
		var player = ctx.player;
		//player.getVars().setVarp(1258, 299248);
		var nameHash = ENGINE.getFriendChatData(player, FriendChatData.NAME);
		widget.setText(player, 1108, 9, nameHash ? util.fromBase37Hash(nameHash) : "Chat disabled");
		widget.setText(player, 1108, 11, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKJOIN), false));
		widget.setText(player, 1108, 13, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKTALK), false));
		widget.setText(player, 1108, 15, nameFromRank(ENGINE.getFriendChatData(player, FriendChatData.RANKKICK), false));
		varc(player, 199, -1);
		varc(player, 3678, -1);
		util.runClientScript(player, 8178, []);
		widget.setEvents(player, 1108, 2, 0, 199, 254);//Allow all rank options to be sent to the server
	});

	scriptManager.bind(EventType.IF_BUTTON, 1108, function (ctx) {
		var player = ctx.player;
		var rankId;
		switch (ctx.component) {
		case 33://Close interface
			return;
		case 9://Set prefix/disable
			if (ctx.button == 1) {
				dialog.builder(player).requestString("Enter chat prefix:").then(function (value) {
					var prefix = util.toBase37Hash(value);
					if (prefix === 0) {
						return;
					}
					ENGINE.setFriendChatData(player, FriendChatData.NAME, prefix);
					widget.setText(player, 1108, 9, util.fromBase37Hash(prefix));
				});
				return;
			} else if (ctx.button == 2) {
				ENGINE.setFriendChatData(player, FriendChatData.NAME, util.toBase37Hash(""));
				widget.setText(player, 1108, 9, "Chat disabled");
				return;
			}
			util.defaultHandler(ctx, "friends chat settings");
			return;
		case 11://Set join rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -8) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKJOIN, rankId);
				widget.setText(player, 1108, 11, nameFromRank(rankId, false));
			}
			return;
		case 13://Set talk rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -1) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKTALK, rankId);
				widget.setText(player, 1108, 13, nameFromRank(rankId, false));
			}
			return;
		case 15://Set kick rank
			rankId = rankFromButton(ctx.button, -8);
			if (rankId != -1) {
				ENGINE.setFriendChatData(player, FriendChatData.RANKKICK, rankId);
				widget.setText(player, 1108, 15, nameFromRank(rankId, false));
			}
			return;
		case 17://Set lootshare rank
		case 20://Toggle coinshare
			chat.sendDebugMessage(player, "Loot Share is not implemented");
			return;
		default:
			util.defaultHandler(ctx, "friends chat settings");
			return;
		}
	});

	function rankFromButton (button, defaultValue) {
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

	function nameFromRank (rankId) {
		return config.enumValue(616, rankId+1);
	}
};
