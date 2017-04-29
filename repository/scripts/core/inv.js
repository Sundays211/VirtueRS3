/**
 * Module for inventory-related functions
 */
/* globals Inv, ENGINE, MoneyPouch, COINS */
var util = require('./util');

module.exports = init();

function init() {
	var inv = {
		give : give,
		take : take,
		has : has,
		total : invTotal,
		hasSpace : hasSpace,
	};
	
	return inv;
	
	function give (player, objId, count) {
		if (objId == COINS) {
			var coinsToAdd = Math.min(count, util.INTEGER_MAX-MoneyPouch.getCoinCount(player));
			MoneyPouch.addCoins(player, coinsToAdd);
			count -= coinsToAdd;
		}
		if (count > 0) {
			ENGINE.addItem(player, Inv.BACKPACK, objId, count);
		}
	}
	
	/**
	 * Removes items held by the player. 
	 * WARNING: This method assumes the number of the item currently held is greater than or equal to the amount specified.
	 * If amount is more than the amount held, and exception will be thrown
	 */
	function take (player, objId, count) {
		if (objId == COINS) {
			var coinsToRemove = Math.min(count, MoneyPouch.getCoinCount(player));
			MoneyPouch.removeCoins(player, coinsToRemove);
			count -= coinsToRemove;
		}
		ENGINE.delItem(player, Inv.BACKPACK, objId, count);
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
	 * @param inv The inventory to check. Defaults to BACKPACK if not specified
	 */
	function invTotal (player, objId, inv) {
		inv = typeof inv !== "undefined" ? inv : Inv.BACKPACK;
		
		var held = ENGINE.itemTotal(player, inv, objId);
		if (objId == COINS && inv == Inv.BACKPACK) {
			var moneyHeld = MoneyPouch.getCoinCount(player);
			held = util.checkOverflow(held, moneyHeld) ? util.INTEGER_MAX : held + moneyHeld;
		}
		return held;
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
		
		return ENGINE.freeSpaceTotal(player, inv) >= count;
	}
}