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
package org.virtue.model.content.social.clan.ccdelta;

import org.virtue.model.content.social.clan.ClanRank;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * An update which adds the specified member to the clan channel
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public class AddMember implements ClanChannelDelta {
	
	private final ClanRank rank;
	private final String displayName;
	private final int nodeID;
	
	public AddMember (String displayName, ClanRank rank, int nodeID) {
		this.displayName = displayName;
		this.rank = rank;
		this.nodeID = nodeID;
	}

	@Override
	public void packDelta(OutboundBuffer buffer) {
		buffer.putByte(255);//Do not include user hash
		buffer.putString(displayName);
		buffer.putShort(nodeID);
		buffer.putByte(rank.getID());
		buffer.putLong(0L);//Currently unused
	}

	@Override
	public int getTypeID() {
		return 1;
	}

}
