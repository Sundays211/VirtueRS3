/**
 * Manages the core functionality for clans
 */
/* globals CLAN_ENGINE */
var util = require('util');
var dialog = require('dialog');
var config = require('engine/config');
var chat = require('chat');

var broadcasts = require('./broadcasts');

module.exports = init();

function init () {
	var logic = {
		getHash : getClanHash,
		inClan : inClan,
		isAdmin : isClanAdmin,
		getRank : getClanRank,
		setRank : setClanRank,
		setJob : setClanJob,
		kickClanMember : kickClanMember,
		addBan : addClanBan,
		removeBan : removeClanBan,
		leave : leaveClan
	};
	
	return logic;
	
	function getClanHash (player) {
		return CLAN_ENGINE.getClanHash(player);
	}
	
	function inClan(player, clan) {
		if (clan) {
			return getClanHash(player) == clan;
		} else {
			return !!getClanHash(player);
		}
	}
	
	function isClanAdmin (player, clan) {
		if (clan) {
			throw "Not yet supported!";
		} else {
			return CLAN_ENGINE.isClanAdmin(player);
		}
	}
	
	function getClanRank (player, clan) {
		clan = clan || getClanHash(player);
		return CLAN_ENGINE.getRank(clan, util.getUserHash(player));
	}
	
	function setClanRank (player, memberHash, newRank) {
		var oldRank = CLAN_ENGINE.getRank(getClanHash(player), memberHash);		
		if (CLAN_ENGINE.setRank(player, memberHash, newRank)) {//Change rank
			var replace = [util.getName(player), util.getName(memberHash), config.getEnumValue(3714, oldRank), config.getEnumValue(3714, newRank)];
			if (newRank > oldRank) {//Promoted			
				broadcasts.send(getClanHash(player), 10, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
			} else {//Demoted
				broadcasts.send(getClanHash(player), 9, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
			}
		}
	}
	
	function setClanJob (player, memberHash, newJob) {
		var oldJob = CLAN_ENGINE.getMemberVarBit(player, memberHash, 0, 9);
		if (CLAN_ENGINE.setMemberVarBit(player, memberHash, newJob, 0, 9)) {//Change job
			var replace = [util.getName(memberHash), config.getEnumValue(3720, oldJob), config.getEnumValue(3720, newJob), util.getName(player)];
			broadcasts.send(getClanHash(player), 1, ["[Player A]", "[Clan Job X]", "[Clan Job Y]", "[Player B]"], replace);
		}
	}
	
	function kickClanMember (player, memberHash) {
		//TODO: Remove direct references
		var displayName = util.getName(memberHash);
		if (displayName !== null) {
			dialog.multi2(player, "Really kick "+displayName+"?", "Yes, kick.", function () {
				CLAN_ENGINE.getClanSettings().kickClanMember(getClanHash(player), player.getChat(), memberHash);
				broadcasts.send(getClanHash(player), 29, ["[Player A]", "[Player B]"], [util.getName(player), displayName]);
				dialog.closeModal(player);
			}, "No, cancel.", function () {
				dialog.closeModal(player);
			});
		}
	}
	
	function addClanBan (player) {
		if (!inClan(player)) {
			chat.sendMessage(player, "You must be in a clan to do that.");
			return;
		}
		if (!isClanAdmin(player)) {
			chat.sendMessage(player, "You must be a clan admin to do that.");
			return;
		}
		dialog.builder(player).requestString("Enter the name to be banned:").then(function (name) {
			chat.sendMessage(player, "Attempting to ban "+name+".");
			var userHash = util.getUserHash(name);
			if (userHash === null) {
				chat.sendMessage(player, "An error was found while attempting to ban "+name+". No player of that name could be found.");
				return;
			}
			if (CLAN_ENGINE.isBanned(getClanHash(player), userHash)) {
				chat.sendMessage(player, "That player is already banned from your clan.");
				return;
			}
			if (!isClanAdmin(player)) {//Double check, in case they're no longer an admin
				chat.sendMessage(player, "You must be a clan admin to do that.");
				return;
			}
			CLAN_ENGINE.addBan(player, userHash);
			broadcasts.send(getClanHash(player), 15, ["[Player A]", "[Player B]"], [util.getName(player), util.getName(userHash)]);
		});
	}

	function removeClanBan (player, slot) {
		if (!inClan(player)) {
			chat.sendMessage(player, "You must be in a clan to do that.");
			return;
		}
		if (!isClanAdmin(player)) {
			chat.sendMessage(player, "You must be a clan admin to do that.");
			return;
		}
		if (slot != -1) {
			util.runClientScript(player, 4581, [slot]);
		}
		dialog.builder(player).requestString("Enter the name to be removed:").then(function (name) {
			chat.sendMessage(player, "Attempting to unban "+name+".");
			var userHash = util.getUserHash(name);
			if (userHash === null) {
				chat.sendMessage(player, "An error was found while attempting to unban "+name+". No player of that name could be found.");
				return;
			}
			if (!CLAN_ENGINE.isBanned(getClanHash(player), userHash)) {
				chat.sendMessage(player, "That player is not banned from your clan.");
				return;
			}
			CLAN_ENGINE.removeBan(player, userHash);
			broadcasts.send(getClanHash(player), 7, ["[Player A]", "[Player B]"], [util.getName(player), util.getName(userHash)]);
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
		if (!inClan(player)) {
			chat.sendMessage(player, "You're not in a clan.");		
			return;
		}
		var clanHash = getClanHash(player);
		
		if (!CLAN_ENGINE.isClanOwner(player)) {
			dialog.builder(player).mesbox("If you leave the clan, you will need to be invited before you can join again,"+
					"<br>and must wait a week before you contribute to clan resources.")
				.multi2("Really leave the clan?", "Yes, leave the clan.", function () {
					CLAN_ENGINE.leaveClan(player);
				}, "No, I will remain in the clan.", function () {
					dialog.builder(player).chatplayer("<p=2>No, I will remain in the clan.").finish();
				});
		} else if (CLAN_ENGINE.hasReplacementOwner(clanHash)) {
			dialog.builder(player).mesbox("If you leave, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?")
				.multi2("Leave the clan, losing ownership of it?", "Yes, leave, I no longer want to be owner.", function () {
					CLAN_ENGINE.leaveClan(player);
				}, "No, I want to continue as clan owner.", function () {
					dialog.builder(player).chatplayer("<p=2>No, I want to continue as clan owner.").finish();
				});
		} else if (CLAN_ENGINE.getMemberCount(clanHash) <= 1) {
			dialog.builder(player).mesbox("[TODO: Correct dialog] Leaving the clan will cause it to disband. Are you sure?")
				.confirm("Leave the clan?")
				.then(function () {
					CLAN_ENGINE.leaveClan(player);
				});		
		} else {
			dialog.builder(player).mesbox("Before you can leave the clan, you must assign a deputy owner. Once you have left, they will become the owner in your place. Remember that you will need to be invited to rejoin the clan.");
		}
	}
}
