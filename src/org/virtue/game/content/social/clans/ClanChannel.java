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
package org.virtue.game.content.social.clans;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import org.virtue.game.content.social.ChannelType;
import org.virtue.game.content.social.SocialUser;
import org.virtue.network.event.context.impl.out.ClanChannelDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanChannelEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * Represents a clan chat channel
 *
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */
public class ClanChannel {
	
	private final ClanSettings clanData;
	
	private ClanChannelDelta delta;
	
	private final Queue<SocialUser> initQueue = new LinkedList<SocialUser>();
	
	private final List<ClanChannelUser> users = new ArrayList<ClanChannelUser>();
	
	private final List<Long> tempBans = new ArrayList<Long>();
	
	private long updateNumber;
	
	private final long clanHash;
	
	private String clanName;
	private boolean allowUnaffined;
	private byte rankTalk;
	private byte rankKick;
	
	public ClanChannel (ClanSettings data) {
		this.clanData = data;
		this.clanData.linkChannel(this);
		this.updateNumber = 1L;	
		this.clanHash = data.getClanHash();
		this.clanName = data.getClanName();
		this.allowUnaffined = data.allowNonMembers();
		this.rankTalk = data.getMinTalk().getID();
		this.rankKick = data.getMinKick().getID();
	}
	
	/**
	 * Returns the underlying data for the clan.
	 * @return	The clan data
	 */
	protected ClanSettings getSettings () {
		return clanData;
	}
	
	protected boolean join (SocialUser player, boolean isAffined) {
		//System.out.println("Joining clan "+clanData.getClanName()+" of hash "+clanData.getClanHash()+" as a guest.");
		//TODO: Check whether the channel is full
		synchronized (users) {
			if (initQueue.contains(player)) {
				return false;//Join already in progress
			} 
			SocialUser oldUser = getUser(player.getHash());
			
			if (oldUser != null) {
				leave(oldUser, oldUser.getAffinedClanHash() == clanHash);
				oldUser.sendLeaveClanChannel(oldUser.getAffinedClanHash() == clanHash);
			}
			ClanChannelUser user = new ClanChannelUser(player);
			user.isAffined = player.getAffinedClanHash() == clanHash;
			user.rank = clanData.getRank(player.getHash()).getID();
			getDelta().addUser(user);
			initQueue.offer(player);
		}
		return true;
	}
	
	/**
	 * Removes the player from the clan chat channel
	 * @param player The player to remove
	 * @param isAffined Whether the user is leaving their affined clan's channel
	 * @return True if the player was the last user in the channel (and therefore is empty), false otherwise
	 */
	protected boolean leave (SocialUser player, boolean isAffined) {
		removeUser(player.getHash());
		return users.isEmpty();
	}
	
	protected void removeUserByHash (long userHash) {
		synchronized (users) {
			for (int slot = 0; slot<users.size();slot++) {
				ClanChannelUser user = users.get(slot);
				if (user.userHash == userHash) {
					users.remove(slot);
					getDelta().deleteUser(slot, userHash);
					user.player.sendLeaveClanChannel(user.isAffined);
					break;
				}
			}
		}
	}
	
	protected void removeUser (long userHash) {
		synchronized (users) {
			for (int slot=0;slot<users.size();slot++) {
				if (users.get(slot).userHash == userHash) {
					users.remove(slot);
					getDelta().deleteUser(slot, userHash);
					return;
				}
			}
		}		
	}
	
	public SocialUser getUser (long userhash) {
		for (ClanChannelUser u : users) {
			if (u.userHash == userhash) {
				return u.player;
			}
		}
		return null;
	}
	
	public boolean isTempBanned (long userhash) {
		return tempBans.contains(userhash);
	}
	
	public boolean allowUnaffined () {
		return allowUnaffined;
	}
	
	public boolean canTalk (long userhash) {
		return rankTalk <= clanData.getRank(userhash).getID();
	}
	
	/**
	 * Sends the specified message to all users in the channel
	 * @param affinedMessage The message to send to all clan members
	 * @param guestMessage The message to send to all guests
	 */
	protected void sendMessage (MessageEventContext affinedMessage, MessageEventContext guestMessage) {
		for (ClanChannelUser user : users) {
			if (user == null) {
				continue;
			}
			if (user.isAffined) {
				user.player.sendMessage(affinedMessage);
			} else {
				user.player.sendMessage(guestMessage);
			}
		}
	}
	
	
	/**
	 * Sends a broadcast system message to clan members
	 * @param message The message to send
	 * @param minRank The minimum rank that must be held in order to receive the message
	 */
	protected void sendBroadcast (String message, ClanRank minRank) {
		MessageEventContext affinedMessage = new MessageEventContext(ChannelType.CLANCHANNEL_SYSTEM, message);
		for (ClanChannelUser user : users) {
			if (user == null) {
				continue;
			}
			if (user.isAffined && user.rank >= minRank.getID()) {
				user.player.sendMessage(affinedMessage);
			}
		}
	}
	
