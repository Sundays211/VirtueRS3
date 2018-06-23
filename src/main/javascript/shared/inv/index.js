/**
 *
 */
var common = require('./common');
var toolbelt = require('./toolbelt');
var equipment = require('./equipment');

module.exports = {
		/**
		 * Gives items to the player
		 *
		 * @param player The player to give items to
		 * @param objId The item to give
		 * @param count The number of items to give
		 * @param invId The inventory to add items to. Defaults to BACKPACK
		 */
		give : common.give,

		/**
		 * Removes items held by the player.
		 * WARNING: This method assumes the number of the item currently held is greater than or equal to the amount specified.
		 * If amount is more than the amount held, an exception will be thrown
		 *
		 * @param player The player to remove the item from
		 * @param objId The item to remove
		 * @param count The number of items to remove
		 * @param invId The inventory to remove items from. Defaults to BACKPACK
		 * @param slot The slot to remove from
		 */
		take : common.take,

		/**
		 * Checks whether the player currently possesses the specified item
		 * @param player The player to check
		 * @param objId The object to check
		 * @param count The number of the item required. Defaults to 1
		 * @param inv The inventory to check. Defaults to BACKPACK if not specified
		 * @return True if the inventory contains <em>at least</em> count items
		 */
		has : common.has,

		/**
		 * Checks how many of the specified item the player holds.
		 * For coins (if BACKPACK is the inventory), also checks money pouch
		 * @param player The player to check
		 * @param objId The object to check
		 * @param invId The inventory to check. Defaults to BACKPACK if not specified
		 */
		total : common.total,

		/**
		 * Checks how many of items with the specified params the player holds.
		 * @param player The player to check
		 * @param paramId The object param to check for
		 * @param invId The inventory to check. Defaults to BACKPACK if not specified
		 */
		totalparam : common.totalparam,

		/**
		 * Gets the total capacity of the provided inventory
		 *
		 * @param invId The ID of the inventory to check
		 * @return The capacity of the inventory
		 */
		size : common.size,

		/**
		 * Checks whether the player has space for the given number of items in their inventory
		 * @param player The player who's inventory needs to be checked
		 * @param inv The inventory to check. Uses BACKPACK if not specified
		 * @param count The number of spaces needed. Defaults to 1
		 */
		hasSpace : common.hasSpace,

		/**
		 * Checks the amount of free space the player has in the specified inventory
		 *
		 * @param player The player to check
		 * @param inv The inventory ID to check
		 * @return The number of empty slots
		 */
		freeSpace : common.freeSpace,

		/**
		 * Gets the number of slots currently used in the specified inventory
		 *
		 * @param player The player to check
		 * @param inv The inventory ID to check
		 * @return The number of used slots
		 */
		usedSpace : common.usedSpace,

		/**
		 * Replaces the item currently in the specified slot with the specified item
		 *
		 * @param player The player to remove the item from
		 * @param invId The inventory to set the slot in
		 * @param slot The slot to replace the item in
		 * @param objId The replacement item id
		 * @param count If an objId is specified, the number of replacement items. Defaults to 1
		 */
		setSlot : common.setSlot,

		/**
		 * Removes the item in the specified slot from the player's inventory
		 *
		 * @param player The player to remove the item from
		 * @param invId The inventory to set the slot in
		 * @param slot The slot to clear
		 */
		clearSlot : common.clearSlot,

		/**
		 * Gets the object ID at the given slot in the given inventory
		 * Returns -1 if there is no item in the slot
		 * @param player The player to check
		 * @param inv The inventory to check
		 * @param slot The slot to fetch from
		 */
		getObjId : common.getObjId,

		/**
		 * Gets the number of items in the given slot in the given inventory
		 * Returns 0 if there is no item in the slot
		 * @param player The player to check
		 * @param inv The inventory to check
		 * @param slot The slot to fetch from
		 */
		getCount : common.getCount,
		baseStock : common.baseStock,
		hasTool : toolbelt.hasTool,
		isWearing : equipment.isWearing
};