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

import org.virtue.game.world.region.DynamicRegion;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.game.world.region.Tile;

/**
 * @author Sundays211
 * @since 10/01/2016
 */
public interface MapAPI {
	
	public DynamicRegion createArea();
	
	public void destroyArea(DynamicRegion area);
	
	public void buildArea(DynamicRegion area);
	
	public int getSquareX(DynamicRegion area);
	
	public int getSquareY(DynamicRegion area);
	
	public void rotateChunk(DynamicRegion area, int chunkX, int chunkY, int plane, int rotation);
	
	public void setChunk(DynamicRegion area, int chunkX, int chunkY, int plane, 
			int staticChunkX, int staticChunkY, int staticPlane, int rotation);
	
	public void setChunk(DynamicRegion area, int chunkX, int chunkY, int plane, 
			Tile staticCoords, int rotation);
	
	public SceneLocation addLoc(Region area, int locTypeID, int localX, int localY, int level, int nodeType, int rotation);
	
	public SceneLocation addLoc(Region area, int locTypeID, int localX, int localY, int level);

	/**
	 * Spawns a new location at the specified coords
	 * @param locTypeId The ID of the location to spawn
	 * @param coords The coordinates to spawn the location on
	 * @param shape The location shape to spawn
	 * @param rotation The rotation of the node (0-3, clockwise from the default position)
	 * @return The newly created location
	 */
	public SceneLocation addLoc(int locTypeId, Tile coords, int shape, int rotation);
	
	/**
	 * Fetches a location at the specified coords of the specified type
	 * @param coords The coordinates to look at
	 * @param shape The location shape to look for
	 * @return The location at the specified coords, or null if none could be found
	 */
	public SceneLocation getLoc(Tile coords, int shape);
	
	/**
	 * Removes the specified location from the map
	 * @param loc The location to remove
	 */
	public void delLoc(SceneLocation loc);
	
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
}
