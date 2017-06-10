/**
 * 
 */
var common = require('./common');
var object = require('./object');
var location = require('./location');
var entity = require('./entity');

module.exports = {
	getCoordX : common.getCoordX,
	getCoordY : common.getCoordY,
	getLevel : common.getLevel,
	getCoords : common.getCoords,
	setCoords : entity.setCoords,
	dropObj : object.drop,
	addLoc : location.add,
	getLoc : location.get,
	delLoc : location.del,
	locAnim : location.anim,
	delayLoc : location.delay
};