/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./mort-myre-swamp'),
		require('./mortton')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};