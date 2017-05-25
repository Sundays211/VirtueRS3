/**
 * Module to initialise the inventory script bindings.
 */
var toolbelt = require('./toolbelt');
var moneyPouch = require('./money-pouch');
var wornEquipment = require('./worn-equipment');
var bank = require('./bank');
var backpack = require('./backpack');

module.exports = (function () {
	return {
		init : init,
		hasTool : toolbelt.hasTool
	};
	
	function init (scriptManager) {
		var modules = [
			toolbelt,
			moneyPouch,
			wornEquipment,
			bank,
			backpack
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();