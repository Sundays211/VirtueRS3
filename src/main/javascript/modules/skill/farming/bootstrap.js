/**
 * Module to initialise the farming script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./plant-pots'),
		require('./compost-bin'),
		require('./flower-patch'),
		require('./herb-patch'),
		require('./tree-patch'),
		require('./allotment'),
		require('./growth-cycle')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};