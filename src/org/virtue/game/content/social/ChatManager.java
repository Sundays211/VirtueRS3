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
package org.virtue.game.content.social;

import org.virtue.Virtue;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.social.friend.FriendsList;
import org.virtue.game.content.social.friendchat.FriendChatAPI;
import org.virtue.game.content.social.friendchat.FriendChatData;
import org.virtue.game.content.social.friendchat.FriendChatManager;
import org.virtue.game.content.social.ignore.IgnoreList;
import org.virtue.game.entity.player.AccountInfo;
import org.virtue.game.entity.player.GameState;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.ClanChannelDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanChannelEventContext;
import org.virtue.network.event.context.impl.out.ClanSettingsDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanSettingsEventContext;
import org.virtue.network.event.context.impl.out.FriendChatEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext;
import org.virtue.network.event.context.impl.out.QuickMessageEventContext;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.network.event.encoder.impl.ClanChannelDeltaEventEncoder;
import org.virtue.network.event.encoder.impl.ClanChannelEventEncoder;
import org.virtue.network.event.encoder.impl.ClanSettingsDeltaEventEncoder;
import org.virtue.network.event.encoder.impl.ClanSettingsEventEncoder;
import org.virtue.network.event.encoder.impl.FriendChatEventEncoder;
import org.virtue.utility.text.QuickChatMessage;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/10/2014
 */
public class ChatManager implements SocialUser {
	
	private static FriendChatAPI friendChatManager = new FriendChatManager();
	
	/**
	 * Represents the current friend chat channel joining/leaving status
	 * @author Im Frizzy <skype:kfriz1998>
	 * @author Frosty Teh Snowman <skype:travis.mccorkle>
	 * @author Arthur <skype:arthur.behesnilian>
	 * @author Sundays211
	 * @since 9/11/2014
	 */
	private enum ChannelStage { NONE, JOINING, JOINED, LEAVING }
	
	/**
	 * The player this chat manager is for
	 */
	private Player player;
	
	/**
	 * The chat mode for the player
	 */
	private ChatMode chatMode;
	
	/**
	 * The owner of the friend chat channel the player is currently in
	 */
	private long friendChatOwner = 0L;
	
	/**
	 * Represents the join/leave status for the player's friend chat channel
	 */
	private ChannelStage channelStatus = ChannelStage.NONE;
	
	/**
	 * The player's friends list
	 */
	private FriendsList friends;
	
	/**
	 * The player's ignore list
	 */
	private IgnoreList ignores;
	
	private boolean muted;
	
	/**
	 * The player's friend chat data
	 */
	private ChatData chatData;
	
	private long guestClanHash;
	
	private long guestClanSettingsHash;
	
	//TODO: Find an internal variable for this...
	private long selectedClanMember;
	
	/**
	 * Whether the friend and ignore data needs to be saved
	 */
	private boolean needsSave = false;
	
	private boolean hasShutdown = false;

	/**
	 * The {@link ChatManager} constructor
	 */
	public ChatManager(Player player) {
		this.player = player;
		this.friends = new FriendsList(player);
		this.ignores = new IgnoreList(player);
		this.chatData = new ChatData(friends, ignores, player);
	}	
	
	public long getSelectedClanMember () {
		return selectedClanMember;
	}
	
	public void setSelectedClanMember (long selectedClanMember) {
		this.selectedClanMember = selectedClanMember;
	}
	
	/**
	 * Return the chat mode
	 * @return
	 */
	public ChatMode getMode () {
		return chatMode;
	}
	
	/**
	 * Sets the chat mode
	 * @param chatMode
	 */
	public void setMode (ChatMode chatMode) {
		this.chatMode = chatMode;
	}
	
	/**
	 * Returns the players friends list
	 */
	public FriendsList getFriendsList() {
		return friends;
	}
	
	/**
	 * Returns the players ignore list
	 */
	public IgnoreList getIgnoreList() {
		return ignores;
	}
	
	/**
	 * Notifies the system that the friend and ignore data has changed and requires saving
	 */
	public void flagSave () {
		if (!needsSave) {
			player.getDispatcher().sendMessage("Changes will take effect on your friends chat in the next 60 seconds.", ChannelType.FRIENDCHANNEL_SYSTEM);
			needsSave = true;
		}
	}
	
