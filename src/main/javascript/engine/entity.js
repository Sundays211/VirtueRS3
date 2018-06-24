/**
 * 
 */
/* globals ENGINE, ENTITY_ENGINE */

module.exports = (function () {
	return {
		moveTo : moveTo,
		moveAdjacent : moveAdjacent,
		setCoords : setCoords,
		getCoords : getCoords,
		say : say,
		getName : getName,
		setBas : setBas,
		forceMove : forceMove
	};
	
	function moveTo (entity, coords, onReachedTarget) {
		if (typeof(onReachedTarget) !== undefined) {
			ENTITY_ENGINE.moveTo(entity, coords, onReachedTarget);
		} else {
			ENTITY_ENGINE.moveTo(entity, coords);
		}
	}

	function moveAdjacent (entity) {
		ENTITY_ENGINE.moveAdjacent(entity);
	}

	function setCoords (entity, coords) {
		ENTITY_ENGINE.setCoords(entity, coords);
	}
	
	function getCoords (entity) {
		return ENTITY_ENGINE.getCoords(entity);
	}
	
	function say (entity, message) {
		ENTITY_ENGINE.say(entity, message);
	}
	
	function getName (entity) {
		return ENTITY_ENGINE.getName(entity);
	}
	
	function setBas (entity, basId) {//TODO: Move this into the entity api
		ENGINE.setRenderAnim(entity, basId);
	}
	
	function forceMove (entity, coords, length, finalCoords, totalLength) {
		if (typeof(finalCoords) !== "undefined") {
			ENTITY_ENGINE.forceMove(entity, coords, length, finalCoords, totalLength);
		} else {
			ENTITY_ENGINE.forceMove(entity, coords, length);
		}
	}
	
})();