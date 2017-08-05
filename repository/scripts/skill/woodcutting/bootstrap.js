/**
 * Module to initialise the mining script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./basic')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};