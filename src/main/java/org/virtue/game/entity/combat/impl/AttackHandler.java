package org.virtue.game.entity.combat.impl;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.map.zone.Projectile;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;
import org.virtue.utility.RandomExt;

/**
 * The attack handler.
 * @author Emperor
 *
 */
public abstract class AttackHandler {

	/**
	 * The maximum hit.
	 */
	protected int maximumHit;
	
	/**
	 * The maximum accuracy.
	 */
	protected double maximumAccuracy;

	/**
	 * Constructs a new {@code AttackHandler} {@code Object}.
	 */
	public AttackHandler() {
		this(-1, -1);
	}
	
	/**
	 * Constructs a new {@code AttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit.
	 */
	public AttackHandler(int maximumHit) {
		this(maximumHit, -1);
	}
	
	/**
	 * Constructs a new {@code AttackHandler} {@code Object}.
	 * @param maximumHit the maximum hit.
	 * @param maximumAccuracy The maximum accuracy.
	 */
	public AttackHandler(int maximumHit, double maximumAccuracy) {
		this.maximumHit = maximumHit;
		this.maximumAccuracy = maximumAccuracy;
	}
	
	/**
	 * Gets the attack information.
	 * @param entity The attacking entity.
	 * @param lock The target entity.
	 * @return The attack information.
	 */
	public abstract AttackInfo getAttackInfo(Entity entity, Entity lock);

	/**
	 * Gets the current hit.
	 * @param entity The entity.
	 * @param lock The target.
	 * @return The current hit.
	 */
	public int getHit(Entity entity, Entity lock) {
		return getHit(entity, lock, getMaximumHit(entity, lock));
	}
	
	/**
	 * Gets the current hit.
	 * @param entity The entity.
	 * @param lock The target.
	 * @param maximumHit The maximum hit.
	 * @return The current hit.
	 */
	public int getHit(Entity entity, Entity lock, double maximumHit) {
		int hit = 0;
		if (isAccurateImpact(entity, lock)) {
			hit = (int) RandomExt.getRandomDouble(maximumHit);
		}
		return hit;
	}
	
	/**
	 * Creates a new {@code ImpactInfo} {@code Object} with the given data.
	 * @param entity The entity.
	 * @param victim The victim.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @return The impact info object.
	 */
	public ImpactInfo impact(Entity entity, Entity victim, CombatStyle style, SpotAnimationBlock graphic, Projectile projectile) {
		return ImpactInfo.create(entity, victim, style, graphic, projectile, getHit(entity, victim));
	}
	
	/**
	 * Creates a new {@code ImpactInfo} {@code Object} with the given data.
	 * @param entity The entity.
	 * @param victim The victim.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @return The impact info object.
	 */
	public ImpactInfo impact(Entity entity, Entity victim, CombatStyle style, SpotAnimationBlock graphic, Projectile projectile, int hit) {
		return ImpactInfo.create(entity, victim, style, graphic, projectile, hit);
	}
	
	/**
	 * Checks if the impact is accurate.
	 * @param entity The attacking entity.
	 * @param lock The victim.
	 * @param event The attack event.
	 * @return {@code True} if the entity successfully hit the target.
	 */
	public boolean isAccurateImpact(Entity entity, Entity lock) {
		double accuracy = getMaximumAccuracy(entity, lock);
		double defence = getMaximumDefence(entity, lock);
		return RandomExt.getRandomDouble(accuracy) > RandomExt.getRandomDouble(defence);
	}
	
	/**
	 * Gets a random value (0.00-0.99) where 0.5+ is a successful hit.
	 * @param entity The entity.
	 * @param lock The lock.
	 * @return The hit accuracy.
	 */
	public double getHitAccuracy(Entity entity, Entity lock) {
		double accuracy = RandomExt.getRandomDouble(getMaximumAccuracy(entity, lock)) + 1;
		double defence = RandomExt.getRandomDouble(getMaximumDefence(entity, lock)) + 1;
		return accuracy + (accuracy / defence);
		
	}
	
	/***
	 * Gets the maximum hit of the entity.
	 * @param entity The entity.
	 * @param lock The current victim.
	 * @return The maximum hit.
	 */
	public double getMaximumHit(Entity entity, Entity lock) {
		if (maximumHit > -1) {
			return maximumHit;
		}
		//TODO:
		return 100;
	}

	/***
	 * Gets the maximum hit of the entity.
	 * @param entity The entity.
	 * @param lock The current victim.
	 * @return The maximum hit.
	 */
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		if (maximumAccuracy > -1) {
			return maximumAccuracy;
		}
		return 100;
	}

	/***
	 * Gets the maximum hit of the entity.
	 * @param entity The entity.
	 * @param lock The current victim.
	 * @return The maximum hit.
	 */
	public double getMaximumDefence(Entity entity, Entity lock) {
		return 100;
	}

}