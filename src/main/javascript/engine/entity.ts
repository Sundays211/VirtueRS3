import { Entity, CoordGrid } from './models';

export default class {

	public static moveTo(entity: Entity, coords: CoordGrid, onReachedTarget?: () => void) {
		if (typeof (onReachedTarget) !== undefined) {
			ENTITY_ENGINE.moveTo(entity, coords, onReachedTarget);
		} else {
			ENTITY_ENGINE.moveTo(entity, coords);
		}
	}

	public static moveAdjacent(entity: Entity) {
		ENTITY_ENGINE.moveAdjacent(entity);
	}

	public static setCoords(entity: Entity, coords: CoordGrid) {
		ENTITY_ENGINE.setCoords(entity, coords);
	}

	public static getCoords(entity: Entity): CoordGrid {
		return ENTITY_ENGINE.getCoords(entity);
	}

	public static say(entity: Entity, message: string) {
		ENTITY_ENGINE.say(entity, message);
	}

	public static getName(entity: Entity): string {
		return ENTITY_ENGINE.getName(entity);
	}

	public static setBas(entity: Entity, basId: number) {//TODO: Move this into the entity api
		ENGINE.setRenderAnim(entity, basId);
	}

	public static forceMove(
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
}
