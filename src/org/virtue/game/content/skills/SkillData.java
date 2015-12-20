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

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class SkillData implements GameEventContext {

	private int experience = 0;
	private int currentLevel = 0;
	private int baseLevel = 1;
	private final StatType skill;
	
	public static int[] levelXpNeeded = new int[120];
	
	static {
		int xp = 0;
		for (int level = 1; level <= 120; level++) {
		    int difference = (int) ((double) level + 300.0 * Math.pow(2.0, (double) level / 7.0));
		    xp += difference;
		    levelXpNeeded[level-1] = xp / 4;
		}
	}
	
	public SkillData (StatType skill) {
		this(skill, 0, 1);
	}
	
	public SkillData (StatType skill, int xp, int level) {
		this.skill = skill;
		this.experience = xp;
		this.currentLevel = level;
		calculateBaseLevel();
	}
	
	/**
	 * Gets the id of the skill (the id should be between 1 and the total number of skills)
	 * @return	The id.
	 */
	public StatType getSkill () {
		return skill;
	}
	
	/**
	 * Gets the experience the player has in the skill, as an integer which accounts for 1dp.
	 * @return The experience as an int
	 */
	public int getExperience () {
		return experience;
	}
	
	/**
	 * Gets the experience the player has in the skill
	 * @return	The experience.
	 */
	public float getExperienceFloat () {
		return experience/10.0f;
	}
	
	/**
	 * Gets the current boosted/reduced skill level for the player.
	 * @return	The level.
	 */
	public int getCurrentLevel () {
		return currentLevel;
	}
	
	/**
	 * Gets the player's current base level
	 * @return	The base level
	 */
	public int getBaseLevel () {
		return baseLevel;
	}
	
	/**
	 * Increments the current experience by the specified amount in the format "float". 
	 * As experience is stored as an integer, this will multiply the amount by ten and remove any decimals
	 * @param xpToAdd	The amount of xp to add, represented as a float.
	 */
	public void addExperienceFloat (double xpToAdd) {
		addExperience((int) xpToAdd*10);
	}
	
	/**
	 * Increments the current experience by the specified amount
	 * @param xpToAdd	The amount of xp to add
	 */
	public void addExperience (int xpToAdd) {
		experience += xpToAdd;
		if (experience < 0) {
			experience = 0;
		}	
		calculateBaseLevel();
	}
	
	private void calculateBaseLevel () {		
		for (int i =0;i<skill.getMaxLevel();i++) {
			if ((experience/10) >= levelXpNeeded[i]) {
				continue;
			} else {
				baseLevel = i+1;
				//currentLevel = i+1;
				return;
			}
		}
		baseLevel = skill.getMaxLevel();
	}
	
	public void incrementCurrentLevel (int amount) {
		if (currentLevel + amount > 255) {
			currentLevel = 255;
		} else if (currentLevel + amount < 0) {
			currentLevel = 0;
		}
		currentLevel += amount;
	}
	
	/**
	 * Sets the current level for this skill (the boosted/lowered level)
	 * @param level The level to set
	 */
	public void setCurrentLevel (int level) {
		if (level > 255 || level < 0) {
			throw new IllegalArgumentException("Level must be between 0 and 255");
		}
		currentLevel = level;
	}
	
}
