/**
 * Module for inventory-related functions
 */
import { Player } from 'engine/models';
import { Inv } from 'engine/enums/inventory';
import _config from 'engine/config';
import _inv from 'engine/inv';
import { COINS_OBJ, INTEGER_MAX } from 'shared/const';
import { checkOverflow } from 'shared/util';

import { getCoinCount, addCoins, removeCoins } from './money-pouch';

/**
 * Gives items to the player
 *
 * @param player The player to give items to
 * @param objId The item to give
 * @param count The number of items to give
 * @param invId The inventory to add items to. Defaults to BACKPACK
 */
export function giveItem(
	player: Player,
	objId: number,
	count: number,
	invId: Inv = Inv.BACKPACK
) {

	if (objId === COINS_OBJ && invId === Inv.BACKPACK) {
		var coinsToAdd = Math.min(count, INTEGER_MAX - getCoinCount(player));
		addCoins(player, coinsToAdd);
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
export function takeItem(
	player: Player,
	objId: number,
	count: number,
	invId: Inv = Inv.BACKPACK,
	slot?: number
) {
	if (objId === COINS_OBJ && invId === Inv.BACKPACK) {
		var coinsToRemove = Math.min(count, getCoinCount(player));
		removeCoins(player, coinsToRemove);
		count -= coinsToRemove;
	}
	if (typeof (slot) !== "undefined") {
		ENGINE.delItem(player, invId, objId, count, slot);
	} else {
		ENGINE.delItem(player, invId, objId, count);
	}
}

/**
 * Checks whether the player currently possesses the specified item
 * @param player The player to check
 * @param objId The object to check
 * @param count The number of the item required. Defaults to 1
 * @param inv The inventory to check. Defaults to BACKPACK if not specified
 * @return True if the inventory contains <em>at least</em> count items
 */
export function hasItem(
	player: Player,
	objId: number,
	count: number = 1,
	inv?: Inv
): boolean {
	return invTotal(player, objId, inv) >= count;
}

/**
 * Checks how many of the specified item the player holds.
 * For coins (if BACKPACK is the inventory), also checks money pouch
 * @param player The player to check
 * @param objId The object to check
 * @param invId The inventory to check. Defaults to BACKPACK if not specified
 */
export function invTotal(
	player: Player,
	objId: number,
	invId: Inv = Inv.BACKPACK
): number {
	var held = ENGINE.itemTotal(player, invId, objId);
	if (objId === COINS_OBJ && invId === Inv.BACKPACK) {
		var moneyHeld = getCoinCount(player);
		held = checkOverflow(held, moneyHeld) ? INTEGER_MAX : held + moneyHeld;
	}
	return held;
}

/**
 * Checks how many of items with the specified params the player holds.
 * @param player The player to check
 * @param paramId The object param to check for
 * @param invId The inventory to check. Defaults to BACKPACK if not specified
 */
export function invTotalParam(player: Player, paramId: number, invId: Inv = Inv.BACKPACK): number {
	var count = 0;
	for (var slot = 0; slot < _inv.size(invId); slot++) {
		var objId = _inv.getObject(player, invId, slot);
		if (_config.objParam(objId, paramId)) {
			count += _inv.getCount(player, invId, slot);
		}
	}
	return count;
}

/**
 * Checks whether the player has space for the given number of items in their inventory
 * @param player The player who's inventory needs to be checked
 * @param inv The inventory to check. Uses BACKPACK if not specified
 * @param count The number of spaces needed. Defaults to 1
 */
export function invHasSpace(
	player: Player,
	count: number = 1,
	inv: Inv = Inv.BACKPACK
): boolean {
	return _inv.freeSpace(player, inv) >= count;
}

/**
 * Gets the number of slots currently used in the specified inventory
 *
 * @param player The player to check
 * @param inv The inventory ID to check
 * @return The number of used slots
 */
export function invUsedSpace(player: Player, inv: Inv): number {
	return _inv.size(inv) - _inv.freeSpace(player, inv);
}
