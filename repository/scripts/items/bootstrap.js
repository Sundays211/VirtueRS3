/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./Cannon'),
	    require('./CustomisableCape'),
		require('./HolidayItems-TreasureHunterItems'),
		require('./MusicBox'),
		require('./RottenPotato')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};