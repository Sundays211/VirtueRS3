/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.config.objtype;

import java.util.Arrays;

import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/04/2016
 */
public class ObjTypeCustomisation {
	
	private int[] manwear = new int[3];
	
	private int[] womanwear = new int[3];
	
	private int[] manhead = new int[3];
	
	private int[] womanhead = new int[3];
	
	private short[] recol;
	
	private short[] retex;	
	
	public ObjTypeCustomisation(ObjType objType) {
		manwear[0] = objType.manwear;
		manwear[1] = objType.manwear2;
		manwear[2] = objType.manwear3;
		womanwear[0] = objType.womanwear;
		womanwear[1] = objType.womanwear2;
		womanwear[2] = objType.womanwear3;
		manhead[0] = objType.manhead;
		manhead[1] = objType.manhead2;
		womanhead[0] = objType.womanhead;
		womanhead[1] = objType.womanhead2;
		
		if (objType.recol_d != null) {
			recol = new short[objType.recol_d.length];
			System.arraycopy(objType.recol_d, 0, recol, 0, recol.length);
		}
		if (objType.retex_d != null) {
			retex = new short[objType.retex_d.length];
			System.arraycopy(objType.retex_d, 0, retex, 0, retex.length);
		}
	}
	
	public void setManWear (int slot, int modelId) {
		manwear[slot] = modelId;
	}
	
	public void setWomanWear (int slot, int modelId) {
		womanwear[slot] = modelId;
	}
	
	public void setManHead (int slot, int modelId) {
		manhead[slot] = modelId;
	}
	
	public void setWomanHead (int slot, int modelId) {
		womanhead[slot] = modelId;
	}

	public void setRecol (int slot, short col) {
		recol[slot] = col;
	}

	public void setRetex (int slot, short texture) {
		retex[slot] = texture;
	}
	
	public void encode (OutboundBuffer buffer, ObjType objType) {
		boolean replaceWorn = manwear[0] != objType.manwear | manwear[1] != objType.manwear2 | manwear[2] != objType.manwear3
				| womanwear[0] != objType.womanwear | womanwear[1] != objType.womanwear2 | womanwear[2] != objType.womanwear3;
		
		boolean replaceHead = manhead[0] != objType.manhead | manhead[1] != objType.manhead2
				| womanhead[0] != objType.womanhead | womanhead[1] != objType.womanhead2;
		
		int[] recolSlots = new int[4];
		int recolCount = 0;
		Arrays.fill(recolSlots, 15);
		for (int slot=0;slot<recol.length && recolCount < 4;slot++) {
			if (recol[slot] != objType.recol_d[slot]) {
				recolSlots[recolCount++] = slot;
			}
		}
		
		int[] retexSlots = new int[2];
		int retexCount = 0;
		Arrays.fill(recolSlots, 15);
		for (int slot=0;slot<retex.length && retexCount < 2;slot++) {
			if (retex[slot] != objType.retex_d[slot]) {
				retexSlots[retexCount++] = slot;
			}
		}
		
		int flags = 0;
		if (replaceWorn) {
			flags |= 0x1;
		}
		if (replaceHead) {
			flags |= 0x2;
		}
		if (recolCount > 0) {
			flags |= 0x4;
		}
		if (retexCount > 0) {
			flags |= 0x8;
		}
		buffer.putByte(flags);
		
		if (replaceWorn) {
			buffer.putBigSmart(manwear[0]);
			buffer.putBigSmart(womanwear[0]);
			
			if (-1 != objType.manwear2 || -1 != objType.womanwear2) {
				buffer.putBigSmart(manwear[1]);
				buffer.putBigSmart(womanwear[1]);
			}
			
			if (-1 != objType.manwear3 || -1 != objType.womanwear3) {
				buffer.putBigSmart(manwear[2]);
				buffer.putBigSmart(womanwear[2]);
			}
		}
		
		if (replaceHead) {
			buffer.putBigSmart(manhead[0]);
			buffer.putBigSmart(womanhead[0]);
			
			if (-1 != objType.manhead2 || -1 != objType.womanhead2) {
				buffer.putBigSmart(manhead[1]);
				buffer.putBigSmart(womanhead[1]);
			}
		}
		
		if (recolCount > 0) {
			int slots = 0;
			slots |= recolSlots[0] & 0xf;
			slots |= (recolSlots[1] & 0xf) << 4;
			slots |= (recolSlots[2] & 0xf) << 8;
			slots |= (recolSlots[3] & 0xf) << 12;
			buffer.putShort(slots);
			for (int i=0;i<4;i++) {
				if (recolSlots[i] != 15) {
					buffer.putShort(recol[recolSlots[i]]);
				}
			}
		}
		
		if (retexCount > 0) {
			int slots = 0;
			slots |= retexSlots[0] & 0xf;
			slots |= (retexSlots[1] & 0xf) << 4;
			buffer.putByte(slots);
			for (int i=0;i<2;i++) {
				if (retexSlots[i] != 15) {
					buffer.putShort(retex[retexSlots[i]]);
				}				
			}
		}
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(manhead);
		result = prime * result + Arrays.hashCode(manwear);
		result = prime * result + Arrays.hashCode(recol);
		result = prime * result + Arrays.hashCode(retex);
		result = prime * result + Arrays.hashCode(womanhead);
		result = prime * result + Arrays.hashCode(womanwear);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObjTypeCustomisation other = (ObjTypeCustomisation) obj;
		if (!Arrays.equals(manhead, other.manhead))
			return false;
		if (!Arrays.equals(manwear, other.manwear))
			return false;
		if (!Arrays.equals(recol, other.recol))
			return false;
		if (!Arrays.equals(retex, other.retex))
			return false;
		if (!Arrays.equals(womanhead, other.womanhead))
			return false;
		if (!Arrays.equals(womanwear, other.womanwear))
			return false;
		return true;
	}
}
