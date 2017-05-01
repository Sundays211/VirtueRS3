/**
 * 
 */
/* globals ENGINE */

module.exports = init();

function init () {
	var map = {
		getCoordX : getCoordX,
		getCoordY : getCoordY,
		getLevel : getLevel,
		getCoords : getCoords,
		teleport : teleport
	};
	
	return map;
	
	function getCoordX (node) {
		return ENGINE.getCoordX(node);
	}
	
	function getCoordY (node) {
		return ENGINE.getCoordY(node);
	}
	
	function getLevel (node) {
		return ENGINE.getCoordLevel(node);
	}
	
	function getCoords (x, y, level) {
		return ENGINE.getCoords(x, y, level);
	}
	
	function teleport (entity, x, y, z) {
		ENGINE.teleportEntity(entity, x, y, z);
	}
}