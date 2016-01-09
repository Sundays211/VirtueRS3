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
package org.virtue.engine.script.listeners;

import org.virtue.game.entity.Entity;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Nov 6, 2014
 */
public interface WidgetListener {

	/**
	 * Gets the widget ids which are bound to this listener
	 * @return an array of integers containing the ids to bind to
	 */
	public int[] getIDs();
	
	/**
	 * Called whenever a player clicks a button on the widget
	 * @param player The player who clicked the button
	 * @param widgetId The id of the widget clicked
	 * @param component The id of the component clicked
	 * @param slot The slot within the component which was clicked, or -1 if the component has no slots
	 * @param itemId The id of the item clicked, or -1 if there was no item
	 * @param option The option selected. Ranges from 1 to 10
	 * @return True if the interaction was handled, false otherwise
	 */
	public boolean handleInteraction(Entity player, int widgetId, int component, int slot, int itemId, int option);
	
	/**
	 * Called when the widget is opened. 
	 * This should be used to setup the widget, such as hiding/unhiding components, sending appropriate variables and setting events
	 * @param player The player who opened the widget
	 * @param parentId The id of the parent widget in which this was attached
	 * @param parentComponent The id of the parent component in which this was attached
	 * @param id The id of the widget being opened
	 */
	public void open (Entity player, int parentId, int parentComponent, int id);
	
	/**
	 * Called when the widget is closed. 
	 * @param player The player who closed the widget
	 * @param parentId The id of the parent widget in which this was attached
	 * @param parentComponent The id of the parent component in which this was attached
	 * @param id The id of the widget being closed
	 */
	public void close (Entity player, int parentId, int parentComponent, int id);
	
	/**
	 * Called when a component within the widget is dragged. This includes sliders, item drags, moving interfaces, etc
	 * @param player The player who dragged the component
	 * @param widget1 The id of the widget that was dragged
	 * @param component1 The id of the component that was dragged
	 * @param slot1 The slot within the component which was dragged, or -1 if the component has no slots
	 * @param itemId1 The id of the item dragged, or -1 if there was no item
	 * @param widget2 The id of the widget that was dragged onto
	 * @param component2 The id of the component that was dragged onto
	 * @param slot2 The slot within the component which was dragged onto, or -1 if the component has no slots
	 * @param itemId2 The id of the item dragged onto, or -1 if there was no item
	 * @return True if the interaction was handled, false otherwise
	 */
	public boolean drag (Entity player, int widget1, int component1, int slot1, int itemId1, int widget2, int component2, int slot2, int itemId2);
	
}
