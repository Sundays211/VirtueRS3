package org.virtue.game.map.movement.path;

import java.util.Optional;
import java.util.stream.Stream;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.map.ClipFlag;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.movement.Waypoint;
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
			SceneLocation loc = (SceneLocation) destination;
			int shape = loc.getShape();
			int rotation = loc.getRotation();
			if (shape == 10 || shape == 11 || shape == 22) {
				int sizeX = loc.getSizeX();
				int sizeY = loc.getSizeY();
				int surroundings = loc.getLocType().surroundings;
				if (rotation != 0) {
					surroundings = (surroundings << rotation & 0xf) + (surroundings >> 4 - rotation);
				}
				return finder.find(start, moverSize, destination.getCurrentTile(), sizeX, sizeY, 0, 0, surroundings, near);
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

	public static Optional<Path> findAdjacent(Entity entity) {
		return Stream.of(CompassPoint.EAST, CompassPoint.NORTH, CompassPoint.WEST, CompassPoint.SOUTH)
			.map(dir -> find(entity, entity.getCurrentTile().offset(dir), false, DUMB))
			.filter(Path::isSuccessful).findFirst();
	}
	
	//Helper method for fetching clip flags
	private static int getClippingFlag(int level, int x, int y) {
		return World.getInstance().getRegions().getClippingFlag(level, x, y);
	}
	
	public static boolean checkStep (Waypoint waypoint, int level, int size) {
		int xOffset = waypoint.getDiffX(), yOffset = waypoint.getDiffY();
		int fromX = waypoint.getX() - xOffset, fromY = waypoint.getY() - yOffset;
		if (size == 1) {
			int mask = getClippingFlag(level, fromX + xOffset, fromY + yOffset);
			if (xOffset == -1 && yOffset == 0) {
				return (mask & ClipFlag.CHECK_EAST) == 0;
			}
			if (xOffset == 1 && yOffset == 0) {
				return (mask & ClipFlag.CHECK_WEST) == 0;
			}
			if (xOffset == 0 && yOffset == -1) {
				return (mask & ClipFlag.CHECK_NORTH) == 0;
			}
			if (xOffset == 0 && yOffset == 1) {
				return (mask & ClipFlag.CHECK_SOUTH) == 0;
			}
			if (xOffset == -1 && yOffset == -1) {
				return (mask & ClipFlag.CHECK_NORTHEAST) == 0 && 
						(getClippingFlag(level, fromX - 1, fromY) & ClipFlag.CHECK_EAST) == 0 && 
						(getClippingFlag(level, fromX, fromY - 1) & ClipFlag.CHECK_NORTH) == 0;
			}
			if (xOffset == 1 && yOffset == -1) {
				return (mask & ClipFlag.CHECK_NORTHWEST) == 0 && 
						(getClippingFlag(level, fromX + 1, fromY) & ClipFlag.CHECK_WEST) == 0 && 
						(getClippingFlag(level, fromX, fromY - 1) & ClipFlag.CHECK_NORTH) == 0;
			}
			if (xOffset == -1 && yOffset == 1) {
				return (mask & ClipFlag.CHECK_SOUTHEAST) == 0 && 
						(getClippingFlag(level, fromX - 1, fromY) & ClipFlag.CHECK_EAST) == 0 && 
						(getClippingFlag(level, fromX, fromY + 1) & ClipFlag.CHECK_SOUTH) == 0;
			}
			if (xOffset == 1 && yOffset == 1) {
				return (mask & ClipFlag.CHECK_SOUTHWEST) == 0 && 
						(getClippingFlag(level, fromX + 1, fromY) & ClipFlag.CHECK_WEST) == 0 && 
						(getClippingFlag(level, fromX, fromY + 1) & ClipFlag.CHECK_SOUTH) == 0;
			}
		} else if (size == 2) {
			if (xOffset == -1 && yOffset == 0) {
				return (getClippingFlag(level, fromX - 1, fromY) & ClipFlag.CHECK_NORTHEAST) == 0 && 
						(getClippingFlag(level, fromX - 1, fromY + 1) & ClipFlag.CHECK_SOUTHEAST) == 0;
			}
			if (xOffset == 1 && yOffset == 0) {
				return (getClippingFlag(level, fromX + 2, fromY) & ClipFlag.CHECK_NORTHWEST) == 0 && 
						(getClippingFlag(level, fromX + 2, fromY + 1) & ClipFlag.CHECK_SOUTHWEST) == 0;
			}
			if (xOffset == 0 && yOffset == -1) {
				return (getClippingFlag(level, fromX, fromY - 1) & ClipFlag.CHECK_NORTHEAST) == 0 && 
						(getClippingFlag(level, fromX + 1, fromY - 1) & ClipFlag.CHECK_NORTHWEST) == 0;
			}
			if (xOffset == 0 && yOffset == 1) {
				return (getClippingFlag(level, fromX, fromY + 2) & ClipFlag.CHECK_SOUTHEAST) == 0 && 
						(getClippingFlag(level, fromX + 1, fromY + 2) & ClipFlag.CHECK_SOUTHWEST) == 0;
			}
			if (xOffset == -1 && yOffset == -1) {
				return (getClippingFlag(level, fromX - 1, fromY) & (ClipFlag.CHECK_NORTHEAST | ClipFlag.CHECK_SOUTHEAST)) == 0 && 
						(getClippingFlag(level, fromX - 1, fromY - 1) & ClipFlag.CHECK_NORTHEAST) == 0 && 
						(getClippingFlag(level, fromX, fromY - 1) & (ClipFlag.CHECK_NORTHWEST | ClipFlag.CHECK_NORTHEAST)) == 0;
			}
			if (xOffset == 1 && yOffset == -1) {
				return (getClippingFlag(level, fromX + 1, fromY - 1) & (ClipFlag.CHECK_NORTHWEST | ClipFlag.CHECK_NORTHEAST)) == 0 && 
						(getClippingFlag(level, fromX + 2, fromY - 1) & ClipFlag.CHECK_NORTHWEST) == 0 && 
						(getClippingFlag(level, fromX + 2, fromY) & (ClipFlag.CHECK_NORTHWEST | ClipFlag.CHECK_SOUTHWEST)) == 0;
			}
			if (xOffset == -1 && yOffset == 1) {
				return (getClippingFlag(level, fromX - 1, fromY + 1) & (ClipFlag.CHECK_NORTHEAST | ClipFlag.CHECK_SOUTHEAST)) == 0 && 
						(getClippingFlag(level, fromX - 1, fromY + 1) & ClipFlag.CHECK_SOUTHEAST) == 0 && 
						(getClippingFlag(level, fromX, fromY + 2) & (ClipFlag.CHECK_SOUTHEAST | ClipFlag.CHECK_SOUTHWEST)) == 0;
			}
			if (xOffset == 1 && yOffset == 1) {
				return (getClippingFlag(level, fromX + 1, fromY + 2) & (ClipFlag.CHECK_SOUTHEAST | ClipFlag.CHECK_SOUTHWEST)) == 0 &&
						(getClippingFlag(level, fromX + 2, fromY + 2) & ClipFlag.CHECK_SOUTHWEST) == 0 &&
						(getClippingFlag(level, fromX + 1, fromY + 1) & (ClipFlag.CHECK_NORTHWEST | ClipFlag.CHECK_SOUTHWEST)) == 0;
			}
		} else {
			if (xOffset == -1 && yOffset == 0) {
				if ((getClippingFlag(level, fromX - 1, fromY) & ClipFlag.CHECK_NORTHEAST) != 0 || 
						(getClippingFlag(level, fromX - 1, -1 + (fromY + size)) & ClipFlag.CHECK_SOUTHEAST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size - 1; sizeOffset++) {
					if ((getClippingFlag(level, fromX - 1, fromY + sizeOffset) & ClipFlag.CHECK_EAST_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == 1 && yOffset == 0) {
				if ((getClippingFlag(level, fromX + size, fromY) & ClipFlag.CHECK_NORTHWEST) != 0 || 
						(getClippingFlag(level, fromX + size, fromY - (-size + 1)) & ClipFlag.CHECK_SOUTHWEST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size - 1; sizeOffset++) {
					if ((getClippingFlag(level, fromX + size, fromY + sizeOffset) & ClipFlag.CHECK_WEST_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == 0 && yOffset == -1) {
				if ((getClippingFlag(level, fromX, fromY - 1) & ClipFlag.CHECK_NORTHEAST) != 0 || 
						(getClippingFlag(level, fromX + size - 1, fromY - 1) & ClipFlag.CHECK_NORTHWEST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size - 1; sizeOffset++) {
					if ((getClippingFlag(level, fromX + sizeOffset, fromY - 1) & ClipFlag.CHECK_NORTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == 0 && yOffset == 1) {
				if ((getClippingFlag(level, fromX, fromY + size) & ClipFlag.CHECK_SOUTHEAST) != 0 || 
						(getClippingFlag(level, fromX + (size - 1), fromY + size) & ClipFlag.CHECK_SOUTHWEST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size - 1; sizeOffset++) {
					if ((getClippingFlag(level, fromX + sizeOffset, fromY + size) & ClipFlag.CHECK_SOUTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == -1 && yOffset == -1) {
				if ((getClippingFlag(level, fromX - 1, fromY - 1) & ClipFlag.CHECK_NORTHEAST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size; sizeOffset++) {
					if ((getClippingFlag(level, fromX - 1, fromY + (-1 + sizeOffset)) & ClipFlag.CHECK_EAST_VARIABLE) != 0 || 
							(getClippingFlag(level, sizeOffset - 1 + fromX, fromY - 1) & ClipFlag.CHECK_NORTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == 1 && yOffset == -1) {
				if ((getClippingFlag(level, fromX + size, fromY - 1) & ClipFlag.CHECK_NORTHWEST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size; sizeOffset++) {
					if ((getClippingFlag(level, fromX + size, sizeOffset + (-1 + fromY)) & ClipFlag.CHECK_WEST_VARIABLE) != 0 || 
							(getClippingFlag(level, fromX + sizeOffset, fromY - 1) & ClipFlag.CHECK_NORTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == -1 && yOffset == 1) {
				if ((getClippingFlag(level, fromX - 1, fromY + size) & ClipFlag.CHECK_SOUTHEAST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size; sizeOffset++) {
					if ((getClippingFlag(level, fromX - 1, fromY + sizeOffset) & ClipFlag.CHECK_EAST_VARIABLE) != 0 || 
							(getClippingFlag(level, -1 + (fromX + sizeOffset), fromY + size) & ClipFlag.CHECK_SOUTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			} else if (xOffset == 1 && yOffset == 1) {
				if ((getClippingFlag(level, fromX + size, fromY + size) & ClipFlag.CHECK_SOUTHWEST) != 0) {
					return false;
				}
				for (int sizeOffset = 1; sizeOffset < size; sizeOffset++) {
					if ((getClippingFlag(level, fromX + sizeOffset, fromY + size) & ClipFlag.CHECK_WEST_VARIABLE) != 0 || 
							(getClippingFlag(level, fromX + size, fromY + sizeOffset) & ClipFlag.CHECK_SOUTH_VARIABLE) != 0) {
						return false;
					}
				}
				return true;
			}
		}
		throw new RuntimeException("Invalid step! xOffset="+xOffset+", yOffset="+yOffset+", size="+size);
	}

}
