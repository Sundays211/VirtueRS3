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
package org.virtue.game.content.social.friendchat;

import org.virtue.game.content.social.SocialUser;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */
public interface FriendChatAPI {
	
	/**
	 * Notifies the friend chat manager that the data for the specified player has changed
	 * @param user The friend data that has changed
	 */
	public void notifySave (FriendChatData user);
	
	/**
	 * Sends a request for a player to join a channel
	 * @param user The user joining the channel
	 * @param ownerHash The user hash of the channel owner
	 */
	public void joinChannel(SocialUser user, long ownerHash);
	
	/**
	 * Sends a request for a player to leave their current channel
	 * @param user The user leaving the channel
	 * @param isLoggedOut True if the player is logging out (and thus no messages or updates), false otherwise
	 */
	public void leaveChannel(SocialUser user, boolean isLoggedOut);
	
	/**
	 * Sends a message within a friend chat channel
	 * @param user The user sending the message
	 * @param message The message to send
	 */
	public void sendMessage(SocialUser user, String message);
	
	/**
	 * Sends a quick message within a friend chat channel
	 * @param user The user sending the message
	 * @param message The quick message to send
	 */
	public void sendQuickMessage(SocialUser user, QuickChatMessage message);
	
	/**
	 * Sends a request to kick and temporarily ban a user from a channel
	 * @param user The user performing the kick/ban
	 * @param userhash The hash of the user being banned
	 */
	public void kickBanUser(SocialUser user, long userhash);

}
