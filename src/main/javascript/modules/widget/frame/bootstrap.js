/**
 * Module to initialise the game frame script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./experience-counter'),
		require('./ribbon'),
		require('./minimap'),
		require('./options'),
		require('./confirm')
	];

	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};
