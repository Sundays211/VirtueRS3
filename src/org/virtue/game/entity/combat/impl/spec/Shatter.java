package org.virtue.game.entity.combat.impl.spec;

import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.SpecialAttackHandler;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;

/**
 * @author Kayla
 */
public class Shatter extends SpecialAttackHandler {

	/**
	 * Constructs a new {@code Shatter} {@code Object}.
	 */
	public Shatter() {
		super(CombatStyle.MELEE, 1434);
		super.animation = new AnimationBlock(1060);
		super.graphics = new GraphicsBlock(1, 251);
		super.accuracyModifier -= 1.12;
		super.damageModifier = 3.00;
	}
}
