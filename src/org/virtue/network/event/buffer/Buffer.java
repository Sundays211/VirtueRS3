package org.virtue.network.event.buffer;

/**
 * @author Tom
 * 
 */
public class Buffer {

	public static final int DEFAULT_SIZE = 16;

	protected int offset;
	protected int length;
	protected byte[] buffer;

	public final void getBytes(byte[] data, int off, int len) {
		for (int k = off; k < len + off; k++) {
			data[k] = buffer[offset++];
		}
	}

	public int offset() {
		return offset;
	}

	public void offset(int newOffset) {
		this.offset = newOffset;
	}

	public int length() {
		return length;
	}

	public byte[] buffer() {
		return buffer;
	}
}
