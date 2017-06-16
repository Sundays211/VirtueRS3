/**
 * Function for adding, removing, and modifying entities on the map
 */
/* globals ENGINE */
var common = require('./common');

var anim = require('../core/anim');

module.exports = (function () {
	return {
		getCoords : common.getCoords,
		teleport : teleport,
		setCoords : setCoords,
		getPlayer : getPlayer
	};
	
	function teleport(entity, coords, animId) {
		animId = typeof(animId) === "undefined" ? animId : 18007;
		anim.addSpotAnim(entity, 4200);
		anim.run(entity, animId, function () {
			setCoords(entity, coords);
		});
	}
		
	function setCoords (entity, coords) {
		ENGINE.teleportEntity(entity, coords);
	}
	
	function getPlayer (playerHash) {
		return ENGINE.getWorldPlayerByHash(playerHash);
	}
})();