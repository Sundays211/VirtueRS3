package org.virtue.model.entity.combat;

import org.virtue.model.entity.Entity;

@FunctionalInterface
public interface CombatEvent {

	/**
	 * Runs the impact event.
	 * @param entity The entity.
	 * @param target The target.
	 */
	void run(Entity entity, Entity target);
	
}