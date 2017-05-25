/**
 * Module to initialise the inventory script bindings.
 */
var toolbelt = require('./toolbelt');
var moneyPouch = require('./money-pouch');
var wornEquipment = require('./worn-equipment');
var bank = require('./bank');
var backpack = require('./backpack');
var inv = require('./core');

module.exports = (function () {
	return {
		init : init,
		give : inv.give,
		take : inv.take,
		has : inv.has,
		total : inv.total,
		size : inv.size,
		hasSpace : inv.hasSpace,
		freeSpace : inv.freeSpace,
		setSlot : inv.setSlot,
		clearSlot : inv.clearSlot,
		getObjId : inv.getObjId,
		baseStock : inv.baseStock,
		hasTool : toolbelt.hasTool,
		isWearing : wornEquipment.isWearing
	};
	
	function init (scriptManager) {
		var modules = [
			toolbelt,
			moneyPouch,
			wornEquipment,
			bank,
			backpack,
			require('./commands')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();