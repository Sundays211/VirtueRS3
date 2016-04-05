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
package org.virtue.game.content;

import java.text.NumberFormat;

import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.inv.Inventory;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/10/2014
 */
public class MoneyPouch {
	
	/**
	  * Represents the player for this {@link MoneyPouch}
	  */
	private Player player;
	
	public MoneyPouch(Player player) {
		this.player = player;
	}
	
	/**
	 * Adds the specified number of coins to the player's money pouch
	 * @param amount The number of coins to add
	 * @return True if the coins were added, false if an issue prevented the coins from being added
	 */
	public boolean addCoins(int amount) {
		int currentCoins = getCoins();
		if (amount > (Integer.MAX_VALUE - currentCoins)) {			
			return false;
		}
		player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).setAmount(amount + currentCoins);
		player.getInvs().sendContainer(ContainerState.MONEY_POUCH);
		String formattedAmount = NumberFormat.getInstance().format(amount);
		player.getDispatcher().sendMessage(formattedAmount +" coins have been added to your money pouch.", ChannelType.GAME_SPAM);
		player.getDispatcher().sendCS2Script(5561 , new Object[] { 1, amount });
		player.getDispatcher().sendCS2Script(5560, new Object[] { amount + currentCoins });
		return true;
	}
	
	/**
	 * Removes the specified number of coins from the player's money pouch
	 * @param amount The number of coins to remove
	 * @return True if the coins were removed, false if an issue prevented the coins from being removed
	 */
	public boolean removeCoins (int amount) {
		int currentCoins = getCoins();
		if (amount > currentCoins) {
			player.getDispatcher().sendGameMessage("You do not have enough space in your money pouch.");
			return false;
		}
		player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).setAmount(currentCoins - amount);
		player.getInvs().sendContainer(ContainerState.MONEY_POUCH);
		String formattedAmount = NumberFormat.getInstance().format(amount);
		player.getDispatcher().sendMessage(formattedAmount +" coins have been removed from your money pouch.", ChannelType.GAME_SPAM);
		player.getDispatcher().sendCS2Script(5561 , new Object[] { 0, amount });
		player.getDispatcher().sendCS2Script(5560, new Object[] { currentCoins - amount });
		return true;
	}
	
	public void removeMoneyPouchCoins () {
		if (player.getInvs().getContainer(ContainerState.BACKPACK).freeSlots() < 1) {
			player.getDispatcher().sendGameMessage("You don't have space in your inventory to do that.");
			return;
		}
		final int currentCoins = player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).getAmount();
		String message = "Your money pouch contains "+NumberFormat.getInstance().format(currentCoins)+" coins.";
		message += "<br>How many would you like to withdraw?";
		
		player.getDialogs().requestInteger(message, new InputEnteredHandler () {
			@Override
			public void handle(Object value) {
				int amount = (Integer) value;				
				if (amount > 0) {
					amount = Math.min(amount, currentCoins);
					Inventory backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
					if (backpack.freeSlots() < 1) {
						player.getDispatcher().sendGameMessage("You don't have space in your inventory to do that.");
						return;
					}
					int heldCoins = backpack.getNumberOf(995);
					if (amount > (Integer.MAX_VALUE - heldCoins)) {
						player.getDispatcher().sendGameMessage("You don't have space in your inventory to do that.");
						return;
					}
					Item coins = Item.create(995, amount);
					if (removeCoins(amount)) {
						int[] slots = backpack.add(coins);
						player.getInvs().updateContainer(ContainerState.BACKPACK, slots);
					}
				}
			}			
		});
	}
	
	/**
	 * Returns the amount of coins in the money pouch
	 */ 
	public int getCoins() {
		return player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).getAmount();
	}
}
	