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
package org.virtue.game.entity.player.inv;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;

import org.virtue.Virtue;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.config.inv.InvType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.event.context.impl.out.InvEventContext;
import org.virtue.network.event.encoder.impl.InvEventEncoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 19, 2014
 */
public class InvRepository {
	
	private static final List<Integer> WATERING_CANS = Arrays.asList(new Integer[]{ 5331, 5333, 5334, 5335, 5336, 5337, 5338, 5339, 5340 });
	
	private static InvType[] invTypes;
	
	public static void init (Archive archive, ReferenceTable.Entry invTypeEntry) throws IOException {
		invTypes = new InvType[invTypeEntry.capacity()];
		for (int id=0;id<archive.size();id++) {
			if (invTypeEntry.getEntry(id) == null) {
				continue;
			}
			ByteBuffer entry = archive.getEntry(invTypeEntry.getEntry(id).index());
			if (entry == null) {
				continue;
			}
			invTypes[id] = InvType.decode(entry, id);
		}
	}
	
	public static int getInvCapacity (int invID) {
		if (invID < 0 || invID >= invTypes.length) {
			return 0;
		} else if (invTypes[invID] == null) {
			return 0;
		} else {
			return invTypes[invID].getCapacity();
		}
	}

	private Player player;
	private ItemContainer[] containers;

	public InvRepository(Player player) {
		if (invTypes == null) {
			throw new IllegalStateException("InvType definitions not loaded.");
		}
		this.player = player;
		this.containers = new ItemContainer[invTypes.length];
		
		@SuppressWarnings("unchecked")
		EnumMap<ContainerState, Item[]> saved = (EnumMap<ContainerState, Item[]>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.INV);
		for (ContainerState key : saved.keySet()) {
			try {
				containers[key.getID()] = new ItemContainer(invTypes[key.getID()], key.alwaysStack());
				containers[key.getID()].addItemsAtSlots(saved.get(key));
			} catch (Exception ex) {
				throw new RuntimeException("Error loading item container "+key+": ", ex);
			}
		}
	}
	
	/**
	 * A shortcut method to add the specified item to the player's backpack
	 * @param item The item to add
	 * @return True if the item was added, false otherwise
	 */
	public boolean addBackpackItem (Item item) {
		if (item.getId() == 995) {
			int coinPouchSpace = Integer.MAX_VALUE - player.getMoneyPouch().getCoins();
			if (item.getAmount() > coinPouchSpace) {
				if (!player.getMoneyPouch().addCoins(coinPouchSpace)) {
					return false;
				}
				item.setAmount(item.getAmount()-coinPouchSpace);
			} else if (player.getMoneyPouch().addCoins(item.getAmount())) {
				return true;
			}			
		}
		if (!item.isStackable() && getContainer(ContainerState.BACKPACK).freeSlots() < item.getAmount()) {
			return false;
		}
		int[] slots = getContainer(ContainerState.BACKPACK).add(item);
		if (slots == null) {
			return false;
		}
		updateContainer(ContainerState.BACKPACK, slots);
		return true;
	}
	
	/**
	 * Loads the specified container if it's not already loaded
	 * @param state The type of the container to load
	 * @return The item container.
	 */
	public ItemContainer loadContainer (ContainerState state) {
		int invId = state.getID();
		boolean alwaysStack = state.alwaysStack();
		if (containers[invId] == null) {
			containers[invId] = new ItemContainer(invTypes[invId], alwaysStack);
		}
		return containers[invId];
	}
	
	/**
	 * Loads the specified container if it's not already loaded
	 * @param containerID The ID of the container to load
	 * @param alwaysStack Whether items in the container always stack
	 * @return The item container.
	 */
	public ItemContainer loadContainer (int containerID) {
		ContainerState state = ContainerState.getById(containerID);
		if (state == null)
			throw new IllegalStateException("Could not find container: ["+containerID+"].");
		return loadContainer(state);
	}
	
	/**
	 * Gets the container of the specified ID. If the container is not loaded yet, load it.
	 * @param state The type of the container
	 * @return The container
	 */
	public ItemContainer getContainer (ContainerState state) {
		return getContainer(state.getID());
	}
	
	/**
	 * Gets the container of the specified ID. If the container is not loaded yet, load it.
	 * @param invId The ID of the container inventory
	 * @return The container
	 */
	private ItemContainer getContainer (int invId) {
		if (invId < 0 || invId >= containers.length) {
			return null;
		}
		return containers[invId];
	}
	
	/**
	 * Sends a full update of the container to the player. If the container is not loaded yet, load it.
	 * @param state The type of the container
	 */
	public void sendContainer(ContainerState state) {
		player.getDispatcher().sendEvent(InvEventEncoder.class, new InvEventContext(state.getID(), loadContainer(state).getItems()));
	}
	
