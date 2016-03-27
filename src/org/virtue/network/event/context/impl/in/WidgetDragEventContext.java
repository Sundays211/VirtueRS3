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
 * @since 16/11/2014
 */
public class WidgetDragEventContext implements GameEventContext {

	private int src_hash, src_slot, src_item;
	private int dest_hash, dest_slot, dest_item;

	public WidgetDragEventContext (int src_hash, int src_slot, int src_item, 
			int dest_hash, int dest_slot, int dest_item) {
		this.src_hash = src_hash;
		this.src_slot = src_slot;
		this.src_item = src_item;
		this.dest_hash = dest_hash;
		this.dest_slot = dest_slot;
		this.dest_item = dest_item;
	}
	
	public int getSrcHash () {
		return src_hash;
	}
	
	public int getSrcComponent () {
		return src_hash & 0xffff;
	}
	
	public int getSrcInterface () {
		return src_hash >> 16;
	}
	
	public int getSrcSlot () {
		return src_slot;
	}
	
	public int getSrcItem () {
		return src_item;
	}
	
	public int getDestHash () {
		return dest_hash;
	}
	
	public int getDestComponent () {
		return dest_hash & 0xffff;
	}
	
	public int getDestInterface () {
		return dest_hash >> 16;
	}
	
	public int getDestSlot () {
		return dest_slot;
	}
	
	public int getDestItem () {
		return dest_item;
	}
}
