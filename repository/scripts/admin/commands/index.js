/**
 * 
 */
module.exports.init = function (scriptManager) {
	var modules = [
		require('./runclientscript'),
		require('./set-var'),
		require('./set-title'),
		require('./freeze-player'),
		require('./npc-spawns'),
		require('./player-model'),
		require('./misc'),
		require('./test')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};