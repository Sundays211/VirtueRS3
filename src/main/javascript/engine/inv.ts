import { Player } from "./models";
import { Inv } from './enums/inventory';

/**
 * Gets the object ID at the given slot in the given inventory
 * Returns -1 if there is no item in the slot
 * @param player The player to check
 * @param inv The inventory to check
 * @param slot The slot to fetch from
 */
export function getObject (player: Player, inv: Inv, slot: number) {
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
export function getCount (player: Player, inv: Inv, slot: number) {
	var item = ENGINE.getItem(player, inv, slot);
	return item === null ? 0 : ENGINE.getCount(item);
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
export function setSlot (
	player: Player,
	invId: Inv,
	slot: number,
	objId: number,
	count: number = 1
) {
	ENGINE.setInvSlot(player, invId, slot, objId, count);
}

/**
 * Removes the item in the specified slot from the player's inventory
 *
 * @param player The player to remove the item from
 * @param invId The inventory to set the slot in
 * @param slot The slot to clear
 */
export function clearSlot (player: Player, invId: Inv, slot: number) {
	ENGINE.clearInvSlot(player, invId, slot);
}

/**
 * Gets the total capacity of the provided inventory
 *
 * @param invId The ID of the inventory to check
 * @return The capacity of the inventory
 */
export function size (invId: Inv): number {
	return CONFIG_ENGINE.invSize(invId);
}

/**
 * Checks the amount of free space the player has in the specified inventory
 *
 * @param player The player to check
 * @param inv The inventory ID to check
 * @return The number of empty slots
 */
export function freeSpace(player: Player, inv: Inv): number {
	return ENGINE.freeSpaceTotal(player, inv);
}

/**
 * Gets the number of items stored by default in the specified inventory.
 * This is usually used for shop default stockmarket
 *
 * @param inv The inventory to checks
 * @param objId The ID of the object to search for
 * @return The number of stock stored by default (zero if the item isn't offered)
 */
export function baseStock (inv: Inv, objId: number): number {
	return ENGINE.defaultItemTotal(inv, objId);
}

export default {
    getObject,
    getCount,
    setSlot,
    clearSlot,
    size,
    freeSpace,
    baseStock
}
