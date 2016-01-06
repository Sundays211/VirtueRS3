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

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitOverflowException;
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.game.content.social.SocialUser;
import org.virtue.game.content.social.clan.ccdelta.UpdateDetails;
import org.virtue.game.content.social.clan.csdelta.AddBan;
import org.virtue.game.content.social.clan.csdelta.AddMember;
import org.virtue.game.content.social.clan.csdelta.ClanSettingsDelta;
import org.virtue.game.content.social.clan.csdelta.DeleteBan;
import org.virtue.game.content.social.clan.csdelta.DeleteMember;
import org.virtue.game.content.social.clan.csdelta.SetMemberVarBit;
import org.virtue.game.content.social.clan.csdelta.SetVarBitValue;
import org.virtue.game.content.social.clan.csdelta.SetVarValue;
import org.virtue.game.content.social.clan.csdelta.UpdateRank;
import org.virtue.game.entity.player.AccountInfo;
import org.virtue.network.event.context.impl.out.ClanSettingsDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanSettingsEventContext;

/**
 * Represents the underlying settings data for a clan
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */
public class ClanSettings {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ClanSettings.class);
	
	private static VarType[] varClanSettingTypes;
	
	public static void init (Archive varClanSettings, ReferenceTable.Entry referenceEntry) throws IOException {
		varClanSettingTypes = new VarType[referenceEntry.capacity()];
		for (int key=0;key<referenceEntry.capacity();key++) {
			ReferenceTable.ChildEntry entry = referenceEntry.getEntry(key);
			if (entry == null) {
				continue;
			}
			ByteBuffer data = varClanSettings.getEntry(entry.index());
			varClanSettingTypes[key] = VarType.decode(data, key, VarDomainType.PLAYER);
		}
		logger.info("Found "+varClanSettings.size()+" varClanSettingType definitions.");
	}
	
	public static class Data {
		public List<ClanMember> members = new ArrayList<ClanMember>();
		public List<Long> bans = new ArrayList<Long>();
		public ClanRank minTalkRank = ClanRank.RECRUIT;
		public ClanRank minKickRank = ClanRank.RECRUIT;
		public String clanName = "";
		public long clanHash = 0L;
		public int updateNumber = 0;
		public boolean allowNonMembers = true;
		public Map<Integer, Object> varValues = new HashMap<Integer, Object>();
	}
	
	private final long clanHash;
	
	private String clanName;
	
	private ClanRank minTalkRank = ClanRank.RECRUIT;
	
	private ClanRank minKickRank = ClanRank.RECRUIT;
	
	//private ClanRank minLootShareRank = ClanRank.RECRUIT;
	
	private boolean allowNonMembers = true;
	
	private transient ClanChannel linkedChannel;
	
	private int updateNumber = 0;
	
	private int ownerSlot = -1;
	
	private int replacementOwnerSlot = -1;
	
	private final List<ClanMember> members = Collections.synchronizedList(new ArrayList<ClanMember>());
	
	private final List<ClanBan> bans = Collections.synchronizedList(new ArrayList<ClanBan>());
	
	private transient final List<SocialUser> onlineMembers = Collections.synchronizedList(new ArrayList<SocialUser>());
	private transient final List<SocialUser> onlineGuests = Collections.synchronizedList(new ArrayList<SocialUser>());
	
	private transient final Queue<SocialUser> initQueue = new LinkedList<SocialUser>();
	
	private transient final Queue<ClanSettingsDelta> updateQueue = new LinkedList<ClanSettingsDelta>();
	
	private final Map<Integer, Object> varValues = Collections.synchronizedMap(new HashMap<Integer, Object>());
	
	//private final EnumMap<ClanRank, EnumSet<ClanPermission>> permissions = new EnumMap<ClanRank, EnumSet<ClanPermission>>(ClanRank.class);
	
	private boolean needsSave;
	
	public ClanSettings (long clanHash, int updateNumber, String clanName) {
		this.clanHash = clanHash;
		this.updateNumber = updateNumber;
		this.clanName = clanName;
		this.needsSave = true;
	}
	
	public ClanSettings (Data data) {
		this(data.clanHash, data.updateNumber, data.clanName);
		this.allowNonMembers = data.allowNonMembers;
		this.minTalkRank = data.minTalkRank;
		this.minKickRank = data.minKickRank;
		
		for (ClanMember member : data.members) {
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(member.getUserHash());
			if (info == null) {
				member.setDisplayName(AccountInfo.generateNamePlaceholder(member.getUserHash()));
			} else {
				member.setDisplayName(info.getDisplayName());
			}
			members.add(member);
		}
		findClanOwner();
		for (long banHash : data.bans) {
			ClanBan ban = new ClanBan(banHash);
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(banHash);
			if (info == null) {
				ban.setDisplayName(AccountInfo.generateNamePlaceholder(banHash));
			} else {
				ban.setDisplayName(info.getDisplayName());
			}
			bans.add(ban);
		}
		
		varValues.putAll(data.varValues);
		needsSave = false;
	}
	
	/**
	 * Queues an update to the clan settings which will be sent on the next tick
	 * @param node	The update node to queue
	 */
	protected void queueUpdate (ClanSettingsDelta node) {
		synchronized (updateQueue) {
			updateQueue.offer(node);
		}
		needsSave = true;
	}
	
	public boolean needsSave () {
		return needsSave;
	}
	
	public void onSaved () {
		needsSave = false;
	}
	
	/**
	 * Sends the clan settings delta updates to every clan member who is currently logged in
	 */
	protected void dispatchUpdates () {
		if (updateQueue.isEmpty()) {
			sendInitPackets(updateNumber);
			return;
		}
		ClanSettingsDelta[] deltaNodes;
		int thisUpdate = updateNumber;
		synchronized (updateQueue) {
			deltaNodes = new ClanSettingsDelta[updateQueue.size()];
			updateQueue.toArray(deltaNodes);
			updateQueue.clear();
			updateNumber++;
		}
		ClanSettingsDeltaEventContext memberPacket = new ClanSettingsDeltaEventContext(false, thisUpdate, deltaNodes);
		ClanSettingsDeltaEventContext guestPacket = new ClanSettingsDeltaEventContext(true, thisUpdate, deltaNodes);
		synchronized (onlineMembers) {
			for (SocialUser u : onlineMembers) {
				u.sendClanSettingsDelta(memberPacket);
				u.clanDataUpdated();
			}
			for (SocialUser u : onlineGuests) {
				u.sendClanSettingsDelta(guestPacket);
			}
		}
		sendInitPackets(updateNumber);
	}
	
	/**
	 * Sends any queued initialisation packets
	 */
	private void sendInitPackets (int updateNum) {
		if (initQueue.isEmpty()) {
			return;
		}
		ClanSettingsEventContext.Member[] entries;
		String[] banEntries;
		ClanSettingsEventContext.Variable[] varEntries;
		synchronized (onlineMembers) {			
			for (SocialUser u : initQueue) {
				if (u.getMyClanHash() == clanHash) {
					onlineMembers.add(u);
				} else {
					onlineGuests.add(u);
				}
			}
		}
		synchronized (members) {
			entries = new ClanSettingsEventContext.Member[members.size()];
			for (int i=0;i<members.size();i++) {
				ClanMember u = members.get(i);
				entries[i] = new ClanSettingsEventContext.Member(u.getDisplayName(), u.getRank(), 0, u.getJoinDay());
			}
		}
		synchronized (bans) {
			banEntries = new String[bans.size()];
			for (int i=0;i<bans.size();i++) {
				banEntries[i] = bans.get(i).getDisplayName();
			}
		}
		synchronized (varValues) {
			varEntries = new ClanSettingsEventContext.Variable[varValues.size()];
			int i=0;
			for (Map.Entry<Integer, Object> setting : varValues.entrySet()) {
				varEntries[i++] = new ClanSettingsEventContext.Variable(setting.getKey(), setting.getValue());
			}
		}
		ClanSettingsEventContext memberPacket = new ClanSettingsEventContext(false, clanName, entries, banEntries,
				updateNum, allowNonMembers, minTalkRank, minKickRank, varEntries);
		ClanSettingsEventContext guestPacket = new ClanSettingsEventContext(true, clanName, entries, banEntries,
				updateNum, allowNonMembers, minTalkRank, minKickRank, varEntries);
		SocialUser user;
		while ((user = initQueue.poll()) != null) {
			if (user.getMyClanHash() == clanHash) {
				user.sendClanSettingsFull(memberPacket);
			} else {
				user.sendClanSettingsFull(guestPacket);
			}
		}
	}
	
	protected void registerOnlineMember (SocialUser user) {
		synchronized(initQueue) {
			if (!initQueue.contains(user)) {
				initQueue.offer(user);
			}
		}
	}
	
	protected void deregisterOnlineMember (SocialUser user) {
		synchronized(initQueue) {
			if (initQueue.contains(user)) {
				initQueue.remove(user);
			} else if (onlineGuests.contains(user)) {
				onlineGuests.remove(user);
			} else if (onlineMembers.contains(user)) {
				onlineMembers.remove(user);
			}
		}
	}
	
	/**
	 * Sends a broadcast system message to clan members
	 * @param message The message to send
	 * @param minRank The minimum rank that must be held in order to receive the message
	 */
	protected void sendBroadcast (String message, ClanRank minRank) {
		if (linkedChannel != null) {
			linkedChannel.sendBroadcast(message, minRank);
		}
	}
	
	/**
	 * Queues an update packet for the user with the specified name within the channel. If the user is not in the channel, no update is sent
	 * @param userhash	The hash of the user to update
	 */
	protected void updateUser (long userhash) {
		/*ClanMember member = null;
		synchronized (members) {
			for (ClanMember m : members) {
				if (m.getUserHash() == userhash) {
					member = m;
					break;
				}
			}
		}
		if (member == null) {
			ClanBan ban = null;
			synchronized (bans) {
				for (ClanBan b : bans) {
					if (b.getUserHash() == userhash) {
						ban = b;
						break;
					}
				}
			}
			if (ban != null) {
				int slot = bans.indexOf(ban);
			}
		}
		/*if (member != null) {
			synchronized (updates) {
				int slot = users.indexOf(member);
				queueUpdate(new UpdateMember(slot, member.getName(), clanData.getRank(userhash), member.getNodeID()));
			}
		}*/
	}
	
	private void findClanOwner () {
		ownerSlot = -1;
		replacementOwnerSlot = -1;
		int highestRankSlot = 0;
		synchronized (members) {
			if (members.isEmpty()) {
				return;
			}
			ClanRank highestRank = members.get(0).getRank();
			for (int slot = 1;slot<members.size();slot++) {
				ClanRank rank = members.get(slot).getRank();
				if (rank.getID() > highestRank.getID()) {
					if (highestRank.equals(ClanRank.DEPUTY_OWNER)) {
						replacementOwnerSlot = highestRankSlot;
					}
					highestRankSlot = slot;
					highestRank = rank;
				} else if (rank.equals(ClanRank.DEPUTY_OWNER) && replacementOwnerSlot == -1) {
					replacementOwnerSlot = slot;
				}
				
			}
			ownerSlot = highestRankSlot;
			if (highestRankSlot != -1) {
				members.get(ownerSlot).setRank(ClanRank.OWNER);
			}		
		}
	}
	
	protected void linkChannel (ClanChannel channel) {
		this.linkedChannel = channel;
	}	
	
	protected void setName (String name) {
		this.clanName = name;
		updateChannelDetails();
	}
	
	protected void setAllowNonMembers (boolean allowNonMembers) {
		this.allowNonMembers = allowNonMembers;
	}
	
	protected void setMinTalkRank (ClanRank minTalkRank) {
		this.minTalkRank = minTalkRank;
		updateChannelDetails();
	}
	
	protected void setMinKickRank (ClanRank minKickRank) {
		this.minKickRank = minKickRank;
		updateChannelDetails();
	}
	
	private void updateChannelDetails () {
		if (linkedChannel != null) {
			linkedChannel.queueUpdate(new UpdateDetails(clanName, minKickRank, minKickRank));
		}
	}
	
	/**
	 * Returns the unique hash code for the clan
	 * @return	The clan hash
	 */
	public long getClanHash () {
		return clanHash;
	}
	
	/**
	 * Returns the current update revision for the clan
	 * @return	The update number
	 */
	public int getUpdateNum () {
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
	 * Returns the minimum rank needed to talk in the channel
	 * @return	The minimum talk rank
	 */
	public ClanRank getMinTalk () {
		return minTalkRank;
	}
	
	/**
	 * Returns the minimum rank needed to kick guests from the channel
	 * @return	The minimum kick rank
	 */
	public ClanRank getMinKick () {
		return minKickRank;
	}
	
	/**
	 * Returns whether guests are allowed to join the clan channel associated with this clan
	 * @return	True if guests are allowed to join, false otherwise
	 */
	public boolean allowNonMembers () {
		return allowNonMembers;
	}
	
	/**
	 * Returns whether the player of the specified name is a part of the clan.
	 * @param userhash	The hash of the player to check
	 * @return	True if the player is a member of the clan, false otherwise
	 */
	public boolean inClan (long userhash) {
		ClanMember member = getMember(userhash);
		return member != null;
	}
	
	public int getMemberCount () {
		return members.size();
	}
	
	/**
	 * Returns the rank of a player in the clan
	 * @param userhash	The hash of the player to check
	 * @return	The rank of the player
	 */
	public ClanRank getRank (long userhash) {
		ClanMember member = getMember(userhash);
		if (member != null) {
			return member.getRank();
		} else {
			return ClanRank.GUEST;
		}
	}
	
	public int getMemberVarBit (long userhash, int start, int end) {
		ClanMember member = getMember(userhash);
		if (member != null) {
			return member.getVarBitValue(start, end);
		} else {
			return -1;
		}
	}
	
	public boolean isBanned (long userhash) {
		if (getBan(userhash) == null) {
			return false;
		} else {
			return true;
		}
	}
	
	protected void addBan (long userhash) {
		ClanBan ban = new ClanBan(userhash);
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(userhash);
		ban.setDisplayName(info.getDisplayName());
		synchronized (bans) {
			bans.add(ban);
			queueUpdate(new AddBan(info.getDisplayName()));
		}
	}
	
	protected void removeBan (long userhash) {
		ClanBan ban = getBan(userhash);
		if (ban == null) {
			throw new NullPointerException(userhash+" is not banned in "+clanName);
		}
		synchronized (bans) {
			int slot = bans.indexOf(ban);
			bans.remove(slot);
			queueUpdate(new DeleteBan(slot));
		}
	}
	
	public Collection<ClanBan> getBans () {
		return bans;
	}
	
	public Collection<ClanMember> getMembers () {
		return members;
	}
	
	/**
	 * Returns the clan member object for a specified player. 
	 * @param userhash	The hash of the player to search for
	 * @return	The {@link ClanMember} object for the player, or null if the player is not in the clan.
	 */
	private ClanMember getMember (long userhash) {
		//TODO: Find a more efficient way of doing this
		for (ClanMember member : members) {
			if (member.getUserHash() == userhash) {
				return member;
			}
		}
		return null;
	}
	
	private ClanBan getBan (long userhash) {
		for (ClanBan ban : bans) {
			if (ban.getUserHash() == userhash) {
				return ban;
			}
		}
		return null;
	}
	
	public ClanMember getOwner () {
		if (ownerSlot == -1) {
			return null;
		}
		return getMember(ownerSlot);
	}
	
	public ClanMember getMember (int slot) {
		if (slot < 0 || slot >= members.size()) {
			return null;
		}
		synchronized (members) {
			return members.get(slot);
		}
	}
	
	public int getReplacementOwnerSlot () {
		return replacementOwnerSlot;
	}
	
	/*public void sendPermissionInfo (SocialUserAPI user, ClanRank group) {
		EnumSet<ClanPermission> groupPermissions = permissions.get(group);
		if (groupPermissions == null) {
			loadPermissions();
		} 
		if (groupPermissions != null) {
			//System.out.println("Permissions for group "+group+": "+groupPermissions);
			user.sendPermissionGroup(group, groupPermissions);
		} else {
			System.err.println("Permissions not found for group "+group);
		}
	}
	
	public void sendMemberInfo (SocialUserAPI user, int index) {
		user.sendClanMemberInfo(members.get(index));
	}*/
	
	/**
	 * Adds the provided player to the clan. 
	 * Note that setting the player's clan within the player data and sending the clan channel must be handled separately
	 * @param player The player to add to the clan
	 */
	 protected void addMember (SocialUser player) {
		if (inClan(player.getHash())) {
			return;
		}
		ClanMember newMember = new ClanMember(player.getHash());
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(newMember.getUserHash());
		if (info == null) {
			newMember.setDisplayName(AccountInfo.generateNamePlaceholder(newMember.getUserHash()));
		} else {
			newMember.setDisplayName(info.getDisplayName());
		}
		synchronized (members) {
			members.add(newMember);
			findClanOwner();
		}
		queueUpdate(new AddMember(newMember.getDisplayName()));
		if (linkedChannel != null) {
			linkedChannel.updateUser(player.getHash());
		}
	}
	
	/**
	 * Removes the member with the specified user hash from the clan
	 * @param userhash The user hash of the player to remove
	 * @throws NullPointerException	 if the player is not in the clan.
	 */
	protected void removeMember (long userhash) throws NullPointerException {
		ClanMember member = getMember(userhash);
		if (member == null) {
			throw new NullPointerException(userhash+" is not in "+clanName);
		}
		synchronized (members) {
			int slot = members.indexOf(member);
			members.remove(slot);
			queueUpdate(new DeleteMember(slot));
			findClanOwner();
		}
		if (linkedChannel != null) {
			linkedChannel.updateUser(member.getUserHash());
		}		
	}
	
	/**
	 * Sets the rank for the specified player in the clan. Note that permission checks must be done externally
	 * @param userhash	The user hash of the player to set the rank of
	 * @param rank	The desired rank
	 * @throws NullPointerException If the player is not in the clan.
	 */
	protected void setRank (long userhash, ClanRank rank) throws NullPointerException {
		ClanMember member = getMember(userhash);
		if (member == null) {
			throw new NullPointerException(userhash+" is not in "+clanName);
		}
		setRank(member, rank);
	}
	
	private void setRank (ClanMember member, ClanRank rank) {
		member.setRank(rank);
		synchronized (updateQueue) {
			int slot = members.indexOf(member);
			queueUpdate(new UpdateRank(slot, rank));
		}
		if (linkedChannel != null) {
			linkedChannel.updateUser(member.getUserHash());
		}
		findClanOwner();
	}
	
	protected void setMemberVarBit (long userhash, int value, int start, int end) throws VarBitOverflowException {
		ClanMember member = getMember(userhash);
		if (member == null) {
			throw new NullPointerException(userhash+" is not in "+clanName);
		}
		setMemberVarBit(member, value, start, end);
	}
	
	private void setMemberVarBit (ClanMember member, int value, int start, int end) throws VarBitOverflowException {
		member.setVarMemberBit(value, start, end);
		synchronized (updateQueue) {
			int slot = members.indexOf(member);
			queueUpdate(new SetMemberVarBit(slot, value, start, end));
		}
	}
	
	/*protected void setOwnerRank (ClanRank rank) throws NullPointerException {
		ClanMember member = getOwner();
		setRank(member, rank);
		ClanMember newOwner;
		synchronized (members) {
			newOwner = getOwner();
			synchronized (updateQueue) {
				queueUpdate(new UpdateRank(ownerSlot, rank));
			}
		}
		if (linkedChannel != null && newOwner != null) {
			linkedChannel.updateUser(newOwner.getProtocolName());
		}
		
	}*/
	
	protected void setVarBitValue (VarBitType varBit, int value) throws VarBitOverflowException {
		if (!varBit.getBaseVarDomain().equals(VarDomainType.CLAN_SETTING)) {
			throw new IllegalArgumentException("Invalid domain: "+varBit.getBaseVarDomain());
		}
		synchronized (varValues) {
			Object prevValue = varValues.get(varBit.baseVarKey);		
			if (prevValue == null) {
				varValues.put(varBit.baseVarKey, varBit.setVarbitValue(0, value));
			} else if (prevValue instanceof Integer) {
				varValues.put(varBit.baseVarKey, varBit.setVarbitValue((int) prevValue, value));
			} else {
				return;
			}
		}
		synchronized (updateQueue) {
			queueUpdate(new SetVarBitValue(varBit.baseVarKey, value, varBit.getStartBit(), varBit.getEndBit()));
		}
	}
	
	protected void setVarValue (int key, Object value) {
		SetVarValue deltaNode = new SetVarValue(key, value);
		if (deltaNode.getTypeID() == -1) {
			throw new RuntimeException("Invalid value type");
		}
		synchronized (varValues) {
			if (varValues.containsKey(key)) {
				Object oldValue = varValues.get(key);
				if (oldValue.equals(value)) {
					return;
				}
				varValues.remove(key);
			}
			varValues.put(key, value);
		}
		synchronized (updateQueue) {
			queueUpdate(deltaNode);
		}
	}
	
	public Object getVarValue (int key) {
		return varValues.get(key);
	}
	
	public String getVarValueString (int key) {
		return (String) varValues.get(key);
	}
	
	public int getVarValueInt (int key) {
		if (!varValues.containsKey(key)) {
			return 0;
		}
		return (int) varValues.get(key);
	}
	
	public int getVarBitValue (VarBitType varBit) {
		if (!varBit.getBaseVarDomain().equals(VarDomainType.CLAN_SETTING)) {
			return -1;
		}
		return varBit.getVarbitValue(getVarValueInt(varBit.baseVarKey));
	}
	
	public Map<Integer, Object> getPermanantVars () {
		return varValues;		
	}
	
	/*protected boolean addPermission (ClanRank group, ClanPermission permission) {
		if (!permissions.containsKey(group)) {
			return false;
		}
		if (permissions.get(group).contains(permission)) {
			return false;
		} else {
			VarBitType varBit = permission.getVarBit(group);
			if (varBit == null) {
				return false;
			}
			try {
				setClanSettingsVarBit(varBit, 1);
			} catch (VarBitOverflowException e) {
				e.printStackTrace();
				return false;
			}
			permissions.get(group).add(permission);
			return true;
		}
	}
	
	protected boolean removePermission (ClanRank group, ClanPermission permission) {
		if (!permissions.containsKey(group)) {
			return false;
		}
		if (!permissions.get(group).contains(permission)) {
			return false;
		} else {
			VarBitType varBit = permission.getVarBit(group);
			if (varBit == null) {
				return false;
			}
			try {
				setClanSettingsVarBit(varBit, 0);
			} catch (VarBitOverflowException e) {
				e.printStackTrace();
				return false;
			}
			permissions.get(group).remove(permission);
			return true;
		}
	}*/
	
	@Override
	public boolean equals (Object anObject) {
		if (this == anObject) {
            return true;
        }
		if (anObject instanceof ClanSettings) {
			ClanSettings anotherClan = (ClanSettings) anObject;
			return anotherClan.clanHash == this.clanHash;
		}
		return false;
		
	}

	@Override
	public int hashCode() {
		return (int) clanHash;
	}
}
