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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/01/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {

	/* The interface ids to bind to */
	getIDs: function() {
		return [ 137, 1467, 1472, 1471, 1470, 464, 1529 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* A button clicked on an interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 1529) {
			switch (component) {
			case 58://Chat box
				return true;
			case 81:
				Filters.toggleGame(player, 25);
				return true;
			case 107:
				Filters.toggleGroup(player, 25);
				return true;
			case 105:
				Filters.toggleProfanity(player, 25);
				return true;
			case 222://Toggle online status - This is handled via a different packet
				return true;
			case 225:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 236:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 240:
				GlobalActions.createGroup(player);
				return true;
			case 242:
				GlobalActions.switchGroupTeam(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 464) {//Trade/Assist
			switch (component) {
			case 6:
				Filters.toggleGame(player, 23);
				return true;
			case 9:
				Filters.togglePublic(player, 23);
				return true;
			case 24:
				Filters.toggleTrade(player, 23)
				return true;
			case 27:
				Filters.toggleAssist(player, 23);
				return true;
			case 30:
				Filters.toggleProfanity(player, 23);
				return true;
			case 218://Chat box
				return true;
			case 223://Toggle online status - This is handled via a different packet
				return true;
			case 226:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 237:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 239:
				GlobalActions.assistTime(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 1470) {//Guest clan chat
			switch (component) {
			case 58://Chat box
				return true;
			case 188:
				Filters.toggleGame(player, 22);
				return true;
			case 203:
				Filters.toggleGuestClan(player, 22);
				return true;
			case 212:
				Filters.toggleProfanity(player, 22);
				return true;
			case 223://Toggle online status - This is handled via a different packet
				return true;
			case 226:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 237:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 234:
				GlobalActions.joinLeaveGuestClanChat(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 1471) {//Clan chat
			switch (component) {
			case 60://Chat box
				return true;
			case 84://Game
				Filters.toggleGame(player, 21);
				return true;
			case 96:
				Filters.toggleClan(player, 21);
				return true;
			case 108:
				Filters.toggleProfanity(player, 21);
				return true;
			case 224://Toggle online status - This is handled via a different packet
				return true;
			case 227:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 237:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 232:
				GlobalActions.joinLeaveClanChat(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 1472) {
			switch (component) {
			case 58://Chat box
				return true;
			case 82://Game
				Filters.toggleGame(player, 20);
				return true;
			case 91:
				Filters.toggleFriendChat(player, 20);
				return true;
			case 106:
				Filters.toggleProfanity(player, 20);
				return true;
			case 223://Toggle online status - This is handled via a different packet
				return true;
			case 226:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 237:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 227:
				GlobalActions.joinLeaveFriendChat(player);
				return true;
			case 230:
				GlobalActions.friendChatSettings(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 1467) {//Private chat
			switch (component) {
			case 58://Chat box
				return true;
			case 81://Game
				Filters.toggleGame(player, 19);
				return true;
			case 87://Private
				Filters.togglePrivate(player, 19);
				return true;
			case 99://Trade
				Filters.toggleTrade(player, 19);
				return true;
			case 102://Assist
				Filters.toggleAssist(player, 19);
				return true;
			case 105://Profanity
				Filters.toggleProfanity(player, 19);
				return true;
			case 221://Toggle online status - This is handled via a different packet
				return true;
			case 224:
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 235:
				GlobalActions.toggleVipBadge(player);
				return true;
			default:
				return false;
			}			
		} else if (interfaceID == 137) {//All chat
			switch (component) {
			case 64://Toggle game filter
				Filters.toggleGame(player, 18);
				return true;
			case 67:
				Filters.togglePublic(player, 18);
				return true;
			case 70:
				Filters.togglePrivate(player, 18);
				return true;	
			case 73:
				Filters.toggleFriendChat(player, 18);
				return true;
			case 76:
				Filters.toggleClan(player, 18);
				return true;
			case 79:
				Filters.toggleGuestClan(player, 18);
				return true;
			case 82:
				Filters.toggleTrade(player, 18);
				return true;
			case 85:
				Filters.toggleAssist(player, 18);
				return true;
			case 88:
				Filters.toggleProfanity(player, 18);
				return true;
			case 89:
				Filters.toggleBroadcasts(player, 18);
				return true;
			case 90:
				Filters.toggleGroup(player, 18);
				return true;
			case 99://Toggle online status - This is handled via a different packet
				return true;
			case 102://Toggle always-on chat mode
				GlobalActions.toggleAlwaysOn(player);
				return true;
			case 113:
				GlobalActions.toggleVipBadge(player);
				return true;
			case 116:
				GlobalActions.report(player);
				return true;
			case 126://Clicked quick chat bubble
				return true;
			case 129://Clicked chat box
				return true;
			case 253://Legacy switch to "All"
				return true;
			case 258://Legacy "Game"
				if (option == 2) {
					LegacyFilters.setGame(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setGame(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setGame(player, 18, 2);
				}
				return true;
			case 263://Legacy "Public"
				if (option == 2) {
					LegacyFilters.setPublic(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setPublic(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setPublic(player, 18, 2);
				}
				return true;
			case 268://Legacy "Private"
				if (option == 2) {
					LegacyFilters.setPrivate(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setPrivate(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setPrivate(player, 18, 2);
				}
				return true;
			case 273://Legacy "Friends"
				if (option == 2) {
					LegacyFilters.setFriendChat(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setFriendChat(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setFriendChat(player, 18, 2);
				}
				return true;
			case 278://Legacy "Clan"
				if (option == 2) {
					LegacyFilters.setClan(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setClan(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setClan(player, 18, 2);
				}
				return true;
			case 283://Legacy "Guest"
				if (option == 2) {
					LegacyFilters.setGuestClan(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setGuestClan(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setGuestClan(player, 18, 2);
				}
				return true;
			case 288://Legacy "Trade"
				if (option == 2) {
					LegacyFilters.setTrade(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setTrade(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setTrade(player, 18, 2);
				}
				return true;
			case 293://Legacy "Assist"
				if (option == 2) {
					LegacyFilters.setAssist(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setAssist(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setAssist(player, 18, 2);
				} else if (option == 5) {
					GlobalActions.assistTime(player);
				}
				return true;
			case 294://Legacy "Group"
				if (option == 2) {
					LegacyFilters.setGroup(player, 18, 0);
				} else if (option == 3) {
					LegacyFilters.setGroup(player, 18, 1);
				} else if (option == 4) {
					LegacyFilters.setGroup(player, 18, 2);
				}
				return true;
			case 297://Legacy "Report"
				GlobalActions.report(player);
				return true;
			default:
				api.sendMessage(player, "Unhandled chat box action: iface="+interfaceID+", comp="+component+", slot="+slot+", option="+option);
				return true;
			}
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
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

var Filters = {
		toggleGame : function (player, chatWindow) {
			var on, filtered;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18797) == 1;
				filtered = api.getVarBit(player, 18805) == 1;
				break;
			case 19:
				on = api.getVarBit(player, 18812) == 1;
				filtered = api.getVarBit(player, 18820) == 1;
				break;
			case 20:
				on = api.getVarBit(player, 18827) == 1;
				filtered = api.getVarBit(player, 18835) == 1;
				break;
			case 21:
				on = api.getVarBit(player, 18842) == 1;
				filtered = api.getVarBit(player, 18850) == 1;
				break;
			case 22:
				on = api.getVarBit(player, 18857) == 1;
				filtered = api.getVarBit(player, 18865) == 1;
				break;
			case 23:
				on = api.getVarBit(player, 20813) == 1;
				filtered = api.getVarBit(player, 20821) == 1;
				break;
			case 25:
				on = api.getVarBit(player, 24563) == 1;
				filtered = api.getVarBit(player, 24571) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled game filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (filtered) {
				filtered = false;
				on = false;
			} else {
				filtered = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18797, on ? 1 : 0);
				api.setVarBit(player, 18805, filtered ? 1 : 0);
				break;
			case 19:
				api.setVarBit(player, 18812, on ? 1 : 0);
				api.setVarBit(player, 18820, filtered ? 1 : 0);
				break;
			case 20:
				api.setVarBit(player, 18827, on ? 1 : 0);
				api.setVarBit(player, 18835, filtered ? 1 : 0);
				break;
			case 21:
				api.setVarBit(player, 18842, on ? 1 : 0);
				api.setVarBit(player, 18850, filtered ? 1 : 0);
				break;
			case 22:
				api.setVarBit(player, 18857, on ? 1 : 0);
				api.setVarBit(player, 18865, filtered ? 1 : 0);
				break;
			case 23:
				api.setVarBit(player, 20813, on ? 1 : 0);
				api.setVarBit(player, 20821, filtered ? 1 : 0);
				break;
			case 25:
				api.setVarBit(player, 24563, on ? 1 : 0);
				api.setVarBit(player, 24571, filtered ? 1 : 0);
				break;
			}
		},
		togglePublic : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18800) == 1;
				friends = api.getVarBit(player, 18808) == 1;
				break;
			case 23:
				on = api.getVarBit(player, 20816) == 1;
				friends = api.getVarBit(player, 20824) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled public filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18800, on ? 1 : 0);
				api.setVarBit(player, 18808, friends ? 1 : 0);
				break;
			case 23:
				api.setVarBit(player, 20816, on ? 1 : 0);
				api.setVarBit(player, 20824, friends ? 1 : 0);
				break;
			}
		},
		togglePrivate : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18801) == 1;
				friends = api.getVarBit(player, 18809) == 1;
				break;
			case 19:
				on = api.getVarBit(player, 18816) == 1;
				friends = api.getVarBit(player, 18824) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled private filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18801, on ? 1 : 0);
				api.setVarBit(player, 18809, friends ? 1 : 0);
				break;
			case 19:
				api.setVarBit(player, 18816, on ? 1 : 0);
				api.setVarBit(player, 18824, friends ? 1 : 0);
				break;
			}
		},
		toggleFriendChat : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18802) == 1;
				friends = api.getVarBit(player, 18810) == 1;
				break;
			case 20:
				on = api.getVarBit(player, 18832) == 1;
				friends = api.getVarBit(player, 18840) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled friend chat filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18802, on ? 1 : 0);
				api.setVarBit(player, 18810, friends ? 1 : 0);
				break;
			case 20:
				api.setVarBit(player, 18840, friends ? 1 : 0);
				break;
			}
		},
		toggleClan : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18803) == 1;
				friends = api.getVarBit(player, 18811) == 1;
				break;
			case 21:
				on = api.getVarBit(player, 18848) == 1;
				friends = api.getVarBit(player, 18856) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled clan filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18803, on ? 1 : 0);
				api.setVarBit(player, 18811, friends ? 1 : 0);
				break;
			case 21:
				api.setVarBit(player, 18856, friends ? 1 : 0);
				break;
			}
		},
		toggleGuestClan : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18804) == 1;
				friends = api.getVarBit(player, 18811) == 1;
				break;
			case 22:
				on = api.getVarBit(player, 18864) == 1;
				friends = api.getVarBit(player, 18871) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled guest clan filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18804, on ? 1 : 0);
				api.setVarBit(player, 18811, friends ? 1 : 0);
				break;
			case 22:
				api.setVarBit(player, 18871, friends ? 1 : 0);
				break;
			}
		},
		toggleTrade : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18798) == 1;
				friends = api.getVarBit(player, 18806) == 1;
				break;
			case 19:
				on = api.getVarBit(player, 18813) == 1;
				friends = api.getVarBit(player, 18821) == 1;
				break;
			case 23:
				on = api.getVarBit(player, 20814) == 1;
				friends = api.getVarBit(player, 20822) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled trade filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18798, on ? 1 : 0);
				api.setVarBit(player, 18806, friends ? 1 : 0);
				break;
			case 19:
				api.setVarBit(player, 18813, on ? 1 : 0);
				api.setVarBit(player, 18821, friends ? 1 : 0);
				break;
			case 23:
				api.setVarBit(player, 20814, on ? 1 : 0);
				api.setVarBit(player, 20822, friends ? 1 : 0);
				break;
			}
		},
		toggleAssist : function (player, chatWindow) {
			var on, friends;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 18799) == 1;
				friends = api.getVarBit(player, 18807) == 1;
				break;
			case 19:
				on = api.getVarBit(player, 18814) == 1;
				friends = api.getVarBit(player, 18822) == 1;
				break;
			case 23:
				on = api.getVarBit(player, 20815) == 1;
				friends = api.getVarBit(player, 20823) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled assist filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (friends) {
				friends = false;
				on = false;
			} else {
				friends = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 18799, on ? 1 : 0);
				api.setVarBit(player, 18807, friends ? 1 : 0);
				break;
			case 19:
				api.setVarBit(player, 18814, on ? 1 : 0);
				api.setVarBit(player, 18822, friends ? 1 : 0);
				break;
			case 23:
				api.setVarBit(player, 20815, on ? 1 : 0);
				api.setVarBit(player, 20823, friends ? 1 : 0);
				break;
			}
		},
		toggleGroup : function (player, chatWindow) {
			var on, team;
			switch (chatWindow) {
			case 18:
				on = api.getVarBit(player, 24578) == 1;
				team = api.getVarBit(player, 24586) == 1;
				break;
			case 25:
				on = api.getVarBit(player, 24585) == 1;
				team = api.getVarBit(player, 24592) == 1;
				break;
			default:
				api.sendMessage(player, "Unhandled group filter toggle for chatbox "+chatWindow);
				return;
			}
			if (!on) {
				on = true;
			} else if (team) {
				team = false;
				on = false;
			} else {
				team = true;
			}
			switch (chatWindow) {
			case 18:
				api.setVarBit(player, 24578, on ? 1 : 0);
				api.setVarBit(player, 24586, team ? 1 : 0);
				break;
			case 18:
				api.setVarBit(player, 24592, team ? 1 : 0);
				break;
			}
		},
		toggleProfanity : function (player, chatWindow) {
			api.sendMessage(player, "Unhandled profanity toggle.");
		},
		toggleBroadcasts : function (player, chatWindow) {
			var on = api.getVarBit(player, 20828) == 1;
			api.setVarBit(player, 20828, on ? 0 : 1);
		}
}

var GlobalActions = {
		toggleAlwaysOn : function (player) {
			var on = api.getVarBit(player, 22310) == 1;
			api.setVarBit(player, 22310, on ? 0 : 1);
		},
		toggleVipBadge : function (player) {
			api.sendMessage(player, "Unhandled VIP badge toggle.");
		},
		report : function (player) {
			api.openCentralWidget(player, 1406, false);
		},
		assistTime : function (player) {
			api.sendMessage(player, "Unhandled assist time button.");
		},
		joinLeaveFriendChat : function (player) {
			if (player.getChat().getFriendChatOwner() != 0) {
				api.runClientScript(player, 194, [1]);
				return;
			}
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 8537, []);
			api.runClientScript(player, 194, [1]);
		},
		friendChatSettings : function (player) {
			api.openCentralWidget(player, 1108, false);
		},
		joinLeaveClanChat : function (player) {
			api.sendMessage(player, "Unhandled join/leave clan chat button.");
		},
		joinLeaveGuestClanChat : function (player) {
			api.sendMessage(player, "Unhandled join/leave guest clan chat button.");
		},
		createGroup : function (player) {
			api.sendMessage(player, "Unhandled group create button.");
		},
		switchGroupTeam : function (player) {
			api.sendMessage(player, "Unhandled switch group team button.");
		}
}

