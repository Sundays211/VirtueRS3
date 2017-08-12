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
import java.util.HashSet;
import java.util.Set;

import org.virtue.game.map.CoordGrid;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 1/01/2015
 */
public class DynamicMapSquare extends MapSquare {
	
	private int[][][] staticZones;
	
	protected RegionManager regionManager;
	
	private Set<Integer> baseSquares = new HashSet<>();

	/**
	 * @param id
	 */
	public DynamicMapSquare(int id, RegionManager regionManager) {
		super(id, regionManager);
		this.regionManager = regionManager;
		staticZones = new int[4][8][8];
		for (int[][] a : staticZones) {
			for (int[] b : a) {
				Arrays.fill(b, -1);
			}
		}
	}

	/**
	 * Clears all locations, objects, and terrain clipping from the map square in preparation for a rebuild
	 */
	public void reset () {
		synchronized (zones) {
			zones.clear();
		}
		getClipMap().reset();
	}

	public void rotateZone (int zoneX, int zoneY, int level, int rotation) {
		staticZones[level][zoneX][zoneY] &= ~(0x3 << 1);
		staticZones[level][zoneX][zoneY] |= ((rotation & 0x3) << 1);
	}

	public void updateZone (int destZoneX, int destZoneY, int destLevel, CoordGrid srcCoord, int rotation) {
		if (!regionManager.regionDataExists(srcCoord.getRegionID())) {
			throw new IllegalArgumentException("Invalid map square: data for static map square "+srcCoord.getRegionID()+" does not exist!");
		}
		staticZones[destLevel][destZoneX][destZoneY] = ((rotation & 0x3) << 1) 
				| ((srcCoord.getZoneY() & 0x7ff) << 3) 
				| ((srcCoord.getZoneX() & 0x3ff) << 14) 
				| ((srcCoord.getLevel() & 0x3) << 24);
		baseSquares.add(srcCoord.getRegionID());//Load the region this is based on
	}

	public int[][][] getZoneData () {
		return staticZones;
	}

	public int getBaseSquareCount () {
		return baseSquares.size();
	}

	public int getStaticZone (int plane, int chunkX, int chunkY) {
		return staticZones[plane][chunkX - baseTile.getZoneX()][chunkY - baseTile.getZoneY()];
	}
}
