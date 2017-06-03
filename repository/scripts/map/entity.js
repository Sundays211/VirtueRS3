/**
 * Function for adding, removing, and modifying entities on the map
 */
/* globals ENGINE */
var common = require('./common');

module.exports = (function () {
	return {
		getCoords : common.getCoords,
		setCoords : setCoords,
		getPlayer : getPlayer
	};
		
	function setCoords (entity, coords) {
		ENGINE.teleportEntity(entity, coords);
	}
	
	function getPlayer (playerHash) {
		return ENGINE.getWorldPlayerByHash(playerHash);
	}
})();