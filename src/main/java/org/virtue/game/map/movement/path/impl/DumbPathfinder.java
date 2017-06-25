package org.virtue.game.map.movement.path.impl;

import java.util.ArrayList;
import java.util.List;

import org.virtue.game.World;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.Point;
import org.virtue.game.map.movement.routefinder.TraversalMap;
import org.virtue.game.map.square.RegionManager;

/**
 * A pathfinder implementation used for an easy path, where the pathfinder won't
 * find a way around clipped objects.. <br> This is used for NPC combat
 * following, NPC random movement, etc.
 * @author Emperor
 */
public final class DumbPathfinder extends AbstractPathfinder {

	/**
	 * If a path can be found.
	 */
	private boolean found;

	/**
	 * The plane.
	 */
	private int z;

	/**
	 * The x-coordinate.
	 */
	private int x;

	/**
	 * The y-coordinate.
	 */
	private int y;

	/**
	 * Constructs a new {@code DumbPathfinder} {@code Object}.
	 */
	public DumbPathfinder() {
		this(World.getInstance().getRegions());
	}

	/**
	 * Constructs a new {@code DumbPathfinder} {@code Object}.
	 * @param map The traversal map.
	 */
	public DumbPathfinder(TraversalMap map) {
		super.map = map;
	}
	
	@Override
	public Path find(CoordGrid start, int size, CoordGrid end, int sizeX, int sizeY, int rotation, int type, int walkingFlag, boolean near) {
		Path path = new Path();
		z = start.getLevel();
		x = start.getX();
		y = start.getY();
		List<Point> points = new ArrayList<>();
		path.setSuccesful(true);
		while (x != end.getX() || y != end.getY()) {
			CompassPoint[] directions = getDirection(x, y, end);
			if (type != 0) {
				if ((type < 5 || type == 10) && canDoorInteract(x, y, size, end.getX(), end.getY(), type - 1, rotation, z)) {
					break;
				}
				if (type < 10 && canDecorationInteract(x, y, size, end.getX(), end.getY(), type - 1, rotation, z)) {
					break;
				}
			}
			if (sizeX != 0 && sizeY != 0) {
				if (canInteract(x, y, size, end.getX(), end.getY(), sizeX, sizeY, walkingFlag, z)) {
					break;
				}
				if (directions.length > 1) { // Ensures we approach the location
					// correctly (non-diagonal).
					CompassPoint dir = directions[0];
					if (x + dir.getDeltaX() == end.getX() && y + dir.getDeltaY() == end.getY()) {
						directions[0] = directions[directions.length - 1];
						directions[directions.length - 1] = dir;
					}
				}
			}
			found = true;
			if (size < 2) {
				checkSingleTraversal(points, directions);
			} else if (size == 2) {
				checkDoubleTraversal(points, directions);
			} else {
				checkVariableTraversal(points, directions, size);
			}
			if (!found) {
				path.setMoveNear(x != start.getX() || y != start.getY());
				path.setSuccesful(false);
				break;
			}
		}
		if (!points.isEmpty()) {
			CompassPoint last = null;
			for (int i = 0; i < points.size() - 1; i++) {
				Point p = points.get(i);
				if (p.getDirection() != last) {
					path.getPoints().add(p);
				}
			}
			path.getPoints().add(points.get(points.size() - 1));
		}
		return path;
	}

