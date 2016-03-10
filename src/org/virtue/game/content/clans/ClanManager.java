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
package org.virtue.game.content.clans;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.engine.cycle.Tick;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.chat.SocialUser;
import org.virtue.game.parser.ClanIndex;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/12/2014
 */
public class ClanManager {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ClanManager.class);
	
	private ClanIndex index;
	
	private ClanSettingsManager settingsManager;
	
	private ClanChannelManager channelManager;
	
	public void load (ClanIndex index) {
		this.index = index;
		settingsManager = new ClanSettingsManager(this);
		channelManager = new ClanChannelManager(this);
		Virtue.getInstance().getEngine().invoke(new Tick () {
			@Override
			public void tick() {
				runUpdateTasks();
			}
		});
	}
	
	/**
	 * Runs the update tasks for a clan, such as dispatching any delta updates to the players in the clan
	 */
	protected void runUpdateTasks () {
		settingsManager.runUpdateTasks();
		channelManager.runUpdateTasks();
	}
	
	/**
	 * Runs tasks related to saving clan data. This should be run less frequently than runUpdateTasks, but should be run fairly regularly to avoid clan data being lost due to a server crash.
	 */
	public void runSaveTasks () {
		settingsManager.runSaveTasks();
	}
	
	/**
	 * Notifies all clan settings and channels that the specified users display name has changed
	 * @param userHash The hash of the user to update
	 * @param displayName The new user display name
	 */
	public void updateUserName (long userHash, String displayName) {
		channelManager.updateUserName(userHash, displayName);
		settingsManager.notifyUserUpdated(userHash);
	}
	
	protected ClanSettings getClanData (long clanHash) {
		return settingsManager.getSettings(clanHash);
	}
	
	/**
	 * Gets the index used for looking up clan hashes based on clan names
	 * @return The clan index
	 */
	public ClanIndex getIndex () {
		return index;
	}
	
	public ClanSettingsAPI getSettings() {
		return settingsManager;
	}
	
	public ClanChannelAPI getChannels () {
		return channelManager;
	}
	
	/**
	 * Gets the name of the specified clan
	 * @param clanhash The clan hash to lookup
	 * @return The clan name, or null if the clan doesn't exist.
	 */
	public String getClanName (long clanhash) {
		ClanSettings settings = getClanData(clanhash);
		if (settings == null) {
			return null;
		} else {
			return settings.getClanName();
		}
	}
	
	//Recruiting messages:
	//You cannot invite that player because they have a clan charter and are trying to found their own clan.
	//Inviting [player] to join your clan.
	//[Player] is inviting you to join their clan. (View invite from)
	//You have joined the clan, and so are now a part of [Clan Name]
	
	/**
	 * Creates a new clan and places the data into the index
	 * @param name	The desired name of the clan
	 * @param owner The player who will become the clan owner
	 * @param founders	The players who will be initially recruited into the clan
	 * @return	true if the clan was created successfully, false if a clan already exists with the specified name
	 */
	public boolean createClan (String name, SocialUser owner, SocialUser... founders) {
		if (index.clanExists(name)) {
			return false;
		} else {
			long clanHash = index.addClan(name);
			ClanSettings settings = new ClanSettings(clanHash, 100, name);
			settingsManager.addClan(settings);
			owner.setAffinedClanHash(clanHash);
			settings.addMember(owner);
			settings.registerOnlineMember(owner);
			channelManager.joinMyChannel(owner);
			for (SocialUser founder : founders) {
				founder.setAffinedClanHash(clanHash);
				settings.addMember(founder);
				settings.registerOnlineMember(founder);
				channelManager.joinMyChannel(founder);
			}
			return true;
		}	
	}
	
	public boolean leaveClan (SocialUser player) {
		long clanHash = player.getAffinedClanHash();
		if (clanHash == 0L) {
			channelManager.leaveChannel(player, true, false);
			return true;//Player is not in a clan
		}
		ClanSettings clan = getClanData(clanHash);
		if (clan == null) {
			player.setAffinedClanHash(0L);
			channelManager.leaveChannel(player, true, false);
			return true;//Clan does not exist anyway. Set clan hash to zero
		}
		if (!clan.inClan(player.getHash())) {
			player.setAffinedClanHash(0L);
			channelManager.leaveChannel(player, true, false);
			return true;//Player isn't in the clan. Set clan hash to zero
		}
		if (clan.getMemberCount() == 1) {//This is the last clan member. The clan needs to be disbanded
			channelManager.leaveChannel(player, true, false);
			index.removeAllWithHash(clanHash);
			player.setAffinedClanHash(0L);
			player.clanDataUpdated();
			return true;
		} else {
			if (clan.getOwner().getUserHash() == player.getHash() && clan.getReplacementOwnerSlot() < 0) {
				return false;//Clan does not have any deputy owners
			}
			channelManager.leaveChannel(player, true, false);
			clan.removeMember(player.getHash());
			clan.deregisterOnlineMember(player);
			player.setAffinedClanHash(0L);
			player.clanDataUpdated();
			settingsManager.sendBroadcast(clanHash, 19, new String[] { "[Player A]" }, new String[] { player.getName() });
			return true;
		}
	}
	
	public boolean joinClan (SocialUser player, long clanHash) {
		ClanSettings clan = getClanData(clanHash);
		if (clan == null) {
			return false;
		}
		if (clan.isBanned(player.getHash())) {
			return false;
		}
		player.setAffinedClanHash(clanHash);
		clan.addMember(player);
		if (player.getGuestClanHash(true) == clanHash) {
			settingsManager.deregisterPlayer(player, true);
			player.setGuestClanHash(0L, true);
		}
		clan.registerOnlineMember(player);
		channelManager.joinMyChannel(player);
		if (player.getGuestClanHash(false) == clanHash) {
			channelManager.leaveChannel(player, false, false);
			player.sendMessage("You are now part of the clan you were visiting.", ChannelType.CLANCHANNEL_GUEST_SYSTEM);
		}
		player.sendMessage("You have joined the clan, and so are now a part of "+clan.getClanName(), ChannelType.GAME);
		player.clanDataUpdated();
		settingsManager.sendBroadcast(clanHash, 18, new String[] { "[Player A]" }, new String[] { player.getName() });
		return true;
	}
}
