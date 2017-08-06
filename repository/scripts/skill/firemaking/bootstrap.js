/**
 * Module to initialise the firemaking script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./bonfire'),
		require('./logs')
	];

	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};