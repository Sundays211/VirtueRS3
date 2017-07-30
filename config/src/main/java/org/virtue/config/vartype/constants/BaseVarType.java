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
package org.virtue.config.vartype.constants;

import java.nio.ByteBuffer;
import java.util.function.Function;

import org.virtue.cache.utility.ByteBufferUtils;

/**
 * 
 * @author Sundays211
 * @since 12/12/2015
 */
public enum BaseVarType {
	INTEGER(0, Integer.class, (x -> x.getInt())),
	LONG(1, Long.class, (x -> x.getLong())),
	STRING(2, String.class, (x -> ByteBufferUtils.getString(x)));	

	public final Class<?> javaClass;
	private int id;
	private Function<ByteBuffer, Object> decoder;

	private BaseVarType(int id, Class<?> javaClass, Function<ByteBuffer, Object> decoder) {
		this.id = id;
		this.javaClass = javaClass;
		this.decoder = decoder;
	}

	public int getId() {
		return id;
	}
	
	public Object decode (ByteBuffer buffer) {
		return decoder.apply(buffer);
	}
    
	public static BaseVarType getById (int id) {
		for (BaseVarType key : values()) {
			if (id == key.id) {
				return key;
			}
		}
		return null;
	}
}
