/**
 * Module to initialise the fletching script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./string-bow'),
		require('./feather-arrow'),
		require('./fletch-log')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};