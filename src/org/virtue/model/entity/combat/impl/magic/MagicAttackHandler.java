package org.virtue.model.entity.combat.impl.magic;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.AttackHandler;
import org.virtue.model.entity.combat.impl.CombatUtils;
import org.virtue.model.entity.combat.impl.Formula;

/**
 * Handles default magic attacks.
 * @author Emperor
 *
 */
public class MagicAttackHandler extends AttackHandler {

	/**
	 * Constructs a new {@code MagicAttackHandler} {@code Object}.
	 */
	public MagicAttackHandler() {
		super(-1, -1);
	}
	
	/**
	 * Constructs a new {@code MagicAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit.
	 * @param maximumAccuracy The maximum accuracy.
	 */
	public MagicAttackHandler(int maximumHit, int maximumAccuracy) {
		super(maximumHit, maximumAccuracy);
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
				impact(entity, lock, CombatStyle.MAGIC, null, null));
	}
	
	@Override
	public double getMaximumHit(Entity entity, Entity lock) {
		if (maximumHit > -1) {
			return maximumHit;
		}
		return 200;
	}

	@Override
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		if (maximumAccuracy > -1) {
			return maximumAccuracy;
		}
		return Formula.getMaximumMagicAccuracy(entity, lock);
	}
	
	@Override
	public double getMaximumDefence(Entity entity, Entity lock) {
		return Formula.getArmourTotalDefence(entity, lock);
	}

}