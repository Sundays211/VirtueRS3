package org.virtue.game.map.movement.path.impl;

import java.util.ArrayList;
import java.util.List;

import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.Point;

/**
 * A pathfinder implementation used for checking projectile paths.
 * @author Emperor
 */
public final class ProjectilePathfinder extends AbstractPathfinder {

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
			found = true;
			checkSingleTraversal(points, directions);
			if (!found) {
				path.setMoveNear(x != start.getX() || y != start.getY());
				path.setSuccesful(false);
				break;
			}
		}
		if (!points.isEmpty()) {
			Point last = null;
			for (int i = 0; i < points.size() - 1; i++) {
				Point p = points.get(i);
				if (!p.equals(last)) {
					path.getPoints().add(p);
					last = p;
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
				if ((getProjectileFlag(z, x, y + 1) & 0x12c0120) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y + 1));
				y++;
				break;
			case NORTHEAST:
				if ((getProjectileFlag(z, x + 1, y) & 0x12c0180) != 0 || (getProjectileFlag(z, x, y + 1) & 0x12c0120) != 0 || (getProjectileFlag(z, x + 1, y + 1) & 0x12c01e0) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y + 1));
				x++;
				y++;
				break;
			case EAST:
				if ((getProjectileFlag(z, x + 1, y) & 0x12c0180) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y));
				x++;
				break;
			case SOUTHEAST:
				if ((getProjectileFlag(z, x + 1, y) & 0x12c0180) != 0 || (getProjectileFlag(z, x, y - 1) & 0x12c0102) != 0 || (getProjectileFlag(z, x + 1, y - 1) & 0x12c0183) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x + 1, y - 1));
				x++;
				y--;
				break;
			case SOUTH:
				if ((getProjectileFlag(z, x, y - 1) & 0x12c0102) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x, y - 1));
				y--;
				break;
			case SOUTHWEST:
				if ((getProjectileFlag(z, x - 1, y) & 0x12c0108) != 0 || (getProjectileFlag(z, x, y - 1) & 0x12c0102) != 0 || (getProjectileFlag(z, x - 1, y - 1) & 0x12c010e) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y - 1));
				x--;
				y--;
				break;
			case WEST:
				if ((getProjectileFlag(z, x - 1, y) & 0x12c0108) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y));
				x--;
				break;
			case NORTHWEST:
				if ((getProjectileFlag(z, x - 1, y) & 0x12c0108) != 0 || (getProjectileFlag(z, x, y + 1) & 0x12c0120) != 0 || (getProjectileFlag(z, x - 1, y + 1) & 0x12c0138) != 0) {
					found = false;
					break;
				}
				points.add(new Point(x - 1, y + 1));
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