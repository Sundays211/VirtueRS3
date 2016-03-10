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
package org.virtue.game.content.friendchats;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.virtue.game.content.friends.Friend;
import org.virtue.game.content.friends.FriendsList;
import org.virtue.game.content.ignores.Ignore;
import org.virtue.game.parser.AccountInfo;

/**
 * Represents friend chat data for an offline player
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */
public class OfflineChatData implements FriendChatData {
	
	private FriendsList.Data friendData;
	
	private List<Ignore> ignores;
	
	private AccountInfo accountInfo;
	
	public OfflineChatData (FriendsList.Data data, List<Ignore> ignores, AccountInfo info) {
		this.friendData = data;
		this.ignores = ignores;
		this.accountInfo = info;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#hasFriendChannel()
	 */
	@Override
	public boolean hasFriendChannel() {
		return friendData.friendChatName != null && !friendData.friendChatName.isEmpty();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getChannelName()
	 */
	@Override
	public String getChannelName() {
		return friendData.friendChatName;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getOwnerHash()
	 */
	@Override
	public long getOwnerHash() {
		return accountInfo.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getOwnerName()
	 */
	@Override
	public String getOwnerName() {
		return accountInfo.getDisplayName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getChannelBans()
	 */
	@Override
	public Set<Long> getChannelBans() {
		Set<Long> bans = new HashSet<Long>();
		for (Ignore ignore : ignores) {
			bans.add(ignore.getHash());
		}
		return bans;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getChannelRanks()
	 */
	@Override
	public Map<Long, ChannelRank> getChannelRanks() {
		Map<Long, ChannelRank> ranks = new HashMap<Long, ChannelRank>();
		for (Friend f : friendData.friends) {
			ranks.put(f.getHash(), f.getRank());
		}
		return ranks;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getJoinRank()
	 */
	@Override
	public ChannelRank getJoinRank() {
		return friendData.rankJoin;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getTalkRank()
	 */
	@Override
	public ChannelRank getTalkRank() {
		return friendData.rankTalk;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.friendchat.FriendChatData#getKickRank()
	 */
	@Override
	public ChannelRank getKickRank() {
		return friendData.rankKick;
	}

}
