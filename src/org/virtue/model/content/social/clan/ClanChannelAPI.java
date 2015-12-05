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

import org.virtue.model.content.social.SocialUser;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/12/2014
 */
public interface ClanChannelAPI {
	
	/**
	 * Sends a request to join the player's clan chat channel
	 * @param player	The player joining the channel
	 */
	public void joinMyChannel(SocialUser player);
	
	/**
	 * Sends a request for the player to join another clan's chat channel as a guest
	 * @param player The player joining the channel
	 * @param clanName The name of the clan the player is attempting to join the chat channel of
	 */
	public void joinGuestChannel (SocialUser player, String clanName);
	
	/**
	 * Sends a request to remove the player from their current clan chat channel
	 * @param player The player leaving the channel
	 * @param isGuest True if the player is leaving their guest channel
	 * @param isLogout If true, the player will rejoin the channel when they next log in
	 */
	public void leaveChannel (SocialUser player, boolean isGuest, boolean isLogout);
	
	/**
	 * Forcefully removes the specified user from the channel. 
	 * This should only be used for internal clan methods; use "kickChannelUser" for someone pressing the kick/ban button in the clan interface  
	 * @param userHash
	 * @param clanHash
	 */
	boolean removeUser (long userHash, long clanHash);
	
	/**
	 * Sends a message in a clan channel the player is currently in
	 * @param player The player sending the message
	 * @param message The message to send
	 * @param isGuest Whether the message is being sent in a guest channel or not
	 */
	public void sendMessage (SocialUser player, String message, boolean isGuest);
	
	/**
	 * Sends a quick chat message in a clan channel the player is currently in
	 * @param player The player sending the message
	 * @param message The quick chat message to send
	 * @param isGuest Whether the message is being sent in a guest channel or not
	 */
	public void sendQuickMessage (SocialUser player, QuickChatMessage message, boolean isGuest);

}
