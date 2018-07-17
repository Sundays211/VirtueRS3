import { Player, Npc } from 'engine/models';
import _config from 'engine/config';
import { setWidgetText, setWidgetObject, hideWidget, openOverlaySub } from 'shared/widget';
import { getId, runClientScript } from 'shared/util';

import { Expression } from './expression';
import { setResumeHandler } from './common';

export function chatplayer (
	player: Player,
	message: string,
	expression: Expression = Expression.NEUTRAL
): Promise<void> {
	return new Promise(resolve => {
		player.getDialogs().sendPlayerChat(message, expression);

		setResumeHandler(player, _ => resolve());
	});
}

export function chatnpc (
	player: Player,
	npc: number | Npc,
	message: string,
	expression: Expression = Expression.NEUTRAL
): Promise<void> {
	npc = typeof (npc) !== "number" ? getId(npc) : npc;
	return new Promise(resolve => {
		//TODO: Remove this from the game engine & replace here
		player.getDialogs().sendNpcChat(message, npc, expression);
		setResumeHandler(player, _ => resolve());
	});
}

export function mesbox (
	player: Player,
	message: string
): Promise<void> {
	return new Promise(resolve => {
		setWidgetText(player, 1186, 2, message);
		hideWidget(player, 1186, 3, false);
		openOverlaySub(player, 1006, 1186, false);
		runClientScript(player, 8178, []);
		setResumeHandler(player, _ => resolve());
	});
}

export function objbox (
	player: Player,
	obj: number,
	message: string
): Promise<void> {
	obj = typeof (obj) !== "number" ? getId(obj) : obj;
	return new Promise(resolve => {
		setWidgetText(player, 1184, 11, _config.objName(obj));
		setWidgetObject(player, 1184, 2, obj);
		setWidgetText(player, 1184, 9, message);
		openOverlaySub(player, 1006, 1184, false);
		runClientScript(player, 8178, []);
		setResumeHandler(player, _ => resolve());
	});
}
