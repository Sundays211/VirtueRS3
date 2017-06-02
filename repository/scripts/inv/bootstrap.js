/**
 * Module to initialise the inventory script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./toolbelt'),
		require('./money-pouch'),
		require('./worn-equipment'),
		require('./bank'),
		require('./backpack'),
		require('./commands'),
		require('./exchange')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};