package org.virtue.game.content.treasure;

import org.virtue.Virtue;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.ContainerState;
import org.virtue.game.entity.player.container.Item;

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
	private Prize reward;
	
	/**
	 * If a chest can be selected currently.
	 */
	private boolean selectable;
	
	private ScriptAPI api = Virtue.getInstance().getScripts().getApi();
	
	/**
	 * Constructs a new {@code TreasureHunter} {@code Object}.
	 * @param player The player.
	 */
	public TreasureHunter(Player player) {
		this.player = player;
		this.selectable = true;
	}

	/**
	 * Claims the reward.
	 * @param method The method of claiming (0=backpack, 1=bank, 2=cashout).
	 */
	public void claimReward(int method) {
		if (reward == null) {
			return;
		}
		switch (method) {
		case 0:
			player.getInvs().getContainer(ContainerState.BACKPACK).add(reward.getItem());
			player.getInvs().sendContainer(ContainerState.BACKPACK);
			api.sendMessage(player, "Your prize has been placed in your inventory: " + reward.getItem().getName());
			break;
		case 1:
			player.getInvs().getContainer(ContainerState.BANK).add(reward.getItem());
			player.getInvs().sendContainer(ContainerState.BANK);
			api.sendMessage(player, "Your prize has been placed in your bank: " + reward.getItem().getName());
			break;
		case 2:
			player.getInvs().getContainer(ContainerState.BACKPACK).add(new Item(995, reward.getCashoutValue()));
			player.getInvs().sendContainer(ContainerState.BACKPACK);
			break;
		}
		reward = null;
		selectable = true;
	}

	/**
	 * Opens the treasure hunter interface.
	 */
	public void open() {
		player.getVars().setVarValueInt(4143, 0);
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
		player.getDispatcher().sendCS2Script(1522, new Object[] { 1, "", 25687, 0 });
		player.getDispatcher().sendCS2Script(2412, new Object[] { 88 });
		player.getDispatcher().sendVarc(3906, 0);
		player.getDispatcher().sendVarc(4142, 10);
		player.getDispatcher().sendVarc(4082, player.getHeartsOfIce());
		player.getDispatcher().sendVarc(1800, player.getKeys() - 1);
		player.getDispatcher().sendVarc(2911, -1);
		player.getDispatcher().sendCS2Script(187, new Object[] { 1, 7 });
		player.getWidgets().openWidget(1477, 486, 1253, false);
		player.getDispatcher().sendCS2Script(8178, new Object[] { });
		player.getDispatcher().sendVarc(1928, 0);
		player.getDispatcher().sendCS2Script(9122, new Object[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, -1, 0 });
		player.getDispatcher().sendCS2Script(6973, new Object[] { });
		player.getDispatcher().sendVarc(1993, 1);
		player.getDispatcher().sendCS2Script(11189, new Object[] { 35, 24130227, 5012, 32102 });
		if (reward != null) {
			sendReward(reward, 2, true, false, 0);
		}
	}
	
	/**
	 * Sends the reward data.
	 * @param prize The prize.
	 * @param chestIndex The chest selected.
	 * @param instant If the reward screen should show up instantly.
	 * @param openAll If all chests should be opened at once.
	 * @param heartsUsed The amount of "Heart of Ice" used.
	 */
	public void sendReward(Prize prize, int chestIndex, boolean instant, boolean openAll, int heartsUsed) {
		chestIndex += 1;
		int cashoutValue = prize.getCashoutValue();
		int category = 1 + prize.getCategory().ordinal();
		int rarity = 1 + prize.getRarity().ordinal();
		int bankButton = player.getInvs().loadContainer(ContainerState.BANK).hasSpaceForItem(prize.getItem()) ? 3 : 4; //bankable = 3, no bank room = 4, no prize to claim = default
		int backpackButton = player.getInvs().getContainer(ContainerState.BACKPACK).hasSpaceForItem(prize.getItem()) ? 1 : 2; //available = 1, backpack full = 2, no prize = default
		String description = prize.getItem().getExamine();
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
		player.getVars().setVarValueInt(1450, -1140846591);
		player.getVars().setVarValueInt(1454, cashoutValue);
		player.getVars().setVarValueInt(1455, 1);
		player.getVars().setVarValueInt(1451, 139722752);
		player.getDispatcher().sendVarc(2045, 0);
		player.getDispatcher().sendCS2Script(4121, new Object[] { heartsUsed });
		player.getDispatcher().sendVarc(4082, player.getHeartsOfIce());
		player.getDispatcher().sendVarc(1800, player.getKeys() - 1);
		player.getDispatcher().sendVarc(4077, 1);
		player.getDispatcher().sendVarc(4097, 0);
		player.getDispatcher().sendCS2Script(9122, new Object[] { instant ? 1 : 0, openAll ? 1 : 0, 1, bankButton, backpackButton, 0, cashoutValue, 3, category, rarity, description, prize.getItem().getAmount(), prize.getItem().getId(), chestIndex });
		player.getDispatcher().sendVarc(1993, 1);
		player.removeKey(1);
		selectable = false;
	}

	/**
	 * Selects the reward.
	 * @param chestIndex The selected chest index.
	 */
	public void selectReward(int chestIndex) {
		reward = new Prize(new Item(23679, 1), Rarity.VERY_RARE, PrizeCategory.LUCKY, 1000000);
		sendReward(reward, chestIndex, false, false, 0);
	}

	/**
	 * Gets the reward value.
	 * @return The reward.
	 */
	public Prize getReward() {
		return reward;
	}

	/**
	 * Sets the reward value.
	 * @param reward The reward to set.
	 */
	public void setReward(Prize reward) {
		this.reward = reward;
	}

	/**
	 * Gets the selectable value.
	 * @return The selectable.
	 */
	public boolean isSelectable() {
		return selectable;
	}

	/**
	 * Sets the selectable value.
	 * @param selectable The selectable to set.
	 */
	public void setSelectable(boolean selectable) {
		this.selectable = selectable;
	}
}