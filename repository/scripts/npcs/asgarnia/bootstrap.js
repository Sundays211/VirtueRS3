/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./boy'),
		require('./brian'),
        require('./rommik'),
		require('./stubthumb'),
		require('./thurgo'),
		require('./wydin')
		
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};