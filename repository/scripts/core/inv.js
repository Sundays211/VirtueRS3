/**
 * Module for inventory-related functions
 */
/* globals Inv, ENGINE, MoneyPouch, COINS, configApi */
var util = require('./util');

module.exports = init();

function init() {
	var inv = {
		give : give,
		take : take,
		setSlot : setSlot,
		clearSlot : clearSlot,
		has : has,
		total : invTotal,
		size : invSize,
		hasSpace : hasSpace,
		freeSpace : freeSpace,
		getObjId : getObjId,
		baseStock : baseStock,
		isWearing : isWearing
	};
	
	return inv;
	
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
		
		if (objId == COINS) {
			var coinsToAdd = Math.min(count, util.INTEGER_MAX-MoneyPouch.getCoinCount(player));
			MoneyPouch.addCoins(player, coinsToAdd);
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
	 */
	function take (player, objId, count, invId) {
		invId = typeof invId !== "undefined" ? invId : Inv.BACKPACK;
		
		if (objId == COINS && invId == Inv.BACKPACK) {
			var coinsToRemove = Math.min(count, MoneyPouch.getCoinCount(player));
			MoneyPouch.removeCoins(player, coinsToRemove);
			count -= coinsToRemove;
		}
		ENGINE.delItem(player, invId, objId, count);
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
		if (objId == COINS && invId == Inv.BACKPACK) {
			var moneyHeld = MoneyPouch.getCoinCount(player);
			held = util.checkOverflow(held, moneyHeld) ? util.INTEGER_MAX : held + moneyHeld;
		}
		return held;
	}
	
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
	
	function freeSpace(player, inv) {
		return ENGINE.freeSpaceTotal(player, inv);
	}
	
	function getObjId (player, inv, slot) {
		var item = ENGINE.getItem(player, inv, slot);
		return item === null ? -1 : ENGINE.getId(item);
	}
	
	function baseStock (player, inv, objId) {
		return ENGINE.defaultItemTotal(player, inv, objId);
	}
	
	function isWearing (player, objId) {
		return has(player, objId, 1, Inv.EQUIPMENT);
	}
}