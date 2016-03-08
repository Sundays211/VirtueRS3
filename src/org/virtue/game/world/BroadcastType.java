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
package org.virtue.game.world;

import org.virtue.game.content.chat.ChannelType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 30/01/2015
 */
public enum BroadcastType {
	/**
	 * Achievements which are broadcast across all worlds, such as gaining 99 in all skills
	 */
	GLOBAL_ACHIEVEMENT(ChannelType.BROADCAST),
	
	/**
	 * Achievements which are broadcast to all players on the same world, such as level 99 in one skill
	 */
	LOCAL_ACHIEVEMENT(ChannelType.BROADCAST),
	
	/**
	 * Achievements which are broadcast to all friends
	 */
	FRIEND_ACHIEVEMENT(ChannelType.BROADCAST),
	/**
	 * Used for system broadcasts. These messages will be sent in all chatboxes and are intended to display system messages, such as upcomming update notifications.
	 */
	SYSTEM(ChannelType.BROADCAST);
	
	BroadcastType (ChannelType chatType) {
		
	}
}
