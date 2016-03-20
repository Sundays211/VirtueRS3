/**
 * Copyright (c) 2014 Mist
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

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.widget.impl.AccountCreationWidget;
import org.virtue.game.entity.player.widget.impl.ActionBarWidget;
import org.virtue.game.entity.player.widget.impl.BackpackWidget;
import org.virtue.game.entity.player.widget.impl.BankWidget;
import org.virtue.game.entity.player.widget.impl.CombatSettingsWidget;
import org.virtue.game.entity.player.widget.impl.TreasureHunterWidget;
import org.virtue.game.entity.player.widget.impl.WornEquipmentWidget;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.widget.WidgetSubEventContext;
import org.virtue.network.event.encoder.impl.widget.WidgetSubEventEncoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/21/2014
 */
public final class WidgetRepository {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory
			.getLogger(WidgetRepository.class);

	/**
	 * Represents a list of stored interfaces.
	 */
	private final static Map<Integer, Widget> WIDGETS = new HashMap<>();

	/**
	 * Opens an interface in the central interface window slot
	 * 
	 * @param widgetId
	 *            The ID of the interface to open
	 * @param closeable
	 *            Whether the interface closes when the cross is clicked or not
	 * @param player
	 *            The player
	 * @return True if the interface was opened successfully, false otherwise
	 */
	public boolean openCentralWidget(int widgetId, boolean alwaysOpen, Player player) {
		System.out.println("Opening central interface. ID=" + widgetId);
		return open(1477, Widget.CENTRAL_IF_WINDOW_SLOT, widgetId, alwaysOpen,
				player);
	}

	/**
	 * Opens an interface, also triggering any startup scripts for the interface
	 * 
	 * @param parentId
	 *            The ID of the parent interface on which to put this interface
	 * @param parentSlot
	 *            The slot on the parent interface to put this
	 * @param widgetId
	 *            The ID of the interface to open
	 * @param alwaysOpen
	 *            Whether the interface is unable to be closed when the close
	 *            button is pressed.
	 * @param player
	 *            The player
	 * @return True if the interface was opened successfully, false otherwise
	 */
	public boolean open(int parentId, int parentSlot, int widgetId,
			boolean alwaysOpen, Player player) {
		Widget widget = getInterface(widgetId);
		if (widget == null) {
			player.getDispatcher().sendWidget(parentId, parentSlot, widgetId,
					alwaysOpen);
			return false;
		}
		try {
			widget.open(parentId, parentSlot, widgetId, alwaysOpen, player);
			return true;
		} catch (Exception ex) {
			logger.error("Error opening interface " + widgetId, ex);
			return false;
		}
	}

	public boolean open(int parentId, int parentSlot, int widgetId,
			boolean alwaysOpen, Player player, SceneLocation loc) {
		Widget widget = getInterface(widgetId);
		if (widget == null) {
			player.getDispatcher().sendEvent(
					WidgetSubEventEncoder.class,
					new WidgetSubEventContext(parentId, parentSlot, widgetId,
							alwaysOpen, loc));
			return false;
		}
		try {
			widget.open(parentId, parentSlot, widgetId, alwaysOpen, player);
			return true;
		} catch (Exception ex) {
			logger.error("Error opening interface " + widgetId, ex);
			return false;
		}
	}

	public void close(int parentID, int parentSlot, int widgetId, Player player) {
		Widget widget = getInterface(widgetId);
		if (widget != null) {
			widget.close(parentID, parentSlot, player);
		}
	}

	/**
	 * Handles an RS Interface.
	 * 
	 * @param widgetId The interface ID.
	 * @param componentId The component ID.
	 * @param slot The slot ID.
	 * @param itemId The item ID.
	 * @param player The player.
	 * @return True if the click was handled successfully, false otherwise
	 */
	public boolean handle(int widgetId, int componentId, int slot, int itemId,
			OptionButton button, Player player) {
		Widget widget = getInterface(widgetId);
		if (widget == null) {
			return false;
		}
		try {
			return widget.click(widgetId, componentId, slot, itemId, player,
					button);
		} catch (Exception e) {
			logger.error("Failed handling widget click: " + widgetId
					+ ", Component: " + componentId + ", Slot: " + slot
					+ ", Item: " + itemId + ", Button: " + button, e);
			return false;
		}
	}

