package org.virtue.model.entity.combat;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.impl.CombatUtils;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Holds attack information used by the attack event.
 * @author Emperor
 *
 */
public final class AttackInfo {
	
	/**
	 * The attack animation.
	 */
	private AnimationBlock animation;
	
	/**
	 * The start graphic.
	 */
	private GraphicsBlock graphic;
	
	/**
	 * The impact information array.
	 */
	private ImpactInfo[] impacts;
	
	/**
	 * The combat event.
	 */
	private CombatEvent event;
	
	/**
	 * The cooldown of this event.
	 */
	private int cooldown;
	
	/**
	 * Constructs a new {@code AttackInfo} {@code Object}.
	 */
	public AttackInfo() {
		/*
		 * empty.
		 */
	}
	
	/**
	 * Constructs a new {@code AttackInfo} {@code Object}.
	 * @param animation The attack animation.
	 * @param graphic The start graphic.
	 * @param impacts The impact information array.
	 */
	public AttackInfo(AnimationBlock animation, GraphicsBlock graphic, int cooldown, ImpactInfo...impacts) {
		this.animation = animation;
		this.graphic = graphic;
		this.impacts = impacts;
		this.cooldown = cooldown;
	}
	
	/**
	 * Creates a new attack information object.
	 * @param entity The attacking entity.
	 * @param animation The attack animation.
	 * @param graphic The start graphic.
	 * @param impacts The impact information array.
	 * @return The {@code AttackInfo} {@code Object}.
	 */
	public static AttackInfo create(Entity entity, AnimationBlock animation, GraphicsBlock graphics, ImpactInfo...impacts) {
		return create(entity, animation, graphics, CombatUtils.getCooldown(entity, false), impacts);
	}
	
	/**
	 * Creates a new attack information object.
	 * @param entity The attacking entity.
	 * @param animation The attack animation.
	 * @param graphic The start graphic.
	 * @param impacts The impact information array.
	 * @return The {@code AttackInfo} {@code Object}.
	 */
	public static AttackInfo create(Entity entity, AnimationBlock animation, GraphicsBlock graphics, int cooldown, ImpactInfo...impacts) {
		return new AttackInfo(animation, graphics, cooldown, impacts);
	}

	/**
	 * Sets the impacts value.
	 * @param impacts The impacts to set.
	 */
	public AttackInfo setImpacts(ImpactInfo... impacts) {
		this.impacts = impacts;
		return this;
	}

	/**
	 * Gets the impacts value.
	 * @return The impacts.
	 */
	public ImpactInfo[] getImpacts() {
		return impacts;
	}

	/**
	 * Gets the startGraphic value.
	 * @return The startGraphic.
	 */
	public GraphicsBlock getStartGraphic() {
		return graphic;
	}

	/**
	 * Sets the startGraphic value.
	 * @param startGraphic The startGraphic to set.
	 */
	public void setStartGraphic(GraphicsBlock startGraphic) {
		this.graphic = startGraphic;
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
	 * Gets the cooldown value.
	 * @return The cooldown.
	 */
	public int getCooldown() {
		return cooldown;
	}

	/**
	 * Sets the cooldown value.
	 * @param cooldown The cooldown to set.
	 */
	public void setCooldown(int cooldown) {
		this.cooldown = cooldown;
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
	
}