import { Player } from "engine/models";
import _entity from 'engine/entity';

import { sendMessage } from "shared/chat";
import { stringDialog } from "shared/dialog";
import { getUserHash, lookupPlayerName, runClientScript } from "shared/util";

import { inClan, isClanAdmin, getClanHash } from "./core";
import { sendClanBroadcast } from "./broadcasts";

export async function addClanBan(player: Player) {
	if (!inClan(player)) {
		sendMessage(player, "You must be in a clan to do that.");
		return;
	}
	if (!isClanAdmin(player)) {
		sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	const banName = await stringDialog(player, "Enter the name to be banned:");
	sendMessage(player, "Attempting to ban " + banName + ".");
	var userHash = getUserHash(banName);
	if (userHash === null) {
		sendMessage(player, "An error was found while attempting to ban " + banName + ". No player of that name could be found.");
		return;
	}
	if (CLAN_ENGINE.isBanned(getClanHash(player), userHash)) {
		sendMessage(player, "That player is already banned from your clan.");
		return;
	}
	if (!isClanAdmin(player)) {//Double check, in case they're no longer an admin
		sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	CLAN_ENGINE.addBan(player, userHash);
	sendClanBroadcast(
		getClanHash(player),
		15,
		["[Player A]", "[Player B]"],
		[_entity.getName(player), lookupPlayerName(userHash)]
	);
}

export async function removeClanBan(player: Player, slot: number) {
	if (!inClan(player)) {
		sendMessage(player, "You must be in a clan to do that.");
		return;
	}
	if (!isClanAdmin(player)) {
		sendMessage(player, "You must be a clan admin to do that.");
		return;
	}
	if (slot != -1) {
		runClientScript(player, 4581, [slot]);
	}
	const banName = await stringDialog(player, "Enter the name to be removed:");
	sendMessage(player, "Attempting to unban " + banName + ".");
	var userHash = getUserHash(banName);
	if (userHash === null) {
		sendMessage(player, "An error was found while attempting to unban " + banName + ". No player of that name could be found.");
		return;
	}
	if (!CLAN_ENGINE.isBanned(getClanHash(player), userHash)) {
		sendMessage(player, "That player is not banned from your clan.");
		return;
	}
	CLAN_ENGINE.removeBan(player, userHash);
	sendClanBroadcast(
		getClanHash(player),
		7,
		["[Player A]", "[Player B]"],
		[_entity.getName(player), lookupPlayerName(userHash)]
	);
}
