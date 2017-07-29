/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.game.map;

import org.virtue.core.constants.CompassPoint;
import org.virtue.game.map.square.ClipMap;
import org.virtue.game.node.Node;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 3, 2014
 */
public class CoordGrid {
	
	/**
	 * Represents the possible {@link ClipMap} sizes on the <b>Runescape</b> map.
	 */
	public static final int[] REGION_SIZES = new int[] { 104, 120, 136, 168 };
	
	/**
	 * Represents the size X of this {@link CoordGrid}.
	 */
	public static final int SIZE_X = 0x1;
	
	/**
	 * Represents the size Y of this {@link CoordGrid}.
	 */
	public static final int SIZE_Y = 0x1;
	
	public static CoordGrid parse (String coordString) {
		String[] parts = coordString.split(",");
		byte level = Byte.parseByte(parts[0]);
		int squareX = Integer.parseInt(parts[1]);
		int squareY = Integer.parseInt(parts[2]);
		int localX = Integer.parseInt(parts[3]);
		int localY = Integer.parseInt(parts[4]);
		return new CoordGrid(localX, localY, level, squareX, squareY);
	}

	/**
	 * Represents the X coordinate on the grid.
	 */
	private final short x;
	
	/**
	 * Represents the Y coordinate on the grid.
	 */
	private final short y;

	
	/**
	 * Represents the height of the coordinates {@link #x} and {@link #y}.
	 */
	private final byte plane;

	/**
	 * Constructs a new {@code Tile.java}.
	 * @param x The X coordinate on the grid.
	 * @param y The Y coordinate on the grid.
	 * @param plane The height of the coordinates {@link #x} and {@link #y}.
	 */
	public CoordGrid(int x, int y, int plane) {
		this.x = (short) x;
		this.y = (short) y;
		this.plane = (byte) plane;
	}
	
	/**
	 * Constructs a new {@code Tile.java} within the specified map square based on local coordinates.
	 * @param localX	The local X coordinate inside the square
	 * @param localY	The local Y coordinate inside the square
	 * @param level		The level of the coordinates {@link #x} and {@link #y}.
	 * @param squareX	The x-coordinate of the map square
	 * @param squareY	The y-coordinate of the map square
	 */
	public CoordGrid(int localX, int localY, int level, int squareX, int squareY) {
		this.x = (short) (localX + ((squareX & 0xff) << 6));
		this.y = (short) (localY + ((squareY & 0xff) << 6));
		this.plane = (byte) level;
	}
	
	/**
	 * Constructs a new {@code Tile.java} based on local coordinates and a region ID.
	 * @param localX	The local X coordinate inside the region
	 * @param localY	The local Y coordinate inside the region
	 * @param plane		The height of the coordinates {@link #x} and {@link #y}.
	 * @param regionID	The ID of the region
	 */
	public CoordGrid(int localX, int localY, int plane, int mapSquare) {
		this.x = (short) (localX + (((mapSquare >> 8) & 0xff) << 6));
		this.y = (short) (localY + ((mapSquare & 0xff) << 6));
		this.plane = (byte) plane;
	}

	/**
	 * Constructs a new {@code Tile.java}.
	 * @param tile The tile to trasfer.
	 */
	public CoordGrid(CoordGrid tile) {
		this.x = tile.x;
		this.y = tile.y;
		this.plane = tile.plane;
	}

	/**
	 * Constructs a new {@code Tile.java}.
	 * @param hash The <b>tile's</b> hash on the grid.
	 */
	public CoordGrid(int hash) {
		this.x = (short) (hash >> 14 & 0x3fff);
		this.y = (short) (hash & 0x3fff);
		this.plane = (byte) (hash >> 28);
	}

	/**
	 * Returns the X coordinate in the corresponding {@link ClipMap}.
	 * @return The X in the {@link ClipMap} of this {@link CoordGrid}.
	 */
	public int getXInRegion() {
		return x & 0x3F;
	}

	/**
	 * Returns the Y coordinate in the corresponding {@link ClipMap}.
	 * @return The Y in the {@link ClipMap} of this {@link CoordGrid}.
	 */
	public int getYInRegion() {
		return y & 0x3F;
	}

	/**
	 * Returns the X coordinate of this {@link CoordGrid}
	 * @return The X coordinate.
	 */
	public int getX() {
		return x;
	}

	/**
	 * Returns the Y coordinate of this {@link CoordGrid}
	 * @return The Y coordinate.
	 */
	public int getY() {
		return y;
	}

