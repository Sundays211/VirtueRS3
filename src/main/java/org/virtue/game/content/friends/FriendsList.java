/**
 * Copyright (c) 2014 Virtue Studios
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
package org.virtue.game.content.friends;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.config.util.StringUtility;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.chat.OnlineStatus;
import org.virtue.game.content.friendchats.ChannelRank;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.AccountInfo;
import org.virtue.game.parser.ParserType;
import org.virtue.network.event.context.impl.out.FriendListEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext;
import org.virtue.network.event.context.impl.out.QuickMessageEventContext;
import org.virtue.network.event.encoder.impl.FriendListEventEncoder;
import org.virtue.utility.text.QuickChatMessage;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since Oct 12, 2014
 */
public class FriendsList {
	
	public static class Data {
		public List<Friend> friends = new ArrayList<Friend>();
		public OnlineStatus onlineStatus = OnlineStatus.FRIENDSONLY;
		public String friendChatName = "";
		public ChannelRank rankJoin = ChannelRank.FRIEND;
		public ChannelRank rankTalk = ChannelRank.GUEST;
		public ChannelRank rankKick = ChannelRank.OWNER;
	}

	/**
	 * Represents the {@link Player} to use.
	 */
	private Player player;

	/**
	 * Represents the {@link Player}'s friends to use.
	 */
	private final Map<Long, Friend> friends;

	/**
	 * Represents the {@link Player}'s online status.
	 */
	private OnlineStatus onlineStatus;
	
	/**
	 * The name of the player's friend chat channel
	 */
	private String friendChatName;
	
	private ChannelRank chatJoinRank;
	
	private ChannelRank chatTalkRank;
	
	private ChannelRank chatKickRank;

