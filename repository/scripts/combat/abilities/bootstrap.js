/**
 * Module to initialise the combat abilities system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./tab-widgets')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};