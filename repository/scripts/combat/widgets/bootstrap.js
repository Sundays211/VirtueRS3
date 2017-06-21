/**
 * Module to initialise the combat abilities system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./defence-book'),
	    require('./magic-book'),
	    require('./melee-book'),
	    require('./prayer-book'),
	    require('./ranged-book'),
	    require('./action-bar')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};