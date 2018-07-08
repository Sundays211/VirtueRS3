import { Player } from 'engine/models';

import { openWidget } from 'shared/widget';
import { sendMessage } from 'shared/chat';
import { getUserHash } from 'shared/util';
import { findPlayer } from 'shared/map/entity';

import { DialogBuilder } from './builder';
import { openModalBase, setResumeHandler } from './common';
import { runClientScript } from 'shared/util';

export function countDialog (player: Player, message: string): Promise<number> {
	return new Promise(resolve => {
		openModalBase(player);
		runClientScript(player, 108, [message]);
		setResumeHandler(player, value => resolve(value as number));
	});
}

export function nameDialog (player: Player, message: string): Promise<string> {
	return new Promise(resolve => {
		openModalBase(player);
		runClientScript(player, 110, [message]);
		setResumeHandler(player, value => resolve(value as string));
	});
}

export function stringDialog (player: Player, message: string): Promise<string> {
	return new Promise(resolve => {
		openModalBase(player);
		runClientScript(player, 110, [message]);
		setResumeHandler(player, value => resolve(value as string));
	});
}

export function objectDialog (player: Player, message: string): Promise<number> {
	return new Promise(resolve => {
		openWidget(player, 1477, 521, 1418, true);
		openWidget(player, 1418, 1, 389, true);
		runClientScript(player, 8178, []);
		runClientScript(player, 570, [message]);
		setResumeHandler(player, value => resolve(value as number));
	});
}

export async function playerDialog (player: Player, message: string): Promise<Player> {
	const name = await nameDialog(player, message);
	let hash = getUserHash(name);
	if (hash) {
		let targetPlayer = findPlayer(hash);
		if (targetPlayer) {
			return targetPlayer;
		} else {
			sendMessage(player, name+" is not currently in the game world.");
		}
	} else {
		sendMessage(player, name+" is not registered on this server.");
	}
}

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
