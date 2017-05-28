/**
 * Module to initialise the inventory script bindings.
 */
var toolbelt = require('./toolbelt');
var moneyPouch = require('./money-pouch');
var wornEquipment = require('./worn-equipment');
var inv = require('./core');

module.exports = (function () {
	return {
		init : init,
		
		/**
		 * Gives items to the player
		 * 
		 * @param player The player to give items to
		 * @param objId The item to give
		 * @param count The number of items to give
		 * @param invId The inventory to add items to. Defaults to BACKPACK
		 */
		give : inv.give,
		
		/**
		 * Removes items held by the player. 
		 * WARNING: This method assumes the number of the item currently held is greater than or equal to the amount specified.
		 * If amount is more than the amount held, an exception will be thrown
		 * 
		 * @param player The player to remove the item from
		 * @param objId The item to remove
		 * @param count The number of items to remove
		 * @param invId The inventory to remove items from. Defaults to BACKPACK
		 */
		take : inv.take,
		
		/**
		 * Checks whether the player currently possesses the specified item
		 * @param player The player to check
		 * @param objId The object to check
		 * @param count The number of the item required. Defaults to 1
		 * @param inv The inventory to check. Defaults to BACKPACK if not specified
		 * @return True if the inventory contains <em>at least</em> count items
		 */
		has : inv.has,
		
		/**
		 * Checks how many of the specified item the player holds.
		 * For coins (if BACKPACK is the inventory), also checks money pouch
		 * @param player The player to check
		 * @param objId The object to check
		 * @param invId The inventory to check. Defaults to BACKPACK if not specified
		 */
		total : inv.total,
		
		/**
		 * Gets the total capacity of the provided inventory
		 * 
		 * @param invId The ID of the inventory to check
		 * @return The capacity of the inventory
		 */
		size : inv.size,
		
		/**
		 * Checks whether the player has space for the given number of items in their inventory
		 * @param player The player who's inventory needs to be checked
		 * @param inv The inventory to check. Uses BACKPACK if not specified
		 * @param count The number of spaces needed. Defaults to 1
		 */
		hasSpace : inv.hasSpace,
		
		/**
		 * Checks the amount of free space the player has in the specified inventory
		 * 
		 * @param player The player to check
		 * @param inv The inventory ID to check
		 * @return The number of empty slots
		 */
		freeSpace : inv.freeSpace,
		
		/**
		 * Replaces the item currently in the specified slot with the specified item 
		 * 
		 * @param player The player to remove the item from
		 * @param invId The inventory to set the slot in
		 * @param slot The slot to replace the item in
		 * @param objId The replacement item id
		 * @param count If an objId is specified, the number of replacement items. Defaults to 1
		 */
		setSlot : inv.setSlot,
		
		/**
		 * Removes the item in the specified slot from the player's inventory
		 * 
		 * @param player The player to remove the item from
		 * @param invId The inventory to set the slot in
		 * @param slot The slot to clear
		 */
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
			require('./bank'),
			require('./backpack'),
			require('./commands'),
			require('./exchange')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();