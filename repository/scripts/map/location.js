/**
 * Functions relating to adding, deleting, and modifying locations on the world map
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		add : addLocation,
		get : getLocation,
		del : delLocation,
		anim : locationAnim,
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
	
	function locationAnim (location, animId) {
		MAP_ENGINE.locAnim(location, animId);
	}
	
	function getLocRotation (location) {
		return MAP_ENGINE.getLocRotation(location);
	}
	
	function getLocShape (location) {
		return MAP_ENGINE.getLocShape(location);
	}
	
	/**
	 * Runs the specified function after a delay on the given location.
	 * If the location is destroyed (or the region reset), the function will not run
	 * 
	 * @param location The location to delay the function on
	 * @param delay The number of game cycles to delay by
	 * @param task The function to run after the given delay
	 */
	function delay (location, delay, task) {
		MAP_ENGINE.delay(location, task, delay);
	}
})();