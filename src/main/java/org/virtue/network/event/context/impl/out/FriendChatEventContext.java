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

import org.virtue.game.content.friendchats.ChannelRank;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public class FriendChatEventContext implements GameEventContext {
	
	public static class User {
		private final String nameUnfiltered;
		private final String name;
		private final ChannelRank rank;
		private final int nodeID;
		private final String worldName;
		
		/**
		 * Constructs a new {@code User} object for use within the {@code FriendsChatPacket}
		 * @param displayName The display name of the player
		 * @param replyName	 The reply-to name of the player
		 * @param rank The player's rank within the channel
		 * @param nodeID The node ID of the world the player is in
		 * @param worldName	 The name of the world the player is in
		 */
		public User (String name, String nameUnfiltered, ChannelRank rank, int nodeID, String worldName) {
			this.name = name;
			this.nameUnfiltered = nameUnfiltered;
			this.rank = rank;
			this.nodeID = nodeID;
			this.worldName = worldName;
		}
		
		/**
		 * Gets the display name of the user
		 * @return	The name
		 */
		public String getName () {
			return name;
		}
		
		/**
		 * Gets the unfiltered display name
		 * @return The unfiltered name
		 */
		public String getNameUnfiltered () {
			return nameUnfiltered;
		}
		
		/**
		 * Gets the rank of the player within the channel
		 * @return	The rank
		 */
		public ChannelRank getRank () {
			return rank;
		}
		
		/**
		 * Gets the node ID of the world the player is currently in
		 * @return	The world node ID
		 */
		public int getNodeID () {
			return nodeID;
		}
		
		/**
		 * Gets the name of the world the player is currently in
		 * @return	The world name
		 */
		public String getWorldName () {
			return worldName;
		}
		
		/**
		 * Returns whether the player's name is filtered
		 * @return	True if the player has a filtered name, false otherwise
		 */
		public boolean hasFilteredName () {
			return nameUnfiltered != null && !nameUnfiltered.isEmpty() && !nameUnfiltered.equalsIgnoreCase(name);
		}
	}
	
	private String ownerName;
	
	private String channelName;
	
	private ChannelRank kickReq;
	
	private final User[] users;
	
	private final boolean fullUpdate;

	/**
	 * Constructs a new {@link FriendChatEventContext}
	 * @param users	 The people who are currently in the channel
	 * @param ownerName	 The channel owner's name
	 * @param channelName The channel name
	 * @param kickReq The minimum {@link ChannelRank} required to kick in the channel
	 */
	public FriendChatEventContext (User[] users, String ownerName, String channelName, ChannelRank kickReq) {
		this.ownerName = ownerName;
		this.channelName = channelName;
		this.kickReq = kickReq;
		this.users = users;
		fullUpdate = true;
	}
	
	public FriendChatEventContext (User user) {
		fullUpdate = false;
		users = new User[] { user }; 
	}
	
	public boolean isFullUpdate () {
		return fullUpdate;
	}
	
	/**
	 * Gets the name of the friends chat channel
	 * @return	The channel name
	 */
	public String getChannelName () {
		return channelName;
	}
	
	/**
	 * Gets the display name of the owner of the friends chat channel
	 * @return	The owner name
	 */
	public String getOwnerName () {
		return ownerName;
	}
	
	public ChannelRank getKickReq () {
		return kickReq;
	}
	
	/**
	 * Gets the users included in this packet
	 * @return The users
	 */
	public User[] getUsers () {
		return users;
	}

}
