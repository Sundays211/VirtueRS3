/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.content.chat;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 9/03/2016
 */
public enum ChatCrownType {
	NONE(0, -1, true, false, true),
	PLAYER_MOD(1, 0, true, true, true),
	STAFF_MOD(2, 1, true, true, false),
	LOCAL_MOD(3, 8, false, true, true),
	PREMIER_CLUB(4, 9, false, false, true),
	PREMIER_CLUB_PLAYER_MOD(5, 10, false, true, true),
	IRONMAN(6, 11, false, false, true),
	HARDCORE(7, 12, false, false, true),
	HARDCORE_IRONMAN(8, 13, false, false, true);
	
	private int id;

	ChatCrownType(int id, int icon, boolean bool, boolean bool_1_, boolean bool_2_) {
		this.id = id;
	}
	
	public int getId () {
		return id;
	}
}
