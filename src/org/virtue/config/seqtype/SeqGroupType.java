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
package org.virtue.config.seqtype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;

/**
 * @author Sundays211
 * @since 29/03/2016
 */
public class SeqGroupType implements ConfigType {
	
	public boolean[] aBoolArray2144;
	public int id;

	public SeqGroupType(int id, SeqGroupTypeList myList) {
		this.id = id;
	}

	@Override
	public void decode(ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}

	void decode(ByteBuffer buffer, int code) {
		if (code == 2) {
			aBoolArray2144 = new boolean[400];
			int count = ByteBufferUtils.getUnsignedSmartInt(buffer);
			for (int index = 0; index < count; index++) {
				aBoolArray2144[ByteBufferUtils.getUnsignedSmartInt(buffer)] = true;
			}
		} else if (code == 3) {
			buffer.get();//& 0xff
			int count = ByteBufferUtils.getUnsignedSmartInt(buffer);
			for (int index = 0; index < count; index++) {
				ByteBufferUtils.getUnsignedSmartInt(buffer);
				buffer.get();//& 0xff
			}
		} else {
			throw new RuntimeException("Unsupported config code: "+code);
		}
	}

	@Override
	public void postDecode() {
		/* empty */
	}
}
