/**
 * Module to initialise the combat system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./widgets')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};