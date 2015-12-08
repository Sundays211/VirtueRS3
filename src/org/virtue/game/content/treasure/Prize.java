package org.virtue.game.content.treasure;

import org.virtue.game.entity.player.container.Item;

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
	 * The cashout value.
	 */
	private final int cashoutValue;
	
	/**
	 * Constructs a new {@code Prize} {@code Object}.
	 * @param item The item.
	 * @param rarity The rarity.
	 * @param category The category.
	 * @param cashoutValue The cashout value.
	 */
	public Prize(Item item, Rarity rarity, PrizeCategory category, int cashoutValue) {
		this.item = item;
		this.rarity = rarity;
		this.category = category;
		this.cashoutValue = cashoutValue;
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

	/**
	 * Gets the cashout value.
	 * @return The cashout value.
	 */
	public int getCashoutValue() {
		return cashoutValue;
	}
}