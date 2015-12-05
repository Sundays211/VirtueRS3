package org.virtue.model.entity.old_combat.action;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.old_combat.CombatSetting;

public abstract class CombatAction {

	/**
	 * This method is called before {@link #defend(Entity, Entity)} for attacking
	 * the specified {@code defender} with the specified {@code attacker}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @param successful 
	 */
	public abstract void attack(Entity attacker, Entity defender, boolean successful);
	
	/**
	 * This method is called after {@link #attack(Entity, Entity)} and the combat ticks
	 * pass the delay from {@link #getHitDelay(boolean)}.
	 * 
	 * @param defender the defending entity
	 * @param attacker the attacking entity
	 * @param successful false is the defender blocked the hit; false otherwise
	 */
	public abstract void defend(Entity defender, Entity attacker, boolean successful);
	
	/**
	 * Returns true if the next hit is going to be successful between the specified
	 * {@code attacker} and the specified {@code defender}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @return true if the net hit is successful; return false otherwise
	 */
	public abstract boolean isSuccessful(Entity attacker, Entity defender);
	
	/**
	 * Returns the delay before the specified {@code defender} is hit. If {@code mainHand} is true, 
	 * the main hand delay is returned.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @param mainHand if the main hand delay needs to be returned
	 * @return the delay of the next attack
	 */
	public abstract int getHitDelay(Entity attacker, Entity defender, boolean mainHand);
	
	/**
	 * Returns the max hit value between the specified {@code attacker} and the
	 * specified {@code defender}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @return the max hit value
	 */
	public abstract int getMaxHit(Entity attacker, Entity defender);
	
	/**
	 * Returns the attack animation of this {@code CombatAction} between
	 * the specified {@code attacker} and the specified {@code defender}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @return the attack animation
	 */
	public abstract int getAttackAnimation(Entity attacker, Entity defender, boolean mainHand);
	
	/**
	 * Returns the offhand attack animation of this {@code CombatAction} between
	 * the specified {@code attacker} and the specified {@code defender}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @return the offhand attack animation
	 */
	public abstract int getOffhandAttackAnimation(Entity attacker, Entity defender, boolean offHand);
	
	/**
	 * Returns the defence animation of this {@code CombatAction} between
	 * the specified {@code attacker} and the specified {@code defender}.
	 * 
	 * @param attacker the attacking entity
	 * @param defender the defending entity
	 * @return the defence animation
	 */
	public abstract int getDefenceAnimation(Entity attacker, Entity defender);
	
	/**
	 * Returns the {@code CombatSetting} of this {@code CombatAction}.
	 * 
	 * @return the combat setting
	 */
	public abstract CombatSetting getSetting();
	
	/**
	 * Returns the max distance of this {@code CombatAction}.
	 * 
	 * @return the max distance
	 */
	public abstract int getDistance();
	
}
