/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./clothears'),
		require('./creakyknees'),	
		require('./greasycheeks'),
		require('./smellytoes')	
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};