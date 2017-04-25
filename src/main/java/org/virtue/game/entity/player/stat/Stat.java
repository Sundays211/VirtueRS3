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
package org.virtue.game.entity.player.stat;

import org.virtue.config.defaults.PlayerSkillXPTable;
import org.virtue.config.defaults.SkillDefaults;
import org.virtue.config.defaults.PlayerSkill;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public enum Stat {
	ATTACK(0, "Attack"),
	DEFENCE(1, "Defence"),
	STRENGTH(2, "Strength"),
	CONSTITUTION(3, "Constitution"),
	RANGED(4, "Ranged"),
	PRAYER(5, "Prayer"),
	MAGIC(6, "Magic"),
	COOKING(7, "Cooking"),
	WOODCUTTING(8, "Woodcutting"),
	FLETCHING(9, "Fletching"),
	FISHING(10, "Fishing"),
	FIREMAKING(11, "Firemaking"),
	CRAFTING(12, "Crafting"),
	SMITHING(13, "Smithing"),
	MINING(14, "Mining"),
	HERBLORE(15, "Herblore"),
	AGILITY(16, "Agility"),
	THIEVING(17, "Thieving"),
	SLAYER(18, "Slayer"),
	FARMING(19, "Farming"),
	RUNECRAFTING(20, "Runecrafting"),
	HUNTER(21, "Hunter"),
	CONSTRUCTION(22, "Construction"),
	SUMMONING(23, "Summoning"),
	DUNGEONEERING(24, "Dungeoneering"),
	DIVINATION(25, "Divination"),
	INVENTION(26, "Invention");
	
	private final String name;
	private final int id;
	private int levelCap;
	private int initialLevel;
	private PlayerSkillXPTable xpCurve;

	Stat (int id, String name) {
		this.id = id;
		this.name = name;
		this.levelCap = 99;
		this.xpCurve = PlayerSkillXPTable.DEFAULT;
		this.initialLevel = 1;
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
	 * @return The level cap.
	 */
	public int getLevelCap () {
		return levelCap;
	}

	/**
	 * Gets the base level for the given xp
	 * @param xp The xp to check
	 * @return The base level
	 */
	public int getBaseLevel(int xp) {
		int level = xpCurve.levelForXp(xp)+initialLevel;
		return level > levelCap ? levelCap : level;
	}

	@Override
	public String toString () {
		return name;
	}
	
	public static void setDefaults (SkillDefaults defaults) {
		for (Stat s : values()) {
			PlayerSkill type = defaults.getSkill(s.id);
			s.levelCap = type.getLevelCap();
			s.xpCurve = type.getXpTable();
			s.initialLevel = type.getInitialLevel();
		}
	}
	
	/**
	 * Gets the skill type from a specified ID
	 * @param id The ID of the skill
	 * @return   The SkillType
	 */
	public static Stat getById (int id) {
		if (id >= Stat.values().length || id < 0) {
			return null;
		}
		Stat stat = Stat.values()[id];
		if (stat.id == id) {
			return stat;
		} else {
			for (Stat s : Stat.values()) {
				if (s.id == id) {
					return s;
				}
			}
			return null;
		}
	}
}
