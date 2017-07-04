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
package org.virtue.network.event.context.impl.in;

import org.virtue.game.content.chat.SocialType;
import org.virtue.game.content.friendchats.ChannelRank;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 13, 2014
 */
public class SocialEventContext implements GameEventContext {

	private SocialType type;
	
	private String name;
	
	private String note;
	
	private ChannelRank rank;
	
	public SocialEventContext(SocialType type, String name) {
		this.type = type;
		this.name = name;
	}
	
	public SocialEventContext(SocialType type, String username, ChannelRank rank) {
		this.type = type;
		this.name = username;
		this.rank = rank;
	}
	
	public SocialEventContext(SocialType type, String name, String note) {
		this.type = type;
		this.name = name;
		this.note = note;
	}
	
	public SocialType getType() {
		return type;
	}
	
	public String getName() {
		return name;
	}
	
	public ChannelRank getRank () {
		return rank;
	}
	
	public String getNote () {
		return note;
	}
}
