package org.virtue.game.entity.combat.impl;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatEvent;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.hit.Hit;
import org.virtue.game.entity.combat.hit.Hit.HitType;
import org.virtue.game.world.region.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * Holds information for an attack impact.
 * @author Emperor
 *
 */
public class ImpactInfo {

	/**
	 * The targeted entity.
	 */
	private final Entity victim;
	
	/**
	 * The defending animation.
	 */
	private AnimationBlock animation;
	
	/**
	 * The impact graphics.
	 */
	private SpotAnimationBlock graphic;
	
	/**
	 * The projectile.
	 */
	private Projectile projectile;
	
	/**
	 * The amount of damage to deal.
	 */
	private int hit;
	
	/**
	 * The delay before starting the impact.
	 */
	private int delay;
	
	/**
	 * The impact event.
	 */
	private CombatEvent event;
	
	/**
	 * The tick amount of when this hit is scheduled.
	 */
	private int scheduledTick;
	
	/**
	 * The hit mark.
	 */
	private Hit hitMark;

	/**
	 * The combat style.
	 */
	private CombatStyle style;
	
	/**
	 * If the impact is for an ability.
	 */
	private boolean ability;
	
	/**
	 * Constructs a new {@code ImpactInfo} {@code Object}.
	 * @param victim The victim. 
	 * @param animation The defending animation.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @param hit The hit.
	 * @param delay The delay before impact.
	 */
	public ImpactInfo(Entity victim, int animation, SpotAnimationBlock graphic, Projectile projectile, CombatStyle style, int hit, int delay) {
		this.victim = victim;
		this.animation = new AnimationBlock(animation);
		this.graphic = graphic;
		this.projectile = projectile;
		this.style = style;
		this.hit = hit;
		this.delay = delay;
	}

	/**
	 * Creates a new {@code ImpactInfo} {@code Object} with the given data.
	 * @param entity The entity.
	 * @param victim The victim.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @return The impact info object.
	 */
	public static ImpactInfo create(AttackHandler handler, Entity entity, Entity victim, CombatStyle style, SpotAnimationBlock graphic, Projectile projectile) {
		return create(entity, victim, style, graphic, projectile, handler.getHit(entity, victim));
	}
	
	/**
	 * Creates a new {@code ImpactInfo} {@code Object} with the given data.
	 * @param entity The entity.
	 * @param victim The victim.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @return The impact info object.
	 */
	public static ImpactInfo create(Entity entity, Entity victim, CombatStyle style, SpotAnimationBlock graphic, Projectile projectile, int hit) {
		return new ImpactInfo(victim, victim.getImpactAnimation(), graphic, projectile, style, hit, CombatUtils.getImpactDelay(style, entity, victim));
	}
	
	/**
	 * Creates a new {@code ImpactInfo} {@code Object} with the given data.
	 * @param entity The entity.
	 * @param victim The victim.
	 * @param graphic The impact graphic.
	 * @param projectile The projectile.
	 * @return The impact info object.
	 */
	public static ImpactInfo ability(Entity entity, Entity victim, CombatStyle style, SpotAnimationBlock graphic, Projectile projectile, int hit) {
		ImpactInfo info = new ImpactInfo(victim, victim.getImpactAnimation(), graphic, projectile, style, hit, CombatUtils.getImpactDelay(style, entity, victim));
		info.ability = true;
		return info;
	}

	/**
	 * Configures the impact information for queuing.
	 * @param dummyLifepoints The dummy lifepoint amount.
	 * @return The new dummy lifepoints amount.
	 */
	public int configure(int dummyLifepoints) {
		setScheduledTick(World.getInstance().getCycleCount() + getDelay());
		if (hit > dummyLifepoints) {
			dummyLifepoints = 0;
		} else if (hit > 0) {
			dummyLifepoints -= hit;
		}
		return dummyLifepoints;
	}

	/**
	 * Gets the currently set hit mark or creates one depending on the impact values.
	 * @return The hit mark.
	 */
	public Hit selectHitMark() {
		return selectHitMark(hit, delay);
	}

	/**
	 * Selects the hit mark.
	 * @param hit The hit to show.
	 * @return The hit mark.
	 */
	public Hit selectHitMark(int hit) {
		return selectHitMark(hit, delay);
	}

	/**
	 * Selects the hit mark.
	 * @param hit The hit to show.
	 * @return The hit mark.
	 */
	public Hit selectHitMark(int hit, int delay) {
		if (hitMark == null) {
			HitType type = null;
			if (style != null) {
				type = ability ? style.getDefaultHitType() : style.getHitType();
			}
			if (hit <= 0) {
				type = HitType.MISSED;
			} else if (type == null) {
				type = HitType.REGULAR_DAMAGE;
			}
			hitMark = new Hit(hit, delay * 30, type);
		}
		return hitMark;
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
	 * @param projectile The projectile to set.
	 */
	public void setProjectile(Projectile projectile) {
		this.projectile = projectile;
	}

	/**
	 * Gets the hit value.
	 * @return The hit.
	 */
	public int getHit() {
		return hit;
	}

	/**
	 * Sets the hit value.
	 * @param hit The hit to set.
	 */
	public void setHit(int hit) {
		this.hit = hit;
	}

	/**
	 * Gets the delay value.
	 * @return The delay.
	 */
	public int getDelay() {
		return delay;
	}

	/**
	 * Sets the delay value.
	 * @param delay The delay to set.
	 */
	public void setDelay(int delay) {
		this.delay = delay;
	}

	/**
	 * Gets the victim value.
	 * @return The victim.
	 */
	public Entity getVictim() {
		return victim;
	}

	/**
	 * Gets the event value.
	 * @return The event.
	 */
	public CombatEvent getEvent() {
		return event;
	}

	/**
	 * Sets the event value.
	 * @param event The event to set.
	 */
	public void setEvent(CombatEvent event) {
		this.event = event;
	}

	/**
	 * Gets the scheduledTick value.
	 * @return The scheduledTick.
	 */
	public int getScheduledTick() {
		return scheduledTick;
	}

	/**
	 * Sets the scheduledTick value.
	 * @param scheduledTick The scheduledTick to set.
	 */
	public void setScheduledTick(int scheduledTick) {
		this.scheduledTick = scheduledTick;
	}

	/**
	 * Gets the hitMark value.
	 * @return The hitMark.
	 */
	public Hit getHitMark() {
		return hitMark;
	}

	/**
	 * Sets the hitMark value.
	 * @param hitMark The hitMark to set.
	 */
	public void setHitMark(Hit hitMark) {
		this.hitMark = hitMark;
	}

	/**
	 * Gets the style value.
	 * @return The style.
	 */
	public CombatStyle getStyle() {
		return style;
	}

	/**
	 * Sets the style value.
	 * @param style The style to set.
	 */
	public void setStyle(CombatStyle style) {
		this.style = style;
	}

	/**
	 * Gets the ability value.
	 * @return The ability.
	 */
	public boolean isAbility() {
		return ability;
	}

	/**
	 * Sets the ability value.
	 * @param ability The ability to set.
	 */
	public void setAbility(boolean ability) {
		this.ability = ability;
	}

}