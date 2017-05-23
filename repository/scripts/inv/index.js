/**
 * Module to initialise the inventory script bindings.
 */
var toolbelt = require('./toolbelt');
var moneyPouch = require('./money-pouch');

module.exports = (function () {
	return {
		init : init,
		hasTool : toolbelt.hasTool
	};
	
	function init (scriptManager) {
		var modules = [
			toolbelt,
			moneyPouch
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();