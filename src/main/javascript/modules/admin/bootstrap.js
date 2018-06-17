/**
 * Module to initialise the admin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./commands'),
		require('./rotten-potato'),
		require('./jmod-toolbox')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};