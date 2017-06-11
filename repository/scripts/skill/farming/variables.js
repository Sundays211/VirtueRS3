/**
 * Functionality for getting & setting the status of farming patches
 */
var varbit = require('../../core/var/bit');

module.exports = (function () {
	return {
		getStatus : getStatus,
		setStatus : setStatus,
		getCompost : getCompost,
		setCompost : setCompost
	};
	
	function getStatus (player, patchId) {
		switch (patchId) {
		/* Flower Patches */
		case 7847://Falador
			return varbit(player, 72);
		case 7848://Catherby
			return varbit(player, 73);
		case 7849://Ardougne
			return varbit(player, 74);
		case 7850://Morytania
			return varbit(player, 75);
		}
	}
	
	function setStatus (player, patchId, status) {
		switch (patchId) {
		/* Flower Patches */
		case 7847://Falador
			varbit(player, 72, status);
			return;
		case 7848://Catherby
			varbit(player, 73, status);
			return;
		case 7849://Ardougne
			varbit(player, 74, status);
			return;
		case 7850://Morytania
			varbit(player, 75, status);
			return;
		}
	}
	
	function getCompost (player, patchId) {
		switch (patchId) {
		/* Flower Patches */
		case 7847://Falador
			return varbit(player, 115);
		case 7848://Catherby
			return varbit(player, 116);
		case 7849://Ardougne
			return varbit(player, 117);
		case 7850://Morytania
			return varbit(player, 118);
		}
	}
	
	function setCompost (player, patchId, status) {
		switch (patchId) {
		/* Flower Patches */
		case 7847://Falador
			varbit(player, 115, status);
			return;
		case 7848://Catherby
			varbit(player, 116, status);
			return;
		case 7849://Ardougne
			varbit(player, 117, status);
			return;
		case 7850://Morytania
			varbit(player, 118, status);
			return;
		}
	}
})();