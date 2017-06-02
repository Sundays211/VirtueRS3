/**
 * 
 */
/* globals ENGINE */

module.exports = (function () {
	return {
		getCoordX : getCoordX,
		getCoordY : getCoordY,
		getLevel : getLevel,
		getCoords : getCoords,
		setCoords : setCoords
	};
	
	function getCoordX (node) {
		return ENGINE.getCoordX(node);
	}
	
	function getCoordY (node) {
		return ENGINE.getCoordY(node);
	}
	
	function getLevel (node) {
		return ENGINE.getCoordLevel(node);
	}
	
	function getCoords (node) {
		return ENGINE.getCoords(node);
	}
	
	function setCoords (entity, coords) {
		ENGINE.teleportEntity(entity, coords);
	}
})();
