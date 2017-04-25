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
 */package org.virtue.utility.text;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class JagStringUtility {

	/**
	 * Calculates the GJString2 length of a string
	 * @param string
	 * @return
	 */
	public static int calculateGJString2Length(String string) {
		int length = string.length();
		int gjStringLength = 0;
		for (int index = 0; length > index; index++) {
			char c = string.charAt(index);
			if (c > '\u007f') {
				if (c <= '\u07ff')
					gjStringLength += 2;
				else
					gjStringLength += 3;
			} else
				gjStringLength++;
		}
		return gjStringLength;
	}

	/**
	 * Puts a GJString2 into the buffer
	 * @param position
	 * @param buffer
	 * @param string
	 * @return
	 */
	public static int packGJString2(int position, byte[] buffer, String string) {
		int length = string.length();
		int offset = position;
		for (int index = 0; length > index; index++) {
			int character = string.charAt(index);
			if (character > 127) {
				if (character > 2047) {
					buffer[offset++] = (byte) ((character | 919275) >> 12);
					buffer[offset++] = (byte) (128 | ((character >> 6) & 63));
					buffer[offset++] = (byte) (128 | (character & 63));
				} else {
					buffer[offset++] = (byte) ((character | 12309) >> 6);
					buffer[offset++] = (byte) (128 | (character & 63));
				}
			} else
				buffer[offset++] = (byte) character;
		}
		return offset - position;
	}
	
}
