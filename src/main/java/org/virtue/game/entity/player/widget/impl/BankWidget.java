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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.inv.Inventory;
import org.virtue.game.entity.player.var.VarKey;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 18, 2014
 */
public class BankWidget extends Widget {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(BankWidget.class);
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#open(int, int, int, boolean, org.virtue.game.entity.player.Player)
	 */
	@Override
	public void open (int parentId, int parentSlot, int widgetId, boolean clickThrough, Player player) {
		super.open(parentId, parentSlot, widgetId, clickThrough, player);
		player.getInvs().loadContainer(ContainerState.BANK);
		player.getInvs().getContainer(ContainerState.BANK).shift(true);//Clean the bank of null or zero items
		validateTabs(player);//Make sure all tab counts are valid 
		player.getVars().setVarValueInt(VarKey.Player.BANK_DEPOSIT_AMOUNT, player.getVars().getVarValueInt(VarKey.Player.BANK_WITHDRAW_AMOUNT));
		player.getInvs().sendContainer(ContainerState.BANK);
		player.getDispatcher().sendVarc(VarKey.Client.BANK_TOTAL_SLOTS, player.getInvs().getContainer(ContainerState.BANK).getUsedSlots());
		player.getDispatcher().sendVarc(VarKey.Client.BANK_FREE_SLOTS, 0);//At this stage, we're not distinguishing between f2p and p2p items
		player.getDispatcher().sendVarc(1324, 3);//Email registration status (this gives more f2p bank slots)
		player.getDispatcher().sendCS2Script(8862, 0, 2);
		player.getDispatcher().sendCS2Script(8862, 0, 3);
		player.getDispatcher().sendWidgetEvents(762, 136, 0, 18, 15302654);
		player.getDispatcher().sendWidgetEvents(762, 10, 0, 27, 14682110);
		player.getDispatcher().sendWidgetEvents(762, 243, 0, 1121, 11011582);
		player.getDispatcher().sendWidgetEvents(762, 300, 0, 1121, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 281, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 282, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 283, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 284, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 285, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 286, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 287, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 288, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 289, 0, 1, 2097152);
		player.getDispatcher().sendWidgetEvents(762, 290, 0, 1, 2097152);
		player.getDispatcher().sendVarc(95, 0);//Clear the "Eat" option...
	}
	
