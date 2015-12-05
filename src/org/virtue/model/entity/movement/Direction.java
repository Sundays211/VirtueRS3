/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.model.entity.movement;

import org.virtue.model.World;
import org.virtue.model.entity.region.RegionManager;
import org.virtue.model.entity.region.Tile;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/11/2014
 */
public enum Direction {
	NORTH(0, 0, 1, 0),
	NORTHEAST(1, 1, 1, 4),
	EAST(2, 1, 0, 1),
	SOUTHEAST(3, 1, -1, 5),
	SOUTH(4, 0, -1, 2),
	SOUTHWEST(5, -1, -1, 6),
	WEST(6, -1, 0, 3),
	NORTHWEST(7, -1, 1, 7);
	
	private int serialID;
	private int dx;
	private int dy;
	private int value;
	
	private Direction (int id, int dx, int dy, int value) {
		this.serialID = id;
		this.dx = dx;
		this.dy = dy;
		this.value = value;
	}
	
	public int getID () {
		return serialID;
	}
	
	public int getDeltaX () {
		return dx;
	}
	
	public int getDeltaY () {
		return dy;
	}
	
	public int getFaceDirection () {
		return ((int) (Math.atan2(dx, dy) * 2607.5945876176133)) & 0x3fff;
	}
	
	public static Direction forID (int id) {
		switch (id) {
		case 0:
			return NORTH;
		case 1:
			return NORTHEAST;
		case 2:
			return EAST;
		case 3:
			return SOUTHEAST;
		case 4:
			return SOUTH;
		case 5:
			return SOUTHWEST;
		case 6:
			return WEST;
		case 7:
			return NORTHWEST;
		default:
			return EAST;
		}
	}
	
	public static Direction forDelta (int dx, int dy) {
		if (dy >= 1 && dx >= 1) {
			return NORTHEAST;
		} else if (dy <= -1 && dx >= 1) {
			return SOUTHEAST;
		} else if (dy <= -1 && dx <= -1) {
			return SOUTHWEST;
		} else if (dy >= 1 && dx <= -1) {
			return NORTHWEST;
		} else if (dy >= 1) {
			return NORTH;
		} else if (dx >= 1) {
			return EAST;
		} else if (dy <= -1) {
			return SOUTH;
		} else if (dx <= -1) {
			return WEST;
		} else {
			return null;
		}
	}

	public int toInteger() {
		return value;
	}

	/**
	 * Gets the direction.
	 * @param rotation The int value.
	 * @return The direction.
	 */
	public static Direction get(int rotation) {
		for (Direction dir : Direction.values()) {
			if (dir.value == rotation) {
				return dir;
			}
		}
		throw new IllegalArgumentException("Invalid direction value - " + rotation);
	}

	/**
	 * Checks if traversal is permitted for this direction.
	 * @param l The location.
	 * @return {@code True} if so.
	 */
	public boolean canMove(Tile l) {
    	int plane = l.getPlane();
    	int x = l.getX() + dx;
    	int y = l.getY() + dy;
    	RegionManager map = World.getInstance().getRegions();
    	switch (this) {
		case EAST:
			return map.isTraversableEast(plane, x, y, 1);
		case NORTH:
			return map.isTraversableNorth(plane, x, y, 1);
		case NORTHEAST:
			return map.isTraversableNorthEast(plane, x, y, 1);
		case NORTHWEST:
			return map.isTraversableNorthWest(plane, x, y, 1);
		case SOUTH:
			return map.isTraversableSouth(plane, x, y, 1);
		case SOUTHEAST:
			return map.isTraversableSouthEast(plane, x, y, 1);
		case SOUTHWEST:
			return map.isTraversableSouthWest(plane, x, y, 1);
		case WEST:
			return map.isTraversableWest(plane, x, y, 1);
    	}
    	return true;
	}

	/**
	 * Gets the opposite dir.
	 * @return the direction.
	 */
	public Direction getOpposite() {
		return Direction.get(toInteger() + 2 & 3);
	}

	/**
	 * Gets the most logical direction.
	 * @param location The start location.
	 * @param l The end location.
	 * @return The most logical direction.
	 */
	public static Direction getLogicalDirection(Tile location, Tile l) {
		int offsetX = Math.abs(l.getX() - location.getX());
		int offsetY = Math.abs(l.getY() - location.getY());
		if (offsetX > offsetY) {
			if (l.getX() > location.getX()) {
				return Direction.EAST;
			} else {
				return Direction.WEST;
			}
		} else if (l.getY() < location.getY()) {
			return Direction.SOUTH;
		}
		return Direction.NORTH;
	}

}
