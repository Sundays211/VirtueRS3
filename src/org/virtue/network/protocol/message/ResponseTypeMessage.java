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


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 12, 2014
 */
public enum ResponseTypeMessage {

	STATUS_OK(2),
	STATUS_INVALID_PASSWORD(3),
	STATUS_BANNED(4),
	STATUS_ALREADY_ONLINE(5),
	GAME_UPDATED(6),
	STATUS_WORLD_FULL(7),
	LOGIN_SERVER_DOWN(8),
	LOGIN_LIMIT_EXCEDED(9),
	BAD_SESSION(10),
	PASSWORD_COMMON(11),
	MEMBERS_WORLD(12),
	LOGIN_INCOMPLETE(13),
	SERVER_UPDATING(14),
	UNEXPECTED_RESPONSE(15),
	TOO_MANY_INCORRECT_LOGINS(16),
	IN_MEMBERS_AREA(17),
	ACCOUNT_LOCKED(18),
	FULLSCREEN_P2P(19),
	INVALID_LOGIN_SERVER(20),
	PROFILE_TRANSFERING(21),
	BAD_LOGIN_PACKET(22),
	NO_LOGIN_RESPONSE(23),
	STATUS_ERROR_LOADING_PROFILE(24),
	UNEXPECTED_LOGIN_RESPONSE(25),
	STATUS_IP_BANNED(26),
	JAG_UNAUTHORISED(50),
	EMAIL_NEEDS_VALIDATING(51),
	AUTHENTICATOR(56);
	
	int code;
	
	ResponseTypeMessage(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
}
