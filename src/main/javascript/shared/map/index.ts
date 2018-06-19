/**
 *
 */
export * from './common';
export * from './object';
export * from './location';
export * from './entity';

import _map from 'engine/map';
import common from './common';
import * as entity from './entity';
import * as object from './object';
import * as location from './location';

export default {
	getCoordX: _map.getCoordX,
	getCoordY: _map.getCoordY,
	getLevel: _map.getLevel,
	getCoords: _map.getCoords,
	getCoordHash: common.getCoordHash,

	/**
	 * Checks whether the provided coordinates lie within the zone specified
	 * @param from The start coords of the zone
	 * @param to The end coords of the zone (inclusive)
	 * @param coords The coordinates to check
	 */
	inZone: common.inZone,
	teleport: entity.teleport,
	setCoords: entity.setCoords,

	/**
	 * Drops an object at the specified coords
	 * @param objTypeId The object/item ID to drop
	 * @param coords The coordinates to drop the item at
	 * @param player The player to whom the dropped item is visible. If null or missing, the item is visible to everyone
	 * @param count The number of items to drop. Defaults to 1
	 * @param removalDelay The number of game cycles before the object is removed. Set to -1 to never remove.
	 */
	dropObj: object.dropObject,

	/**
	 * Removes the object from the specified map coordinates
	 * @param objTypeId The object/item ID to take
	 * @param coords The coordinates to take the object from
	 * @return The number of objects removed
	 */
	takeObj: object.takeObject,

	addLoc : location.addLocation,
	getLoc : location.getLocation,
	delLoc : location.delLocation,
	locAnim : location.locationAnim
}
