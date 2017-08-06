/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./araxyte-lair'),
		require('./barrows-graveyard'),
		require('./misthalin-underground'),
		require('./paterdomus')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};