package org.virtue.model.content.treasure;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.Item;

/**
 * Handles the treasure hunter activity.
 * @author Emperor
 *
 */
public final class TreasureHunter {

	/**
	 * The player.
	 */
	private final Player player;
	
	/**
	 * The current reward.
	 */
	private Item reward;
	
	/**
	 * Constructs a new {@code TreasureHunter} {@code Object}.
	 * @param player The player.
	 */
	public TreasureHunter(Player player) {
		this.player = player;
	}

	/**
	 * Opens the treasure hunter interface.
	 */
	public void open() {
		player.getVars().setVarpBit(4143, 0);
		player.getVars().setVarpBit(5130, 0);
		player.getVars().setVarpBit(5684, 1); //-1
		player.getDispatcher().sendVarc(4082, 113);
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 0 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 1 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 2 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 3 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 4 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 5 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 6 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 7 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 8 });
		player.getDispatcher().sendCS2Script(1522, new Object[] { 0, "", -1, 9 });
		player.getDispatcher().sendVarc(3906, 0);
		player.getDispatcher().sendCS2Script(1522, new Object[] { 1, "", 25687, 0 });
		player.getDispatcher().sendCS2Script(2412, new Object[] { 0 });
		player.getDispatcher().sendVarc(3906, 0);
		player.getDispatcher().sendVarc(4142, 10);
		player.getDispatcher().sendVarc(1800, 0);
		player.getDispatcher().sendVarc(4082, 113);
		player.getDispatcher().sendVarc(2911, -1);
		player.getDispatcher().sendCS2Script(187, new Object[] { 1, 7 });
		player.getWidgets().openWidget(1477, 486, 1253, false); //TODO: Root widget
		player.getDispatcher().sendCS2Script(8178, new Object[] { });
		player.getDispatcher().sendVarc(1928, 0);
