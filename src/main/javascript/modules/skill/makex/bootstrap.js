/**
 *  Module to initialise the make-X interface script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./progress'),
		require('./selection')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};