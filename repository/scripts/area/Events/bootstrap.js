/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./xmas_2011')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};