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

import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.MapSquare.Zone;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 5/01/2015
 */
public class DynamicMapLoadTask implements Runnable {
	
	private DynamicMapSquare region;	
	private RegionManager regionManager;
	
	public DynamicMapLoadTask (DynamicMapSquare region, RegionManager regionManager) {
		this.region = region;
		this.regionManager = regionManager;
	}

	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		int[][][] baseChunks = region.getRegionChunks();
		for (int plane = 0; plane<4; plane++) {
			for (int chunkX = 0; chunkX < 8; chunkX++) {
				for (int chunkY = 0; chunkY < 8; chunkY++) {
					int chunkData = baseChunks[plane][chunkX][chunkY];
					if (chunkData == -1) {
						clipChunk(chunkX, chunkY, plane);
						continue;
					}
					addLocationNodes(plane, chunkX, chunkY, chunkData);
				}
			}
		}
		region.loadStage = LoadStage.LOADING_LOCS;
		region.loadStage = LoadStage.COMPLETED;
	}
	
	private void clipChunk (int chunkX, int chunkY, int plane) {
		for (int localX = 0; localX < 8; localX++) {
			for (int localY = 0; localY < 8; localY++) {
				region.getClipMap().clipFloor(localX, localY, plane);
			}
		}
	}
	
	private void addLocationNodes (int plane, int chunkX, int chunkY, int chunkData) {
		int cacheChunkX = (chunkData >> 14) & 0x3ff;
		int cacheChunkY = (chunkData >> 3) & 0x7ff;
		int cacheChunkZ = (chunkData >> 24) & 0x3;
		int chunkRotation = (chunkData >> 1) & 0x3;
		int regionID = ((cacheChunkX / 8) << 8) | (cacheChunkY / 8);
		MapSquare cacheRegion = regionManager.getRegionByID(regionID);
		if (region == null) {
			return;
		}
		Zone zone = cacheRegion.zones.get(MapSquare.getZoneHash(cacheChunkX * 8, cacheChunkY * 8, cacheChunkZ));
		if (zone != null) {
			int localX, localY, z;
			CoordGrid tile;
			int rotation, sizeX, sizeY;
			int finalX, finalY;
			for (SceneLocation[] locations : zone.locations.values()) {
				for (SceneLocation loc : locations) {
					if (loc == null) {
						continue;
					}
					localX = loc.getTile().getLocalX() & 0x7;
					localY = loc.getTile().getLocalY() & 0x7;
					z = loc.getTile().getLevel();	
					sizeX = loc.getLocType().sizeX;
					sizeY = loc.getLocType().sizeY;
					rotation = loc.getRotation();
					
					finalX = (chunkX * 8) + getRotatedXPos(localX, localY, chunkRotation, sizeX, sizeY, rotation);
					finalY = (chunkY * 8) + getRotatedYPos(localX, localY, chunkRotation, sizeX, sizeY, rotation);
					tile = new CoordGrid(finalX, finalY, z, region.mapSquareHash);
					loc = SceneLocation.create(loc.getID(), tile, loc.getShape(), rotation);
					//FIXME: Update to use new map loader
					//region.addLocation(loc, finalX, finalY, z);
				}
			}
		}
	}
	
	public static int getRotatedXPos(int localX, int localY, int chunkRotation, int sizeX, int sizeY, int rotation) {
		if (1 == (rotation & 0x1)) {
		    int i_236_ = sizeX;
		    sizeX = sizeY;
		    sizeY = i_236_;
		}
		chunkRotation &= 0x3;
		if (0 == chunkRotation) {
		    return localX;
		}
		if (1 == chunkRotation) {
		    return localY;
		}
		if (2 == chunkRotation) {
		    return 7 - localX - (sizeX - 1);
		}
		return 7 - localY - (sizeY - 1);
	}

	public static int getRotatedYPos(int localX, int localY, int chunkRotation, int sizeX, int sizeY, int rotation) {
		if (1 == (rotation & 0x1)) {
		    int i_6_ = sizeX;
		    sizeX = sizeY;
		    sizeY = i_6_;
		}
		chunkRotation &= 0x3;
		if (chunkRotation == 0) {
		    return localY;
		}
		if (chunkRotation == 1) {
		    return 7 - localX - (sizeX - 1);
		}
		if (2 == chunkRotation) {
		    return 7 - localY - (sizeY - 1);
		}
		return localX;
	}
}
