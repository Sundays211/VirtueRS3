/**
 * Module to initialise the prayer script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./bones'),
		require('./ashes')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};