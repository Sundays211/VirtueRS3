package org.virtue.game.entity.combat.impl.range;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.CombatUtils;
import org.virtue.game.entity.combat.impl.formula.Formula;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.world.region.zone.Projectile;

/**
 * Handles range attacks.
 * @author Emperor
 *
 */
public class RangeAttackHandler extends AttackHandler {
	
	/**
	 * Constructs a new {@code RangeAttackHandler} {@code Object}.
	 */
	public RangeAttackHandler() {
		super(-1, -1);
	}
	
	/**
	 * Constructs a new {@code RangeAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit.
	 * @param maximumAccuracy The maximum accuracy.
	 */
	public RangeAttackHandler(int maximumHit, int maximumAccuracy) {
		super(maximumHit, maximumAccuracy);
	}

	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			
			Item weapon = player.getEquipment().getWorn(3);
			Item ammo = player.getEquipment().getWorn(13);
			if (ammo != null) {
				return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
						impact(entity, lock, CombatStyle.RANGE, null, new Projectile(CombatUtils.getProjectileGFX(ammo), 48, 74, 5, 42, 38)));
			}
			if (weapon != null) {
				return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
						impact(entity, lock, CombatStyle.RANGE, null, new Projectile(CombatUtils.getDartProjectileGFX(weapon), 48, 74, 5, 42, 38)));
			}
		}
		return AttackInfo.create(entity, CombatUtils.getAttackAnimation(entity, false, true), null, 
				impact(entity, lock, CombatStyle.RANGE, null, new Projectile(11, 48, 74, 5, 42, 38)));
	}
	
	@Override
	public double getMaximumHit(Entity entity, Entity lock) {
		if (maximumHit > -1) {
			return maximumHit;
		}
		return Formula.getMaximumRangeHit(entity, lock);
	}

	@Override
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		if (maximumAccuracy > -1) {
			return maximumAccuracy;
		}
		return Formula.getMaximumRangeAccuracy(entity, lock);
	}

	@Override
	public double getMaximumDefence(Entity entity, Entity lock) {
		//TODO: Maximum defence formula.
		return Formula.getArmourTotalDefence(entity, lock);
	}

}