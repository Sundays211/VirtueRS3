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
package org.virtue.model.entity.player.widget.impl;

import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.widget.Widget;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.script.listeners.ItemListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 20, 2014
 */
public class WornEquipmentWidget extends Widget {
	
	@Override
	public void open (int parentId, int parentSlot, int widgetId, boolean clickThrough, Player player) {
		super.open(parentId, parentSlot, widgetId, clickThrough, player);
		player.getDispatcher().sendWidgetSettings(1464, 15, 0, 18, 15302654);
		player.getDispatcher().sendWidgetSettings(1464, 13, 2, 12, 2);
		player.getInvs().loadContainer(ContainerState.EQUIPMENT);
		//container.swap(Item.create(21371, 1),  3);//TODO: Remove this when proper wielding has been implemented
		/*container.swap(Item.create(31100, 1), 0);
		container.swap(Item.create(23659, 1), 1);
		container.swap(Item.create(19335, 1), 2);
		container.swap(Item.create(18349, 1), 3);
		container.swap(Item.create(13887, 1), 4);
		container.swap(Item.create(25991, 1), 5);
		container.swap(Item.create(13893, 1), 7);
		container.swap(Item.create(22362, 1), 9);
		container.swap(Item.create(21787, 1), 10);*/
		player.getInvs().sendContainer(ContainerState.EQUIPMENT);
	}

	@Override
	public boolean click(int widgetId, int componentId, int slotId, int itemId, Player player, OptionButton option) {
		switch (componentId) {
		case 15:
			Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slotId);
			if (item == null) {
				return false;
			}
			switch (option) {
			case ONE:
				return player.getEquipment().removeItem(slotId, itemId);
			case TEN:
				item.examine(player);
				return true;
			default:
				ItemListener listener = Virtue.getInstance().getScripts().forItemID(item.getId());
				if (listener == null || !listener.handleInteraction(player, item, slotId, option.getID()+20)) {
					player.getDispatcher().sendGameMessage("Unhanded equipment item option: item="+item+", slot="+slotId+", option="+option);
				}
				return true;
			}
		case 13:
			switch (slotId) {
			case 12:
				player.setWidgetState(WidgetState.GEAR_OVERLAY);
				player.getVars().setVarValueInt(3708, 38544385);
				player.getVars().setVarValueInt(3708, 38544385);
				player.getWidgets().sendOverlay(1, -1);
				/*player.getDispatcher().sendHideWidget(1477, 377, false);
				player.getDispatcher().sendWidgetSettings(1477, 376, 0, 24, 2);
				player.getDispatcher().sendWidgetSettings(1477, 379, 1, 1, 2);
				player.getDispatcher().sendWidgetSettings(1477, 378, 1, 1, 2);
				player.getDispatcher().sendVarc(2911, 1);*/
				player.getDispatcher().sendHideWidget(1448, 3, false);
				player.getWidgets().openWidget(1448, 3, 1474, true);
				player.getDispatcher().sendHideWidget(1448, 3, false);
				player.getDispatcher().sendHideWidget(1448, 4, true);
				player.getDispatcher().sendWidgetSettings(1474, 15, -1, -1, 2097152);
				player.getDispatcher().sendWidgetSettings(1474, 15, 0, 27, 15302030);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getWidgets().openWidget(1448, 5, 1463, true);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getDispatcher().sendHideWidget(1448, 6, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getWidgets().openWidget(1448, 7, 1462, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getDispatcher().sendHideWidget(1448, 8, true);
				player.getDispatcher().sendWidgetSettings(1462, 14, 0, 18, 15302654);
				player.getDispatcher().sendWidgetSettings(1462, 20, 2, 12, 2);
				player.getDispatcher().sendHideWidget(1448, 9, true);
				player.getDispatcher().sendHideWidget(1448, 10, true);
				player.getDispatcher().sendHideWidget(1448, 11, true);
				player.getDispatcher().sendHideWidget(1448, 12, true);
				player.getDispatcher().sendHideWidget(1448, 1, true);
				return true;
			case 7:
				player.getWidgets().openCentralWidget(17, false);
				player.getDispatcher().sendWidgetSettings(17, 18, 1024, 14, 1024);
				player.getDispatcher().sendWidgetSettings(17, 17, 1024, 47, 1024);
				player.getDispatcher().sendWidgetSettings(17, 20, 1024, 47, 1024);
				player.getDispatcher().sendWidgetSettings(17, 22, 1024, 47, 1024);
				return true;
			case 2:
				player.getWidgets().openCentralWidget(1178, false);
				return true;
			}
		default:
			return false;
		}
	}

	@Override
	public int[] getStates() {
		return new int[] { WidgetState.EQUIPMENT_WIDGET.getID() };
	}

}
