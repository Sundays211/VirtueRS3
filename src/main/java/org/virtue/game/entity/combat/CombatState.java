package org.virtue.game.entity.combat;

/**
 * The combat schedule states.
 * @author Emperor
 *
 */
public enum CombatState {

	/**
	 * The combat schedule is inactive until a new target is set.
	 */
	PAUSED,
	
	/**
	 * The combat schedule is currently running.
	 */
	ACTIVE;
	
}