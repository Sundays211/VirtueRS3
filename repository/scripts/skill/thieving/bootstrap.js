/**
 *  Module to initialise the thieving script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./stall'),
		require('./pickpocket'),
		require('./blackjack')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};