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
public class LocTargetEventContext implements GameEventContext {
	
	private int hash, slot, item;
	
	private boolean forceRun;
	
	private int baseX, baseY;
	
	private int locID;
	
	public LocTargetEventContext(int hash, int slot, int item, 
			int locID, int baseX, int baseY, boolean forceRun) {
		this.hash = hash;
		this.slot = slot;
		this.item = item;
		this.locID = locID;
		this.baseX = baseX;
		this.baseY = baseY;
		this.forceRun = forceRun;
	}
	
	public int getHash () {
		return hash;
	}
	
	public int getComponent () {
		return hash & 0xffff;
	}
	
	public int getInterface () {
		return hash >> 16;
	}
	
	public int getSlot () {
		return slot;
	}
	
	public int getItem () {
		return item;
	}
	
	public int getTargetTypeID () {
		return locID;
	}
	
	public int getTargetCoordX () {
		return baseX;
	}
	
	public int getTargetCoordY () {
		return baseY;
	}
	
	public boolean forceRun () {
		return forceRun;
	}

}
