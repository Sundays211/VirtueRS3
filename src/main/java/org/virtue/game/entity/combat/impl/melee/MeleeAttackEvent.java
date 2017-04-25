package org.virtue.game.entity.combat.impl.melee;

import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.FollowingType;

/**
 * Handles a melee attack event.
 * @author Emperor
 *
 */
public final class MeleeAttackEvent extends AttackEvent {

	/**
	 * The melee attack handler.
	 */
	public static final AttackHandler HANDLER = new MeleeAttackHandler();
	
	/**
	 * Constructs a new {@code MeleeAttackEvent} {@code Object}.
	 */
	public MeleeAttackEvent() {
		super(FollowingType.MELEE, HANDLER);
	}

	@Override
	public AttackEvent instantiate() {
		return new MeleeAttackEvent();
	}
	

}