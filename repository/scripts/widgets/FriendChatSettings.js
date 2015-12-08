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

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		return [1108];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		//player.getVars().setVarp(1258, 299248);
		var channelName = player.getChat().getFriendChatData().getChannelName();
		player.getDispatcher().sendWidgetText(1108, 1, channelName.isEmpty() ? "Chat disabled" : channelName);
		player.getDispatcher().sendWidgetText(1108, 2, rankToString(player.getChat().getFriendChatData().getJoinRank(), false));
		player.getDispatcher().sendWidgetText(1108, 3, rankToString(player.getChat().getFriendChatData().getTalkRank(), false));
		player.getDispatcher().sendWidgetText(1108, 4, rankToString(player.getChat().getFriendChatData().getKickRank(), false));
		player.getDispatcher().sendVarc(199, -1);
		player.getDispatcher().sendVarc(3678, -1);
		player.getDispatcher().sendCS2Script(8178);
		player.getDispatcher().sendWidgetSettings(1108, 22, 0, 199, 254);//Allow all rank options to be sent to the server
		player.getDispatcher().sendHideWidget(1108, 16, true);
		player.getDispatcher().sendHideWidget(1108, 15, true);
		player.getDispatcher().sendHideWidget(1108, 14, true);
		player.getDispatcher().sendHideWidget(1108, 13, true);
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		var rank;
		switch (component) {
		case 38://Close interface
			return true;//
		case 1://Set prefix/disable
			if (option == 1) {
				
				var InputListener = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
					handle : function (value) {
						var prefix = UsernameUtility.formatForDisplay(value).trim();
						if (prefix.isEmpty()) {
							return;
						}
						player.getChat().getFriendsList().setFriendChatName(prefix);
						player.getDispatcher().sendWidgetText(1108, 1, prefix);
					}
				});
				
				player.getDialogs().requestString("Enter chat prefix:", new InputListener());
				return true;
			} else if (option == 2) {
				player.getChat().getFriendsList().setFriendChatName("");
				player.getDispatcher().sendWidgetText(1108, 1, "Chat disabled");
				return true;
			}
			return false;
		case 2://Set join rank
			rank = rankFromButton(option);
			if (rank != null && !ChannelRank.JMOD.equals(rank)) {
				player.getChat().getFriendsList().setFriendChatJoinRank(rank);
				player.getDispatcher().sendWidgetText(1108, 2, rankToString(rank, false));
			}
			return true;
		case 3://Set talk rank
			rank = rankFromButton(option);
			if (rank != null && !ChannelRank.JMOD.equals(rank)) {
				player.getChat().getFriendsList().setFriendChatTalkRank(rank);
				player.getDispatcher().sendWidgetText(1108, 3, rankToString(rank, false));
			}
			return true;
		case 4://Set kick rank
			rank = rankFromButton(option);
			if (rank != null && !ChannelRank.JMOD.equals(rank)) {
				player.getChat().getFriendsList().setFriendChatKickRank(rank);
				player.getDispatcher().sendWidgetText(1108, 4, rankToString(rank, false));
			}
			return true;
		case 5://Set lootshare rank
		case 12://Toggle coinshare
		default:
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptLoader) {
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function rankToString (rank, lootshare) {
	switch (rank) {
	case ChannelRank.GUEST:
		return "Anyone";
	case ChannelRank.FRIEND:
		return "Any friends";
	case ChannelRank.RECRUIT:
	case ChannelRank.CORPORAL:
	case ChannelRank.SERGEANT:
	case ChannelRank.LIEUTENANT:
	case ChannelRank.CAPTAIN:
	case ChannelRank.GENERAL:
		return rank.getName()+"+";
	case ChannelRank.OWNER:
		return lootshare ? "No one" : "Only me";
	case ChannelRank.JMOD:
	}
	return null;
}

function rankFromButton (button) {
	switch (button) {
	case 1:
		return ChannelRank.GUEST;
	case 2:
		return ChannelRank.FRIEND;
	case 3:
		return ChannelRank.RECRUIT;
	case 4:
		return ChannelRank.CORPORAL;
	case 5:
		return ChannelRank.SERGEANT;
	case 6:
		return ChannelRank.LIEUTENANT;
	case 7:
		return ChannelRank.CAPTAIN;
	case 8:
		return ChannelRank.GENERAL;
	case 9:
		return ChannelRank.OWNER;
	default:
		return null;	
	}
}