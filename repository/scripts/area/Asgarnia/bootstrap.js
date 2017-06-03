/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./DarkWizardsTower'),
		require('./IceMountain'),
		require('./MudskipperPoint'),
		require('./Rimmington'),
		require('./Taverley')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};