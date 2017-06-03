/**
 * Initialises the map command module
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./teleport'),
		require('./region')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};