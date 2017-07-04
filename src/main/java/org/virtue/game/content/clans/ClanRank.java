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
package org.virtue.game.content.clans;

/**
 * Represents a player's rank within a clan
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public enum ClanRank {
	GUEST(-1, "Guest", false), RECRUIT(0, "Recruit", false), CORPORAL(1, "Corporal", false), 
	SERGEANT(2, "Sergeant", false), LIEUTENANT(3, "Lieutenant", false), CAPTAIN(4, "Captain", false), 
	GENERAL(5, "General", false), ADMIN(100, "Admin", true), ORGANISER(101, "Organiser", true),
	COORDINATOR(102, "Coordinator", true), OVERSEER(103, "Overseer", true), 
	DEPUTY_OWNER(125,"Deputy Owner", true),  OWNER(126, "Owner", true), JMOD(127, "Jagex Moderator", true);
	
	private final byte id;
	private final String name;
	
	private final boolean isAdmin;
	
	ClanRank (int id, String name, boolean isAdmin) {
		this.id = (byte) id;
		this.name = name;
		this.isAdmin = isAdmin;
	}
	
	/**
	 * Gets the serial ID of the rank
	 * @return The rank ID
	 */
	public byte getID () {
		return id;
	}
	
	/**
	 * Gets the name of the rank, for display purposes
	 * @return The name
	 */
	public String getName () {
		return name;
	}
	
	/**
	 * Find out whether the specified rank holds admin abilities within the clan
	 * @return True if the rank holds admin abilities, false otherwise
	 */
	public boolean isAdmin () {
		return isAdmin;
	}
	
	public static ClanRank forID (int id) {
		if (id <= ClanRank.values().length && id > -2) {
			ClanRank rank = ClanRank.values()[id+1];
			if (rank.id == id) {
				return rank;
			}
		}
		for (ClanRank r : ClanRank.values()) {
			if (r.id == id) {
				return r;
			}
		}
		return null;
	}
}
