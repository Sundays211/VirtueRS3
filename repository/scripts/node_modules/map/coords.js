/**
 * Helper function for hashing coordinates
 */
/* globals MAP_ENGINE */

module.exports = function () {
	if (arguments.length >= 6) {
		//coords, levelOff, squareXoff, squareYoff, localXoff, localYoff
		return MAP_ENGINE.getCoords(arguments[0], arguments[2], arguments[3], arguments[1], arguments[4], arguments[5]);
	} else if (arguments.length >= 5) {
		//level, squareX, squareY, localX, localY
		return MAP_ENGINE.getCoords(arguments[1], arguments[2], arguments[0], arguments[3], arguments[4]);
	} else if (arguments.length >= 4) {
		//coords, xOff, yOff, levelOff
		return MAP_ENGINE.getCoords(arguments[0], arguments[1], arguments[2], arguments[3]);
	} else {
		//x, y, level
		return MAP_ENGINE.getCoords(arguments[0], arguments[1], arguments[2]);
	}
};