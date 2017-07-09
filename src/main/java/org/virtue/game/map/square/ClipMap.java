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
package org.virtue.game.map.square;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.config.loctype.LocShape;
import org.virtue.game.World;
import org.virtue.game.map.ClipFlag;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class ClipMap {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ClipMap.class);
	
	private MapSquare mapSquare;
	private int[][][] clipFlags = new int[4][64][64];
	
	public ClipMap (MapSquare region) {
		this.mapSquare = region;
	}
	
	/**
	 * Adds the specified location to the clip map
	 * @param location The location to add
	 */
	public void addLocation (SceneLocation location) {
		if (location.getShape().getLayer() == 0) {
			if (location.getLocType().clipType != 0 || location.getLocType().gateway) {
				addWall(location);
			}
		} else if (location.getShape().getLayer() == 2) {//21
			if (location.getLocType().clipType != 0 || location.getLocType().gateway) {
				clipStandalone(location);
			}
		} else if (location.getShape().getLayer() == 3) {
			if (location.getLocType().clipType == 1) {
				clipFloorDeco(location.getTile().getXInRegion(), location.getTile().getYInRegion(), location.getTile().getLevel());
			}
		}
	}
	
	public void removeLocation (SceneLocation location) {
		if (location.getShape().getLayer() == 0) {
			//addWall(loc);
		} else if (location.getShape().getLayer() == 2) {
			unclipStandalone(location);
		}
	}
	
	private void clipStandalone (SceneLocation location) {
		int mask = ClipFlag.LOC;
		int baseX = location.getTile().getXInRegion();
		int baseY = location.getTile().getYInRegion();
		int sizeX = 1;
		int sizeY = 1;
		if (location.getRotation() != 1 && location.getRotation() != 3) {
			sizeX = location.getLocType().sizeX;
			sizeY = location.getLocType().sizeY;
		} else {
			sizeX = location.getLocType().sizeY;
			sizeY = location.getLocType().sizeX;
		}
		if (!location.getLocType().gateway) {
			mask |= ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE;
		}
		for (int coordX = baseX; coordX < baseX + sizeX; coordX++) {
			for (int coordY = baseY; coordY < baseY + sizeY; coordY++) {
				clipTile(coordX, coordY, location.getTile().getLevel(), mask);
			}
		}
	}
	
	private void unclipStandalone (SceneLocation location) {
		int mask = ClipFlag.LOC;
		int baseX = location.getTile().getXInRegion();
		int baseY = location.getTile().getYInRegion();
		int sizeX = 1;
		int sizeY = 1;
		if (location.getRotation() != 1 && location.getRotation() != 3) {
			sizeX = location.getLocType().sizeX;
			sizeY = location.getLocType().sizeY;
		} else {
			sizeX = location.getLocType().sizeY;
			sizeY = location.getLocType().sizeX;
		}
		if (!location.getLocType().gateway) {
			mask |= ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE;
		}
		for (int coordX = baseX; coordX < baseX + sizeX; coordX++) {
			for (int coordY = baseY; coordY < baseY + sizeY; coordY++) {
				unclipTile(coordX, coordY, location.getTile().getLevel(), mask);
			}
		}
	}
	
	private void addWall (SceneLocation loc) {
		int localX = loc.getTile().getXInRegion();
		int localY = loc.getTile().getYInRegion();
		int plane = loc.getTile().getLevel();
		if (loc.getShape() == LocShape.WALL) {//WALL
			if (loc.getRotation() == 0) {
				clipTile(localX, localY, plane, ClipFlag.WALL_WEST);//128
				clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST);//8
			}
			if (loc.getRotation() == 1) {
				clipTile(localX, localY, plane, ClipFlag.WALL_NORTH);//2
				clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH);//32
			}
			if (loc.getRotation() == 2) {
				clipTile(localX, localY, plane, ClipFlag.WALL_EAST);//8
				clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST);//128
			}
			if (loc.getRotation() == 3) {
				clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH);//32
				clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH);//2
			}
		}
		if (loc.getShape() == LocShape.WALL_CORNER || loc.getShape() == LocShape.WALL_CORNER_DIAG) {
			if (loc.getRotation() == 0) {
				clipTile(localX, localY, plane, ClipFlag.CORNERLOC_NORTHWEST);//1
				clipTile(localX-1, localY+1, plane, ClipFlag.CORNERLOC_SOUTHEAST);//16
			}
			if (loc.getRotation() == 1) {
				clipTile(localX, localY, plane, ClipFlag.CORNERLOC_NORTHEAST);//4
				clipTile(localX+1, localY+1, plane, ClipFlag.CORNERLOC_SOUTHWEST);//64
			}
			if (loc.getRotation() == 2) {
				clipTile(localX, localY, plane, ClipFlag.CORNERLOC_SOUTHEAST);//16
				clipTile(localX+1, localY-1, plane, ClipFlag.CORNERLOC_NORTHWEST);//1
			}
			if (loc.getRotation() == 3) {
				clipTile(localX, localY, plane, ClipFlag.CORNERLOC_SOUTHWEST);//64
				clipTile(localX-1, localY-1, plane, ClipFlag.CORNERLOC_NORTHEAST);//4
			}
		}
		if (loc.getShape() == LocShape.UNFINISHED_WALL) {//WALL_CORNER
			if (loc.getRotation() == 0) {
				clipTile(localX, localY, plane, ClipFlag.WALL_NORTH | ClipFlag.WALL_WEST);//130
				clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST);//8
				clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH);//32
			}
			if (loc.getRotation() == 1) {
				clipTile(localX, localY, plane, ClipFlag.WALL_NORTH | ClipFlag.WALL_EAST);//10
				clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH);//32
				clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST);//128
			}
			if (loc.getRotation() == 2) {
				clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH | ClipFlag.WALL_EAST);//40
				clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST);//128
				clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH);//2
			}
			if (loc.getRotation() == 3) {
				clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH | ClipFlag.WALL_WEST);//160
				clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH);//2
				clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST);//8
			}
		}
		if (!loc.getLocType().gateway) {
			if (loc.getShape() == LocShape.WALL) {
				if (loc.getRotation() == 0) {
					clipTile(localX, localY, plane, ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x20000000
					clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0x2000000
				}
				if (loc.getRotation() == 1) {
					clipTile(localX, localY, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE);//0x800000
					clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE);//0x8000000
				}
				if (loc.getRotation() == 2) {
					clipTile(localX, localY, plane, ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0x2000000
					clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x20000000
				}
				if (loc.getRotation() == 3) {
					clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE);//0x8000000
					clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE);//0x800000
				}
			}
			if (loc.getShape() == LocShape.WALL_CORNER || loc.getShape() == LocShape.WALL_CORNER_DIAG) {
				if (loc.getRotation() == 0) {
					clipTile(localX, localY, plane, ClipFlag.CORNERLOC_NORTHWEST_BLOCKSWALK_ALTERNATIVE);//0x400000
					clipTile(localX-1, localY+1, plane, ClipFlag.CORNERLOC_SOUTHEAST_BLOCKSWALK_ALTERNATIVE);//0x4000000
				}
				if (loc.getRotation() == 1) {
					clipTile(localX, localY, plane, ClipFlag.CORNERLOC_NORTHEAST_BLOCKSWALK_ALTERNATIVE);//0x1000000
					clipTile(localX+1, localY+1, plane, ClipFlag.CORNERLOC_SOUTHWEST_BLOCKSWALK_ALTERNATIVE);//0x10000000
				}
				if (loc.getRotation() == 2) {
					clipTile(localX, localY, plane, ClipFlag.CORNERLOC_SOUTHEAST_BLOCKSWALK_ALTERNATIVE);//0x4000000
					clipTile(localX+1, localY-1, plane, ClipFlag.CORNERLOC_NORTHWEST_BLOCKSWALK_ALTERNATIVE);//0x400000
				}
				if (loc.getRotation() == 3) {
					clipTile(localX, localY, plane, ClipFlag.CORNERLOC_SOUTHWEST_BLOCKSWALK_ALTERNATIVE);//0x10000000
					clipTile(localX-1, localY-1, plane, ClipFlag.CORNERLOC_NORTHEAST_BLOCKSWALK_ALTERNATIVE);//0x1000000
				}
			}
			if (loc.getShape() == LocShape.UNFINISHED_WALL) {
				if (loc.getRotation() == 0) {
					clipTile(localX, localY, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x20800000
					clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0x2000000
					clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE);//0x8000000
				}
				if (loc.getRotation() == 1) {
					clipTile(localX, localY, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0x2800000
					clipTile(localX, localY+1, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE);//0x8000000
					clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x20000000
				}
				if (loc.getRotation() == 2) {
					clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0xa000000
					clipTile(localX+1, localY, plane, ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x20000000
					clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE);//0x800000
				}
				if (loc.getRotation() == 3) {
					clipTile(localX, localY, plane, ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);//0x28000000
					clipTile(localX, localY-1, plane, ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE);//0x800000
					clipTile(localX-1, localY, plane, ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);//0x2000000
				}
			}
		}
	}
	
	public void clipFloorDeco (int localX, int localY, int plane) {
		//region.addItem(new GroundItem(Item.create(1044, 1), new Tile(localX, localY, plane, region.getID())));
		clipTile(localX, localY, plane, ClipFlag.FLOORDECO_BLOCKSWALK);
	}
	
	public void clipFloor (int localX, int localY, int plane) {
		clipTile(localX, localY, plane, ClipFlag.FLOOR_BLOCKSWALK);
	}
	
	private void clipTile (int posX, int posY, int plane, int mask) {
		if (posX >= 64 || posY >= 64 || posX < 0 || posY < 0) {
			CoordGrid tile = new CoordGrid(mapSquare.getBaseTile().getX()+posX, mapSquare.getBaseTile().getY()+posY, plane);			
			MapSquare region = World.getInstance().getRegions().getWithoutLoad(tile.getRegionID());
			if (region != null) {				
				region.getClipMap().clipTile(tile.getXInRegion(), tile.getYInRegion(), plane, mask);
			}
		} else {
			clipFlags[plane][posX][posY] |= mask;
		}
	}
	
	private void unclipTile (int posX, int posY, int plane, int mask) {
		if (posX >= 64 || posY >= 64 || posX < 0 || posY < 0) {
			CoordGrid tile = new CoordGrid(mapSquare.getBaseTile().getX()+posX, mapSquare.getBaseTile().getY()+posY, plane);			
			MapSquare region = World.getInstance().getRegions().getWithoutLoad(tile.getRegionID());
			if (region != null) {				
				region.getClipMap().unclipTile(tile.getXInRegion(), tile.getYInRegion(), plane, mask);
			}
		} else {
			clipFlags[plane][posX][posY] &= ~mask;
		}
	}
	
	/**
	 * Gets the flags located at the specified tile. 
	 * If localX or localY is out of range, retrieves the clip flags for the surrounding region.
	 * If the surrounding region could not be found, returns {@link Integer.MIN_VALUE} which has all flags marked as true
	 * @param localX The local (region) x-coordinate of the flags
	 * @param localY The local (region) y-coordinate of the flags
	 * @param plane The plane of the flags
	 * @return The flags, or {@link Integer.MIN_VALUE} if the flags could not be found.
	 */
	public int getClipFlags (int localX, int localY, int plane) {
		if (localX >= 64 || localY >= 64 || localX < 0 || localY < 0) {
			CoordGrid coords = new CoordGrid(mapSquare.getBaseTile().getX()+localX, mapSquare.getBaseTile().getY()+localY, plane);
			if (!World.getInstance().getRegions().regionLoaded(coords.getRegionID())) {
				return Integer.MIN_VALUE;
			}
			MapSquare region = World.getInstance().getRegions().getRegionByID(coords.getRegionID());
			logger.info("localX or localY is out of bounds - Needs to load new region. coords="+coords);
			if (region != null && region.isLoaded()) {
				return region.getClipMap().getClipFlags(coords.getXInRegion(), coords.getYInRegion(), plane);
			} else {
				return Integer.MIN_VALUE;//Return all flags set if the clip could not be found
			}
		} else {
			return clipFlags[plane][localX][localY];
		}
	}
	
	public void printMap () {
		logger.info("Clips for region "+mapSquare.mapSquareHash+": "+Arrays.deepToString(clipFlags));
	}

}
