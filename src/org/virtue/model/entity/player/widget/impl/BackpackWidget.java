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

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.dialog.InputEnteredHandler;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.var.VarKey;
import org.virtue.model.entity.player.widget.Widget;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.model.entity.region.GroundItem;
import org.virtue.model.entity.region.Region;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.script.JSListeners;
import org.virtue.script.ScriptEventType;
import org.virtue.script.listeners.ItemListener;
import org.virtue.utility.TimeUtility;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
public class BackpackWidget extends Widget {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(BackpackWidget.class);
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#open(int, int, int, boolean, org.virtue.model.entity.player.Player)
	 */
	@Override
	public void open (int parentId, int parentSlot, int widgetId, boolean clickThrough, Player player) {
		super.open(parentId, parentSlot, widgetId, clickThrough, player);
		player.getWidgets().openWidget(762, 112, 1463, true);
		player.getDispatcher().sendWidgetSettings(1473, 34, -1, -1, 2097152);
		player.getDispatcher().sendWidgetSettings(1473, 34, 0, 27, 15302030);
		player.getInvs().loadContainer(ContainerState.BACKPACK);
		player.getInvs().sendContainer(ContainerState.BACKPACK);
		player.getInvs().loadContainer(ContainerState.MONEY_POUCH);
		player.getInvs().sendContainer(ContainerState.MONEY_POUCH);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#click(int, int, int, int, org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean click(int widgetId, int componentId, int slotId, int itemId, Player player, OptionButton option) {
		switch (componentId) {
		case 34:
			Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(slotId);
			if (item == null || item.getId() != itemId) {
				if (item != null) {
					logger.warn("Item mismatch: Received id = "+itemId+" but actual item at slot has id = "+item.getId());
				}
				player.getInvs().sendContainer(ContainerState.BACKPACK);//Resend the backpack to update it
				return true;
			}			
			handleItemInteraction(player, option, item, slotId);
			return true;
		case 57:
			if (OptionButton.TWO.equals(option)) {//Open Price Checker
				player.getWidgets().openCentralWidget(206, false);
				return true;
			} else if (OptionButton.THREE.equals(option)) {//Examine
				int currentCoins = player.getInvs().getContainer(ContainerState.MONEY_POUCH).get(0).getAmount();
				player.getDispatcher().sendMessage("Your money pouch contains "+StringUtility.formatNumber(currentCoins) +" coins.", ChannelType.GAME);
				return true;
			} else if (OptionButton.FOUR.equals(option)) {//Withdraw
				player.getMoneyPouch().removeMoneyPouchCoins();
				return true;
			}
		default:
			return false;
		}
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#drag(int, int, int, int, int, int, int, int, org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean drag (int widget1, int component1, int slot1, int itemID1, int widget2, int component2, int slot2, int itemID2, Player player) {
		if (widget1 == widget2 && widget1 == WidgetState.BACKPACK_WIDGET.getID()
				&& component1 == component2 && component1 == 34) {
			if (slot1 >= 0 && slot1 < 28 && slot2 >= 0 && slot2 < 28) {
				Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot1);
				Item item2 = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot2);
				int actualID1 = (item == null) ? -1 : item.getId();
				int actualID2 = (item2 == null) ? -1 : item2.getId();
				if (actualID1 != itemID2 || actualID2 != itemID1) {//Since the client version has already changed, the order is reversed
					System.out.println("Client backpack out of sync: expected1="+itemID2+", actual1="+actualID1+", expected2="+itemID1+", actual2="+actualID2);
					player.getInvs().sendContainer(ContainerState.BACKPACK);//Client backpack is out of sync; resynchronise it
				} else {
					player.getInvs().getContainer(ContainerState.BACKPACK).set(slot2, item);
					player.getInvs().getContainer(ContainerState.BACKPACK).set(slot1, item2);			
					player.getInvs().updateContainer(ContainerState.BACKPACK, slot1, slot2);
				}
				return true;
			}
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#getPossibleIds()
	 */
	@Override
	public int[] getStates() {
		return new int[] { WidgetState.BACKPACK_WIDGET.getID() };
	}
	
