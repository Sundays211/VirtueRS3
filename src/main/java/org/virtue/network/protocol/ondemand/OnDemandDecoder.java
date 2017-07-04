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
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;

import org.virtue.network.protocol.message.ondemand.OnDemandDropMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandEncryptionMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandInitMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandRequestMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandStateMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class OnDemandDecoder extends ByteToMessageDecoder {

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.ByteToMessageDecoder#decode(io.netty.channel.ChannelHandlerContext, io.netty.buffer.ByteBuf, java.util.List)
	 */
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buf, List<Object> out) throws Exception {

		if (buf.readableBytes() < 6) {
			return;
		}
		
		int opcode = buf.readUnsignedByte();
        if (opcode == 0 || opcode == 1) {// file priority request || normal request
            out.add(new OnDemandRequestMessage(opcode == 1, buf.readUnsignedByte(), buf.readInt()));
        } else if (opcode == 2 || opcode == 3) {// client logged in || logged out
        	out.add(new OnDemandStateMessage(opcode == 2, (buf.readUnsignedByte() | buf.readInt())));
        } else if (opcode == 4) {// encryption change
            out.add(new OnDemandEncryptionMessage(buf.readUnsignedByte(), buf.readInt()));
        } else if (opcode == 6) {// init connection
        	out.add(new OnDemandInitMessage(buf.readUnsignedMedium(), buf.readShort()));
        } else if (opcode == 7) {// drop requests queue
        	out.add(new OnDemandDropMessage(buf.readUnsignedByte() | buf.readInt()));
        }
	}
}
