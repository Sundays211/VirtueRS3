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
package org.virtue.game.world.region;

import org.virtue.Virtue;
import org.virtue.config.loctype.LocType;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
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
	
	public static SceneLocation create (int id, Tile tile, int type, int rotation) {
		SceneLocation object = new SceneLocation(id, tile, type, rotation);
		return object;
	}
	
	
	private int originalID;
	
	private int respawnTime = -1;
	
	private Tile baseTile;
	
	private int nodeType;
	
	private int rotation;
	
	private LocType locType;
	
	private boolean exists = true;
	
	protected SceneLocation (int id, Tile tile, int nodeType, int rotation) {
		super(id);
		super.currentTile = tile;
		this.originalID = id;
		this.baseTile = tile;
		this.nodeType = nodeType;
		this.rotation = rotation;
		super.name = getLocType().name;
		if ((rotation & 2) == 0) {
			super.setSizeX(getLocType().sizeX);
			super.setSizeY(getLocType().sizeY);
		} else {
			super.setSizeX(getLocType().sizeY);
			super.setSizeY(getLocType().sizeX);
		}
	}
	
	/**
	 * Sets this location as a temporary location
	 */
	protected void setTemporary (int removalDelay) {
		this.originalID = -1;
		this.respawnTime = removalDelay;
	}
	
	public boolean isTemporary () {
		return originalID != -1;
	}
	
	/**
	 * Gets the id for this scene location
	 * @return The id
	 */
	public int getID () {
		return id;
	}
	
	protected boolean processTick () {
		if (respawnTime < 0) {
			respawnTime = -1;
			return false;
		}
		respawnTime--;
		if (respawnTime == 0) {
			return true;
		} else {
			return false;
		}
	}
	
	protected void revert () {
		transform(originalID, -1);
	}
	
	/**
	 * Transforms this object to another location for the specified period of time
	 * @param newID The ID of the new location
	 * @param revertDelay The time until the location reverts to the original ID. Set to -1 if the location never reverts
	 */
	public void transform (int newID, int revertDelay) {
		this.id = newID;
		this.locType = null;
		this.respawnTime = revertDelay;
		Region region = World.getInstance().getRegions().getRegionByID(baseTile.getRegionID());
		if (region != null) {
			if (id < 0) {
				region.removeLocation(this, originalID < 0);
				exists = (originalID >= 0);
			} else {
				region.updateLocation(this, id != originalID);
			}
		}
	}
	
	/**
	 * Gets the {@link Tile} on which this scene object sits
	 * @return The tile
	 */
	public Tile getTile () {
		return baseTile;
	}
	
	public Tile getMiddleTile () {
		int x = (baseTile.getX()*2 + getLocType().sizeX)/2;
		int y = (baseTile.getY()*2 + getLocType().sizeY)/2;
		return new Tile(x, y, baseTile.getPlane());
	}

	/**
	 * Gets the integer representing the node type of this location (eg wall, door, stand-alone, etc)
	 * @return The node type
	 */
	public int getNodeType () {
		return nodeType;
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
	 * Returns whether the location exists or not
	 * @return True if the location exists, false otherwise
	 */
	public boolean exists () {
		return exists;
	}
	
	/**
	 * Checks whether or not the specified option can be handled from a distance
	 * @param option The option to check
	 * @return True if the option can be handled from a distance, false otherwise.
	 */
	public boolean distanceOption (OptionButton option) {
		return OptionButton.SIX.equals(option);
	}
	
	public void examine (Player player) {
		LocType locType = Virtue.getInstance().getConfigProvider().getLocTypes().getTransformed(player, getID());
		player.getDispatcher().sendGameMessage(locType.getDescription());
		if (PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
			player.getDispatcher().sendGameMessage(this.toString());
		}
	}
	
	/**
	 * Returns whether the coords are directly adjacent to this location
	 * @param coords The coords to check
	 * @return True if the tile is adjacent, false otherwise
	 */
	public boolean isAdjacentTo (Tile coords) {
		int tileX = coords.getX();
		int minX = baseTile.getX();
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
		int minY = baseTile.getY();
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
	
	public boolean isStandingOn (Tile coords) {
		int coordX = coords.getX();
		int minX = baseTile.getX();
		int maxX = minX + getLocType().sizeX - 1;
		int coordY = coords.getY();
		int minY = baseTile.getY();
		int maxY = minY + getLocType().sizeY - 1;
		if (coordX >= minX && coordX <= maxX 
				&& coordY >= minY && coordY <= maxY) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public String toString () {
		return "Location[type="+id+", rotation="+rotation+", name="+getLocType().name+", tile="+baseTile+"]";
	}
}
