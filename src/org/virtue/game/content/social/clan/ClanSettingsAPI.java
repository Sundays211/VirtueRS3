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

import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.game.content.social.SocialUser;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/12/2014
 */
public interface ClanSettingsAPI {
	
	public void registerPlayer (SocialUser user, boolean isGuest);
	
	public void deregisterPlayer (SocialUser user, boolean isGuest);
	
	public ClanRank getRank (long clanHash, long userHash);
	
	/**
	 * Sets the rank of the specified player in the specified clan.
	 * Note that this method does allow server administrators (who would normally hold a rank of JMOD) to change the ranks of people in clans they don't belong to themselves.
	 * @param clanHash The unique hash for the clan with the rank being edited
	 * @param player The player performing the edit
	 * @param userhash The hash of the clan member who's rank is being changed
	 * @param rank The rank to change to
	 * @return True if the rank was changed successfully, false if there was an error.
	 */
	public boolean setRank (long clanHash, SocialUser player, long userhash, ClanRank rank);
	
	public int getMemberVarBit (long clanHash, SocialUser player, long userhash, int start, int end);
	
	public boolean setMemberVarBit (long clanHash, SocialUser player, long userhash, int value, int start, int end);
	
	/**
	 * Removes a member from the clan
	 * @param clanHash The unique hash for the clan
	 * @param player The player performing the kick
	 * @param userhash The hash of the clan member being removed
	 * @return True if the member was kicked successfully, false otherwise
	 */
	public boolean kickClanMember (long clanHash, SocialUser player, long userhash);
	
	/**
	 * Returns the value of a clan setting variable
	 * @param clanHash The hash of the clan
	 * @param key The variable key
	 * @return The variable value, or null if the variable does not exist
	 */
	public Object getVarValue (long clanHash, int key);
	
	/**
	 * Returns a part of an integer clan setting variable
	 * @param clanHash The hash of the clan
	 * @param type The bit variable type
	 * @return The var bit value
	 */
	public int getVarBitValue (long clanHash, VarBitType type);
	
	public ClanMember getMemberData (long clanHash, int slot);
	
	public boolean isBanned (long clanHash, long userHash);
	
	public ClanMember getOwnerData (long clanHash);
	
	/**
	 * Returns whether or not the clan has a replacement owner, should the current owner leave.
	 * A replacement owner is a member with a rank of Deputy Owner.
	 * @param clanHash The hash of the clan
	 * @return True if the clan hash a replacement owner, false otherwise
	 */
	public boolean hasReplacementOwner (long clanHash);
	
	/**
	 * Gets the number of members in the specified clan
	 * @param clanHash The clan to check
	 * @return The number of members, or zero if the clan does not exist
	 */
	public int getMemberCount (long clanHash);
	
	/**
	 * Sets the value of a clan setting variable for a clan. 
	 * Note that in order to set a variable, the member setting the var must hold an administrative rank in the clan (admin+)
	 * @param clanHash The clan to set the variable for
	 * @param user The user setting the variable
	 * @param key The variable key
	 * @param value The variable value
	 * @return True if the variable was set successfully, false otherwise
	 */
	public boolean setVarValue (long clanHash, SocialUser user, int key, Object value);
	
	/**
	 * Sets a part of a clan setting variable for a clan. 
	 * Note that in order to set a variable, the member setting the var must hold an administrative rank in the clan (admin+)
	 * @param clanHash The clan to set the variable for
	 * @param user The user setting the variable
	 * @param key The bit variable key
	 * @param value The bit value
	 * @return True if the variable was set successfully, false otherwise
	 */
	public boolean setVarBitValue (long clanHash, SocialUser user, VarBitType type, int value);
	
	/**
	 * Adds the specified name to the clan ban list.
	 * In order for the name to be added, the specified user must hold an administrative rank in the clan
	 * @param clanHash The hash of the clan to add the ban to
	 * @param user The user applying the ban
	 * @param banName The name of the user to ban
	 * @return True if the ban was added, false otherwise
	 */
	public boolean addBan (long clanHash, SocialUser user, long banHash);
	
	public boolean removeBan (long clanHash, SocialUser user, long banHash);
	
	/**
	 * Sends a broadcast message to clan members
	 * Note that both the "find" and "replace" arrays should be the same length
	 * @param clanHash The hash of the clan to send the broadcast in
	 * @param broadcastType The type of broadcast being sent
	 * @param find The strings in the broadcast to be replaced.
	 * @param replace The strings to replace those specified in the "find" array. 
	 */
	public void sendBroadcast (long clanHash, int broadcastType, String[] find, String[] replace);

}
