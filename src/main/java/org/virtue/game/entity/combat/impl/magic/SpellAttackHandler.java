package org.virtue.game.entity.combat.impl.magic;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.CombatUtils;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.map.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;
import org.virtue.utility.RandomExt;

/**
 * Handles spells attacks.
 * @author Emperor
 *
 */
public class SpellAttackHandler extends MagicAttackHandler {
	
	/**
	 * The maximum hit.
	 */
	private int maximumHit;
	
	/**
	 * If the spell is multi-target.
	 */
	private boolean multi;
	
	/**
	 * The cast animation.
	 */
	private AnimationBlock animation;
	
	/**
	 * The cast graphic.
	 */
	private SpotAnimationBlock graphic;
	
	/**
	 * The animation block.
	 */
	private int impactAnimation;
	
	/**
	 * The impact graphic.
	 */
	private SpotAnimationBlock impactGraphic;
	
	/**
	 * The projectiles.
	 */
	private Projectile projectile;
	
	/**
	 * The accuracy modifier.
	 */
	private double accuracyMod = 1.0;
	
	/**
	 * The defence modifier.
	 */
	private double defenceMod = 1.0;

	/**
	 * Constructs a new {@code SpellAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit of this spell.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param impactGraphic The impact graphic.
	 * @param projectiles The projectiles.
	 */
	public SpellAttackHandler(int maximumHit, AnimationBlock animation, SpotAnimationBlock graphic, SpotAnimationBlock impactGraphic, Projectile projectile) {
		this(maximumHit, animation, graphic, -1, impactGraphic, false, projectile);
	}

	/**
	 * Constructs a new {@code SpellAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit of this spell.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param impactAnimation The impact animation.
	 * @param impactGraphic The impact graphic.
	 * @param projectiles The projectiles.
	 */
	public SpellAttackHandler(int maximumHit, AnimationBlock animation, SpotAnimationBlock graphic, int impactAnimation, SpotAnimationBlock impactGraphic, Projectile projectile) {
		this(maximumHit, animation, graphic, impactAnimation, impactGraphic, false, projectile, 1.0, 1.0);
	}
	
	/**
	 * Constructs a new {@code SpellAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit of this spell.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param impactAnimation The impact animation.
	 * @param impactGraphic The impact graphic.
	 * @param multi If the spell is multi-target.
	 * @param projectiles The projectiles.
	 */
	public SpellAttackHandler(int maximumHit, AnimationBlock animation, SpotAnimationBlock graphic, int impactAnimation, SpotAnimationBlock impactGraphic, boolean multi, Projectile projectile) {
		this(maximumHit, animation, graphic, impactAnimation, impactGraphic, multi, projectile, 1.0, 1.0);
	}
	
	/**
	 * Constructs a new {@code SpellAttackHandler} {@code Object}.
	 * @param maximumHit The maximum hit of this spell.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param impactAnimation The impact animation.
	 * @param impactGraphic The impact graphic.
	 * @param multi If the spell is multi-target.
	 * @param projectiles The projectiles.
	 */
	public SpellAttackHandler(int maximumHit, AnimationBlock animation, SpotAnimationBlock graphic, int impactAnimation, SpotAnimationBlock impactGraphic, boolean multi, Projectile projectile, double accuracyMod, double defenceMod) {
		this.maximumHit = maximumHit;
		this.animation = animation;
		this.graphic = graphic;
		this.impactAnimation = impactAnimation;
		this.impactGraphic = impactGraphic;
		this.multi = multi;
		this.projectile = projectile;
		this.accuracyMod = accuracyMod;
		this.defenceMod = defenceMod;
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		return AttackInfo.create(entity, animation, graphic, getImpacts(entity, lock));
	}

