/**
 * Copyright (c) 2015 Virtue Studios
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
package org.virtue.engine.script.api;

import org.virtue.game.entity.player.Player;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.DynamicMapSquare;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.node.Node;

/**
 * @author Sundays211
 * @since 10/01/2016
 */
public interface MapAPI {
	
	/**
	 * Gets the coordinates for the specified game node
	 * @param node The game node
	 * @return The current coords of the node
	 */
	public CoordGrid getCoords (Node node);
	
	/**
	 * Gets the coordinate from the specified components
	 * @param x The x-component of the coordinate
	 * @param y The y-component of the coordinate
	 * @param level The level-component of the coordinate
	 * @return The coordinate
	 */
	public CoordGrid getCoords (int x, int y, int level);
	
	/**
	 * Gets the coordinate from the specified components
	 * @param squareX The x-coordinate of the map square
	 * @param squareY The y-coordinate of the map square
	 * @param level The level-component of the coordinate
	 * @param localX The local x tile within the map square
	 * @param localY The local y tile within the map square
	 * @return The coordinate
	 */
	public CoordGrid getCoords (int squareX, int squareY, int level, int localX, int localY);
	
	public DynamicMapSquare createArea();
	
	public void destroyArea(DynamicMapSquare area);
	
	public void buildArea(DynamicMapSquare area);
	
	public int getSquareX(DynamicMapSquare area);
	
	public int getSquareY(DynamicMapSquare area);
	
	public void rotateChunk(DynamicMapSquare area, int chunkX, int chunkY, int plane, int rotation);
	
	public void setChunk(DynamicMapSquare area, int chunkX, int chunkY, int plane, 
			int staticChunkX, int staticChunkY, int staticPlane, int rotation);
	
	public void setChunk(DynamicMapSquare area, int chunkX, int chunkY, int plane, 
			CoordGrid staticCoords, int rotation);
	
	public SceneLocation addLoc(MapSquare area, int locTypeID, int localX, int localY, int level, int nodeType, int rotation);
	
	public SceneLocation addLoc(MapSquare area, int locTypeID, int localX, int localY, int level);

	/**
	 * Spawns a new location at the specified coords
	 * @param locTypeId The ID of the location to spawn
	 * @param coords The coordinates to spawn the location on
	 * @param shape The location shape to spawn
	 * @param rotation The rotation of the node (0-3, clockwise from the default position)
	 * @return The newly created location
	 */
	public SceneLocation addLoc(int locTypeId, CoordGrid coords, int shape, int rotation);
	
	/**
	 * Fetches a location at the specified coords of the specified type
	 * @param coords The coordinates to look at
	 * @param shape The location shape to look for
	 * @return The location at the specified coords, or null if none could be found
	 */
	public SceneLocation getLoc(CoordGrid coords, int shape);
	
	/**
	 * Removes the specified location from the map
	 * @param loc The location to remove
	 */
	public void delLoc(SceneLocation loc);
	
	/**
	 * Runs an animation on a location
	 * @param loc The location
	 * @param animId The animation ID to run
	 */
	public void locAnim(SceneLocation loc, int animId);
	
	/**
	 * Gets the current rotation for the specified location
	 * @param loc The location to check
	 * @return The rotation, between 0 and 3 clockwise from the default rotation
	 */
	public int getLocRotation(SceneLocation loc);
	
	/**
	 * Gets the shape of the specified location
	 * @param loc The location to check
	 * @return The location's shape
	 */
	public int getLocShape(SceneLocation loc);
	
	/**
	 * Delays the execution of a task by the given number of server cycles.
	 * The task will be cancelled if the location is destroyed
	 * @param loc The location to delay on
	 * @param task The task to run after the delay
	 * @param ticks The number of server cycles to delay by
	 */
	public void delay (SceneLocation loc, Runnable task, int ticks);
	
	/**
	 * Adds an item to the map at the given coordinates.
	 * The item will remain for {@link org.virtue.Constants#ITEM_REMOVAL_DELAY} ticks, unless the server is restarted or the region destroyed
	 * @param objTypeId The object ID to add
	 * @param coords The coordinates to add the object to
	 * @param player The player who 'owns' the object (ie. to whom the object is first visible)
	 * @param amount The number of objects to drop (defaults to 1)
	 */
	public void addObj (int objTypeId, CoordGrid coords, Player player, int amount);
	
	/**
	 * Adds an item to the map at the given coordinates.
	 * The item will remain for the specified number of ticks, or "permanently" if -1, unless the server is restarted or the region destroyed
	 * @param objTypeId The object ID to add
	 * @param coords The coordinates to add the object to
	 * @param player The player who 'owns' the object (ie. to whom the object is first visible)
	 * @param amount The number of objects to drop (defaults to 1)
	 * @param respawnDelay The time before the object disappears. Defaults to {@link org.virtue.Constants#ITEM_REMOVAL_DELAY}
	 */
	public void addObj (int objTypeId, CoordGrid coords, Player player, int amount, int respawnDelay);
}
