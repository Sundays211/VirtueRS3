/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	require('./JModToolBox'),
	    require('./Lodestone'),
	    require('./worldmap'),
	    require('./skilltab'),
		require('./overlay'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./confirm')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};