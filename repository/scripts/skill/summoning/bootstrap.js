/**
 * Module to initialise the summoning script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./obelisk')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};