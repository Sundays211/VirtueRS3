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

}
