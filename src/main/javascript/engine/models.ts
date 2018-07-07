import { EventType } from './enums/event-type';

export interface Player extends Entity {
	//TODO: Add these methods to the game engine (or replace with something else)
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
	setPet: (npc: Npc) => void
	getImpactHandler: () => any
	setAction: (action: any) => any
}

export interface Npc extends Entity {
	//TODO: Add these methods to the game engine (or replace with something else)
	isOwner: (player: Player) => boolean
	destroy: () => void
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

export interface ClanHash {

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
