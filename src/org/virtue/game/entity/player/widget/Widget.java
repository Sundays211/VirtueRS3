/**
 * Copyright (c) 2014 Virtue Studios
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
package org.virtue.game.entity.player.widget;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 9, 2014
 */
public abstract class Widget {
	public static final int CENTRAL_IF_WINDOW_SLOT = 386;
	
	/**
	 * Called to open this interface. This should be overridden by subclasses, if they have any additional methods to call on opening
	 * @param parentId The ID of the parent interface on which to put this interface
	 * @param parentSlot The slot on the parent interface to put this
	 * @param widgetId The ID of the interface to open
	 * @param alwaysOpen Whether it is possible to click through the interface or not
	 * @param player The player
	 */
	public void open (int parentId, int parentSlot, int widgetId, boolean alwaysOpen, Player player) {
		player.getDispatcher().sendWidget(parentId, parentSlot, widgetId, alwaysOpen);
	}
	
	/**
	 * Called when this interface is dragged onto another interface
	 * @param widget1 The dragged widget ID
	 * @param component1 The dragged widget component ID
	 * @param slot1 The dragged widget slot ID
	 * @param item1 The dragged widget item ID
	 * @param widget2 The ID of the widget dragged onto 
	 * @param component2 The ID of the widget component dragged onto 
	 * @param slot2 The ID of the widget slot dragged onto 
	 * @param item2 The ID of the widget item dragged onto 
	 * @param player The player
	 * @return True if the drag was handled successfully, false otherwise
	 */
	public boolean drag (int widget1, int component1, int slot1, int item1, int widget2, int component2, int slot2, int item2, Player player) {
		return false;
	}
	
	/**
	 * Called when this interface is used on another interface
	 * @param widget1 The selected widget ID
	 * @param component1 The selected widget component ID
	 * @param slot1 The selected widget slot ID
	 * @param item1 The selected widget item ID
	 * @param widget2 The ID of the target widget
	 * @param component2 The ID of the target widget component
	 * @param slot2 The ID of the target widget slot
	 * @param item2 The ID of the target widget item
	 * @param player The player
	 * @return True if the use was handled successfully, false otherwise
	 */
	public boolean use (int widget1, int component1, int slot1, int item1, int widget2, int component2, int slot2, int item2, Player player) {
		return false;
	}
	
	/**
	 * Called when this interface is used on a {@link SceneLocation}
	 * @param widget The selected widget ID
	 * @param component The selected widget component ID
	 * @param slot The selected widget slot ID
	 * @param item The selected widget item ID
	 * @param location The location on which the interface was used
	 * @param player The player
	 * @return True if the use was handled successfully, false otherwise
	 */
	public boolean use (int widget1, int component1, int slot, int item, SceneLocation location, Player player) {
		return false;
	}
	
	/**
	 * Called when this interface is used on a {@link Entity}
	 * @param widget The selected widget ID
	 * @param component The selected widget component ID
	 * @param slot The selected widget slot ID
	 * @param item The selected widget item ID
	 * @param entity The entity on which the interface was used
	 * @param player The player
	 * @return True if the use was handled successfully, false otherwise
	 */
	public boolean use (int widget1, int component1, int slot, int item, Entity entity, Player player) {
		return false;
	}
	
	/**
	 * Called when this interface is clicked.
	 * @param widgetId The widget ID.
	 * @param componentId The interface ID.
	 * @param slotId The slot ID.
	 * @param itemId The item ID.
	 * @param option The selected option
	 * @return True if the click was handled successfully, false otherwise
	 */
	public abstract boolean click(int widgetId, int componentId, int slotId, int itemId, Player player, OptionButton option);
	
	/**
	 * Called to close this interface
	 * @param parentID The ID of the parent interface
	 * @param parentSlot The slot of the parent interface on which this interface is attatched
	 * @param player
	 */
	public void close (int parentID, int parentSlot, Player player) {
		//player.getActionSender().sendCloseWidget(parentID, parentSlot);
	}
	
	/**
	 * Returns the possible IDs of this interface.
	 * @return The ids.
	 */
	public abstract int[] getStates();

}
