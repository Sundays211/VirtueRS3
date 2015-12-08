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

import org.virtue.game.entity.player.Player;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class LoginResponseMessage {

	/**
	 * The {@link Player} contructed from the login request
	 */
	private Player player;
	/**
	 * The return code from the login (2 - okay)
	 */
	private int code;
	
	/**
	 * The login type from the request
	 */
	private LoginTypeMessage type;
	
	/**
	 * Creates a new response ready to be sent over the network
	 * @param player - the player loaded
	 * @param code - the return code
	 * @param type - the login type
	 */
	public LoginResponseMessage(Player player, int code, LoginTypeMessage type) {
		this.player = player;
		this.code = code;
		this.type = type;
	}
	
	/**
	 * Returns the loaded player
	 */
	public Player getPlayer() {
		return player;
	}
	
	/**
	 * Returns the return code
	 */
	public int getReturnCode() {
		return code;
	}
	
	/**
	 * Returns the login type
	 * @return
	 */
	public LoginTypeMessage getLoginType() {
		return type;
	}
	
}
