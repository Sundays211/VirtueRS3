/**
 * 
 */
var api = require('../../core/api');
var dialog = require('../../core/dialog');

module.exports = {
	addClanBan : addClanBan,
	removeClanBan : removeClanBan,
	leaveClan : leaveClan
}

function addClanBan (player) {
	if (clanApi.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to do that.");
		return;
	}
	if (!clanApi.isClanAdmin(player)) {
		api.sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	dialog.requestString(player, "Enter the name to be banned:", function (name) {
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
}

function removeClanBan (player, slot) {
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
	dialog.requestString(player, "Enter the name to be removed:", function (name) {
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
}

/*
 * You must appoint a deputy owner to take over as owner before you can demote yourself.

You can only adjust your rank to admin or lower.

If you demote yourself, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?
MULTI: Yes, demote me, I no longer want to be owner.
No, I want to continue as clan owner.
Applying changes to clan settings.
 */

function leaveClan (player) {
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You're not in a clan.");		
		return;
	}
	var clanHash = api.getClanHash(player);
	
	if (!clanApi.isClanOwner(player)) {
		dialog.mesbox(player, "If you leave the clan, you will need to be invited before you can join again,<br>and must wait a week before you contribute to clan resources.", function () {
			dialog.multi2(player, "Really leave the clan?", "Yes, leave the clan.", function () {
				clanApi.leaveClan(player);
			}, "No, I will remain in the clan.", function () {
				dialog.chatplayer(player, "<p=2>No, I will remain in the clan.");
			});
		});
	} else if (clanApi.hasReplacementOwner(clanHash)) {
		dialog.mesbox(player, "If you leave, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?", function () {
			dialog.multi2(player, "Leave the clan, losing ownership of it?", "Yes, leave, I no longer want to be owner.", function () {
				clanApi.leaveClan(player);
			}, "No, I want to continue as clan owner.", function () {
				dialog.chatplayer(player, "<p=2>No, I want to continue as clan owner.");
			});
		});
	} else if (clanApi.getMemberCount(clanHash) <= 1) {
		dialog.mesbox(player, "[TODO: Correct dialog] Leaving the clan will cause it to disband. Are you sure?", function () {
			dialog.requestConfirm(player, "Leave the clan?", function () {
				clanApi.leaveClan(player);
			});
		});				
	} else {
		dialog.mesbox(player, "Before you can leave the clan, you must assign a deputy owner. Once you have left, they will become the owner in your place. Remember that you will need to be invited to rejoin the clan.");
	}
}