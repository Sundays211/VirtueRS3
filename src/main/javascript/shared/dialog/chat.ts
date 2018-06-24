import { Player, Npc } from 'engine/models';
import { DialogBuilder } from './builder';
import { Expression } from './expression';

export function chatplayer (player: Player, message: string, expression?: Expression): DialogBuilder {
	return new DialogBuilder(player).chatplayer(message, expression);
}

export function chatnpc (
	player: Player,
	npc: number | Npc,
	message: string,
	expression?: Expression
): DialogBuilder {
	return new DialogBuilder(player).chatnpc(npc, message, expression);
}

export function mesbox (player: Player, message: string): DialogBuilder {
	return new DialogBuilder(player).mesbox(message);
}

export function objbox (player: Player, obj: number, message: string): DialogBuilder {
	return new DialogBuilder(player).objbox(obj, message);
}
