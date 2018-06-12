/**
 * Function for adding, removing, and modifying entities on the map
 */
/* globals ENGINE */
var common = require('./common');

var anim = require('../anim');

module.exports = (function () {
	return {
		getCoords : common.getCoords,
		teleport : teleport,
		setCoords : setCoords,
		getPlayer : getPlayer
	};
	
	function teleport(entity, coords, animId1,spotId1,animId2,spotId2) {
		animId1 = typeof(animId1) !== "undefined" ? animId1 : 3219;
		animId2 = typeof(animId2) !== "undefined" ? animId2 : -1;
		spotId1 = typeof(spotId1) !== "undefined" ? spotId1 : -1;
		spotId2 = typeof(spotId2) !== "undefined" ? spotId2 : -1;
		anim.addSpotAnim(entity, spotId1);
		anim.run(entity, animId1, function () {
			anim.run(entity, animId2);
			anim.addSpotAnim(entity, spotId2);
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