/**
 * 
 */
/* globals ENGINE, MAP_ENGINE */
var _config = require('engine/config');

var coords = require('./coords');

module.exports = (function () {
	return {
		getCoordX : getCoordX,
		getCoordY : getCoordY,
		getLevel : getLevel,
		getCoords : getCoords,
		getCoordHash : getCoordHash,
		getGlobalCoord : getGlobalCoord,
		getRotatedCoord : getRotatedCoord,
		inZone : inZone
	};
	
	function inZone (from, to, coord) {
		MAP_ENGINE.inZone(from, to, coord);
	}
	
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
	
	function getCoordHash (coords) {
		return ENGINE.getCoordHash(coords);
	}
	
	function getGlobalCoord (squareCoord, localCoord) {
		return (localCoord + ((squareCoord & 0xff) << 6));
	}

	function getRotatedCoord(srcCoord, zoneCoord, mapRotation, locTypeId, locRotation) {
		var tmp;
		var sizeX = _config.locSizeX(locTypeId);
		var sizeY = _config.locSizeY(locTypeId);
		if ((locRotation & 0x1) === 1) {
			tmp = sizeX;
			sizeX = sizeY;
			sizeY = tmp;
		}

		var localX = getCoordX(srcCoord) & 0x7;
		var localY = getCoordY(srcCoord) & 0x7;
		if (mapRotation == 1) {
			tmp = localX;
			localX = localY;
			localY = 7 - tmp - (sizeX - 1);
		} else if (mapRotation == 2) {
			localX = 7 - localX - (sizeX - 1);
			localY = 7 - localY - (sizeY - 1);
		} else if (mapRotation == 3) {
			tmp = localX;
			localX = 7 - localY - (sizeY - 1);
			localY = tmp;
		}
		return coords(zoneCoord, localX, localY, 0);
	}
})();
