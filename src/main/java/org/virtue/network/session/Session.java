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
package org.virtue.network.session;

import java.io.IOException;

import io.netty.channel.Channel;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 4, 2014
 */
public abstract class Session {

	/**
	 * The remote peer's channel
	 */
	protected final Channel channel;

	/**
	 * Constructs a new Session with the specified channel
	 * @param channel
	 */
	public Session(Channel channel) {
		this.channel = channel;
	}

	/**
	 * Called when the network handler receives a message in the buffer
	 * @param message - the message received
	 * @throws IOException
	 */
	public abstract void messageReceived(Object message) throws IOException;
	
	/**
	 * Called when the remote peer's channel is disconnected
	 */
	public abstract void disconnect();
	
}
