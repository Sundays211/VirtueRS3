/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.network.protocol.update.ref;

import org.virtue.game.entity.Entity;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @author Emperors
 * @since Nov 15, 2014
 */
public class Bar {

	/**
	 * The Default Hitpoints bar.
	 */
	public static final int HITPOINTS = 0;

	/**
	 * The Adrenaline bar type.
	 */
	public static final int ADRENALINE = 7;

	private int type;
	
	private int currentLifepoints;
	
	private int newLifepoints;
	
	private int delay;
	
	/**
	 * The speed of updating changes (in 20ms cycles).
	 */
	private int speed = 0;

	/**
	 * Constructs a new {@code Bar} instance.
	 * 
	 * @param mask
	 */
	public Bar(int mask) {
		this(mask, 1, 1, 0);
	}

	/**
	 * Constructs a new {@code Bar} instance.
	 * 
	 * @param mask
	 */
	public Bar(int mask, int current, int newLifepoints, int delay) {
		this.type = mask;
		this.currentLifepoints = current;
		this.newLifepoints = newLifepoints;
		this.delay = delay;
	}

	/**
	 * Gets the currentLifepoints value.
	 * @return The currentLifepoints.
	 */
	public int getCurrentLifepoints() {
		return currentLifepoints;
	}

	/**
	 * Sets the currentLifepoints value.
	 * @param currentLifepoints The currentLifepoints to set.
	 */
	public void setCurrentLifepoints(int currentLifepoints) {
		this.currentLifepoints = currentLifepoints;
	}

	/**
	 * Gets the newLifepoints value.
	 * @return The newLifepoints.
	 */
	public int getNewLifepoints() {
		return newLifepoints;
	}

	/**
	 * Sets the newLifepoints value.
	 * @param newLifepoints The newLifepoints to set.
	 */
	public void setNewLifepoints(int newLifepoints) {
		this.newLifepoints = newLifepoints;
	}

	/**
	 * Gets the delay value.
	 * @return The delay.
	 */
	public int getDelay() {
		return delay;
	}

	/**
	 * Sets the delay value.
	 * @param delay The delay to set.
	 */
	public void setDelay(int delay) {
		this.delay = delay;
	}

	/**
	 * @return the mask
	 */
	public int getType() {
		return type;
	}

	/**
	 * Gets the percentage of a specified bar.
	 * 
	 * @param p The player to get for.
	 * @return The percentage of the bar.
	 */
	public int getPercentage(Entity e) {
		boolean adrenalineBar = this.equals(Bar.ADRENALINE);
		int percentage = 0;
		if (adrenalineBar) {
			percentage = e.getCombatSchedule().getAdrenaline() * 255 / 100;
		} else {
			int hitpoints = e.getImpactHandler().getLifepoints();
			int maxHp = e.getImpactHandler().getMaximumLifepoints();
			percentage = maxHp == 0 ? 0 : (hitpoints * 255) / maxHp;
		}
		return percentage;
	}

	/**
	 * Gets the max percentage of the bar.
	 * 
	 * @return The max percent.
	 */
	public int getMaxPercentage() {
		return 255;
	}

	/**
	 * If we should display the current bar.
	 * 
	 * @param p
	 *            The player to check for.
	 * @return If we should display the bar.
	 */
	public boolean shouldDisplay(Entity e) {
		if (this.equals(Bar.ADRENALINE)) {
			return e.getCombatSchedule().getAdrenaline() > 0;
		}
		return true;
	}

	/**
	 * Gets the speed value.
	 * @return The speed.
	 */
	public int getSpeed() {
		return speed;
	}

	/**
	 * Sets the speed value.
	 * @param speed The speed to set.
	 */
	public void setSpeed(int speed) {
		this.speed = speed;
	}

}
