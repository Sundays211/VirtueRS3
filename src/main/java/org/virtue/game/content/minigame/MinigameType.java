/**
 * Copyright (c) 2015 Kyle Friz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.game.content.minigame;

/**
 * An enum holding constants variables
 * for minigames processing.
 * 
 * @author Kyle Friz
 * @since  Dec 5, 2015
 */
public enum MinigameType {

	//TODO dont really know these values lmaoo
	
	PEST_CONTROL(20, 25, false, (long) 120000, 4555, 5073, 8, 8, 3),
	
	CLAN_WARS(10, 20, true, (long) 120000, 4555, 5073, 8, 8, 3);
	
	//etc..
	
	/**
	 * The minimum player size
	 */
	private final int min;
	
	/**
	 * The maximum player size
	 */
	private final int max;
	
	/**
	 * If the minigame has teams
	 */
	private final boolean teams;
	
	/**
	 * The time limit (ms)
	 */
	private final long limit;
	
	/**
	 * The x bounding coordinate
	 */
	private final int xCoord;
	
	/**
	 * the y bounding coordinate
	 */
	private final int yCoord;
	
	/**
	 * The amount of x coordinates to offset
	 */
	private final int xOffset;
	
	/**
	 * The amount of y coordinates to offset
	 */
	private final int yOffset;
	
	/**
	 * The amount of z coordinates to offset
	 */
	private final int zOffset;
	
	/**
	 * Creates a new minigame type
	 * @param min The minimum size
	 * @param max The maximum size
	 * @param teams If there are teams
	 * @param limit The time limit
	 * @param x The bound x coord
	 * @param y The bound y coord
	 * @param xOff The x coord offset
	 * @param yOff The y coord offset
	 * @param zOff The z coord offset
	 */
	MinigameType(int min, int max, boolean teams, long limit, int x, int y, int xOff, int yOff, int zOff) {
		this.min = min;
		this.max = max;
		this.teams = teams;
		this.limit = limit;
		this.xCoord = x;
		this.yCoord = y;
		this.xOffset = xOff;
		this.yOffset = yOff;
		this.zOffset = zOff;
	}

	/**
	 * @return the min
	 */
	public final int getMin() {
		return min;
	}

	/**
	 * @return the max
	 */
	public final int getMax() {
		return max;
	}
	
	/**
	 * @return the teams
	 */
	public final boolean hasTeams() {
		return teams;
	}
	
	/**
	 * @return the limit
	 */
	public final long getLimit() {
		return limit;
	}
	
	/**
	 * @return the xCoord
	 */
	public final int getXCoord() {
		return xCoord;
	}

	/**
	 * @return the yCoord
	 */
	public final int getYCoord() {
		return yCoord;
	}

	/**
	 * @return the xOffset
	 */
	public final int getXOffset() {
		return xOffset;
	}

	/**
	 * @return the yOffset
	 */
	public final int getYOffset() {
		return yOffset;
	}

	/**
	 * @return the zOffset
	 */
	public final int getZOffset() {
		return zOffset;
	}
	
}
