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

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Jan 23, 2015
 */
public class NpcTargetEventContext implements GameEventContext {

	private int hash;
	private int slot;
	private int itemID;
	private int npcIndex;
	private boolean forceRun;
	
	public NpcTargetEventContext(int hash, int slot, int itemID, int npc, boolean force) {
		this.hash = hash;
		this.slot = slot;
		this.itemID = itemID;
		this.npcIndex = npc;
		this.forceRun = force;
	}
	
	public int getIfHash() {
		return hash;
	}
	
	/**
	 * @return the widgetID
	 */
	public int getIfInterface() {
		return hash >> 16;
	}

	/**
	 * @return the componentID
	 */
	public int getIfComponent() {
		return hash & 0xFFFF;
	}

	/**
	 * @return the slot1
	 */
	public int getIfSlot() {
		return slot;
	}

	/**
	 * @return the slot2
	 */
	public int getIfItem() {
		return itemID;
	}

	/**
	 * @return the npcIndex
	 */
	public int getNpcIndex() {
		return npcIndex;
	}
	
	public boolean isForceRun() {
		return forceRun;
	}
}
