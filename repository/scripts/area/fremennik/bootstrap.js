/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./lunar-isle')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};