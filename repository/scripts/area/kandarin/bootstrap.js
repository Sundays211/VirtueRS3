/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./piscatoris-fishing-colony')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};