/**
 * Module to initialise the bank script bindings.
 */
var booth = require('./booth');

module.exports = function (scriptManager) {
	var modules = [
		booth
	];

	for (var i in modules) {
		modules[i].init(scriptManager);
	}
}
