/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	
	    require('./bob'),
		require('./diango'),
	    require('./fred-the-farmer'),
		require('./jambon'),
		require('./lumbridge-sage')	
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};