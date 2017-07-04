package org.virtue.game.entity.combat.impl.combo;

import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.AttackHandler;

/**
 * Represents an attack.
 * @author Emperor
 *
 */
public final class SwitchAttack {

	/**
	 * If the attack is close-range.
	 */
	private final boolean meleeRange;
	
	/**
	 * The combat style of this attack.
	 */
	private final CombatStyle style;
	
	/**
	 * The attack handler.
	 */
	private AttackHandler handler;
	
	/**
	 * Constructs a new {@code SwitchAttack} {@code Object}.
	 * @param style The combat style.
	 * @param handler The attack handler.
	 */
	public SwitchAttack(CombatStyle style, AttackHandler handler) {
		this(style == CombatStyle.MELEE, style, handler);
	}
	
	/**
	 * Constructs a new {@code SwitchAttack} {@code Object}.
	 * @param meleeRange If the attack is close-range.
	 * @param style The combat style.
	 * @param handler The attack handler.
	 */
	public SwitchAttack(boolean meleeRange, CombatStyle style, AttackHandler handler) {
		this.meleeRange = meleeRange;
		this.style = style;
		this.handler = handler;
	}

	/**
	 * Gets the handler value.
	 * @return The handler.
	 */
	public AttackHandler getHandler() {
		return handler;
	}

	/**
	 * Sets the handler value.
	 * @param handler The handler to set.
	 */
	public void setHandler(AttackHandler handler) {
		this.handler = handler;
	}

	/**
	 * Gets the meleeRange value.
	 * @return The meleeRange.
	 */
	public boolean isMeleeRange() {
		return meleeRange;
	}

	/**
	 * Gets the style value.
	 * @return The style.
	 */
	public CombatStyle getStyle() {
		return style;
	}
	
}