package org.virtue.game.entity.npc;

import java.util.Random;

/**
 * @author Kayla
 * @date 12/3/2015
 */
public class NpcDrops {
	
	private final int itemID;
	
	private final int maxAmount;
	
	private final int minAmount;

	private final double hitRollCeil;
	
	public NpcDrops(final int itemID, final int maxAmount, final int minAmount, final double hitRollCeil) {
		this.itemID = itemID;
		this.maxAmount = maxAmount;
		this.minAmount = minAmount;
		this.hitRollCeil = hitRollCeil;
	}
	
	public int getItemID() {
		return itemID;
	}
	
	public int getMaxAmount() {
		return maxAmount;
	}

	public int getMinAmount() {
		return minAmount;
	}
	
	public double getHitRollCeil() {
		return hitRollCeil;
	}
	
	public int getRandomNumberFrom(int min, int max) {
        Random amount = new Random();
        int randomNumber = amount.nextInt((max + 1) - min) + min;
        return randomNumber;
    }
}