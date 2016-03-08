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
package org.virtue.network.event.context.impl.in;

import org.virtue.game.content.chat.ChatOptionType;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 28/01/2015
 */
public class ChatOptionEventContext implements GameEventContext {
	
	private int hash;
	private int slot;
	private OptionButton button;
	private String name;
	
	private ChatOptionType type;
	
	public ChatOptionEventContext (int hash, int slot, OptionButton button, String name, ChatOptionType type) {
		this.hash = hash;
		this.slot = slot;
		this.button = button;
		this.name = name;
		this.type = type;
	}

	public int getHash() {
		return hash;
	}

	public int getSlot() {
		return slot;
	}
	
	public OptionButton getButton () {
		return button;
	}

	public int getInterfaceId() {
		return hash >> 16;
	}

	public int getComponentId() {
		return hash & 0xffff;
	}
	
	public String getName () {
		return name;
	}
	
	public ChatOptionType getType () {
		return type;
	}
}