var LegacyFilters = {
	setGame : function (player, chatWindow, mode) {
		var on = false;
		var filtered = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Filtered
			filtered = true;
			on = true;
		}
		api.setVarBit(player, 18797, on ? 1 : 0);
		api.setVarBit(player, 18805, filtered ? 1 : 0);
	},
	setPublic : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18800, on ? 1 : 0);
		api.setVarBit(player, 18808, friends ? 1 : 0);
	},	
	setPrivate : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18801, on ? 1 : 0);
		api.setVarBit(player, 18809, friends ? 1 : 0);
	},
	setFriendChat : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18802, on ? 1 : 0);
		api.setVarBit(player, 18810, friends ? 1 : 0);
	},
	setClan : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18803, on ? 1 : 0);
		api.setVarBit(player, 18811, friends ? 1 : 0);
	},
	setGuestClan : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18804, on ? 1 : 0);
		api.setVarBit(player, 18811, friends ? 1 : 0);
	},
	setTrade : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18798, on ? 1 : 0);
		api.setVarBit(player, 18806, friends ? 1 : 0);
	},
	setAssist : function (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18799, on ? 1 : 0);
		api.setVarBit(player, 18807, friends ? 1 : 0);
	},
	setGroup : function (player, chatWindow, mode) {
		var on = false;
		var team = false;
		if (mode == 0) {//On
			on = true;
		} else if (mode == 1) {//Team
			team = true;
			on = true;
		}
		api.setVarBit(player, 24578, on ? 1 : 0);
		api.setVarBit(player, 24586, team ? 1 : 0);
	}
}