	/**
	 * Returns the plane of this {@link CoordGrid}.
	 * @return The <b>height</b>, or <b>plane</b> of this {@link CoordGrid}.
	 */
	public int getLevel() {
		if (plane > 3)
			return 3;
		return plane;
	}

	/**
	 * Returns the X coordinate corresponding to the {@link Zone} of this {@link CoordGrid}.
	 * @return The X in the {@link Zone} of this {@link CoordGrid}.
	 */
	public int getZoneX() {
		return (x >> 3);
	}

	/**
	 * Returns the Y coordinate corresponding to the {@link Zone} of this {@link CoordGrid}.
	 * @return The Y in the {@link Zone} of this {@link CoordGrid}.
	 */
	public int getZoneY() {
		return (y >> 3);
	}

	/**
	 * Returns the X coordinate in the corresponding {@link ClipMap}.
	 * @return The X in the {@link ClipMap} of this {@link CoordGrid}.
	 * @see {@link #getXInRegion()}, not to be confused with this.
	 */
	public int getRegionX() {
		return (x >> 6);
	}

	/**
	 * Returns the Y coordinate in the corresponding {@link ClipMap}.
	 * @return The Y in the {@link ClipMap} of this {@link CoordGrid}.
	 * @see {@link #getYInRegion()}, not to be confused with this.
	 */
	public int getRegionY() {
		return (y >> 6);
	}

	/**
	 * Returns the ID of the {@link ClipMap} that this {@link CoordGrid} is located on.
	 * @return The {@link ClipMap} ID of this {@link CoordGrid}.
	 */
	public int getRegionID() {
		return ((getRegionX() << 8) + getRegionY());
	}

	/**
	 * Returns the <b>local</b> X coordinate of a given {@link CoordGrid} compared to this.
	 * @param tile The tile to compare
	 * @param mapSize The size of the map to be delt with
	 * @return The local X coordinate.
	 */
	public int getLocalX(CoordGrid tile, int mapSize) {
		return x - 8 * (tile.getZoneX() - (REGION_SIZES[mapSize] >> 4));
	}

	/**
	 * Returns the <b>local</b> Y coordinate of a given {@link CoordGrid} compared to this.
	 * @param tile The tile to compare
	 * @param mapSize The size of the map to be delt with
	 * @return The local Y coordinate.
	 */
	public int getLocalY(CoordGrid tile, int mapSize) {
		return y - 8 * (tile.getZoneY() - (REGION_SIZES[mapSize] >> 4));
	}

	/**
	 * Returns the <i>16 bit</b> local X coordinate of this {@link CoordGrid}.
	 * @return The </i>16 bit</b> local X coordinate.
	 */
	public int get16BitLocalX() {
		return get16BitLocalX(this);
	}

	/**
	 * Returns the <i>16 bit</i> local X coordinate of a given {@link CoordGrid} compared to this.
	 * @param tile The tile to compare
	 * @return The local X coordinate.
	 */
	public int get16BitLocalX(CoordGrid tile) {
		return x - ((tile.getZoneX() - 6) << 3);
	}

	/**
	 * Returns the <i>16 bit</b> local Y coordinate of this {@link CoordGrid}.
	 * @return The </i>16 bit</b> local Y coordinate.
	 */
	public int get16BitLocalY() {
		return get16BitLocalY(this);
	}

	/**
	 * Returns the <i>16 bit</i> local Y coordinate of a given {@link CoordGrid} compared to this.
	 * @param tile The tile to compare
	 * @return The local Y coordinate.
	 */
	public int get16BitLocalY(CoordGrid tile) {
		return y - ((tile.getZoneY() - 6) << 3);
	}

	/**
	 * Returns the local X coordinate of this compared to a given {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} to compare.
	 * @return The local X coordinate.
	 */
	public int getLocalX(CoordGrid tile) {
		return getLocalX(tile, 0);
	}

	/**
	 * Returns the local Y coordinate of this compared to a given {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} to compare.
	 * @return The local Y coordinate.
	 */
	public int getLocalY(CoordGrid tile) {
		return getLocalY(tile, 0);
	}

	/**
	 * Returns the local X coordinate of this {@link CoordGrid}.
	 * @return The local X coordinate.
	 */
	public int getLocalX() {
		return getLocalX(this);
	}
	
	/**
	 * Returns the local Y coordinate of this {@link CoordGrid}.
	 * @return The local Y coordinate.
	 */
	public int getLocalY() {
		return getLocalY(this);
	}

	/**
	 * Returns the hash of the {@link ClipMap} that this {@link CoordGrid} is located on.
	 * @return The corresponding {@link ClipMap} hash of this {@link CoordGrid}.
	 */
	public int getRegionHash() {
		return getRegionY() + (getRegionX() << 8) + (plane << 16);
	}

