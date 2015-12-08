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
package org.virtue.network;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.network.protocol.message.HandshakeMessage;
import org.virtue.network.session.Session;
import org.virtue.network.session.impl.LoginSession;
import org.virtue.network.session.impl.OnDemandSession;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandler;
import io.netty.handler.timeout.ReadTimeoutException;
import io.netty.util.AttributeKey;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 9, 2014
 */
public class NetworkHandler implements ChannelInboundHandler {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NetworkHandler.class);
	
	/**
	 * The Attachment {@link Session} for the network
	 */
	public static final AttributeKey<Session> attachment = AttributeKey.valueOf("NetworkHandler.attr");


	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelHandler#handlerAdded(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelHandler#handlerRemoved(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelHandler#exceptionCaught(io.netty.channel.ChannelHandlerContext, java.lang.Throwable)
	 */
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		if (cause instanceof ReadTimeoutException) {
			return;
		}
		logger.error("Exception caught in the network", cause);
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelRegistered(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		logger.info("Channel is now registered from " + ctx.channel().remoteAddress());
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelUnregistered(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		logger.info("Channel is now unregistered from " + ctx.channel().remoteAddress());
		ctx.channel().close();
		if (ctx.channel().attr(attachment).get() != null)
			((Session) ctx.channel().attr(attachment).get()).disconnect();
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelActive(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		//logger.info("Channel is now active from " + ctx.channel().remoteAddress());
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelInactive(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		//logger.info("Channel is now inactive from " + ctx.channel().remoteAddress());
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelRead(io.netty.channel.ChannelHandlerContext, java.lang.Object)
	 */
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof HandshakeMessage) {
			Object sessionAttachment = ctx.channel().attr(attachment).get();
			HandshakeMessage handshakeMessage = (HandshakeMessage) msg;
			if(sessionAttachment == null) {
				switch(handshakeMessage.getType()) {
				case HANDSHAKE_ONDEMAND:
					ctx.channel().attr(attachment).set(new OnDemandSession(ctx.channel()));
					break;
				case HANDSHAKE_LOGIN:
					ctx.channel().attr(attachment).set(new LoginSession(ctx.channel()));
					break;
				case HANDHSHAKE_CREATION:
					//ctx.channel().attr(attachment).set(new CreationSession(ctx.channel()));
					break;
				case HANDSHAKE_SOCIAL:
					ctx.channel().attr(attachment).set(new LoginSession(ctx.channel()));
					break;
				default: 
					throw new IllegalStateException("Invalid handshake state requested.");
				}
			}
		}
		if (ctx.channel().attr(attachment).get() != null)
			((Session) ctx.channel().attr(attachment).get()).messageReceived(msg);
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelReadComplete(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		//ctx.flush();
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#userEventTriggered(io.netty.channel.ChannelHandlerContext, java.lang.Object)
	 */
	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see io.netty.channel.ChannelInboundHandler#channelWritabilityChanged(io.netty.channel.ChannelHandlerContext)
	 */
	@Override
	public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub
		
	}
}
