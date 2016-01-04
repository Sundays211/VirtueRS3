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
var ChannelRank = Java.type('org.virtue.game.content.social.ChannelRank');
var UsernameUtility = Java.type('org.virtue.utility.text.UsernameUtility');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */

var FriendChatSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			//player.getVars().setVarp(1258, 299248);
			var nameHash = api.getFriendChatData(player, FriendChatData.NAME);
			api.setWidgetText(player, 1108, 1, nameHash == 0 ? "Chat disabled" : api.fromBase37Hash(nameHash));
			api.setWidgetText(player, 1108, 2, FriendChatSettings.nameFromRank(api.getFriendChatData(player, FriendChatData.RANKJOIN), false));
			api.setWidgetText(player, 1108, 3, FriendChatSettings.nameFromRank(api.getFriendChatData(player, FriendChatData.RANKTALK), false));
			api.setWidgetText(player, 1108, 4, FriendChatSettings.nameFromRank(api.getFriendChatData(player, FriendChatData.RANKKICK), false));
			api.setVarc(player, 199, -1);
			api.setVarc(player, 3678, -1);
			api.runClientScript(player, 8178, []);
			api.setWidgetEvents(player, 1108, 22, 0, 199, 254);//Allow all rank options to be sent to the server
			api.hideWidget(player, 1108, 16, true);
			api.hideWidget(player, 1108, 15, true);
			api.hideWidget(player, 1108, 14, true);
			api.hideWidget(player, 1108, 13, true);
		} else {
			var rank;
			switch (args.component) {
			case 38://Close interface
				return;
			case 1://Set prefix/disable
				if (args.button == 1) {
					requestString(player, "Enter chat prefix:", function (value) {
						var prefix = api.getBase37Hash(value);
						if (prefix == 0) {
							return;
						}
						api.setFriendChatData(player, FriendChatData.NAME, prefix);
						api.setWidgetText(player, 1108, 1, api.fromBase37Hash(prefix));
					});
					return;
				} else if (args.button == 2) {
					api.setFriendChatData(player, FriendChatData.NAME, api.getBase37Hash(""));
					api.setWidgetText(player, 1108, 1, "Chat disabled");
					return;
				}
				api.sendMessage(player, "Unhandled friends chat settings component: "+args.component);
				return;
			case 2://Set join rank
				var rankId = FriendChatSettings.rankFromButton(args.button, -8);
				if (rankId != -8) {
					api.setFriendChatData(player, FriendChatData.RANKJOIN, rankId);
					api.setWidgetText(player, 1108, 2, FriendChatSettings.nameFromRank(rankId, false));
				}
				return;
			case 3://Set talk rank
				var rankId = FriendChatSettings.rankFromButton(args.button, -8);
				if (rankId != -1) {
					api.setFriendChatData(player, FriendChatData.RANKTALK, rankId);
					api.setWidgetText(player, 1108, 3, FriendChatSettings.nameFromRank(rankId, false));
				}
				return;
			case 4://Set kick rank
				var rankId = FriendChatSettings.rankFromButton(args.button, -8);
				if (rankId != -1) {
					api.setFriendChatData(player, FriendChatData.RANKKICK, rankId);
					api.setWidgetText(player, 1108, 4, FriendChatSettings.nameFromRank(rankId, false));
				}
				return;
			case 5://Set lootshare rank
			case 12://Toggle coinshare
			default:
				api.sendMessage(player, "Unhandled friends chat settings component: "+args.component);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new FriendChatSettingsListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1108, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1108, listener);
};

var FriendChatSettings = {
		rankFromButton : function (button, defaultValue) {
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
		},
		nameFromRank : function (rankId, lootshare) {
			return api.getEnumValue(616, rankId+1);
		}
}