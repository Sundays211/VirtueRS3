package org.virtue.game.entity.player.inv;

import java.util.Arrays;

import org.virtue.config.invtype.InvType;

/**
 * Container class.
 * 
 * @author Graham / edited by Dragonkk(Alex)
 */
public final class Inventory {

	private Item[] data;
	private boolean alwaysStackable = false;
	
	private InvType invType;
	
	/**
	 * Constructs a new {@link Inventory}, based on a cache definition
	 * @param invType The cache definition for this container
	 */
	protected Inventory (InvType invType) {
		this(invType, true);
	}
	
	/**
	 * Constructs a new {@link Inventory}, based on a cache definition
	 * @param invType The cache definition for this container
	 * @param alwaysStackable Whether items in this bank will always stack
	 */
	protected Inventory (InvType invType, boolean alwaysStackable) {
		this.invType = invType;
		
		data = new Item[invType.getCapacity()];
		if (invType.stockCount > 0) {
			for (int slot=0;slot<invType.stockCount;slot++) {
				data[slot] = Item.create(invType.stockObjects[slot], invType.stockCounts[slot]);
			}
		}
		this.alwaysStackable = alwaysStackable;
	}
	
	public void addItemsAtSlots (Item[] items) {
		for (int slot = 0; slot < data.length;slot++) {
			if(slot < items.length)
				data[slot] = items[slot];
		}
	}

	/**
	 * 
	 * @param cleanEmpty If true, items with an amount of zero will be removed as well
	 */
	public void shift(boolean cleanEmpty) {
		Item[] oldData = data;
		data = new Item[oldData.length];
		int ptr = 0;
		for (int i = 0; i < data.length; i++) {
			if (oldData[i] != null && (!cleanEmpty || oldData[i].getAmount() != 0)) {
				data[ptr++] = oldData[i];
			}
		}
	}
	
	public Item get(int slot) {
		if (slot < 0 || slot >= data.length) {
			return null;
		}
		return data[slot];
	}

	public void set(int slot, Item item) {
		if (slot < 0 || slot >= data.length) {
			return;
		}
		if (item == null && slot < invType.stockCount && invType.stockObjects[slot] >= 0) {
			data[slot] = Item.create(invType.stockObjects[slot], 0);
		} else {
			data[slot] = item;
		}
	}

	public boolean forceAdd(Item item) {
		for (int i = 0; i < data.length; i++) {
			if (data[i] == null) {
				data[i] = item;
				return true;
			}
		}
		return false;
	}

	/**
	 * Adds the specified item to the next free slot in the container
	 * @param item The item to add
	 * @return the slots the item was added to, or null if it could not be added.
	 * @throws ArithmeticException If the item joins a stack of other items where the total amount exceeds {@link Integer.MAX_VALUE}
	 */
	public int[] add(Item item) throws ArithmeticException {
		if (alwaysStackable || item.isStackable()) {
			for (int i = 0; i < data.length; i++) {
				if (data[i] != null) {
					if (data[i].getId() == item.getId()) {
						if (((long) data[i].getAmount()) + ((long) item.getAmount()) > Integer.MAX_VALUE) {
							throw new ArithmeticException("Amount for item "+data[i].getId()+" excedes the maximum Integer value.");
						}
						data[i] = Item.create(data[i].getId(), data[i].getAmount() + item.getAmount());
						return new int[] { i };
					}
				}
			}
		} else {
			if (item.getAmount() > 1) {
				if (freeSlots() >= item.getAmount()) {
					int[] slots = new int[item.getAmount()];
					for (int i = 0; i < item.getAmount(); i++) {
						int index = nextFreeSlot();
						slots[i] = index;
						data[index] = Item.create(item.getId(), 1);
					}
					return slots;
				} else {
					return null;
				}
			}
		}
		int index = nextFreeSlot();
		if (index == -1) {
			return null;
		}
		data[index] = item;
		return new int[] { index };
	}
	
	public boolean insert (Item item, int inSlot) {
		if (data[inSlot] == null) {
			data[inSlot] = item;
			return true;
		}
		int nextFreeSlot = -1;
		for (int i=inSlot;i<data.length;i++) {
			if (data[i] == null) {
				nextFreeSlot = i;
				break;
			}
		}
		if (nextFreeSlot == -1) {
			return false;
		} else {
			Item oldItem;
			for (int slot=inSlot+1; slot<nextFreeSlot; slot++) {
				oldItem = data[slot+1];
				data[slot+1] = data[slot];
				data[slot] = oldItem;
			}
			data[inSlot] = item;
			return true;
		}
	}
	
