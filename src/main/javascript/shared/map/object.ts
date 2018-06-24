/**
 * Functions relating to adding, deleting, and modifying objects on the map
 */
import { Player, CoordGrid } from 'engine/models';

/**
 * Drops an object at the specified coords
 * @param objTypeId The object/item ID to drop
 * @param coords The coordinates to drop the item at
 * @param player The player to whom the dropped item is visible. If null or missing, the item is visible to everyone
 * @param count The number of items to drop. Defaults to 1
 * @param removalDelay The number of game cycles before the object is removed. Set to -1 to never remove.
 */
export function dropObject(
	objTypeId: number,
	coords: CoordGrid,
	player: Player,
	count: number = 1,
	removalDelay?: number
) {
	if (typeof (removalDelay) === "undefined") {
		MAP_ENGINE.addObj(objTypeId, coords, player, count);
	} else {
		MAP_ENGINE.addObj(objTypeId, coords, player, count, removalDelay);
	}
}

/**
 * Removes the object from the specified map coordinates
 * @param objTypeId The object/item ID to take
 * @param coords The coordinates to take the object from
 * @return The number of objects removed
 */
export function takeObject(objTypeId: number, coords: CoordGrid) {
	return MAP_ENGINE.delObj(objTypeId, coords);
}
