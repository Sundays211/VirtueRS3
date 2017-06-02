/**
 * Functions relating to adding, deleting, and modifying objects on the map
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		drop : dropObject
	};
	
	function dropObject (objTypeId, coords, player, count, removalDelay) {
		count = typeof(count) === "undefined" ? 1 : count;
		if (typeof(removalDelay) === "undefined") {
			MAP_ENGINE.addObj(objTypeId, coords, player, count);
		} else {
			MAP_ENGINE.addObj(objTypeId, coords, player, count, removalDelay);
		}
	}

})();