	/**
	 * Queues an update packet for the user with the specified name within the channel. If the user is not in the channel, no update is sent
	 * @param userhash	The hash of the user to update
	 * @param rank The new rank of the channel user
	 */
	protected void updateUserRank (long userhash, byte rank) {
		synchronized (users) {
			for (int slot=0;slot<users.size();slot++) {
				ClanChannelUser user = users.get(slot);
				if (user.userHash == userhash) {
					user.rank = rank;
					getDelta().updateUser(user, slot);
					break;
				}
			}
		}
	}
	
	/**
	 * Updates the display name of a user potentially within the channel. If the user is not in the channel, no update is sent
	 * @param userhash	The hash of the user to update
	 * @param displayName The new display name of the channel user
	 */
	protected void updateUserName (long userhash, String displayName) {
		synchronized (users) {
			for (int slot=0;slot<users.size();slot++) {
				ClanChannelUser user = users.get(slot);
				if (user.userHash == userhash) {
					user.displayName = displayName;
					getDelta().updateUser(user, slot);
					break;
				}
			}
		}
	}
	
	protected void updateBaseSettings (String name, boolean allowUnaffined, byte rankTalk, byte rankKick) {
		this.clanName = name;
		this.allowUnaffined = allowUnaffined;
		this.rankTalk = rankTalk;
		this.rankKick = rankKick;
		getDelta().updateBaseSettings(name, allowUnaffined, rankTalk, rankKick);
	}
	
	private ClanChannelDelta getDelta() {
		synchronized (this) {
			if (delta == null) {
				delta = new ClanChannelDelta(clanHash, updateNumber, false);
			}
			return delta;
		}		
	}
	
	/**
	 * Sends the clan channel delta updates to everyone currently in the channel
	 */
	protected void dispatchUpdates () {
		if (delta == null) {
			sendInitPackets();
			return;
		}
		ClanChannelDelta updateDelta;
		synchronized (this) {
			updateDelta = delta;
			delta = null;
			updateNumber++;
		}
		
		ClanChannelDeltaEventContext affinedPacket = new ClanChannelDeltaEventContext(true, updateDelta);
		ClanChannelDeltaEventContext guestPacket = new ClanChannelDeltaEventContext(false, updateDelta);
		synchronized (users) {
			for (ClanChannelUser user : users) {
				if (user.isAffined) {
					user.player.sendClanChannelDelta(affinedPacket);
				} else {
					user.player.sendClanChannelDelta(guestPacket);
				}
			}			
		}
		sendInitPackets();
	}
	
	/**
	 * Sends any queued initialisation packets
	 */
	private void sendInitPackets () {
		if (initQueue.isEmpty()) {
			return;
		}
		ClanChannelEventContext.User[] entries;
		synchronized (users) {
			for (SocialUser user : initQueue) {
				ClanChannelUser u = new ClanChannelUser(user);
				u.rank = clanData.getRank(u.userHash).getID();
				u.isAffined = user.getAffinedClanHash() == clanData.getClanHash();
				users.add(u);
			}
			entries = new ClanChannelEventContext.User[users.size()];
			for (int i=0;i<users.size();i++) {
				ClanChannelUser u = users.get(i);
				entries[i] = new ClanChannelEventContext.User(u.displayName, u.rank, u.nodeID);
			}
		}
		SocialUser u = null;
		while ((u = initQueue.poll()) != null) {
			//System.out.println("Sending init packet to player "+u.getDisplayName()+", clan="+clanData.getClanName()+", isGuest="+!u.isMyClan(clanData.getClanHash()));
			sendInitPacket(u, entries, u.getAffinedClanHash() == clanData.getClanHash());
		}
	}
	
	/**
	 * Sends the channel initialisation packet to the specified user
	 * @param user		The user to send the init packet to
	 * @param entires	An array of users currently in the channel
	 * @param isAffined Whether the user is affined to this clan
	 */
	private void sendInitPacket (SocialUser user, ClanChannelEventContext.User[] entries, boolean isAffined) {
		ClanChannelEventContext packet = new ClanChannelEventContext(isAffined, entries, clanHash,
				updateNumber, clanName, allowUnaffined, rankTalk, rankKick);
		user.sendClanChannelFull(packet);
	}
	
	@Override
	public boolean equals (Object anObject) {
		if (this == anObject) {
            return true;
        }
		if (anObject instanceof ClanChannel) {
			ClanChannel anotherChannel = (ClanChannel) anObject;
			return anotherChannel.clanHash == this.clanHash;
		}
		return false;
		
	}
}
