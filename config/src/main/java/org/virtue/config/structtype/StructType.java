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
package org.virtue.config.structtype;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 27/10/2014
 */
public class StructType implements ConfigType {	
	Map<Integer, Object> values;
	int id;
	
	public StructType (int id, StructTypeList list) {
		this.id = id;
	}
	
	public void decode (ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}
	
	private void decode(ByteBuffer buffer, int code) {
		if (code == 249) {
			int count = buffer.get() & 0xff;
		    if (null == values) {				
		    	values = new HashMap<Integer, Object>(count);
		    }
		    for (int i = 0; i < count; i++) {
				boolean stringParam = (buffer.get() & 0xff) == 1;
				int key = ByteBufferUtils.getTriByte(buffer);
				Object value;
				if (stringParam) {
					value = ByteBufferUtils.getString(buffer);
				} else {
					value = new Integer(buffer.getInt());
				}
				values.put(key, value);
		    }
		} else {
			throw new RuntimeException("Unknown config code: "+code);
		}
	}
	
	public ByteBuffer encode() {
		ByteBuffer buffer = ByteBuffer.allocate(50_000);
		
		if (values != null) {
			buffer.put((byte) 249);
			buffer.put((byte) values.size());
			for (Map.Entry<Integer, Object> entry : values.entrySet()) {
				Object value = entry.getValue();
				buffer.put((byte) ((value instanceof String) ? 1 : 0));
				ByteBufferUtils.putTriByte(buffer, entry.getKey());
				if (value instanceof String) {
					ByteBufferUtils.putString(buffer, (String) value);
				} else {
					buffer.putInt((Integer) value);
				}
			}
		}

		return (ByteBuffer) buffer.flip();
	}
	
	public int getId () {
		return id;
	}
    
    public int getParam(int key, int defaultInt) {
		if (values == null) {
		    return defaultInt;
		}
		Integer value = (Integer) values.get(key);
		if (null == value) {
		    return defaultInt;
		}
		return value.intValue();
    }
    
    public String getParam(int key, String defaultStr) {
		if (null == values) {
		    return defaultStr;
		}
		String value = (String) values.get(key);
		if (value == null) {
		    return defaultStr;
		}
		return value;
    }
    
    public Map<Integer, Object> getValueMap() {
    	return values;
    }
	
	@Override
    public String toString () {
    	return new StringBuilder().append(id).append(values).toString();
    }

	@Override
	public void postDecode() {
		
	} 
}
