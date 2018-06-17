/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./araxyte-lair'),
		require('./barrows-graveyard'),	
		require('./paterdomus'),
		require('./witches-house-cellar')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};