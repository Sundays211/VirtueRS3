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
package org.virtue.utility;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;

import io.netty.buffer.ByteBuf;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class BufferUtility {

	public static String readString(ByteBuf buf) {
		StringBuilder bldr = new StringBuilder();
		byte b;
		while (buf.isReadable() && (b = buf.readByte()) != 0) {
			bldr.append((char) b);
		}
		return bldr.toString();
	}

	public static void writeString(DataOutputStream buf, String value) throws IOException {
		if (value.contains("\0")) {
			throw new IllegalArgumentException("Null characters are not allowed in null-terminated strings.");
		}
		buf.writeBytes(value);
		buf.writeByte((byte) 0);
	}

	public static String readJagString(ByteBuf buf) {
		StringBuilder bldr = new StringBuilder();
		byte b;
		buf.readByte();
		while (buf.isReadable() && (b = buf.readByte()) != 0) {
			bldr.append((char) b);
		}
		return bldr.toString();
	}

	/**
	 * Reads a 'tri-byte' from the specified buffer.
	 * @param buf The buffer.
	 * @return The value.
	 */
	public static int getTriByte(ByteBuf buf) {
		return ((buf.readByte() & 0xFF) << 16) | ((buf.readByte() & 0xFF) << 8) | (buf.readByte() & 0xFF);
	}

	public static void writeInt(int val, int index, byte[] buffer) {
		buffer[index++] = (byte) (val >> 24);
		buffer[index++] = (byte) (val >> 16);
		buffer[index++] = (byte) (val >> 8);
		buffer[index++] = (byte) val;
	}

	public static int readInt(int index, byte[] buffer) {
		return ((buffer[index++] & 0xff) << 24) | ((buffer[index++] & 0xff) << 16) | ((buffer[index++] & 0xff) << 8) | (buffer[index++] & 0xff);
	}

	public static InputStream byteBufferInputStream (ByteBuffer buffer) {
		return new InputStream() {

			@Override
			public int read() throws IOException {
				return buffer.get();
			}

		};
	}
}
