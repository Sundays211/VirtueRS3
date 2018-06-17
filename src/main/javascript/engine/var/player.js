/**
 * Helper function for getting & setting player variables
 */
/* globals ENGINE */

module.exports = function (player, key, value) {
	if (typeof(value) !== "undefined") {
		ENGINE.setVarp(player, key, value);
	} else {
		return ENGINE.getVarp(player, key);
	}
};