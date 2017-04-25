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
package org.virtue.game.content.friendchats;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
public enum ChannelRank {
	GUEST(-1, "Guest"), FRIEND(0, "Friend"), RECRUIT(1, "Recruit"), CORPORAL(2, "Corporal"), 
	SERGEANT(3, "Sergeant"), LIEUTENANT(4, "Lieutenant"), CAPTAIN(5, "Captain"), 
	GENERAL(6, "General"), OWNER(7, "Channel Owner"), JMOD(127, "Jagex Moderator");
	
	private final int id;
	private final String name;
	
	ChannelRank(int id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public int getId () {
		return id;
	}
	
	public String getName () {
		return name;
	}
	
	public static boolean isAssignable (ChannelRank rank) {
		if (rank == null) {
			return false;
		} else if (rank.equals(OWNER) || rank.equals(JMOD) || rank.equals(GUEST)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Returns the channel rank for the specified serial ID
	 * @param id	The serial ID of the rank
	 * @return	The rank, if it exists. Null otherwise.
	 */
	public static ChannelRank forID (int id) {
		if (id <= values().length && id > -2) {
			ChannelRank rank = values()[id+1];
			if (rank.id == id) {
				return rank;
			}
		}
		for (ChannelRank r : values()) {
			if (r.id == id) {
				return r;
			}
		}
		return null;
	}
}