	/**
	 * Inserts an existing item by moving it from the specified slot to the specified slot, moving all items between
	 * @param from The original slot of the item
	 * @param to The new slot for the item
	 */
	public void shiftItem (int from, int to) {	
		Item oldItem;
		if (from < to) {
			for (int slot=from; slot<to; slot++) {
				oldItem = data[slot+1];
				data[slot+1] = data[slot];
				data[slot] = oldItem;
			}
		} else {
			for (int slot=from; slot>to; slot--) {
				oldItem = data[slot-1];
				data[slot-1] = data[slot];
				data[slot] = oldItem;
			}
		}
	}
	
	/**
	 * Removes and returns the item currently in the specified slot, and replaces it with the specified item
	 * @param item The item to add/replace
	 * @param slot The slot to add/replace on
	 * @return The item previously in the slot, or null if the slot was empty
	 */
	public Item swap (Item item, int slot) {
		Item oldItem = data[slot];
		data[slot] = item;
		return oldItem;
	}

	/**
	 * Gets the number of free spaces in the container
	 * @return The number of free spaces
	 */
	public int freeSlots() {
		int j = 0;
		for (Item aData : data) {
			if (aData == null) {
				j++;
			}
		}
		return j;
	}

	/**
	 * Removes the specified item (and the specified amount of the item) from this container
	 * @param item	The item (and amount) to remove
	 * @return	The amount removed
	 */
	public int remove(Item item) {
		int removed = 0, toRemove = item.getAmount();
		for (int i = 0; i < data.length; i++) {
			if (data[i] != null) {
				if (data[i].getId() == item.getId()) {
					int amt = data[i].getAmount();
					if (amt > toRemove) {
						removed += toRemove;
						amt -= toRemove;
						toRemove = 0;
						data[i].setAmount(amt);
						return removed;
					} else {
						removed += amt;
						toRemove -= amt;
						data[i] = null;
					}
				}
			}
		}
		return removed;
	}

	/**
	 * Remove all instances of the item with the specified ID
	 * @param itemID The ID of the item to remove
	 */
	public void removeAll(int itemID) {
		for (int i = 0; i < data.length; i++) {
			if (data[i] != null) {
				if (data[i].getId() == itemID) {
					data[i] = null;
				}
			}
		}
	}
	
	/**
	 * Removes any items which are currently in the specified slot.
	 * @param slot The slot to remove items from
	 * @return	The item(s) removed
	 */
	public Item clearSlot (int slot) {
		if (slot >= 0 && slot < data.length) {
			Item item = data[slot];
			if (slot < invType.stockCount && invType.stockObjects[slot] >= 0) {
				data[slot] = Item.create(invType.stockObjects[slot], 0);
			} else {
				data[slot] = null;
			}
			return item;
		}
		return null;
	}

	public boolean containsOne(int itemID) {
		for (Item aData : data) {
			if (aData != null) {
				if (aData.getId() == itemID) {
					return true;
				}
			}
		}
		return false;
	}

	public boolean contains(Item item) {
		int amtOf = 0;
		for (Item aData : data) {
			if (aData != null) {
				if (aData.getId() == item.getId()) {
					amtOf += aData.getAmount();
				}
			}
		}
		return amtOf >= item.getAmount();
	}

	public int nextFreeSlot() {
		for (int i = 0; i < data.length; i++) {
			if (data[i] == null) {
				return i;
			}
		}
		return -1;
	}

	public void clear() {
		for (int i = 0; i < data.length; i++) {
			data[i] = null;
		}
	}

	public int getSize() {
		return data.length;
	}

	public int getFreeSlots() {
		int s = 0;
		for (Item aData : data) {
			if (aData == null) {
				s++;
			}
		}
		return s;
	}

	public int getUsedSlots() {
		int s = 0;
		for (Item aData : data) {
			if (aData != null) {
				s++;
			}
		}
		return s;
	}

	public int getNumberOf(Item item) {
		int count = 0;
		for (Item aData : data) {
			if (aData != null) {
				if (aData.getId() == item.getId()) {
					count += aData.getAmount();
				}
			}
		}
		return count;
	}

