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
package org.virtue.game.map;

import java.util.HashSet;
import java.util.Set;

import org.virtue.Virtue;
import org.virtue.config.loctype.LocShape;
import org.virtue.config.loctype.LocType;
import org.virtue.game.node.Node;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class SceneLocation extends Node {

	private static class DelayTask {
		private int delayTime;
		private Runnable onFinish;		
	}

	public static SceneLocation createBase (int id, CoordGrid tile, LocShape shape, int rotation) {
		SceneLocation location = new SceneLocation(id, tile, shape, rotation);
		location.replacement = false;
		return location;
	}

	public static SceneLocation create (int id, CoordGrid tile, LocShape shape, int rotation) {
		SceneLocation location = new SceneLocation(id, tile, shape, rotation);
		return location;
	}

	private final LocShape shape;

	private final int rotation;

	private boolean replacement = true;

	private LocType locType;

	private Set<DelayTask> delayTasks = new HashSet<>();

	protected SceneLocation (int id, CoordGrid tile, LocShape shape, int rotation) {
		super(id);
		super.currentTile = tile;
		this.shape = shape;
		this.rotation = rotation;
		if (id >= 0) {
			if ((rotation & 2) == 0) {
				super.setSizeX(getLocType().sizeX);
				super.setSizeY(getLocType().sizeY);
			} else {
				super.setSizeX(getLocType().sizeY);
				super.setSizeY(getLocType().sizeX);
			}
		}
	}

	@Override
	public String getName() {
		return getLocType().name;
	}
	
	/**
	 * Gets the id for this scene location
	 * @return The id
	 */
	public int getID () {
		return id;
	}
	
	public synchronized void processTick () {
		Set<DelayTask> tasks = delayTasks;
		delayTasks = new HashSet<>();
		for (DelayTask task : tasks) {
			task.delayTime--;
			if (task.delayTime > 0) {
				delayTasks.add(task);
			} else {
				if (task.onFinish != null) {
					task.onFinish.run();
				}
				delayTasks.remove(task);
			}
		}
	}

	/**
	 * Checks whether this location is a replacement for a static location on the map
	 * If true, the location will be sent to new players as they enter the map square
	 * @return True if the location is a replacement, false if it is from the map archive
	 */
	public boolean isReplacement() {
		return replacement;
	}

	/**
	 * Gets the {@link CoordGrid} on which this location sits
	 * @return The tile
	 */
	public CoordGrid getTile () {
		return currentTile;
	}

	public CoordGrid getMiddleTile () {
		int x = (currentTile.getX()*2 + getLocType().sizeX)/2;
		int y = (currentTile.getY()*2 + getLocType().sizeY)/2;
		return new CoordGrid(x, y, currentTile.getLevel());
	}

	/**
	 * Gets the shape of this location (eg wall, door, stand-alone, etc)
	 * @return The shape
	 */
	public LocShape getShape () {
		return shape;
	}
	
	/**
	 * Gets the cache definition for this location
	 * @return The cache definition
	 */
	public LocType getLocType () {
		if (locType == null) {
			//TODO: Simplify this line (by giving the config provider or something)
			locType = Virtue.getInstance().getConfigProvider().getLocTypes().list(id);
		}
		return locType;
	}
	
	/**
	 * Gets the current rotation of the scene location
	 * @return
	 */
	public int getRotation () {
		return rotation;
	}

	/**
	 * Checks whether or not the specified option can be handled from a distance
	 * @param option The option to check
	 * @return True if the option can be handled from a distance, false otherwise.
	 */
	public boolean distanceOption (OptionButton option) {
		return OptionButton.SIX.equals(option);
	}

	/**
	 * Returns whether the coords are directly adjacent to this location
	 * @param coords The coords to check
	 * @return True if the tile is adjacent, false otherwise
	 */
	public boolean isAdjacentTo (CoordGrid coords) {
		int tileX = coords.getX();
		int minX = currentTile.getX();
		int maxX = minX + getLocType().sizeX - 1;
		int dx;
		if (tileX < minX) {
			dx = minX - tileX;
		} else if (tileX > maxX) {
			dx = tileX - maxX;
		} else {
			dx = 0;
		}
		int tileY = coords.getY();
		int minY = currentTile.getY();
		int maxY = minY + getLocType().sizeY - 1;
		int dy;
		if (tileY < minY) {
			dy = minY - tileY;
		} else if (tileY > maxY) {
			dy = tileY - maxY;
		} else {
			dy = 0;
		}
		if (dx == 0 && dy == 0) {
			return false;//Entity is on the same tile
		} else if ((dx == 1 && dy == 0) || (dx == 0 && dy == 1)) {
			return true;
		} else {
			return false;
		}
	}

	public boolean isStandingOn (CoordGrid coords) {
		int coordX = coords.getX();
		int minX = currentTile.getX();
		int maxX = minX + getLocType().sizeX - 1;
		int coordY = coords.getY();
		int minY = currentTile.getY();
		int maxY = minY + getLocType().sizeY - 1;
		if (coordX >= minX && coordX <= maxX 
				&& coordY >= minY && coordY <= maxY) {
			return true;
		} else {
			return false;
		}
	}

	public synchronized void addDelayTask (Runnable onFinish, int delay) {
		DelayTask task = new DelayTask();
		task.onFinish = onFinish;
		task.delayTime = delay;
		delayTasks.add(task);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((currentTile == null) ? 0 : currentTile.hashCode());
		result = prime * result + id;
		result = prime * result + rotation;
		result = prime * result + ((shape == null) ? 0 : shape.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SceneLocation other = (SceneLocation) obj;
		if (currentTile == null) {
			if (other.currentTile != null)
				return false;
		} else if (!currentTile.equals(other.currentTile))
			return false;
		if (id != other.id)
			return false;
		if (rotation != other.rotation)
			return false;
		if (shape != other.shape)
			return false;
		return true;
	}

	@Override
	public String toString () {
		return "Location[type="+id+", shape="+shape+", rotation="+rotation+", name="+getLocType().name+", coord="+currentTile+"]";
	}
}
