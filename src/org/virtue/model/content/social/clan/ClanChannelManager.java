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
package org.virtue.model.content.social.clan;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.virtue.model.content.social.SocialUser;
import org.virtue.network.event.context.impl.out.MessageEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.network.event.context.impl.out.QuickMessageEventContext;
import org.virtue.utility.text.QuickChatMessage;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/12/2014
 */
public class ClanChannelManager implements ClanChannelAPI {
	
	private Map<Long, ClanChannel> clanCache = Collections.synchronizedMap(new HashMap<Long, ClanChannel>());
	
	private final ClanManager clanManager;
	
	public ClanChannelManager (ClanManager clanManager) {
		this.clanManager = clanManager;
	}
	
	/**
	 * Runs the update tasks for a clan, such as dispatching any delta updates to the players in the clan channel
	 */
	protected void runUpdateTasks () {
		synchronized (clanCache) {
			for (ClanChannel channel : clanCache.values()) {
				channel.dispatchUpdates();//Run through any pending tick events for the channel
			}
		}
	}
	
	private ClanChannel getClanChannel (long clanHash) {
		if (clanCache.containsKey(clanHash)) {
			return clanCache.get(clanHash);
		}	
		ClanSettings settings = clanManager.getClanData(clanHash);
		if (settings == null) {
			return null;//Clan does not exist
		}
		clanCache.put(clanHash, new ClanChannel(settings));
		return clanCache.get(clanHash);
	}
	
	/**
	 * Sends an update to all users in the channel for the specified user.
	 * This is used when the user changes their display name or world ID
	 * @param userHash The hash of the user to update
	 */
	protected void notifyUserUpdated (long userHash) {
		synchronized (clanCache) {
			for (ClanChannel channel : clanCache.values()) {
				channel.updateUser(userHash);
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#joinMyChannel(org.virtue.model.content.social.SocialUser)
	 */
	@Override
	public void joinMyChannel(SocialUser player) {
		long clanHash = player.getMyClanHash();
		//System.out.println("Joining channel "+clanHash);
		if (clanHash == 0L) {
			return;//Not in a clan
		}
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			player.sendMessage("Error loading clan. Please try again later.", ChannelType.CLANCHANNEL_SYSTEM);
			return;//Clan does not exist
		}
		if (!channel.getSettings().inClan(player.getHash())) {
			player.sendMessage("You're no longer a part of a clan.", ChannelType.CLANCHANNEL_SYSTEM);
			player.setMyClanHash(0L);
			return;
		}
		channel.join(player, false);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#joinGuestChannel(org.virtue.model.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public void joinGuestChannel(SocialUser player, String clanName) {
		long clanHash = clanManager.getIndex().resolveClan(clanName);
		if (clanHash == 0L) {
			player.sendMessage("Could not find a clan named "+clanName+". Please check the name and try again.", ChannelType.CLANCHANNEL_SYSTEM);
			return;
		}
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			player.sendMessage("Could not find a clan named "+clanName+". Please check the name and try again.", ChannelType.CLANCHANNEL_SYSTEM);
			return;
		}
		if (channel.getSettings().inClan(player.getHash())) {
			player.sendMessage("You cannot join your clan's chat channel as a guest.", ChannelType.CLANCHANNEL_SYSTEM);
			return;
		}
		if (!channel.getSettings().allowNonMembers()) {
			player.sendMessage("That clan only allows clanmates to join their clan channel.", ChannelType.CLANCHANNEL_SYSTEM);
			return;
		}
		if (clanManager.getClanData(clanHash).isBanned(player.getHash())) {
			player.sendMessage("You have been banned from the clan channel.", ChannelType.CLANCHANNEL_SYSTEM);
			return;
		}
		//TODO: Check whether the channel is full or the player is temp-banned
		//System.out.println("Joining clan "+clanName+" of hash "+clanHash+" as a guest.");
		channel.join(player, true);
		player.setGuestClanHash(clanHash, false);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#leaveChannel(org.virtue.model.content.social.SocialUser, boolean, boolean)
	 */
	@Override
	public void leaveChannel(SocialUser player, boolean isGuest, boolean isLogout) {
		long clanHash = isGuest ? player.getGuestClanHash(false) : player.getMyClanHash();
		if (clanHash == 0L) {
			return;
		}
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			if (!isLogout) {
				player.sendLeaveClanChannel(isGuest);
			}
			return;
		}
		channel.leave(player, isGuest);
		if (!isLogout) {
			player.sendLeaveClanChannel(isGuest);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#sendMessage(org.virtue.model.content.social.SocialUser, java.lang.String, boolean)
	 */
	@Override
	public void sendMessage(SocialUser player, String message, boolean isGuest) {
		if (player.isMuted()) {
			player.sendMessage("You are currently muted and unable to use the chat system.", ChannelType.GAME);
			return;
		}
		long clanHash = isGuest ? player.getGuestClanHash(false) : player.getMyClanHash();
		message = StringUtility.formatChatMessage(message);
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			player.sendMessage("You aren't"+(isGuest?" a guest":"")+" in a"+(isGuest?" visited":"")+" Clan Chat channel.", ChannelType.GAME);
			return;
		}
		if (!channel.canTalk(player.getHash())) {
			player.sendMessage("Cannot talk.", ChannelType.GAME);//TODO: Fix message
			return;
		}
		MessageEventContext mainMessage = new MessageEventContext(ChannelType.CLANCHANNEL, message, player.getName(), player.getName(), player.getType());
		MessageEventContext guestMessage = new MessageEventContext(ChannelType.CLANCHANNEL_GUEST, message, player.getName(), player.getName(), player.getType());
		channel.sendMessage(mainMessage, guestMessage);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#sendQuickMessage(org.virtue.model.content.social.SocialUser, org.virtue.utility.QuickChatMessage, boolean)
	 */
	@Override
	public void sendQuickMessage(SocialUser player, QuickChatMessage message, boolean isGuest) {
		long clanHash = isGuest ? player.getGuestClanHash(false) : player.getMyClanHash();
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			player.sendMessage("You aren't"+(isGuest?" a guest":"")+" in a"+(isGuest?" visited":"")+" Clan Chat channel.", ChannelType.GAME);
			return;
		}
		if (!channel.canTalk(player.getHash())) {
			player.sendMessage("Cannot talk.", ChannelType.GAME);//TODO: Fix message
			return;
		}
		MessageEventContext mainMessage = new QuickMessageEventContext(ChannelType.CLANCHANNEL_QUICKCHAT, message, player.getName(), player.getName(), player.getType());
		MessageEventContext guestMessage = new QuickMessageEventContext(ChannelType.CLANCHANNEL_GUEST_QUICKCHAT, message, player.getName(), player.getName(), player.getType());
		channel.sendMessage(mainMessage, guestMessage);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanChannelAPI#removeUser(long, long)
	 */
	@Override
	public boolean removeUser(long userHash, long clanHash) {
		ClanChannel channel = getClanChannel(clanHash);
		if (channel == null) {
			return false;
		}
		channel.removeUserByHash(userHash);
		return true;
	}

}