	/**
	 * Gets the impacts array.
	 * @return The impacts array.
	 */
	private ImpactInfo[] getImpacts(Entity entity, Entity lock) {
		Entity[] targets = new Entity[multi ? 9 : 1];
		targets[0] = lock;
		if (multi) {
			//TODO: get other 8 targets
		}
		ImpactInfo[] impacts = new ImpactInfo[targets.length];
		int delay = CombatUtils.getImpactDelay(CombatStyle.MAGIC, entity, lock);
		for (int i = 0; i < targets.length; i++) {
			Entity target = targets[i];
			int anim = impactAnimation;
			if (anim == -1) {
				anim = target.getImpactAnimation();
			}
			int hit = 0;
			if (isAccurateImpact(entity, lock)) {
				hit = RandomExt.random((int) getMaximumHit(entity, lock));
			}
			impacts[i] = new ImpactInfo(target, anim, impactGraphic, projectile, CombatStyle.MAGIC, hit, delay);
		}
		return impacts;
	}

	@Override
	public double getMaximumHit(Entity entity, Entity lock) {
		return maximumHit;
	}

	@Override
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		return super.getMaximumAccuracy(entity, lock) * accuracyMod;
	}

	@Override
	public double getMaximumDefence(Entity entity, Entity lock) {
		return super.getMaximumDefence(entity, lock) * defenceMod;
	}

	/**
	 * Gets the maximumHit value.
	 * @return The maximumHit.
	 */
	public int getMaximumHit() {
		return maximumHit;
	}

	/**
	 * Sets the maximumHit value.
	 * @param maximumHit The maximumHit to set.
	 */
	public void setMaximumHit(int maximumHit) {
		this.maximumHit = maximumHit;
	}

	/**
	 * Gets the multi value.
	 * @return The multi.
	 */
	public boolean isMulti() {
		return multi;
	}

	/**
	 * Sets the multi value.
	 * @param multi The multi to set.
	 */
	public void setMulti(boolean multi) {
		this.multi = multi;
	}

	/**
	 * Gets the animation value.
	 * @return The animation.
	 */
	public AnimationBlock getAnimation() {
		return animation;
	}

	/**
	 * Sets the animation value.
	 * @param animation The animation to set.
	 */
	public void setAnimation(AnimationBlock animation) {
		this.animation = animation;
	}

	/**
	 * Gets the graphic value.
	 * @return The graphic.
	 */
	public SpotAnimationBlock getGraphic() {
		return graphic;
	}

	/**
	 * Sets the graphic value.
	 * @param graphic The graphic to set.
	 */
	public void setGraphic(SpotAnimationBlock graphic) {
		this.graphic = graphic;
	}

	/**
	 * Gets the projectile value.
	 * @return The projectile.
	 */
	public Projectile getProjectile() {
		return projectile;
	}

	/**
	 * Sets the projectile value.
	 * @param projectiles The projectile to set.
	 */
	public void setProjectile(Projectile projectile) {
		this.projectile = projectile;
	}

	/**
	 * Gets the impactAnimation value.
	 * @return The impactAnimation.
	 */
	public int getImpactAnimation() {
		return impactAnimation;
	}

	/**
	 * Sets the impactAnimation value.
	 * @param impactAnimation The impactAnimation to set.
	 */
	public void setImpactAnimation(int impactAnimation) {
		this.impactAnimation = impactAnimation;
	}

	/**
	 * Gets the impactGraphic value.
	 * @return The impactGraphic.
	 */
	public SpotAnimationBlock getImpactGraphic() {
		return impactGraphic;
	}
	
	/**
	 * Sets the impactGraphic value.
	 * @param impactGraphic The impactGraphic to set.
	 */
	public void setImpactGraphic(SpotAnimationBlock impactGraphic) {
		this.impactGraphic = impactGraphic;
	}

	/**
	 * Gets the accuracyMod value.
	 * @return The accuracyMod.
	 */
	public double getAccuracyMod() {
		return accuracyMod;
	}

	/**
	 * Sets the accuracyMod value.
	 * @param accuracyMod The accuracyMod to set.
	 */
	public void setAccuracyMod(double accuracyMod) {
		this.accuracyMod = accuracyMod;
	}

	/**
	 * Gets the defenceMod value.
	 * @return The defenceMod.
	 */
	public double getDefenceMod() {
		return defenceMod;
	}

	/**
	 * Sets the defenceMod value.
	 * @param defenceMod The defenceMod to set.
	 */
	public void setDefenceMod(double defenceMod) {
		this.defenceMod = defenceMod;
	}

}