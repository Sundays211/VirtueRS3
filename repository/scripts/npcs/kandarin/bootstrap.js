/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./monk'),
		require('./wizard-cromperty')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};