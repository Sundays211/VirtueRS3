package org.virtue.model.entity.combat.impl.combo;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.utility.RandomExt;

/**
 * Handles attack events switching.
 * @author Emperor
 *
 */
public class SwitchAttackEvent extends AttackEvent {
	
	/**
	 * The current index.
	 */
	private int index = 0;
	
	/**
	 * If the next attack should be selected at random.
	 */
	private boolean random;

	/**
	 * The available attacks.
	 */
	private final SwitchAttack[] attacks;
	
	/**
	 * Constructs a new {@code SwitchAttackEvent} {@code Object}.
	 * @param attacks The attacks available.
	 */
	public SwitchAttackEvent(SwitchAttack... attacks) {
		this(FollowingType.MAGIC, attacks);
	}
	
	/**
	 * Constructs a new {@code SwitchAttackEvent} {@code Object}.
	 * @param follower The combat following type.
	 * @param attacks The attacks available.
	 */
	public SwitchAttackEvent(FollowingType follower, SwitchAttack... attacks) {
		this(follower, true, attacks);
	}
	
	/**
	 * Constructs a new {@code SwitchAttackEvent} {@code Object}.
	 * @param follower The combat following type.
	 * @param attacks The attacks available.
	 */
	public SwitchAttackEvent(FollowingType follower, boolean random, SwitchAttack... attacks) {
		super(follower, null);
		this.attacks = attacks;
		this.random = random;
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		handler = selectBest(entity, lock).getHandler();
		return handler.getAttackInfo(entity, lock);
	}
	
	/**
	 * Selects an attack event.
	 * @param entity The entity.
	 * @param lock The victim.
	 * @return The attack event.
	 */
	public SwitchAttack selectBest(Entity entity, Entity lock) {
		setAttack();
		if (!random) {
			int next = -1;
			for (int i = 0; i < attacks.length; i++) {
				int current = (index + i) % attacks.length;
				SwitchAttack attack = attacks[current];
				if (attack.getStyle().canAttack(entity, lock)) {
					next = current;
					break;
				}
				if (next == -1 && !attack.isMeleeRange()) {
					next = current;
				}
			}
			if (next > -1) {
				index = next;
			}
		}
		return getAttack();
	}

	/**
	 * Sets and returns the next attack.
	 * @return The next attack.
	 */
	public SwitchAttack select() {
		setAttack();
		return getAttack();
	}
	
	/**
	 * Sets the next attack.
	 */
	public void setAttack() {
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
	public SwitchAttack getAttack() {
		return attacks[index];
	}

	/**
	 * Gets the attacks value.
	 * @return The attacks.
	 */
	public SwitchAttack[] getAttacks() {
		return attacks;
	}

	/**
	 * Gets the random value.
	 * @return The random.
	 */
	public boolean isRandom() {
		return random;
	}

	/**
	 * Sets the random value.
	 * @param random The random to set.
	 */
	public void setRandom(boolean random) {
		this.random = random;
	}

	/**
	 * Gets the index value.
	 * @return The index.
	 */
	public int getIndex() {
		return index;
	}

	/**
	 * Sets the index value.
	 * @param index The index to set.
	 */
	public void setIndex(int index) {
		this.index = index;
	}

}