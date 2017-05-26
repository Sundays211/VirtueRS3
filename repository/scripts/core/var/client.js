/**
 * Helper function for getting & setting client variables
 */
/* globals ENGINE */

module.exports = function (player, key, value) {
	if (typeof(value) !== "undefined") {
		ENGINE.setVarc(player, key, value);
	} else {
		throw "Cannot get a client variable! varc="+key;
	}
};