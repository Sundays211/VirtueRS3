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
import org.virtue.config.loctype.LocShape;
import org.virtue.engine.script.api.MapAPI;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.DynamicMapSquare;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.node.Node;

/**
 * @author Sundays211
 * @since 10/01/2016
 */
public class VirtueMapAPI implements MapAPI {

	public VirtueMapAPI() {
		
	}

	@Override
	public CoordGrid getCoords(Node node) {
		return node.getCurrentTile();
	}

	@Override
	public CoordGrid getCoords(int x, int y, int level) {
		return new CoordGrid(x, y, level);
	}

	@Override
	public CoordGrid getCoords(CoordGrid coords, int xOff, int yOff, byte levelOffset) {
		return CoordGrid.edit(coords, xOff, yOff, levelOffset);
	}

	@Override
	public CoordGrid getCoords(int squareX, int squareY, int level, int localX, int localY) {
		return new CoordGrid(localX, localY, level, squareX, squareY);
	}

	@Override
	public CoordGrid getCoords(CoordGrid coords, int levelOffset, int squareXoff, int squareYoff, 
			int localXoff, int localYoff) {
		int level = coords.getLevel() + levelOffset;
		int squareX = coords.getRegionX() + squareXoff;
		int squareY = coords.getRegionY() + squareYoff;
		int localX = coords.getLocalX() + localXoff;
		int localY = coords.getLocalY() + localYoff;
		return new CoordGrid(localX, localY, level, squareX, squareY);
	}

	@Override
	public boolean inZone(CoordGrid from, CoordGrid to, CoordGrid coords) {
		if (coords.getLevel() <= from.getLevel() || coords.getLevel() >= to.getLevel()) {
			return false;
		}
		if (coords.getX() <= from.getX() || coords.getX() >= to.getX()) {
			return false;
		}
		if (coords.getY() <= from.getY() || coords.getY() >= to.getY()) {
			return false;
		}
		return true;
	}
	
	private MapSquare getRegion (CoordGrid coords) {
		return World.getInstance().getRegions().getRegionByID(coords.getRegionID());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#createArea()
	 */
	@Override
	public DynamicMapSquare createArea() {
		return World.getInstance().getRegions().createDynamicRegion();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#destroyArea(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public void destroyArea(DynamicMapSquare area) {
		World.getInstance().getRegions().destroyDynamicRegion(area);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#buildArea(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public void buildArea(DynamicMapSquare area) {
		area.build();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#getSquareX(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public int getSquareX(DynamicMapSquare area) {
		return area.getBaseTile().getRegionX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#getSquareY(org.virtue.game.world.region.DynamicRegion)
	 */
	@Override
	public int getSquareY(DynamicMapSquare area) {
		return area.getBaseTile().getRegionY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#rotateChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, int)
	 */
	@Override
	public void rotateChunk(DynamicMapSquare area, int chunkX, int chunkY,
			int plane, int rotation) {
		area.rotateChunk(chunkX, chunkY, plane, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#setChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, int, int, int, int)
	 */
	@Override
	public void setChunk(DynamicMapSquare area, int chunkX, int chunkY, int plane,
			int staticChunkX, int staticChunkY, int staticPlane, int rotation) {
		CoordGrid staticCoords = new CoordGrid(staticChunkX * 8, staticChunkY * 8, staticPlane);
		setChunk(area, chunkX, chunkY, plane, staticCoords, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#setChunk(org.virtue.game.world.region.DynamicRegion, int, int, int, org.virtue.game.world.region.Tile, int)
	 */
	@Override
	public void setChunk(DynamicMapSquare area, int chunkX, int chunkY, int plane,
			CoordGrid staticCoords, int rotation) {
		area.updateChunk(chunkX, chunkY, plane, staticCoords, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#addLoc(org.virtue.game.world.region.DynamicRegion, int, org.virtue.game.world.region.Tile, int, int)
	 */
	@Override
	public SceneLocation addLoc(MapSquare area, int locTypeID, int localX, int localY, int level,
			int shapeId, int rotation) {
		CoordGrid coords = new CoordGrid(localX, localY, level, area.getID());
		SceneLocation location = SceneLocation.create(locTypeID, coords, LocShape.getById(shapeId), rotation);
		area.addChangeLocation(location);
		return location;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.MapAPI#addLoc(org.virtue.game.world.region.DynamicRegion, int, org.virtue.game.world.region.Tile)
	 */
	@Override
	public SceneLocation addLoc(MapSquare area, int locTypeID, int localX, int localY, int level) {
		return addLoc(area, locTypeID, localX, localY, level, 10, 0);
	}

	@Override
	public SceneLocation addLoc(int locTypeId, CoordGrid coords, int shapeId, int rotation) {
		SceneLocation location = SceneLocation.create(locTypeId, coords, LocShape.getById(shapeId), rotation);
		getRegion(coords).addChangeLocation(location);
		return location;
	}

	@Override
	public SceneLocation getLoc(CoordGrid coords, int shapeId) {
		LocShape shape = LocShape.getById(shapeId);
		MapSquare region = getRegion(coords);
		if (region == null) {
			return null;
		}
		return region.getLocation(coords, shape).orElse(null);
	}

	@Override
	public void delLoc(SceneLocation loc) {
		getRegion(loc.getTile()).removeLocation(loc.getTile(), loc.getShape(), loc.getRotation());
	}

	@Override
	public void locAnim(SceneLocation loc, int animId) {
		getRegion(loc.getTile()).locationAnim(loc, animId);;
	}

	@Override
	public int getLocRotation(SceneLocation loc) {
		return loc.getRotation();
	}

	@Override
	public int getLocShape(SceneLocation loc) {
		return loc.getShape().getId();
	}

	@Override
	public void delay(SceneLocation loc, Runnable task, int ticks) {
		loc.addDelayTask(task, ticks);
	}

	@Override
	public void addObj(int objTypeId, CoordGrid coords, Player player, int amount) {
		addObj(objTypeId, coords, player, amount, Constants.ITEM_REMOVAL_DELAY);
	}

	@Override
	public void addObj(int objTypeId, CoordGrid coords, Player player, int amount, int respawnDelay) {
		MapSquare region = getRegion(coords);
		if (region == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		GroundItem item = new GroundItem(objTypeId, amount, coords, player);
		item.setSpawnTime(respawnDelay);
		region.addItem(item);
	}

	@Override
	public boolean hasObject(int objTypeId, CoordGrid coords) {
		MapSquare square = getRegion(coords);
		if (square == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		return square.getItem(coords, objTypeId) != null;
	}

	@Override
	public int delObj(int objTypeId, CoordGrid coords) {
		MapSquare square = getRegion(coords);
		if (square == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		GroundItem item = square.removeItem(coords, objTypeId);
		return item.getAmount();
	}
}
