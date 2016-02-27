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
	
	private int if1_hash, if1_slot, if1_item;
	private int if2_hash, if2_slot, if2_item;

	public WidgetTargetEventContext (int if1_hash, int if1_slot, int if1_item, 
			int if2_hash, int if2_slot, int if2_item) {
		this.if1_hash = if1_hash;
		this.if1_slot = if1_slot;
		this.if1_item = if1_item;
		this.if2_hash = if2_hash;
		this.if2_slot = if2_slot;
		this.if2_item = if2_item;
	}
	
	public int getIf1Hash () {
		return if1_hash;
	}
	
	public int getIf1Component () {
		return if1_hash & 0xffff;
	}
	
	public int getIf1Interface () {
		return if1_hash >> 16;
	}
	
	public int getIf1Slot () {
		return if1_slot;
	}
	
	public int getIf1Item () {
		return if1_item;
	}
	
	public int getIf2Hash () {
		return if2_hash;
	}
	
	public int getIf2Component () {
		return if2_hash & 0xffff;
	}
	
	public int getIf2Interface () {
		return if2_hash >> 16;
	}
	
	public int getIf2Slot () {
		return if2_slot;
	}
	
	public int getIf2Item () {
		return if2_item;
	}
}