	/**
	 * Handles an interface dragged onto another interface
	 * 
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
	public boolean handleDrag(int widget1, int component1, int slot1,
			int item1, int widget2, int component2, int slot2, int item2,
			Player player) {
		Widget widget = getInterface(widget1);
		if (widget2 == 1430) {
			widget = getInterface(1430);
		}
		if (widget == null) {
			return false;
		}
		try {
			return widget.drag(widget1, component1, slot1, item1, widget2,
					component2, slot2, item2, player);
		} catch (Exception e) {
			logger.error("Failed handling widget drag: " + widget1
					+ ", Component: " + component1 + ", Slot1: " + slot1
					+ ", Slot2: " + item1, e);
			return false;
		}
	}
	
	/**
	 * Handles an interface used with another interface
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
	public boolean handleUse(int widget1, int component1, int slot1,
			int item1, int widget2, int component2, int slot2, int item2,
			Player player) {
		Widget widget = getInterface(widget1);
		if (widget == null) {
			return false;
		}
		try {
			return widget.use(widget1, component1, slot1, item1, widget2,
					component2, slot2, item2, player);
		} catch (Exception ex) {
			logger.error("Failed handling widget use: " + widget1
					+ ", component: " + component1 + ", slot: " + slot1
					+ ", item: " + item1, ex);
			return false;
		}
	}
	
	/**
	 * Handles an interface used with a {@link SceneLocation}
	 * @param widgetId The selected widget ID
	 * @param component The selected widget component ID
	 * @param slot The selected widget slot
	 * @param item The selected widget item ID
	 * @param location The target location
	 * @param player The player
	 * @return True if the use was handled successfully, false otherwise
	 */
	public boolean handleUse(int widgetId, int component, int slot,
			int item, SceneLocation location, Player player) {
		Widget widget = getInterface(widgetId);
		if (widget == null) {
			return false;
		}
		try {
			return widget.use(widgetId, component, slot, item, location, player);
		} catch (Exception ex) {
			logger.error("Failed handling widget use: " + widgetId
					+ ", component: " + component + ", slot: " + slot
					+ ", item: " + item +", location: "+location, ex);
			return false;
		}
	}
	
	/**
	 * Handles an interface used with an {@link Entity}
	 * @param widgetId The selected widget ID
	 * @param component The selected widget component ID
	 * @param slot The selected widget slot
	 * @param item The selected widget item ID
	 * @param entity The target entity
	 * @param player The player
	 * @return True if the use was handled successfully, false otherwise
	 */
	public boolean handleUse(int widgetId, int component, int slot,
			int item, Entity entity, Player player) {
		Widget widget = getInterface(widgetId);
		if (widget == null) {
			return false;
		}
		try {
			return widget.use(widgetId, component, slot, item, entity, player);
		} catch (Exception ex) {
			logger.error("Failed handling widget use: " + widgetId
					+ ", component: " + component + ", slot: " + slot
					+ ", item: " + item +", entity: "+entity, ex);
			return false;
		}
	}

	/**
	 * Returns an interface corresponding to the given ID.
	 * 
	 * @param interfaceId
	 *            The interface ID.
	 * @return The interface.
	 */
	private Widget getInterface(int interfaceId) {
		return WIDGETS.get(interfaceId);
	}

	/**
	 * Loads all the game widgets into the repo
	 */
	public void load() {
		registerWidget(ActionBarWidget.class);
		registerWidget(TreasureHunterWidget.class);
		registerWidget(BankWidget.class);
		registerWidget(BackpackWidget.class);
		registerWidget(WornEquipmentWidget.class);
		registerWidget(AccountCreationWidget.class);
		registerWidget(CombatSettingsWidget.class);
		logger.info("Registered " + WIDGETS.size() + " Game Widget(s).");
	}

	/**
	 * Registers a widget to the list of widgets
	 * 
	 * @param clazz
	 */
	private void registerWidget(Class<? extends Widget> clazz) {
		try {
			Widget widget = clazz.newInstance();
			for (int id : widget.getStates()) {
				WIDGETS.put(id, widget);
			}
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}

}
