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

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.script.ScriptEventType;
import org.virtue.script.ScriptManager;
import org.virtue.script.listeners.ItemListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class GroundItem extends Item {

	/**
	* The {@link Logger} instance
	*/
	private static Logger logger = LoggerFactory.getLogger(GroundItem.class);
	
	public static GroundItem create (int id, int amount, Tile tile) {
		GroundItem item = new GroundItem(id, amount);
		item.tile = tile;
		return item;
	}
	
	public static GroundItem create (int id, int amount, Tile tile, Player owner) {
		GroundItem item = new GroundItem(id, amount);
		item.tile = tile;
		//item.owner = owner;
		return item;
	}
	
	private Tile tile;
	
	private Player owner;
	
	private boolean exists = true;
	
	private int timeRemaining = -1;
	
	private GroundItem (int id, int amount) {
		super(id, amount);
	}

	public GroundItem (int id, int amount, Tile tile) {
		this(Item.create(id, amount), tile, null);
	}
	
	public GroundItem (Item item, Tile tile) {
		this(item, tile, null);
	}
	
	public GroundItem (Item item, Tile tile, Player owner) {
		super(item);
		this.tile = tile;
		this.owner = owner;
	}
	
	/**
	 * Gets the tile on which this item is located
	 * @return The tile
	 */
	public Tile getTile () {
		return tile;
	}
	
	/**
	 * Returns whether the item still exists at the given tile
	 * @return True if the item still exists, false otherwise
	 */
	public boolean exists () {
		return exists;
	}
	
	/**
	 * Removes the item
	 */
	public void destroy () {
		this.exists = false;
	}
	
	public Player getOwner () {
		return owner;
	}
	
	public void clearOwner () {
		this.owner = null;
	}
	
	public int getOffsetX () {
		return tile.getX() % 8;
	}
	
	public int getOffsetY () {
		return tile.getY() % 8;
	}
	
	/**
	 * Sets the time until this item is removed from the map
	 * @param time
	 */
	public void setSpawnTime (int time) {
		this.timeRemaining = time;
	}
	
	/**
	 * Clocks the removal timer for this item
	 * @return True if the item should be removed, false otherwise
	 */
	public boolean processTick () {
		if (timeRemaining == 0) {
			return true;
		}
		if (timeRemaining > 0) {
			timeRemaining--;
		}
		return false;
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
	 * Handles an interaction with this ground item
	 * @param player The player interacting with the object
	 * @param option The option selected
	 * @return True if the interaction was successful, false otherwise
	 */
	public boolean interact (Player player, OptionButton option) {
		if (owner != null && owner.getUserHash() != player.getUserHash()) {
			logger.warn("Player "+player.getName()+" attempted to interact with item "+this.getId()+", which is currently only visible to "+owner.getName());
			return true;
		}
		if (OptionButton.SIX.equals(option)) {
			this.examine(player);
			return true;
		}
		ScriptEventType eventType;
		switch (option) {
		case ONE:
			eventType = ScriptEventType.ITEM_OP1;
			break;
		case TWO:
			eventType = ScriptEventType.ITEM_OP2;
			break;
		case THREE:
			eventType = ScriptEventType.ITEM_OP3;
			break;
		case FOUR:
			eventType = ScriptEventType.ITEM_OP4;
			break;
		case FIVE:
			eventType = ScriptEventType.ITEM_OP5;
			break;
		default:
			eventType = null;
			break;
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (eventType != null && scripts.hasBinding(eventType, this.getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("item", this);
			args.put("coords", tile);
			scripts.invokeScriptChecked(eventType, this.getId(), args);
			return true;
		}
		
		if (OptionButton.THREE.equals(option) && "Take".equalsIgnoreCase(this.getType().op[2])) {//Take
			if (player.getInvs().getContainer(ContainerState.BACKPACK).freeSlots() > 0) {
				Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
				if (region != null) {
					GroundItem oldItem = region.removeItem(tile, this.getId());
					if (oldItem != null) {
						player.getInvs().addBackpackItem(new Item(oldItem));
						return true;
					}
				}
			}
		}
		ItemListener listener = Virtue.getInstance().getScripts().forItemID(this.getId());
		if (listener != null) {
			return listener.handleInteraction(player, this, -1, option.getID()+10);
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "GroundItem [tile=" + tile + ", id=" + id + ", name=" + name + "]";
	}
}
