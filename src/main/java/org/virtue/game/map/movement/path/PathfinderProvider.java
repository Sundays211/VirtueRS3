package org.virtue.game.map.movement.path;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.movement.path.impl.DumbPathfinder;
import org.virtue.game.map.movement.path.impl.ProjectilePathfinder;
import org.virtue.game.map.movement.path.impl.SmartPathfinder;
import org.virtue.game.node.Node;

public class PathfinderProvider {

	/**
	 * The smart path finder.
	 */
	public static final Pathfinder SMART = new SmartPathfinder();

	/**
	 * The dumb path finder.
	 */
	public static final Pathfinder DUMB = new DumbPathfinder();

	/**
	 * The projectile path finder.
	 */
	public static final Pathfinder PROJECTILE = new ProjectilePathfinder();

	public PathfinderProvider() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @return The path.
	 */
	public static Path find(Entity mover, Node destination) {
		return find(mover, destination, true, SMART);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end location, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(Entity mover, Node destination, boolean near, Pathfinder finder) {
		return find(mover.getCurrentTile(), mover.getSize(), destination, near, finder);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, Node destination) {
		return find(start, destination, true, SMART);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end coords, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, Node destination, boolean near, Pathfinder finder) {
		return find(start, 1, destination, near, finder);
	}
	
	public static Path find(Entity mover, CoordGrid destination, boolean near) {
		return find(mover.getCurrentTile(), mover.getSize(), destination, near, SMART);
	}
	
	public static Path find(Entity mover, CoordGrid destination, boolean near, Pathfinder finder) {
		return find(mover.getCurrentTile(), mover.getSize(), destination, near, finder);
	}
	
	public static Path find(CoordGrid start, int moverSize, CoordGrid destination, boolean near, Pathfinder finder) {
		synchronized (finder) {
			return finder.find(start, moverSize, destination, 0, 0, 0, 0, 0, near);
		}
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end coords, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, int moverSize, Node destination, boolean near, Pathfinder finder) {
		if (destination instanceof SceneLocation) {
			SceneLocation object = (SceneLocation) destination;
			int shape = object.getShape();
			int rotation = object.getRotation();
			if (shape == 10 || shape == 11 || shape == 22) {
				int sizeX = object.getSizeX();
				int sizeY = object.getSizeY();
				int walkingFlag = object.getLocType().walkingFlag;
				if (rotation != 0) {
					walkingFlag = (walkingFlag << rotation & 0xf) + (walkingFlag >> 4 - rotation);
				}
				return finder.find(start, moverSize, destination.getCurrentTile(), sizeX, sizeY, 0, 0, walkingFlag, near);
			}
			return finder.find(start, moverSize, destination.getCurrentTile(), 0, 0, rotation, 1 + shape, 0, near);
		}
		int size = 0;
		if (destination instanceof Entity) {
			size = destination.getSize();
		}
		//TODO:	else if (destination instanceof GroundItem && !RegionManager.isTeleportPermitted(destination.getCurrentTile())) {
		//			size = 1;
		//		}
		synchronized (finder) {
			return finder.find(start, moverSize, destination.getCurrentTile(), size, size, 0, 0, 0, near);
		}
	}

	public static CoordGrid findAdjacent(Entity entity) {
		if (find(entity, entity.getCurrentTile().copyNew(-1, 0, 0), false, DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(-1, 0, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(0, -1, 0), false, DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(0, -1, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(1, 0, 0), false, DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(1, 0, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(0, 1, 0), false, DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(0, 1, 0);
		}
		return null;
	}

}
