import { Player } from 'engine/models';
import { sendMessage } from 'shared/chat';
import { getUserHash } from 'shared/util';
import { findPlayer } from 'shared/map/entity';

import { DialogBuilder } from './builder';

export function requestCount (player: Player, message: string): DialogBuilder {
	return new DialogBuilder(player).requestCount(message);
}

export function requestName (player: Player, message: string): DialogBuilder {
	return new DialogBuilder(player).requestName(message);
}

export function requestString (player: Player, message: string): DialogBuilder {
	return new DialogBuilder(player).requestString(message);
}

export function requestItem (player: Player, message: string): DialogBuilder {
	return new DialogBuilder(player).requestItem(message);
}

export function requestPlayer (
	player: Player,
	message: string,
	onSuccess: (player: Player) => void
) {
	requestName(player, message).then((name: string) => {
		let hash = getUserHash(name);
		if (hash) {
			let targetPlayer = findPlayer(hash);
			if (targetPlayer) {
				onSuccess(targetPlayer);
			} else {
				sendMessage(player, name+" is not currently in the game world.");
			}
		} else {
			sendMessage(player, name+" is not registered on this server.");
		}
	});
}
