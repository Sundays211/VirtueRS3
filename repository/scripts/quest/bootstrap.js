/**
 * Module to initialise the inventory script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./quest-list'),
		require('./cooks-assistant')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};