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
package org.virtue.config.vartype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.vartype.constants.ScriptVarType;
import org.virtue.config.vartype.constants.VarLifetime;
import org.virtue.config.vartype.constants.VarTransmitLevel;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public class VarType implements ConfigType {
	
	public static enum VarTypeEncodingKey {
		DEBUGNAME(1),
		DOMAIN(2),
		TYPE(3),
		LIFETIME(4),
		TRANSMITLEVEL(5),
		VARNAME_HASH32(6),
		KEY_7(7);
		
	    int serialID;
	    
	    public int getId(int i) {
	    	return serialID;
	    }
	    
	    VarTypeEncodingKey(int serialID) {
			this.serialID = serialID;
	    }
	    
		static VarTypeEncodingKey getById (int id) {
			for (VarTypeEncodingKey key : values()) {
				if (id == key.serialID) {
					return key;
				}
			}
			return null;
		}
	}
	
    public boolean aBool2151 = true;
    public VarDomainType domain;
    public int id;
    public VarLifetime lifeTime = VarLifetime.TEMPORARY;
    public VarTransmitLevel clientTransmitLevel;
    public ScriptVarType dataType;
	public String debugName;
	
	public VarType (int id, VarTypeList list) {
		this.id = id;
		this.domain = list.domain;
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.config.ConfigType#decode(java.nio.ByteBuffer)
	 */
	@Override
	public void decode(ByteBuffer buffer) {
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			VarTypeEncodingKey key = VarTypeEncodingKey.getById(opcode);
			if (key != null) {
				switch (key) {
				case TYPE: {
				    int type = buffer.get() & 0xff;
				    dataType = ScriptVarType.getById(type);
				    if (null == dataType) {
				    	throw new IllegalStateException("Invalid data type for var "+id+": "+type);
				    }
				    break;
				}
				case TRANSMITLEVEL:
					clientTransmitLevel = VarTransmitLevel.getById(buffer.get() & 0xff);
				    break;
				case LIFETIME:
					lifeTime = VarLifetime.getById(buffer.get() & 0xff);
				    break;
				case DEBUGNAME:
					if (buffer.get() != 0) {
						throw new IllegalStateException("");
					}
					debugName = ByteBufferUtils.getString(buffer);
					break;
				case VARNAME_HASH32:
				    break;
				case KEY_7:
					aBool2151 = false;
				    break;
				default:
					throw new IllegalStateException("Unsupported encoding key: "+key);
				}
			} else {
				
			}
		}
	}
	
	public void decode (ByteBuffer buffer, int code) {
		throw new IllegalStateException("Unsupported config code: "+code);
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.config.ConfigType#postDecode()
	 */
	@Override
	public void postDecode() {
		
	}

	@Override
	public String toString () {
		return debugName != null ? debugName : Integer.toString(id);
	}
}
