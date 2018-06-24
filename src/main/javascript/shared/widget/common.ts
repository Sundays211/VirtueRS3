/**
 *
 */
import { Player } from 'engine/models';
import { setVarc } from 'engine/var';
import _component from './component';

export function getWidgetId(hash: number): number {
	return hash >> 16;
}

export function getComponentId(hash: number): number {
	return hash & 0xffff;
}

export function openWidget(
	player: Player,
	parentId: number,
	parentComp: number,
	id: number,
	alwaysOpen: boolean
) {
	ENGINE.openWidget(player, parentId, parentComp, id, alwaysOpen);
}

export function openCentralWidget(player: Player, id: number, alwaysOpen: boolean) {
	ENGINE.openCentralWidget(player, id, alwaysOpen);
}

export function openOverlaySub(player: Player, subId: number, id: number, alwaysOpen: boolean) {
	ENGINE.openOverlaySub(player, subId, id, alwaysOpen);
}

export function closeWidgetSub(player: Player, parentId: number, parentComp: number) {
	ENGINE.closeWidget(player, parentId, parentComp);
}

export function closeAllWidgets(player: Player) {
	ENGINE.closeCentralWidgets(player);
}

export function closeOverlaySub(player: Player, subId: number, handle: boolean) {
	ENGINE.closeOverlaySub(player, subId, handle);
}

export function setWidgetEvents(
	player: Player,
	iface: number,
	comp: number,
	from: number,
	to: number,
	events: number
) {
	ENGINE.setWidgetEvents(player, iface, comp, from, to, events);
}

export function setWidgetText(player: Player, iface: number, comp: number, text: string) {
	ENGINE.setWidgetText(player, iface, comp, text);
}

export function setWidgetObject(
	player: Player,
	iface: number,
	comp: number,
	obj: number,
	number: number = 1
) {
	ENGINE.setWidgetObject(player, iface, comp, obj, number);
}

export function hideWidget(player: Player, iface: number, comp: number, hidden: boolean) {
	ENGINE.hideWidget(player, iface, comp, hidden);
}

export function inframeInput(
	player: Player,
	ifaceId: number,
	comp: number,
	callback: (value: number | string) => void,
	type: number,
	maxlen: number
) {
	setVarc(player, 2235, _component(ifaceId, comp));
	setVarc(player, 2236, type);
	setVarc(player, 2237, maxlen);
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number | string) {
			callback(value);
		}
	});
	ENGINE.setInputHandler(player, new Handler());
}
