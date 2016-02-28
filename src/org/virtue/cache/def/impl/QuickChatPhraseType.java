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

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.regex.Pattern;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/07/2015
 */
public class QuickChatPhraseType {
	
    /**
     * Retrieves the specified location type definition from the cache
     * @param id The location type ID
     * @param buffer The buffer containing the data
     * @return The LocType definition
     */
	public static QuickChatPhraseType load (int id, ByteBuffer buffer) throws IOException {
		QuickChatPhraseType qcType = new QuickChatPhraseType(id);
		try {
			for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
				qcType.decode(buffer, opcode);
			}
		} catch (RuntimeException ex) {
			throw new IOException("Failed to load quickchat phrase "+id, ex);
		}
		return qcType;
	}

	QuickChatDynamicCommand[] dynamicCommands;
	int[][] dynamicCommandConfigKeys;
	String[] text;
    public int[] responses;
    public boolean aBool11355 = true;
	private int myid;
    
    QuickChatPhraseType(int id) {
    	this.myid = id;
    }
    
    void decode(ByteBuffer buffer, int code) {
		if (1 == code) {		
			text = Pattern.compile("<", Pattern.LITERAL).split(ByteBufferUtils.getString(buffer));
		} else if (code == 2) {
		    int i_2_ = buffer.get() & 0xff;
		    responses = new int[i_2_];
		    for (int i_3_ = 0; i_3_ < i_2_; i_3_++) {
		    	responses[i_3_] = buffer.getShort() & 0xffff;
		    }
		} else if (3 == code) {
		    int typeCount = buffer.get() & 0xff;
		    dynamicCommands = new QuickChatDynamicCommand[typeCount];
		    dynamicCommandConfigKeys = new int[typeCount][];
		    for (int slot = 0; slot < typeCount; slot++) {
				int i_6_ = buffer.getShort() & 0xffff;
				QuickChatDynamicCommand type = QuickChatDynamicCommand.getByID(i_6_);
				if (null != type) {
				    dynamicCommands[slot] = type;
				    dynamicCommandConfigKeys[slot] = new int[type.configKeyCount];
				    for (int pos = 0; pos < type.configKeyCount; pos++) {
				    	dynamicCommandConfigKeys[slot][pos] = buffer.getShort() & 0xffff;
				    }
				}
		    }
		} else if (4 == code) {
		    aBool11355 = false;
		}
    }
    
    void setGlobal() {
		if (responses != null) {
			for (int pos = 0; pos < responses.length; pos++) {
				responses[pos] |= 0x8000;
			}
		}
    }
    
    public int getParamCount() {
		if (dynamicCommands == null) {
		    return 0;
		}
		return dynamicCommands.length;
    }
	
	public QuickChatDynamicCommand getDynamicCommand (int pos) {
		return dynamicCommands[pos];
	}
    
    public int getParamKey(int paramSlot, int keySlot) {
		if (null == dynamicCommands || paramSlot < 0
				|| paramSlot > dynamicCommands.length) {
			return -1;
		}
		if (dynamicCommandConfigKeys[paramSlot] == null || keySlot < 0
				|| keySlot > dynamicCommandConfigKeys[paramSlot].length) {
			return -1;
		}
		return dynamicCommandConfigKeys[paramSlot][keySlot];
    }
	
	public int getId () {
		return myid;
	}
	
	public int[] unpack(InboundBuffer buffer) {
		int[] params = new int[0];
		if (dynamicCommands != null) {
			params = new int[dynamicCommands.length];
		    for (int pos = 0; pos < dynamicCommands.length; pos++) {
				int size = dynamicCommands[pos].clientTransmitSize;
				if (size > 0) {
					params[pos] = (int) buffer.getQuickchatParam(size);
				}
		    }
		}
		return params;
    }
	
	public void pack(OutboundBuffer buffer, int[] params) {
		if (dynamicCommands != null) {
		    for (int pos = 0; pos < dynamicCommands.length && pos < params.length; pos++) {
				int size = dynamicCommands[pos].serverTransmitSize;
				if (size > 0) {
					buffer.putQuickchatParam((long) params[pos], size);
				}
		    }
		}
    }
}
