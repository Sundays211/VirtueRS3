package org.virtue.game.entity.combat.death;

import org.virtue.game.entity.Entity;

/**
 * Handles entity death.
 * @author Emperor
 *
 */
public final class DeathHandler {

	/**
	 * The entity.
	 */
	private final Entity entity;
	
	/**
	 * If the entity is currently dead.
	 */
	private boolean dead;
	
	/**
	 * The default death event
	 */
	private DeathEvent defaultEvent;
	
	/**
	 * Constructs a new {@code DeathHandler} {@code Object}.
	 * @param entity The entity.
	 */
	public DeathHandler(Entity entity) {
		this.entity = entity;
	}
	
	/**
	 * Runs the entity's death.
	 */
	public void run() {
		run(entity); //TODO: Most damage entity.
	}
	
	/**
	 * Runs the entity's death.
	 * @param killer The killer.
	 */
	public void run(Entity killer) {
		if (defaultEvent != null) {
			run(killer, defaultEvent);
		} else {
			run(killer, entity.getDeathEvent(killer));
		}
	}
	
	/**
	 * Runs the entity's death.
	 * @param killer The killer.
	 * @param event The death event.
	 */
	public void run(Entity killer, DeathEvent event) {
		if (!isDead()) {
			setDead(true);
			event.run(entity, killer);
		}
	}

	/**
	 * Gets the dead value.
	 * @return The dead.
	 */
	public boolean isDead() {
		return dead;
	}

	/**
	 * Sets the dead value.
	 * @param dead The dead to set.
	 */
	public void setDead(boolean dead) {
		this.dead = dead;
	}

	/**
	 * Gets the defaultEvent value.
	 * @return The defaultEvent.
	 */
	public DeathEvent getDefaultEvent() {
		return defaultEvent;
	}

	/**
	 * Sets the defaultEvent value.
	 * @param defaultEvent The defaultEvent to set.
	 */
	public void setDefaultEvent(DeathEvent defaultEvent) {
		this.defaultEvent = defaultEvent;
	}
}