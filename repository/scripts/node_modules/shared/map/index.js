/**
 * 
 */
var common = require('./common');
var object = require('./object');
var location = require('./location');
var entity = require('./entity');

module.exports = {
	getCoordX : common.getCoordX,
	getCoordY : common.getCoordY,
	getLevel : common.getLevel,
	getCoords : common.getCoords,
	getCoordHash : common.getCoordHash,
	
	/**
	 * Checks whether the provided coordinates lie within the zone specified
	 * @param from The start coords of the zone
	 * @param to The end coords of the zone (inclusive)
	 * @param coords The coordinates to check
	 */
	inZone : common.inZone,
	teleport : entity.teleport,
	setCoords : entity.setCoords,
	
	/**
	 * Drops an object at the specified coords
	 * @param objTypeId The object/item ID to drop
	 * @param coords The coordinates to drop the item at
	 * @param player The player to whom the dropped item is visible. If null or missing, the item is visible to everyone
	 * @param count The number of items to drop. Defaults to 1
	 * @param removalDelay The number of game cycles before the object is removed. Set to -1 to never remove.
	 */
	dropObj : object.drop,

	/**
	 * Removes the object from the specified map coordinates
	 * @param objTypeId The object/item ID to take
	 * @param coords The coordinates to take the object from
	 * @return The number of objects removed
	 */
	takeObj : object.take,
	
	addLoc : location.add,
	getLoc : location.get,
	delLoc : location.del,
	locAnim : location.anim,
	
	/**
	 * Runs the specified function after a delay on the given location.
	 * If the location is destroyed (or the region reset), the function will not run
	 * 
	 * @param location The location to delay the function on
	 * @param delay The number of game cycles to delay by
	 * @param task The function to run after the given delay
	 */
	delayLoc : location.delay
};