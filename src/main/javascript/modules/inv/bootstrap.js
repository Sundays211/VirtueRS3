/**
 * Module to initialise the inventory script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./toolbelt'),
		require('./worn-equipment'),
		require('./bank'),
		require('./backpack')
	];

	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};
