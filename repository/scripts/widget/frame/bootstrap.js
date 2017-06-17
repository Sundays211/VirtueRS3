/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./emotes-tab'),
	    require('./Lodestone'),
	    require('./world-map'),
		require('./overlay'),
		require('./PlayerExamine'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./confirm')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};