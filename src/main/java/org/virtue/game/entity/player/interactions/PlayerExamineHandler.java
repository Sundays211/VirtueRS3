/**
 * Copyright (c) 2014 Virtue Studios
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
package org.virtue.game.entity.player.interactions;

import org.virtue.Virtue;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Inventory;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.entity.player.var.VarKey;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 6/03/2015
 */
public class PlayerExamineHandler implements PlayerOptionHandler {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#getRange()
	 */
	@Override
	public int getRange() {
		return Integer.MAX_VALUE;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#interact(org.virtue.game.entity.player.Player, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean interact(Player player, Player target) {
		player.getDispatcher().sendVarcString(VarKey.Client.PLAYER_INSPECT_NAME, target.getName());
		Inventory inspectEquipment = player.getInvs().loadContainer(ContainerState.PLAYER_INSPECT_EQUIPMENT);
		Inventory targetEquipment = target.getInvs().getContainer(ContainerState.EQUIPMENT);
		inspectEquipment.clear();
		for (int slot=0;slot<inspectEquipment.getSize();slot++) {
			inspectEquipment.set(slot, targetEquipment.get(slot));
		}

		player.getInvs().sendContainer(ContainerState.PLAYER_INSPECT_EQUIPMENT);
		player.getWidgets().openOverlaySub(1024, 1560, true);
		player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_RENDER, target.getModel().getBASId());
		player.getDispatcher().sendOtherPlayerWidgetModel(1558, 19, target);
		String clan = null;
		if (target.getClanHash() != 0L) {
			clan = Virtue.getInstance().getClans().getClanName(target.getClanHash());
		}
		if (clan == null) {
			clan = "None";
		}
		player.getDispatcher().sendVarcString(VarKey.Client.PLAYER_INSPECT_CLAN, clan);
		String message = (String) player.getVars().getVarValue(VarKey.Player.PLAYER_INSPECT_MESSAGE);
		if (message != null) {
			player.getDispatcher().sendVarcString(VarKey.Client.PLAYER_INSPECT_MESSAGE, message);
		}
		
