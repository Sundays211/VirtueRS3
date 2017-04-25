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
package org.virtue.engine.script.api.impl;

import org.virtue.Virtue;
import org.virtue.engine.script.api.ClanAPI;
import org.virtue.game.content.chat.SocialUser;
import org.virtue.game.content.clans.ClanChannelAPI;
import org.virtue.game.content.clans.ClanManager;
import org.virtue.game.content.clans.ClanMember;
import org.virtue.game.content.clans.ClanRank;
import org.virtue.game.content.clans.ClanSettingsAPI;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 13/12/2015
 */
public class VirtueClanAPI implements ClanAPI {
	
	private ClanManager clanManager;

	public VirtueClanAPI(ClanManager clanManager) {
		this.clanManager = clanManager;
	}
	
	private ClanManager getManager() {
		if (clanManager == null) {
			clanManager = Virtue.getInstance().getClans();
		}
		return clanManager;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanHash(org.virtue.game.entity.player.Player)
	 */
	@Override
	public Long getClanHash(Player player) {
		return player.getClanHash() == 0L ? null : player.getClanHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#createClan(java.lang.String, org.virtue.game.entity.player.Player, org.virtue.game.entity.player.Player[])
	 */
	@Override
	public void createClan(String name, Player owner, Player[] founders) {
		SocialUser[] founderUsers = new SocialUser[founders.length];
		for (int i=0;i<founders.length;i++) {
			founderUsers[i] = founders[i].getChat();
		}
		getManager().createClan(name, owner.getChat(), founderUsers);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#leaveClan(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void leaveClan(Player player) {
		getManager().leaveClan(player.getChat());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#isClanOwner(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean isClanOwner(Player player) {
		ClanMember owner = getManager().getSettings().getOwnerData(player.getClanHash());
		return owner == null ? false : owner.getUserHash() == player.getUserHash();
	}

	@Override
	public boolean hasReplacementOwner(Long clanHash) {
		return getManager().getSettings().hasReplacementOwner(clanHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#isClanAdmin(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean isClanAdmin(Player player) {
		ClanRank rank = getManager().getSettings().getRank(player.getClanHash(), player.getUserHash());
		if (rank == null) {
			return false;
		}
		return rank.isAdmin();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#isBannedFromClan(java.lang.Long, long)
	 */
	@Override
	public boolean isBanned(Long clanHash, Long userHash) {
		return getManager().getSettings().isBanned(clanHash, userHash);
	}

	@Override
	public void addBan(Player player, Long userHash) {
		getManager().getSettings().addBan(player.getClanHash(), player.getChat(), userHash);
	}

	@Override
	public void removeBan(Player player, Long userHash) {
		getManager().getSettings().removeBan(player.getClanHash(), player.getChat(), userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanMemberCount(java.lang.Long)
	 */
	@Override
	public int getMemberCount(Long clanHash) {
		return getManager().getSettings().getMemberCount(clanHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanChannels()
	 */
	@Override
	public ClanChannelAPI getClanChannels() {
		return getManager().getChannels();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanSettings()
	 */
	@Override
	public ClanSettingsAPI getClanSettings() {
		return getManager().getSettings();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanRank(long, long)
	 */
	@Override
	public byte getRank(Long clanHash, Long userHash) {
		ClanRank rank = getManager().getSettings().getRank(clanHash, userHash);
		return rank == null ? -1 : rank.getID();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#setClanRank(org.virtue.game.entity.player.Player, long, byte)
	 */
	@Override
	public boolean setRank(Player player, Long userhash, byte rank) {
		return getManager().getSettings().setRank(player.getClanHash(), player.getChat(), userhash, ClanRank.forID(rank));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#getClanMemberVarBit(org.virtue.game.entity.player.Player, long, int, int)
	 */
	@Override
	public int getMemberVarBit(Player player, Long userhash, int start, int end) {
		return getManager().getSettings().getMemberVarBit(player.getClanHash(), player.getChat(), userhash, start, end);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#setClanMemberVarBit(org.virtue.game.entity.player.Player, long, int, int, int)
	 */
	@Override
	public boolean setMemberVarBit(Player player, Long userhash, int value, int start, int end) {
		return getManager().getSettings().setMemberVarBit(player.getClanHash(), player.getChat(), userhash, value, start, end);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ClanAPI#sendClanBroadcast(long, int, java.lang.String[], java.lang.String[])
	 */
	@Override
	public void sendBroadcast(Long clanHash, int type, String[] find, String[] replace) {
		getManager().getSettings().sendBroadcast(clanHash, type, find, replace);
	}

}
