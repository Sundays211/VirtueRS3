package org.virtue.model.entity.combat.impl.dragonfire;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.AttackHandler;
import org.virtue.model.entity.combat.impl.CombatUtils;
import org.virtue.model.entity.region.packets.Projectile;

/**
 * Handles dragonfire attackss.
 * @author Emperor
 *
 */
public class DragonfireHandler extends AttackHandler {

	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
				impact(entity, lock, CombatStyle.DRAGONFIRE, null, new Projectile(393, 17, 78, 5, 42, 38)));
	}

}