package org.virtue.model.entity.combat.impl.melee;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.Tile;

/**
 * Handles melee following.
 * @author Emperor
 *
 */
public final class MeleeFollower extends FollowingType {

	@Override
	public Interaction getInteraction(Entity entity, Entity lock) {
		int size = entity.getPlayerCount() >> 1;
		Tile center = entity.getCurrentTile().copyNew(size, size, 0);
		int targetSize = lock.getPlayerCount() >> 1;
		Tile targetCenter = lock.getCurrentTile().copyNew(targetSize, targetSize, 0);
		int distance = Math.max(Math.abs(center.getX() - targetCenter.getX()), Math.abs(center.getY() - targetCenter.getY()));
		int difference = distance - (size + targetSize);
		if (entity.getCurrentTile().isDiagonalTo(lock.getCurrentTile(), lock.getPlayerCount()) && lock.getPlayerCount() == 1) {
			return Interaction.MOVING;
		}
		if (difference == 1) {
			return Interaction.STILL;
		}
		int maximumDistance = entity.getMovement().getMovementType();
		if (entity instanceof Player && lock.getMovement().hasSteps()) {
			maximumDistance += lock.getMovement().getMovementType();
		}
		if (difference == 0 || difference > maximumDistance) {
			return Interaction.NONE;
		}
		return Interaction.MOVING;
	}
}