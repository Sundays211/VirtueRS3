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

import org.virtue.Constants;
import org.virtue.engine.script.api.MapAPI;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.node.Node;
import org.virtue.game.world.region.DynamicRegion;
import org.virtue.game.world.region.GroundItem;
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

	@Override
	public Tile getCoords(Node node) {
		return node.getCurrentTile();
	}

	@Override
	public Tile getCoords(int x, int y, int level) {
		return new Tile(x, y, level);
	}

	@Override
	public Tile getCoords(int squareX, int squareY, int level, int localX, int localY) {
		return new Tile(localX, localY, level, squareX, squareY);
	}
	
	private Region getRegion (Tile coords) {
		return World.getInstance().getRegions().getRegionByID(coords.getRegionID());
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

	@Override
	public SceneLocation addLoc(int locTypeId, Tile coords, int nodeType, int rotation) {
		SceneLocation location = SceneLocation.create(locTypeId, coords, nodeType, rotation);
		getRegion(coords).spawnTempLocation(location, -1);
		return location;
	}

	@Override
	public SceneLocation getLoc(Tile coords, int type) {
		if (type < 0 || type > 22) {
			throw new IllegalArgumentException("Invalid location type: "+type);
		}
		Region region = getRegion(coords);
		if (region == null) {
			return null;
		}
		SceneLocation[] locs = region.getLocations(coords.getX(), coords.getY(), coords.getPlane());
		if (locs == null) {
			return null;
		}
		return locs[type];
	}

	@Override
	public void delLoc(SceneLocation loc) {
		getRegion(loc.getTile()).removeLocation(loc, loc.isTemporary());
	}

	@Override
	public int getLocRotation(SceneLocation loc) {
		return loc.getRotation();
	}

	@Override
	public int getLocShape(SceneLocation loc) {
		return loc.getShape();
	}

	@Override
	public void delay(SceneLocation loc, Runnable task, int ticks) {
		loc.addDelayTask(task, ticks);
	}

	@Override
	public void addObj(int objTypeId, Tile coords, Player player, int amount) {
		addObj(objTypeId, coords, player, amount, Constants.ITEM_REMOVAL_DELAY);
	}

	@Override
	public void addObj(int objTypeId, Tile coords, Player player, int amount, int respawnDelay) {
		Region region = getRegion(coords);
		if (region == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		GroundItem item = new GroundItem(objTypeId, amount, coords, player);
		item.setSpawnTime(respawnDelay);
		region.addItem(item);
	}
}