	/**
	 * Constructs a new {@code FriendsListManager}.
	 * @param player The {@link Player} to use.
	 */
	public FriendsList(Player player) {
		this.setPlayer(player);
		Data data = (Data) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserType.FRIEND);
		this.friends = new HashMap<Long, Friend>();
		this.onlineStatus = data.onlineStatus;
		this.friendChatName = data.friendChatName;
		this.chatJoinRank = data.rankJoin;
		this.chatTalkRank = data.rankTalk;
		this.chatKickRank = data.rankKick;
		for (Friend f : data.friends) {
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(f.getHash());
			if (info == null) {
				f.setNames(AccountInfo.generateNamePlaceholder(f.getHash()), "");
			} else {
				f.setNames(info.getDisplayName(), info.getPrevName());
			}
			Player friendPlayer = World.getInstance().getPlayerByHash(f.getHash());
			if (friendPlayer == null) {
				friendPlayer = Lobby.getInstance().getPlayerByHash(f.getHash());
			}
			if (friendPlayer != null) {
				if (player.getPrivilegeLevel().getRights() >= 2) {
					f.setWorld(friendPlayer.getChat().getNodeID());//Always online for admins
				} else {
					switch (friendPlayer.getChat().getFriendsList().getOnlineStatus()) {
					case PUBLIC:
						f.setWorld(friendPlayer.getChat().getNodeID());
						break;
					case FRIENDSONLY:
						if (friendPlayer.getChat().getFriendsList().isFriend(player.getUserHash())) {
							f.setWorld(friendPlayer.getChat().getNodeID());
						}
						break;
					case OFF:
						break;
					}
				}
			}
			this.friends.put(f.getHash(), f);
		}
	}

	/**
	 * Loads the {@link Player}'s friends list.
	 */
	public void sendFriendsList() {
		if (friends.isEmpty()) {
			player.getDispatcher().generateFriendsBlock(true);
		} else {
			sendFriends();
		}
	}

	/**
	 * Adds a new {@link Friend} into the {@link Player}'s friends list.
	 * @param name The display name of the {@link Friend} to add.
	 */
	public void addFriend(String name) {		
		if (name == null) {
			return;
		} else if (friends.size() >= 400) {
			player.getDispatcher().sendGameMessage("Your friends list is full (400 names maximum).");
			return;
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info == null) {
			player.getDispatcher().sendMessage("Unable to add friend - unknown player.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (player.getUserHash() == info.getUserHash()) {
			player.getDispatcher().sendMessage("You can't add yourself to your own friends list.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (friends.containsKey(info.getUserHash())) {
			player.getDispatcher().sendMessage(info.getDisplayName()+" is already on your friends list.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (player.getChat().getIgnoreList().isIgnore(info.getUserHash())) {
			player.getDispatcher().sendMessage("Please remove "+info.getDisplayName()+" from your ignore list first.", ChannelType.PRIVATE_SYSTEM);
			return;
		}
		Friend friend = new Friend(info.getUserHash());
		friend.setNames(info.getDisplayName(), info.getPrevName());
		friends.put(info.getUserHash(), friend);
		Player friendPlayer = World.getInstance().getPlayerByHash(info.getUserHash());
		if (friendPlayer == null) {
			friendPlayer = Lobby.getInstance().getPlayerByHash(info.getUserHash());
		}
		
		if (friendPlayer != null) {
			//Set the friend's world number
			if (onlineStatus == OnlineStatus.FRIENDSONLY) {
				//If online status is friendsonly, adding a player should change the world number for them
				friendPlayer.getChat().getFriendsList().updateFriend(player.getUserHash(), false, getMyNodeID(friendPlayer));
			}
			friend.setWorld(friendPlayer.getChat().getFriendsList().getMyNodeID(player));
		}

		player.getDispatcher().sendEvent(FriendListEventEncoder.class, new FriendListEventContext(friend, false));
		player.getChat().flagSave();
	}

	/**
	 * Removes a {@link Friend} from the {@link Player}'s friends list.
	 * @param name The display name of the {@link Friend} to remove.
	 */
	public void removeFriend(String name) {
		if (name == null || name.trim().length() == 0) {
			return;
		}
		if (name.indexOf('#') == -1) {
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
			if (info != null) {
				friends.remove(info.getUserHash());
			}
			if (OnlineStatus.FRIENDSONLY.equals(onlineStatus)) {
				boolean found = false;
				for (Player p : Lobby.getInstance().getPlayers()) {
					if (p.getUserHash() == info.getUserHash()) {
						p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, 0);
						found = true;
						break;
					}
				}
				if (!found) {
					for (Player p : World.getInstance().getPlayers()) {
						if (p.getUserHash() == info.getUserHash()) {
							p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, 0);
							break;
						}
					}
				}
			}
		} else {
			Friend friend = getFriendByDisplay(name.trim());
			if (friend != null) {
				friends.remove(friend.getHash());
			}
		}
		player.getChat().flagSave();
	}

	/**
	 * Gets a selected {@link Friend} with a desired display name.
	 * @param displayName The display name of the {@link Friend} to get.
	 * @return The selected {@link Friend}.
	 */
	private Friend getFriendByDisplay(String displayName) {
		if (displayName == null || displayName.length() == 0) {
			return null;
		}
		for (Friend friend : friends.values()) {
			if (friend == null) {
				continue;
			}
			if (displayName.equalsIgnoreCase(friend.getDisplayName())) {
				return friend;
			}
			if (displayName.equalsIgnoreCase(friend.getPrevName())) {
				return friend;
			}
		}
		return null;
	}
	
	/**
	 * Finds out whether the user with the given hash is on this friend list
	 * @param hash The hash of the user to check
	 * @return True if the user is on the player's friend list, false otherwise
	 */
	public boolean isFriend (long hash) {
		return friends.containsKey(hash);
	}

	/**
	 * Sends the {@link Player}'s friends list. If empty, only send the block.
	 */
	public void sendFriends() {
		player.getDispatcher().sendEvent(FriendListEventEncoder.class, new FriendListEventContext(friends.values().toArray(new Friend[friends.size()])));
	}
	
	private void updateFriend (long friendhash, boolean namechange, int nodeID) {
		if (friends.containsKey(friendhash)) {
			Friend friend = friends.get(friendhash);
			friend.setWorld(nodeID);
			if (namechange) {
				AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(friendhash);
				if (info != null && friend.getDisplayName().equalsIgnoreCase(info.getPrevName())) {
					friend.setNames(info.getDisplayName(), info.getPrevName());
				}
			}
			player.getDispatcher().sendEvent(FriendListEventEncoder.class,  new FriendListEventContext(friend, namechange));
		}
	}

	/**
	 * Sends the {@link Player}'s friends their online status. 
	 * Sent at login, logout and when the player changes their {@link OnlineStatus}
	 * @param logout True if the player is logging out, false otherwise
	 */
	public void sendFriendsMyStatus(boolean logout) {
		//System.out.println("Sending friend status for "+player.getDisplay()+": logout="+logout);
		int nodeID = logout ? 0 : getMyNodeID(false);
		int adminNodeId = logout ? 0 : getMyNodeID(true);
		for (Player p : Lobby.getInstance().getPlayers()) {
			if (p == null) {
				continue;
			}
			if (p.getPrivilegeLevel().getRights() >= 2) {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, adminNodeId);
			} else if (nodeID == 0 || OnlineStatus.PUBLIC.equals(onlineStatus) || friends.containsKey(p.getUserHash())) {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, nodeID);
			} else {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, 0);
			}
		}
		for (Player p : World.getInstance().getPlayers()) {
			if (p == null) {
				continue;
			}
			if (p.getPrivilegeLevel().getRights() >= 2) {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, adminNodeId);
			} else if (nodeID == 0 || OnlineStatus.PUBLIC.equals(onlineStatus) || friends.containsKey(p.getUserHash())) {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, nodeID);
			} else {
				p.getChat().getFriendsList().updateFriend(player.getUserHash(), false, 0);
			}
		}
	}
	
	/**
	 * Gets the nodeID (world ID) for the current player. 
	 * The online status filter is applied before returning the nodeID, so if the status is "off" and the other player is not admin, the ID returned will be 0.
	 * Similarly, if the filter is set to friends, and the other player is not on the current user's friends list (or an admin), 0 is returned.
	 * @param otherPlayer The other player.
	 * @return The nodeID
	 */
	private int getMyNodeID (Player otherPlayer) {
		boolean playerIsAdmin = otherPlayer.getPrivilegeLevel().getRights() >= 2;
		int nodeID = getMyNodeID(playerIsAdmin);
		if (OnlineStatus.FRIENDSONLY.equals(onlineStatus) && !playerIsAdmin && !friends.containsKey(otherPlayer.getUserHash())) {
			nodeID = 0;
		}
		return nodeID;
	}
	
	/**
	 * Gets the nodeID (world ID) for the current player. 
	 * Note that if the player's online status is off, the nodeID will be set to zero.
	 * @param isAdmin If false, onlineStatus set to "off" will return 0.
	 * @return The nodeID
	 */
	private int getMyNodeID (boolean isAdmin) {
		int nodeID;
		switch (player.getGameState()) {
		case LOBBY:
			nodeID = Lobby.getInstance().getId();
			break;
		case WORLD:
		case WORLD_READY:
			nodeID = World.getInstance().getId();
			break;
		default:
			nodeID = 0;
			break;		
		}
		if (!isAdmin && OnlineStatus.OFF.equals(onlineStatus)) {
			nodeID = 0;
		}
		return nodeID;
	}

	/**
	 * Gets the {@link Player} to use.
	 * @return the player
	 */
	public Player getPlayer() {
		return player;
	}

	/**
	 * Sets the {@link Player} to use.
	 * @param player the player to set
	 */
	public void setPlayer(Player player) {
		this.player = player;
	}

	/**
	 * Gets the {@link Player}'s friends to use.
	 * @return the friends
	 */
	public Collection<Friend> getFriends() {
		return friends.values();
	}

	/**
	 * Gets the {@link Player}'s online status.
	 * @return the onlineStatus
	 */
	public OnlineStatus getOnlineStatus() {
		return onlineStatus;
	}

	/**
	 * Sets the {@link Player}'s online status.
	 * @param status the onlineStatus to set
	 */
	public void setOnlineStatus(OnlineStatus status) {
		if (this.onlineStatus != status) {
			this.onlineStatus = status;
			sendFriendsMyStatus(false);
			player.getChat().flagSave();
		}
	}
	
	/**
	 * Gets the name of the player's friend chat channel
	 * @return The channel name, or an empty string if the player does not have one
	 */
	public String getFriendChatName () {
		return friendChatName;
	}
	
	/**
	 * Gets the rank needed to join the player's friend chat channel
	 * @return The minimum join rank
	 */
	public ChannelRank getFriendChatJoinRank () {
		return chatJoinRank;
	}
	
	/**
	 * Gets the rank needed to talk in the player's friend chat channel
	 * @return The minimum talk rank
	 */
	public ChannelRank getFriendChatTalkRank () {
		return chatTalkRank;
	}
	
	/**
	 * Gets the rank needed to kick other users from the player's friend chat channel
	 * @return The minimum kick rank
	 */
	public ChannelRank getFriendChatKickRank () {
		return chatKickRank;
	}
	
	/**
	 * Sets the name of the player's friend chat channel
	 * @param name The channel name, or an empty string to disable the channel
	 */
	public void setFriendChatName (String name) {
		if ((name == null || name.isEmpty()) && !friendChatName.isEmpty()) {
			this.friendChatName = "";
			player.getDispatcher().sendGameMessage("Your friends chat channel has now been disabled!");
			player.getChat().flagSave();
		} else if (name != null && !name.isEmpty() && !name.equalsIgnoreCase(friendChatName)) {
			if (friendChatName.isEmpty()) {
				player.getDispatcher().sendGameMessage("Your friends chat channel has now been enabled!");
				player.getDispatcher().sendGameMessage("Join your channel by clicking 'Join Chat' and typing: "+player.getName());
			}
			this.friendChatName = name;
			player.getChat().flagSave();
		}
	}
	
	/**
	 * Sets the minimum rank needed to join the player's friend chat channel
	 * @param rank The minimum join rank
	 */
	public void setFriendChatJoinRank (ChannelRank rank) {
		if (!chatJoinRank.equals(rank) && rank != null && !ChannelRank.JMOD.equals(rank)) {
			this.chatJoinRank = rank;
			player.getChat().flagSave();
		}
	}
	
	/**
	 * Sets the minimum rank needed to talk in the player's friend chat channel
	 * @param rank The minimum talk rank
	 */
	public void setFriendChatTalkRank (ChannelRank rank) {
		if (!chatTalkRank.equals(rank) && rank != null && !ChannelRank.JMOD.equals(rank)) {
			this.chatTalkRank = rank;
			player.getChat().flagSave();
		}
	}
	
	/**
	 * Sets the rank needed to kick other users from the player's friend chat channel
	 * @param rank The minimum kick rank
	 */
	public void setFriendChatKickRank (ChannelRank rank) {
		if (!chatKickRank.equals(rank) && rank != null && !ChannelRank.JMOD.equals(rank)) {
			this.chatKickRank = rank;
			player.getChat().flagSave();
		}
	}
	
	/**
	 * Sends a private message to the specified player
	 * @param recipientHash The user hash of the player receiving the message
	 * @param message The message to send
	 */
	public void sendMessage (long recipientHash, String message) {
		if (!isFriend(recipientHash)) {
			player.getDispatcher().sendMessage("Unable to send message - player not on your friends list.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient not on friends list.
		}
		Friend friend = friends.get(recipientHash);
		if (friend.getNodeID() == 0) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient is offline
		}
		Player recipient = null;
		if (friend.inWorld()) {
			for (Player p : World.getInstance().getPlayers()) {
				if (p.getUserHash() == recipientHash) {
					recipient = p;
					break;
				}
			}
		} else {
			for (Player p : Lobby.getInstance().getPlayers()) {
				if (p.getUserHash() == recipientHash) {
					recipient = p;
					break;
				}
			}
		}
		if (recipient == null) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient is offline
		}
		message = StringUtility.formatChatMessage(message);
		MessageEventContext msgContext = new MessageEventContext(ChannelType.PRIVATE, message, player.getName(), null, player.getPrivilegeLevel().getCrown());
		recipient.getDispatcher().sendMessage(msgContext);
		
		msgContext = new MessageEventContext(ChannelType.PRIVATE_ECHO, message, recipient.getName(), null, player.getPrivilegeLevel().getCrown());
		player.getDispatcher().sendMessage(msgContext);
	}
	
	public void sendQuickMessage (long recipientHash, QuickChatMessage message) {
		if (!isFriend(recipientHash)) {
			player.getDispatcher().sendMessage("Unable to send message - player not on your friends list.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient not on friends list.
		}
		Friend friend = friends.get(recipientHash);
		if (friend.getNodeID() == 0) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient is offline
		}
		Player recipient = null;
		if (friend.inWorld()) {
			for (Player p : World.getInstance().getPlayers()) {
				if (p.getUserHash() == recipientHash) {
					recipient = p;
					break;
				}
			}
		} else {
			for (Player p : Lobby.getInstance().getPlayers()) {
				if (p.getUserHash() == recipientHash) {
					recipient = p;
					break;
				}
			}
		}
		if (recipient == null) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Recipient is offline
		}
		MessageEventContext msgContext = new QuickMessageEventContext(ChannelType.PRIVATE_QUICKCHAT, message, player.getName(), null, player.getPrivilegeLevel().getCrown());
		recipient.getDispatcher().sendMessage(msgContext);
		
		msgContext = new QuickMessageEventContext(ChannelType.PRIVATE_ECHO_QUICKCHAT, message, recipient.getName(), null, player.getPrivilegeLevel().getCrown());
		player.getDispatcher().sendMessage(msgContext);
	}
	
	/**
	 * Sets the rank of the friend with the specified name
	 * @param name The display name of the friend
	 * @param rank The rank to set
	 */
	public void setRank (String name, ChannelRank rank) {
		if (!ChannelRank.isAssignable(rank)) {
			return;//Invalid rank selected
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info != null && friends.containsKey(info.getUserHash())) {
			friends.get(info.getUserHash()).setRank(rank);
			player.getChat().flagSave();
			player.getDispatcher().sendEvent(FriendListEventEncoder.class,  new FriendListEventContext(friends.get(info.getUserHash()), false));
		}
	}
	
	/**
	 * Sets the note of the friend with the specified name
	 * @param name The display name of the ignore
	 * @param note The note to set
	 */
	public void setNote (String name, String note) {
		if (note.length() > 30) {
			note = note.substring(0, 30);
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info != null && friends.containsKey(info.getUserHash())) {
			friends.get(info.getUserHash()).setNote(note);
			player.getChat().flagSave();
			player.getDispatcher().sendEvent(FriendListEventEncoder.class, new FriendListEventContext(friends.get(info.getUserHash()), false));
		}
	}
}
