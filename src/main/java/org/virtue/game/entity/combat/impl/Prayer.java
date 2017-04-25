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
package org.virtue.game.entity.combat.impl;

import org.virtue.config.structtype.StructType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Feb 6, 2015
 */
public class Prayer {

	/**
	 * Type
	 */
	private StructType type;
	
	/**
	 * StructType
	 * @return
	 */
	public StructType getType () {
		return type;
	}
	
	/**
	 * The {@link Entity} for this {@link Prayer}
	 */
	private Player player;
	
	/**
	 * Using Prayer True/False
	 */
	public boolean usingPrayer = false;
	
	/**
	 * The amount of prayer points this {@link Entity} has
	 */
	private int prayer = -1;
	
	private int prayerEnergy = 0;
	
	private int[] spriteIDS = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 1, 0, 3, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	
	double[] prayerDrainRate = { 1.2, 1.2, 1.2, 1.2, 1.2, 0.6, 0.6, 0.6, 3.6, 1.8, 1.8, 0.6, 0.6, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 1.2, 0.6, 0.18, 0.18, 0.24, 0.15, 0.2, 0.18 };
	
	/**
	 * @param player
	 */
	public Prayer(Player player) {
		this.player = player;
	}
	
	/**
	 * Activates Prayer
	 * @param slot
	 */
	public void activate(int slot) {
		player.getHeadIcons().setIcon(440, spriteIDS[slot]);
		player.getHeadIcons().refresh();
		usingPrayer = true;
	}
	
	/**
	 * De-activates Prayer
	 * @param slot
	 */
	public void deactivate(int slot) {
		player.getHeadIcons().reset();
		player.getHeadIcons().refresh();
		usingPrayer = false;
	}
	
	/**
	 * @return the prayer
	 */
	public int getPrayerPoints() {
		return prayer;
	}

	/**
	 * @param prayer the prayer to set
	 */
	public void setPrayerPoints(int prayer) {
		if ((this.prayer - prayer < 0) && (this.prayer != -1))
			prayer = 0;
		
		this.prayer = prayer;
		
		if (player instanceof Player) {
			((Player) player).getDispatcher().sendPrayer(this.prayer * 10);
		}
	}
	
	public boolean drainPrayer() {//TODO Prayer Draining
		float drain = getPrayerPoints();
		
		prayerEnergy -= drain;
		if (prayerEnergy <= 0) {
			//usingPrayer = false;
			//setPrayerPoints(0);
			return false;
		} else {
			usingPrayer = true;
			player.getDispatcher().sendPrayer((int) prayerEnergy);
			return true;
		}
	}
}
