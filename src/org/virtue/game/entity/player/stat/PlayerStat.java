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

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class PlayerStat implements GameEventContext {	
	/**
	 * The maximum amount of experience a player can gain in any stat. Includes 1dp, so 200 is actually 20.0xp
	 */
	public static final int EXPERIENCE_CAP = 2_000_000_000;

	private int xp = 0;
	private int level = 0;
	private int baseLevel = 1;
	private final Stat type;
	
	public PlayerStat (Stat stat) {
		this(stat, 0, 1);
	}
	
	public PlayerStat (Stat skill, int xp, int level) {
		this.type = skill;
		this.xp = xp;
		this.level = level;
		calculateBaseLevel();
	}
	
	/**
	 * Gets the id of the skill (the id should be between 1 and the total number of skills)
	 * @return	The id.
	 */
	public Stat getType () {
		return type;
	}
	
	/**
	 * Gets the experience the player has in the skill, as an integer which accounts for 1dp.
	 * @return The experience as an int
	 */
	public int getExperience () {
		return xp;
	}
	
	/**
	 * Sets the experience the player has in the skill. Must be an integer acounting for 1dp (eg 20.0 is 200)
	 * @param xp The experience to set
	 */
	public void setExperience(int xp) {
		this.xp = xp;
		if (xp < 0) {
			xp = 0;
		} else if (xp > EXPERIENCE_CAP) {
			xp = EXPERIENCE_CAP;
		}
		calculateBaseLevel();
	}
	
	/**
	 * Gets the current boosted/reduced skill level for the player.
	 * @return	The level.
	 */
	public int getLevel () {
		return level;
	}
	
	/**
	 * Gets the player's current base level
	 * @return	The base level
	 */
	public int getBaseLevel () {
		return baseLevel;
	}
	
	private void calculateBaseLevel () {
		baseLevel = type.getBaseLevel(xp/10);
	}
	
	/**
	 * Sets the current level for this skill (the boosted/lowered level)
	 * @param level The level to set
	 */
	public void setLevel (int level) {
		if (level > 255 || level < 0) {
			throw new IllegalArgumentException("Level must be between 0 and 255");
		}
		this.level = level;
	}
	
}
