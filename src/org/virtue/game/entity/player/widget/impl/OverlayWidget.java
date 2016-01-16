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

import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.var.VarKey;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
public class OverlayWidget extends Widget {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#click(int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean click(int widgetId, int buttonId, int slotId, int itemId, Player player, OptionButton option) {
		//System.out.println(player.getWidgetState().toString());
		switch (buttonId) {
		case 36://Lock/unlock interfaces
			boolean locked = player.getVars().getVarBitValue(VarKey.Bit.IF_LOCK_STATUS) == 1;
			player.getVars().setVarBitValue(VarKey.Bit.IF_LOCK_STATUS, locked ? 0 : 1);
			return true;
		case 37:
			player.switchSheathing();
			break;
		case 68://Logout
			player.getVars().setVarValueInt(3813, 6);
			player.getWidgets().openWidget(1477, 853, 26, true);
			player.getDispatcher().sendWidgetSettings(26, 22, -1, -1, 2);
			return true;
		case 415://Close button
			switch (slotId) {
			case 1:
				player.getDispatcher().sendVarc(2911, -1);
				// player.getDispatcher().sendRunScript(187, new Object[] { 8, 1 });// Settings 1
				// player.getDispatcher().sendRunScript(187, new Object[] { 8, 2 });// Settings 2
				// player.getDispatcher().sendRunScript(187, new Object[] { 8, 3 });// Settings 3
				// player.getDispatcher().sendRunScript(187, new Object[] { 8, 4 });// Settings 4
				// player.getDispatcher().sendRunScript(187, new Object[] { 8, 5 });// Settings 5

				// player.getDispatcher().sendRunScript(187, new Object[] { 0, 4 });// Hero 4
				// player.getDispatcher().sendRunScript(187, new Object[] { 0, 3 });// Hero 3
				// player.getDispatcher().sendRunScript(187, new Object[] { 0, 2 });// Hero 2
				// player.getDispatcher().sendRunScript(187, new Object[] { 0, 1 });// Hero 1

				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 1 });// Gear 1
				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 2 });// Gear 2
				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 3 });// Gear 3
				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 4 });// Gear 4
				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 5 });// Gear 5
				// player.getDispatcher().sendRunScript(187, new Object[] { 1, 6 });// Gear 6

				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 1 });// Adventures 1
				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 2 });// Adventures 2
				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 3 });// Adventures 3
				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 4 });// Adventures 4
				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 5 });// Adventures 5
				// player.getDispatcher().sendRunScript(187, new Object[] { 3, 6 });// Adventures 6

				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 1 });// Powers 1
				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 2 });// Powers 2
				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 3 });// Powers 3
				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 4 });// Powers 4
				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 5 });// Powers 5
				// player.getDispatcher().sendRunScript(187, new Object[] { 2, 6 });// Powers 6
				player.getWidgets().closeWidget(1448, 3);
				player.getWidgets().closeWidget(1448, 5);
				player.getWidgets().closeWidget(1448, 7);
				player.getWidgets().closeWidget(1426, 0);
				return true;
			}
			break;
		}
		return false;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#drag(int, int, int, int, int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean drag (int widget1, int component1, int slot1, int item1, int widget2, int component2, int slot2, int item2, Player player) {
		return true;//Stops some of the debug messages
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#getStates()
	 */
	@Override
	public int[] getStates() {
		return new int[] { WidgetState.ROOT_WIDGET.getID() };
	}
}
