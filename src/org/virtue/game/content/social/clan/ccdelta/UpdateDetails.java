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
package org.virtue.game.content.social.clan.ccdelta;

import org.virtue.game.content.social.clan.ClanRank;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * An update which changes the details of a clan channel
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public class UpdateDetails implements ClanChannelDelta {
	
	private final String channelName;
	private final ClanRank minTalk;
	private final ClanRank minKick;
	
	public UpdateDetails (String channelName) {
		this(channelName, ClanRank.OWNER, ClanRank.OWNER);
	}
	
	/**
	 * Constructs a new {@code UpdateDetails} delta object
	 * @param channelName	The name of the clan channel
	 * @param minTalk		The minimum rank needed to send messages
	 * @param minKick		The minimum rank needed to remove other members
	 */
	public UpdateDetails (String channelName, ClanRank minTalk, ClanRank minKick) {
		this.channelName = (channelName == null ? "" : channelName);
		this.minTalk = minTalk;
		this.minKick = minKick;
	}

	@Override
	public void packDelta(OutboundBuffer buffer) {
		buffer.putString(channelName);
		if (!channelName.isEmpty()) {
			buffer.putByte(0);//Unused
			buffer.putByte(minTalk.getID());
			buffer.putByte(minKick.getID());
		}
	}

	@Override
	public int getTypeID() {
		return 4;
	}

}
