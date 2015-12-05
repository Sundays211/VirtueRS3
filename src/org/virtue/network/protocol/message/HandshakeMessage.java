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
package org.virtue.network.protocol.message;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class HandshakeMessage {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(HandshakeMessage.class);

	/**
	 * Enum of possible handshake types
	 */
	public static enum HandshakeTypes { HANDSHAKE_LOGIN, HANDSHAKE_ONDEMAND, HANDHSHAKE_CREATION, HANDSHAKE_SOCIAL }

	/**
	 * The current handshake type
	 */
	private HandshakeTypes type;

	/**
	 * Creates a new HadshakeMessage with the opcode read from the buffer
	 * @param opcode
	 */
	public HandshakeMessage(int opcode) {
		this.type = forOpcode(opcode);
	}

	/**
	 * Returns the HandshakeType for the opcode supplied
	 */
	public HandshakeTypes forOpcode(int opcode) {
		switch (opcode) {
		case 15:
			return HandshakeTypes.HANDSHAKE_ONDEMAND;
		case 14:
			return HandshakeTypes.HANDSHAKE_LOGIN;
		case 28:
			return HandshakeTypes.HANDHSHAKE_CREATION;
		case 29:
			return HandshakeTypes.HANDSHAKE_SOCIAL;
		default:
			logger.error("Unknown Handshake Opcode: " + opcode);
		}
		return null;
	}

	/**
	 * Returns the current handshake type
	 */
	public HandshakeTypes getType() {
		return type;
	}
	
}
