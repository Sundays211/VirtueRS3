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
package org.virtue.engine.script.api;

import org.virtue.game.content.social.clans.ClanChannelAPI;
import org.virtue.game.content.social.clans.ClanSettingsAPI;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 13/12/2015
 */
public interface ClanAPI {
	
	public Long getClanHash (Player player);
	
	public void createClan (String name, Player owner, Player[] founders);
	
	public void leaveClan (Player player);
	
	public boolean isClanOwner (Player player);
	
	public boolean hasReplacementOwner(Long clanHash);
	
	public boolean isClanAdmin (Player player);
	
	public boolean isBanned (Long clanHash, Long userHash);
	
	/**
	 * Adds the specified user to the clan ban list
	 * @param player The player adding the ban. Must hold a rank of admin or above in their clan, otherwise this will fail.
	 * @param userHash The hash of the user to ban
	 */
	public void addBan(Player player, Long userHash);
	
	/**
	 * Removes the specified user from the clan ban list
	 * @param player The player removing the ban. Must hold a rank of admin or above their clan, otherwise this will fail.
	 * @param userHash The hash of the user to remove
	 */
	public void removeBan(Player player, Long userHash);
	
	public int getMemberCount (Long clanHash);
	
	public ClanChannelAPI getClanChannels ();
	
	public ClanSettingsAPI getClanSettings ();
	
	/**
	 * Gets the rank of the user within the specified clan
	 * @param clanHash The hash of the clan to check
	 * @param userHash The hash of the user to check
	 * @return The rank held by the user in the clan, or -1 if the user is not in the clan.
	 */
	public byte getRank (Long clanHash, Long userHash);
	
	public boolean setRank (Player player, Long userhash, byte rank);
	
	public int getMemberVarBit(Player player, Long userhash, int start, int end);
	
	public boolean setMemberVarBit(Player player, Long userhash, int value, int start, int end);
	
	public void sendBroadcast (Long clanHash, int type, String[] find, String[] replace);

}
