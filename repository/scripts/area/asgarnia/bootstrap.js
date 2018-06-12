/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./dark-wizards-tower'),
		require('./falador'),
		require('./ice-mountain'),
		require('./port-sarim'),
		require('./rimmington'),
		require('./taverley')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};