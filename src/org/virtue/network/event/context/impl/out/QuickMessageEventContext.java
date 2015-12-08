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

import org.virtue.game.content.social.ChannelType;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/07/2015
 */
public class QuickMessageEventContext extends MessageEventContext {
	
	private QuickChatMessage message;

	/**
	 * @param type
	 * @param message
	 */
	public QuickMessageEventContext(int playerIndex, QuickChatMessage message, int effects, PrivilegeLevel rights) {
		super(playerIndex, null, effects, rights);
		this.message = message;
	}
	
	public QuickMessageEventContext (ChannelType type, QuickChatMessage message, String name, String nameUnfiltered, PrivilegeLevel rights) {
		this(type, null, name, nameUnfiltered, rights, null);
		this.message = message;
	}
	
	public QuickMessageEventContext (ChannelType type, QuickChatMessage message, String name, String nameUnfiltered, PrivilegeLevel rights, String clan) {
		super(type, null, name, nameUnfiltered, rights, clan);
		this.message = message;
	}
	
	public QuickChatMessage getQuickMessage () {
		return message;
	}

}
