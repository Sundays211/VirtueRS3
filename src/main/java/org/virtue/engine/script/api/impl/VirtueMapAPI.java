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
package org.virtue.engine.script.api.impl;

import org.virtue.engine.script.api.MapAPI;
import org.virtue.game.World;
import org.virtue.game.world.region.DynamicRegion;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.game.world.region.Tile;

/**
 * @author Sundays211
 * @since 10/01/2016
 */
public class VirtueMapAPI implements MapAPI {

	public VirtueMapAPI() {
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#createArea()
	 */
	@Override
	public DynamicRegion createArea() {
		return World.getInstance().getRegions().createDynamicRegion();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#destroyArea(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public void destroyArea(DynamicRegion area) {
		World.getInstance().getRegions().destroyDynamicRegion(area);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#buildArea(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public void buildArea(DynamicRegion area) {
		area.build();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#getSquareX(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public int getSquareX(DynamicRegion area) {
		return area.getBaseTile().getRegionX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#getSquareY(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public int getSquareY(DynamicRegion area) {
		return area.getBaseTile().getRegionY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#rotateChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, int)
	 */
	@Override
	public void rotateChunk(DynamicRegion area, int chunkX, int chunkY,
			int plane, int rotation) {
		area.rotateChunk(chunkX, chunkY, plane, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#setChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, int, int, int, int)
	 */
	@Override
	public void setChunk(DynamicRegion area, int chunkX, int chunkY, int plane,
			int staticChunkX, int staticChunkY, int staticPlane, int rotation) {
		Tile staticCoords = new Tile(staticChunkX * 8, staticChunkY * 8, staticPlane);
		setChunk(area, chunkX, chunkY, plane, staticCoords, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#setChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, org.virtue.game.world.region.Tile, int)
	 */
	@Override
	public void setChunk(DynamicRegion area, int chunkX, int chunkY, int plane,
			Tile staticCoords, int rotation) {
		area.updateChunk(chunkX, chunkY, plane, staticCoords, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#addLoc(org.virtue.game.world.region.DynamicRegion, int, org.virtue.game.world.region.Tile, int, int)
	 */
	@Override
	public SceneLocation addLoc(Region area, int locTypeID, int localX, int localY, int level,
			int nodeType, int rotation) {
		Tile coords = new Tile(localX, localY, level, area.getID());
		SceneLocation location = SceneLocation.create(locTypeID, coords, nodeType, rotation);
		area.spawnTempLocation(location, -1);
		return location;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#addLoc(org.virtue.game.world.region.DynamicRegion, int, org.virtue.game.world.region.Tile)
	 */
	@Override
	public SceneLocation addLoc(Region area, int locTypeID, int localX, int localY, int level) {
		return addLoc(area, locTypeID, localX, localY, level, 10, 0);
	}

}
