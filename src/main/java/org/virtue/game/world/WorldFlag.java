/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.world;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/03/2016
 */
public enum WorldFlag {
	/**
	 * Activates all members-only features on the world
	 */
	MEMBERS(0),
	
	/**
	 * Only quick chat may be used on the world
	 */
	QUICKCHAT(1),
	
	/**
	 * Lootshare is available on the world
	 */
	LOOTSHARE(3),
	
	/**
	 * At least 1500 total level is required to enter this world
	 */
	HIGHLEVEL_1500(7),
	VETERANS(8),
	
	/**
	 * This is a beta world, used for testing features
	 */
	BETA(16),
	
	/**
	 * At least 2000 total level is required to enter this world
	 */
	HIGHLEVEL_2000(18),
	
	/**
	 * At least 2400 total level is required to enter this world
	 */
	HIGHLEVEL_2400(19),
	
	/**
	 * Only VIP members may enter this world
	 */
	VIP(20),
	
	/**
	 * Only legacy combat may be used on this world
	 */
	LEGACY(22),
	
	/**
	 * Only EOC combat may be used on this world
	 */
	EOC(23);
	
	private int bit;
	
	WorldFlag (int bit) {
		this.bit = bit;
	}
	
	public int getBit () {
		return bit;
	}
	
	public int getMask () {
		return 1 << bit;
	}
	
}
