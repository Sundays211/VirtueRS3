/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./bob'),
		require('./diango'),
	    require('./fred-the-farmer'),
		require('./gillie-groats'),
		require('./jambon'),
		require('./lumbridge-guardsman'),
		require('./lumbridge-sage'),
		require('./mysterious-old-man'),
		require('./seth-groats'),
		require('./wardsman'),
		require('./wizard-valina')	
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};