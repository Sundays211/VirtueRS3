/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./emotes-tab'),
		require('./experience-counter'),
		require('./hero-skill-tab'),
		require('./hero-widget'),
		require('./hop-worlds'),
	    require('./lodestone'),
	    require('./world-map'),
		require('./overlay'),
		require('./report'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./treasure-hunter'),
		require('./upgrades-and-extras'),
		require('./confirm')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};