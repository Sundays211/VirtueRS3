/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./draynormanor-and-village'),
		require('./edgeville-and-barbarian-village'),
		require('./lumbridge-and-lumbridge-swamp'),
		require('./varrock')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};