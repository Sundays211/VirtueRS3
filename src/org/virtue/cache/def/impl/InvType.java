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
package org.virtue.cache.def.impl;

import java.nio.ByteBuffer;

/**
 * 
 * @author Sundays211
 * @since Oct 18, 2014
 */
public class InvType {
	
	public static InvType decode (ByteBuffer buffer, int id) {
		InvType invType = new InvType();
		invType.myid = id;
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			if (opcode == 2) {
				invType.capacity = buffer.getShort() & 0xffff;
			} else if (4 == opcode) {
				invType.defaultItemCount = buffer.get() & 0xff;
				invType.defaultItems = new int[invType.defaultItemCount];
				invType.defaultItemAmounts = new int[invType.defaultItemCount];
			    for (int slot = 0;slot < invType.defaultItemCount; slot++) {
			    	invType.defaultItems[slot] = buffer.getShort() & 0xffff;
			    	invType.defaultItemAmounts[slot] = buffer.getShort() & 0xffff;
			    }
			}
		}
		return invType;
	}
	
	public int[] defaultItemAmounts;
    public int[] defaultItems;
    private int capacity = 0;
    public int defaultItemCount = 0;
    private int myid;
    
    public int getCapacity () {
    	return capacity;
    }
    
    public int getID () {
    	return myid;
    }
}
