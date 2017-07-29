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
package org.virtue.cache.utility;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.zip.CRC32;
import java.util.zip.Checksum;

import org.virtue.cache.utility.crypto.Whirlpool;

/**
 * Contains {@link ByteBuffer}-related utility methods.
 * @author Graham
 * @author `Discardedx2
 */
public final class ByteBufferUtils {

	/**
	 * The modified set of 'extended ASCII' characters used by the client.
	 */
	private static char CHARACTERS[] = { '\u20AC', '\0', '\u201A', '\u0192',
		'\u201E', '\u2026', '\u2020', '\u2021', '\u02C6', '\u2030',
		'\u0160', '\u2039', '\u0152', '\0', '\u017D', '\0', '\0', '\u2018',
		'\u2019', '\u201C', '\u201D', '\u2022', '\u2013', '\u2014',
		'\u02DC', '\u2122', '\u0161', '\u203A', '\u0153', '\0', '\u017E',
		'\u0178' };

	/**
	 * Calculates the CRC32 checksum of the specified buffer.
	 * @param buffer The buffer.
	 * @return The CRC32 checksum.
	 */
	public static int getCrcChecksum(ByteBuffer buffer) {
		Checksum crc = new CRC32();
		for (int i = 0; i < buffer.limit(); i++) {
			crc.update(buffer.get(i));
		}
		return (int) crc.getValue();
	}

	/**
	 * Gets a null-terminated string from the specified buffer, using a
	 * modified ISO-8859-1 character set.
	 * @param buf The buffer.
	 * @return The decoded string.
	 */
	public static String getJagexString(ByteBuffer buf) {
		StringBuilder bldr = new StringBuilder();
		int b;
		while ((b = buf.get()) != 0) {
			if (b >= 127 && b < 160) {
				char curChar = CHARACTERS[b - 128];
				if (curChar != 0) {
					bldr.append(curChar);
				}
			} else {
				bldr.append((char) b);
			}
		}
		return bldr.toString();
	}
	
	/**
	 * Gets a smart integer from the buffer.
	 * @param buffer The buffer.
	 * @return The value.
	 */
	public static int getSmartInt(ByteBuffer buffer) {
		if (buffer.get(buffer.position()) < 0) {
			return buffer.getInt() & 0x7fffffff;
		}
		int shortValue = buffer.getShort() & 0xFFFF;
		return shortValue == 32767 ? -1 : shortValue;
	}
	
	public static int getUnsignedSmartInt(ByteBuffer buffer) {
		if ((buffer.get(buffer.position()) & 0xff) < 128) {
			return buffer.get() & 0xff;
		}
		int shortValue = buffer.getShort() & 0xFFFF;
		return shortValue - 32768;
	}
	
	/**
	 * Gets a small smart integer from the buffer.
	 * @param buffer The buffer.
	 * @return The value.
	 */
	public static int getSmallSmartInt(ByteBuffer buffer) {
		if ((buffer.get(buffer.position()) & 0xff) < 128) {
			return (buffer.get() & 0xff) - 1;
		}
		int shortValue = buffer.getShort() & 0xFFFF;
		return shortValue - 32769;
	}

	/**
	 * Reads a 'tri-byte' from the specified buffer.
	 * @param buf The buffer.
	 * @return The value.
	 */
	public static int getTriByte(ByteBuffer buf) {
		return ((buf.get() & 0xFF) << 16) | ((buf.get() & 0xFF) << 8) | (buf.get() & 0xFF);
	}

	/**
	 * Calculates the whirlpool digest of the specified buffer.
	 * @param buf The buffer.
	 * @return The 64-byte whirlpool digest.
	 */
	public static byte[] getWhirlpoolDigest(ByteBuffer buf) {
		byte[] bytes = new byte[buf.limit()];
		buf.get(bytes);
		return Whirlpool.whirlpool(bytes, 0, bytes.length);
	}

	/**
	 * Writes a 'tri-byte' to the specified buffer.
	 * @param buf The buffer.
	 * @param value The value.
	 */
	public static void putTriByte(ByteBuffer buf, int value) {
		buf.put((byte) (value >> 16));
		buf.put((byte) (value >> 8));
		buf.put((byte) value);
	}

	/**
	 * Converts the contents of the specified byte buffer to a string, which is
	 * formatted similarly to the output of the {@link Arrays#toString()}
	 * method.
	 * @param buffer The buffer.
	 * @return The string.
	 */
	public static String toString(ByteBuffer buffer) {
		StringBuilder builder = new StringBuilder("[");
		for (int i = 0; i < buffer.limit(); i++) {
			String hex = Integer.toHexString(buffer.get(i) & 0xFF).toUpperCase();
			if (hex.length() == 1)
				hex = "0" + hex;

			builder.append("0x").append(hex);
			if (i != buffer.limit() - 1) {
				builder.append(", ");
			}
		}
		builder.append("]");
		return builder.toString();
	}

	/**
	 * Default private constructor to prevent instantiation.
	 */
	private ByteBufferUtils() {
		
	}

	/**
	 * Creates a string from byets in the buffer
	 * @param buffer
	 * @return
	 */
	public static String getString(ByteBuffer buf) {
		StringBuilder bldr = new StringBuilder();
		int b;
		while ((b = (buf.get() & 0xFF)) != 0) {
			bldr.append((char) b);
		}
		return bldr.toString();
	}
	
	/**
	 * Retrieves a quickchat parameter from the byte buffer
	 * @param buf The buffer
	 * @param size The size (in bytes) of the parameter. Must be between 1 and 8
	 * @return The parameter
	 */
	public static long getQuickchatParam(ByteBuffer buf, int size) {
		if (--size < 0 || size > 7) {
			throw new IllegalArgumentException();
		}
		
		long l = 0L;
		for (int shift = 8 * size; shift >= 0; shift -= 8) {
			l |= ((long) buf.get() & 0xffL) << shift;
		}
		return l;
	}
	
	public static void putQuickchatParam (ByteBuffer buf, long param, int size) {
		if (--size < 0 || size > 7) {
			throw new IllegalArgumentException();
		}
		for (int i = size * 8; i >= 0; i -= 8) {
			buf.put((byte) (param >> i));
		}
	}

	/**
	 * Puts a string into a buffer.
	 * 
	 * @param buf
	 *            The buffer.
	 * @param string
	 *            The string.
	 */
	public static void putString(ByteBuffer buf, String string) {
		for (char c : string.toCharArray()) {
			buf.put((byte) c);
		}
		buf.put((byte) 0);
	}
	
	public static byte[] toByteArray(ByteBuffer buffer, int length) {
		byte[] bytes = new byte[length];
		buffer.mark();
		try {
			buffer.position(0);
			buffer.get(bytes, 0, bytes.length);
		} finally {
			buffer.reset();
		}
		return bytes;
	}



	public static int getSmartInt2(ByteBuffer buffer) {
		int result = 0;
		int bit = 0;
		int value;
		do {
			value = buffer.get() & 0xff;
			result |= (value & 0x7f) << bit;
			bit += 7;
		} while (value > 127);
		return result;
	}
}
