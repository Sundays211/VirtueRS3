package org.virtue.game.entity.combat.impl.ability.keybind;

import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.player.container.Item;

/**
 * Represents a key-bind slot.
 * 
 * @author Emperor
 * 
 */
public final class Keybind {

	/**
	 * The ability id.
	 */
	private int abilityId;

	/**
	 * The item id.
	 */
	private int itemId;

	/**
	 * The action bar slot.
	 */
	private int slot;

	/**
	 * Constructs a new {@code Keybind} {@code Object}.
	 * 
	 * @param slot
	 *            The action bar slot.
	 */
	public Keybind(int slot) {
		this.slot = slot;
	}

	/**
	 * Gets the client id.
	 * 
	 * @return The client id.
	 */
	public int getClientId() {
		if (abilityId < 1) {
			return 0;
		}
		return ActionBar.getAbilities().get(abilityId).getClientId();
	}

	/**
	 * Checks if this keybind is for an item.
	 * 
	 * @return {@code True} if so.
	 */
	public boolean hasItemBound() {
		return itemId > 0;
	}

	/**
	 * Binds an item.
	 * 
	 * @param item
	 *            The item.
	 */
	public void bind(Item item) {
		this.setItemId(item.getId());
		this.setAbilityId(-1);
	}

	/**
	 * Binds an ability.
	 * 
	 * @param abilityId
	 *            The ability id.
	 */
	public void bind(int abilityId) {
		this.setAbilityId(abilityId);
		this.setItemId(-1);
	}

	/**
	 * @return the abilityId
	 */
	public int getAbilityId() {
		return abilityId;
	}

	/**
	 * @param abilityId
	 *            the abilityId to set
	 */
	public void setAbilityId(int abilityId) {
		this.abilityId = abilityId;
	}

	/**
	 * @return the itemId
	 */
	public int getItemId() {
		return itemId;
	}

	/**
	 * @param itemId
	 *            the itemId to set
	 */
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	/**
	 * @return the slot
	 */
	public int getSlot() {
		return slot;
	}

	/**
	 * @param slot
	 *            the slot to set
	 */
	public void setSlot(int slot) {
		this.slot = slot;
	}

}