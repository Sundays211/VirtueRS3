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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.chat.SocialUser;
import org.virtue.game.content.friends.FriendsList;
import org.virtue.game.content.friends.FriendsList.Data;
import org.virtue.game.content.ignores.Ignore;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.AccountInfo;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.event.context.impl.out.MessageEventContext;
import org.virtue.network.event.context.impl.out.QuickMessageEventContext;
import org.virtue.utility.text.QuickChatMessage;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public class FriendChatManager implements FriendChatAPI {

	private final Map<Long, FriendChannel> friendChannelCache = new HashMap<Long, FriendChannel>();
	
	public FriendChatManager () {
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#notifySave(org.virtue.game.content.social.SocialUser)
	 */
	@Override
	public void notifySave(FriendChatData data) {
		synchronized (friendChannelCache) {
			if (friendChannelCache.containsKey(data.getOwnerHash())) {
				friendChannelCache.get(data.getOwnerHash()).refreshSettings(data);
				if (!data.hasFriendChannel()) {
					friendChannelCache.remove(data.getOwnerHash());
				}
			}
		}
	}
	
	/**
	 * Loads the friend chat channel for the specified owner into the cache
	 * @param ownerHash The owner hash
	 */
	private void loadChannel (long ownerHash) {
		if (friendChannelCache.containsKey(ownerHash)) {
			return;//Already loaded
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(ownerHash);
		if (info == null) {
			return;//Player does not exist
		}
		Player owner = null;
		for (Player player : World.getInstance().getPlayers()) {
			if (player.getUserHash() == ownerHash) {
				owner = player;
				break;
			}
		}
		for (Player player : Lobby.getInstance().getPlayers()) {
			if (player.getUserHash() == ownerHash) {
				owner = player;
				break;
			}
		}
		FriendChatData chatData;
		if (owner != null) {//Loads the data from an online player
			chatData = owner.getChat().getFriendChatData();
		} else {//Loads the data directly from file
			@SuppressWarnings("unchecked")
			List<Ignore> ignores = (List<Ignore>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(info.getUsername(), ParserDataType.IGNORE);
			FriendsList.Data friendData = (Data) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(info.getUsername(), ParserDataType.FRIEND);
			chatData = new OfflineChatData(friendData, ignores, info);		
		}
		if (!chatData.hasFriendChannel()) {
			return;
		}
		FriendChannel channel = new FriendChannel(chatData.getOwnerHash(), chatData.getOwnerName(), chatData.getChannelName());
		channel.refreshSettings(chatData);
		friendChannelCache.put(ownerHash, channel);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#joinChannel(org.virtue.game.content.social.SocialUser, long)
	 */
	@Override
	public void joinChannel(SocialUser user, long ownerHash) {
		if (!friendChannelCache.containsKey(ownerHash)) {
			loadChannel(ownerHash);
		}
		FriendChannel channel = friendChannelCache.get(ownerHash);
		if (channel == null) {
			user.sendMessage("The channel you tried to join does not exist.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.setFriendChatOwner(0L);
			return;
		}
		if (channel.isBanned(user.getHash())) {
			user.sendMessage("You are not allowed to join this user's friends chat channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.setFriendChatOwner(0L);
			return;
		}
		if (!channel.canJoin(channel.getPlayerRank(user))) {
			user.sendMessage("You do not have a high enough rank to join this friends chat channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.setFriendChatOwner(0L);
			return;
		}
		if (channel.isTempBanned(user.getHash())) {
			user.sendMessage("You are temporarily banned from this friends chat channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.setFriendChatOwner(0L);
			return;
		}
		if (channel.join(user)) {
			user.setFriendChatOwner(channel.getOwnerHash());
			user.sendMessage("Now talking in friends chat channel "+channel.getName(), ChannelType.FRIENDCHANNEL_SYSTEM);
		} else {
			user.setFriendChatOwner(0L);
			user.sendMessage("The channel you tried to join is currently full.", ChannelType.FRIENDCHANNEL_SYSTEM);
		}		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#leaveChannel(org.virtue.game.content.social.SocialUser, boolean)
	 */
	@Override
	public void leaveChannel(SocialUser user, boolean isLoggedOut) {
		long ownerHash = user.getFriendChatOwner();
		if (ownerHash == 0L) {
			if (isLoggedOut) {
				return;
			}
			user.sendMessage("You are not currently in a channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.setFriendChatOwner(0L);
			return;
		}
		if (friendChannelCache.containsKey(ownerHash)) {
			if (friendChannelCache.get(ownerHash).leave(user)) {
				friendChannelCache.remove(ownerHash);
			}
		}		
		if (isLoggedOut) {
			return;
		}
		user.setFriendChatOwner(0L);
		user.sendMessage("You have left the channel.", ChannelType.FRIENDCHANNEL_SYSTEM);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#sendMessage(org.virtue.game.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public void sendMessage(SocialUser user, String message) {
		message = StringUtility.formatChatMessage(message);
		long ownerHash = user.getFriendChatOwner();
		if (ownerHash == 0L || !friendChannelCache.containsKey(ownerHash)) {
			user.sendMessage("You are not currently in a channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.sendLeaveFriendChat();
			user.setFriendChatOwner(0L);
			return;
		}
		FriendChannel channel = friendChannelCache.get(ownerHash);
		if (!channel.canTalk(channel.getPlayerRank(user))) {
			user.sendMessage("You are not allowed to talk in this friends chat channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			return;
		}
		MessageEventContext messageObject = new MessageEventContext(ChannelType.FRIENDCHANNEL, message, user.getName(), user.getName(), user.getChatCrown(), channel.getName());
		channel.sendMessage(messageObject);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#sendQuickMessage(org.virtue.game.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public void sendQuickMessage(SocialUser user, QuickChatMessage message) {
		long ownerHash = user.getFriendChatOwner();
		if (ownerHash == 0L || !friendChannelCache.containsKey(ownerHash)) {
			user.sendMessage("You are not currently in a channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.sendLeaveFriendChat();
			user.setFriendChatOwner(0L);
			return;
		}
		FriendChannel channel = friendChannelCache.get(ownerHash);
		if (!channel.canTalk(channel.getPlayerRank(user))) {
			user.sendMessage("You are not allowed to talk in this friends chat channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			return;
		}
		MessageEventContext messageObject = new QuickMessageEventContext(ChannelType.FRIENDCHANNEL_QUICKCHAT, message, user.getName(), user.getName(), user.getChatCrown(), channel.getName());
		channel.sendMessage(messageObject);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatAPI#kickBanUser(org.virtue.game.content.social.SocialUser, long)
	 */
	@Override
	public void kickBanUser(SocialUser user, long banhash) {
		long ownerHash = user.getFriendChatOwner();
		if (ownerHash == 0L || !friendChannelCache.containsKey(ownerHash)) {
			user.sendMessage("You are not currently in a channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			user.sendLeaveFriendChat();
			user.setFriendChatOwner(0L);
			return;
		}
		FriendChannel channel = friendChannelCache.get(ownerHash);
		if (!channel.canKick(channel.getPlayerRank(user))) {
			user.sendMessage("You do not have permission to kick users in this channel.", ChannelType.FRIENDCHANNEL_SYSTEM);
			return;
		}
		if (user.getHash() == banhash) {
			return;//Cannot kick self
		}
		AccountInfo banInfo = Virtue.getInstance().getAccountIndex().lookupByHash(banhash);
		if (banInfo == null) {
			return;//User does not exist
		}
		if (channel.getPlayerRank(user).getId() <= channel.getPlayerRank(banhash, banInfo.getType()).getId()) {
			user.sendMessage("You do not have permission to kick this user.", ChannelType.FRIENDCHANNEL_SYSTEM);
			return;
		}
		if (channel.isTempBanned(banhash)) {
			channel.kickBanUser(banhash);
			user.sendMessage("Your request to refresh this user's temporary ban was successful.", ChannelType.FRIENDCHANNEL_SYSTEM);
		} else {
			channel.kickBanUser(banhash);
			user.sendMessage("Your request to kick/ban this user was successful.", ChannelType.FRIENDCHANNEL_SYSTEM);
		}
	}	
}
