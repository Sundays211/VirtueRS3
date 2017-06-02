/**
 * Helper function for hashing coordinates
 */
/* globals ENGINE */

module.exports = function (x, y, level) {
	level = typeof(level) === "undefined" ? 0 : level;
	return ENGINE.getCoords(x, y, level);
};