/**
 * Manages the core functionality for clans
 */
import { Player, ClanHash, NodeHash } from "engine/models";
import _config from 'engine/config';
import _entity from 'engine/entity';

import { getUserHash, lookupPlayerName } from "shared/util";
import { multi2, mesbox, chatplayer, confirmDialog } from "shared/dialog";
import { sendMessage } from "shared/chat";

import { sendClanBroadcast } from "./broadcasts";

export function getClanHash(player: Player): ClanHash {
	return CLAN_ENGINE.getClanHash(player);
}

export function inClan(player: Player, clan?: ClanHash): boolean {
	if (clan) {
		return getClanHash(player) === clan;
	} else {
		return !!getClanHash(player);
	}
}

export function isClanAdmin(player: Player, clan?: ClanHash): boolean {
	if (clan) {
		throw "Not yet supported!";
	} else {
		return CLAN_ENGINE.isClanAdmin(player);
	}
}

export function getClanRank(player: Player, clan?: ClanHash): number {
	clan = clan || getClanHash(player);
	return CLAN_ENGINE.getRank(clan, getUserHash(player));
}

export function setClanRank(player: Player, memberHash: NodeHash, newRank: number) {
	var oldRank = CLAN_ENGINE.getRank(getClanHash(player), memberHash);
	if (CLAN_ENGINE.setRank(player, memberHash, newRank)) {//Change rank
		var replace = [
			_entity.getName(player),
			lookupPlayerName(memberHash),
			_config.enumValue(3714, oldRank),
			_config.enumValue(3714, newRank)
		];
		if (newRank > oldRank) {//Promoted
			sendClanBroadcast(getClanHash(player), 10, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
		} else {//Demoted
			sendClanBroadcast(getClanHash(player), 9, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
		}
	}
}

export function setClanJob(player: Player, memberHash: NodeHash, newJob: number) {
	var oldJob = CLAN_ENGINE.getMemberVarBit(player, memberHash, 0, 9);
	if (CLAN_ENGINE.setMemberVarBit(player, memberHash, newJob, 0, 9)) {//Change job
		var replace = [
			lookupPlayerName(memberHash),
			_config.enumValue(3720, oldJob),
			_config.enumValue(3720, newJob),
			_entity.getName(player)
		];
		sendClanBroadcast(getClanHash(player), 1, ["[Player A]", "[Clan Job X]", "[Clan Job Y]", "[Player B]"], replace);
	}
}

export function kickClanMember(player: Player, memberHash: NodeHash) {
	//TODO: Remove direct references to clan settings
	var displayName = lookupPlayerName(memberHash);
	if (displayName !== null) {
		multi2(player, `Really kick ${displayName}?`, "Yes, kick.", () => {
			CLAN_ENGINE.getClanSettings().kickClanMember(getClanHash(player), player.getChat(), memberHash);
			sendClanBroadcast(
				getClanHash(player),
				29,
				["[Player A]", "[Player B]"],
				[_entity.getName(player), displayName]
			);
		}, "No, cancel.", () => { });
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

export async function leaveClan(player: Player) {
	if (!inClan(player)) {
		sendMessage(player, "You're not in a clan.");
		return;
	}
	var clanHash = getClanHash(player);

	if (!CLAN_ENGINE.isClanOwner(player)) {
		await mesbox(player, "If you leave the clan, you will need to be invited before you can join again," +
			"<br>and must wait a week before you contribute to clan resources.");
		multi2(player, "Really leave the clan?", "Yes, leave the clan.", () => {
			CLAN_ENGINE.leaveClan(player);
		}, "No, I will remain in the clan.", () => {
			chatplayer(player, "<p=2>No, I will remain in the clan.");
		});
	} else if (CLAN_ENGINE.hasReplacementOwner(clanHash)) {
		await mesbox(player, "If you leave, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?");
		multi2(player, "Leave the clan, losing ownership of it?", "Yes, leave, I no longer want to be owner.", () => {
			CLAN_ENGINE.leaveClan(player);
		}, "No, I want to continue as clan owner.", () => {
			chatplayer(player, "<p=2>No, I want to continue as clan owner.");
		});
	} else if (CLAN_ENGINE.getMemberCount(clanHash) <= 1) {
		await mesbox(player, "[TODO: Correct dialog] Leaving the clan will cause it to disband. Are you sure?");
		await confirmDialog(player, "Leave the clan?");
		CLAN_ENGINE.leaveClan(player);
	} else {
		mesbox(player, "Before you can leave the clan, you must assign a deputy owner. Once you have left, they will become the owner in your place. Remember that you will need to be invited to rejoin the clan.");
	}
}
