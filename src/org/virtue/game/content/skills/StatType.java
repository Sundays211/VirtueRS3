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
package org.virtue.game.content.skills;

import org.virtue.game.entity.player.widget.var.VarKey;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public enum StatType {

	ATTACK(0, "Attack", VarKey.Player.BONUS_ATTACK_XP),
	DEFENCE(1, "Defence", VarKey.Player.BONUS_DEFENSE_XP),
	STRENGTH(2, "Strength", VarKey.Player.BONUS_STRENGTH_XP),
	CONSTITUTION(3, "Constitution", VarKey.Player.BONUS_CONSTITUTION_XP),
	RANGED(4, "Ranged", VarKey.Player.BONUS_RANGED_XP),
	PRAYER(5, "Prayer", VarKey.Player.BONUS_PRAYER_XP),
	MAGIC(6, "Magic", VarKey.Player.BONUS_MAGIC_XP),
	COOKING(7, "Cooking", VarKey.Player.BONUS_COOKING_XP),
	WOODCUTTING(8, "Woodcutting", VarKey.Player.BONUS_WOODCUTTING_XP),
	FLETCHING(9, "Fletching", VarKey.Player.BONUS_FLETCHING_XP),
	FISHING(10, "Fishing", VarKey.Player.BONUS_FISHING_XP),
	FIREMAKING(11, "Firemaking", VarKey.Player.BONUS_FIREMAKING_XP),
	CRAFTING(12, "Crafting", VarKey.Player.BONUS_CRAFTING_XP),
	SMITHING(13, "Smithing", VarKey.Player.BONUS_SMITHING_XP),
	MINING(14, "Mining", VarKey.Player.BONUS_MINING_XP),
	HERBLORE(15, "Herblore", VarKey.Player.BONUS_HERBLORE_XP),
	AGILITY(16, "Agility", VarKey.Player.BONUS_AGILITY_XP),
	THIEVING(17, "Thieving", VarKey.Player.BONUS_THIEVING_XP),
	SLAYER(18, "Slayer", VarKey.Player.BONUS_SLAYER_XP),
	FARMING(19, "Farming", VarKey.Player.BONUS_FARMING_XP),
	RUNECRAFTING(20, "Runecrafting", VarKey.Player.BONUS_RUNECRAFTING_XP),
	HUNTER(21, "Hunter", VarKey.Player.BONUS_HUNTER_XP),
	CONSTRUCTION(22, "Construction", VarKey.Player.BONUS_CONSTRUCTION_XP),
	SUMMONING(23, "Summoning", VarKey.Player.BONUS_SUMMONING_XP),
	DUNGEONEERING(24, "Dungeoneering", VarKey.Player.BONUS_DUNGEONEERING_XP, 120),
	DIVINATION(25, "Divination", VarKey.Player.BONUS_DIVINATION_XP);
	
	private final String name;
	private final int id;
	private final int maxLevel;
	private final int bonusXpVarp;
	
	StatType (int id, String name, int bonusXpVarp) {
		this(id, name, bonusXpVarp, 99);
	}

	StatType (int id, String name, int bonusXpVarp, int maxLevel) {
		this.id = id;
		this.name = name;
		this.bonusXpVarp = bonusXpVarp;
		this.maxLevel = maxLevel;
	}
	
	/**
	 * Gets the id of the skill
	 * @return	The id.
	 */
	public int getId () {
		return id;
	}
	
	/**
	 * Gets the name of the skill
	 * @return	The name.
	 */
	public String getName () {
		return name;
	}
	
	/**
	 * Gets the maximum level for the skill
	 * @return	The maximum level.
	 */
	public int getMaxLevel () {
		return maxLevel;
	}
	
	/**
	 * Gets the id of the player variable holding the bonus xp data
	 * @return The varp id
	 */
	public int getBonusXpVarp () {
		return bonusXpVarp;
	}
	
	@Override
	public String toString () {
		return name;
	}
	
	/**
	 * Gets the skill type from a specified ID
	 * @param id The ID of the skill
	 * @return   The SkillType
	 */
	public static StatType getById (int id) {
		if (id >= StatType.values().length || id < 0) {
			return null;
		}
		StatType stat = StatType.values()[id];
		if (stat.id == id) {
			return stat;
		} else {
			for (StatType s : StatType.values()) {
				if (s.id == id) {
					return s;
				}
			}
			return null;
		}
	}
}
