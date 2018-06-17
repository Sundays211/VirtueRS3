/**
 * Module to initialise the herblore script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./herbs'),
		require('./unfinished')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};