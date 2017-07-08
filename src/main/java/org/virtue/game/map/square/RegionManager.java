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

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/10/2014
 */
public class RegionManager {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(RegionManager.class);

	protected static ReferenceTable mapsTable;

	private static final int DYNAMIC_REGION_START_X = 0x80;

	private boolean[][] dynamicRegionExisits = new boolean[64][128];

	private int nextDynamicX = 0;

	private int nextDynamicY = 0;

	/**
	 * Initialises the cache data for the region manager
	 * 
	 * @param cache
	 *            The game cache
	 * @throws IOException
	 *             If an error occurs while loading the cache
	 */
	public static void init(Cache cache) throws IOException {
		mapsTable = ReferenceTable.decode(Container.decode(
				cache.getStore().read(255, Js5Archive.MAPS.getArchiveId()))
				.getData());
	}

	private Map<Integer, MapSquare> regions = new HashMap<Integer, MapSquare>();

	private Set<MapSquare> emptyRegions = new HashSet<>();
	private Set<MapSquare> removalQueue = new HashSet<>();

	public DynamicMapSquare createDynamicRegion() {
		int regionID = (nextDynamicY * 2)
				| ((DYNAMIC_REGION_START_X + (nextDynamicX * 2)) << 8);
		DynamicMapSquare region;
		synchronized (regions) {
			while (regions.containsKey(regionID)) {
				if (nextDynamicY < 128) {
					nextDynamicY++;
				} else {
					nextDynamicY = 0;
					nextDynamicX++;
				}
				regionID = (nextDynamicY * 2)
						| ((DYNAMIC_REGION_START_X + (nextDynamicX * 2)) << 8);
			}
			dynamicRegionExisits[nextDynamicX][nextDynamicY] = true;
			if (nextDynamicY < 128) {
				nextDynamicY++;
			} else {
				nextDynamicY = 0;
				nextDynamicX++;
			}
			region = new DynamicMapSquare(regionID, this);
			regions.put(regionID, region);
		}
		return region;
	}
	
	public void destroyDynamicRegion(DynamicMapSquare region) {
		int dynamicX = (region.getBaseTile().getRegionX() - DYNAMIC_REGION_START_X) / 2;
		int dynamicY = region.getBaseTile().getRegionY() / 2;
		synchronized (regions) {
			regions.remove(region);
			nextDynamicY = dynamicY;
			nextDynamicX = dynamicX;
			dynamicRegionExisits[dynamicX][dynamicY] = false;
		}
	}

	/**
	 * Gets the region with the associated ID
	 * 
	 * @param regionID
	 *            The ID of the region
	 * @return The region
	 */
	public MapSquare getRegionByID(int regionID) {
		MapSquare region;
		synchronized (regions) {
			region = regions.get(regionID);
			if (region == null || !region.isLoaded()) {
				loadRegion(regionID);
				region = regions.get(regionID);
			}
		}
		return region;
	}

	protected MapSquare getWithoutLoad(int regionID) {
		MapSquare region;
		synchronized (regions) {
			region = regions.get(regionID);
			if (region == null) {
				region = new MapSquare(regionID);
				regions.put(regionID, region);
			}
		}
		return region;
	}

	private int cleanupTick = 0;

	/**
	 * Runs the region update tasks
	 */
	public void updateRegions() {
		synchronized (regions) {
			for (MapSquare region : regions.values()) {
				if (region != null) {
					region.updateRegion();
				}
				if (region.canUnload()) {
					emptyRegions.add(region);
				}
			}
		}
		cleanupTick++;
		if (cleanupTick > 300) {// Run region cleanup tasks once every 3 minutes
			cleanupTick = 0;
			cleanup();
		}
	}

	public void cleanup() {
		synchronized (regions) {
			for (MapSquare r : removalQueue) {
				emptyRegions.remove(r);
				if (r.canUnload()) {// Double check that nothing has spawned in
									// the region since the last rotation
					regions.remove(r.getID());
				}
			}
			if (removalQueue.size() > 0) {
				logger.info("Cleaned up " + removalQueue.size()
						+ " empty regions.");
				removalQueue.clear();
			}
		}
		Iterator<MapSquare> iterator = emptyRegions.iterator();
		while (iterator.hasNext()) {
			MapSquare r = iterator.next();
			if (r.canUnload()) {
				removalQueue.add(r);
			} else {
				iterator.remove();
			}
		}
	}

	/**
	 * Submits a request to load the specified region. Note that this method
	 * only submits the load task; the region will not be fully loaded
	 * immediately following this.
	 * 
	 * @param regionID
	 *            The ID of the region to load
	 */
	private void loadRegion(int regionID) {
		if (!regionDataExists(regionID)) {
			return;// Region does not exist
		}
		MapSquare region = regions.containsKey(regionID) ? regions.get(regionID)
				: new MapSquare(regionID);
		if (!LoadStage.IDLE.equals(region.loadStage)) {
			return;// Region is already loading
		}
		Virtue.getInstance().getEngine().getWorkerExecutor()
				.execute(new MapLoadTask(regionID, region));
		region.loadStage = LoadStage.STARTING;
		regions.put(regionID, region);

	}

	/**
	 * Checks whether the region has been loaded in the server
	 * 
	 * @param regionID
	 * @return
	 */
	public boolean regionLoaded(int regionID) {
		if (!regions.containsKey(regionID)) {
			return false;
		}
		return regions.get(regionID).isLoaded();
	}

	public boolean regionDataExists(int regionID) {
		int regionX = (regionID >> 8) & 0xff;
		int regionY = regionID & 0xff;
		if (regionX > 127) {
			return false;// 128-256 is reserved for dynamic regions
		}
		ReferenceTable.Entry entry = mapsTable.getEntry(getArchiveKey(
				regionX, regionY));
		return entry != null && entry.getEntry(0) != null;
	}

	public static int getArchiveKey(CoordGrid tile) {
		return getArchiveKey(tile.getRegionX(), tile.getRegionY());
	}

	public static int getArchiveKey(int regionX, int regionY) {
		return regionX | regionY << 7;
	}
	
	/**
	 * Gets the clipping flag at the given coordinates.
	 * @param level The plane.
	 * @param x The x-coordinate.
	 * @param y The y-coordinate.
	 * @return The clipping flag.
	 */
	public int getClippingFlag(int level, int x, int y) {
		CoordGrid tile = new CoordGrid(x, y, level);
		MapSquare region = getRegionByID(tile.getRegionID());
		if (region == null || !region.isLoaded()) {
			return -1;
		}
		return region.getClipMap().getClipFlags(tile.getXInRegion(), tile.getYInRegion(), level);
	}

	public static boolean checkDirection(CoordGrid currentTile, CompassPoint direction, int size) {
		return true;
		//TODO: This...
		//return direction.canMove(currentTile, size);
	}
}
