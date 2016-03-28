package org.virtue.game.entity.player.inv;

import org.virtue.config.objtype.ItemType;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.game.entity.player.Player;
import org.virtue.game.node.Node;
import org.virtue.utility.text.StringUtility;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 10/02/2015
 */
public class Item extends Node {
		
	public static Item create(int id, int count) {
		return new Item(id, count);
	}
	/**
	 * Represents the amount.
	 */
	private int amount;
	
	/**
	 * The cache definition for the item
	 */
	private ItemType type;
	
	public String desc;

	/**
	 * Constructs a new {@code Item.java}.
	 * @param id The id.
	 * @param count The amount.
	 */
	public Item(int id, int amount) {
		super(id);
		if (amount < 0) {
			throw new IllegalArgumentException("Item count must be a positive integer. Count supplied: "+amount);
		}
		this.id = id;
		this.amount = amount;
		super.name = getType().name;
	}
	
	public Item (Item item) {
		super(item.id);
		this.id = item.id;
		this.amount = item.amount;
		this.type = item.type;
		super.name = getType().name;
	}

	/**
	 * @return the amount
	 */
	public int getAmount() {
		return amount;
	}

	/**
	 * @param count the amount to set
	 * @throws IllegalArgumentException If the amount specified is negative
	 */
	public void setAmount(int count) throws IllegalArgumentException {
		if (count < 0) {
			throw new IllegalArgumentException("Item count must be a positive integer. Count supplied: "+count);
		}
		this.amount = count;
	}
	
	public void addCount (int count) {
		if (Integer.MAX_VALUE-this.amount<count) {
			throw new IllegalArgumentException("Adding "+count+" to this item's would cause it to overflow.");
		}
		this.amount += count;
	}
	
	/**
	 * Finds whether the item should stack or not when added to a non-stacking container
	 * @return True if the item should always stack, false otherwise
	 */
	public boolean isStackable () {
		return getType().isStackable();
	}
	
	/**
	 * Gets the cache definition for the item
	 * @return	The definition
	 */
	public ItemType getType () {
		if (type == null) {
			type = ObjTypeList.getInstance().list(id);
		}
		return type;
	}
	
	/**
	 * Gets the examine info.
	 * @return The examine.
	 */
	public String getExamine() {
		if (desc == null) {
			desc = getType().getDescription()+" (id="+id+", amount="+amount+")";
		}
		return desc;
	}
	
	/**
	 * Handles an "examine" interaction with the item
	 */
	public void examine (Player player) {
		if (desc == null) {
			desc = getType().getDescription()+" (id="+id+", amount="+amount+")";
		}
		player.getDispatcher().sendGameMessage(desc);
		int value = getType().getExchangeValue();
		if (value != -1) {
			player.getDispatcher().sendGameMessage("This item is worth: "+StringUtility.formatNumber(value)
					+"gp on the Grand Exchange.");
		}
	}
	
	public boolean isOffhand() {
		return getType().name.toLowerCase().contains("off-hand");
	}
	
	public boolean is2H() {
		return getType().wearpos2 == 5 || getType().wearpos3 == 5;
	}
	
	public boolean hideArms() {
		String name = getType().name.toLowerCase();
		if (name.contains("d'hide body") || name.contains("dragonhide body") || name.equals("stripy pirate shirt") || (name.contains("chainbody") && (name.contains("iron") || name.contains("bronze") || name.contains("steel") || name.contains("black") || name.contains("mithril") || name.contains("adamant") || name.contains("rune") || name.contains("white"))) || name.equals("leather body") || name.equals("hardleather body") || name.contains("studded body"))
			return false;
		return getType().wearpos2 == 6 || getType().wearpos3 == 6;
	}
	
	public boolean hideHair() {
		return getType().wearpos2 == 8 || getType().wearpos3 == 8;
	}
	
	public boolean isFaceMask() {
		String name = getType().name.toLowerCase();
		return getType().getParam(625, 0) == 1 || name.contains("sunglasses")  || name.contains("halo");
	}

	public boolean showBeard() {
		return getType().wearpos3 != 11 && getType().wearpos2 != 11;
		/*String name = getType().name.toLowerCase();
		return !hideHair() || name.contains("horns") || name.contains("hat") || name.contains("afro") || name.contains("cowl") || name.contains("tattoo") || name.contains("headdress") || name.contains("hood") || (name.contains("mask") && !name.contains("h'ween")) || (name.contains("helm") && !name.contains("full"));*/
	}
	
	@Override
	public String toString () {
		return new StringBuilder().append("{id=").append(id).append(", amount=").append(amount).append("}").toString();
	}
}
