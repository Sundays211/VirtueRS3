/**
 * Helper function for hashing coordinates
 */
/* globals MAP_ENGINE */

module.exports = function (x, y, level, localX, localY) {
	level = typeof(level) === "undefined" ? 0 : level;
	if (typeof(localX) !== "undefined" && typeof(localY) !== "undefined") {
		return MAP_ENGINE.getCoords(x, y, level, localX, localY);
	} else {
		return MAP_ENGINE.getCoords(x, y, level);
	}
};