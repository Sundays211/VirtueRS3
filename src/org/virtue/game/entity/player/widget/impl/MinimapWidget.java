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

import java.text.NumberFormat;

import org.virtue.game.content.social.ChannelType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.var.VarKey;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
public class MinimapWidget extends Widget {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#click(int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean click(int widgetId, int buttonId, int slotId, int itemId, Player player, OptionButton option) {
		switch (buttonId) {
		case 9://Logout
			player.getVars().setVarValueInt(3813, 6);
			player.getWidgets().openWidget(1477, 787, 26, true);
			player.getDispatcher().sendWidgetEvents(26, 22, -1, -1, 2);
			return true;
		case 22://Money pouch
			return handleMoneyPouch(player, option);
		case 45://Toggle run
			if (OptionButton.ONE.equals(option)) {
				int currentStatus = player.getVars().getVarValueInt(VarKey.Player.RUN_STATUS);
				if (currentStatus == 1) {
					player.getVars().setVarValueInt(VarKey.Player.RUN_STATUS, 0);
					player.getMovement().setRunning(false);
				} else {
					player.getVars().setVarValueInt(VarKey.Player.RUN_STATUS, 1);
					player.getMovement().setRunning(true);
				}
				return true;
			}
			if (OptionButton.TWO.equals(option)) {
				player.runAnimation(5713);
				return true;
			}
			break;
		case 43://World map
			player.getVars().setVarValueInt(3926, 0);
			player.getVars().setVarValueInt(3928, -1);
			player.getVars().setVarValueInt(3929, -1);
			player.getWidgets().openWidget(1477, 478, 669, true);//438
			player.getDispatcher().sendVarc(3838, 0);
			player.getDispatcher().sendVarc(3840, 0);
			player.getDispatcher().sendHideWidget(1477, 17, true);
			player.getDispatcher().sendHideWidget(1477, 18, true);
			player.getDispatcher().sendHideWidget(1477, 19, true);
			player.getDispatcher().sendHideWidget(1477, 488, true);//734
			player.getDispatcher().sendHideWidget(1477, 374, true);//350
			player.getDispatcher().sendVarc(622, player.getCurrentTile().getTileHash());
			player.getDispatcher().sendVarc(674, player.getCurrentTile().getTileHash());
			player.getWidgets().openWidget(1477, 12, 1421, true);
			player.getWidgets().openWidget(1477, 13, 1422, false);
			player.getWidgets().openWidget(1422, 107, 698, true);
			/*player.getDispatcher().sendWidgetSettings(1422, 38, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 39, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 40, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 41, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 42, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 43, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 44, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 45, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 46, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 47, 2, 2, 2);
			player.getVars().setVarp(622, player.getCurrentTile().getTileHash());
			player.getDispatcher().sendWidgetSettings(1422, 86, 0, 19, 2);
			player.getDispatcher().sendHideWidget(1422, 49, true);
			player.getDispatcher().sendVarc(4197, -1);
			player.getVars().setVarp(674, player.getCurrentTile().getTileHash());*/
			return true;
		case 56://Open lodestone interface
			player.getWidgets().openCentralWidget(1092, false);
			return true;
		case 37:
			player.getVars().setVarValueInt(3708, 137110532);
			player.getVars().setVarValueInt(3708, 137110532);
			player.getVars().setVarValueInt(4719, -1);
			player.getVars().setVarValueInt(4722, -1);
			player.getVars().setVarValueInt(4723, -1);
			player.getVars().setVarValueInt(4724, -1);
			player.getVars().setVarValueInt(4725, -1);
			player.getVars().setVarValueInt(4726, -1);
			player.getVars().setVarValueInt(4727, -1);
			player.getVars().setVarValueInt(4728, -1);
			player.getVars().setVarValueInt(4729, -1);
			player.getVars().setVarValueInt(4730, -1);
			player.getVars().setVarValueInt(4731, -1);
			player.getVars().setVarValueInt(4732, -1);
			player.getVars().setVarValueInt(4733, -1);
			player.getVars().setVarValueInt(4697, 3);
			player.getVars().setVarValueInt(4698, 84);
			player.getVars().setVarValueInt(4721, 3);
			player.getVars().setVarValueInt(4722, 4);
			player.getVars().setVarValueInt(4723, 6);
			player.getVars().setVarValueInt(4725, 3);
			player.getVars().setVarValueInt(4726, 0);
			player.getVars().setVarValueInt(4720, -1);
			player.getDispatcher().sendHideWidget(1477, 377, false);
			player.getDispatcher().sendWidgetEvents(1477, 376, 0, 24, 2);
			player.getDispatcher().sendWidgetEvents(1477, 379, 1, 1, 2);
			player.getDispatcher().sendWidgetEvents(1477, 378, 1, 1, 2);
			player.getDispatcher().sendVarc(2911, 4);
			player.getDispatcher().sendHideWidget(1448, 3, false);
			player.getWidgets().openWidget(1448, 3, 1524, true);
			player.getDispatcher().sendHideWidget(1448, 3, false);
			player.getDispatcher().sendHideWidget(1448, 4, true);
			player.getDispatcher().sendWidgetEvents(1524, 24, 0, 6, 2);
			player.getDispatcher().sendWidgetEvents(1524, 26, 0, 39, 2);
			player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
			player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
			player.getDispatcher().sendWidgetEvents(1524, 29, 0, 137, 2359296);
			player.getDispatcher().sendWidgetEvents(1524, 66, 0, 137, 2);
			player.getDispatcher().sendHideWidget(1448, 5, false);
			player.getWidgets().openWidget(1448, 5, 1528, true);
			player.getDispatcher().sendHideWidget(1448, 5, false);
			player.getDispatcher().sendHideWidget(1448, 6, true);
			player.getDispatcher().sendHideWidget(1448, 7, true);
			player.getDispatcher().sendHideWidget(1448, 8, true);
			player.getDispatcher().sendHideWidget(1448, 9, true);
			player.getDispatcher().sendHideWidget(1448, 10, true);
			player.getDispatcher().sendHideWidget(1448, 11, true);
			player.getDispatcher().sendHideWidget(1448, 12, true);
			player.getDispatcher().sendHideWidget(1448, 1, true);
			player.getVars().setVarValueInt(4695, 0);
			player.getVars().setVarValueInt(4699, 0);
			break;
		}
		return false;
	}
	
	private boolean handleMoneyPouch (Player player, OptionButton option) {
		if (OptionButton.ONE.equals(option)) {//Toggle money pouch
			boolean wasOpen = player.getVars().getVarBitValue(VarKey.Bit.MONEY_POUCH_OPEN) == 1;
			player.getVars().setVarBitValue(VarKey.Bit.MONEY_POUCH_OPEN, wasOpen ? 0 : 1);
			return true;
		} else if (OptionButton.TWO.equals(option)) {//Open Price Checker
			player.getWidgets().openCentralWidget(206, false);
			return true;
		} else if (OptionButton.THREE.equals(option)) {//Examine money pouch
			int currentCoins = player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).getAmount();
			String formattedAmount = NumberFormat.getInstance().format(currentCoins);
			player.getDispatcher().sendMessage("Your money pouch contains "+formattedAmount +" coins.", ChannelType.GAME);
			return true;
		} else if (OptionButton.FOUR.equals(option)) {//Withdraw money pouch
			player.getMoneyPouch().removeMoneyPouchCoins();
			return true;
		} else if (OptionButton.FIVE.equals(option)) {//Wealth evaluator
			//player.getDispatcher().sendHideWidget(566, 84, false);
			player.getWidgets().openWidget(1477, 380, 566, false);
			return false;
		} else if (OptionButton.SIX.equals(option)) {//Bond pouch
			return false;
		} else {
			return false;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#getStates()
	 */
	@Override
	public int[] getStates() {
		return new int[] { WidgetState.MINIMAP_WIDGET.getID() };
	}
}
