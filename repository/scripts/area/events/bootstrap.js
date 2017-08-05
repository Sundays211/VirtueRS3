/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./15-year-anniversary'),
		require('./beach'),
		require('./halloween-2007'),
		require('./xmas-2005'),
		require('./xmas-2006'),
		require('./xmas-2011')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};