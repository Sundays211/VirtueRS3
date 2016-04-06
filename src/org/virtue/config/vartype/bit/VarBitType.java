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
package org.virtue.config.vartype.bit;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.VarTypeList;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public class VarBitType implements ConfigType {
	/**
	 * The masks for all bits between 0 and 31
	 */
    static int[] masklookup = new int[32];
    
    static {
		int mask = 2;
		for (int bit = 0; bit < 32; bit++) {
		    masklookup[bit] = mask - 1;
		    mask += mask;
		}
    }
    
    private static enum VarBitTypeEncodingKey {
    	BASEVAR(1),
    	BITS(2),
    	WARNONDECREASE(3),
    	MASTERQUEST(4),
    	QUESTPOINTS(5),
    	WEALTHEQUIVALENT(6),
    	SETVARALLOWED(7),
    	SENDTOGAMELOGWORLD(8),
    	TRANSMITLEVEL(9),
    	TRANSMITLEVELOTHER(10),
    	DEBUGNAME(11),
    	IGNOREOVERLAP(12),
    	VARBITNAME_HASH32(13),
    	KEY_14(14),
    	KEY_15(15);
    	
        //int serialID;            
        
        VarBitTypeEncodingKey(int id) {
    		//serialID = id;
        }
        
        public static VarBitTypeEncodingKey getById (int id) {
        	switch (id) {
        	case 1:
        		return BASEVAR;
        	case 2:
        		return BITS;
        	default:
        		if (id > 1 && id <= values().length) {
        			return values()[id-1];
        		} else {
        			return null;
        		}
        	}
        }
    }
    
    private VarBitTypeList myList;
    public int id;
    int startBit;
    int endBit;
	VarDomainType baseVarDomain;
    public int baseVarId;
    public VarType baseVar;
    String debugName;
    
    public VarBitType (int id, VarBitTypeList myList) {
    	this.id = id;
    	this.myList = myList;
    }
    
    public void decode (ByteBuffer buffer) {
    	for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
    		decode(buffer, code);
    	}
    }
    
    private void decode (ByteBuffer buffer, int code) {
    	VarBitTypeEncodingKey key = VarBitTypeEncodingKey.getById(code);
		switch (key){
		case BASEVAR:
			int domainID = buffer.get() & 0xff;
			baseVarDomain = VarDomainType.getByID(domainID);
			if (baseVarDomain == null) {
		    	throw new IllegalStateException("Unknown domain ID loading VarType definition: "+domainID);
		    }
			baseVarId = ByteBufferUtils.getSmartInt(buffer);
			if (myList != null) {
				VarTypeList varTypeList = myList.listContainer.get(baseVarDomain);
				if (null != varTypeList) {
					baseVar = varTypeList.list(baseVarId);
				} else {
					//throw new IllegalStateException("Unlisted domain loading VarBitType definition: "+baseVarDomain);
				}
			}
			break;
		case BITS:
			startBit = buffer.get() & 0xff;
			endBit = buffer.get() & 0xff;
			break;
		case DEBUGNAME:
			if (buffer.get() == 0) {
				debugName = ByteBufferUtils.getString(buffer);
			}
		default:
			break;
		}
    }

	@Override
	public void postDecode() {
		
	}
    
    public VarDomainType getBaseVarDomain () {
    	return baseVarDomain;
    }
    
    /**
     * Gets the bit value out of the specified bitpacked variable
     * @param fullValue The bitpacked value
     * @return The bit value
     */
    public int getVarbitValue(int fullValue) {
		int mask = masklookup[(endBit - startBit)];
		return fullValue >> startBit & mask;
    }
    
    /**
     * Sets the bit value for the specified bitpacked variable
     * @param fullValue The original bitpacked value
     * @param bitValue The bit value to set
     * @return The new bitpacked value
     * @throws VarBitOverflowException If the bitValue is greater than the maximum value allowed
     */
    public int setVarbitValue(int fullValue, int bitValue) throws VarBitOverflowException {
    	int mask = masklookup[(endBit - startBit)];
		if (bitValue < 0 || bitValue > mask) {
		    throw new VarBitOverflowException(debugName, bitValue, mask);
		}
		mask <<= startBit;
		return (fullValue & (mask ^ 0xffffffff) | bitValue << startBit & mask);
    }
    
    public int getStartBit () {
    	return startBit;
    }
    
    public int getEndBit () {
    	return endBit;
    }
	
}
