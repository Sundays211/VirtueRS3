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
package org.virtue.network.session.impl;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.Cache;
import org.virtue.engine.service.OnDemandService;
import org.virtue.network.protocol.message.ondemand.OnDemandDropMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandEncryptionMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandInitMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandRequestMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandResponseMessage;
import org.virtue.network.protocol.message.ondemand.OnDemandStateMessage;
import org.virtue.network.protocol.ondemand.OnDemandXorEncoder;
import org.virtue.network.session.Session;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 4, 2014
 */
public class OnDemandSession extends Session {

	/**
	 * The {@link Logger} Instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(OnDemandSession.class);

	/**
	 * The {@link OnDemandService} used for the ArrayDeque of pending requests
	 */
	private final OnDemandService service;
	
	/**
	 * The {@link ArrayDwque} of pending requests
	 */
	private final Deque<OnDemandRequestMessage> fileQueue = new ArrayDeque<>();
	
	/**
	 * If the encoder is not sending any requests and no request are being queued
	 */
	private boolean idle = true;
	
	/**
	 * The {@link OnDemandSession} constructor
	 */
	public OnDemandSession(Channel channel) {
		super(channel);
		this.service = Virtue.getInstance().getEngine().getOnDemandService();
	}

	/**
	 * Processes a request and then send the data to the encoder
	 */
	public void processFileQueue() {
		OnDemandRequestMessage request;

		synchronized (fileQueue) {
			request = fileQueue.pop();
			if (fileQueue.isEmpty()) {
				idle = true;
			} else {
				service.addPendingSession(this);
				idle = false;
			}
		}

		if (request != null) {
			int type = request.getType();
			int file = request.getFile();

			Cache cache = Virtue.getInstance().getCache();
			ByteBuf buf;

			try {
				if (type == 255 && file == 255) {
					buf = Unpooled.wrappedBuffer(Virtue.getInstance().getChecksumTable());
				} else {
					buf = Unpooled.wrappedBuffer(cache.getStore().read(type, file));
					if (type != 255)
						buf = buf.slice(0, buf.readableBytes() - 2);
				}
				channel.writeAndFlush(new OnDemandResponseMessage(request.isPriority(), type, file, buf));
			} catch (IOException ex) {
				logger.warn("Failed to service file request " + type + ", " + file + ".", ex);
			}
		}
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#messageReceived(java.lang.Object)
	 */
	@Override
	public void messageReceived(Object message) throws IOException {
		if (message instanceof OnDemandRequestMessage) {
			OnDemandRequestMessage request = (OnDemandRequestMessage) message;

//			if (request.isPriority())
//				System.out.println(request.getType() + ", " + request.getFile());
			
			synchronized (fileQueue) {
				if (request.isPriority()) {
					fileQueue.addFirst(request);
				} else {
					fileQueue.addLast(request);
				}

				if (idle) {
					service.addPendingSession(this);
					idle = false;
				}
			}
		} else if (message instanceof OnDemandStateMessage) {
			OnDemandStateMessage state = (OnDemandStateMessage) message;
			if (state.getPadding() != 0L) {
				channel.close();
			}
		} else if (message instanceof OnDemandEncryptionMessage) {
			OnDemandEncryptionMessage encryption = (OnDemandEncryptionMessage) message;
			if (encryption.getPadding() == 0) {
				OnDemandXorEncoder encoder = channel.pipeline().get(OnDemandXorEncoder.class);
				encoder.setKey(encryption.getKey());
			}
		} else if (message instanceof OnDemandInitMessage) {
			OnDemandInitMessage init = (OnDemandInitMessage) message;
			if (init.getHeader() != 3) {
				channel.close();
			}
			if (init.getPadding() != 0) {
				channel.close();
			}
		} else if (message instanceof OnDemandDropMessage) {
			OnDemandDropMessage drop = (OnDemandDropMessage) message;
			if (drop.getHeader() == 0L) {
				fileQueue.clear();
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#disconnect()
	 */
	@Override
	public void disconnect() {
		fileQueue.clear();
	}

}
