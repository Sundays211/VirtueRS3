package org.virtue.game.entity.combat.impl.formula;

/**
 * The {@code Weakness} enum represents a type of weakness in combat.
 * 
 * @author Albert Beaupre
 */
public enum Weakness {
	STRONG(7.5), NEUTRAL(5.5), WEAK(4), EXTRA_WEAK(10 / 3);

	private final double modifier;

	/**
	 * Constructs a new {@code Weakness} from the specified {@code modifier}.
	 * 
	 * @param modifier the modifier of this weakness
	 */
	private Weakness(double modifier) {
		this.modifier = modifier;
	}

	/**
	 * Returns the weakness modifier of this {@code Weakness}.
	 * 
	 * @return the weakness modifier
	 */
	public double getWeaknessModifier() {
		return modifier;
	}
}