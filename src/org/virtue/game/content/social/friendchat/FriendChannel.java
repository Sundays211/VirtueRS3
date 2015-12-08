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
package org.virtue.game.content.social.friendchat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.virtue.game.content.social.ChannelRank;
import org.virtue.game.content.social.ChannelType;
import org.virtue.game.content.social.SocialUser;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.network.event.context.impl.out.FriendChatEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public class FriendChannel {
	
	private long ownerHash;

	private String ownerName;
	
	private String channelName;
	
	private List<Long> bans = new ArrayList<Long>();
	
	private Map<Long, ChannelRank> ranks = new HashMap<Long, ChannelRank>();
	
	private Map<Long, SocialUser> users = new HashMap<Long, SocialUser>();
	
	private Map<Long, Long> tempBans = new HashMap<Long, Long>();
	
	private ChannelRank rankKick = ChannelRank.OWNER;
	private ChannelRank rankTalk = ChannelRank.FRIEND;
	private ChannelRank rankJoin = ChannelRank.GUEST;
	
	/**
	 * Constructs a new {@link FriendChannel} instance
	 * @param ownerHash The hash of the channel owner
	 * @param ownerDisplay The display name of the channel owner
	 * @param channelName The name of the channel (also known as "prefix")
	 */
	public FriendChannel(long ownerHash, String ownerDisplay, String channelName) {
		this.ownerHash = ownerHash;
		this.ownerName = ownerDisplay;
		this.channelName = channelName;	
	}
	
	/**
	 * Gets the name of the channel
	 * @return The channel name
	 */
	public String getName () {
		return channelName;
	}
	
	/**
	 * Gets the channel owner's user hash
	 * @return The owner hash
	 */
	public long getOwnerHash () {
		return ownerHash;
	}
	
	/**
	 * Gets the display name of the channel owner
	 * @return The owner name
	 */
	public String getOwner () {
		return ownerName;
	}
	
	/**
	 * Returns the minimum rank needed to kick other users from the channel
	 * @return	The minimum kick rank
	 */
	public ChannelRank getKickReq () {
		return rankKick;
	}
	
	/**
	 * Returns whether or not the specified rank can kick other users from the channel
	 * @param rank	The rank to check
	 * @return		True if the rank can kick, false otherwise
	 */
	public boolean canKick (ChannelRank rank) {
		return getKickReq().getID() <= rank.getID();
	}
	
	/**
	 * Returns the minimum rank needed to join the channel
	 * @return	The minimum join rank
	 */
	public ChannelRank getJoinReq () {
		return rankJoin;
	}
	
	/**
	 * Returns whether or not the specified rank can join the channel
	 * @param rank	The rank to check
	 * @return		True if the rank can join, false otherwise
	 */
	public boolean canJoin (ChannelRank rank) {
		return getJoinReq().getID() <= rank.getID();
	}
	
	/**
	 * Returns the minimum rank needed to talk in the channel
	 * @return	The minimum talk rank
	 */
	public ChannelRank getTalkReq () {
		return rankTalk;
	}
	
	/**
	 * Returns whether or not the specified rank can talk in the channel
	 * @param rank	The rank to check
	 * @return		True if the rank can talk in the channel, false otherwise
	 */
	public boolean canTalk (ChannelRank rank) {
		return getTalkReq().getID() <= rank.getID();
	}
	
	/**
	 * Gets the rank of the user with the specified hash in this channel
	 * @param hash The hash of the user to check
	 * @return The user's {@link ChannelRank}
	 */
	public ChannelRank getPlayerRank (SocialUser user) {
		return getPlayerRank(user.getHash(), user.getType());
	}
	
	public ChannelRank getPlayerRank (long userhash, PrivilegeLevel usertype) {
		ChannelRank response = ranks.get(userhash);
		if (usertype.getRights() >= 2) {
			response = ChannelRank.JMOD;
		} else if (userhash == ownerHash) {
			response = ChannelRank.OWNER;
		}
		return (response == null ? ChannelRank.GUEST : response);
	}
	
	/**
	 * Reloads the channel data based on the provided friend chat data
	 * @param data The data to update with
	 */
	protected void refreshSettings (FriendChatData data) {
		if (!data.hasFriendChannel()) {
			synchronized (users) {
				for (SocialUser u : users.values()) {
					u.sendMessage("You have been removed from this channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
					u.sendLeaveFriendChat();
				}
			}
			return;
		}
		boolean needsFullRefresh = false;
		bans = new ArrayList<Long>(data.getChannelBans());
		if (!ownerName.equals(data.getOwnerName())) {
			ownerName = data.getOwnerName();
			needsFullRefresh = true;
		}
		if (!channelName.equals(data.getChannelName())) {
			channelName = data.getChannelName();
			needsFullRefresh = true;
		}
		if (!rankKick.equals(data.getKickRank())) {
			rankKick = data.getKickRank();
			needsFullRefresh = true;
		}
		if (!rankTalk.equals(data.getTalkRank())) {
			rankTalk = data.getTalkRank();
			//No need to send a channel refresh in this case, as it's not handled on the client side.
		}
		if (!rankJoin.equals(data.getJoinRank())) {
			rankJoin = data.getJoinRank();
		}
		Map<Long, ChannelRank> newRanks = data.getChannelRanks();
		synchronized (users) {
			for (SocialUser u : users.values()) {
				long hash = u.getHash();
				ChannelRank newRank = newRanks.get(hash) == null ? (hash == ownerHash ? ChannelRank.OWNER : ChannelRank.GUEST) : newRanks.get(hash);
				if (!getPlayerRank(u).equals(newRank)) {
					needsFullRefresh = true;//Much easier just to do a full refresh if one or more users have been updated
					if(!canJoin(newRank)) {
						leave(u);
						u.sendMessage("You have been removed from this channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
					}
					//sendPacket(new FriendChatEventContext(packUser(u)));
				}
			}
		}
		//needsFullRefresh = true;
		ranks = newRanks;
		if (needsFullRefresh) {
			synchronized (users) {
				FriendChatEventContext packet = makeFullPacket();
				sendPacket(packet);
			}
		}
	}
	
	/**
	 * Returns whether the specified user is permanently banned from the channel
	 * @param hash	The hash of the user to check
	 * @return True if the user is banned, false otherwise
	 */
	public boolean isBanned (long hash) {
		return bans.contains(hash);
	}
	
	/**
	 * Returns whether the specified user is temporarily banned from the channel. Removes their temporary ban if it has expired.
	 * @param userHash	The hash of the user to check
	 * @return True if the user is temporarily banned, false otherwise
	 */
	public boolean isTempBanned (long userHash) {
		if (!tempBans.containsKey(userHash)) {
			return false;
		} else {
			long banExpires = tempBans.get(userHash);
			if (banExpires < System.currentTimeMillis()) {
				tempBans.remove(userHash);
				return false;
			}
			return true;
		}
	}
	
	/**
	 * Returns the number of users currently in the channel
	 * @return	The number of users in the channel
	 */
	public int getSize () {
		return users.size();
	}
	
	/**
	 * Adds the user to this channel. 
	 * Note that this method only checks that the channel has enough space; all other checks should be done externally
	 * @param player The user joining the channel
	 * @return True if the join was successful, false otherwise
	 */
	protected boolean join (SocialUser player) {
		synchronized (users) {
			if (!users.containsKey(player.getHash())) {
				if (users.size() >= 100) {
					if (!tryBump(getPlayerRank(player))) {
						return false;
					}
				}
				FriendChatEventContext.User packet = packUser(player);
				sendPacket(new FriendChatEventContext(packet));
				users.put(player.getHash(), player);
			}
		}
		player.sendFriendChatPacket(makeFullPacket());
		return true;
	}
	
	/**
	 * Attempts to bump a lower-ranking user from the channel, in order to allow a higher-ranking one to join a full channel
	 * @param playerRank The rank of the player wishing to join
	 * @return True if a user was successfully bumped, false otherwise
	 */
	private boolean tryBump (ChannelRank playerRank) {
		for (ChannelRank rank : ChannelRank.values()) {
			if (playerRank.equals(rank)) {
				return false;
			}
			for (SocialUser user : users.values()) {
				if (getPlayerRank(user).equals(rank)) {
					removeUser(user);
					user.sendLeaveFriendChat();
					user.sendMessage("You have been removed from this channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * Removes the player from the friends chat channel
	 * @param player	The player to remove
	 * @return			True if the player was the last user in the channel (and therefore is empty), false otherwise
	 */
	protected boolean leave (SocialUser player) {
		long hash = player.getHash();
		synchronized (users) {
			if (users.containsKey(hash)) {
				removeUser(users.get(hash));
			}
		}
		player.sendLeaveFriendChat();
		return users.isEmpty();
	}
	
	/**
	 * Removes a user from the friends chat channel. This method assumes the user is actually in the channel, and does not send the leave packet to the player.
	 * Should only be used in conjunction with a method where "users" is synchronised and the player is confirmed to be in the channel.
	 * @param user	The user to remove
	 */
	private void removeUser (SocialUser user) {
		String displayName = users.get(user.getHash()).getName();
		users.remove(user.getHash());
		FriendChatEventContext.User packet = new FriendChatEventContext.User(displayName, null, null, user.getNodeID(), null);
		sendPacket(new FriendChatEventContext(packet));
	}
	
	/**
	 * Kicks the user with the specified hash from the channel, and blocks them from joining for 60 minutes
	 * @param hash The hash of the user to kick/ban
	 */
	protected void kickBanUser (long hash) {
		synchronized (users) {
			if (users.containsKey(hash)) {
				SocialUser u = users.get(hash);
				removeUser(u);
				u.sendMessage("You have been kicked from the channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
				u.sendLeaveFriendChat();
			}
		}
		long banExpires = System.currentTimeMillis() + 600*100*60;
		tempBans.put(hash, banExpires);
	}
	
	/**
	 * Sends the specified message to all users in the channel
	 * @param message The message to send
	 */
	protected void sendMessage(MessageEventContext message) {
		synchronized (users) {
			for (SocialUser u : users.values()) {
				if (u == null) {
					continue;
				}
				u.sendMessage(message);
			}
		}
	}
	
	/**
	 * Sends the specified friends chat update packet to all users currently in the channel
	 * @param packet The packet to send
	 */
	private void sendPacket (FriendChatEventContext packet) {		
		for (SocialUser u : users.values()) {
			if (u == null) {
				continue;
			}
			u.sendFriendChatPacket(packet);
		}
	}
	
	/**
	 * Creates a {@link FriendChatEventContext.User} packet representing an update to the specified user
	 * @param player The player to include in the update
	 * @return A packet representing the update
	 */
	private FriendChatEventContext.User packUser (SocialUser player) {
		return new FriendChatEventContext.User(player.getName(), player.getName(), 
				getPlayerRank(player), player.getNodeID(), player.getWorldName());
	}
	
	/**
	 * Creates a full {@link FriendsChatPacket} containing all the information about the friends chat channel
	 * @return	A full FriendsChatPacket
	 */
	private FriendChatEventContext makeFullPacket () {
		FriendChatEventContext.User[] currentUsers;
		synchronized (users) {
			 currentUsers = new FriendChatEventContext.User[users.size()];
			 int i = 0;
			 for (SocialUser user : users.values()) {
				 currentUsers[i] = packUser(user);
				 i++;
			 }
		}
		return new FriendChatEventContext(currentUsers, ownerName, channelName, getKickReq());
	}
}
