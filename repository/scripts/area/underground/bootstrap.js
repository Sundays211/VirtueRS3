/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./misthalin-underground')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};