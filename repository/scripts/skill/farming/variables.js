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
			
		/* Allotments */
		case 8550://North-West Falador
			return varbit(player, 52);
		case 8551://South-East Falador
			return varbit(player, 53);
		case 8552://North Catherby
			return varbit(player, 54);
		case 8553://South Catherby
			return varbit(player, 55);
		case 8554://North Ardougne
			return varbit(player, 56);
		case 8555://South Ardougne
			return varbit(player, 57);
		case 8556://North-West Morytania
			return varbit(player, 58);
		case 8557://South-East Morytania
			return varbit(player, 59);
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
			
		/* Allotments */
		case 8550://North-West Falador
			varbit(player, 52, status);
			return;
		case 8551://South-East Falador
			varbit(player, 53, status);
			return;
		case 8552://North Catherby
			varbit(player, 54, status);
			return;
		case 8553://South Catherby
			varbit(player, 55, status);
			return;
		case 8554://North Ardougne
			varbit(player, 56, status);
			return;
		case 8555://South Ardougne
			varbit(player, 57, status);
			return;
		case 8556://North-West Morytania
			varbit(player, 58, status);
			return;
		case 8557://South-East Morytania
			varbit(player, 59, status);
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
			
		/* Allotments */
		case 8550://North-West Falador
			return varbit(player, 103);
		case 8551://South-East Falador
			return varbit(player, 104);
		case 8552://North Catherby
			return varbit(player, 105);
		case 8553://South Catherby
			return varbit(player, 106);
		case 8554://North Ardougne
			return varbit(player, 107);
		case 8555://South Ardougne
			return varbit(player, 108);
		case 8556://North-West Morytania
			return varbit(player, 109);
		case 8557://South-East Morytania
			return varbit(player, 110);
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
			
		/* Allotments */
		case 8550://North-West Falador
			varbit(player, 103, status);
			return;
		case 8551://South-East Falador
			varbit(player, 104, status);
			return;
		case 8552://North Catherby
			varbit(player, 105, status);
			return;
		case 8553://South Catherby
			varbit(player, 106, status);
			return;
		case 8554://North Ardougne
			varbit(player, 107, status);
			return;
		case 8555://South Ardougne
			varbit(player, 108, status);
			return;
		case 8556://North-West Morytania
			varbit(player, 109, status);
			return;
		case 8557://South-East Morytania
			varbit(player, 110, status);
			return;
		default:
			throw "Unknown farming patch: "+patchId;
		}
	}
})();