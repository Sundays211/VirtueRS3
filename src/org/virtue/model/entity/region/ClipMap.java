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
package org.virtue.model.entity.region;

import java.util.Arrays;

import org.virtue.model.World;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.routefinder.TraversalMap;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class ClipMap implements TraversalMap {
	
	private Region region;
	private int[][][] clipFlags = new int[4][64][64];
	
	public ClipMap (Region region) {
		this.region = region;
	}
	
	/**
	 * Adds the specified location to the clip map
	 * @param location The location to add
	 */
	public void addLocation (SceneLocation location) {
		if (location.getNodeType() >= 0 && location.getNodeType() <= 3) {
			addWall(location);
		} else if (location.getNodeType() >= 9 && location.getNodeType() <= 11) {//21
			int mask = ClipFlag.LOC;
			int posX = location.getTile().getXInRegion();
			int posY = location.getTile().getYInRegion();
			int sizeX = 1;
			int sizeY = 1;
			if (location.getLocType() != null) {
				if (location.getRotation() != 1 && location.getRotation() != 3) {
					sizeX = location.getLocType().sizeX;
					sizeY = location.getLocType().sizeY;
				} else {
					sizeX = location.getLocType().sizeY;
					sizeY = location.getLocType().sizeX;
				}
				if (location.getLocType().clipType != 0) {
					mask |= ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE;
				}
			}
			for (int tileX = posX; tileX < posX + sizeX; tileX++) {
				for (int tileY = posY; tileY < posY + sizeY; tileY++) {
					clipTile(tileX, tileY, location.getTile().getPlane(), mask);
					if (location.getLocType().clipType != 0) {
						Item marker = Item.create(1040, 1);
						marker.examine = "Marker for location id="+location.getID()+", clipType="+location.getLocType().clipType+", nodeType="+location.getNodeType()+", "+location.getLocType().allowInteract;
						//region.addItem(new GroundItem(marker, new Tile(tileX, tileY, location.getTile().getPlane(), region.getID())));
					}
				}
			}
		} else if (location.getNodeType() == 22) {
			if (location.getLocType().clipType == 1) {
				Item marker = Item.create(1042, 1);
				marker.examine = "Marker for location id="+location.getID()+", clipType="+location.getLocType().clipType+", nodeType="+location.getNodeType();
				//region.addItem(new GroundItem(marker, new Tile(location.getTile())));
				clipFloorDeco(location.getTile().getXInRegion(), location.getTile().getYInRegion(), location.getTile().getPlane());
			}
		}
	}
	
	private void addWall (SceneLocation loc) {
		int localX = loc.getTile().getXInRegion();
		int localY = loc.getTile().getYInRegion();
		int plane = loc.getTile().getPlane();
		if (loc.getNodeType() == 0) {//WALL
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
		if (loc.getNodeType() == 1 || loc.getNodeType() == 3) {
			if (loc.getRotation() == 0) {
				clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_NORTHWEST);//1
				clipTile(localX-1, localY+1, plane, ClipFlag.CORNEROBJ_SOUTHEAST);//16
			}
			if (loc.getRotation() == 1) {
				clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_NORTHEAST);//4
				clipTile(localX+1, localY+1, plane, ClipFlag.CORNEROBJ_SOUTHWEST);//64
			}
			if (loc.getRotation() == 2) {
				clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_SOUTHEAST);//16
				clipTile(localX+1, localY-1, plane, ClipFlag.CORNEROBJ_NORTHWEST);//1
			}
			if (loc.getRotation() == 3) {
				clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_SOUTHWEST);//64
				clipTile(localX-1, localY-1, plane, ClipFlag.CORNEROBJ_NORTHEAST);//4
			}
		}
		if (loc.getNodeType() == 2) {//WALL_CORNER
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
		if (loc.getLocType().clipType != 0) {
			if (loc.getNodeType() == 0) {
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
			if (loc.getNodeType() == 1 || loc.getNodeType() == 3) {
				if (loc.getRotation() == 0) {
					clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_NORTHWEST_BLOCKSWALK_ALTERNATIVE);//0x400000
					clipTile(localX-1, localY+1, plane, ClipFlag.CORNEROBJ_SOUTHEAST_BLOCKSWALK_ALTERNATIVE);//0x4000000
				}
				if (loc.getRotation() == 1) {
					clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_NORTHEAST_BLOCKSWALK_ALTERNATIVE);//0x1000000
					clipTile(localX+1, localY+1, plane, ClipFlag.CORNEROBJ_SOUTHWEST_BLOCKSWALK_ALTERNATIVE);//0x10000000
				}
				if (loc.getRotation() == 2) {
					clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_SOUTHEAST_BLOCKSWALK_ALTERNATIVE);//0x4000000
					clipTile(localX+1, localY-1, plane, ClipFlag.CORNEROBJ_NORTHWEST_BLOCKSWALK_ALTERNATIVE);//0x400000
				}
				if (loc.getRotation() == 3) {
					clipTile(localX, localY, plane, ClipFlag.CORNEROBJ_SOUTHWEST_BLOCKSWALK_ALTERNATIVE);//0x10000000
					clipTile(localX-1, localY-1, plane, ClipFlag.CORNEROBJ_NORTHEAST_BLOCKSWALK_ALTERNATIVE);//0x1000000
				}
			}
			if (loc.getNodeType() == 2) {
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
			Tile tile = new Tile(region.getBaseTile().getX()+posX, region.getBaseTile().getY()+posY, plane);			
			Region region = World.getInstance().getRegions().getWithoutLoad(tile.getRegionID());
			if (region != null) {				
				region.getClipMap().clipTile(tile.getXInRegion(), tile.getYInRegion(), plane, mask);
			}
		} else {
			clipFlags[plane][posX][posY] = clipFlags[plane][posX][posY] | mask;
		}
	}
	
	public void removeLocation (SceneLocation loc) {
		if (loc.getNodeType() >= 0 && loc.getNodeType() <= 3) {
			//addWall(loc);
		} else if (loc.getNodeType() >= 9 && loc.getNodeType() <= 21) {
			int mask = ClipFlag.LOC;
			int posX = loc.getTile().getXInRegion();
			int posY = loc.getTile().getYInRegion();
			int sizeX = 1;
			int sizeY = 1;
			if (loc.getLocType() != null) {
				if (loc.getRotation() != 1 && loc.getRotation() != 3) {
					sizeX = loc.getLocType().sizeX;
					sizeY = loc.getLocType().sizeY;
				} else {
					sizeX = loc.getLocType().sizeY;
					sizeY = loc.getLocType().sizeX;
				}
				if (loc.getLocType().clipType != 0) {
					mask |= ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE;
				}
			}
			for (int tileX = posX; tileX < posX + sizeX; tileX++) {
				for (int tileY = posY; tileY < posY + sizeY; tileY++) {
					unclipTile(tileX, tileY, loc.getTile().getPlane(), mask);
				}
			}
		}
	}
	
	private void unclipTile (int posX, int posY, int plane, int mask) {
		if (posX >= 64 || posY >= 64 || posX < 0 || posY < 0) {
			Tile tile = new Tile(region.getBaseTile().getX()+posX, region.getBaseTile().getY()+posY, plane);			
			Region region = World.getInstance().getRegions().getWithoutLoad(tile.getRegionID());
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
			Tile tile = new Tile(region.getBaseTile().getX()+localX, region.getBaseTile().getY()+localY, plane);
			if (!World.getInstance().getRegions().regionLoaded(tile.getRegionID())) {
				return Integer.MIN_VALUE;
			}
			Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
			//System.out.println("WARNING: localX or localY is out of bounds - Needs to load new region. Tile="+tile);
			if (region != null && region.isLoaded()) {
				return region.getClipMap().getClipFlags(tile.getXInRegion(), tile.getYInRegion(), plane);
			} else {
				return Integer.MIN_VALUE;//Return all flags set if the clip could not be found
			}
		} else {
			return clipFlags[plane][localX][localY];
		}
	}
	
	/**
	 * Returns true if an entity of the given size cannot traverse to the given position
	 * @param blockFlag The flags that, if set, block the entity from moving in the direction
	 * @param plane
	 * @param x
	 * @param y
	 * @param size
	 * @return
	 */
	private boolean isBlocked (int blockFlag, int plane, int x, int y, int size) {
		for (int xoff = 0; xoff < size; xoff++) {
			for (int yoff = 0; yoff < size; yoff++) {
				if ((getClipFlags(x+xoff, y+yoff, plane) & blockFlag) != 0) {
					return true;
				}
			}
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableSouth(int, int, int, int)
	 */
	@Override
	public boolean isTraversableSouth(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE);
		//int mask = getClipFlags(x, y-1, plane);
		return !isBlocked(blockFlag, plane, x, y-1, size);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableWest(int, int, int, int)
	 */
	@Override
	public boolean isTraversableWest(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE);
		//int mask = getClipFlags(x-1, y, plane);
		return !isBlocked(blockFlag, plane, x-1, y, size);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableNorth(int, int, int, int)
	 */
	@Override
	public boolean isTraversableNorth(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE);
		//int mask = getClipFlags(x, y+1, plane);
		return !isBlocked(blockFlag, plane, x, y+1, size);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableEast(int, int, int, int)
	 */
	@Override
	public boolean isTraversableEast(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE);
		//int mask = getClipFlags(x+1, y, plane);
		return !isBlocked(blockFlag, plane, x+1, y, size);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableSouthWest(int, int, int, int)
	 */
	@Override
	public boolean isTraversableSouthWest(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE 
				| ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE | ClipFlag.CORNEROBJ_NORTHEAST_BLOCKSWALK_ALTERNATIVE);
		if (isBlocked(blockFlag, plane, x-1, y-1, size)) {
			return false;
		}
		if (!isTraversableWest(plane, x, y, size)) {
			return false;
		}
		if (!isTraversableSouth(plane, x, y, size)) {
			return false;
		}
		/*if ((getClipFlags(x-1, y-1, plane) & blockFlag) != 0) {
			return false;
		}
		if ((getClipFlags(x-1, y, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}
		if ((getClipFlags(x, y-1, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}*/
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableNorthWest(int, int, int, int)
	 */
	@Override
	public boolean isTraversableNorthWest(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE 
				| ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE | ClipFlag.CORNEROBJ_SOUTHEAST_BLOCKSWALK_ALTERNATIVE);
		if (isBlocked(blockFlag, plane, x-1, y+1, size)) {
			return false;
		}
		if (!isTraversableWest(plane, x, y, size)) {
			return false;
		}
		if (!isTraversableNorth(plane, x, y, size)) {
			return false;
		}
		/*if ((getClipFlags(x-1, y+1, plane) & blockFlag) != 0) {
			return false;
		}
		if ((getClipFlags(x-1, y, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_EAST_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}
		if ((getClipFlags(x, y+1, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}*/
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableSouthEast(int, int, int, int)
	 */
	@Override
	public boolean isTraversableSouthEast(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE 
				| ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE | ClipFlag.CORNEROBJ_NORTHWEST_BLOCKSWALK_ALTERNATIVE);
		if (isBlocked(blockFlag, plane, x+1, y-1, size)) {
			return false;
		}
		if (!isTraversableEast(plane, x, y, size)) {
			return false;
		}
		if (!isTraversableSouth(plane, x, y, size)) {
			return false;
		}
		/*if ((getClipFlags(x+1, y-1, plane) & blockFlag) != 0) {
			return false;
		}
		if ((getClipFlags(x+1, y, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}
		if ((getClipFlags(x, y-1, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_NORTH_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}*/
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.TraversalMap#isTraversableNorthEast(int, int, int, int)
	 */
	@Override
	public boolean isTraversableNorthEast(int plane, int x, int y, int size) {
		int blockFlag = (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE 
				| ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE | ClipFlag.CORNEROBJ_SOUTHWEST_BLOCKSWALK_ALTERNATIVE);
		if (isBlocked(blockFlag, plane, x+1, y+1, size)) {
			return false;
		}
		if (!isTraversableEast(plane, x, y, size)) {
			return false;
		}
		if (!isTraversableNorth(plane, x, y, size)) {
			return false;
		}
		/*if ((getClipFlags(x+1, y+1, plane) & blockFlag) != 0) {
			return false;
		}
		if ((getClipFlags(x+1, y, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_WEST_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}
		if ((getClipFlags(x, y+1, plane)  & (ClipFlag.FLOOR_BLOCKSWALK | ClipFlag.FLOORDECO_BLOCKSWALK 
				| ClipFlag.LOC_BLOCKSWALK_ALTERNATIVE | ClipFlag.WALL_SOUTH_BLOCKSWALK_ALTERNATIVE)) != 0) {
			return false;
		}*/
		return true;
	}
	
	public void printMap () {
		System.out.println("Clips for region "+region.mapSquareHash+": "+Arrays.deepToString(clipFlags));
	}

}