	/**
	 * Makes sure each tab fits into the bank correctly and that there are no "gaps" of empty tabs
	 * If this method finds any problems, it will push items into tab 1
	 * @param player The player
	 */
	private void validateTabs (Player player) {
		int bankSize = player.getInvs().getContainer(ContainerState.BANK).nextFreeSlot();
		int offset = 0;
		int tabSize;
		boolean zeroTab = false;
		for (int tab=0; tab<=9; tab++) {
			if (zeroTab) {
				setTabSize(player, tab, 0);
				continue;
			}
			tabSize = getTabSize(player, tab);
			if (tabSize == 0) {
				zeroTab = true;
			}
			if ((tabSize+offset) > bankSize) {
				setTabSize(player, tab, (offset+tabSize)-bankSize);
				offset = bankSize;
			} else {
				offset += tabSize;
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#click(int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean click(int widgetId, int componentId, int slot, int itemId, Player player, OptionButton option) {
		int amount = 0;
		Item item;
		switch (componentId) {
		case 331://Close button
			return true;
		case 243://Withdraw
			item = player.getInvs().getContainer(ContainerState.BANK).get(slot);
			if (item == null) {
				//The client inventory must not be synchronised, so let's send it again
				player.getInvs().sendContainer(ContainerState.BANK);
				return false;
			}
			switch (option) {
			case ONE:
				amount = 1;
				break;
			case TWO:
				amount = 5;
				break;
			case THREE:
				amount = 10;
				break;
			case FOUR://Last withdraw amount
				amount = player.getVars().getVarValueInt(VarKey.Player.BANK_WITHDRAW_AMOUNT);
				break;
			case FIVE://Withdraw-X
				depositWithdrawX(player, false, slot, itemId);
				return true;
			case SIX://Withdraw all
				amount = player.getInvs().getContainer(ContainerState.BANK).get(slot).getAmount();
				break;
			case SEVEN://Withdraw all-but-one
				amount = player.getInvs().getContainer(ContainerState.BANK).get(slot).getAmount() - 1;
				break;
			case EIGHT://Bank custom option 1
				return handleCustomOption(player, slot, item, 1, true);
			case TEN://Examine
				item.examine(player);
				player.getDispatcher().sendGameMessage("Item in slot "+slot+", tab "+getTab(player, slot));
				return true;
			default:
				return false;
			}
			if (amount > 0) {
				withdrawItems(player, slot, itemId, amount);
			}
			return true;
		case 10://Deposit
			item = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot);
			if (item == null) {
				//The client inventory must not be synchronised, so let's send it again
				player.getInvs().sendContainer(ContainerState.BACKPACK);
				return false;
			}
			switch (option) {
			case ONE:
				amount = 1;
				break;
			case TWO:
				amount = 5;
				break;
			case THREE:
				amount = 10;
				break;
			case FOUR://Last deposit amount
				amount = player.getVars().getVarValueInt(VarKey.Player.BANK_DEPOSIT_AMOUNT);
				break;
			case FIVE://Deposit-x
				depositWithdrawX(player, true, slot, itemId);
				return true;
			case SIX://Deposit all
				int id = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot).getId();
				amount = player.getInvs().getContainer(ContainerState.BACKPACK).getNumberOf(id);
				break;
			case EIGHT://Bank item option				
				return handleCustomOption(player, slot, item, 1, false);
			case NINE://Bank item option 2
				return handleCustomOption(player, slot, item, 2, false);
			case TEN://Examine
				item.examine(player);
				return true;
			default:
				return false;
			}
			if (amount > 0) {
				depositItems(player, slot, itemId, amount);
			}
			return true;
		case 24://Search
			player.getVars().setVarValueInt(VarKey.Bit.SELECTED_BANK_TAB, 0);
			return false;
		case 64://Switch between note/toggle mode
			boolean note = player.getVars().getVarValueInt(VarKey.Player.BANK_NOTE_WITHDRAW) == 1;
			player.getVars().setVarValueInt(VarKey.Player.BANK_NOTE_WITHDRAW, note ? 0 : 1);
			return true;
		case 91://Deposit all backpack
			depositBackpack(player);
			return true;
		case 99://Deposit all worn
			depositWorn(player);
			return true;
		case 115://Deposit all money pouch
			depositMoneyPouch(player);
			return true;
		case 148://Bank tab 1
			return handleTabAction(player, 1, option);
		case 156://Bank tab 2
			return handleTabAction(player, 2, option);
		case 164://Bank tab 3
			return handleTabAction(player, 3, option);
		case 172://Bank tab 4
			return handleTabAction(player, 4, option);
		case 180://Bank tab 5
			return handleTabAction(player, 5, option);
		case 188://Bank tab 6
			return handleTabAction(player, 6, option);
		case 196://Bank tab 7
			return handleTabAction(player, 7, option);
		case 204://Bank tab 8
			return handleTabAction(player, 8, option);
		case 212://Bank tab 9
			return handleTabAction(player, 9, option);
		case 107://Deposit all familiar
		default:
			logger.info("Unhandled bank click: interface="+widgetId+", component="+componentId+", slot="+slot+", item="+itemId+", option="+option);
			break;
		}
		return false;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#close(int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public void close (int parentID, int parentSlot, Player player) {
		player.getDispatcher().sendCS2Script(8862, 1, 2);
		player.getDispatcher().sendCS2Script(8862, 1, 3);
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#drag(int, int, int, int, int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean drag (int widget1, int component1, int slot1, int itemID1, int widget2, int component2, int slot2, int itemID2, Player player) {
		if (widget1 != widget2 || widget1 != WidgetState.BANK_WIDGET.getID()) {
			return false;
		}
		if (component1 == 243) {//Shifted item in the bank
			Inventory bank = player.getInvs().getContainer(ContainerState.BANK);
			Item item = bank.get(slot1);
			int actualID1 = (item == null) ? -1 : item.getId();
			if (itemID2 == -1) {
				actualID1 = -1;
			}
			if (item == null || actualID1 != itemID2) {
				logger.warn("Item dragged in bank slot "+slot1+" does not exist or is invalid! expectedID="+itemID1+", actualID="+actualID1);
				return false;//Item does not exist
			}
			switch (component2) {
			case 243://Swapped items				
				Item item2 = bank.get(slot2);
				int actualID2 = (item2 == null) ? -1 : item2.getId();
				if (item2 == null || actualID2 != itemID1) {
					logger.warn("Item dragged in bank slot "+slot1+" does not exist or is invalid! expectedID="+itemID2+", actualID="+actualID2);
					return false;//Item does not exist
				}
				bank.set(slot2, item);
				bank.set(slot1, item2);			
				player.getInvs().updateContainer(ContainerState.BANK, slot1, slot2);
				return true;
			case 300://Insert item
				if (slot2 == -1 || slot2 > bank.getFreeSlot()) {
					return false;
				}				
				if (slot1 < slot2) {
					slot2--;
				}
				bank.shiftItem(slot1, slot2);
				incrementTab(player, getTab(player, slot2), 1);
				incrementTab(player, getTab(player, slot1), -1);
				player.getInvs().sendContainer(ContainerState.BANK);
				return true;
			case 281://Last position in tab 1
			case 148://Dragged to tab 1
				bank.shiftItem(slot1, bank.getFreeSlot()-1);
				player.getInvs().sendContainer(ContainerState.BANK);
				incrementTab(player, getTab(player, slot1), -1);
				return true;
			case 282://Last position in tab 2
			case 156://Dragged to tab 2
				moveToTab(player, slot1, 2);
				return true;
			case 283://Last position in tab 3
			case 164://Dragged to tab 3
				moveToTab(player, slot1, 3);
				return true;
			case 284://Last position in tab 4
			case 172://Dragged to tab 4
				moveToTab(player, slot1, 4);
				return true;
			case 285://Last position in tab 5
			case 180://Dragged to tab 5
				moveToTab(player, slot1, 5);
				return true;
			case 286://Last position in tab 6
			case 188://Dragged to tab 6
				moveToTab(player, slot1, 6);
				return true;
			case 287://Last position in tab 7
			case 196://Dragged to tab 7
				moveToTab(player, slot1, 7);
				return true;
			case 288://Last position in tab 8
			case 204://Dragged to tab 8
				moveToTab(player, slot1, 8);
				return true;
			case 289://Last position in tab 9
			case 212://Dragged to tab 9
				moveToTab(player, slot1, 9);
				return true;
			default:
				return false;
			}
		}
		return false;
	}
	
