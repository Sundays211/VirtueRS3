import { EventType } from './enums/event-type';

export interface Player extends Entity {
	//TODO: Remove these from the game engine & replace here
	getDialogs: () => any
	getCombatSchedule: () => any
	getEquipment: () => any
	switchSheathing: () => any
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
	component?: number;
	slot?: number;
	fromslot?: number;
	toslot?: number;
}
