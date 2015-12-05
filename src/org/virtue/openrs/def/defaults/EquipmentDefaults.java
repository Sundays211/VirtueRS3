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
package org.virtue.openrs.def.defaults;

import java.nio.ByteBuffer;

/**
 * 
 * @author Sundays211
 * @since Oct 18, 2014
 */
public class EquipmentDefaults {
	public int mainhandSlot = -1;
    public int[] disabledSlots;
    public int offhandSlot = -1;
    public int[] anIntArray7634;
    public int[] anIntArray7629;
    
    public EquipmentDefaults(ByteBuffer buffer) {
		for (;;) {
		    int opcode = buffer.get() & 0xff;
		    if (opcode == 0) {
		    	break;
		    }
		    if (opcode == 1) {
				int slotCount = buffer.get() & 0xff;
				disabledSlots = new int[slotCount];
				for (int slot = 0; slot < disabledSlots.length; slot++) {
				    disabledSlots[slot] = buffer.get() & 0xff;
				    if (0 != disabledSlots[slot] && 2 != disabledSlots[slot]) {
				    	/* empty */
				    }
				}
		    } else if (opcode == 3) {
		    	offhandSlot = buffer.get() & 0xff;
		    } else if (4 == opcode) {
		    	mainhandSlot = buffer.get() & 0xff;
		    } else if (opcode == 5) {
		    	anIntArray7634 = new int[buffer.get() & 0xff];
		    	for (int slot = 0; slot < anIntArray7634.length; slot++)
		    		anIntArray7634[slot] = buffer.get() & 0xff;
		    } else if (opcode == 6) {
		    	anIntArray7629 = new int[buffer.get() & 0xff];
		    	for (int slot = 0; slot < anIntArray7629.length; slot++) {
		    		anIntArray7629[slot] = buffer.get() & 0xff;
		    	}
		    }
		}
		if (disabledSlots == null) {
		    throw new RuntimeException("");
		}
    }
}
