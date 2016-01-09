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
package org.virtue.network.protocol.social;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.math.BigInteger;
import java.util.List;

import org.virtue.Constants;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Dec 22, 2014
 */
public class SocialDecoder extends ByteToMessageDecoder {

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.ByteToMessageDecoder#decode(io.netty.channel.ChannelHandlerContext, io.netty.buffer.ByteBuf, java.util.List)
	 */
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buf, List<Object> out) throws Exception {
		int size = buf.readShort() & 0xFFFF;
		
		if (buf.readableBytes() < size)
			throw new IllegalStateException("Not enough readable bytes from buffer!");

		int version = buf.readInt();
		int subVersion = buf.readInt();
		
		if (version != Constants.FRAME_MAJOR && subVersion != Constants.FRAME_MINOR)
			throw new IllegalStateException("Invalid client version/sub-version!");

		//if (type.equals(LoginTypeMessage.LOGIN_WORLD))
			//buf.readByte();//TODO if its world login, client does send this byte. however social doesnt send the login type
		
		int secureBufferSize = buf.readShort() & 0xFFFF;
		if (buf.readableBytes() < secureBufferSize)
			throw new IllegalStateException("Not enough readable bytes from buffer.");

		byte[] secureBytes = new byte[secureBufferSize];
		buf.readBytes(secureBytes);
		ByteBuf secureBuffer = Unpooled.wrappedBuffer(new BigInteger(secureBytes).modPow(Constants.getLoginKey(), Constants.getLoginModulus()).toByteArray());
		
		secureBuffer.readByte();
		secureBuffer.skipBytes(4);
		secureBuffer.readByte();
		secureBuffer.readByte();//int langID = 
		secureBuffer.readInt();
		int[] random = new int[5];
		for (int index = 0; index < random.length; index++) {
			random[index] = secureBuffer.readInt();
		}
		secureBuffer.readLong();
		secureBuffer.readByte();
		secureBuffer.readByte();
			ctx.channel().writeAndFlush(Unpooled.buffer().writeByte(0).writeByte(1).writeByte(2));
	}
}
