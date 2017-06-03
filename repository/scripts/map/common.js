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
		getGlobalCoord : getGlobalCoord
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
	
	function getGlobalCoord (squareCoord, localCoord) {
		return (localCoord + ((squareCoord & 0xff) << 6));
	}
})();
