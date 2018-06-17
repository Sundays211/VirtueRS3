/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./runecrafting-guild')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};