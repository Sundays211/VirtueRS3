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
package org.virtue.config.invtype;

import java.nio.ByteBuffer;

import org.virtue.config.ConfigType;

/**
 * 
 * @author Sundays211
 * @since Oct 18, 2014
 */
public class InvType implements ConfigType {	
	public int[] stockCounts;
    public int[] stockObjects;
    private int capacity = 0;
    public int stockCount = 0;
    private int id;
    
    public InvType (int id, InvTypeList list) {
    	this.id = id;
    }
	
	@Override
	public void decode (ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}
    
    private void decode (ByteBuffer buffer, int code) {
    	if (code == 2) {
			capacity = buffer.getShort() & 0xffff;
		} else if (4 == code) {
			stockCount = buffer.get() & 0xff;
			stockObjects = new int[stockCount];
			stockCounts = new int[stockCount];
		    for (int slot = 0;slot < stockCount; slot++) {
		    	stockObjects[slot] = buffer.getShort() & 0xffff;
		    	stockCounts[slot] = buffer.getShort() & 0xffff;
		    }
		} else {
	    	throw new RuntimeException("Unknown config code: "+code);
	    }
    }

	@Override
	public void postDecode() {
		
	}
    
    public int getCapacity () {
    	return capacity;
    }
    
    public int getID () {
    	return id;
    }
}
