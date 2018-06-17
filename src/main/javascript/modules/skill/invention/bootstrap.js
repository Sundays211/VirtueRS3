/**
 * Module to initialise the herblore script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./workbench'),
		require('./disassembly'),
		require('./commands')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};