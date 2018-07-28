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
	getMovement: () => any
	setMode: (mode: any) => void
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
	target?: Player;
	npc?: Npc;
	location?: Location;
	coords?: CoordGrid;

	//Commands
	console?: boolean;
	cmdArgs?: string[];
	syntax?: string;

	//Interface interaction
	component?: number;
	interface?: number;
	slot?: number;
	button?: number;
	objId?: number;
	useObjId?: number;
	useslot?: number;

	//Target events
	targetInterface?: number;
	targetComponent?: number;
	targetSlot?: number;
	targetObjId?: number;
	targetLoc?: Location;
	targetCoords?: CoordGrid;

	//Drag event context
	fromslot?: number;
	toslot?: number;
	fromObjId?: number;
	toObjId?: number;
	fromHash?: number;
	toHash?: number;
	fromComponent?: number;
	toComponent?: number;
}
