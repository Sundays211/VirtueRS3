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

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 7/11/2014
 */
public class WidgetOnLocEventContext implements GameEventContext {
	
	private int if_hash, if_slot, if_item;
	
	private boolean forceRun;
	
	private int baseX, baseY;
	
	private int locID;
	
	public WidgetOnLocEventContext(int if_hash, int if_slot, int if_item, 
			int locID, int baseX, int baseY, boolean forceRun) {
		this.if_hash = if_hash;
		this.if_slot = if_slot;
		this.if_item = if_item;
		this.locID = locID;
		this.baseX = baseX;
		this.baseY = baseY;
		this.forceRun = forceRun;
	}
	
	public int getIfHash () {
		return if_hash;
	}
	
	public int getIfComponent () {
		return if_hash & 0xffff;
	}
	
	public int getIfInterface () {
		return if_hash >> 16;
	}
	
	public int getIfSlot () {
		return if_slot;
	}
	
	public int getIfItem () {
		return if_item;
	}
	
	public int getLocTypeID () {
		return locID;
	}
	
	public int getBaseX () {
		return baseX;
	}
	
	public int getBaseY () {
		return baseY;
	}
	
	public boolean forceRun () {
		return forceRun;
	}

}
