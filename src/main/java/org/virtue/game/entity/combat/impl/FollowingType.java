package org.virtue.game.entity.combat.impl;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.impl.melee.MeleeFollower;
import org.virtue.game.entity.combat.impl.range.RangeFollower;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.PathfinderProvider;

/**
 * Interface for combat following handlers.
 * @author Emperor
 *
 */
public abstract class FollowingType {

	/**
	 * The melee following type.
	 */
	public static final FollowingType MELEE = new MeleeFollower();

	/**
	 * The range following type.
	 */
	public static final FollowingType RANGE = new RangeFollower();

	/**
	 * The magic following type.
	 */
	public static final FollowingType MAGIC = new RangeFollower();//TODO
	
	/**
	 * Follows the locked target.
	 * @param entity The entity following the target.
	 * @param lock The locked target.
	 * @return {@code True} if the entity is in correct distance to attack the target.
	 */
	public boolean follow(Entity entity, Entity lock) {
		if (!entity.getCurrentTile().withinDistance(lock.getCurrentTile(), 20)) {
			entity.getCombatSchedule().releaseLock();
			return false;
		}
		Interaction interaction = getInteraction(entity, lock);
		if (interaction == Interaction.STILL) {
			entity.getMovement().reset();
			return true;
		}
		CoordGrid destination = lock.getCurrentTile();
		if (!destination.equals(entity.getMovement().getDestination())) {
			Path path = PathfinderProvider.find(entity, destination, false, entity instanceof Player ? PathfinderProvider.SMART : PathfinderProvider.DUMB);
			if (entity.getMovement() != null && path != null && path.isSuccessful()) {
				entity.getMovement().setWaypoints(path.getPoints());
			}
			return false;
		}
		return interaction == Interaction.MOVING;
	}
	
	/**
	 * Gets the next destination.
	 * @param entity The entity.
	 * @param lock The target.
	 * @return The next destination.
	 */
	public CoordGrid getNextDestination(Entity entity, Entity lock) {
		return lock.getCurrentTile();
	}
	
	/**
	 * If the entity can attack from its current location.
	 * @param entity The attacking entity.
	 * @param lock The locked target.
	 * @return {@code True} if so.
	 */
	public abstract Interaction getInteraction(Entity entity, Entity lock);
	
	/**
	 * Checks if the mover is standing on an invalid position.
	 * @param l The location.
	 * @return {@code True} if so.
	 */
	public static boolean isInsideEntity(CoordGrid l, Entity lock) {
		if (lock.getMovement().hasSteps()) {
			return false;
		}
		CoordGrid loc = lock.getCurrentTile();
		int size = lock.getSize();
		if (l.getX() >= size + loc.getX() || lock.getSize() + l.getX() <= loc.getX()) {
			return false;
		}
		if (loc.getY() + size <= l.getY() || l.getY() + lock.getSize() <= loc.getY()) {
			return false;
		}
		return true;
	}

	/**
	 * Combat movement interaction types.
	 * @author Emperor
	 *
	 */
	public static enum Interaction {
		
		/**
		 * Can't currently interact.
		 */
		NONE,
		
		/**
		 * Can currently interact and doesn't have to move.
		 */
		STILL,
		
		/**
		 * Can interact but has to move.
		 */
		MOVING;
	}
}