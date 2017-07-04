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


/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class XTEACipher {
	
	private static final int DELTA = -1640531527;
	private static final int SUM = -957401312;
	private static final int NUM_ROUNDS = 32;
	private final int[] key;

	public XTEACipher(int[] key) {
		this.key = key;
	}

	private void decipher(int[] block) {
		long sum = SUM;
		for (int i = 0; i < NUM_ROUNDS; i++) {
			block[1] -= (key[(int) ((sum & 0x1933) >>> 11)] + sum ^ block[0] + (block[0] << 4 ^ block[0] >>> 5));
			sum -= DELTA;
			block[0] -= ((block[1] << 4 ^ block[1] >>> 5) + block[1] ^ key[(int) (sum & 0x3)] + sum);
		}
	}

	private void encipher(int[] block) {
		long sum = 0;
		for (int i = 0; i < NUM_ROUNDS; i++) {
			block[0] += ((block[1] << 4 ^ block[1] >>> 5) + block[1] ^ key[(int) (sum & 0x3)] + sum);
			sum += DELTA;
			block[1] += (key[(int) ((sum & 0x1933) >>> 11)] + sum ^ block[0] + (block[0] << 4 ^ block[0] >>> 5));
		}
	}

	public byte[] decrypt(byte[] data, int offset, int length) {
		int numBlocks = length / 8;
		int[] block = new int[2];
		for (int i = 0; i < numBlocks; i++) {
			block[0] = BufferUtility.readInt((i * 8) + offset, data);
			block[1] = BufferUtility.readInt((i * 8) + offset + 4, data);
			decipher(block);
			BufferUtility.writeInt(block[0], (i * 8) + offset, data);
			BufferUtility.writeInt(block[1], (i * 8) + offset + 4, data);
		}
		return data;
	}

	public byte[] encrypt(byte[] data, int offset, int length) {
		int numBlocks = length / 8;
		int[] block = new int[2];
		for (int i = 0; i < numBlocks; i++) {
			block[0] = BufferUtility.readInt((i * 8) + offset, data);
			block[1] = BufferUtility.readInt((i * 8) + offset + 4, data);
			encipher(block);
			BufferUtility.writeInt(block[0], (i * 8) + offset, data);
			BufferUtility.writeInt(block[1], (i * 8) + offset + 4, data);
		}
		return data;
	}
}
