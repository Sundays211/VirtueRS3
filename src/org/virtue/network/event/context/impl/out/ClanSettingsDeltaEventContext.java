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

import org.virtue.model.content.social.clan.csdelta.ClanSettingsDelta;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/12/2014
 */
public class ClanSettingsDeltaEventContext implements GameEventContext {

private final int updateNum;
	
	private final boolean isGuestCs;
	
	private final ClanSettingsDelta[] deltaNodes;
	
	public ClanSettingsDeltaEventContext (boolean guestCs, int updateNum, ClanSettingsDelta... deltaNodes) {
		this.isGuestCs = guestCs;
		this.updateNum = updateNum;
		this.deltaNodes = deltaNodes;
	}
	
	/**
	 * Returns whether or not this is an update for a guest clan settings
	 * @return	True if this is a guest clan settings update, false if it's a main clan settings update
	 */
	public boolean isGuestUpdate () {
		return isGuestCs;
	}
	
	/**
	 * Returns the current settings update number
	 * @return	The update number
	 */
	public int getUpdateNumber () {
		return updateNum;
	}
	
	/**
	 * Returns the nodes for this delta update
	 * @return	The delta nodes
	 */
	public ClanSettingsDelta[] getDeltaNodes () {
		return deltaNodes;
	}
}
