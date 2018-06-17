/**
 * Module to initialise the inventory script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./trade-widget'),
		require('./loan')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};