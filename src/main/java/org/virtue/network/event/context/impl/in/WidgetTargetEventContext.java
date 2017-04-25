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
 * @since 6/11/2014
 */
public class WidgetTargetEventContext implements GameEventContext {
	
	private int hash, slot, item;
	private int targetHash, targetSlot, targetItem;

	public WidgetTargetEventContext (int hash, int slot, int item, 
			int targetHash, int targetSlot, int targetItem) {
		this.hash = hash;
		this.slot = slot;
		this.item = item;
		this.targetHash = targetHash;
		this.targetSlot = targetSlot;
		this.targetItem = targetItem;
	}
	
	public int getHash () {
		return hash;
	}
	
	public int getInterface () {
		return hash >> 16;
	}
	
	public int getComponent () {
		return hash & 0xffff;
	}
	
	public int getSlot () {
		return slot;
	}
	
	public int getItem () {
		return item;
	}
	
	public int getTargetHash () {
		return targetHash;
	}
	
	public int getTargetInterface () {
		return targetHash >> 16;
	}
	
	public int getTargetComponent () {
		return targetHash & 0xffff;
	}
	
	public int getTargetSlot () {
		return targetSlot;
	}
	
	public int getTargetItem () {
		return targetItem;
	}
}
