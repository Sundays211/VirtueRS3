package org.virtue.model.entity.combat.impl.ability.script;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.model.entity.combat.impl.ability.Ability;
import org.virtue.model.entity.combat.impl.ability.AbilityType;
import org.virtue.model.entity.combat.impl.ability.ActionBar;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.update.block.AnimationBlock;

public class PiercingShot extends Ability {

	/**
	 * Constructs a new {@code BackhandAbility} {@code Object}.
	 */
	public PiercingShot() {
		super(FollowingType.RANGE, AbilityType.BASIC, CombatStyle.RANGE, 14663, 97, 0, 25);
		super.animation = new AnimationBlock(18154);
	}

	@Override
	public ImpactInfo[] getImpacts(Entity entity, Entity lock) {
		double max = style.getHandler().getMaximumHit(entity, lock) * 1.0;
		if (style.getHandler().getHitAccuracy(entity, lock) < 0.11) {
			return new ImpactInfo[0];
		}
		return new ImpactInfo[] { ImpactInfo.ability(entity, lock, style, null, null, (int) max)};
	}

	@Override
	public boolean canActivate(Entity entity, Entity lock) {
		return hasRequirement(entity, SkillType.RANGED, 0);
	}

	@Override
	public void register() {
		ActionBar.getAbilities().put(1460 << 16 | 1, this);
	}

}
