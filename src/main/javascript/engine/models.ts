import { EventType } from './enums/event-type';

export interface Player extends Entity {
	//TODO: Remove these from the game engine & replace here
	getDialogs: () => any
	getCombatSchedule: () => any
	getEquipment: () => any
	switchSheathing: () => any
	getChat: () => any
	getSavedChannelOwner: () => any
	getHeadIcons: () => any
	getModel: () => any
	getDispatcher: () => any
	lock: () => any
	unlock: () => any
	getArmarDynamicRegion: () => any
	setKeys: (amount: number) => void;
	getKeys: () => any
	getImpactHandler: () => any
}

export interface Npc extends Entity {

}

export interface Entity extends Node {

}

export interface Location extends Node {

}

export interface Node {

}

export interface CoordGrid {

}

export interface DynamicMapSquare {

}

export interface NodeHash {

}

export interface EventContext {
	event: EventType;
	trigger: number | string;
	player: Player;
	target: Player;
	npc?: Npc;
	location?: Location;
	console?: boolean;
	cmdArgs?: string[];
	component?: number;
	interface?: number;
	slot?: number;
	button?: number;
	fromslot?: number;
	toslot?: number;
	objId?: number;
	useObjId?: number;
	syntax?: string;
}