	/**
	 * Sends a full container to another player.
	 * @param state The container to send
	 * @param target The player to send the container to
	 */
	public void sendContainerTo(ContainerState state, Player target) {
		target.getDispatcher().sendEvent(InvEventEncoder.class, 
				new InvEventContext(state.getID(), containers[state.getID()].getItems(), true));
	}
	
	/**
	 * Sends a partial update of the container to the player.
	 * @param state The type of the container
	 * @param slots The slots to update
	 * @throws IllegalStateException If the container is not loaded
	 */
	public void updateContainer (ContainerState state, int... slots) throws IllegalStateException {
		int containerID = state.getID();
		if (containers[containerID] == null) {
			throw new IllegalStateException("Container not loaded.");
		}
		if (state == ContainerState.BACKPACK || state == ContainerState.EQUIPMENT) {
			player.updateWeight();
		}
		//System.out.println("Updating container "+containerID+": "+Arrays.toString(containers[containerID].getItems()));
		player.getDispatcher().sendEvent(InvEventEncoder.class, new InvEventContext(containerID, containers[containerID].getItems(), slots));
	}
	
	public boolean containerReady (ContainerState state) {
		loadContainer(state);
		return containers[state.getID()] != null;
	}
	
	public void unloadContainer (ContainerState state) {
		
	}
	
	/**
	 * Gets the number of the specified item which are carried. This method checks money pouch, backpack, equipment, etc
	 * @param itemID The item ID to check
	 * @return The number carried, or -1 if an infinite amount is carried.
	 */
	public int getAmountCarried (int itemID) {
		ItemContainer backpack = getContainer(ContainerState.BACKPACK);
		switch (itemID) {
		case 5333:
		case 5335:
		case 5334:
		case 5331:
		case 5340:
		case 5337:
		case 5336:
		case 5339:
		case 5338://Watering can
			if (backpack.getNumberOf(18682) > 0) {
				return -1;
			} else {
				return (backpack.getNumberOf(5340) * 8 + backpack.getNumberOf(5339) * 7 
						+ backpack.getNumberOf(5338) * 6 + backpack.getNumberOf(5337) * 5
						+ backpack.getNumberOf(5336) * 4 + backpack.getNumberOf(5335) * 3
						+ backpack.getNumberOf(5334) * 2 + backpack.getNumberOf(5333));
			}
		case 995://Money pouch
			int amount = backpack.getNumberOf(995);
			if (player.getMoneyPouch().getCoins() > Integer.MAX_VALUE - amount) {
				return Integer.MAX_VALUE;
			} else {
				return player.getMoneyPouch().getCoins() + amount;
			}
		default:
			return backpack.getNumberOf(itemID);
		}
	}
	
	public int removeCarriedItems (int itemID, int amount, int... preferedSlots) {
		ItemContainer backpack = getContainer(ContainerState.BACKPACK);
		int totalRemoved = 0;
		switch (itemID) {
		case 5333:
		case 5335:
		case 5334:
		case 5331:
		case 5340:
		case 5337:
		case 5336:
		case 5339:
		case 5338://Watering can
			if (backpack.getNumberOf(18682) > 0) {
				return Integer.MAX_VALUE;
			}
			for (int slot = 0; slot < backpack.getSize(); slot++) {
				Item item = backpack.get(slot);
				if (item == null) {
					continue;
				}
				int canAmount = WATERING_CANS.indexOf(item.getId());
				if (canAmount == -1) {
					continue;
				}
				int removed = Math.min(canAmount, amount);
				backpack.set(slot, Item.create(WATERING_CANS.get(canAmount-removed), 1));
				totalRemoved += removed;
				amount -= removed;
				if (amount < 1) {
					break;
				}
			}
			sendContainer(ContainerState.BACKPACK);
			return totalRemoved;
		case 995:
			int coinPouchAmount = player.getMoneyPouch().getCoins();
			if (amount > coinPouchAmount) {
				player.getMoneyPouch().removeCoins(coinPouchAmount);
				amount -= coinPouchAmount;
				totalRemoved = coinPouchAmount;
			} else if (player.getMoneyPouch().removeCoins(amount)) {
				return amount;
			}
		}
		for (int slot : preferedSlots) {
			if (backpack.get(slot) != null && backpack.get(slot).getId() == itemID) {
				int removed = backpack.remove(slot, Item.create(itemID, amount));
				amount -= removed;
				totalRemoved += removed;
			}
		}
		totalRemoved += backpack.remove(0, Item.create(itemID, amount));
		sendContainer(ContainerState.BACKPACK);
		return totalRemoved;
	}
}
