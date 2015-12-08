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

import org.virtue.game.entity.combat.impl.ability.Ability;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.combat.impl.ability.keybind.Keybind;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
public class ActionBarWidget extends Widget {

	private static final int[] SLOTS = new int[] { 55, 68, 81, 94, 107, 120, 133, 146, 159, 177, 185, 198, 211, 224 };
	
	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#drag(int, int, int, int, int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean drag (int widget1, int component1, int slot1, int item1, int widget2, int component2, int slot2, int item2, Player player) {
		Ability list = ActionBar.getAbilities().get(widget1 << 16 | slot1);
		if (list != null) {
			int slot = -1;
			for (int i = 0; i < SLOTS.length; i++) {
				if (SLOTS[i] == component2) {
					slot = i;
				}
			}
			if (player.getCombatSchedule().getActionBar().isLocked()) {
				player.getCombatSchedule().getActionBar().refresh(slot);
				return true;
			}
			Keybind bind = new Keybind(slot);
			bind.bind(widget1 << 16 | slot1);
			player.getCombatSchedule().getActionBar().getActiveBar().set(slot, bind);
			player.getCombatSchedule().getActionBar().refresh(slot);
			player.getDispatcher().sendGameMessage(list.getClass().getSimpleName() + " added.");
			return true;
		}
		return false;
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#click(int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean click(int widgetId, int buttonId, int slotId, int itemId, Player player, OptionButton option) {
		switch (buttonId) {
		case 49://Toggle auto-retaliate
			player.getCombatSchedule().setRetaliating(!player.getCombatSchedule().isRetaliating());			
			return true;
		case 248:
			player.getCombatSchedule().getActionBar().switchLocked();
			break;
		case 250:
			player.setWidgetState(WidgetState.POWERS_OVERLAY);
			player.getVars().setVarValueInt(1757, 0);
			player.getVars().setVarValueInt(1762, -1);
			player.getVars().setVarValueInt(3708, 46973955);
			player.getVars().setVarValueInt(3708, 46973954);
			player.getDispatcher().sendVarc(1951, -1);
			player.getDispatcher().sendVarc(1952, -1);
			player.getWidgets().sendOverlay(2, -1);
			/*player.getDispatcher().sendHideWidget(1477, 377, false);
			player.getDispatcher().sendWidgetSettings(1477, 376, 0, 24, 2);
			player.getDispatcher().sendWidgetSettings(1477, 379, 1, 1, 2);
			player.getDispatcher().sendWidgetSettings(1477, 378, 1, 1, 2);
			player.getDispatcher().sendVarc(2911, 2);*/
			player.getDispatcher().sendHideWidget(1448, 3, false);
			player.getWidgets().openWidget(1448, 3, 327, true);
			player.getDispatcher().sendHideWidget(1448, 3, false);
			player.getDispatcher().sendHideWidget(1448, 4, true);
			player.getDispatcher().sendHideWidget(1448, 5, false);
			player.getWidgets().openWidget(1448, 5, 1436, true);
			player.getDispatcher().sendHideWidget(1448, 5, false);
			player.getDispatcher().sendHideWidget(1448, 6, true);
			player.getDispatcher().sendWidgetSettings(1430, 55, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 60, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 68, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 73, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 81, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 86, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 94, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 99, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 107, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 112, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 120, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 125, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 133, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 138, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 146, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 151, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 159, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 164, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 172, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 177, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 185, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 190, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 198, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 203, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 211, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 216, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 224, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1430, 229, -1, -1, 2195454);
			player.getDispatcher().sendWidgetSettings(1436, 25, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 30, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 38, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 43, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 51, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 56, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 64, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 69, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 77, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 82, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 90, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 95, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 103, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 108, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 116, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 121, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 129, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 134, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 142, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 147, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 155, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 160, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 168, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 173, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 181, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 186, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 194, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1436, 199, -1, -1, 11108350);
			player.getDispatcher().sendWidgetSettings(1458, 31, 0, 28, 2);
			player.getDispatcher().sendWidgetSettings(1430, 13, -1, -1, 0);
			player.getDispatcher().sendWidgetSettings(1465, 19, -1, -1, 0);
			player.getDispatcher().sendWidgetSettings(1430, 6, -1, -1, 262150);
			player.getDispatcher().sendWidgetSettings(1430, 18, -1, -1, 0);
			player.getDispatcher().sendWidgetSettings(1461, 1, 0, 171, 97350);
			player.getDispatcher().sendWidgetSettings(590, 8, 0, 177, 6);
			player.getDispatcher().sendHideWidget(1448, 7, true);
			player.getDispatcher().sendHideWidget(1448, 8, true);
			player.getDispatcher().sendHideWidget(1448, 9, true);
			player.getDispatcher().sendHideWidget(1448, 10, true);
			player.getDispatcher().sendHideWidget(1448, 11, true);
			player.getDispatcher().sendHideWidget(1448, 12, true);
			player.getDispatcher().sendHideWidget(1448, 1, true);
			break;
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#getPossibleIds()
	 */
	@Override
	public int[] getStates() {
		return new int[] { WidgetState.ACTION_BAR_WIDGET.getID() };
	}
}
