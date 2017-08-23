/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./location-picking'),
		require('./player-moderator-room'),
		require('./sign-posts'),
		require('./wilderness')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};