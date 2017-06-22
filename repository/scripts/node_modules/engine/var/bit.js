/**
 * Helper function for getting & setting variable bits
 */
/* globals ENGINE */

module.exports = function (player, key, value) {
	if (typeof(value) !== "undefined") {
		ENGINE.setVarBit(player, key, value);
	} else {
		return ENGINE.getVarBit(player, key);
	}
};