package org.virtue.game.entity.combat.impl.ability.script;

import org.virtue.game.content.skills.SkillType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.entity.combat.impl.ability.Ability;
import org.virtue.game.entity.combat.impl.ability.AbilityType;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.network.protocol.update.block.AnimationBlock;

/**
 * Handles the backhand ability.
 * @author Emperor
 *
 */
public final class BackhandAbility extends Ability {

	/**
	 * Constructs a new {@code BackhandAbility} {@code Object}.
	 */
	public BackhandAbility() {
		super(FollowingType.MELEE, AbilityType.BASIC, CombatStyle.MELEE, 14682, 97, 0, 25);
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
		return hasRequirement(entity, SkillType.ATTACK, 10);
	}

	@Override
	public void register() {
		ActionBar.getAbilities().put(1460 << 16 | 6, this);
	}

}