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
package org.virtue.network.protocol.ondemand;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

import org.virtue.network.protocol.message.ondemand.OnDemandResponseMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class OnDemandEncoder extends MessageToByteEncoder<OnDemandResponseMessage> {

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.MessageToByteEncoder#encode(io.netty.channel.ChannelHandlerContext, java.lang.Object, io.netty.buffer.ByteBuf)
	 */
	@Override
	protected void encode(ChannelHandlerContext ctx, OnDemandResponseMessage response, ByteBuf buf) throws Exception {
		ByteBuf container = response.getContainer();
        int type = response.getType();
        int file = response.getFile();
        int compression = container.readUnsignedByte();
        int size = container.readInt();
        
        if (!response.isPriority()) {
			file |= ~0x7FFFFFFF;
        }
        
        ByteBuf buffer = Unpooled.buffer();
        
        buffer.writeByte(type);
        buffer.writeInt(file);
        buffer.writeByte(compression);
        buffer.writeInt(size);
        //102400-5=102395, 102400-10 (512-5, 512-10)
		int bytes = container.readableBytes();
		if (bytes > 102390) {
			bytes = 102390;
		}
        buffer.writeBytes(container.readBytes(bytes));

        while ((bytes = container.readableBytes()) != 0) {
            bytes = container.readableBytes();
            if (bytes == 0) {
                break;
            } else if (bytes > 102395) {
                bytes = 102395;
            }

            buffer.writeByte(type);
            buffer.writeInt(file);
            buffer.writeBytes(container.readBytes(bytes));
        }
        ctx.channel().writeAndFlush(buffer);
	}

}
