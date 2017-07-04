package org.virtue.engine.script.listeners;

import org.virtue.game.entity.combat.AttackEvent;

/**
 * Used for scripting combat.
 * @author Emperor
 *
 */
public interface CombatHandler {

	/**
	 * Gets the current attack event.
	 * @return The attack event.
	 */
	public AttackEvent getAttackEvent();
	
	/**
	 * Gets the NPC ids using this combat handler.
	 * @return The NPC ids.
	 */
	public int[] getIds();
	
}