	public int getNumberOf(int item) {
		int count = 0;
		for (Item aData : data) {
			if (aData != null) {
				if (aData.getId() == item) {
					count += aData.getAmount();
				}
			}
		}
		return count;
	}
	
	/**
	 * Gets the number of items which are in the default stock for this container
	 * @param itemID The item ID
	 * @return The amount in the container by default
	 */
	public int getDefaultCount (int itemID) {
		for (int slot=0; slot<invType.stockCount; slot++) {
			if (invType.stockObjects[slot] == itemID) {
				return invType.stockCounts[slot];
			}
		}
		return -1;
	}

	public Item[] getItems() {
		return data;
	}

	public Item[] getItemsCopy() {
		Item[] newData = new Item[data.length];
		System.arraycopy(data, 0, newData, 0, newData.length);
		return newData;
	}

	public Inventory asItemContainer() {
		Inventory c = new Inventory(invType,
				this.alwaysStackable);
		System.arraycopy(data, 0, c.data, 0, data.length);
		return c;
	}

	public int getFreeSlot() {
		for (int i = 0; i < data.length; i++) {
			if (data[i] == null) {
				return i;
			}
		}
		return -1;
	}

	public int getThisItemSlot(Item item) {
		for (int i = 0; i < data.length; i++) {
			if (data[i] != null) {
				if (data[i].getId() == item.getId()) {
					return i;
				}
			}
		}
		return getFreeSlot();
	}

	public Item lookup(int id) {
		for (Item aData : data) {
			if (aData == null) {
				continue;
			}
			if (aData.getId() == id) {
				return aData;
			}
		}
		return null;
	}

	public int lookupSlot(int id) {
		for (int slot = 0; slot < data.length; slot++) {
			if (data[slot] == null) {
				continue;
			}
			if (data[slot].getId() == id) {
				return slot;
			}
		}
		return -1;
	}

	public void reset() {
		data = new Item[data.length];
	}

	public int remove(int preferredSlot, Item item) {
		int removed = 0, toRemove = item.getAmount();
		if (data[preferredSlot] != null) {
			if (data[preferredSlot].getId() == item.getId()) {
				int amt = data[preferredSlot].getAmount();
				if (amt > toRemove) {
					removed += toRemove;
					amt -= toRemove;
					toRemove = 0;
					set(preferredSlot, Item.create(data[preferredSlot].getId(), amt));
					return removed;
				} else {
					removed += amt;
					toRemove -= amt;
					set(preferredSlot, null);
				}
			}
		}
		for (int i = 0; i < data.length; i++) {
			if (data[i] != null) {
				if (data[i].getId() == item.getId()) {
					int amt = data[i].getAmount();
					if (amt > toRemove) {
						removed += toRemove;
						amt -= toRemove;
						toRemove = 0;
						set(i, Item.create(data[i].getId(), amt));
						return removed;
					} else {
						removed += amt;
						toRemove -= amt;
						set(i, null);
					}
				}
			}
		}
		return removed;
	}

	public void addAll(Inventory container) {
		for (int i = 0; i < container.getSize(); i++) {
			Item item = container.get(i);
			if (item != null) {
				this.add(item);
			}
		}
	}
	
	public void addAll(Item[] container) {
		for (int i = 0; i < container.length; i++) {
			Item item = container[i];
			if (item != null) {
				this.add(item);
			}
		}
	}

	public boolean hasSpaceFor(Inventory container) {
		for (int i = 0; i < container.getSize(); i++) {
			Item item = container.get(i);
			if (item != null) {
				if (!this.hasSpaceForItem(item)) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Checks if there's space for the item.
	 * @param item The item to add.
	 * @return {@code True} if there's space in the container for this item.
	 */
	public boolean hasSpaceForItem(Item item) {
		return getMaximumAdd(item) >= item.getAmount();
	}

	/**
	 * Gets the maximum amount of this item that can be added to this container.
	 * @param item The item.
	 * @return The maximum amount we can add of this item.
	 */
	public int getMaximumAdd(Item item) {
		int freeSlots = freeSlots();
		if (item.isStackable() || alwaysStackable) {
			int slot = lookupSlot(item.getId());
			int amount = Integer.MAX_VALUE - 1;
			if (slot > -1) {
				amount -= data[slot].getAmount();
			} else if (freeSlots < 1) {
				return 0;
			}
			return amount;
		}
		return freeSlots;
	}
	
	@Override
	public String toString () {
		return Arrays.toString(data);
	}
}
