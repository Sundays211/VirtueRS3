/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./resource-dungeons')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};