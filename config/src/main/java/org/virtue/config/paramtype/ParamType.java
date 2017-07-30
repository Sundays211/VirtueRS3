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
package org.virtue.config.paramtype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.util.TextConvert;
import org.virtue.config.vartype.constants.ScriptVarType;

public class ParamType implements ConfigType {	
	public int defaultint;
	public boolean autodisable = true;
	public String defaultstr;
	ScriptVarType type;
	
	private int id;

	public ParamType(int id, ParamTypeList list) {
		this.id = id;
	}
	
	public int getId () {
		return id;
	}
	
	@Override
	public void decode(ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decodeLine(buffer, code);
		}
	}

	private void decodeLine(ByteBuffer buffer, int code) {
		if (1 == code) {
			char c = TextConvert.cp1252ToChar(buffer.get());
			type = ScriptVarType.getByChar(c);
		} else if (2 == code) {
			defaultint = buffer.getInt();
		} else if (code == 4) {
			autodisable = false;
		} else if (5 == code) {
			defaultstr = ByteBufferUtils.getString(buffer);
		} else if (code == 101) {
			type = ScriptVarType.getById(ByteBufferUtils.getUnsignedSmartInt(buffer));
		} else {
			throw new RuntimeException("Unknown config code: "+code);
		}
	}

	public boolean stringBase() {
		return ScriptVarType.STRING == type;
	}

	@Override
	public void postDecode() {
		
	}
}
