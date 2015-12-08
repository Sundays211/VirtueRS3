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

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		return [1110, 234];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.setWidgetEvents(player, 1110, 34, 0, 200, 2);
		api.setWidgetEvents(player, 1110, 72, 0, 600, 2);//Clan members list
		api.setWidgetEvents(player, 1110, 70, 0, 600, 1040);
		api.setWidgetEvents(player, 1110, 42, 0, 600, 1040);
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 234) {
			switch (component) {
			case 4://Leave clan
				if (api.getClanHash(player) == null) {
					api.sendMessage(player, "You're not in a clan.");					
				} else {
					api.openDialog(player, "LeaveClan");
				}
				return true;
			case 16://Clan settings
				if (api.getClanHash(player) == null) {
					api.sendMessage(player, "You're not in a clan.");
				} else {
					api.openCentralWidget(player, 1096, false);
				}
				return true;
			case 34://Leave clan channel
			case 28://Clan details
			case 22://Clan noticeboard
			default:
				return false;
			}			
		}
		switch (component) {
		case 109://Expand clan actions
			api.openWidget(player, 1477, 476, 234, true);
			api.runClientScript(player, 8787, [-6, -24, 2, -1, 72745069, 40, 160]);
			return true;
		case 168://Clan chat
		case 170://Visited clan chat
		case 166://Clan ban list
			return true;//Prevents swapping chat tabs from triggering a debug message
		case 159://Leave clan
			if (api.getClanHash(player) == null) {
				api.sendMessage(player, "You're not in a clan.");				
			} else {
				api.openDialog(player, "LeaveClan");
			}
			return true;
		case 142://Clan settings
			if (api.getClanHash(player) == null) {
				api.sendMessage(player, "You're not in a clan.");				
			} else {
				api.openCentralWidget(player, 1096, false);
			}
			return true;
		case 20://Add ban
			addClanBan(player);
			return true;
		case 28://Remove ban
			removeClanBan(player, -1);
			return true;
		case 34://Clan ban list interaction
			removeClanBan(player, slot);
			return true;
		case 118://Leave clan channel
		case 126://Clan details
		case 134://Clan noticeboard
			//You do not have sufficient rank in your clan to do this.
		case 59://Join clan as guest
		case 72://Show clanmate options
		case 101://Close clanmate options
		case 83://Temp ban clan member
		case 97://Show clanmate resources
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
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function addClanBan (player) {
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to do that.");
		return;
	}
	if (!api.isClanAdmin(player)) {
		api.sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			api.sendMessage(player, "Attempting to ban "+value+".");
			var userHash = api.getUserHash(value);
			if (userHash == null) {
				api.sendMessage(player, "An error was found while attempting to ban "+value+". No player of that name could be found.");
				return;
			}
			if (api.isBannedFromClan(api.getClanHash(player), userHash)) {
				api.sendMessage(player, "That player is already banned from your clan.");
				return;
			}
			var success = api.getClanSettings().addBan(api.getClanHash(player), player.getChat(), userHash);
			if (success) {
				api.sendClanBroadcast(api.getClanHash(player), 15, ["[Player A]", "[Player B]"], [api.getName(player), api.getName(userHash)]);
			}
		}
	});	
	player.getDialogs().requestString("Enter the name to be banned:", new Handler());
}

function removeClanBan (player, slot) {
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to do that.");
		return;
	}
	if (!api.isClanAdmin(player)) {
		api.sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	if (slot != -1) {
		api.runClientScript(player, 4581, [slot]);
	}
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			api.sendMessage(player, "Attempting to unban "+value+".");
			var userHash = api.getUserHash(value);
			if (userHash == null) {
				api.sendMessage(player, "An error was found while attempting to unban "+value+". No player of that name could be found.");
				return;
			}
			if (!api.isBannedFromClan(api.getClanHash(player), userHash)) {
				api.sendMessage(player, "That player is not banned from your clan.");
				return;
			}
			var success = api.getClanSettings().removeBan(api.getClanHash(player), player.getChat(), userHash);
			if (success) {
				api.sendClanBroadcast(api.getClanHash(player), 7, ["[Player A]", "[Player B]"], [api.getName(player), api.getName(userHash)]);
			}
		}
	});	
	player.getDialogs().requestString("Enter the name to be removed:", new Handler());
}