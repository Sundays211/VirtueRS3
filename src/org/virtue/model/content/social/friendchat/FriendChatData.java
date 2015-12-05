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
package org.virtue.model.content.social.friendchat;

import java.util.Map;
import java.util.Set;

import org.virtue.model.content.social.ChannelRank;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 8/11/2014
 */
public interface FriendChatData {

	/**
	 * Returns whether or not a friend chat channel is linked to this player
	 * @return True if a friend chat channel is linked, false otherwise
	 */
	public boolean hasFriendChannel();
	
	/**
	 * Gets the name of the friend chat channel
	 * @return The channel name
	 */
	public String getChannelName();
	
	/**
	 * Gets the user hash of the channel owner
	 * @return The owner hash
	 */
	public long getOwnerHash();
	
	/**
	 * Gets the display name of the channel owner
	 * @return The owner's display name
	 */
	public String getOwnerName ();
	
	/**
	 * Gets the players which are banned from the channel
	 * @return A {@link Set} of user hashes representing banned players
	 */
	public Set<Long> getChannelBans();
	
	/**
	 * Gets a map of players which have ranks in the channel, along with their matching rank
	 * @return A {@link Map} of user hashes to ChannelRanks, representing ranks held by players
	 */
	public Map<Long, ChannelRank> getChannelRanks();
	
	/**
	 * Gets the minimum rank needed to join the channel
	 * @return The minimum join rank
	 */
	public ChannelRank getJoinRank();
	
	/**
	 * Gets the minimum rank needed to talk in the channel
	 * @return The minimum talk rank
	 */
	public ChannelRank getTalkRank();
	
	/**
	 * Gets the minimum rank needed to kick other users from the channel
	 * @return The minimum kick rank
	 */
	public ChannelRank getKickRank();

}
