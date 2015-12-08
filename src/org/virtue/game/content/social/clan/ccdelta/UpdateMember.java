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
 * An update which which changes the details of a user in the clan channel
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public class UpdateMember implements ClanChannelDelta {
	
	private final int slot;
	private final String displayName;
	private final int nodeID;
	private final ClanRank rank;
	
	/**
	 * Constructs a new {@code UpdateMember} delta object
	 * @param slot The index of the member to update within the clan channel
	 * @param displayName The display name to change to
	 * @param rank The rank to change to
	 * @param nodeID The world node ID to change to
	 */
	public UpdateMember (int slot, String displayName, ClanRank rank, int nodeID) {
		this.slot = slot;
		this.displayName = displayName;
		this.rank = rank;
		this.nodeID = nodeID;
	}

	@Override
	public void packDelta(OutboundBuffer buffer) {
		buffer.putByte(0);//Unused
		buffer.putShort(slot);
		buffer.putByte(rank.getID());
		buffer.putShort(nodeID);
		buffer.putLong(0L);//Unused
		buffer.putString(displayName);
		buffer.putByte(0);//Unused
	}

	@Override
	public int getTypeID() {
		return 5;
	}

}
