/**
 * Module to initialise the admin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./test-commands')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};