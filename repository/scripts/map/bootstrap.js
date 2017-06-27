/**
 * Initialises the map command module
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./commands/teleport'),
		require('./commands/region')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};