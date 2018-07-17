/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./cannon'),
	    require('./customisable-cape'),
		require('./food-types'),
		require('./holiday-items'),
		require('./music-box'),
		require('./potions'),
		require('./teletabs'),
		require('./misc-items')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};