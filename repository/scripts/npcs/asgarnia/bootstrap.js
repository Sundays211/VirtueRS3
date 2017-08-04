/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./brian'),
        require('./rommik'),
		require('./stubthumb')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};