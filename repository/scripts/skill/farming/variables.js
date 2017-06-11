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
		
		/* Herb Patches */
		case 8150://Falador
			return varbit(player, 124);
		case 8151://Catherby
			return varbit(player, 125);
		case 8152://Ardougne
			return varbit(player, 126);
		case 8153://Morytania
			return varbit(player, 127);
		default:
			throw "Unknown farming patch: "+patchId;
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
			
		/* Herb Patches */
		case 8150://Falador
			varbit(player, 124, status);
			return;
		case 8151://Catherby
			varbit(player, 125, status);
			return;
		case 8152://Ardougne
			varbit(player, 126, status);
			return;
		case 8153://Morytania
			varbit(player, 127, status);
			return;
		default:
			throw "Unknown farming patch: "+patchId;
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
			
		/* Herb Patches */
		case 8150://Falador
			return varbit(player, 129);
		case 8151://Catherby
			return varbit(player, 130);
		case 8152://Ardougne
			return varbit(player, 131);
		case 8153://Morytania
			return varbit(player, 132);
		default:
			throw "Unknown farming patch: "+patchId;
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
			
		/* Herb Patches */
		case 8150://Falador
			varbit(player, 129, status);
			return;
		case 8151://Catherby
			varbit(player, 130, status);
			return;
		case 8152://Ardougne
			varbit(player, 131, status);
			return;
		case 8153://Morytania
			varbit(player, 132, status);
			return;
		default:
			throw "Unknown farming patch: "+patchId;
		}
	}
})();