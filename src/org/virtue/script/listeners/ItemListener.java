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
package org.virtue.script.listeners;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.Item;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public interface ItemListener {

	/**
	 * Gets the item ids which are bound to this listener
	 * @return an array of integers containing the ids to bind to
	 */
	public int[] getItemIDs();
 	
	/**
	 * Called whenever a player clicks an option on one of the bound items
	 * @param player The player who clicked the item
	 * @param item The {@link Item} which was clicked
	 * @param slotID The slot of the item which was clicked (-1 for ground items)
	 * @param optionID The id of the option which was clicked. 1 to 5 are 
	 * @return True if the interaction was handled, false otherwise
	 */
 	public boolean handleInteraction(Player player, Item item, int slotID, int optionID);
 	
 	public String getExamine (Player player, Item item);
}
