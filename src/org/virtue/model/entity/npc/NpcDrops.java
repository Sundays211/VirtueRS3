package org.virtue.model.entity.npc;

/**
 * @Author Kayla
 * @Date Nov 24, 2015
 */
public class NpcDrops {
	
	public int npcID;

	public int itemID;
	
	public int itemAmount;
	
	public int minimum;
	
	public int maximum;
	
	public String itemRarity;
	
	public NpcDrops (int npcID, int itemID, int itemAmount, int minimum, int maximum, String itemRarity) {
		this.npcID = npcID;
		this.itemID = itemID;
		this.itemAmount = itemAmount;
		this.minimum = minimum;
		this.maximum = maximum;
		this.itemRarity = itemRarity;
	}
	
	public int getItemId() {
		return itemID;
	}
	
	public int getMinimumAmount() {
		return minimum;
	}

	public int getExtraAmount() {
		return maximum - minimum;
	}

	public int getMaximumAmount() {
		return maximum;
	}

	public String getItemRarity() {
		return itemRarity;
	}

}
