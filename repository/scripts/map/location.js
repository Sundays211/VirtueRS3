/**
 * Functions relating to adding, deleting, and modifying locations on the world map
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		add : addLocation,
		get : getLocation,
		del : delLocation,
		delay : delay
	};
	
	function addLocation (locTypeId, coords, nodeType, rotation) {
		return MAP_ENGINE.addLoc(locTypeId, coords, nodeType, rotation);
	}
	
	function getLocation (coords, nodeType) {
		return MAP_ENGINE.getLoc(coords, nodeType);
	}
	
	function delLocation (location) {
		MAP_ENGINE.delLoc(location);
	}
	
	function delay (location, delay, task) {
		MAP_ENGINE.delay(location, task, delay);
	}
})();