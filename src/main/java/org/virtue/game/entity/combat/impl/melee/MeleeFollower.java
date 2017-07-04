package org.virtue.game.entity.combat.impl.melee;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;

/**
 * Handles melee following.
 * @author Emperor
 *
 */
public final class MeleeFollower extends FollowingType {

	@Override
	public Interaction getInteraction(Entity entity, Entity lock) {
		int size = entity.getSize() >> 1;
		CoordGrid center = entity.getCurrentTile().copyNew(size, size, 0);
		int targetSize = lock.getSize() >> 1;
		CoordGrid targetCenter = lock.getCurrentTile().copyNew(targetSize, targetSize, 0);
		int distance = Math.max(Math.abs(center.getX() - targetCenter.getX()), Math.abs(center.getY() - targetCenter.getY()));
		int difference = distance - (size + targetSize);
		if (entity.getCurrentTile().isDiagonalTo(lock.getCurrentTile(), lock.getSize()) && lock.getSize() == 1) {
			return Interaction.MOVING;
		}
		if (difference == 1) {
			return Interaction.STILL;
		}
		int maximumDistance = entity.getMovement().getMoveSpeed().getId();
		if (entity instanceof Player && lock.getMovement().hasSteps()) {
			maximumDistance += lock.getMovement().getMoveSpeed().getId();
		}
		if (difference == 0 || difference > maximumDistance) {
			return Interaction.NONE;
		}
		return Interaction.MOVING;
	}
}