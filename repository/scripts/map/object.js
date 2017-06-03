/**
 * Functions relating to adding, deleting, and modifying objects on the map
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		drop : dropObject
	};
	
	/**
	 * Drops an object at the specified coords
	 * @param objTypeId The object/item ID to drop
	 * @param coords The coordinates to drop the item at
	 * @param player The player to whom the dropped item is visible. If null or missing, the item is visible to everyone
	 * @param count The number of items to drop. Defaults to 1
	 * @param removalDelay The number of game cycles before the object is removed. Set to -1 to never remove.
	 */
	function dropObject (objTypeId, coords, player, count, removalDelay) {
		count = typeof(count) === "undefined" ? 1 : count;
		if (typeof(removalDelay) === "undefined") {
			MAP_ENGINE.addObj(objTypeId, coords, player, count);
		} else {
			MAP_ENGINE.addObj(objTypeId, coords, player, count, removalDelay);
		}
	}

})();