/**
 * Module to initialise the farming script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./plant-pots'),
		require('./flower-patch'),
		require('./growth-cycle')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};