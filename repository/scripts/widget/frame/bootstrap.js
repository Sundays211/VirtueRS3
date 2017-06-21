/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./emotes-tab'),
		require('./hero-skill-tab'),
	    require('./lodestone'),
	    require('./world-map'),
		require('./overlay'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./upgrades-and-extras'),
		require('./confirm')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};