	/**
	 * Checks traversal for a size 1 entity.
	 * @param points The points list.
	 * @param directions The directions.
	 */
	private void checkSingleTraversal(List<Point> points, CompassPoint... directions) {
		for (CompassPoint dir : directions) {
			found = true;
			switch (dir) {
			case NORTH:
				if ((RegionManager.getClippingFlag(z, x, y + 1) & 0x12c0120) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y + 1, dir));
				y++;
				break;
			case NORTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y) & 0x12c0180) != 0 || (RegionManager.getClippingFlag(z, x, y + 1) & 0x12c0120) != 0 || (RegionManager.getClippingFlag(z, x + 1, y + 1) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y + 1, dir));
				x++;
				y++;
				break;
			case EAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y) & 0x12c0180) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y, dir));
				x++;
				break;
			case SOUTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y) & 0x12c0180) != 0 || (RegionManager.getClippingFlag(z, x, y - 1) & 0x12c0102) != 0 || (RegionManager.getClippingFlag(z, x + 1, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y - 1, dir));
				x++;
				y--;
				break;
			case SOUTH:
				if ((RegionManager.getClippingFlag(z, x, y - 1) & 0x12c0102) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y - 1, dir));
				y--;
				break;
			case SOUTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y) & 0x12c0108) != 0 || (RegionManager.getClippingFlag(z, x, y - 1) & 0x12c0102) != 0 || (RegionManager.getClippingFlag(z, x - 1, y - 1) & 0x12c010e) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y - 1, dir));
				x--;
				y--;
				break;
			case WEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y) & 0x12c0108) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y, dir));
				x--;
				break;
			case NORTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y) & 0x12c0108) != 0 || (RegionManager.getClippingFlag(z, x, y + 1) & 0x12c0120) != 0 || (RegionManager.getClippingFlag(z, x - 1, y + 1) & 0x12c0138) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y + 1, dir));
				x--;
				y++;
				break;
			}
			if (found) {
				break;
			}
		}
	}

	/**
	 * Checks traversal for a size 1 entity.
	 * @param points The points list.
	 * @param directions The directions.
	 */
	private void checkDoubleTraversal(List<Point> points, CompassPoint... directions) {
		for (CompassPoint dir : directions) {
			found = true;
			switch (dir) {
			case NORTH:
				if ((RegionManager.getClippingFlag(z, x, y + 2) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x + 1, y + 2) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y + 1, dir));
				y++;
				break;
			case NORTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y + 2) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x + 2, y + 2) & 0x12c01e0) != 0 || (RegionManager.getClippingFlag(z, x + 2, y + 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y + 1, dir));
				x++;
				y++;
				break;
			case EAST:
				if ((RegionManager.getClippingFlag(z, x + 2, y) & 0x12c0183) != 0 || (RegionManager.getClippingFlag(z, x + 2, y + 1) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y, dir));
				x++;
				break;
			case SOUTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x + 2, y) & 0x12c01e0) != 0 || (RegionManager.getClippingFlag(z, x + 2, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y - 1, dir));
				x++;
				y--;
				break;
			case SOUTH:
				if ((RegionManager.getClippingFlag(z, x, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x + 1, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y - 1, dir));
				y--;
				break;
			case SOUTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x - 1, y) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y - 1, dir));
				x--;
				y--;
				break;
			case WEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x - 1, y + 1) & 0x12c0138) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y, dir));
				x--;
				break;
			case NORTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y + 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x - 1, y + 2) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x, y + 2) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y + 1, dir));
				x--;
				y++;
				break;
			}
			if (found) {
				break;
			}
		}
	}

	/**
	 * Checks traversal for variable size entities.
	 * @param points The points list.
	 * @param directions The directions to check.
	 * @param size The mover size.
	 */
	private void checkVariableTraversal(List<Point> points, CompassPoint[] directions, int size) {
		for (CompassPoint dir : directions) {
			found = true;
			roar: switch (dir) {
			case NORTH:
				if ((RegionManager.getClippingFlag(z, x, y + size) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x + (size - 1), y + size) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x + i, y + size) & 0x12c01f8) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x, y + 1, dir));
				y++;
				break;
			case NORTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y + size) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x + size, y + size) & 0x12c01e0) != 0 || (RegionManager.getClippingFlag(z, x + size, y + 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x + (i + 1), y + size) & 0x12c01f8) != 0 || (RegionManager.getClippingFlag(z, x + size, y + (i + 1)) & 0x12c01e3) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x + 1, y + 1, dir));
				x++;
				y++;
				break;
			case EAST:
				if ((RegionManager.getClippingFlag(z, x + size, y) & 0x12c0183) != 0 || (RegionManager.getClippingFlag(z, x + size, y + (size - 1)) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x + size, y + i) & 0x12c01e3) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x + 1, y, dir));
				x++;
				break;
			case SOUTHEAST:
				if ((RegionManager.getClippingFlag(z, x + 1, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x + size, y + (size - 2)) & 0x12c01e0) != 0 || (RegionManager.getClippingFlag(z, x + size, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x + size, y + (i - 1)) & 0x12c01e3) != 0 || (RegionManager.getClippingFlag(z, x + (i + 1), y - 1) & 0x12c018f) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x + 1, y - 1, dir));
				x++;
				y--;
				break;
			case SOUTH:
				if ((RegionManager.getClippingFlag(z, x, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x + (size - 1), y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x + i, y - 1) & 0x12c018f) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x, y - 1, dir));
				y--;
				break;
			case SOUTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y + (size - 2)) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x - 1, y - 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x + (size - 2), y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x - 1, y + (i - 1)) & 0x12c013e) != 0 || (RegionManager.getClippingFlag(z, x + (i - 1), y - 1) & 0x12c018f) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x - 1, y - 1, dir));
				x--;
				y--;
				break;
			case WEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x - 1, y + (size - 1)) & 0x12c0138) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x - 1, y + i) & 0x12c013e) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x - 1, y, dir));
				x--;
				break;
			case NORTHWEST:
				if ((RegionManager.getClippingFlag(z, x - 1, y + 1) & 0x12c010e) != 0 || (RegionManager.getClippingFlag(z, x - 1, y + size) & 0x12c0138) != 0 || (RegionManager.getClippingFlag(z, x, y + size) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				for (int i = 1; i < size - 1; i++) {
					if ((RegionManager.getClippingFlag(z, x - 1, y + (i + 1)) & 0x12c013e) != 0 || (RegionManager.getClippingFlag(z, x + (i - 1), y + size) & 0x12c01f8) != 0) {
						found = false;
						break roar;
					}
				}
				points.add(new Point(x - 1, y + 1, dir));
				x--;
				y++;
				break;
			}
			if (found) {
				break;
			}
		}
	}

	/**
	 * Gets the direction.
	 * @param start The start direction.
	 * @param end The end direction.
	 * @return The direction.
	 */
	private static CompassPoint[] getDirection(int startX, int startY, CoordGrid end) {
		int endX = end.getX();
		int endY = end.getY();
		if (startX == endX) {
			if (startY > endY) {
				return new CompassPoint[] { CompassPoint.SOUTH };
			} else if (startY < endY) {
				return new CompassPoint[] { CompassPoint.NORTH };
			}
		} else if (startY == endY) {
			if (startX > endX) {
				return new CompassPoint[] { CompassPoint.WEST };
			}
			return new CompassPoint[] { CompassPoint.EAST };
		} else {
			if (startX < endX && startY < endY) {
				return new CompassPoint[] { CompassPoint.NORTHEAST, CompassPoint.EAST, CompassPoint.NORTH };
			} else if (startX < endX && startY > endY) {
				return new CompassPoint[] { CompassPoint.SOUTHEAST, CompassPoint.EAST, CompassPoint.SOUTH };
			} else if (startX > endX && startY < endY) {
				return new CompassPoint[] { CompassPoint.NORTHWEST, CompassPoint.WEST, CompassPoint.NORTH };
			} else if (startX > endX && startY > endY) {
				return new CompassPoint[] { CompassPoint.SOUTHWEST, CompassPoint.WEST, CompassPoint.SOUTH };
			}
		}
		return new CompassPoint[0];
	}

}