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
package org.virtue.network.event.context.impl.out;

import org.virtue.model.content.social.clan.ClanRank;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/12/2014
 */
public class ClanSettingsEventContext implements GameEventContext {

	public static class Member {
		
		private final String displayName;
		private final ClanRank rank;
		private final int varValue;
		private final int joinDay;
		
		
		/**
		 * Constructs a new {@code User} object for use within the {@code ClanSettingsPacket}
		 * @param displayName The display name of the player
		 * @param rank The player's rank within the clan
		 * @param varValue	The var data for this clan member
		 * @param joinDay The day on which the member joined the clan
		 */
		public Member (String displayName, ClanRank rank, int varValue, int joinDay) {
			this.displayName = displayName;
			this.rank = rank;
			this.varValue = varValue;
			this.joinDay = joinDay;
		}
		
		/**
		 * Gets the display name of the player
		 * @return	The display name
		 */
		public String getDisplayName () {
			return displayName;
		}
		
		/**
		 * Gets the rank of the player within the clan
		 * @return	The rank
		 */
		public ClanRank getRank () {
			return rank;
		}
		
		/**
		 * Gets the variable data for this clan member
		 * @return	The varValue data
		 */
		public int getVarValue () {
			return varValue;
		}
		
		/**
		 * Gets the day on which the member joined the clan
		 * @return	The join day
		 */
		public int getJoinDay () {
			return joinDay;
		}
	}
	
	public static class Variable {
		
		private final int key;
		private final Object value;
		
		public Variable (int key, Object value) {
			this.key = key;
			this.value = value;
		}
		
		public int getKey () {
			return key;
		}
		
		public Object getValue () {
			return value;
		}
	}
	
	private final Member[] members;
	
	private final String[] bans;
	
	private final boolean isGuestData;
	
	private final boolean allowGuests;
	
	private final ClanRank minTalk, minKick;
	
	private final int updateNum;
	
	private final String clanName;
	
	private final Variable[] variables;
	
	public ClanSettingsEventContext (boolean guestData, String clanName, Member[] members, String[] bans, int updateNum, boolean allowGuests, ClanRank minTalk, ClanRank minKick, Variable[] variables) {
		this.isGuestData = guestData;
		this.clanName = clanName;
		this.members = members;
		this.bans = bans;
		this.allowGuests = allowGuests;
		this.updateNum = updateNum;
		this.minTalk = minTalk;
		this.minKick = minKick;
		this.variables = variables;
	}
	
	/**
	 * Returns whether or not this is clan data for a guest clan
	 * @return	True if this is guest clan data, false if it's main clan data
	 */
	public boolean isGuestData () {
		return isGuestData;
	}
	
	/**
	 * Returns the current settings update number
	 * @return	The update number
	 */
	public int getUpdateNumber () {
		return updateNum;
	}
	
	/**
	 * Returns the name of the clan
	 * @return	The clan name
	 */
	public String getClanName () {
		return clanName;
	}
	
	/**
	 * Returns the minimum rank needed to talk in the clan chat channel
	 * @return	The minimum talk rank
	 */
	public ClanRank getMinTalk () {
		return minTalk;
	}
	
	/**
	 * Returns the minimum rank needed to kick guests from the clan chat channel
	 * @return	The minimum kick rank
	 */
	public ClanRank getMinKick () {
		return minKick;
	}
	
	/**
	 * Returns whether guests are allowed to join the associated clan chat channel
	 * @return	True if guests are allowed to join, false otherwise
	 */
	public boolean allowNonMembers () {
		return allowGuests;
	}
	
	/**
	 * Returns an array of members currently in the clan
	 * @return	An array of members
	 */
	public Member[] getMembers () {
		return members;
	}
	
	/**
	 * Returns an array of people currently banned from the clan
	 * @return	A string array containing the names of all banned players
	 */
	public String[] getBans () {
		return bans;
	}
	
	/**
	 * Returns an array containing the misc setting data for the clan
	 * @return	An array of Variables
	 */
	public Variable[] getVarValues () {
		return variables;
	}
}
