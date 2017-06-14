/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./dark-wizards-tower'),
		require('./ice-mountain'),
		require('./mudskipper-point'),
		require('./rimmington'),
		require('./falador'),
		require('./taverley')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};