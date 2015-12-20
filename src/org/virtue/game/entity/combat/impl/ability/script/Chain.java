package org.virtue.game.entity.combat.impl.ability.script;

import org.virtue.game.content.skills.StatType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.entity.combat.impl.ability.Ability;
import org.virtue.game.entity.combat.impl.ability.AbilityType;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;

public class Chain extends Ability {

	public Chain() {
		super(FollowingType.MAGIC, AbilityType.BASIC, CombatStyle.MAGIC, 14670, 22, 5, 11);
		super.animation = new AnimationBlock(18428);
		super.graphic = new GraphicsBlock(1, 369);
	}

	@Override
	public void register() {
		ActionBar.getAbilities().put(1461 << 16 | 4, this);
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
		return hasRequirement(entity, StatType.MAGIC, 45);
	}

}
