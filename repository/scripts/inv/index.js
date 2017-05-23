/**
 * Module to initialise the inventory script bindings.
 */
var toolbelt = require('./toolbelt');

module.exports = (function () {
	return {
		init : init,
		hasTool : toolbelt.hasTool
	};
	
	function init (scriptManager) {
		var modules = [
			toolbelt
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();