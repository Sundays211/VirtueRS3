package org.virtue.model.entity.combat.impl.melee;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.AttackHandler;
import org.virtue.model.entity.combat.impl.CombatUtils;
import org.virtue.model.entity.combat.impl.Formula;

/**
 * Handles melee attacks.
 * @author Emperor
 *
 */
public class MeleeAttackHandler extends AttackHandler {
	
	/**
	 * Constructs a new {@code MeleeAttackHandler} {@code Object}.
	 */
	public MeleeAttackHandler() {
		super(-1, -1);
	}

	/**
	 * Constructs a new {@code MeleeAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit.
	 */
	public MeleeAttackHandler(int maximumHit) {
		super(maximumHit, -1);
	}
	
	/**
	 * Constructs a new {@code MeleeAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit.
	 * @param maximumAccuracy The maximum accuracy.
	 */
	public MeleeAttackHandler(int maximumHit, double maximumAccuracy) {
		super(maximumHit, maximumAccuracy);
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
				impact(entity, lock, CombatStyle.MELEE, null, null));
	}

	@Override
	public double getMaximumHit(Entity entity, Entity lock) {
		if (maximumHit > -1) {
			return maximumHit;
		}
		return Formula.getMaximumMeleeHit(entity, lock);
	}

	@Override
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		if (maximumAccuracy > -1) {
			return maximumAccuracy;
		}
		return Formula.getMaximumMeleeAccuracy(entity, lock);
	}

	@Override
	public double getMaximumDefence(Entity entity, Entity lock) {
		//TODO: Maximum defence formula.
		return Formula.getArmourTotalDefence(entity, lock);
	}
}