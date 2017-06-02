/**
 * Module to initialise the cooking script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./furnace'),
		require('./anvil')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};