		player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_LIFEPOINTS, target.getVars().getVarBitValue(VarKey.Bit.PLAYER_HITPOINTS));
		player.getVars().setVarValueInt(4972, 0);//Force the changes to take effect
		
		showStats(player, target);
		return true;
	}
	
	private void showStats (Player player, Player target) {
		for (Stat stat : Stat.values()) {
			setInspectedStatBase(player, stat, target.getSkills().getBaseLevel(stat));
			setInspectedStatLevel(player, stat, target.getSkills().getCurrentLevel(stat));
			setInspectedStatXp(player, stat, target.getSkills().getExperience(stat) / 10);
		}
	}
	
	private void setInspectedStatXp (Player player, Stat stat, int value) {
		switch (stat) {
		case ATTACK:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_ATTACK_XP, value);
			break;
		case CONSTITUTION:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_CONSTITUTION_XP, value);
			break;
		case MINING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_MINING_XP, value);
			break;
		case STRENGTH:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_STRENGTH_XP, value);
			break;
		case AGILITY:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_AGILITY_XP, value);
			break;
		case SMITHING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_SMITHING_XP, value);
			break;
		case DEFENCE:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_DEFENSE_XP, value);
			break;
		case HERBLORE:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_HERBLORE_XP, value);
			break;
		case FISHING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_FISHING_XP, value);
			break;
		case RANGED:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_RANGED_XP, value);
			break;
		case THIEVING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_THIEVING_XP, value);
			break;
		case COOKING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_COOKING_XP, value);
			break;
		case PRAYER:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_PRAYER_XP, value);
			break;
		case CRAFTING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_CRAFTING_XP, value);
			break;
		case FIREMAKING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_FIREMAKING_XP, value);
			break;
		case MAGIC:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_MAGIC_XP, value);
			break;
		case FLETCHING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_FLETCHING_XP, value);
			break;
		case WOODCUTTING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_WOODCUTTING_XP, value);
			break;
		case RUNECRAFTING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_RUNECRAFTING_XP, value);
			break;
		case SLAYER:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_SLAYER_XP, value);
			break;
		case FARMING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_FARMING_XP, value);
			break;
		case CONSTRUCTION:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_CONSTRUCTION_XP, value);
			break;
		case HUNTER:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_HUNTER_XP, value);
			break;
		case SUMMONING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_SUMMONING_XP, value);
			break;
		case DUNGEONEERING:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_DUNGEONEERING_XP, value);
			break;
		case DIVINATION:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_DIVINATION_XP, value);
			break;
		case INVENTION:
			player.getVars().setVarValueInt(VarKey.Player.PLAYER_INSPECT_INVENTION_XP, value);
			break;
		}
	}
	
	private void setInspectedStatBase (Player player, Stat stat, int value) {
		switch (stat) {
		case ATTACK:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_ATTACK_BASE, value);
			break;
		case CONSTITUTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CONSTITUTION_BASE, value);
			break;
		case MINING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_MINING_BASE, value);
			break;
		case STRENGTH:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_STRENGTH_BASE, value);
			break;
		case AGILITY:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_AGILITY_BASE, value);
			break;
		case SMITHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SMITHING_BASE, value);
			break;
		case DEFENCE:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DEFENSE_BASE, value);
			break;
		case HERBLORE:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_HERBLORE_BASE, value);
			break;
		case FISHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FISHING_BASE, value);
			break;
		case RANGED:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_RANGED_BASE, value);
			break;
		case THIEVING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_THIEVING_BASE, value);
			break;
		case COOKING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_COOKING_BASE, value);
			break;
		case PRAYER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_PRAYER_BASE, value);
			break;
		case CRAFTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CRAFTING_BASE, value);
			break;
		case FIREMAKING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FIREMAKING_BASE, value);
			break;
		case MAGIC:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_MAGIC_BASE, value);
			break;
		case FLETCHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FLETCHING_BASE, value);
			break;
		case WOODCUTTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_WOODCUTTING_BASE, value);
			break;
		case RUNECRAFTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_RUNECRAFTING_BASE, value);
			break;
		case SLAYER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SLAYER_BASE, value);
			break;
		case FARMING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FARMING_BASE, value);
			break;
		case CONSTRUCTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CONSTRUCTION_BASE, value);
			break;
		case HUNTER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_HUNTER_BASE, value);
			break;
		case SUMMONING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SUMMONING_BASE, value);
			break;
		case DUNGEONEERING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DUNGEONEERING_BASE, value);
			break;
		case DIVINATION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DIVINATION_BASE, value);
			break;
		case INVENTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_INVENTION_BASE, value);
			break;
		}
	}
	
	private void setInspectedStatLevel (Player player, Stat stat, int value) {
		switch (stat) {
		case ATTACK:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_ATTACK, value);
			break;
		case CONSTITUTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CONSTITUTION, value);
			break;
		case MINING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_MINING, value);
			break;
		case STRENGTH:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_STRENGTH, value);
			break;	
		case AGILITY:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_AGILITY, value);
			break;
		case SMITHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SMITHING, value);
			break;
		case DEFENCE:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DEFENSE, value);
			break;
		case HERBLORE:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_HERBLORE, value);
			break;
		case FISHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FISHING, value);
			break;	
		case RANGED:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_RANGED, value);
			break;
		case THIEVING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_THIEVING, value);
			break;
		case COOKING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_COOKING, value);
			break;
		case PRAYER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_PRAYER, value);
			break;
		case CRAFTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CRAFTING, value);
			break;
		case FIREMAKING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FIREMAKING, value);
			break;
		case MAGIC:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_MAGIC, value);
			break;
		case FLETCHING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FLETCHING, value);
			break;
		case WOODCUTTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_WOODCUTTING, value);
			break;
		case RUNECRAFTING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_RUNECRAFTING, value);
			break;
		case SLAYER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SLAYER, value);
			break;
		case FARMING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_FARMING, value);
			break;
		case CONSTRUCTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_CONSTRUCTION, value);
			break;
		case HUNTER:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_HUNTER, value);
			break;
		case SUMMONING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_SUMMONING, value);
			break;
		case DUNGEONEERING:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DUNGEONEERING, value);
			break;
		case DIVINATION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_DIVINATION, value);
			break;
		case INVENTION:
			player.getVars().setVarBitValue(VarKey.Bit.PLAYER_INSPECT_INVENTION, value);
			break;
		}
	}

}