	private boolean handleTabAction (Player player, int tab, OptionButton option) {
		if (OptionButton.ONE.equals(option)) {
			player.getVars().setVarBitValue(VarKey.Bit.SELECTED_BANK_TAB, tab);
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Shifts an item in the provided slot to the specified tab.
	 * @param player The player
	 * @param fromSlot The slot holding the item to move
	 * @param desiredTab The tab to move to
	 */
	private void moveToTab (Player player, int fromSlot, int desiredTab) {
		int toSlot = 0;
		int fromTab = getTab(player, fromSlot);
		for (int tab = 2; tab <= desiredTab; tab++) {
			toSlot += getTabSize(player, tab);
		}
		player.getInvs().getContainer(ContainerState.BANK).shiftItem(fromSlot, toSlot);
		player.getInvs().sendContainer(ContainerState.BANK);
		incrementTab(player, fromTab, -1);
		incrementTab(player, desiredTab, 1);
	}
	
	/**
	 * Finds the tab holding the item in the provided slot
	 * @param player The player
	 * @param itemSlot The slot of the item
	 * @return The tab number (1 for the default tab)
	 */
	private int getTab (Player player, int itemSlot) {
		int slot = 0;
		for (int tab = 2; tab <= 9; tab++) {
			slot += getTabSize(player, tab);
			if (slot > itemSlot) {
				return tab;
			}
		}
		return 1;
	}
	
	private int getTabSize (Player player, int tab) {
		switch (tab) {
		case 2:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_2);
		case 3:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_3);
		case 4:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_4);
		case 5:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_5);
		case 6:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_6);
		case 7:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_7);
		case 8:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_8);
		case 9:
			return player.getVars().getVarBitValue(VarKey.Bit.BANK_TAB_9);
		default:
			return 0;
		}
	}
	
	private void setTabSize (Player player, int tab, int size) {
		switch (tab) {
		case 2:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_2, size);
			return;
		case 3:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_3, size);
			return;
		case 4:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_4, size);
			return;
		case 5:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_5, size);
			return;
		case 6:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_6, size);
			return;
		case 7:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_7, size);
			return;
		case 8:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_8, size);
			return;
		case 9:
			player.getVars().setVarBitValue(VarKey.Bit.BANK_TAB_9, size);
			return;
		}
	}
	
	private void incrementTab (Player player, int tab, int amount) {
		if (tab == 1) {
			return;//Don't need to do anything for tab 1
		}
		if (amount < 0 && getTabSize(player, tab) == 1) {
			int tabSize;//If the tab is now empty, drop each tab higher than it by one
			for (int t = tab; t <= 9; t++) {
				tabSize = getTabSize(player, t+1);
				setTabSize(player, t, tabSize);
				if (tabSize == 0) {
					break;
				}
			}				
			player.getVars().setVarBitValue(VarKey.Bit.SELECTED_BANK_TAB, 1);
			return;
		}
		switch (tab) {
		case 2:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_2, amount);
			return;
		case 3:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_3, amount);
			return;
		case 4:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_4, amount);
			return;
		case 5:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_5, amount);
			return;
		case 6:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_6, amount);
			return;
		case 7:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_7, amount);
			return;
		case 8:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_8, amount);
			return;
		case 9:
			player.getVars().incrementVarBit(VarKey.Bit.BANK_TAB_9, amount);
			return;
		}
	}
	
	private boolean handleCustomOption (Player player, int slot, Item item, int option, boolean bank) {
		ScriptEventType eventType = null;
		if (option == 1) {
			eventType = ScriptEventType.OPBANK1;
		} else if (option == 2) {
			eventType = ScriptEventType.OPBANK2;
		}
		
		if (eventType == null) {
			return false;
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(eventType, item.getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("item", item);
			args.put("slot", slot);
			args.put("isBank", bank);
			scripts.invokeScriptChecked(eventType, item.getId(), args);
		} else if (player.getEquipment().isEquipable(item)) {
			
			if(Constants.legacyOnly) {
				if(item.getName().contains("Off-hand")) {
					player.getDispatcher().sendGameMessage("You cannot equip this item. Pre-EOC style is enabled.");
					return false;
				}
			}
			
			if (player.getEquipment().meetsEquipRequirements(item)) {
				return player.getEquipment().wearItem(slot);
			} else {
				return true;//Prevent the debug message from showing anyways
			}
			
		} else {
			player.getDispatcher().sendGameMessage("Unhanded bank item option: item="+item+", slot="+slot+", option="+option);
		}		
		return true;
	}
	
	private void depositWithdrawX (final Player player, final boolean deposit, final int slot, final int itemID) {
		player.getDialogs().requestInteger("Enter amount: ", new InputEnteredHandler () {
			@Override
			public void handle(Object value) {
				int amount = (Integer) value;
				player.getVars().setVarValueInt(VarKey.Player.BANK_WITHDRAW_AMOUNT, amount);
				player.getVars().setVarValueInt(VarKey.Player.BANK_DEPOSIT_AMOUNT, amount);
				if (amount > 0) {
					if (deposit) {
						depositItems(player, slot, itemID, amount);
					} else {
						withdrawItems(player, slot, itemID, amount);
					}
				}
			}			
		});
	}
	
	/**
	 * Moves the specified item from the player's bank to their backpack
	 * @param player The player
	 * @param slot The bank slot that the item is located in
	 * @param itemID The expected ID of the item (note that this no longer works correctly)
	 * @param amount The amount to withdraw
	 * @return True if the item was moved successfully, false otherwise
	 */
	private boolean withdrawItems (Player player, int slot, int itemID, int amount) {
		//System.out.println("Withdrawing item: amount="+amount+", item="+itemID+", slot="+slot);
		Inventory backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
		Item item = player.getInvs().getContainer(ContainerState.BANK).get(slot);
		if (item == null) {
			player.getInvs().sendContainer(ContainerState.BACKPACK);
			return false;//Something is wrong, as there should be an item in the slot with the same ID
		}
		amount = Math.min(amount, item.getAmount());
		int newItemID = item.getId();
		if (player.getVars().getVarValueInt(VarKey.Player.BANK_NOTE_WITHDRAW) == 1) {
			if (item.getType().certlink != -1) {
				newItemID = item.getType().certlink;
			}
		}
		int requiredSlots = amount;
		if (ObjTypeList.getInstance().list(newItemID).isStackable()) {
			requiredSlots = backpack.containsOne(item.getId()) ? 0 : 1;
		}
		if (backpack.getFreeSlots() < requiredSlots) {
			amount = backpack.getFreeSlots();
		}
		if (amount < 1) {
			//System.out.println("Amount less than one! amount="+amount);
			return false;
		}
		int maxAmount = Integer.MAX_VALUE - backpack.getNumberOf(newItemID);
		if (amount > maxAmount) {
			amount = maxAmount;
		}
		Item backpackItem = Item.create(newItemID, amount);
		item.setAmount(item.getAmount() - amount);
		//System.out.println("Bank="+item+", backpack="+backpackItem+", stackable="+item.getType().isStackable());
		if (item.getAmount() < 1) {
			player.getInvs().getContainer(ContainerState.BANK).clearSlot(slot);
			player.getInvs().getContainer(ContainerState.BANK).shift(true);
			int itemTab = getTab(player, slot);
			incrementTab(player, itemTab, -1);

			player.getInvs().sendContainer(ContainerState.BANK);//Easier just to send a full update, rather than picking out the slots updated
			player.getDispatcher().sendVarc(VarKey.Client.BANK_TOTAL_SLOTS, player.getInvs().getContainer(ContainerState.BANK).getUsedSlots());
		} else {
			//System.out.println("Bank="+player.getInvs().getContainer(ContainerState.BANK));
			player.getInvs().updateContainer(ContainerState.BANK, slot);
		}
		int[] slots = backpack.add(backpackItem);
		player.getInvs().updateContainer(ContainerState.BACKPACK, slots);
		return true;
		//System.out.println("Slots="+Arrays.toString(slots)+", backpack"+player.getInvs().getContainer(ContainerState.BACKPACK));
	}
	
	/**
	 * Moves the specified item from the player's backpack to their bank
	 * @param player The player
	 * @param slot The backpack slot that the item is located in
	 * @param itemID The expected ID of the item (note that this no longer works correctly)
	 * @param amount The amount to deposit
	 * @return True if the item was moved successfully, false otherwise
	 */
	private boolean depositItems (Player player, int slot, int itemID, int amount) {
		Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot);
		if (item == null) {
			// || (itemID != -1 && item.getID() != itemID)
			System.out.println("Items do not match: expected="+itemID+", found="+item);
			return false;//Something is wrong, as there should be an item in the slot with the same ID
		}
		int maxAmount = Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(item.getId());
		if (amount > maxAmount) {
			amount = maxAmount;
		}
		amount = player.getInvs().getContainer(ContainerState.BACKPACK).remove(Item.create(item.getId(), amount));
		if (amount < 1) {
			System.out.println("Amount less than one! amount="+amount+", slot="+slot+", item="+item);
			return false;
		}
		itemID = item.getType().certtemplate == -1 ? item.getId() : item.getType().certlink;
		player.getInvs().sendContainer(ContainerState.BACKPACK);
		return depositItem(player, Item.create(itemID, amount));
	}
	
	private boolean depositItem (Player player, Item item) {
		boolean contains = player.getInvs().getContainer(ContainerState.BANK).containsOne(item.getId());
		if (!canDeposit(player, item)) {
			player.getDispatcher().sendGameMessage("Full bank!");
			return false;//Full bank
		}
		
		if (contains) {
			int[] slots = player.getInvs().getContainer(ContainerState.BANK).add(item);
			player.getInvs().updateContainer(ContainerState.BANK, slots);	
		} else {
			int slot = 0;
			int selectedTab = player.getVars().getVarBitValue(VarKey.Bit.SELECTED_BANK_TAB);
			if (selectedTab == 1) {
				slot = player.getInvs().getContainer(ContainerState.BANK).nextFreeSlot();
			} else {
				for (int tab = 2; tab <= selectedTab; tab++) {
					slot += getTabSize(player, tab);
				}
				incrementTab(player, selectedTab, 1);
			}
			player.getInvs().getContainer(ContainerState.BANK).insert(item, slot);
			player.getInvs().sendContainer(ContainerState.BANK);
			player.getDispatcher().sendVarc(VarKey.Client.BANK_TOTAL_SLOTS, player.getInvs().getContainer(ContainerState.BANK).getUsedSlots());
		}
		return true;
	}
	
	private void depositBackpack (Player player) {
		int capacity = player.getInvs().getContainer(ContainerState.BACKPACK).getSize();
		for (int slot = 0; slot < capacity; slot++) {
			Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(slot);
			if (item != null) {
				if (!canDeposit(player, item)) {
					player.getDispatcher().sendGameMessage("Full bank!");
					break;//Full bank
				}
				if (item.getAmount() > (Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(item.getId()))) {
					int amount = Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(item.getId());
					if (amount > 0) {
						item.setAmount(item.getAmount() - amount);
						depositItem(player, Item.create(item.getId(), amount));
					}
				} else {
					player.getInvs().getContainer(ContainerState.BACKPACK).clearSlot(slot);
					depositItem(player, item);
				}
			}
		}
		player.getInvs().sendContainer(ContainerState.BACKPACK);
	}
	
	private void depositWorn (Player player) {
		int capacity = player.getInvs().getContainer(ContainerState.EQUIPMENT).getSize();
		for (int slot = 0; slot < capacity; slot++) {
			Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slot);
			if (item != null) {
				if (!canDeposit(player, item)) {
					player.getDispatcher().sendGameMessage("Full bank!");
					break;//Full bank
				}
				if (item.getAmount() > (Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(item.getId()))) {
					int amount = Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(item.getId());
					if (amount > 0) {
						item.setAmount(item.getAmount() - amount);
						depositItem(player, Item.create(item.getId(), amount));
					}
				} else {
					player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(slot);
					depositItem(player, item);
				}
			}
		}
		player.getInvs().sendContainer(ContainerState.EQUIPMENT);
		player.getModel().refresh();
	}
	
	private void depositMoneyPouch (Player player) {
		int amount = player.getMoneyPouch().getCoins();
		if (amount > (Integer.MAX_VALUE - player.getInvs().getContainer(ContainerState.BANK).getNumberOf(995))) {
			player.getDispatcher().sendGameMessage("You don't have space in your bank to do that.");
			return;
		}
		Item money = Item.create(995, amount);
		if (!canDeposit(player, money)) {
			player.getDispatcher().sendGameMessage("You don't have space in your bank to do that.");
			return;
		}
		player.getMoneyPouch().removeCoins(amount);
		depositItem(player, money);
	}
	
	private boolean canDeposit (Player player, Item item) {		
		return player.getInvs().getContainer(ContainerState.BANK).freeSlots() > 0;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#getPossibleIds()
	 */
	@Override
	public int[] getStates() {		
		return new int[] { WidgetState.BANK_WIDGET.getID() };
	}

}
