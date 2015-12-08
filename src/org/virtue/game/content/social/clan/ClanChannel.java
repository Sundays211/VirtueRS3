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
package org.virtue.game.content.social.clan;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import org.virtue.game.content.social.ChannelType;
import org.virtue.game.content.social.SocialUser;
import org.virtue.game.content.social.clan.ccdelta.AddMember;
import org.virtue.game.content.social.clan.ccdelta.ClanChannelDelta;
import org.virtue.game.content.social.clan.ccdelta.DeleteMember;
import org.virtue.game.content.social.clan.ccdelta.UpdateMember;
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
	
	private final Queue<ClanChannelDelta> updates = new LinkedList<ClanChannelDelta>();
	
	private final Queue<SocialUser> initQueue = new LinkedList<SocialUser>();
	
	private final List<SocialUser> users = new ArrayList<SocialUser>();
	
	private final List<Long> tempBans = new ArrayList<Long>();
	
	private long updateNumber;
	
	public ClanChannel (ClanSettings data) {
		this.clanData = data;
		clanData.linkChannel(this);
		updateNumber = 1L;		
	}
	
	/**
	 * Returns the underlying data for the clan.
	 * @return	The clan data
	 */
	protected ClanSettings getSettings () {
		return clanData;
	}
	
	protected boolean join (SocialUser player, boolean isGuest) {
		//System.out.println("Joining clan "+clanData.getClanName()+" of hash "+clanData.getClanHash()+" as a guest.");
		//TODO: Check whether the channel is full
		synchronized (users) {
			SocialUser oldUser = getUser(player.getHash());
			if (initQueue.contains(player)) {
				return false;//Join already in progress
			} else if (oldUser != null) {
				leave(oldUser, oldUser.getMyClanHash() != clanData.getClanHash());
				oldUser.sendLeaveClanChannel(oldUser.getMyClanHash() != clanData.getClanHash());
			}
			queueUpdate(new AddMember(player.getName(), clanData.getRank(player.getHash()), player.getNodeID()));
			initQueue.offer(player);
		}
		return true;
	}
	
	/**
	 * Removes the player from the clan chat channel
	 * @param player	The player to remove
	 * @param isGuest	Whether the user is leaving a guest clan channel
	 * @return			True if the player was the last user in the channel (and therefore is empty), false otherwise
	 */
	protected boolean leave (SocialUser player, boolean isGuest) {
		removeUser(player);
		return users.isEmpty();
	}
	
	protected void removeUserByHash (long userHash) {
		synchronized (users) {
			for (int slot = 0; slot<users.size();slot++) {
				SocialUser user = users.get(slot);
				if (user.getHash() == userHash) {
					users.remove(slot);
					queueUpdate(new DeleteMember(slot));
					user.sendLeaveClanChannel(user.getMyClanHash() != clanData.getClanHash());
					break;
				}
			}
		}
	}
	
	protected void removeUser (SocialUser user) {
		int slot;
		synchronized (users) {
			slot = users.indexOf(user);
			//System.out.println("Removing user "+user.getName()+" at index "+index);
			if (slot == -1) {
				return;
			}
			users.remove(slot);
			queueUpdate(new DeleteMember(slot));
		}		
	}
	
	public SocialUser getUser (long userhash) {
		for (SocialUser u : users) {
			if (u.getHash() == userhash) {
				return u;
			}
		}
		return null;
	}
	
	public boolean isTempBanned (long userhash) {
		return tempBans.contains(userhash);
	}
	
	public boolean canTalk (long userhash) {
		return clanData.getMinTalk().getID() <= clanData.getRank(userhash).getID();
	}
	
	/**
	 * Sends the specified message to all users in the channel
	 * @param mainMessage	The message to send to all clan members
	 * @param guestMessage	The message to send to all guests
	 */
	protected void sendMessage (MessageEventContext mainMessage, MessageEventContext guestMessage) {
		synchronized (users) {
			for (SocialUser u : users) {
				if (u == null) {
					continue;
				}
				if (u.getMyClanHash() == clanData.getClanHash()) {
					u.sendMessage(mainMessage);
				} else {
					u.sendMessage(guestMessage);
				}
			}
		}
	}
	
	
	/**
	 * Sends a broadcast system message to clan members
	 * @param message The message to send
	 * @param minRank The minimum rank that must be held in order to receive the message
	 */
	protected void sendBroadcast (String message, ClanRank minRank) {
		MessageEventContext mainMessage = new MessageEventContext(ChannelType.CLANCHANNEL_SYSTEM, message);
		synchronized (users) {
			for (SocialUser u : users) {
				if (u == null) {
					continue;
				}
				if (u.getMyClanHash() == clanData.getClanHash()
						&& clanData.getRank(u.getHash()).getID() >= minRank.getID()) {
					u.sendMessage(mainMessage);
				}
			}
		}
	}
	
	/**
	 * Queues an update to the clan channel which will be sent on the next tick
	 * @param node	The update node to queue
	 */
	protected void queueUpdate (ClanChannelDelta node) {
		synchronized (updates) {
			updates.offer(node);
		}
	}
	
	/**
	 * Queues an update packet for the user with the specified name within the channel. If the user is not in the channel, no update is sent
	 * @param userhash	The hash of the user to update
	 */
	protected void updateUser (long userhash) {
		SocialUser member = null;
		synchronized (users) {
			for (SocialUser u : users) {
				if (u.getHash() == userhash) {
					member = u;
					break;
				}
			}
		}
		if (member != null) {
			synchronized (updates) {
				int slot = users.indexOf(member);
				queueUpdate(new UpdateMember(slot, member.getName(), clanData.getRank(userhash), member.getNodeID()));
			}
		}
	}
	
	/**
	 * Sends the clan channel delta updates to everyone currently in the channel
	 */
	protected void dispatchUpdates () {
		if (updates.isEmpty()) {
			sendInitPackets();
			return;
		}
		ClanChannelDelta[] deltaNodes;
		long thisUpdate = updateNumber;
		synchronized (updates) {
			deltaNodes = new ClanChannelDelta[updates.size()];
			updates.toArray(deltaNodes);
			updates.clear();
			updateNumber++;
		}
		ClanChannelDeltaEventContext memberPacket = new ClanChannelDeltaEventContext(false, clanData.getClanHash(), thisUpdate, deltaNodes);
		ClanChannelDeltaEventContext guestPacket = new ClanChannelDeltaEventContext(true, clanData.getClanHash(), thisUpdate, deltaNodes);
		synchronized (users) {
			for (SocialUser u : users) {
				if (u.getMyClanHash() == clanData.getClanHash()) {
					u.sendClanChannelDelta(memberPacket);
				} else {
					u.sendClanChannelDelta(guestPacket);
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
			for (SocialUser u : initQueue) {
				users.add(u);
			}
			entries = new ClanChannelEventContext.User[users.size()];
			for (int i=0;i<users.size();i++) {
				SocialUser u = users.get(i);
				entries[i] = new ClanChannelEventContext.User(u.getName(), clanData.getRank(u.getHash()), u.getNodeID());
			}
		}
		SocialUser u = null;
		while ((u = initQueue.poll()) != null) {
			//System.out.println("Sending init packet to player "+u.getDisplayName()+", clan="+clanData.getClanName()+", isGuest="+!u.isMyClan(clanData.getClanHash()));
			sendInitPacket(u, entries, u.getMyClanHash() != clanData.getClanHash());
		}
	}
	
	/**
	 * Sends the channel initialisation packet to the specified user
	 * @param user		The user to send the init packet to
	 * @param entires	An array of users currently in the channel
	 * @param isGuest	Whether the user is a guest in this channel
	 */
	private void sendInitPacket (SocialUser user, ClanChannelEventContext.User[] entries, boolean isGuest) {
		ClanChannelEventContext packet = new ClanChannelEventContext(isGuest, entries, clanData.getClanHash(),
				updateNumber, clanData.getClanName(), clanData.getMinTalk(), clanData.getMinKick());
		user.sendClanChannelFull(packet);
	}
	
	@Override
	public boolean equals (Object anObject) {
		if (this == anObject) {
            return true;
        }
		if (anObject instanceof ClanChannel) {
			ClanChannel anotherChannel = (ClanChannel) anObject;
			return anotherChannel.clanData.getClanHash() == this.clanData.getClanHash();
		}
		return false;
		
	}
}
