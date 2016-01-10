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
var ClanChatListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		if (event == EventType.IF_OPEN && args["interface"] == 1110) {
			api.setWidgetEvents(player, 1110, 34, 0, 200, 2);
			api.setWidgetEvents(player, 1110, 72, 0, 600, 2);//Clan members list
			api.setWidgetEvents(player, 1110, 70, 0, 600, 1040);
			api.setWidgetEvents(player, 1110, 42, 0, 600, 1040);
		} else if (args["interface"] == 234) {
			switch (args.component) {
			case 4://Leave clan
				ClanChatActions.leaveClan(player);
				return;
			case 16://Clan settings
				if (api.getClanHash(player) == null) {
					api.sendMessage(player, "You're not in a clan.");
				} else {
					api.openCentralWidget(player, 1096, false);
				}
				return;
			case 34://Leave clan channel
			case 28://Clan details
			case 22://Clan noticeboard
			default:
				api.sendMessage(player, "Unhandled clan action button: comp="+args.component+", button="+args.button);
				return;
			}			
		} else if (args["interface"] == 1110) {
			switch (args.component) {
			case 109://Expand clan actions
				api.openWidget(player, 1477, 542, 234, true);
				api.runClientScript(player, 8787, [-6, -24, 2, -1, 72745069, 40, 160]);
				return;
			case 168://Clan chat
			case 170://Visited clan chat
			case 166://Clan ban list
				return;//Prevents swapping chat tabs from triggering a debug message
			case 159://Leave clan
				ClanChatActions.leaveClan(player);
				return;
			case 142://Clan settings
				if (api.getClanHash(player) == null) {
					api.sendMessage(player, "You're not in a clan.");				
				} else {
					api.openCentralWidget(player, 1096, false);
				}
				return;
			case 20://Add ban
				ClanChatActions.addClanBan(player);
				return;
			case 28://Remove ban
				ClanChatActions.removeClanBan(player, -1);
				return;
			case 34://Clan ban list interaction
				ClanChatActions.removeClanBan(player, args.slot);
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
			default:
				api.sendMessage(player, "Unhandled clan chat button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new ClanChatListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1110, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1110, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 234, listener);
};

var ClanChatActions = {
		addClanBan : function (player) {
			if (clanApi.getClanHash(player) == null) {
				api.sendMessage(player, "You must be in a clan to do that.");
				return;
			}
			if (!clanApi.isClanAdmin(player)) {
				api.sendMessage(player, "You must be a clan admin to do that.");
				return;
			}
			requestString(player, "Enter the name to be banned:", function (name) {
				api.sendMessage(player, "Attempting to ban "+name+".");
				var userHash = api.getUserHash(name);
				if (userHash == null) {
					api.sendMessage(player, "An error was found while attempting to ban "+name+". No player of that name could be found.");
					return;
				}
				if (clanApi.isBanned(clanApi.getClanHash(player), userHash)) {
					api.sendMessage(player, "That player is already banned from your clan.");
					return;
				}
				if (!clanApi.isClanAdmin(player)) {//Double check, in case they're no longer an admin
					api.sendMessage(player, "You must be a clan admin to do that.");
					return;
				}
				clanApi.addBan(player, userHash);
				clanApi.sendBroadcast(api.getClanHash(player), 15, ["[Player A]", "[Player B]"], [api.getName(player), api.getName(userHash)]);
			});
		},
		removeClanBan : function (player, slot) {
			if (clanApi.getClanHash(player) == null) {
				api.sendMessage(player, "You must be in a clan to do that.");
				return;
			}
			if (!clanApi.isClanAdmin(player)) {
				api.sendMessage(player, "You must be a clan admin to do that.");
				return;
			}
			if (slot != -1) {
				api.runClientScript(player, 4581, [slot]);
			}
			requestString(player, "Enter the name to be removed:", function (name) {
				api.sendMessage(player, "Attempting to unban "+name+".");
				var userHash = api.getUserHash(name);
				if (userHash == null) {
					api.sendMessage(player, "An error was found while attempting to unban "+name+". No player of that name could be found.");
					return;
				}
				if (!clanApi.isBanned(clanApi.getClanHash(player), userHash)) {
					api.sendMessage(player, "That player is not banned from your clan.");
					return;
				}
				clanApi.removeBan(player, userHash);
				clanApi.sendBroadcast(clanApi.getClanHash(player), 7, ["[Player A]", "[Player B]"], [api.getName(player), api.getName(userHash)]);
			});
		},
		leaveClan : function (player) {
			if (api.getClanHash(player) == null) {
				api.sendMessage(player, "You're not in a clan.");		
				return;
			}
			var clanHash = api.getClanHash(player);
			
			if (!clanApi.isClanOwner(player)) {
				mesbox(player, "If you leave the clan, you will need to be invited before you can join again,<br>and must wait a week before you contribute to clan resources.", function () {
					multi2(player, "Really leave the clan?", "Yes, leave the clan.", function () {
						clanApi.leaveClan(player);
					}, "No, I will remain in the clan.", function () {
						chatplayer(player, "<p=2>No, I will remain in the clan.");
					});
				});
			} else if (clanApi.hasReplacementOwner(clanHash)) {
				mesbox(player, "If you leave, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?", function () {
					multi2(player, "Leave the clan, losing ownership of it?", "Yes, leave, I no longer want to be owner.", function () {
						clanApi.leaveClan(player);
					}, "No, I want to continue as clan owner.", function () {
						chatplayer(player, "<p=2>No, I want to continue as clan owner.");
					});
				});
			} else if (clanApi.getMemberCount(clanHash) <= 1) {
				mesbox(player, "[TODO: Correct dialog] Leaving the clan will cause it to disband. Are you sure?", function () {
					requestConfirm(player, "Leave the clan?", function () {
						clanApi.leaveClan(player);
					});
				});				
			} else {
				mesbox(player, "Before you can leave the clan, you must assign a deputy owner. Once you have left, they will become the owner in your place. Remember that you will need to be invited to rejoin the clan.");
			}
		}
}

/*
 * You must appoint a deputy owner to take over as owner before you can demote yourself.

You can only adjust your rank to admin or lower.

If you demote yourself, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?
MULTI: Yes, demote me, I no longer want to be owner.
No, I want to continue as clan owner.
Applying changes to clan settings.
 */

