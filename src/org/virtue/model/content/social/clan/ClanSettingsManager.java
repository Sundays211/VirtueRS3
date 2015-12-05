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

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.Lobby;
import org.virtue.model.World;
import org.virtue.model.content.social.SocialUser;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.var.VarBitTypeList;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.openrs.def.impl.EnumType;
import org.virtue.openrs.def.impl.StructType;
import org.virtue.openrs.def.vartype.VarBitOverflowException;
import org.virtue.openrs.def.vartype.VarBitType;
import org.virtue.parser.ParserDataType;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.StructTypeList;
import org.virtue.utility.text.Base37Utility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/12/2014
 */
public class ClanSettingsManager implements ClanSettingsAPI {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ClanSettingsManager.class);
	
	private final Map<Long, ClanSettings> clanDataCache = Collections.synchronizedMap(new HashMap<Long, ClanSettings>());
	
	private final ClanManager clanManager;

	public ClanSettingsManager (ClanManager clanManager) {
		this.clanManager = clanManager;
	}
	
	/**
	 * Runs the update tasks for a clan, such as dispatching any delta updates to the players in the clan
	 */
	protected void runUpdateTasks () {
		for (ClanSettings clanData : clanDataCache.values()) {
			clanData.dispatchUpdates();
		}
	}
	
	/**
	 * Runs tasks related to saving clan data. This should be run less frequently than runUpdateTasks, but should be run fairly regularly to avoid clan data being lost due to a server crash.
	 */
	protected void runSaveTasks () {
		int count = 0;
		for (ClanSettings clanData : clanDataCache.values()) {
			if (clanData.needsSave()) {
				Virtue.getInstance().getParserRepository().getParser().saveObjectDefinition(clanData, Long.toString(clanData.getClanHash()), ParserDataType.CLAN_SETTINGS);
				clanData.onSaved();
				count++;
			}
		}
		if (count > 0) {
			logger.info("Saved data for "+count+" clans.");
		}
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#registerPlayer(org.virtue.model.content.social.SocialUser)
	 */
	@Override
	public void registerPlayer(SocialUser user, boolean isGuest) {
		ClanSettings settings = getSettings(isGuest ? user.getGuestClanHash(true) : user.getMyClanHash());
		if (!isGuest && (settings == null || !settings.inClan(user.getHash()))) {
			user.setMyClanHash(0L);
			user.sendMessage("You're no longer a part of a clan.", ChannelType.GAME);
			return;
		} else if (settings == null) {
			user.setGuestClanHash(0L, true);
			return;
		}
		settings.registerOnlineMember(user);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#deregisterPlayer(org.virtue.model.content.social.SocialUser)
	 */
	@Override
	public void deregisterPlayer(SocialUser user, boolean isGuest) {
		ClanSettings settings = getSettings(isGuest ? user.getGuestClanHash(true) : user.getMyClanHash());
		if (settings == null) {
			return;
		}
		settings.deregisterOnlineMember(user);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#setRank(long, org.virtue.model.content.social.SocialUser, java.lang.String, org.virtue.model.content.social.clan.ClanRank)
	 */
	@Override
	public boolean setRank(long clanHash, SocialUser player, long userhash, ClanRank rank) {
		ClanSettings clan = getSettings(clanHash);
		if (clan == null) {
			//player.getPacketDispatcher().dispatchMessage("You need to be in a clan to do that.", MessageOpcode.CLAN_SYSTEM);
			return false;
		}
		if (clan.getRank(userhash).equals(rank)) {
			return false;//Rank is identical to the old rank
		}
		ClanRank playerRank = clan.getRank(player.getHash());
		if (!clan.inClan(userhash)) {
			//player.getPacketDispatcher().dispatchMessage("The specified player is not in your clan.", MessageOpcode.CLAN_SYSTEM);
			return false;
		}
		if (rank == null || rank.getID() > ClanRank.DEPUTY_OWNER.getID() || rank.getID() < ClanRank.RECRUIT.getID()) {
			//player.getPacketDispatcher().dispatchMessage("You have specified an invalid rank. Only ranks between deputy owner and recruit (inclusive) are valid.", MessageOpcode.CLAN_SYSTEM);
			return false;
		}
		ClanMember owner = clan.getOwner();
		if (owner.getUserHash() == userhash) {
			if (playerRank == null || (!playerRank.equals(ClanRank.JMOD) && !playerRank.equals(ClanRank.OWNER))) {
				//player.getPacketDispatcher().dispatchMessage("You do not have the appropriate permissions to change the channel owner.", MessageOpcode.CLAN_SYSTEM);
				return false;
			}
			if (rank.equals(ClanRank.DEPUTY_OWNER)) {
				//player.getPacketDispatcher().dispatchMessage("You must set the owner's rank lower than deputy owner in order to change the clan owner.", MessageOpcode.CLAN_SYSTEM);
				return false;
			}
			if (clan.getReplacementOwnerSlot() == -1 || !clan.getMember(clan.getReplacementOwnerSlot()).getRank().equals(ClanRank.DEPUTY_OWNER)) {
				return false;
			}
			clan.setRank(userhash, rank);
			//clan.setOwnerRank(rank);
		} else {
			if (!playerRank.isAdmin() || playerRank.getID() <= clan.getRank(userhash).getID()) {
				player.sendMessage("You can only adjust the ranks of those with a lower rank than yourself.", ChannelType.GAME);
				return false;
			}
			clan.setRank(userhash, rank);
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getMemberVarBit(long, org.virtue.model.content.social.SocialUser, long, int, int)
	 */
	@Override
	public int getMemberVarBit(long clanHash, SocialUser player, long userhash, int start, int end) {
		ClanSettings clan = getSettings(clanHash);
		if (clan == null) {
			return -1;
		}
		return clan.getMemberVarBit(userhash, start, end);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#setMemberVarBit(long, org.virtue.model.content.social.SocialUser, long, int, int, int)
	 */
	@Override
	public boolean setMemberVarBit(long clanHash, SocialUser player, long userhash, int value, int start, int end) {
		ClanSettings clan = getSettings(clanHash);
		if (clan == null) {
			return false;
		}
		if (clan.getMemberVarBit(userhash, start, end) == value) {
			return false;//Value has not changed
		}
		if (!clan.inClan(userhash)) {
			return false;
		}
		ClanRank playerRank = clan.getRank(player.getHash());
		if (!playerRank.isAdmin() || (!playerRank.equals(ClanRank.OWNER) && clan.getRank(userhash).getID() >= playerRank.getID())) {
			return false;
		}
		try {
			clan.setMemberVarBit(userhash, value, start, end);
			return true;
		} catch (VarBitOverflowException ex) {
			logger.error("Error setting varbit value for member "+userhash, ex);
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#kickClanMember(long, org.virtue.model.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public boolean kickClanMember(long clanHash, SocialUser player, long userhash) {
		ClanSettings clan = getSettings(clanHash);
		if (clan == null) {	
			logger.debug("Could not kick clan member - clan does not exist.");
			return false;
		}
		ClanRank playerRank = clan.getRank(player.getHash());
		if (!clan.inClan(userhash)) {
			logger.debug("Could not kick clan member - member is not in clan (name="+Base37Utility.decodeBase37(userhash)+").");
			return false;//Player not in clan
		}
		if (!playerRank.isAdmin() || playerRank.getID() <= clan.getRank(userhash).getID()) {	
			logger.debug("Could not kick clan member - insufficient permissions.");		
			return false;//Lack appropriate permissions to kick player from clan
		}
		clan.removeMember(userhash);
		Player targetPlayer = World.getInstance().getPlayerByHash(userhash);
		if (targetPlayer == null) {
			targetPlayer = Lobby.getInstance().getPlayerByHash(userhash);
		}
		if (targetPlayer != null) {
			clanManager.getChannels().leaveChannel(targetPlayer.getChat(), false, false);
			clan.deregisterOnlineMember(targetPlayer.getChat());
			targetPlayer.setClanHash(0L);
			targetPlayer.getChat().clanDataUpdated();
			targetPlayer.getDispatcher().sendGameMessage("You're no longer a part of a clan.");
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getVarValue(long, int)
	 */
	@Override
	public Object getVarValue(long clanHash, int key) {
		ClanSettings settings = getSettings(clanHash);
		return settings == null ? null : settings.getVarValue(key);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getVarBitValue(long, org.virtue.openrs.def.vartype.VarBitType)
	 */
	@Override
	public int getVarBitValue(long clanHash, VarBitType type) {
		ClanSettings settings = getSettings(clanHash);
		return settings == null ? -1 : settings.getVarBitValue(type);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getMemberData(long, int)
	 */
	@Override
	public ClanMember getMemberData(long clanHash, int slot) {
		ClanSettings settings = getSettings(clanHash);
		return settings.getMember(slot);
	}
	
	protected ClanSettings getSettings (long clanHash) {
		if (clanHash == 0L) {
			return null;//We won't bother using resources to lookup data if we know the clan doesn't exist
		}
		ClanSettings settings = clanDataCache.get(clanHash);
		if (settings != null) {
			return settings;
		}
		if (Virtue.getInstance().getParserRepository().getParser().objectFileExists(Long.toString(clanHash), ParserDataType.CLAN_SETTINGS)) {
			ClanSettings.Data data = (ClanSettings.Data) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(clanHash, ParserDataType.CLAN_SETTINGS);
			if (data != null) {
				clanDataCache.put(clanHash, new ClanSettings(data));
			}
		}
		return clanDataCache.get(clanHash);
	}
	
	protected void addClan (ClanSettings settings) {
		clanDataCache.put(settings.getClanHash(), settings);
	}
	
	/**
	 * Sends an update to all users in the channel for the specified user.
	 * This is used when the user changes their display name or world ID
	 * @param userHash The hash of the user to update
	 */
	protected void notifyUserUpdated (long userHash) {
		synchronized (clanDataCache) {
			for (ClanSettings settings : clanDataCache.values()) {
				settings.updateUser(userHash);
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#isBanned(long, long)
	 */
	@Override
	public boolean isBanned(long clanHash, long userHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		return settings.isBanned(userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getOwnerData(long)
	 */
	@Override
	public ClanMember getOwnerData(long clanHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return null;
		}
		return settings.getOwner();
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#hasReplacementOwner(long)
	 */
	@Override
	public boolean hasReplacementOwner(long clanHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		return settings.getReplacementOwnerSlot() >= 0;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getMemberCount(long)
	 */
	@Override
	public int getMemberCount(long clanHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return 0;
		}
		return settings.getMemberCount();
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#getRank(long, long)
	 */
	@Override
	public ClanRank getRank(long clanHash, long userHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return null;
		}
		return settings.getRank(userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#setVarValue(long, org.virtue.model.content.social.SocialUser, int, java.lang.Object)
	 */
	@Override
	public boolean setVarValue(long clanHash, SocialUser user, int key, Object value) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		if (!settings.getRank(user.getHash()).isAdmin()) {
			return false;
		}
		settings.setVarValue(key, value);
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#setVarBitValue(long, org.virtue.model.content.social.SocialUser, org.virtue.openrs.def.vartype.VarBitType, int)
	 */
	@Override
	public boolean setVarBitValue(long clanHash, SocialUser user, VarBitType type, int value) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		if (!settings.getRank(user.getHash()).isAdmin()) {
			return false;
		}
		try {
			settings.setVarBitValue(type, value);
			return true;
		} catch (VarBitOverflowException ex) {
			logger.error("Error setting varbit for clan "+settings.getClanHash(), ex);
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#addBan(long, org.virtue.model.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public boolean addBan(long clanHash, SocialUser user, long banHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		if (!settings.getRank(user.getHash()).isAdmin()) {
			return false;
		}
		if (settings.isBanned(banHash)) {
			return false;
		}
		if (settings.getBans().size() >= 100) {
			return false;
		}
		settings.addBan(banHash);
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#removeBan(long, org.virtue.model.content.social.SocialUser, java.lang.String)
	 */
	@Override
	public boolean removeBan(long clanHash, SocialUser user, long banHash) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return false;
		}
		if (!settings.getRank(user.getHash()).isAdmin()) {
			return false;
		}
		if (!settings.isBanned(banHash)) {
			return false;
		}
		settings.removeBan(banHash);
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.social.clan.ClanSettingsAPI#sendBroadcast(long, int, java.lang.String[])
	 */
	@Override
	public void sendBroadcast(long clanHash, int broadcastType, String[] find, String[] replace) {
		ClanSettings settings = getSettings(clanHash);
		if (settings == null) {
			return;//Clan does not exist
		}
		EnumType allBroadcasts = EnumTypeList.list(8660);
		if (broadcastType < 0 || broadcastType >= allBroadcasts.getSize()) {
			logger.warn("Invalid broadcast send. ClanHash="+clanHash+", type="+broadcastType+", find="+Arrays.toString(find)+", replace="+Arrays.toString(replace));
			return;//Invalid broadcast
		}
		StructType broadcastData = StructTypeList.list(allBroadcasts.getValueInt(broadcastType));
		if (broadcastData == null) {
			logger.warn("Invalid broadcast send. ClanHash="+clanHash+", type="+broadcastType+", find="+Arrays.toString(find)+", replace="+Arrays.toString(replace));
			return;//Invalid broadcast
		}
		if (!broadcastEnabled(settings, broadcastType)) {
			return;//Broadcast is disabled
		}
		String message = broadcastData.getParam(4188, "");
		for (int part = 0; part < find.length; part++) {
			message = message.replace(find[part], replace[part]);	
		}
		ClanRank minRank = minBroadcastRank(settings, broadcastType);
		settings.sendBroadcast("[Clan System]"+message, minRank);
	}
	
	private boolean broadcastEnabled (ClanSettings settings, int type) {
		VarBitType varBit;
		switch (type) {
		case 0:
			varBit = VarBitTypeList.list(22032);
			break;
		case 1:
			varBit = VarBitTypeList.list(22033);
			break;
		case 2:
			varBit = VarBitTypeList.list(22034);
			break;
		case 3:
			varBit = VarBitTypeList.list(22035);
			break;
		case 4:
			varBit = VarBitTypeList.list(22036);
			break;
		case 5:
			varBit = VarBitTypeList.list(22037);
			break;
		case 6:
			varBit = VarBitTypeList.list(22038);
			break;
		case 7:
			varBit = VarBitTypeList.list(22039);
			break;
		case 8:
			varBit = VarBitTypeList.list(22040);
			break;
		case 9:
			varBit = VarBitTypeList.list(22041);
			break;
		case 10:
			varBit = VarBitTypeList.list(22042);
			break;
		case 11:
			varBit = VarBitTypeList.list(22043);
			break;
		case 12:
			varBit = VarBitTypeList.list(22044);
			break;
		case 13:
			varBit = VarBitTypeList.list(22045);
			break;
		case 14:
			varBit = VarBitTypeList.list(22046);
			break;
		case 15:
			varBit = VarBitTypeList.list(22047);
			break;
		case 16:
			varBit = VarBitTypeList.list(22048);
			break;
		case 17:
			varBit = VarBitTypeList.list(22049);
			break;
		case 18:
			varBit = VarBitTypeList.list(22050);
			break;
		case 19:
			varBit = VarBitTypeList.list(22051);
			break;
		case 20:
			varBit = VarBitTypeList.list(22052);
			break;
		case 21:
			varBit = VarBitTypeList.list(22053);
			break;
		case 22:
			varBit = VarBitTypeList.list(22054);
			break;
		case 23:
			varBit = VarBitTypeList.list(22055);
			break;
		case 24:
			varBit = VarBitTypeList.list(22056);
			break;
		case 25:
			varBit = VarBitTypeList.list(22057);
			break;
		case 26:
			varBit = VarBitTypeList.list(22058);
			break;
		case 27:
			varBit = VarBitTypeList.list(22059);
			break;
		case 28:
			varBit = VarBitTypeList.list(22060);
			break;
		case 29:
			varBit = VarBitTypeList.list(22061);
			break;
		default:
			return false;
		}
		return varBit == null ? false : settings.getVarBitValue(varBit) == 1;
	}
	
	private ClanRank minBroadcastRank (ClanSettings settings, int type) {
		VarBitType varBit;
		switch (type) {
		case 0:
			varBit = VarBitTypeList.list(22068);
			break;
		case 1:
			varBit = VarBitTypeList.list(22069);
			break;
		case 2:
			varBit = VarBitTypeList.list(22070);
			break;
		case 3:
			varBit = VarBitTypeList.list(22071);
			break;
		case 4:
			varBit = VarBitTypeList.list(22072);
			break;
		case 5:
			varBit = VarBitTypeList.list(22073);
			break;
		case 6:
			varBit = VarBitTypeList.list(22074);
			break;
		case 7:
			varBit = VarBitTypeList.list(22075);
			break;
		case 8:
			varBit = VarBitTypeList.list(22076);
			break;
		case 9:
			varBit = VarBitTypeList.list(22077);
			break;
		case 10:
			varBit = VarBitTypeList.list(22078);
			break;
		case 11:
			varBit = VarBitTypeList.list(22079);
			break;
		case 12:
			varBit = VarBitTypeList.list(22080);
			break;
		case 13:
			varBit = VarBitTypeList.list(22081);
			break;
		case 14:
			varBit = VarBitTypeList.list(22082);
			break;
		case 15:
			varBit = VarBitTypeList.list(22083);
			break;
		case 16:
			varBit = VarBitTypeList.list(22084);
			break;
		case 17:
			varBit = VarBitTypeList.list(22085);
			break;
		case 18:
			varBit = VarBitTypeList.list(22086);
			break;
		case 19:
			varBit = VarBitTypeList.list(22087);
			break;
		case 20:
			varBit = VarBitTypeList.list(22088);
			break;
		case 21:
			varBit = VarBitTypeList.list(22089);
			break;
		case 22:
			varBit = VarBitTypeList.list(22090);
			break;
		case 23:
			varBit = VarBitTypeList.list(22091);
			break;
		case 24:
			varBit = VarBitTypeList.list(22092);
			break;
		case 25:
			varBit = VarBitTypeList.list(22093);
			break;
		case 26:
			varBit = VarBitTypeList.list(22094);
			break;
		case 27:
			varBit = VarBitTypeList.list(22095);
			break;
		case 28:
			varBit = VarBitTypeList.list(22096);
			break;
		case 29:
			varBit = VarBitTypeList.list(22097);
			break;
		default:
			return ClanRank.RECRUIT;
		}
		if (varBit == null) {
			return ClanRank.RECRUIT;
		}
		int rankID = settings.getVarBitValue(varBit);
		ClanRank rank = ClanRank.forID(rankID);
		return rank == null ? ClanRank.RECRUIT : rank;
	}
}
