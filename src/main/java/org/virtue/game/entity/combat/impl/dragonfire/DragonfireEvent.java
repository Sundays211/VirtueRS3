package org.virtue.game.entity.combat.impl.dragonfire;

import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.FollowingType;

/**
 * Handles dragonfire attack events.
 * @author Emperor
 *
 */
public class DragonfireEvent extends AttackEvent {

	/**
	 * The default dragonfire handler.
	 */
	public static final AttackHandler HANDLER = new DragonfireHandler();
	
	/**
	 * Constructs a new {@code DragonfireEvent} {@code Object}.
	 */
	public DragonfireEvent() {
		super(FollowingType.MAGIC, HANDLER);
	}
	
	/**
	 * Constructs a new {@code DragonfireEvent} {@code Object}.
	 * @param follower The following type.
	 */
	public DragonfireEvent(FollowingType follower) {
		super(follower, HANDLER);
	}

	@Override
	public AttackEvent instantiate() {
		return new DragonfireEvent();
	}

}