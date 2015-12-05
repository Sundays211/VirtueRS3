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
package org.virtue.network.event.context.impl.out;

import org.virtue.model.content.social.clan.ccdelta.ClanChannelDelta;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/12/2014
 */
public class ClanChannelDeltaEventContext implements GameEventContext {

	private final long clanHash;
	
	private final long updateNum;
	
	private final boolean isGuestCc;
	
	private final ClanChannelDelta[] deltaNodes;
	
	public ClanChannelDeltaEventContext (boolean guestCc, long clanHash, long updateNum, ClanChannelDelta... deltaNodes) {
		this.isGuestCc = guestCc;
		this.clanHash = clanHash;
		this.updateNum = updateNum;
		this.deltaNodes = deltaNodes;
	}
	
	/**
	 * Returns whether or not this is an update for a guest clan chat
	 * @return	True if this is a guest clan channel update, false if it's a main clan channel update
	 */
	public boolean isGuestUpdate () {
		return isGuestCc;
	}
	
	/**
	 * Returns the unique hash code for the clan
	 * @return	The clan hash
	 */
	public long getClanHash () {
		return clanHash;
	}
	
	/**
	 * Returns the current channel update number
	 * @return	The update number
	 */
	public long getUpdateNumber () {
		return updateNum;
	}
	
	/**
	 * Returns the nodes for this delta update
	 * @return	The delta nodes
	 */
	public ClanChannelDelta[] getDeltaNodes () {
		return deltaNodes;
	}
}
