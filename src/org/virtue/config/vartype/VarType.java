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
import org.virtue.config.vartype.constants.ScriptVarType;
import org.virtue.config.vartype.constants.VarLifetime;
import org.virtue.config.vartype.constants.VarTransmitLevel;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public class VarType {
	
	public enum VarTypeEncodingKey {
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
	    
		static VarTypeEncodingKey forSerialID (int id) {
			for (VarTypeEncodingKey key : VarTypeEncodingKey.values()) {
				if (id == key.serialID) {
					return key;
				}
			}
			return null;
		}
	}

    /**
	 * Decodes the {@link VarType} from the specified {@link ByteBuffer}.
	 * @param buffer The buffer.
	 * @param id The id of the varbit.
	 * @return The varBitType.
	 */
	public static VarType decode(ByteBuffer buffer, int id, VarDomainType domain) {
		VarType varType = new VarType();
		varType.id = id;
		varType.domain = domain;
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			VarTypeEncodingKey key = VarTypeEncodingKey.forSerialID(opcode);
			if (key != null) {
				switch (key) {
				case TYPE: {//TYPE
				    int type = buffer.get() & 0xff;
				    varType.dataType = ScriptVarType.getById(type);
				    if (null == varType.dataType) {
				    	throw new IllegalStateException("Invalid data type for var "+id+": "+type);
				    }
				    break;
				}
				case TRANSMITLEVEL://TRANSMITLEVEL
					varType.clientTransmitLevel = VarTransmitLevel.getById(buffer.get() & 0xff);
				    break;
				case LIFETIME://LIFETIME
					varType.lifeTime = VarLifetime.forSerialID(buffer.get() & 0xff);
				    break;
				case DEBUGNAME://DEBUGNAME
					if (buffer.get() != 0) {
						throw new IllegalStateException("");
					}
					varType.debugName = ByteBufferUtils.getString(buffer);
					break;
				case VARNAME_HASH32://VARNAME_HASH32
				    break;
				case KEY_7://KEY_7
					varType.aBool2151 = false;
				    break;
				default:
				    throw new IllegalStateException("");
				}
			}
		}
		return varType;
	}
	
	
    public boolean aBool2151 = true;
    public VarDomainType domain;
    public int id;
    public VarLifetime lifeTime = VarLifetime.TEMPORARY;
    public VarTransmitLevel clientTransmitLevel;
    public ScriptVarType dataType;
	public String debugName;

}
