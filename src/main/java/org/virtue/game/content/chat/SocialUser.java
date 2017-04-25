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
package org.virtue.game.content.chat;

import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.network.event.context.impl.out.ClanChannelDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanChannelEventContext;
import org.virtue.network.event.context.impl.out.ClanSettingsDeltaEventContext;
import org.virtue.network.event.context.impl.out.ClanSettingsEventContext;
import org.virtue.network.event.context.impl.out.FriendChatEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public interface SocialUser {
	
	/**
	 * Gets the user hash for this social user
	 * @return The user hash
	 */
	public long getHash();
	
	/**
	 * Gets the display name of this user
	 * @return The user's name
	 */
	public String getName();
	
	/**
	 * Gets the {@link PrivilegeLevel} of the user
	 * @return The rights
	 */
	public PrivilegeLevel getType();
	
	public ChatCrownType getChatCrown();
	
	/**
	 * Gets the nodeID of the world the player is currently on
	 * @return The nodeID
	 */
	public int getNodeID();
	
	/**
	 * Gets the name of the world the player is currently on. 
	 * If the nodeID is greater than 1100, the player is in the lobby. Otherwise, the player is in a world
	 * @return The world name
	 */
	public String getWorldName();
	
	/**
	 * Checks whether the player is muted
	 * @return True if the player is muted, false otherwise
	 */
	public boolean isMuted();

	/**
	 * Sends a message of the specified type to the player
	 * @param message The message
	 * @param type The message type
	 */
	public void sendMessage(String message, ChannelType type);
	
	/**
	 * Sends a message to the user
	 * @param message The message to send
	 */
	public void sendMessage(MessageEventContext message);
	
	/**
	 * Informs the user's client that the user is no longer in a friend chat channel.
	 */
	public void sendLeaveFriendChat();
	
	/**
	 * Sends a friend chat update packet to the user
	 * @param context The packet to send
	 */
	public void sendFriendChatPacket(FriendChatEventContext context);
	
	/**
	 * Sets the owner of the friend chat channel the user is currently in
	 * @param hash The user hash of the channel owner
	 */
	public void setFriendChatOwner (long hash);
	
	/**
	 * Gets the owner of the friend chat channel the user is currently in
	 * @return The user hash of the channel owner
	 */
	public long getFriendChatOwner ();
	
	/**
	 * Returns the hash for the clan the player belongs to
	 * @return	The clan hash, or 0L if the player isn't in any clan
	 */
	public long getAffinedClanHash ();
	
	/**
	 * Sets the hash for the clan the player belongs to
	 * @param clanHash The hash to set to, or 0L if the player isn't in any clan
	 */
	public void setAffinedClanHash (long clanHash);
	
	/**
	 * Returns the hash for the clan the player is currently a guest in
	 * @param settings True if the lookup is for guest clan settings, false if for channel
	 * @return The clan hash, or 0L if the player isn't a guest in any clan
	 */
	public long getGuestClanHash (boolean settings);
	
	/**
	 * Sets the hash for the clan the player is a guest in
	 * @param myClanHash	The hash to set to, or 0L if the player isn't a guest in any clan
	 */
	public void setGuestClanHash (long clanHash, boolean settings);
	
	/**
	 * Sends a full packet representing a clan chat channel
	 * @param packet The packet to send
	 */
	public void sendClanChannelFull (ClanChannelEventContext packet);
	
	/**
	 * Sends a packet representing recent changes within a clan chat channel
	 * @param packet The packet to send
	 */	
	public void sendClanChannelDelta (ClanChannelDeltaEventContext packet);
	
	/**
	 * Informs the player that they have left the clan chat channel they are currently in
	 * @param isAffined True if the player left their affined cc, false if they left their guest cc
	 */
	public void sendLeaveClanChannel (boolean isAffined);
	
	/**
	 * Sends a full packet representing the settings for a clan
	 * @param packet The packet to send
	 */
	public void sendClanSettingsFull (ClanSettingsEventContext packet);
	
	public void sendClanSettingsDelta (ClanSettingsDeltaEventContext packet);
	
	/**
	 * Notifies the user that the data for the clan has been updated
	 */
	public void clanDataUpdated ();
}
