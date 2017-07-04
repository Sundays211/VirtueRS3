/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 13, 2014
 */
public enum SocialType {

	/**
	 * Represents adding a friend to the players friends list
	 */
	ADD_FRIEND,
	
	/**
	 * Represents removing a friend from the players friends list
	 */
	REMOVE_FRIEND,
	
	/**
	 * Represents setting the friend chat rank of a friend
	 */
	SET_FRIEND_RANK,
	
	/**
	 * Represents adding an ignore from the players ignores list
	 */
	ADD_IGNORE,
	
	/**
	 * Represents removing an ignore from the players ignores list
	 */
	REMOVE_IGNORE,
	
	/**
	 * Represents joining or leaving a friend chat channel
	 */
	JOIN_LEAVE_FRIENDCHAT,
	
	/**
	 * Represents a request to kick/ban another user from the friend chat channel
	 */
	KICK_FRIENDCHAT,
	
	/**
	 * Represents setting the note of a friend
	 */
	SET_FRIEND_NOTE,
	
	/**
	 * Represents setting the note of an ignore
	 */
	SET_IGNORE_NOTE;
}
