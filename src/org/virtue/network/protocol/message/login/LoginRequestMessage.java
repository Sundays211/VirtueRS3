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
package org.virtue.network.protocol.message.login;

import io.netty.channel.Channel;

import org.virtue.utility.ISAACCipher;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class LoginRequestMessage {

	/**
	 * The channel of the request
	 */
	private Channel channel;
	
	/**
	 * The username of the request
	 */
	private String username;
	
	/**
	 * The passworkd of the request
	 */
	private String password;
	
	/**
	 * If the login is using an email
	 */
	private boolean email;
	
	/**
	 * The players encoding ISAACCipher seeds
	 */
	private ISAACCipher encoding;
	
	/**
	 * The players decoding ISAACCipher seeds
	 */
	private ISAACCipher decoding;
	
	/**
	 * The login type of the request
	 */
	private LoginTypeMessage type;
	
	/**
	 * Creates a new Request message
	 * @param username - request's username
	 * @param password - request's password
	 * @param type - request's login type
	 */
	public LoginRequestMessage(Channel channel, String username, String password, boolean email,  ISAACCipher encoding, ISAACCipher decoding, LoginTypeMessage type) {
		this.channel = channel;
		this.username = username;
		this.password = password;
		this.email = email;
		this.encoding = encoding;
		this.decoding = decoding;
		this.type = type;
	}
	
	/**
	 * Returns the channel of the request
	 */
	public Channel getChannel() {
		return channel;
	}
	
	/**
	 * Returns the username of the request
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * Sets the login request's username
	 * @param username
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * Returns the password of the request
	 */
	public String getPassword() {
		return password;
	}
	
	/**
	 * Returns if the login is using an email
	 */
	public boolean isEmail() {
		return email;
	}
	
	/**
	 * Returns the cipher used for encoding the opcode id
	 */
	public ISAACCipher getEncodingCipher() {
		return encoding;
	}
	
	/**
	 * Returns the cipher used for decoding the opcode id
	 */
	public ISAACCipher getDecodingCipher() {
		return decoding;
	}
	
	/**
	 * Returns the login type of the request
	 */
	public LoginTypeMessage getLoginType() {
		return type;
	}
}
