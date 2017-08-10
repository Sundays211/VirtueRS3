/**
 * Module to initialise the inventory script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./quest-list'),
		require('./cooks-assistant'),
		require('./witchs-house')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};