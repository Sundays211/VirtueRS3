package org.virtue.model.content.treasure;

import org.virtue.model.entity.player.inv.Item;

/**
 * Represents a prize.
 * @author Emperor
 *
 */
public final class Prize {

	/**
	 * The item.
	 */
	private final Item item;
	
	/**
	 * The prize category.
	 */
	private final PrizeCategory category;
	
	/**
	 * The prize rarity.
	 */
	private final Rarity rarity;
	
	/**
	 * Constructs a new {@code Prize} {@code Object}.
	 * @param item The item.
	 * @param rarity The rarity.
	 * @param category The category.
	 */
	public Prize(Item item, Rarity rarity, PrizeCategory category) {
		this.item = item;
		this.rarity = rarity;
		this.category = category;
	}

	/**
	 * Gets the item value.
	 * @return The item.
	 */
	public Item getItem() {
		return item;
	}

	/**
	 * Gets the category value.
	 * @return The category.
	 */
	public PrizeCategory getCategory() {
		return category;
	}

	/**
	 * Gets the rarity value.
	 * @return The rarity.
	 */
	public Rarity getRarity() {
		return rarity;
	}
}