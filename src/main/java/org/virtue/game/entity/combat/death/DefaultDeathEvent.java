package org.virtue.game.entity.combat.death;

import org.virtue.game.entity.Entity;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * The player death handling event.
 * @author Emperor
 *
 */
public final class DefaultDeathEvent extends DeathEvent {

	/**
	 * Constructs a new {@code DefaultDeathEvent} {@code Object}.
	 */
	public DefaultDeathEvent() {
		this(7, null, null);
	}

	/**
	 * Constructs a new {@code DefaultDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks this event lasts for.
	 */
	public DefaultDeathEvent(int ticks) {
		this(ticks, null, null);
	}

	/**
	 * Constructs a new {@code DefaultDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param animation The animation.
	 * @param graphic The graphic.
	 */
	public DefaultDeathEvent(int ticks, AnimationBlock animation) {
		this(ticks, animation, null);
	}
	
	/**
	 * Constructs a new {@code DefaultDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param animation The animation.
	 * @param graphic The graphic.
	 */
	public DefaultDeathEvent(int ticks, AnimationBlock animation, SpotAnimationBlock graphic) {
		super(ticks);
		super.deathAnimation = animation;
		super.graphics = graphics;
	}

	@Override
	public void cycle(Entity entity, Entity killer, int count) {
		if (isLast(count)) {
			entity.processDeath(killer);
		}
	}

}