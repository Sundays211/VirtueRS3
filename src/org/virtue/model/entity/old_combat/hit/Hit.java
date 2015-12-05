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
package org.virtue.model.entity.old_combat.hit;

import org.virtue.model.entity.update.ref.Bar;

/**
 * @author James <skype:sir.james1996>
 * @since 12/3/2014
 */
public class Hit {

	public enum HitType {//141
		REGULAR_DAMAGE(144/*0x3*/), REFLECTED_DAMAGE(146/*0x4*/), 
		ABSORB_DAMAGE(148/*0x5*/), POISON_DAMAGE(147/*0x6*/), 
		DESEASE_DAMAGE(0x7), MISSED(141/*0x8*/),
		HEALED_DAMAGE(143/*0x9*/), CANNON_DAMAGE(145/*0xd*/), 
		//Option 1: melee=132, ranged=135, mage=138
		//Option 2: melee=149, ranged=152, mage=155
		//Option 3: melee=150, ranged=153, mage=156
		MELEE_DAMAGE(132/*0x30*/), RANGE_DAMAGE(135/*0x31*/),
		MAGIC_DAMAGE(138/*0x32*/), INSTANT_KILL(0x36), 
		HIDDEN_HIT(0x7ffe), DOUBLE_HIT(0x7fff),
		MELEE_DAMAGE_2(150), MAGIC_DAMAGE_2(156), RANGE_DAMAGE_2(153);

		private int hitMask;

		/**
		 * Constructs a new {@code HitType} instance.
		 * 
		 * @param hitMask
		 *            The hit mask id.
		 */
		private HitType(int hitMask) {
			this.hitMask = hitMask;
		}

		/**
		 * Gets the hit mask id.
		 * 
		 * @return The hit mask id.
		 */
		public int getMask() {
			return hitMask;
		}
	}

	private Bar[] bars;
	private HitType type;
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
	public Hit(int damage, HitType type) {
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
	public Hit(int damage, int delay, HitType type, Bar... bars) {
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
		this.type = HitType.DOUBLE_HIT;
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
	public HitType getType() {
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
