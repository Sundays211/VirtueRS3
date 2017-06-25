package org.virtue.game.entity.combat.impl;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.impl.melee.MeleeFollower;
import org.virtue.game.entity.combat.impl.range.RangeFollower;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.Point;
import org.virtue.game.map.movement.path.impl.AbstractPathfinder;
import org.virtue.game.map.movement.path.impl.DumbPathfinder;
import org.virtue.game.map.movement.path.impl.SmartPathfinder;
import org.virtue.game.map.square.RegionManager;
import org.virtue.game.node.Node;

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
		if (getInteraction(entity, lock) == Interaction.STILL) {
			entity.getMovement().reset();
			return true;
		}
		CoordGrid destination = getNextDestination(entity, lock);
		boolean inside = isInsideEntity(entity.getCurrentTile(), lock);
		if (inside) {
			destination = findBorderLocation(entity, lock);
		}
		if (destination == null) {
			destination = lock.getCurrentTile();
		}
		if (!destination.equals(entity.getMovement().getDestination())) {
			Path path = AbstractPathfinder.find(entity, destination, true, entity instanceof Player ? new SmartPathfinder() : new DumbPathfinder());
			if (entity.getMovement() != null && path != null) {
				if (entity instanceof Player) {
					entity.getMovement().setWalkSteps(path.getPoints());
					entity.getMovement().setDestination(destination);
				} else {
					Point step = path.getPoints().peek();
					if (step != null) {
						System.out.println("Roar");
						entity.getMovement().move(CompassPoint.getLogicalDirection(entity.getCurrentTile(), new CoordGrid(step.getX(), step.getY(), 0)));
					}
				}
			} else {
				System.out.println("Hurr " + path);
			}
		}
		return interaction == Interaction.MOVING;
	}
	/**
	 * Finds the closest location next to the node.
	 * @return The location to walk to.
	 */
	private static CoordGrid findBorderLocation(Entity mover, Entity destination) {
		int size = destination.getSize();
		CoordGrid centerDest = destination.getCurrentTile().copyNew(size >> 1, size >> 1, 0);
		CoordGrid center = mover.getCurrentTile().copyNew(mover.getSize() >> 1, mover.getSize() >> 1, 0);
		CompassPoint direction = CompassPoint.getLogicalDirection(centerDest, center);
		CoordGrid delta = CoordGrid.getDelta(destination.getCurrentTile(), mover.getCurrentTile());
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
				amount = mover.getSize() + delta.getY();
				break;
			case WEST:
				amount = mover.getSize() + delta.getX();
				break;
			default:
				return null;
			}
			for (int j = 0; j < amount; j++) {
				for (int s = 0; s < mover.getSize(); s++) {
					switch (direction) {
					case NORTH:
						if (!RegionManager.checkDirection(mover.getCurrentTile().copyNew(s, j + mover.getSize(), 0), direction)) {
							direction = CompassPoint.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case EAST:
						if (!RegionManager.checkDirection(mover.getCurrentTile().copyNew(j + mover.getSize(), s, 0), direction)) {
							direction = CompassPoint.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case SOUTH:
						if (!RegionManager.checkDirection(mover.getCurrentTile().copyNew(s, -(j + 1), 0), direction)) {
							direction = CompassPoint.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					case WEST:
						if (!RegionManager.checkDirection(mover.getCurrentTile().copyNew(-(j + 1), s, 0), direction)) {
							direction = CompassPoint.get((direction.toInteger() + 1) & 3);
							continue main;
						}
						break;
					default:
						return null;
					}
				}
			}
			CoordGrid location = mover.getCurrentTile().copyNew(direction, amount);
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
	public CoordGrid getNextDestination(Entity entity, Entity lock) {
		CoordGrid l = getClosestTo(entity, lock, lock.getCurrentTile().copyNew(0, -1, 0));
		if (entity.getSize() > 1) {
			if (l.getX() < lock.getCurrentTile().getX()) {
				l = l.copyNew(-(entity.getSize() - 1), 0, 0);
			}
			if (l.getY() < lock.getCurrentTile().getY()) {
				l = l.copyNew(0, -(entity.getSize() - 1), 0);
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
	public static CoordGrid getClosestTo(Entity mover, Node node, CoordGrid suggestion) {
		CoordGrid nl = node.getCurrentTile();
		int diffX = suggestion.getX() - nl.getX();
		int diffY = suggestion.getY() - nl.getY();
		CompassPoint moveDir = CompassPoint.NORTH;
		if (diffX < 0) {
			moveDir = CompassPoint.EAST;
		} else if (diffX >= node.getSize()) {
			moveDir = CompassPoint.WEST;
		} else if (diffY >= node.getSize()) {
			moveDir = CompassPoint.SOUTH;
		}
		double distance = 9999.9;
		CoordGrid destination = suggestion;
		for (int c = 0; c < 4; c++) {
			for (int i = 0; i < node.getSize() + 1; i++) {
				for (int j = 0; j < (i == 0 ? 1 : 2); j++) {
					CompassPoint current = CompassPoint.get((moveDir.toInteger() + (j == 1 ? 3 : 1)) % 4);
					CoordGrid loc = suggestion.copyNew(current.getDeltaX() * i, current.getDeltaY() * i, 0);
					if (moveDir.toInteger() % 2 == 0) {
						if (loc.getX() < nl.getX() || loc.getX() > nl.getX() + node.getSize() - 1) {
							continue;
						}
					} else {
						if (loc.getY() < nl.getY() || loc.getY() > nl.getY() + node.getSize() - 1) {
							continue;
						}
					}
					if (RegionManager.checkDirection(loc, moveDir)) {
						double dist = mover.getCurrentTile().getDistance(loc);
						if (dist < distance) {
							distance = dist;
							destination = loc;
						}
					}
				}
			}
			moveDir = CompassPoint.get((moveDir.toInteger() + 1) % 4);
			int offsetX = Math.abs(moveDir.getDeltaY() * (node.getSize() >> 1)); // Not a mixup between x & y!
			int offsetY = Math.abs(moveDir.getDeltaX() * (node.getSize() >> 1));
			if (moveDir.toInteger() < 2) {
				suggestion = node.getCurrentTile().copyNew(-moveDir.getDeltaX() + offsetX, -moveDir.getDeltaY() + offsetY, 0);
			} else {
				suggestion = node.getCurrentTile().copyNew(-moveDir.getDeltaX() * node.getSize() + offsetX, -moveDir.getDeltaY() * node.getSize() + offsetY, 0);
			}
		}
		return destination;
	}
	
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