	/**
	 * Returns the unique <b>hash</b> of this {@link CoordGrid}.
	 * @return The <b>hash</b>.
	 */
	public int getTileHash() {
		return y + (x << 14) + (plane << 28);
	}

	/**
	 * Checks if a given {@link CoordGrid} is adjacent to the current tile
	 * @param tile The {@link CoordGrid} being checked
	 * @return {@code True} if so; {@code False} otherwise.
	 */
	public boolean isAdjacent(CoordGrid tile) {
		return withinDistance(tile, 1);
	}

	/**
	 * Checks if a given {@link CoordGrid} is within a certain distance of this {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} being checked
	 * @param distance The distance, in tiles, to check.
	 * @return {@code True} if so; {@code False} otherwise.
	 */
	public boolean withinDistance(CoordGrid tile, int distance) {
		return withinDistance(tile, distance, distance);
	}

	/**
	 * Checks if a given {@link CoordGrid} is within a certain distance of this {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} being checked
	 * @param distanceX The x-distance, in tiles, to check.
	 * @param distanceY The y-distance, in tiles, to check.
	 * @return {@code True} if so; {@code False} otherwise.
	 */
	public boolean withinDistance(CoordGrid tile, int distanceX, int distanceY) {
		if (tile.plane != plane)
			return false;
		return Math.abs(tile.x - x) <= distanceX && Math.abs(tile.y - y) <= distanceY;
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param sizeX The X coordinate size of the given {@link Node}.
	 * @return The coordinate face X.
	 */
	public int getCoordFaceX(int sizeX) {
		return getCoordFaceX(sizeX, -1, -1);
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param x The X coordinate of the given {@link Node}.
	 * @param sizeX The X coordinate size of the given {@link Node}.
	 * @param sizeY The Y coordinate size of the given {@link Node}.
	 * @param rotation The rotation given {@link Node}.
	 * @return The coordinate face X.
	 */
	public static final int getCoordFaceX(int x, int sizeX, int sizeY, int rotation) {
		return x + ((rotation == 1 || rotation == 3 ? sizeY : sizeX) - 1) / 2;
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param y The Y coordinate of the given {@link Node}.
	 * @param sizeX The X coordinate size of the given {@link Node}.
	 * @param sizeY The Y coordinate size of the given {@link Node}.
	 * @param rotation The rotation given {@link Node}.
	 * @return The coordinate face Y.
	 */
	public static final int getCoordFaceY(int y, int sizeX, int sizeY, int rotation) {
		return y + ((rotation == 1 || rotation == 3 ? sizeX : sizeY) - 1) / 2;
	}
	
	public static final int getMapSquareHash (int x, int y) {
		return ((x >> 6) << 8) | (y >> 6);
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param sizeX The X coordinate size of the given {@link Node}.
	 * @param sizeY The Y coordinate size of the given {@link Node}.
	 * @param rotation The rotation given {@link Node}.
	 * @return The coordinate face X.
	 */
	public int getCoordFaceX(int sizeX, int sizeY, int rotation) {
		return x + ((rotation == 1 || rotation == 3 ? sizeY : sizeX) - 1) / 2;
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param sizeY The Y coordinate size of the given {@link Node}.
	 * @return The coordinate face Y.
	 */
	public int getCoordFaceY(int sizeY) {
		return getCoordFaceY(-1, sizeY, -1);
	}

	/**
	 * Returns the coordinate face {@link CoordGrid} of a given {@link Node} size.
	 * @param sizeX The X coordinate size of the given {@link Node}.
	 * @param sizeY The Y coordinate size of the given {@link Node}.
	 * @param rotation The rotation given {@link Node}.
	 * @return The coordinate face Y.
	 */
	public int getCoordFaceY(int sizeX, int sizeY, int rotation) {
		return y + ((rotation == 1 || rotation == 3 ? sizeX : sizeY) - 1) / 2;
	}

	/**
	 * Copies this {@link CoordGrid} to a new {@link CoordGrid} but with an added X Y and Z offset.
	 * @param x The X to add.
	 * @param y The Y to add.
	 * @param plane The height to add.
	 * @return The new copied {@link CoordGrid}.
	 */
	public CoordGrid copyNew(int x, int y, int plane) {
		return new CoordGrid(this.x + x, this.y + y, this.plane + plane);
	}

	/**
	 * Checks if the map of a given {@link CoordGrid} is different than this.
	 * @param tile The {@link CoordGrid} to compare.
	 * @return {@code True} if so; {@code False} otherwise.
	 */
	public boolean differentMap(CoordGrid tile) {
		return distance(getZoneX(), getZoneY(), tile.getZoneX(), tile.getZoneY()) >= 4;
	}

	/**
	 * Returns the distance between the given X and Y coordinates.
	 * @param x The X to compare.
	 * @param y The Y to compare.
	 * @param x2 The victim X to compare.
	 * @param y2 The victim Y to compare.
	 * @return The distance between the two coordinate sets.
	 */
	private final double distance(int x, int y, int x2, int y2) {
		return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
	}

	/**
	 * Returns the distance between a given {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} to check.
	 * @return The distance between the two tiles.
	 */
	public int distance(CoordGrid tile) {
		return (int) getDistance(tile);
	}
	
	/**
	 * Returns the distance between a given {@link CoordGrid}.
	 * @param tile The {@link CoordGrid} to check.
	 * @return The distance between the two tiles.
	 */
	public double getDistance(CoordGrid tile) {
		return distance(x, y, tile.x, tile.y);
	}

	/**
	 * Checks if this {@link CoordGrid} matches a given {@link CoordGrid}, only checking X and Y and not height.
	 * @param tile The {@link CoordGrid} to compare.
	 * @return {@code True} if so; {@code False} otherwise.
	 */
	public boolean lazyMatches(CoordGrid tile) {
		return x == tile.x && y == tile.y;
	}

	/**
	 * Checks if this tile is diagonal compared to the other tile.
	 * @param tile The tile to compare with.
	 * @param size The size of the node .
	 * @return {@code True} if so.
	 */
	public boolean isDiagonalTo(CoordGrid tile) {
		return isDiagonalTo(tile, 1);
	}
	
	/**
	 * Checks if this tile is diagonal to the other tile.
	 * @param tile The tile to compare with.
	 * @param size The size of the node .
	 * @return {@code True} if so.
	 */
	public boolean isDiagonalTo(CoordGrid tile, int size) {
		int diffX = x - tile.x;
		int diffY = y - tile.y;
		if (diffX == -1 && diffY == -1) {
			return true;
		}
		if (diffX == -1 && diffY == size) {
			return true;
		}
		if (diffX == size && diffY == -1) {
			return true;
		}
		return diffX == size && diffY == size;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + plane;
		result = prime * result + x;
		result = prime * result + y;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CoordGrid other = (CoordGrid) obj;
		if (plane != other.plane)
			return false;
		if (x != other.x)
			return false;
		if (y != other.y)
			return false;
		return true;
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return plane +"," + getRegionX() + "," + getRegionY() + "," + getXInRegion() + "," + getYInRegion();
	}
	
	/**
	 * Gets the tile offset in the given direction. Does not modify the coord itself
	 * 
	 * For example, if 3200,3200 was offset NORTH, the returned coordinate would be 3201,3200 
	 * @param direction The direction to offset by
	 * @return The offset coordinate.
	 */
	public CoordGrid offset (CompassPoint direction) {
		return copyNew(direction.getDeltaX(), direction.getDeltaY(), 0);
	}

	/**
	 * Edits a tile.
	 * @param tile The tile to edit.
	 * @param xOff The xOff.
	 * @param yOff The yOff.
	 * @param zOff The zOff
	 * @return The tile.
	 */
	public static CoordGrid edit(CoordGrid tile, int xOff, int yOff, byte zOff) {
		return new CoordGrid(tile.getX() + xOff, tile.getY() + yOff, tile.getLevel() + zOff);
	}
	
	/**
	 * Checks if a tile is next to another given tile.
	 * @param tile The tile to check.
	 * @return True if so; false otherwise.
	 */
	public boolean nextTo(CoordGrid tile) {
		return ((tile.getX() - 1) == getX()) || ((tile.getY() - 1) == getY()) || ((tile.getX() + 1) == getX()) || ((tile.getY() + 1) == getY());
	}

	/**
	 * Gets the location incremented by the given coordinates.
	 * @param dir The direction to transform this location.
	 * @param steps The amount of steps to move in this direction.
	 * @return The location.
	 */
	public CoordGrid copyNew(CompassPoint dir, int steps) {
		return new CoordGrid(x + (dir.getDeltaX() * steps), y + (dir.getDeltaY() * steps), this.plane);
	}

	/**
	 * Creates a location instance with coordinates being the difference between
	 * {@code other} & {@code location}.
	 * @param location The first location.
	 * @param other The other location.
	 * @return The delta location.
	 */
	public static CoordGrid getDelta(CoordGrid location, CoordGrid other) {
		return new CoordGrid(other.x - location.x, other.y - location.y, other.plane - location.plane);
	}
}
