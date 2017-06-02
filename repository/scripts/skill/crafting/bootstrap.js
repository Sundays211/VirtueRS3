/**
 * Module to initialise the crafting script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./loom'),
		require('./tanning'),
		require('./spinning-wheel'),
		require('./pottery-wheel'),
		require('./pottery-oven'),
		require('./leather'),
		require('./battlestaff'),
		require('./gems')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};