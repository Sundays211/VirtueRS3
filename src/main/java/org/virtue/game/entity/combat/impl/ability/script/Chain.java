package org.virtue.game.entity.combat.impl.ability.script;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.entity.combat.impl.ability.Ability;
import org.virtue.game.entity.combat.impl.ability.AbilityType;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

public class Chain extends Ability {

	public Chain() {
		super(FollowingType.MAGIC, AbilityType.BASIC, CombatStyle.MAGIC, 14670, 22, 5, 11);
		super.animation = new AnimationBlock(18428);
		super.graphic = new SpotAnimationBlock(1, 369);
	}

	@Override
	public ImpactInfo[] getImpacts(Entity entity, Entity lock) {
		
		double max = style.getHandler().getMaximumHit(entity, lock) * 1.88;
		if (style.getHandler().getHitAccuracy(entity, lock) < 0.11) {
			return new ImpactInfo[0];
		}
		return new ImpactInfo[] { ImpactInfo.ability(entity, lock, style, null, null, (int) max)};
	}

	@Override
	public boolean canActivate(Entity entity, Entity lock) {
		return hasRequirement(entity, Stat.MAGIC, 45);
	}

}
