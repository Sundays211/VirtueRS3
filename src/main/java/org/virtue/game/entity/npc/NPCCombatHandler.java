package org.virtue.game.entity.npc;

import org.virtue.game.entity.Entity;

public interface NPCCombatHandler {

	/**
	 * This method is called when the {@code CombatTick} of the specified
	 * {@code attacker} attacks the specified {@code defender}.
	 * 
	 * @param attacker the attacking npc
	 * @param defender the defending npc
	 */
	void onAttack(NPC attacker, Entity defender, boolean successful);
	
	/**
	 * This method is called when the {@code CombatTick} for the specified
	 * {@code defender} defends the specified {@code attacker}.
	 * 
	 * @param defender the defending npc
	 * @param attacker the attacking npc
	 * @param successful false if the hit was blocked; true otherwise
	 */
	void onDefend(NPC defender, Entity attacker, boolean successful);
	
	int getHitDelay(NPC attacker, Entity defender);
	
	/**
	 * Returns the attack animation of this {@code NPCCombatHandler}.
	 * 
	 * @return the attack animation
	 */
	int getAttackAnimation(NPC npc);
	
	/**
	 * Returns the defence animation of this {@code NPCCombatHandler}.
	 * 
	 * @return the defence animation
	 */
	int getDefenceAnimation(NPC npc);
	
}
