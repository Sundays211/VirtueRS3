import { Player } from "./models";
import { Inv } from './enums/inventory';


export default class {
	/**
	 * Gets the object ID at the given slot in the given inventory
	 * Returns -1 if there is no item in the slot
	 * @param player The player to check
	 * @param inv The inventory to check
	 * @param slot The slot to fetch from
	 */
	public static getObject (player: Player, inv: Inv, slot: number) {
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
	public static getCount (player: Player, inv: Inv, slot: number) {
		var item = ENGINE.getItem(player, inv, slot);
		return item === null ? 0 : ENGINE.getCount(item);
	}

	/**
	 * Resends the item in the specified inventory slot to the player's client.
	 * Usually used if the client gets out-of-sync with the server
	 * @param player The player to send the inventory to
	 * @param invId The inventory containing the item
	 * @param slot The slot to send
	 */
	public static resendSlot (player: Player, inv: Inv, slot: number) {
		ENGINE.sendInvSlot(player, inv, slot);
	}

	/**
	 * Sends the specified inventory to the player's client
	 * @param player The player to send the inventory to
	 * @param invId The inventory to send
	 */
	public static send (player: Player, inv: Inv) {
		ENGINE.sendInv(player, inv);
	}

	/**
	 * Sends the specified container to another player. Mainly used for trade.
	 * @param player The player who owns the container
	 * @param other The player to send the container to
	 * @param inv The inventory to send.
	 */
	public static sendOther (player: Player, other: Player, inv: Inv) {
		ENGINE.sendInvTo(player, other, inv);
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
	public static setSlot (
		player: Player,
		invId: Inv,
		slot: number,
		objId: number,
		count: number = 1
	) {
		if (objId === -1) {
			this.clearSlot(player, invId, slot);
		} else {
			ENGINE.setInvSlot(player, invId, slot, objId, count);
		}
	}

	/**
	 * Removes the item in the specified slot from the player's inventory
	 *
	 * @param player The player to remove the item from
	 * @param invId The inventory to set the slot in
	 * @param slot The slot to clear
	 */
	public static clearSlot (player: Player, invId: Inv, slot: number) {
		ENGINE.clearInvSlot(player, invId, slot);
	}

	/**
	 * Gets the total capacity of the provided inventory
	 *
	 * @param invId The ID of the inventory to check
	 * @return The capacity of the inventory
	 */
	public static size (invId: Inv): number {
		return CONFIG_ENGINE.invSize(invId);
	}

	/**
	 * Checks the amount of free space the player has in the specified inventory
	 *
	 * @param player The player to check
	 * @param inv The inventory ID to check
	 * @return The number of empty slots
	 */
	public static freeSpace(player: Player, inv: Inv): number {
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
	public static baseStock (inv: Inv, objId: number): number {
		return ENGINE.defaultItemTotal(inv, objId);
	}
}
