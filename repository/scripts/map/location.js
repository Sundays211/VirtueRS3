/**
 * Functions relating to adding, deleting, and modifying locations on the world map
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		add : addLocation,
		get : getLocation,
		del : delLocation,
		getRotation : getLocRotation,
		getShape : getLocShape,
		delay : delay
	};
	
	function addLocation (locTypeId, coords, shape, rotation) {
		return MAP_ENGINE.addLoc(locTypeId, coords, shape, rotation);
	}
	
	function getLocation (coords, shape) {
		return MAP_ENGINE.getLoc(coords, shape);
	}
	
	function delLocation (location) {
		MAP_ENGINE.delLoc(location);
	}
	
	function getLocRotation (location) {
		return MAP_ENGINE.getLocRotation(location);
	}
	
	function getLocShape (location) {
		return MAP_ENGINE.getLocShape(location);
	}
	
	function delay (location, delay, task) {
		MAP_ENGINE.delay(location, task, delay);
	}
})();