/**
 * 
 */
/* globals MAP_ENGINE */

module.exports = (function () {
	return {
		getCoords : getCoords,
		getCoordX : getCoordX,
		getCoordY : getCoordY,
		getSquareX : getSquareX,
		getSquareY : getSquareY,
		getLocalX : getLocalX,
		getLocalY : getLocalY,
		getLevel : getLevel,
		createDynamicSquare : createDynamicSquare,
		getDynamicSquare : getDynamicSquare,
		setZone : setZone,
		rotateZone : rotateZone,
		build : build,
		addLoc : addLoc,
		delLoc : delLoc,
		delay : delay
	};

	function getCoords (node) {
		return MAP_ENGINE.getCoords(node);
	}

	function getCoordX (coord) {
		return MAP_ENGINE.getCoordX(coord);
	}

	function getCoordY (coord) {
		return MAP_ENGINE.getCoordY(coord);
	}

	function getSquareX (coord) {
		return MAP_ENGINE.getSquareX(coord);
	}

	function getSquareY (coord) {
		return MAP_ENGINE.getSquareY(coord);
	}

	function getLocalX (coord) {
		return MAP_ENGINE.getLocalX(coord);
	}

	function getLocalY (coord) {
		return MAP_ENGINE.getLocalY(coord);
	}

	function getLevel (coord) {
		return MAP_ENGINE.getLevel(coord);
	}

	function createDynamicSquare () {
		return MAP_ENGINE.createArea();
	}

	function getDynamicSquare (coord) {
		return MAP_ENGINE.getDynamicSquare(coord);
	}

	function setZone (mapSquare, level, zoneX, zoneY, srcCoord, rotation) {
		MAP_ENGINE.setZone(mapSquare, zoneX, zoneY, level, srcCoord, rotation);
	}

	function rotateZone (mapSquare, level, zoneX, zoneY, rotation) {
		MAP_ENGINE.rotateZone(mapSquare, zoneX, zoneY, level, rotation);
	}

	function build (mapSquare) {
		MAP_ENGINE.buildArea(mapSquare);
	}

	function addLoc (locTypeId, coord, shape, rotation) {
		return MAP_ENGINE.addLoc(locTypeId, coord, shape, rotation);
	}

	function delLoc (coord, shape, rotation) {
		MAP_ENGINE.delLoc(coord, shape, rotation);
	}

	function delay (coord, task, ticks) {
		MAP_ENGINE.delay(coord, task, ticks);
	}
})();