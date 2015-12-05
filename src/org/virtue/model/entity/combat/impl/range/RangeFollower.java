package org.virtue.model.entity.combat.impl.range;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.impl.FollowingType;

/**
 * Handles range combat following.
 * @author Emperor
 *
 */
public final class RangeFollower extends FollowingType {

	@Override
	public Interaction getInteraction(Entity entity, Entity lock) {
		//TODO: Properly do this
		if (entity.getCurrentTile().withinDistance(lock.getCurrentTile(), 7)) {
			return Interaction.STILL;
		}
		return Interaction.MOVING;
	}

}