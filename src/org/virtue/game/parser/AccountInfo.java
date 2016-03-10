/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.game.parser;

import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.utility.text.Base37Utility;

public class AccountInfo {
	private String email;
	private long userhash;
	private String displayName;
	private String prevName;
	private boolean locked;
	private PrivilegeLevel type;
	
	public AccountInfo (String email, long userhash, String displayName) {
		this(email, userhash, displayName, "", false, PrivilegeLevel.PLAYER);
	}
	
	public AccountInfo (String email, long userhash, String displayName, String prevName, boolean locked, PrivilegeLevel type) {
		this.email = email;
		this.userhash = userhash;
		this.displayName = displayName;
		this.prevName = prevName;
		this.locked = locked;
		this.type = type;
	}
	
	protected void setDisplayName (String name) {
		if (prevName == null) {
			this.prevName = this.displayName;
		}
		this.displayName = name;
	}
	
	protected void setLocked (boolean locked) {
		this.locked = locked;
	}
	
	public long getUserHash () {
		return userhash;
	}
	
	public String getUsername () {
		return Base37Utility.decodeBase37(userhash);
	}
	
	public String getEmail () {
		return email;
	}
	
	public String getDisplayName () {
		return displayName;
	}
	
	public String getPrevName () {
		return prevName;
	}
	
	public boolean isLocked () {
		return locked;
	}
	
	public PrivilegeLevel getType () {
		return type;
	}
	
	/**
	 * Sets the type of this account
	 * @param type The new account type
	 */
	public void setType (PrivilegeLevel type) {
		this.type = type; 
	}
	
	public static String generateNamePlaceholder (long hash) {
		String hexString = Long.toHexString(hash);
		return new StringBuilder("[#").append(hexString.substring(0, Math.min(hexString.length(), 9))).append(']').toString();
	}
}