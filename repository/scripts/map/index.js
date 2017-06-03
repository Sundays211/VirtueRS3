/**
 * 
 */
var common = require('./common');
var object = require('./object');
var location = require('./location');

module.exports = {
	getCoordX : common.getCoordX,
	getCoordY : common.getCoordY,
	getLevel : common.getLevel,
	getCoords : common.getCoords,
	setCoords : common.setCoords,
	dropObj : object.drop,
	addLoc : location.add,
	getLoc : location.get,
	delLoc : location.del,
	delayLoc : location.delay
};