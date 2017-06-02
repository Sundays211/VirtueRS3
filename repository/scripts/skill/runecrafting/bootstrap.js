/**
 * Module to initialise the runecrafting script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./runecrafting-alter'),
		require('./mysterious-runes'),
		require('./exit-portal')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};