	private void handleItemInteraction (Player player, OptionButton option, Item item, int slot) {
		if (OptionButton.TEN.equals(option)) {
			item.examine(player);
			return;
		}
		ScriptEventType eventType;
		switch (option) {
		case ONE:
			eventType = ScriptEventType.ITEM_IOP1;
			break;
		case TWO:
			eventType = ScriptEventType.ITEM_IOP2;
			break;
		case THREE:
			eventType = ScriptEventType.ITEM_IOP3;
			break;
		case SEVEN:
			eventType = ScriptEventType.ITEM_IOP4;
			break;
		case EIGHT:
			eventType = ScriptEventType.ITEM_IOP5;
			break;
		default:
			eventType = null;
			break;
		}			
		JSListeners scripts = Virtue.getInstance().getScripts();
		if (eventType != null && scripts.hasBinding(eventType, item.getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("item", item);
			args.put("slot", slot);
			scripts.invokeScriptChecked(eventType, item.getId(), args);
			return;
		}
		
		int optionId = option.getID();
		if (optionId == 7) {
			optionId = 4;
		} else if (optionId == 8) {
			optionId = 5;
		}
		//Option 1 = iop 1
		//Option 2 = iop 2
		//Option 3 = iop 3
		//Option 7 = iop 4
		//Option 8 = iop 5
		//Option 10 = Examine
		
		String text = item.getType().iop[optionId-1];
		
		if (eventType == ScriptEventType.ITEM_IOP2 &&
				("Wield".equalsIgnoreCase(text) || "Wear".equalsIgnoreCase(text))
				&& player.getEquipment().isEquipable(item)) {
			if (!player.getEquipment().meetsEquipRequirements(item)) {
				return;
			}
			if (!player.getEquipment().wearItem(slot)) {
				player.getDispatcher().sendGameMessage("You do not have enough space in your backpack to equip that item.");
			}
			return;
		}		

		if (eventType == ScriptEventType.ITEM_IOP4 && item.getId() == 995) {
			if (player.getMoneyPouch().addCoins(item.getAmount())) {
				player.getInvs().getContainer(ContainerState.BACKPACK).clearSlot(slot);
				player.getInvs().updateContainer(ContainerState.BACKPACK, slot);
			} else {
				player.getDispatcher().sendGameMessage("You do not have enough space in your money pouch.");
			}
			return;
		}
		if (eventType == ScriptEventType.ITEM_IOP5) {
			if ("Drop".equalsIgnoreCase(text)) {
				handleDrop(player, item, slot);
				return;
			} else if ("Destroy".equalsIgnoreCase(text)) {
				handleDestroy(player, item, slot);
				return;
			} else if (item.getType().lenttemplate != -1) {
				handleDiscard(player, item, slot);
				return;
			}
		}
		if (eventType != null) {
			ItemListener listener = scripts.forItemID(item.getId());
			if (listener != null && listener.handleInteraction(player, item, slot, optionId)) {
				return;
			}
		}
		player.getDispatcher().sendGameMessage("Unhanded inventory item option: item="+item+", slot="+slot+", option="+option);
	}
	
	private void handleDrop (Player player, Item item, int slot) {
		//The item you are about to drop has high value.
		//I wish to drop it.
		//I wish to keep it.
		Region region = World.getInstance().getRegions().getRegionByID(player.getCurrentTile().getRegionID());
		if (region != null && region.isLoaded()) {
			GroundItem groundItem = new GroundItem(item, player.getCurrentTile());
			groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
			region.addItem(groundItem);
			player.getInvs().getContainer(ContainerState.BACKPACK).clearSlot(slot);	
			player.getInvs().updateContainer(ContainerState.BACKPACK, slot);
		}
	}
	
	private void handleDestroy (Player player, Item item, int slot) {
		//Are you sure you want to destroy this object?
		//You can get a new one from....
		player.getDispatcher().sendGameMessage("Destroyed item: "+item.getId());
		player.getInvs().getContainer(ContainerState.BACKPACK).clearSlot(slot);	
		player.getInvs().updateContainer(ContainerState.BACKPACK, slot);
	}
	
	private void handleDiscard (final Player player, final Item item, final int slot) {
		InputEnteredHandler handler = new InputEnteredHandler () {
			@Override
			public void handle(Object value) {
				player.getInvs().getContainer(ContainerState.BACKPACK).remove(slot, item);
				player.getEquipment().returnBorrowedItem();
				player.getVars().setVarValueInt(VarKey.Player.LOAN_FROM_PLAYER, -1);	
				player.getVars().setVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING, 0);
			}
		};
		int timeRemaining = player.getVars().getVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING);
		Object loanFrom = player.getVars().getVar(VarKey.Player.LOAN_FROM_PLAYER);
		if (timeRemaining > 0) {
			String message = "<center>~Loan expires in "+TimeUtility.ticksToString(timeRemaining)+"~</center><br>";
			message += "If you discard this item, it will disappear. You won't be able to pick it up again.";
			player.getDialogs().sendMessageBox(message);
			player.getDialogs().setInputHandler(handler);
		} else if (loanFrom != null && loanFrom instanceof Player) {
			Player p = (Player) loanFrom;
			if (p.exists()) {
				String message = "<center>~Session-based loan~</center><br>";
				message += "If you discard this item, it will return to its owner, "+p.getName();
				message += ". You won't be able to pick it up again.";
				player.getDialogs().sendMessageBox(message);
				player.getDialogs().setInputHandler(handler);
			} else {
				handler.handle(0);//Destroy immediately, as the player should not still have the item.
			}
		} else {
			handler.handle(0);//Destroy immediately, as the player should not still have the item.
		}		
	}

}