//		player.getDispatcher().sendCS2Script(9122, new Object[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, -1, 0 });
		player.getDispatcher().sendCS2Script(6973, new Object[] { });
		player.getDispatcher().sendVarc(1993, 1);
		player.getDispatcher().sendCS2Script(11189, new Object[] { 35, 24130227, 5012, 32102 });
		reward = new Item(4151, 1);
		if (reward != null) {
			sendReward(reward);
		}
	}
	
	/**
	 * Sends the reward item.
	 * @param item The item.
	 */
	public void sendReward(Item item) {
		player.getVars().setVarpBit(20736, 1290);
		player.getVars().setVarpBit(20747, 0);
		player.getVars().setVarpBit(20742, 0);
		player.getVars().setVarpBit(20738, 1);
		player.getVars().setVarpBit(20749, 0);
		player.getVars().setVarpBit(20739, 1);
		player.getVars().setVarpBit(20752, 1);
		player.getVars().setVarpBit(20751, 0);
		player.getVars().setVarpBit(25533, 1);
		player.getVars().setVarpBit(28369, 1);
		player.getVars().setVarpBit(28370, 0);
		player.getVars().setVarpBit(20744, 12);
		player.getVars().setVarpBit(20738, 0);
		player.getVars().setVarpBit(20749, 90);
		player.getVars().setVarpBit(20739, 0);
		player.getVars().setVarpBit(20750, 73);
		player.getVars().setVarpBit(20752, 0);
		player.getVars().setVarpBit(20751, 30);
		player.getVars().setVarpBit(25533, 0);
		player.getVars().setVarpBit(25534, 30);
		player.getVars().setVarpBit(28369, 0);
		player.getVars().setVarpBit(28370, 15);
		player.getVars().setVarpBit(20736, 1289);
		player.getVars().setVarpBit(20747, 1);
		player.getVars().setVarpBit(20742, 1);
		player.getVars().setVarpBit(20738, 1);
		player.getVars().setVarpBit(20749, 0);
		player.getVars().setVarpBit(20739, 1);
		player.getVars().setVarpBit(20752, 1);
		player.getVars().setVarpBit(20751, 0);
		player.getVars().setVarpBit(25533, 1);
		player.getVars().setVarpBit(28369, 1);
		player.getVars().setVarpBit(28370, 0);
		player.getVars().setVarpBit(20744, 11);
		player.getVars().setVarpBit(20738, 0);
		player.getVars().setVarpBit(20749, 89);
		player.getVars().setVarpBit(20739, 0);
		player.getVars().setVarpBit(20750, 72);
		player.getVars().setVarpBit(20752, 0);
		player.getVars().setVarpBit(20751, 29);
		player.getVars().setVarpBit(25533, 0);
		player.getVars().setVarpBit(25534, 29);
		player.getVars().setVarpBit(28369, 0);
		player.getVars().setVarpBit(28370, 14);
		player.getVars().setVarpBit(20736, 1288);
		player.getVars().setVarpBit(20747, 2);
		player.getVars().setVarpBit(20742, 2);
		player.getVars().setVarpBit(20738, 1);
		player.getVars().setVarpBit(20749, 0);
		player.getVars().setVarpBit(20739, 1);
		player.getVars().setVarpBit(20752, 1);
		player.getVars().setVarpBit(20751, 0);
		player.getVars().setVarpBit(25533, 1);
		player.getVars().setVarpBit(28369, 1);
		player.getVars().setVarpBit(28370, 0);
		player.getVars().setVarpBit(20744, 10);
		player.getVars().setVarpBit(20738, 0);
		player.getVars().setVarpBit(20749, 88);
		player.getVars().setVarpBit(20739, 0);
		player.getVars().setVarpBit(20750, 71);
		player.getVars().setVarpBit(20752, 0);
		player.getVars().setVarpBit(20751, 28);
		player.getVars().setVarpBit(25533, 0);
		player.getVars().setVarpBit(25534, 28);
		player.getVars().setVarpBit(28369, 0);
		player.getVars().setVarpBit(28370, 13);
		player.getDispatcher().sendCS2Script(7486, new Object[] { 41615361, 24130232 });
		
//		player.getVars().setVarValueInt(3926, 1001);
//		player.getVars().setVarValueInt(3928, 82116621);
//		player.getVars().setVarValueInt(3929, -1);
//		player.getWidgets().openWidget(1477, 544, 669, true);
//		player.getVars().setVarValueInt(3838, 0);
//		player.getVars().setVarValueInt(3840, 0);
//		player.getVars().setVarValueInt(3842, -1);
		player.getVars().setVarValueInt(1450, -1140846591);
		player.getVars().setVarValueInt(4478, 0);
		player.getVars().setVarValueInt(1452, 18832243);
		player.getVars().setVarValueInt(1449, 1342968724);
		player.getVars().setVarValueInt(1448, 138412032);
		player.getVars().setVarValueInt(1451, 139460608);
		player.getVars().setVarValueInt(4141, 0);
		player.getVars().setVarValueInt(1444, 268473236);
		player.getVars().setVarValueInt(1444, 268473236);
		player.getVars().setVarValueInt(1450, -1140846591);
		player.getVars().setVarValueInt(1454, 75000);
		player.getVars().setVarValueInt(1455, 1);
		player.getVars().setVarValueInt(1451, 139722752);
//		player.getVars().setVarValueInt(5130, 0);
		player.getDispatcher().sendVarc(2045, 0);
		player.getDispatcher().sendVarc(4082, 113);
		player.getDispatcher().sendCS2Script(4121, new Object[] { 0 });
		player.getDispatcher().sendVarc(4077, 1);
		player.getDispatcher().sendVarc(4097, 0);//0, 0, 0, 0, 
		player.getDispatcher().sendCS2Script(9122, new Object[] { 0, 0, 1, 3, 1, 3, 75000, 1, 20, 1, "Place this to chop maple logs. Others may use your tree, and have a chance to give you additional maple logs.", 1, item.getId(), 2 });
		player.getDispatcher().sendVarc(1993, 1);
	}

	/**
	 * Gets the reward value.
	 * @return The reward.
	 */
	public Item getReward() {
		return reward;
	}

	/**
	 * Sets the reward value.
	 * @param reward The reward to set.
	 */
	public void setReward(Item reward) {
		this.reward = reward;
	}
}