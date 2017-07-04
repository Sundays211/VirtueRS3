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
package org.virtue.network.protocol;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ReplayingDecoder;

import java.util.List;

import org.virtue.Constants;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.protocol.message.event.GameEventMessage;
import org.virtue.utility.ISAACCipher;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 5, 2014
 */
enum Stage {
	READ_OPCODE, READ_LENGTH, FINALIZE
};

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 5, 2014
 */
public class ProtocolDecoder extends ReplayingDecoder<Stage> {

	int opcode;

	int length;

	private final ISAACCipher cipher;

	public ProtocolDecoder(ISAACCipher cipher) {
		super(Stage.READ_OPCODE);
		this.cipher = cipher;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see io.netty.handler.codec.ByteToMessageDecoder#decode(io.netty.channel.
	 * ChannelHandlerContext, io.netty.buffer.ByteBuf, java.util.List)
	 */
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buf, List<Object> out) throws Exception {
		if (buf.isReadable()) {
			switch (state()) {
			case READ_OPCODE:
				opcode = (buf.readByte() - cipher.nextInt()) & 0xFF;
				//System.out.println("Received opcode: " + opcode);
				checkpoint(Stage.READ_LENGTH);
				break;
			case READ_LENGTH:
				//System.out.println("Getting length of opcode: " + opcode);
				length = Constants.PACKET_SIZES[opcode];
				switch (length) {
				case -1:
					if (buf.isReadable()) {
						length = buf.readByte() & 0xff;
					}
					break;
				case -2:
					if (buf.readableBytes() >= 2) {
						length = buf.readShort() & 0xffff;
					}
					break;
				}
				checkpoint(Stage.FINALIZE);
				break;
			case FINALIZE:
				if (buf.readableBytes() >= length) {
					byte[] payload = new byte[length];
					buf.readBytes(payload, 0, length);
					out.add(new GameEventMessage(opcode, new InboundBuffer(payload)));
				}
				checkpoint(Stage.READ_OPCODE);
				break;
			}
		}
	}
}
