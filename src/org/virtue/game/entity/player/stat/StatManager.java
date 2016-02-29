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

import java.util.EnumMap;
import java.util.List;

import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.enumtype.EnumTypeList;
import org.virtue.config.objtype.ItemType;
import org.virtue.config.objtype.ItemTypeList;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class StatManager {
	
	private EnumMap<Stat, PlayerStat> stats = new EnumMap<Stat, PlayerStat>(Stat.class);
	
	private Player player;
		
	public StatManager (Player player) {
		this.player = player;
		setInitialLevels();
		@SuppressWarnings("unchecked")
		List<PlayerStat> savedValues = (List<PlayerStat>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.SKILL);
		if (savedValues != null) {
			for (PlayerStat entry : savedValues) {
				stats.put(entry.getType(), entry);
			}
		}
	}
	
	/**
	 * Sets the current level of the specified skill to the specified level
	 * @param stat The stat to set the level of
	 * @param level The desired level (from 0 to 255)
	 */
	public void setLevel (Stat stat, int level) {
		PlayerStat data = stats.get(stat);
		data.setLevel(level);
		player.getDispatcher().sendStat(data);
	}
	
	/**
	 * Increases (or decreases) the current level of a skill by the specified amount
	 * @param stat The stat to increase/decrease
	 * @param amount The amount to increase by, or a negative value to decrease
	 */
	public void boostStat (Stat stat, int amount) {
		PlayerStat skillData = stats.get(stat);
		if (amount+skillData.getLevel() < 0) {
			skillData.setLevel(0);
		} else if (amount+skillData.getLevel() > 255) {
			skillData.setLevel(255);
		} else {
			skillData.setLevel(skillData.getLevel()+amount);
		}
		player.getDispatcher().sendStat(skillData);
	}
	
	/**
	 * Restores the specified stat to its base level
	 * @param stat The stat to restore
	 */
	public void restore (Stat stat) {
		PlayerStat statData = stats.get(stat);
		statData.setLevel(statData.getBaseLevel());
		player.getDispatcher().sendStat(statData);		
	}
	
	/**
	 * Adds experience to the specified skill
	 * @param stat The stat to add experience to
	 * @param totalXpToAdd The amount of experience to add
	 */
	public void addExperience (Stat stat, double totalXpToAdd) {
		totalXpToAdd *= Constants.GLOBAL_XP_MULTIPLYER;
		PlayerStat skillData = stats.get(stat);
		double currentXp = skillData.getExperience()/10d;
		if (currentXp >= 200_000_000 - totalXpToAdd) {
			totalXpToAdd = 200_000_000 - currentXp;
		}
		if (totalXpToAdd == 0) {
			return;//Don't add xp past the 200m cap.
		}
		int levelBefore = skillData.getBaseLevel();
		int newXp = skillData.getExperience() + (int) (totalXpToAdd*10);
		skillData.setExperience(newXp);
		int levelAfter = skillData.getBaseLevel();
		if (levelAfter > levelBefore) {//Player has advanced in level
			//System.out.println("levelBefore="+levelBefore+", levelAfter="+levelAfter);
			boostStat(stat, levelAfter - levelBefore);
			handleAdvancement(skillData, (levelAfter - levelBefore));
			if (stat == Stat.CONSTITUTION) {
				player.getImpactHandler().setMaximumLifepoints(levelAfter * 100);
			}
		}
		player.getDispatcher().sendStat(skillData);
	}
	
	/**
	 * Gets the current level of the specified skill. 
	 * This level will change if the player receives temporary boosts.
	 * @param skillType The skill to check
	 * @return The skill level, or 1 if the skill has not been loaded
	 */
	public int getCurrentLevel (Stat statType) {
		PlayerStat data = stats.get(statType);
		return data == null ? 1 : data.getLevel();
	}	

	/**
	 * Gets the base level of the specified skill.
	 * This level is calculated by the player's experience, and will not change with temporary boosts
	 * @param skillType The skill to check
	 * @return The skill level, or 1 if the skill has not been loaded
	 */
	public int getBaseLevel (Stat skillType) {
		PlayerStat data = stats.get(skillType);
		return data == null ? 1 : data.getBaseLevel();
	}
	
	/**
	 * Gets the experience the player has gained in the specified skill.
	 * Note: The value returned by this method is 10*xp, to account for the decimal. It should be divided by 10 if the actual experience is required.
	 * @param skillType The skill to check 
	 * @return The experience, or 0 if the skill has not been loaded
	 */
	public int getExperience (Stat skillType) {
		PlayerStat data = stats.get(skillType);
		return data == null ? 0 : data.getExperience();
	}
	
	/**
	 * Gets the experience the player has gained in the specified skill
	 * @param skillType The skill to check 
	 * @return The experience, or 0 if the skill has not been loaded
	 */
	public double getRealExperience (Stat skillType) {
		PlayerStat data = stats.get(skillType);
		return data == null ? 0 : data.getExperience()/10f;
	}
	
	/**
	 * Initialises the player's skills. This method should ONLY be called when the account is first created
	 * Sets all experience to zero (and levels to 1), except for hitpoints which start at 10.
	 */
	public void setInitialLevels () {
		for (Stat s : Stat.values()) {
			if (s.equals(Stat.CONSTITUTION)) {
				stats.put(s, new PlayerStat(s, 11840, 10));
			} else {
				stats.put(s, new PlayerStat(s));
			}
		}
	}

	/**
	 * Sends the data for all skills to the client. Should be called on login
	 */
	public void sendAllSkills () {
		for (PlayerStat skill : stats.values()) {
			player.getDispatcher().sendStat(skill);
		}
	}
	
	/**
	 * Returns whether the player has the requirements to craft the product of the specified ID
	 * @param productID The itemType ID of the product to check
	 * @return True if the player meets all the requirements, false otherwise
	 */
	public boolean canCraft (int productID) {
		ItemType itemType = ItemTypeList.getInstance().list(productID);
		if (itemType == null) {
			return false;
		}
		int key = itemType.getParam(2640, 0);
		int value = itemType.getParam(2645, 0);
		int reqID = 1;
		while (key > 0) {
			if (!checkRequirement(key, value, itemType.getParam(317, 0), itemType.getParam(3649, 1) == 1, reqID)) {
				return false;
			}
			reqID++;
			switch (reqID) {
				case 2:
					key = itemType.getParam(2641, 0);
					value = itemType.getParam(2646, 0);
					break;
				case 3:
					key = itemType.getParam(2642, 0);
					value = itemType.getParam(2647, 0);
					break;
				case 4:
					key = itemType.getParam(2643, 0);
					value = itemType.getParam(2648, 0);
					break;
				case 5:
					key = itemType.getParam(2644, 0);
					value = itemType.getParam(2649, 0);
					break;
				default:
					key = 0;
			}
		}
		return true;
	}
	
	private boolean checkRequirement (int key, int value, int unk1, boolean boostable, int reqID) {
		EnumType levelEnum = EnumTypeList.list(681);
		if (levelEnum == null) {
			throw new RuntimeException("Level enum is null!");
		}
		if (key > 0 && key < 61) {
			if (boostable) {
				if (getCurrentLevel(Stat.getById(levelEnum.getValueInt(key))) >= value) {
					// || reqID == 0 && script_7107(unk1) >= value
					return true;
				}
			} else if (getBaseLevel(Stat.getById(levelEnum.getValueInt(key))) >= value) {
				return true;
			}
			return false;
		}
		if (key == 61) {
			return false;
			//int v0 = getEnum('i', ':', 812, value);
			//cs2method_10545();
			//return v0;
		}
		if (key == 62) {
			return false;
			//return script_7163(value);//TODO: Implement misc requirements
		}
		return true;
	}
	
	public int getCombatLevel() {
		int attack = getBaseLevel(Stat.ATTACK);
		int defence = getBaseLevel(Stat.DEFENCE);
		int strength = getBaseLevel(Stat.STRENGTH);
		int constitution = getBaseLevel(Stat.CONSTITUTION);
		int prayer = getBaseLevel(Stat.PRAYER);
		int summoning = getBaseLevel(Stat.SUMMONING);
		int ranged = getBaseLevel(Stat.RANGED);
		int magic = getBaseLevel(Stat.MAGIC);
		
		int max = Math.max(strength + attack, Math.max(magic * 2, ranged * 2));
		int combat = (int) (((max * 1.3) + defence + constitution
				+ (prayer / 2) + (summoning / 2)) / 4);
		return combat;
	}
	
	public int getTotalLevel() {
		int totalLevel = 0;
		for (Stat stat : Stat.values()) {
			totalLevel += getBaseLevel(stat);
		}
		return totalLevel;
	}
	
	public long getTotalExperience() {
		long totalExp = 0;
		PlayerStat data;
		for (int index = 0; index < Stat.values().length; index++) {
			data = stats.get(index);
			if (data != null) {
				totalExp += data.getExperience();
			}
		}
		return totalExp;
	}

	/**
	 * Handles the player advancing in the specified number of levels
	 * @param stat The stat the player has advanced in
	 * @param advancement The number of levels advanced
	 */
	private void handleAdvancement (PlayerStat stat, int advancement) {
		String message;
		int statPos = EnumTypeList.list(1482).getValueInt(stat.getType().getId());
		if (advancement == 1) {
			EnumType levelUpEnum = EnumTypeList.list(1477);
			message = levelUpEnum.getValueString(statPos);
		} else {
			EnumType startEnum = EnumTypeList.list(3644);
			EnumType endEnum = EnumTypeList.list(3645);
			message = startEnum.getValueString(statPos)+advancement+endEnum.getValueString(statPos);
		}
		
		if(stat.getBaseLevel() == stat.getType().getLevelCap()) {
			World.getInstance().sendBroadcast(player.getName().trim()+" has achieved "+stat.getBaseLevel()+" "+stat.getType().getName());
		}
		player.getDispatcher().sendGameMessage(message+" You have reached level "+stat.getBaseLevel()+".");
		player.queueUpdateBlock(new SpotAnimationBlock(3, 2457, 230, 0, 0));//Height: 230, speed: 0, rotation: 0, unk1=0
		player.queueUpdateBlock(new SpotAnimationBlock(4, 2457, 270, 10, 3));//Height: 270, speed: 10, rotation: 3, unk1=15
		player.queueUpdateBlock(new SpotAnimationBlock(5, 2457, 300, 30, 6));//Height: 300, speed: 30, rotation: 6, unk1=15
		player.getAppearance().refresh();
	}
}
