/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./experience-counter'),
		require('./hop-worlds'),
	    require('./lodestone'),
	    require('./world-map'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./treasure-hunter'),
		require('./confirm')
	];

	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};
