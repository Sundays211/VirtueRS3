/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.entity.player.inv;

import org.virtue.config.objtype.ObjType;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.var.VarContainer;
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
	private ObjType type;
	
	/**
	 * The object variable values
	 */
	private VarContainer varValues;

	/**
	 * Constructs a new {@code Item.java}.
	 * @param id The id.
	 * @param count The count.
	 */
	public Item(int id, int count) {
		super(id);
		if (amount < 0) {
			throw new IllegalArgumentException("Item count must be a positive integer. Count supplied: "+amount);
		}
		if (!ObjTypeList.getInstance().exists(id)) {
			throw new IllegalArgumentException("Invalid item ID: "+id);
		}
		if (getType().dummyitem != 0) {
			throw new IllegalArgumentException("Can't instantiate a dummy item! Item ID: "+id);
		}
		this.id = id;
		this.amount = count;
	}
	
	public Item (Item item) {
		super(item.id);
		this.id = item.id;
		this.amount = item.amount;
		this.type = item.type;
		this.varValues = item.varValues;
	}

	/**
	 * @return the amount
	 */
	public int getAmount() {
		return amount;
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.node.Node#getName()
	 */
	@Override
	public String getName() {
		return getType().name;
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
	
	public VarContainer getVarValues() {
		return varValues;
	}

	public void setVarValues(VarContainer varValues) {
		this.varValues = varValues;
	}

	/**
	 * Gets the cache definition for the item
	 * @return	The definition
	 */
	public ObjType getType () {
		if (type == null) {
			type = ObjTypeList.getInstance().list(id);
		}
		return type;
	}
	
	/**
	 * Handles an "examine" interaction with the item
	 */
	public void examine (Player player) {
		String desc = getType().getDescription()+" (id="+id+", amount="+amount+")";
		player.getDispatcher().sendGameMessage(desc);
		int value = getType().getExchangeValue();
		if (value != -1) {
			player.getDispatcher().sendGameMessage("This item is worth: "+StringUtility.formatNumber(value)
					+"gp on the Grand Exchange.");
		}
	}
	
	public boolean is2H() {
		return getType().wearpos2 == 5 || getType().wearpos3 == 5;
	}
	
	public boolean hideArms() {
		return getType().wearpos2 == 6 || getType().wearpos3 == 6;
	}
	
	public boolean hideHair() {
		return getType().wearpos2 == 8 || getType().wearpos3 == 8;
	}
	
	public boolean isFaceMask() {
		String name = getName().toLowerCase();
		return getType().getParam(625, 0) == 1 || name.contains("sunglasses")  || name.contains("halo");
	}

	public boolean showBeard() {
		return getType().wearpos3 != 11 && getType().wearpos2 != 11;
	}
	
	@Override
	public String toString () {
		return new StringBuilder().append("{id=").append(id).append(", amount=").append(amount).append("}").toString();
	}
}
