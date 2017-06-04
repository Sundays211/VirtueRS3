/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./15_Year_Anniversary'),
		require('./xmas_2005'),
		require('./xmas_2011')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};