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
package org.virtue.cache.def.impl;

import java.io.Serializable;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.virtue.cache.utility.ByteBufferUtils;

/**
 * @author Sundays211
 * @since 19/11/2014
 */
public class EnumType {
	
	public static EnumType decode (ByteBuffer buffer, int id) {
		EnumType enumType = new EnumType();
		enumType.id = id;
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			if (opcode == 1) {
				buffer.get();
			    //keyType = ScriptVarType.forChar(StringTools.charFromByte(buffer.readByte()));
			} else if (opcode == 2) {
				buffer.get();
			    //valueType = ScriptVarType.forChar(StringTools.charFromByte(buffer.readByte()));
			} else if (3 == opcode) {
				enumType.defaultstr = ByteBufferUtils.getString(buffer);
			} else if (4 == opcode) {
				enumType.defaultint = buffer.getInt();
			} else if (5 == opcode || 6 == opcode) {
				enumType.size = buffer.getShort() & 0xffff;
				enumType.setValueMap(new HashMap<Integer, Serializable>(enumType.size));
			    for (int i_19_ = 0; i_19_ < enumType.size; i_19_++) {
					int key = buffer.getInt();
					Serializable value;
					if (opcode == 5) {
					    value = ByteBufferUtils.getString(buffer);
					} else {
					    value = new Integer(buffer.getInt());
					}
					enumType.getValueMap().put(new Integer(key), value);
			    }
			} else if (opcode == 7 || 8 == opcode) {
			    int max = buffer.getShort() & 0xffff;
			    enumType.size = buffer.getShort() & 0xffff;
			    enumType.valueArray = new Object[max];
			    for (int i_22_ = 0; i_22_ < enumType.size; i_22_++) {
			    	int key = buffer.getShort() & 0xffff;
					if (7 == opcode) {
						enumType.valueArray[key] = ByteBufferUtils.getString(buffer);
					} else {
						enumType.valueArray[key] = new Integer(buffer.getInt());
					}
			    }
			} else if (101 == opcode) {
				ByteBufferUtils.getSmallSmartInt(buffer);
			    //keyType = ScriptVarType.forSerialID(buffer.readSmart());
			} else if (102 == opcode) {
				ByteBufferUtils.getSmallSmartInt(buffer);
			    //valueType = ScriptVarType.forSerialID(buffer.readSmart());
			}
		}
		return enumType;
	}
	
	private Map<Integer, Serializable> valueMap;
    HashMap<Object, int[]> reverseLookupMap;
    //public ScriptVarType valueType;
    String defaultstr = "null";
    int defaultint;
    //public ScriptVarType keyType;
    Object[] valueArray;
    int size = 0;
	int id;
	
	public int getID () {
		return id;
	}
    
    public int getValueInt(int key) {
		Object value = getValue(key);
		if (value == null) {
		    return defaultint;
		}
		return ((Integer) value).intValue();
    }
    
    public String getValueString(int key) {
		Object value = getValue(key);
		if (null == value) {
		    return defaultstr;
		}
		return (String) value;
    }
    
    Object getValue(int key) {
		if (null != valueArray) {
		    if (key < 0 || key >= valueArray.length) {
		    	return null;
		    }
		    return valueArray[key];
		}
		if (null != getValueMap()) {
		    return getValueMap().get(new Integer(key));
		}
		return null;
    }
    
    public boolean containsValue(Object value) {
		if (size == 0) {
		    return false;
		}
		if (null == reverseLookupMap) {
		    genReverseLookup();
		}
		return reverseLookupMap.containsKey(value);
    }
    
    public int[] getKeysForValue(Object value) {
		if (size == 0) {
		    return null;
		}
		if (null == reverseLookupMap) {
		    genReverseLookup();
		}
		return (int[]) reverseLookupMap.get(value);
    }
    
    void genReverseLookup() {
		HashMap<Object, List<Integer>> hashmap = new HashMap<Object, List<Integer>>();
		if (null != valueArray) {
		    for (int pos = 0; pos < valueArray.length; pos++) {
				if (null != valueArray[pos]) {
				    Object object = valueArray[pos];
				    List<Integer> list = (List<Integer>) hashmap.get(object);
				    if (list == null) {
						list = new LinkedList<Integer>();
						hashmap.put(object, list);
				    }
				    list.add(new Integer(pos));
				}
		    }
		} else if (getValueMap() != null) {
		    Iterator<Entry<Integer, Serializable>> iterator = getValueMap().entrySet().iterator();
		    while (iterator.hasNext()) {
				Map.Entry<Integer, Serializable> entry = (Map.Entry<Integer, Serializable>) iterator.next();
				Object object = entry.getValue();
				List<Integer> list = (List<Integer>) hashmap.get(object);
				if (list == null) {
				    list = new LinkedList<Integer>();
				    hashmap.put(object, list);
				}
				list.add(entry.getKey());
		    }
		} else {
		    throw new IllegalStateException();
		}
		reverseLookupMap = new HashMap<Object, int[]>();
		Iterator<Map.Entry<Object, List<Integer>>> iterator = hashmap.entrySet().iterator();
		while (iterator.hasNext()) {
		    Map.Entry<Object, List<Integer>> entry = (Map.Entry<Object, List<Integer>>) iterator.next();
		    List<Integer> list = (List<Integer>) entry.getValue();
		    int[] is = new int[list.size()];
		    int i_5_ = 0;
		    Iterator<Integer> iterator_6_ = list.iterator();
		    while (iterator_6_.hasNext()) {
				Integer integer = (Integer) iterator_6_.next();
				is[i_5_++] = integer.intValue();
		    }
		    if (valueArray == null) {
		    	Arrays.sort(is);
		    }
		    reverseLookupMap.put(entry.getKey(), is);
		}
    }
    
    public int getSize() {
    	return size;
    }

	/**
	 * Gets the valueMap value.
	 * @return The valueMap.
	 */
	public Map<Integer, Serializable> getValueMap() {
		return valueMap;
	}

	/**
	 * Sets the valueMap value.
	 * @param valueMap The valueMap to set.
	 */
	public void setValueMap(Map<Integer, Serializable> valueMap) {
		this.valueMap = valueMap;
	}

}
