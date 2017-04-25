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

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public class ClanChannelEventContext implements GameEventContext {
	
	public static class User {
		private final String displayName;
		private final byte rank;
		private final int nodeID;
		
		/**
		 * Constructs a new {@code User} object for use within the {@code ClanChannelEventContext}
		 * @param displayName	The display name of the player
		 * @param rank			The player's rank within the clan
		 * @param nodeID		The node ID of the world the player is in
		 */
		public User (String displayName, byte rank, int nodeID) {
			this.displayName = displayName;
			this.rank = rank;
			this.nodeID = nodeID;
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
		public byte getRank () {
			return rank;
		}
		
		/**
		 * Gets the node ID of the world the player is currently in
		 * @return	The world node ID
		 */
		public int getWorldNodeID () {
			return nodeID;
		}
	}
	
	private final long clanHash;
	
	private final long updateNumber;
	
	private final String clanName;
	
	private final boolean allowUnaffined;
	
	private final byte minTalkRank;
	
	private final byte minKickRank;
	
	private final User[] users;
	
	private final boolean isAffined;
	
	/**
	 * Constructs a new {@code ClanChannelEventContext} representing a full update to the clan chat channel
	 * @param guestCc		True if this update is for a guest clan chat, false if it is for the main channel
	 * @param users			An array of users currently in the channel
	 * @param clanHash		The unique hash for the clan
	 * @param updateNum		The current clan channel update number
	 * @param clanName		The name of the clan
	 * @param allowUnaffined True if guests are allowed in the clan, false otherwise
	 * @param minTalk		The minimum rank required to talk in the channel
	 * @param minKick		The minimum rank required to kick guests from the channel
	 */
	public ClanChannelEventContext (boolean isAffined, User[] users, long clanHash, long updateNum, String clanName, boolean allowUnaffined, byte minTalk, byte minKick) {
		this.isAffined = isAffined;
		this.users = users;
		this.clanHash = clanHash;
		this.updateNumber = updateNum;
		this.clanName = clanName;
		this.allowUnaffined = allowUnaffined;
		this.minTalkRank = minTalk;
		this.minKickRank = minKick;
	}
	
	/**
	 * Returns whether or not this is an update for an affined clan channel
	 * @return	True if this is an affined clan channel update, false if it's a guest cc update
	 */
	public boolean isAffined () {
		return isAffined;
	}
	
	/**
	 * Returns the unique hash code for the clan
	 * @return	The clan hash
	 */
	public long getClanHash () {
		return clanHash;
	}
	
	/**
	 * Returns the current channel update number
	 * @return	The update number
	 */
	public long getUpdateNumber () {
		return updateNumber;
	}
	
	/**
	 * Returns the name of the clan
	 * @return	The clan name
	 */
	public String getClanName () {
		return clanName;
	}
	
	/**
	 * Returns whether guests are allowed to join the channel
	 * @return True if guests can join, false otherwise
	 */
	public boolean allowUnaffined () {
		return allowUnaffined;
	}
	
	/**
	 * Returns the minimum rank needed to talk in the channel
	 * @return	The minimum talk rank
	 */
	public byte getMinTalk () {
		return minTalkRank;
	}
	
	/**
	 * Returns the minimum rank needed to kick guests from the channel
	 * @return	The minimum kick rank
	 */
	public byte getMinKick () {
		return minKickRank;
	}
	
	/**
	 * Returns an array of users currently in the clan chat channel
	 * @return	An array of users
	 */
	public User[] getUsers () {
		return users;
	}

}
