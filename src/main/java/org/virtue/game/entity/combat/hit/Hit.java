/**
 * Copyright (c) 2014 RSE Studios
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
package org.virtue.game.entity.combat.hit;

import org.virtue.network.protocol.update.ref.Bar;

/**
 * @author James <skype:sir.james1996>
 * @since 12/3/2014
 */
public class Hit {

	private Bar[] bars;
	private DamageType type;
	private int damage;
	private int customType;
	private int secondaryDamage;
	private int secondaryType;
	private int delay;

	/**
	 * Constructs a new {@code Hit} instance.
	 * 
	 * @param damage
	 *            The damage to send.
	 * @param type
	 *            The {@code HitType} to send.
	 */
	public Hit(int damage, DamageType type) {
		this(damage, 1, type);
	}

	/**
	 * Constructs a new {@code Hit} instance.
	 * 
	 * @param damage
	 *            The amount of damage to send.
	 * @param type
	 *            The {@code HitType} instance to send.
	 */
	public Hit(int damage, int delay, DamageType type, Bar... bars) {
		this.damage = damage;
		this.delay = delay;
		this.type = type;
		this.bars = bars;
	}

	/**
	 * Constructs a new {@code Hit} instance.
	 * 
	 * @param damage
	 *            The amount of damage to send.
	 * @param type
	 *            The {@code HitType} instance to send.
	 */
	public Hit(int damage, int type, int secondaryDamage, int secondaryType,
			int delay, Bar... bars) {
		this.damage = damage;
		this.delay = delay;
		this.type = DamageType.DOUBLE_HIT;
		this.customType = type;
		this.secondaryType = secondaryType;
		this.secondaryDamage = secondaryDamage;
		this.bars = bars;
	}

	/**
	 * @return the bars
	 */
	public Bar[] getBars() {
		return bars;
	}

	/**
	 * @return the type
	 */
	public DamageType getType() {
		return type;
	}

	/**
	 * @return the damage
	 */
	public int getDamage() {
		return damage;
	}

	/**
	 * @param damage
	 *            the damage to set
	 */
	public void setDamage(int damage) {
		this.damage = damage;
	}

	/**
	 * @return the delay
	 */
	public int getDelay() {
		return delay;
	}

	/**
	 * @param delay
	 *            the delay to set
	 */
	public void setDelay(int delay) {
		this.delay = delay;
	}

	/**
	 * @return the secondayDamage
	 */
	public int getSecondaryDamage() {
		return secondaryDamage;
	}

	/**
	 * @param secondayDamage
	 *            the secondayDamage to set
	 */
	public void setSecondayDamage(int secondayDamage) {
		this.secondaryDamage = secondayDamage;
	}

	/**
	 * @return the secondaryType
	 */
	public int getSecondaryType() {
		return secondaryType;
	}

	/**
	 * @param secondaryType
	 *            the secondaryType to set
	 */
	public void setSecondaryType(int secondaryType) {
		this.secondaryType = secondaryType;
	}

	/**
	 * @return the customType
	 */
	public int getCustomType() {
		return customType;
	}

	/**
	 * @param customType
	 *            the customType to set
	 */
	public void setCustomType(int customType) {
		this.customType = customType;
	}

}
