package org.virtue.model.entity.combat.impl;

import org.virtue.model.Node;
import org.virtue.model.World;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.impl.melee.MeleeFollower;
import org.virtue.model.entity.combat.impl.range.RangeFollower;
import org.virtue.model.entity.movement.Direction;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.routefinder.AStarPathFinder;
import org.virtue.model.entity.routefinder.Path;
import org.virtue.model.entity.routefinder.PathFinder;
import org.virtue.model.entity.routefinder.SimplePathFinder;

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
	 * Dumb path finder.
	 */
	private static final PathFinder DUMB = new SimplePathFinder(World.getInstance().getRegions());

	/**
	 * Smart path finder.
	 */
	private static final PathFinder SMART = new AStarPathFinder(World.getInstance().getRegions());
	
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
		if (getInteraction(entity, lock) == Interaction.STILL) {
			entity.getMovement().reset();
			return true;
		}
		PathFinder pathfinder = entity instanceof Player ? SMART : DUMB;
		Tile destination = getNextDestination(entity, lock);
		boolean inside = isInsideEntity(entity.getCurrentTile(), lock);
		if (inside) {
			destination = findBorderLocation(entity, lock);
		}
		if (destination == null) {
			destination = lock.getCurrentTile();
		}
		if (!destination.equals(entity.getMovement().getDestination()) && !inside) {
			Path path = pathfinder.find(entity, destination.getX(), destination.getY());
			
			if (entity.getMovement() != null && path != null) {
				entity.getMovement().setWalkSteps(path.getPoints());
				entity.getMovement().setDestination(destination);
			}
		}
		return interaction == Interaction.MOVING;
	}
	/**
	 * Finds the closest location next to the node.
	 * @return The location to walk to.
	 */
	private static Tile findBorderLocation(Entity mover, Entity destination) {
		int size = destination.getPlayerCount();
		Tile centerDest = destination.getCurrentTile().copyNew(size >> 1, size >> 1, 0);
		Tile center = mover.getCurrentTile().copyNew(mover.getPlayerCount() >> 1, mover.getPlayerCount() >> 1, 0);
		Direction direction = Direction.getLogicalDirection(centerDest, center);
		Tile delta = Tile.getDelta(destination.getCurrentTile(), mover.getCurrentTile());
		main: for (int i = 0; i < 4; i++) {
			int amount = 0;
			switch (direction) {
			case NORTH:
				amount = size - delta.getY();
				break;
			case EAST:
				amount = size - delta.getX();
				break;
			case SOUTH:
				amount = mover.getPlayerCount() + delta.getY();
				break;
			case WEST:
				amount = mover.getPlayerCount() + delta.getX();
				break;
			default:
				return null;
			}
			for (int j = 0; j < amount; j++) {
				for (int s = 0; s < mover.getPlayerCount(); s++) {
					switch (direction) {
					case NORTH:
						if (!direction.canMove(mover.getCurrentTile().copyNew(s, j + mover.getPlayerCount(), 0))) {
							direction = Direction.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case EAST:
						if (!direction.canMove(mover.getCurrentTile().copyNew(j + mover.getPlayerCount(), s, 0))) {
							direction = Direction.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case SOUTH:
						if (!direction.canMove(mover.getCurrentTile().copyNew(s, -(j + 1), 0))) {
							direction = Direction.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case WEST:
						if (!direction.canMove(mover.getCurrentTile().copyNew(-(j + 1), s, 0))) {
							direction = Direction.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					default:
						return null;
					}
				}
			}
			Tile location = mover.getCurrentTile().copyNew(direction, amount);
			return location;
		}
		return null;
	}
	
	/**
	 * Gets the next destination.
	 * @param entity The entity.
	 * @param lock The target.
	 * @return The next destination.
	 */
	public Tile getNextDestination(Entity entity, Entity lock) {
		Tile l = getClosestTo(entity, lock, lock.getCurrentTile().copyNew(0, -1, 0));
		if (entity.getPlayerCount() > 1) {
			if (l.getX() < lock.getCurrentTile().getX()) {
				l = l.copyNew(-(entity.getPlayerCount() - 1), 0, 0);
			}
			if (l.getY() < lock.getCurrentTile().getY()) {
				l = l.copyNew(0, -(entity.getPlayerCount() - 1), 0);
			}
		}
		return l;
	}
	
	/**
	 * If the entity can attack from its current location.
	 * @param entity The attacking entity.
	 * @param lock The locked target.
	 * @return {@code True} if so.
	 */
	public abstract Interaction getInteraction(Entity entity, Entity lock);
	
	/**
	 * Gets the closest destination to the current destination, to reach the
	 * node.
	 * @param mover The moving entity.
	 * @param node The node to move to.
	 * @param suggestion The suggested destination location.
	 * @return The destination location.
	 */
	public static Tile getClosestTo(Entity mover, Node node, Tile suggestion) {
		Tile nl = node.getCurrentTile();
		int diffX = suggestion.getX() - nl.getX();
		int diffY = suggestion.getY() - nl.getY();
		Direction moveDir = Direction.NORTH;
		if (diffX < 0) {
			moveDir = Direction.EAST;
		} else if (diffX >= node.getPlayerCount()) {
			moveDir = Direction.WEST;
		} else if (diffY >= node.getPlayerCount()) {
			moveDir = Direction.SOUTH;
		}
		double distance = 9999.9;
		Tile destination = suggestion;
		for (int c = 0; c < 4; c++) {
			for (int i = 0; i < node.getPlayerCount() + 1; i++) {
				for (int j = 0; j < (i == 0 ? 1 : 2); j++) {
					Direction current = Direction.get((moveDir.toInteger() + (j == 1 ? 3 : 1)) % 4);
					Tile loc = suggestion.copyNew(current.getDeltaX() * i, current.getDeltaY() * i, 0);
					if (moveDir.toInteger() % 2 == 0) {
						if (loc.getX() < nl.getX() || loc.getX() > nl.getX() + node.getPlayerCount() - 1) {
							continue;
						}
					} else {
						if (loc.getY() < nl.getY() || loc.getY() > nl.getY() + node.getPlayerCount() - 1) {
							continue;
						}
					}
					if (checkTraversal(loc, moveDir)) {
						double dist = mover.getCurrentTile().getDistance(loc);
						if (dist < distance) {
							distance = dist;
							destination = loc;
						}
					}
				}
			}
			moveDir = Direction.get((moveDir.toInteger() + 1) % 4);
			int offsetX = Math.abs(moveDir.getDeltaY() * (node.getPlayerCount() >> 1)); // Not a mixup between x & y!
			int offsetY = Math.abs(moveDir.getDeltaX() * (node.getPlayerCount() >> 1));
			if (moveDir.toInteger() < 2) {
				suggestion = node.getCurrentTile().copyNew(-moveDir.getDeltaX() + offsetX, -moveDir.getDeltaY() + offsetY, 0);
			} else {
				suggestion = node.getCurrentTile().copyNew(-moveDir.getDeltaX() * node.getPlayerCount() + offsetX, -moveDir.getDeltaY() * node.getPlayerCount() + offsetY, 0);
			}
		}
		return destination;
	}
	
	/**
	 * Checks if traversal is permitted.
	 * @param l The location to check.
	 * @param dir The direction to move.
	 * @return {@code True}.
	 */
	public static boolean checkTraversal(Tile l, Direction dir) {
		return Direction.get((dir.toInteger() + 2) % 4).canMove(l);
	}
	
	/**
	 * Checks if the mover is standing on an invalid position.
	 * @param l The location.
	 * @return {@code True} if so.
	 */
	public static boolean isInsideEntity(Tile l, Entity lock) {
		if (lock.getMovement().hasSteps()) {
			return false;
		}
		Tile loc = lock.getCurrentTile();
		int size = lock.getPlayerCount();
		if (l.getX() >= size + loc.getX() || lock.getPlayerCount() + l.getX() <= loc.getX()) {
			return false;
		}
		if (loc.getY() + size <= l.getY() || l.getY() + lock.getPlayerCount() <= loc.getY()) {
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