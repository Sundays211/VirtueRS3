package org.virtue.game.content.skills.magic;

import org.virtue.game.entity.player.inv.Item;

/**
 * Represents a rune.
 * @author Emperor
 *
 */
public enum Runes {

	MIND(558),
	AIR(556),
	WATER(555),
	EARTH(557),
	DEATH(565),
	FIRE(554),
	BLOOD(565),
	ASTRAL(9075)
	;

	/**
	 * The item id.
	 */
	private final int itemId;
	
	/**
	 * Constructs a new {@code Runes} {@code Object}.
	 * @param itemId The item id.
	 */
	private Runes(int itemId) {
		this.itemId = itemId;
	}
	
	/**
	 * Gets the item representing this rune.
	 * @param amount The amount.
	 * @return The item object.
	 */
	public Item get(int amount) {
		return Item.create(itemId, amount);
	}
	
	/**
	 * Gets the item id.
	 * @return The item id.
	 */
	public int getItemId() {
		return itemId;
	}
}