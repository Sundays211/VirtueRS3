/**
 * Module for inventory-related functions
 */
/* globals Inv, ENGINE, configApi */
var CONST = require('../const');
var util = require('../util');
var config = require('engine/config');
var moneyPouch = require('./money-pouch');

module.exports = init();

function init() {
	return {
			/**
			 * Gives items to the player
			 *
			 * @param player The player to give items to
			 * @param objId The item to give
			 * @param count The number of items to give
			 * @param invId The inventory to add items to. Defaults to BACKPACK
			 */
			give : give,

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
			take : take,

			/**
			 * Checks whether the player currently possesses the specified item
			 * @param player The player to check
			 * @param objId The object to check
			 * @param count The number of the item required. Defaults to 1
			 * @param inv The inventory to check. Defaults to BACKPACK if not specified
			 * @return True if the inventory contains <em>at least</em> count items
			 */
			has : has,

			/**
			 * Checks how many of the specified item the player holds.
			 * For coins (if BACKPACK is the inventory), also checks money pouch
			 * @param player The player to check
			 * @param objId The object to check
			 * @param invId The inventory to check. Defaults to BACKPACK if not specified
			 */
			total : invTotal,

			/**
			 * Checks how many of items with the specified params the player holds.
			 * @param player The player to check
			 * @param paramId The object param to check for
			 * @param invId The inventory to check. Defaults to BACKPACK if not specified
			 */
			totalparam : totalparam,

			/**
			 * Gets the total capacity of the provided inventory
			 *
			 * @param invId The ID of the inventory to check
			 * @return The capacity of the inventory
			 */
			size : invSize,

			/**
			 * Checks whether the player has space for the given number of items in their inventory
			 * @param player The player who's inventory needs to be checked
			 * @param inv The inventory to check. Uses BACKPACK if not specified
			 * @param count The number of spaces needed. Defaults to 1
			 */
			hasSpace : hasSpace,

			/**
			 * Checks the amount of free space the player has in the specified inventory
			 *
			 * @param player The player to check
			 * @param inv The inventory ID to check
			 * @return The number of empty slots
			 */
			freeSpace : freeSpace,

			/**
			 * Gets the number of slots currently used in the specified inventory
			 *
			 * @param player The player to check
			 * @param inv The inventory ID to check
			 * @return The number of used slots
			 */
			usedSpace : usedSpace,

			/**
			 * Replaces the item currently in the specified slot with the specified item
			 *
			 * @param player The player to remove the item from
			 * @param invId The inventory to set the slot in
			 * @param slot The slot to replace the item in
			 * @param objId The replacement item id
			 * @param count If an objId is specified, the number of replacement items. Defaults to 1
			 */
			setSlot : setSlot,

			/**
			 * Removes the item in the specified slot from the player's inventory
			 *
			 * @param player The player to remove the item from
			 * @param invId The inventory to set the slot in
			 * @param slot The slot to clear
			 */
			clearSlot : clearSlot,
			getObjId : getObjId,
			getCount : getCount,
			baseStock : baseStock
	};

	/**
	 * Gives items to the player
	 *
	 * @param player The player to give items to
	 * @param objId The item to give
	 * @param count The number of items to give
	 * @param invId The inventory to add items to. Defaults to BACKPACK
	 */
	function give (player, objId, count, invId) {
		invId = typeof invId !== "undefined" ? invId : Inv.BACKPACK;

		if (objId == CONST.COINS) {
			var coinsToAdd = Math.min(count, CONST.INTEGER_MAX-moneyPouch.getCoinCount(player));
			moneyPouch.addCoins(player, coinsToAdd);
			count -= coinsToAdd;
		}

		if (count > 0) {
			ENGINE.addItem(player, invId, objId, count);
		}
	}

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
	function take (player, objId, count, invId, slot) {
		invId = typeof invId !== "undefined" ? invId : Inv.BACKPACK;

		if (objId == CONST.COINS && invId == Inv.BACKPACK) {
			var coinsToRemove = Math.min(count, moneyPouch.getCoinCount(player));
			moneyPouch.removeCoins(player, coinsToRemove);
			count -= coinsToRemove;
		}
		if (typeof(slot) !== "undefined") {
			ENGINE.delItem(player, invId, objId, count, slot);
		} else {
			ENGINE.delItem(player, invId, objId, count);
		}
	}

	/**
	 * Replaces the item currently in the specified slot with the specified item
	 *
	 * @param player The player to remove the item from
	 * @param invId The inventory to set the slot in
	 * @param slot The slot to replace the item in
	 * @param objId The replacement item id
	 * @param count If an objId is specified, the number of replacement items. Defaults to 1
	 */
	function setSlot (player, invId, slot, objId, count) {
		count = typeof count !== "undefined" ? count : 1;
		ENGINE.setInvSlot(player, invId, slot, objId, count);
	}

	/**
	 * Removes the item in the specified slot from the player's inventory
	 *
	 * @param player The player to remove the item from
	 * @param invId The inventory to set the slot in
	 * @param slot The slot to clear
	 */
	function clearSlot (player, invId, slot) {
		ENGINE.clearInvSlot(player, invId, slot);
	}

	/**
	 * Checks whether the player currently possesses the specified item
	 * @param player The player to check
	 * @param objId The object to check
	 * @param count The number of the item required. Defaults to 1
	 * @param inv The inventory to check. Defaults to BACKPACK if not specified
	 * @return True if the inventory contains <em>at least</em> count items
	 */
	function has (player, objId, count, inv) {
		count = typeof count !== "undefined" ? count : 1;
		return invTotal(player, objId, inv) >= count;
	}

	/**
	 * Checks how many of the specified item the player holds.
	 * For coins (if BACKPACK is the inventory), also checks money pouch
	 * @param player The player to check
	 * @param objId The object to check
	 * @param invId The inventory to check. Defaults to BACKPACK if not specified
	 */
	function invTotal (player, objId, invId) {
		invId = typeof invId !== "undefined" ? invId : Inv.BACKPACK;

		var held = ENGINE.itemTotal(player, invId, objId);
		if (objId == CONST.COINS && invId == Inv.BACKPACK) {
			var moneyHeld = moneyPouch.getCoinCount(player);
			held = util.checkOverflow(held, moneyHeld) ? CONST.INTEGER_MAX : held + moneyHeld;
		}
		return held;
	}

	/**
	 * Checks how many of items with the specified params the player holds.
	 * @param player The player to check
	 * @param paramId The object param to check for
	 * @param invId The inventory to check. Defaults to BACKPACK if not specified
	 */
	function totalparam (player, paramId, invId) {
		invId = typeof invId !== "undefined" ? invId : Inv.BACKPACK;
		var count = 0;
		for (var slot=0; slot<invSize(invId); slot++) {
			var objId = getObjId(player, invId, slot);
			if (config.objParam(objId, paramId)) {
				count += getCount(player, invId, slot);
			}
		}
		return count;
	}

	/**
	 * Gets the total capacity of the provided inventory
	 *
	 * @param invId The ID of the inventory to check
	 * @return The capacity of the inventory
	 */
	function invSize (invId) {
		return configApi.invSize(invId);
	}

	/**
	 * Checks whether the player has space for the given number of items in their inventory
	 * @param player The player who's inventory needs to be checked
	 * @param inv The inventory to check. Uses BACKPACK if not specified
	 * @param count The number of spaces needed. Defaults to 1
	 */
	function hasSpace(player, count, inv) {
		count = typeof count !== "undefined" ? count : 1;
		inv = typeof inv !== "undefined" ? inv : Inv.BACKPACK;

		return freeSpace(player, inv) >= count;
	}

	/**
	 * Checks the amount of free space the player has in the specified inventory
	 *
	 * @param player The player to check
	 * @param inv The inventory ID to check
	 * @return The number of empty slots
	 */
	function freeSpace(player, inv) {
		return ENGINE.freeSpaceTotal(player, inv);
	}

	/**
	 * Gets the number of slots currently used in the specified inventory
	 *
	 * @param player The player to check
	 * @param inv The inventory ID to check
	 * @return The number of used slots
	 */
	function usedSpace(player, inv) {
		return invSize(inv) - freeSpace(player, inv);
	}

	/**
	 * Gets the object ID at the given slot in the given inventory
	 * Returns -1 if there is no item in the slot
	 * @param player The player to check
	 * @param inv The inventory to check
	 * @param slot The slot to fetch from
	 */
	function getObjId (player, inv, slot) {
		var item = ENGINE.getItem(player, inv, slot);
		return item === null ? -1 : ENGINE.getId(item);
	}

	/**
	 * Gets the number of items in the given slot in the given inventory
	 * Returns -1 if there is no item in the slot
	 * @param player The player to check
	 * @param inv The inventory to check
	 * @param slot The slot to fetch from
	 */
	function getCount (player, inv, slot) {
		var item = ENGINE.getItem(player, inv, slot);
		return item === null ? 0 : ENGINE.getCount(item);
	}

	function baseStock (player, inv, objId) {
		return ENGINE.defaultItemTotal(player, inv, objId);
	}
}