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

import java.util.EnumMap;
import java.util.List;

import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.cache.def.impl.EnumType;
import org.virtue.cache.def.impl.ItemType;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ItemTypeList;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.protocol.update.block.GraphicsBlock;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class SkillManager {
	
	private EnumMap<StatType, SkillData> skills = new EnumMap<StatType, SkillData>(StatType.class);
	
	private Player player;
		
	public SkillManager (Player player) {
		this.player = player;
		setInitialLevels();
		@SuppressWarnings("unchecked")
		List<SkillData> savedValues = (List<SkillData>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.SKILL);
		if (savedValues != null) {
			for (SkillData entry : savedValues) {
				if (entry.getCurrentLevel() > 0 && entry.getCurrentLevel() < 256) {
					skills.put(entry.getSkill(), entry);
				}
			}
		}
	}
	
	/**
	 * Sets the current level of the specified skill to the specified level
	 * @param stat The stat to set the level of
	 * @param level The desired level (from 0 to 255)
	 */
	public void setLevel (StatType stat, int level) {
		SkillData skillData = skills.get(stat);
		skillData.setCurrentLevel(level);
		player.getDispatcher().sendStat(skillData);
	}
	
	/**
	 * Increases (or decreases) the current level of a skill by the specified amount
	 * @param skillType The skill to increase/decrease
	 * @param amount The amount to increase by, or a negative value to decrease
	 */
	public void boostSkill (StatType skillType, int amount) {
		SkillData skillData = skills.get(skillType);
		if (amount+skillData.getCurrentLevel() < 0) {
			skillData.setCurrentLevel(0);
		} else if (amount+skillData.getCurrentLevel() > 255) {
			skillData.setCurrentLevel(255);
		} else {
			skillData.setCurrentLevel(skillData.getCurrentLevel()+amount);
		}
		player.getDispatcher().sendStat(skillData);
	}
	
	/**
	 * Restores the specified stat to its base level
	 * @param stat The stat to restore
	 */
	public void restore (StatType stat) {
		SkillData statData = skills.get(stat);
		statData.setCurrentLevel(statData.getBaseLevel());
		player.getDispatcher().sendStat(statData);		
	}
	
	/**
	 * Adds experience to the specified skill
	 * @param skill	 The skill to add experience to
	 * @param totalXpToAdd The the amount of experience to add
	 */
	public void addExperience (StatType skillType, double totalXpToAdd) {
		totalXpToAdd *= Constants.GLOBAL_XP_MULTIPLYER;
		SkillData skillData = skills.get(skillType);
		double currentXp = skillData.getExperienceFloat();
		if (currentXp >= 200_000_000 - totalXpToAdd) {
			totalXpToAdd = 200_000_000 - currentXp;
		}
		if (totalXpToAdd == 0) {
			return;//Don't add xp past the 200m cap.
		}
		int levelBefore = skillData.getBaseLevel();
		skillData.addExperienceFloat(totalXpToAdd);
		int levelAfter = skillData.getBaseLevel();
		if (levelAfter > levelBefore) {//Player has advanced in level
			//System.out.println("levelBefore="+levelBefore+", levelAfter="+levelAfter);
			skillData.incrementCurrentLevel(levelAfter - levelBefore);
			handleAdvancement(skillData, (levelAfter - levelBefore));
			if (skillType == StatType.CONSTITUTION) {
				player.getImpactHandler().setMaximumLifepoints(levelAfter * 100);
			}
		}
		player.getDispatcher().sendStat(skillData);
	}
	
	/**
	 * Adds bonus experience to the specified skill
	 * @param skillType The skill to add bonus experience to
	 * @param xpToAdd The amount of bonus experience to add
	 */
	public void addBonusExperience(StatType skillType, double xpToAdd) {
		player.getVars().incrementVarp(skillType.getBonusXpVarp(), (int) xpToAdd);
	}
	
	/**
	 * Gets the current level of the specified skill. 
	 * This level will change if the player receives temporary boosts.
	 * @param skillType The skill to check
	 * @return The skill level, or 1 if the skill has not been loaded
	 */
	public int getCurrentLevel (StatType skillType) {
		SkillData data = skills.get(skillType);
		return data == null ? 1 : data.getCurrentLevel();
	}	

	/**
	 * Gets the base level of the specified skill.
	 * This level is calculated by the player's experience, and will not change with temporary boosts
	 * @param skillType The skill to check
	 * @return The skill level, or 1 if the skill has not been loaded
	 */
	public int getBaseLevel (StatType skillType) {
		SkillData data = skills.get(skillType);
		return data == null ? 1 : data.getBaseLevel();
	}
	
	/**
	 * Gets the experience the player has gained in the specified skill.
	 * Note: The value returned by this method is 10*xp, to account for the decimal. It should be divided by 10 if the actual experience is required.
	 * @param skillType The skill to check 
	 * @return The experience, or 0 if the skill has not been loaded
	 */
	public int getExperience (StatType skillType) {
		SkillData data = skills.get(skillType);
		return data == null ? 0 : data.getExperience();
	}
	
	/**
	 * Gets the experience the player has gained in the specified skill
	 * @param skillType The skill to check 
	 * @return The experience, or 0 if the skill has not been loaded
	 */
	public double getRealExperience (StatType skillType) {
		SkillData data = skills.get(skillType);
		return data == null ? 0 : data.getExperienceFloat();
	}
	
	/**
	 * Initialises the player's skills. This method should ONLY be called when the account is first created
	 * Sets all experience to zero (and levels to 1), except for hitpoints which start at 10.
	 */
	public void setInitialLevels () {
		for (StatType s : StatType.values()) {
			if (s.equals(StatType.CONSTITUTION)) {
				skills.put(s, new SkillData(s, 11840, 10));
			} else {
				skills.put(s, new SkillData(s));
			}
		}
	}

	/**
	 * Sends the data for all skills to the client. Should be called on login
	 */
	public void sendAllSkills () {
		for (SkillData skill : skills.values()) {
			player.getDispatcher().sendStat(skill);
		}
	}
	
	/**
	 * Returns whether the player has the requirements to craft the product of the specified ID
	 * @param productID The itemType ID of the product to check
	 * @return True if the player meets all the requirements, false otherwise
	 */
	public boolean canCraft (int productID) {
		ItemType itemType = ItemTypeList.list(productID);
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
				if (getCurrentLevel(StatType.getById(levelEnum.getValueInt(key))) >= value) {
					// || reqID == 0 && script_7107(unk1) >= value
					return true;
				}
			} else if (getBaseLevel(StatType.getById(levelEnum.getValueInt(key))) >= value) {
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
		int attack = getBaseLevel(StatType.ATTACK);
		int defence = getBaseLevel(StatType.DEFENCE);
		int strength = getBaseLevel(StatType.STRENGTH);
		int constitution = getBaseLevel(StatType.CONSTITUTION);
		int prayer = getBaseLevel(StatType.PRAYER);
		int summoning = getBaseLevel(StatType.SUMMONING);
		int ranged = getBaseLevel(StatType.RANGED);
		int magic = getBaseLevel(StatType.MAGIC);
		
		int max = Math.max(strength + attack, Math.max(magic * 2, ranged * 2));
		int combat = (int) (((max * 1.3) + defence + constitution
				+ (prayer / 2) + (summoning / 2)) / 4);
		return combat;
	}
	
	public int getTotalLevel() {
		int totalLevel = 0;
		for (StatType skill : StatType.values()) {
			totalLevel += getBaseLevel(skill);
		}
		return totalLevel;
	}
	
	public long getTotalExperience() {
		long totalExp = 0;
		SkillData data;
		for (int index = 0; index < StatType.values().length; index++) {
			data = skills.get(index);
			if (data != null) {
				totalExp += data.getExperienceFloat();
			}
		}
		return totalExp;
	}

	/**
	 * Handles the player advancing in the specified number of levels
	 * @param skill The skill the player has advanced in
	 * @param advancement The number of levels advanced
	 */
	private void handleAdvancement (SkillData skill, int advancement) {
		boolean multiple = advancement != 1;
		String levelPart = (multiple ? advancement : StringUtility.startsWithVowel(skill.getSkill().getName()) ? "an" : "a")+" "+skill.getSkill().getName()+" level"+(multiple ? "s" : "");
		//skill.setCurrentLevel(skill.getCurrentLevel()+advancement);
		if(skill.getBaseLevel() == 99 || skill.getBaseLevel() == 120) {
			World.getInstance().sendBroadcast(player.getName().trim()+" has achieved "+skill.getBaseLevel()+" "+skill.getSkill().getName());
		}
		player.getDispatcher().sendGameMessage("You have advanced "+levelPart+"! You have reached level "+skill.getBaseLevel()+".");
		player.queueUpdateBlock(new GraphicsBlock(3, 2457, 230, 0, 0));//Height: 230, speed: 0, rotation: 0, unk1=0
		player.queueUpdateBlock(new GraphicsBlock(4, 2457, 270, 10, 3));//Height: 270, speed: 10, rotation: 3, unk1=15
		player.queueUpdateBlock(new GraphicsBlock(5, 2457, 300, 30, 6));//Height: 300, speed: 30, rotation: 6, unk1=15
		player.getAppearance().refresh();
	}
}
