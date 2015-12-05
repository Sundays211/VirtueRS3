package org.virtue.model.entity.combat.death;

import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Handles a death event.
 * @author Emperor
 *
 */
public abstract class DeathEvent {
	
	/**
	 * The default player death.
	 */
	public static final DeathEvent DEFAULT = new DefaultDeathEvent();
	
	/**
	 * The amount of ticks before the death is over.
	 */
	private final int expiration;
	
	/**
	 * The death animation.
	 */
	protected AnimationBlock deathAnimation;
	
	/**
	 * The graphic displayed when dying.
	 */
	protected GraphicsBlock graphics;
	
	/**
	 * Constructs a new {@code DeathEvent} {@code Object}.
	 * @param ticks The amount of ticks before the death is over.
	 */
	public DeathEvent(int ticks) {
		this.expiration = ticks;
	}

	/**
	 * Runs the death event.
	 * @param entity The dying entity.
	 * @param killer The killer.
	 */
	public void run(Entity entity) {
		run(entity, entity); //TODO: most damage entity.
	}
	
	/**
	 * Runs the death event.
	 * @param entity The dying entity.
	 * @param killer The killer.
	 */
	public void run(final Entity entity, final Entity killer) {
		if (!start(entity, killer)) {
			entity.getImpactHandler().setDead(false);
			return;
		}
		entity.getMovement().stop();
		animate(entity, killer);
		Virtue.getInstance().getEngine().invoke(new GameTick(1) {
			int cycles = 0;
			@Override
			public void execute() {
				cycle(entity, killer, cycles);
				if (++cycles >= expiration) {
					end(entity, killer);
					stop();
				}
			}
		});
	}
	
	/**
	 * Animates the death.
	 * @param entity The dying entity.
	 * @param killer The killer.
	 */
	public void animate(Entity entity, Entity killer) {
		if (deathAnimation == null) {
			entity.queueUpdateBlock(new AnimationBlock(entity.getDeathAnimation()));
		} else {
			entity.queueUpdateBlock(deathAnimation);
		}
		if (graphics != null) {
			entity.queueUpdateBlock(graphics);
		}
	}

	/**
	 * Called when the death event starts.
	 * @param entity The dying entity.
	 * @param killer The killer.
	 */
	public boolean start(Entity entity, Entity killer) {
		return true;
	}
	
	/**
	 * Called every game tick until the death event ends.
	 * @param entity The entity.
	 * @param killer The killer.
	 * @param count The amount of cycles the death event has ran for.
	 */
	public abstract void cycle(Entity entity, Entity killer, int count);
	
	/**
	 * Called when the death ends.
	 * @param entity The dying entity.
	 * @param killer The killer.
	 */
	public void end(Entity entity, Entity killer) {
		entity.getImpactHandler().setDead(false);
		entity.queueUpdateBlock(AnimationBlock.RESET);
		entity.getImpactHandler().restoreLifepoints();
	}
	
	/**
	 * Checks if this cycle is last in the death event.
	 * @param cycle The cycle count.
	 * @return {@code True} if so.
	 */
	public boolean isLast(int cycle) {
		return cycle == expiration - 1;
	}
}