/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./christmas-cracker'),
		require('./dyes')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};