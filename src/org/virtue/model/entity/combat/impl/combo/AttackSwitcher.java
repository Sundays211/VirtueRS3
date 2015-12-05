package org.virtue.model.entity.combat.impl.combo;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.utility.RandomExt;

/**
 * Handles attack switching.
 * @author Emperor
 *
 */
public final class AttackSwitcher {

	/**
	 * The attacks to switch between.
	 */
	private final AttackEvent[] attacks;
	
	/**
	 * If the next attack should be selected at random.
	 */
	private boolean random;
	
	/**
	 * The current index.
	 */
	private int index = 0;
	
	/**
	 * If melee following is enabled.
	 */
	private boolean meleeFollowing;
	
	/**
	 * Constructs a new {@code AttackSwitcher} {@code Object}.
	 * @param attacks The attacks.
	 */
	public AttackSwitcher(AttackEvent...attacks) {
		this(true, true, attacks);
	}
	
	/**
	 * Constructs a new {@code AttackSwitcher} {@code Object}.
	 * @param meleeFollowing If melee following is enabled.
	 * @param attacks The attacks.
	 */
	public AttackSwitcher(boolean meleeFollowing, AttackEvent...attacks) {
		this(meleeFollowing, true, attacks);
	}
	
	/**
	 * Constructs a new {@code AttackSwitcher} {@code Object}.
	 * @param meleeFollowing If melee following is enabled.
	 * @param random If the attacks should be selected randomly (rather than following array order).
	 * @param attacks The attacks.
	 */
	public AttackSwitcher(boolean meleeFollowing, boolean random, AttackEvent...attacks) {
		this.attacks = attacks;
		this.meleeFollowing = meleeFollowing;
		this.random = random;
	}
	
	/**
	 * Selects an attack event (based on current position of the entity if meleeFollowing is disabled).
	 * @param entity The entity.
	 * @param lock The victim.
	 * @return The attack event.
	 */
	public AttackEvent selectBest(Entity entity, Entity lock) {
		setNext();
		int next = -1;
		for (int i = 0; i < attacks.length; i++) {
			int current = (index + i) % attacks.length;
			AttackEvent attack = attacks[current];
			if (attack.canAttack(entity, lock)) {
				next = current;
				break;
			}
			if (next == -1 && (attack.getFollower() != FollowingType.MELEE || meleeFollowing)) {
				next = current;
			}
		}
		if (next > -1) {
			index = next;
		}
		return getNext();
	}

	/**
	 * Sets and returns the next attack.
	 * @return The next attack.
	 */
	public AttackEvent select() {
		setNext();
		return getNext();
	}
	
	/**
	 * Sets the next attack.
	 */
	public void setNext() {
		if (random) {
			index = RandomExt.random(attacks.length);
		} else {
			index = (index + 1) % attacks.length;
		}
	}
	
	/**
	 * Gets the next attack.
	 * @return The attack event.
	 */
	public AttackEvent getNext() {
		return attacks[index];
	}

	/**
	 * Gets the meleeFollowing value.
	 * @return The meleeFollowing.
	 */
	public boolean isMeleeFollowing() {
		return meleeFollowing;
	}

	/**
	 * Sets the meleeFollowing value.
	 * @param meleeFollowing The meleeFollowing to set.
	 */
	public void setMeleeFollowing(boolean meleeFollowing) {
		this.meleeFollowing = meleeFollowing;
	}
}