	/**
	 * Gets the data for the player's friend chat channel
	 * @return The friend chat data
	 */
	public FriendChatData getFriendChatData () {
		return chatData;
	}
	
	/**
	 * Attempts to join the specified friend chat channel
	 * If the name is null or empty, attempts to leave the current friend chat channel
	 * @param ownerName The display name of the channel owner
	 */
	public void joinLeaveFriendChat (String ownerName) {
		if (ownerName.isEmpty()) {
			if (ChannelStage.LEAVING.equals(channelStatus)) {
				player.getDispatcher().sendMessage("Leave request already in progress - please wait...", ChannelType.FRIENDCHANNEL_SYSTEM);
			} else if (ChannelStage.NONE.equals(channelStatus)) {
				player.getDispatcher().sendMessage("You are not currently in a channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			} else if (ChannelStage.JOINED.equals(channelStatus)) {
				channelStatus = ChannelStage.LEAVING;
				friendChatManager.leaveChannel(this, false);	
			}
		} else {
			if (ChannelStage.LEAVING.equals(channelStatus) || ChannelStage.JOINED.equals(channelStatus)) {
				player.getDispatcher().sendMessage("Please wait until you are logged out of your previous channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			} else if (ChannelStage.JOINING.equals(channelStatus)) {
				player.getDispatcher().sendMessage("Already attempting to join a channel - please wait...", ChannelType.FRIENDCHANNEL_SYSTEM);
			} else if (ChannelStage.NONE.equals(channelStatus)) {
				AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(ownerName);
				if (info == null) {
					player.getDispatcher().sendMessage("The channel you tried to join does not exist.", ChannelType.FRIENDCHANNEL_SYSTEM);
				} else {
					player.setSavedChanelOwner(info.getUserHash());
					player.getDispatcher().sendVarcString(2508, ownerName);
					player.getDispatcher().sendMessage("Attempting to join channel...", ChannelType.FRIENDCHANNEL_SYSTEM);
					channelStatus = ChannelStage.JOINING;
					friendChatManager.joinChannel(this, info.getUserHash());
				}
			}
		}
	}
	
	/**
	 * Attempts to kick/ban the specified player from the current friend chat channel
	 * @param name The display name of the player to ban
	 */
	public void friendChatKick (String name) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info == null) {
			return;
		} else {
			friendChatManager.kickBanUser(this, info.getUserHash());
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getHash()
	 */
	@Override
	public long getHash() {
		return player.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getName()
	 */
	@Override
	public String getName() {
		return player.getName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getRights()
	 */
	@Override
	public PrivilegeLevel getType() {
		return player.getPrivilegeLevel();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getNodeID()
	 */
	@Override
	public int getNodeID() {
		return GameState.LOBBY.equals(player.getGameState()) ? 1100 : 1;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getWorldName()
	 */
	@Override
	public String getWorldName() {
		return GameState.LOBBY.equals(player.getGameState()) ? "Lobby 1" : "World 1";
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#isMuted()
	 */
	@Override
	public boolean isMuted() {
		return muted;
	}
	
	/**
	 * Sets whether the attached player is able to send regular messages within the server
	 * @param muted True to mute the player, false to unmute the player.
	 */
	public void setMuted (boolean muted) {
		this.muted = muted;
	}
	
	/**
	 * Sends a public quick chat message to nearby players
	 * @param message The message to send
	 */
	public void sendPublicQuickMessage (QuickChatMessage message) {
		MessageEventContext msgContext = new QuickMessageEventContext(player.getIndex(), message, 0, player.getPrivilegeLevel());
		for (Player p : player.getViewport().getLocalPlayers()) {
			if (p != null) {
				p.getDispatcher().sendMessage(msgContext);
			}
		}
	}
	
	/**
	 * Sends the specified public message to all nearby players
	 * @param message The message to send
	 * @param colourEffect The colour effects of the message
	 * @param moveEffect The movement effects of the message
	 */
	public void sendPublicMessage (String message, int colourEffect, int moveEffect) {
		if (isMuted()) {
			player.getDispatcher().sendMessage("You are currently muted and unable to use the chat system.", ChannelType.GAME);
			return;
		}
		message = StringUtility.formatChatMessage(message);
		int effects = (colourEffect << 8) | (moveEffect & 0xff);
		MessageEventContext msgContext = new MessageEventContext(player.getIndex(), message, effects, player.getPrivilegeLevel());
		for (Player p : player.getViewport().getLocalPlayers()) {
			if (p != null) {
				p.getDispatcher().sendMessage(msgContext);
			}
		}
	}
	
	/**
	 * Sends a private message to the specifed player
	 * @param message The message to send
	 * @param recipient The recipient of the message
	 */
	public void sendPrivateMessage (String message, String recipient) {
		if (isMuted()) {
			player.getDispatcher().sendMessage("You are currently muted and unable to use the chat system.", ChannelType.GAME);
			return;
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(recipient);
		if (info == null) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Player does not exist
		}
		friends.sendMessage(info.getUserHash(), message);
	}
	
	public void sendPrivateQuickMessage (QuickChatMessage message, String recipient) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(recipient);
		if (info == null) {
			player.getDispatcher().sendMessage("Unable to send message - player unavailable.", ChannelType.PRIVATE_SYSTEM);
			return;//Player does not exist
		}
		friends.sendQuickMessage(info.getUserHash(), message);
	}
	
	/**
	 * Sends a message in the player's current friend chat channel
	 * @param message The message to send
	 */
	public void sendFriendChatMessage(String message) {
		if (isMuted()) {
			player.getDispatcher().sendMessage("You are currently muted and unable to use the chat system.", ChannelType.GAME);
			return;
		}
		friendChatManager.sendMessage(this, message);
	}
	
	/**
	 * Gets the number of people in the player's current friends chat who are on the same world.
	 * Used in the quick chat phrase "There are X amount of people in my friends chat."
	 * @return The number of people in the friends chat, or 0 if the player is not in a chat.
	 */
	public int getFriendChatWorldCount () {
		if (friendChatOwner == 0L) {
			return 0;
		}
		int count = 0;
		Iterable<Player> players = GameState.LOBBY.equals(player.getGameState()) ? 
				Lobby.getInstance().getPlayers() : World.getInstance().getPlayers();
		for (Player p : players) {
			if (p.getChat().getFriendChatOwner() == friendChatOwner) {
				count++;
			}
		}
		return count;
	}
	
	public int getFriendChatMeanCombatLevel () {
		if (friendChatOwner == 0L || GameState.LOBBY.equals(player.getGameState())) {
			return 0;
		}
		int totalLevel = 0;
		int count = 0;
		for (Player p : World.getInstance().getPlayers()) {
			if (p.getChat().getFriendChatOwner() == friendChatOwner) {
				count++;
				totalLevel += p.getSkills().getCombatLevel();
			}
		}
		return totalLevel / count;
	}
	
	/**
	 * Sends a quick message in the player's current friend chat channel
	 * @param message The message to send
	 */
	public void sendFriendChatQuickMessage(QuickChatMessage message) {
		friendChatManager.sendQuickMessage(this, message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendMessage(java.lang.String, org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType)
	 */
	@Override
	public void sendMessage(String message, ChannelType type) {
		player.getDispatcher().sendMessage(message, type);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendMessage(org.virtue.network.event.context.impl.out.MessageEventContext)
	 */
	@Override
	public void sendMessage(MessageEventContext message) {
		player.getDispatcher().sendMessage(message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendLeaveFriendChat()
	 */
	@Override
	public void sendLeaveFriendChat() {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.UPDATE_FRIENDCHANNEL_FULL, player);
		buffer.finishVarShort();
		player.getDispatcher().sendBuffer(buffer);
		setFriendChatOwner(0L);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendFriendChatPacket(org.virtue.network.event.context.impl.out.FriendChatEventContext)
	 */
	@Override
	public void sendFriendChatPacket(FriendChatEventContext context) {
		player.getDispatcher().sendEvent(FriendChatEventEncoder.class, context);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#setFriendChatOwner(long)
	 */
	@Override
	public void setFriendChatOwner(long hash) {
		this.friendChatOwner = hash;
		if (hash == 0L) {
			channelStatus = ChannelStage.NONE;
		} else {
			//lastFriendsChat = ownerName;
			channelStatus = ChannelStage.JOINED;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getFriendChatOwner()
	 */
	@Override
	public long getFriendChatOwner() {
		return friendChatOwner;
	}
	
	/**
	 * Saves all the chat data to file
	 */
	public void saveData () {
		if (needsSave) {
			Virtue.getInstance().getParserRepository().getParser().saveObjectDefinition(this.getFriendsList(), player.getUsername(), ParserDataType.FRIEND);
			Virtue.getInstance().getParserRepository().getParser().saveObjectDefinition(this.getIgnoreList(), player.getUsername(), ParserDataType.IGNORE);
			friendChatManager.notifySave(chatData);
			needsSave = false;
		}
	}
	
	/**
	 * Runs the tasks that need to be run when the player logs out, such as informing friends and leaving the friend chat channel.
	 */
	public void logout () {
		if (!hasShutdown) {
			if (friendChatOwner != 0L) {
				friendChatManager.leaveChannel(this, true);
			}
			friends.sendFriendsMyStatus(true);
			if (player.getClanHash() != 0L) {
				Virtue.getInstance().getClans().getChannels().leaveChannel(this, true, true);
				Virtue.getInstance().getClans().getSettings().deregisterPlayer(this, true);//Deregister for main clan settings
				Virtue.getInstance().getClans().getSettings().deregisterPlayer(this, false);//Deregister for guest clan settings
			}
			hasShutdown = true;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getMyClanHash()
	 */
	@Override
	public long getAffinedClanHash() {
		return player.getClanHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#setMyClanHash(long)
	 */
	@Override
	public void setAffinedClanHash(long clanHash) {
		player.setClanHash(clanHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendClanChannelFull(org.virtue.network.event.context.impl.out.ClanChannelEventContext)
	 */
	@Override
	public void sendClanChannelFull(ClanChannelEventContext packet) {
		player.getDispatcher().sendEvent(ClanChannelEventEncoder.class, packet);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendClanChannelDelta(org.virtue.network.event.context.impl.out.ClanChannelDeltaEventContext)
	 */
	@Override
	public void sendClanChannelDelta(ClanChannelDeltaEventContext packet) {
		player.getDispatcher().sendEvent(ClanChannelDeltaEventEncoder.class, packet);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendLeaveClanChannel(boolean)
	 */
	@Override
	public void sendLeaveClanChannel(boolean isAffined) {
		if (isAffined) {
			//setInClanChannel(false);
		} else {			
			player.getDispatcher().sendCS2Script(4438, 72744972);
			setGuestClanHash(0L, false);
		}
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.CLANCHANNEL_FULL, player);
		buffer.putByte(isAffined ? 1 : 0);
		buffer.finishVarShort();
		player.getDispatcher().sendBuffer(buffer);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#getGuestClanHash()
	 */
	@Override
	public long getGuestClanHash(boolean settings) {
		return settings ? guestClanSettingsHash : guestClanHash;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#setGuestClanHash(long)
	 */
	@Override
	public void setGuestClanHash(long clanHash, boolean settings) {
		if (settings) {
			this.guestClanSettingsHash = clanHash;
		} else {
			this.guestClanHash = clanHash;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendClanSettingsFull(org.virtue.network.event.context.impl.out.ClanSettingsEventContext)
	 */
	@Override
	public void sendClanSettingsFull(ClanSettingsEventContext packet) {
		player.getDispatcher().sendEvent(ClanSettingsEventEncoder.class, packet);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#sendClanSettingsDelta(org.virtue.network.event.context.impl.out.ClanSettingsDeltaEventContext)
	 */
	@Override
	public void sendClanSettingsDelta(ClanSettingsDeltaEventContext packet) {
		player.getDispatcher().sendEvent(ClanSettingsDeltaEventEncoder.class, packet);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.SocialUser#clanDataUpdated()
	 */
	@Override
	public void clanDataUpdated() {
		if (player.getClanHash() == 0L) {
			player.getInvs().getContainer(ContainerState.EQUIPMENT).removeAll(20708);
			player.getInvs().getContainer(ContainerState.EQUIPMENT).removeAll(20709);
			player.getInvs().getContainer(ContainerState.BACKPACK).removeAll(20708);
			player.getInvs().getContainer(ContainerState.BACKPACK).removeAll(20709);
			player.getInvs().getContainer(ContainerState.BANK).removeAll(20708);
			player.getInvs().getContainer(ContainerState.BANK).removeAll(20709);
			player.getAppearance().refresh();
		} else {
			player.getEquipment().updateClanOverride();
			player.getAppearance().refresh();
		}
	}
}
