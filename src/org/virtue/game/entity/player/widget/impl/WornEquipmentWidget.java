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
package org.virtue.game.entity.player.widget.impl;

import java.util.HashMap;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 20, 2014
 */
public class WornEquipmentWidget extends Widget {
	
	@Override
	public void open (int parentId, int parentSlot, int widgetId, boolean clickThrough, Player player) {
		super.open(parentId, parentSlot, widgetId, clickThrough, player);
		player.getDispatcher().sendWidgetEvents(1464, 15, 0, 18, 15302654);
		player.getDispatcher().sendWidgetEvents(1464, 13, 2, 12, 2);
		player.getInvs().loadContainer(ContainerState.EQUIPMENT);
		player.getInvs().sendContainer(ContainerState.EQUIPMENT);
	}

	@Override
	public boolean click(int widgetId, int componentId, int slot, int itemId, Player player, OptionButton option) {
		switch (componentId) {
		case 15:
			Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slot);
			if (item == null || item.getId() != itemId) {
				//The client inventory must not be synchronised, so let's send it again
				player.getInvs().sendContainer(ContainerState.EQUIPMENT);
				return false;
			}
			handleEquipmentInteraction(player, option, item, slot);
			return true;
		case 13:
			switch (slot) {
			case 12:
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
				player.getDispatcher().sendWidgetEvents(1474, 15, -1, -1, 2097152);
				player.getDispatcher().sendWidgetEvents(1474, 15, 0, 27, 15302030);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getWidgets().openWidget(1448, 5, 1463, true);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getDispatcher().sendHideWidget(1448, 6, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getWidgets().openWidget(1448, 7, 1462, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getDispatcher().sendHideWidget(1448, 8, true);
				player.getDispatcher().sendWidgetEvents(1462, 14, 0, 18, 15302654);
				player.getDispatcher().sendWidgetEvents(1462, 20, 2, 12, 2);
				player.getDispatcher().sendHideWidget(1448, 9, true);
				player.getDispatcher().sendHideWidget(1448, 10, true);
				player.getDispatcher().sendHideWidget(1448, 11, true);
				player.getDispatcher().sendHideWidget(1448, 12, true);
				player.getDispatcher().sendHideWidget(1448, 1, true);
				return true;
			case 7:
				player.getWidgets().openCentralWidget(17, false);
				player.getDispatcher().sendWidgetEvents(17, 18, 1024, 14, 1024);
				player.getDispatcher().sendWidgetEvents(17, 17, 1024, 47, 1024);
				player.getDispatcher().sendWidgetEvents(17, 20, 1024, 47, 1024);
				player.getDispatcher().sendWidgetEvents(17, 22, 1024, 47, 1024);
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
	
	private void handleEquipmentInteraction (Player player, OptionButton option, Item item, int slot) {
		ScriptEventType eventType;
		switch (option) {
		case ONE:
			player.getEquipment().removeItem(slot, item.getId());
			return;
		case TWO:
			eventType = ScriptEventType.OPWORN1;
			break;
		case THREE:
			eventType = ScriptEventType.OPWORN2;
			break;
		case FOUR:
			eventType = ScriptEventType.OPWORN3;
			break;
		case FIVE:
			eventType = ScriptEventType.OPWORN4;
			break;
		case SIX:
			eventType = ScriptEventType.OPWORN5;
			break;
		case TEN:
			item.examine(player);
			return;
		default:
			eventType = null;
			break;
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (eventType != null && scripts.hasBinding(eventType, item.getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("item", item);
			args.put("slot", slot);
			scripts.invokeScriptChecked(eventType, item.getId(), args);
		} else {
			player.getDispatcher().sendGameMessage("Unhanded equipment item option: item="+item+", slot="+slot+", option="+option);
		}
	}

}
