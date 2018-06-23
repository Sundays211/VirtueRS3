import { Entity, CoordGrid } from './models';

function moveTo(entity: Entity, coords: CoordGrid, onReachedTarget?: () => void) {
	if (typeof (onReachedTarget) !== undefined) {
		ENTITY_ENGINE.moveTo(entity, coords, onReachedTarget);
	} else {
		ENTITY_ENGINE.moveTo(entity, coords);
	}
}

function moveAdjacent(entity: Entity) {
	ENTITY_ENGINE.moveAdjacent(entity);
}

function setCoords(entity: Entity, coords: CoordGrid) {
	ENTITY_ENGINE.setCoords(entity, coords);
}

function getCoords(entity: Entity): CoordGrid {
	return ENTITY_ENGINE.getCoords(entity);
}

function say(entity: Entity, message: string) {
	ENTITY_ENGINE.say(entity, message);
}

function getName(entity: Entity): string {
	return ENTITY_ENGINE.getName(entity);
}

function setBas(entity: Entity, basId: number) {//TODO: Move this into the entity api
	ENGINE.setRenderAnim(entity, basId);
}

function forceMove(
	entity: Entity,
	coords: CoordGrid,
	length: number,
	finalCoords?: CoordGrid,
	totalLength?: number
) {
	if (typeof (finalCoords) !== "undefined") {
		ENTITY_ENGINE.forceMove(entity, coords, length, finalCoords, totalLength);
	} else {
		ENTITY_ENGINE.forceMove(entity, coords, length);
	}
}

export default {
	moveTo,
	moveAdjacent,
	setCoords,
	getCoords,
	say,
	getName,
	setBas,
	forceMove
}
