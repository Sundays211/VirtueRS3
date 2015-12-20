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
package org.virtue.network.protocol.handshake;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.network.protocol.creation.CreationDecoder;
import org.virtue.network.protocol.login.LoginDecoder;
import org.virtue.network.protocol.login.LoginEncoder;
import org.virtue.network.protocol.message.HandshakeMessage;
import org.virtue.network.protocol.ondemand.OnDemandDecoder;
import org.virtue.network.protocol.ondemand.OnDemandEncoder;
import org.virtue.network.protocol.ondemand.OnDemandXorEncoder;
import org.virtue.network.protocol.social.SocialDecoder;
import org.virtue.utility.BufferUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class HandshakeDecoder extends ByteToMessageDecoder {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(HandshakeDecoder.class);

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.ByteToMessageDecoder#decode(io.netty.channel.ChannelHandlerContext, io.netty.buffer.ByteBuf, java.util.List)
	 */
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buf, List<Object> out) throws Exception {
		if (buf.isReadable()) {
			HandshakeMessage type = new HandshakeMessage(buf.readUnsignedByte());
			if (type.getType() == null) {
				ctx.close();//Disconnect the player if they have an invalid handshake code.
				return;
			}
			switch (type.getType()) {
			case HANDSHAKE_LOGIN:
				ensureResponse(ctx);
				ctx.pipeline().replace("decoder", "decoder", new LoginDecoder());
				ctx.pipeline().addBefore("decoder", "encoder", new LoginEncoder());
				break;
			case HANDSHAKE_ONDEMAND:
				ensureResponse(ctx, buf);
				ctx.pipeline().replace("decoder", "decoder", new OnDemandDecoder());
				ctx.pipeline().addAfter("decoder", "xor-encoder", new OnDemandXorEncoder());
				ctx.pipeline().addAfter("xor-encoder", "encoder", new OnDemandEncoder());
				break;
			case HANDHSHAKE_CREATION:
				ctx.pipeline().replace("decoder", "decoder", new CreationDecoder());
				break;
			case HANDSHAKE_SOCIAL_LOGIN:
				ensureResponse(ctx);
				ctx.pipeline().replace("decoder", "decoder", new SocialDecoder());
				break;
			default:
				break;
			}
			//ctx.pipeline().remove(HandshakeDecoder.class);
			//if (buf.isReadable()) {
				//out.add(new Object[] { type, buf.readBytes(buf.readableBytes()) });
			//} else {
				out.add(type);
			//}
		}
	}
	
	private void ensureResponse(ChannelHandlerContext ctx) {
		ByteBuf buffer = Unpooled.buffer(1);
		buffer.writeByte(0);
		ctx.channel().writeAndFlush(buffer);
	}
	
	private void ensureResponse(ChannelHandlerContext ctx, ByteBuf buf) {
		if (buf.readableBytes() < 6) {
			return;
		}
		
		ByteBuf buffer = Unpooled.buffer();
		
		int length = buf.readUnsignedByte();
        if (buf.readableBytes() >= length) {
        	int major = buf.readInt();
        	int minor = buf.readInt();
        	String token = BufferUtility.readString(buf);
            if (major != Constants.FRAME_MAJOR && minor != Constants.FRAME_MINOR) {
        	   logger.warn("Bad connection: Invalid major-minor version (sent: "+major+"_"+minor+", expected: "+Constants.FRAME_MAJOR+"_"+Constants.FRAME_MINOR+")");
               buffer.writeByte(6);
            } else {
            	if (!token.equals(Constants.ONDEMAND_TOKEN)) {
            		logger.warn("Bad connection: Invalid server token (sent: "+token+", expected: "+Constants.ONDEMAND_TOKEN+")");
            		buffer.writeByte(6);
            	} else {
            		buffer.writeByte(0);
                	for (int i = 0; i < Constants.ONDEMAND_DELTA.length; i++) {
                    	buffer.writeInt(Constants.ONDEMAND_DELTA[i]);
                	}
            	}
            }
        }
		ctx.channel().writeAndFlush(buffer);
	}
	
}
