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
package org.virtue.utility.text;


/**
 * @author Graham
 */
public final class Base37Utility {

	public static String decodeBase37(long value) {
		char[] chars = new char[12];
		int pos = 0;
		while (value != 0) {
			int remainder = (int) (value % 37);
			value /= 37;

			char c;
			if (remainder >= 1 && remainder <= 26)
				c = (char) ('a' + remainder - 1);
			else if (remainder >= 27 && remainder <= 36)
				c = (char) ('0' + remainder - 27);
			else
				c = '_';

			chars[chars.length - pos++ - 1] = c;
		}
		return new String(chars, chars.length - pos, pos);
	}

	public static long encodeBase37(String str) {
		int len = str.length();
		if (len > 12)
			throw new IllegalArgumentException("String too long.");

		long value = 0;
		for (int pos = 0; pos < len; pos++) {
			char c = str.charAt(pos);
			value *= 37;

			if (c >= 'A' && c <= 'Z') {
				value += c - 'A' + 1;
			} else if (c >= 'a' && c <= 'z') {
				value += c - 'a' + 1;
			} else if (c >= '0' && c <= '9') {
				value += c - '0' + 27;
			} else if (c != ' ' && c != '_') {//We'll just encode this as a space
				//throw new IllegalArgumentException("Illegal character in string: " + c + ".");
			}
		}

		while (value != 0 && (value % 37) == 0)
			value /= 37;

		return value;
	}
}
