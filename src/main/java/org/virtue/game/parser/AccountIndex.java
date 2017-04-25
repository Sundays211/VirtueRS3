/**
 * Copyright (c) 2016 Virtue Studios
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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 9/03/2016
 */
public abstract class AccountIndex {
	
	/**
	 * Adds a new account to the index
	 * @param email The email address for the account
	 * @param name The name for the account (this is used as both the username and display name).
	 */
	public void addAccount (String email, String name) {
		addAccount(new AccountInfo(email, Base37Utility.encodeBase37(name), name));
	}
	
	/**
	 * Adds an account to the index
	 * @param email The email address of the account
	 * @param userhash The user hash of the account
	 * @param name The current display name of the account
	 * @param prev The last display name held by the account
	 */
	protected void addAccount (String email, long userhash, String name, String prev, boolean locked, PrivilegeLevel rights) {
		addAccount(new AccountInfo(email, userhash, name, prev, locked, rights));
	}
	
	/**
	 * Adds a new account to the index
	 * @param info The account info of the account being added
	 */
	protected abstract void addAccount (AccountInfo info);
	
	public void lockAccount (long userHash) {
		AccountInfo info = lookupByHash(userHash);
		info.setLocked(true);
		updateAccount(info);
	}
	
	public void setDisplayName (long userHash, String displayName) {
		AccountInfo info = lookupByHash(userHash);
		info.setDisplayName(displayName);
		updateAccount(info);
	}
	
	public void setAccountType (long userHash, PrivilegeLevel type) {
		AccountInfo info = lookupByHash(userHash);
		info.setType(type);
		updateAccount(info);
	}
	
	/**
	 * Updates the specified account within the index
	 * @param info The account to update
	 */
	protected abstract void updateAccount (AccountInfo info);
	
	/**
	 * Looks up the account information, based on a userhash.
	 * Note that a "userhash" is simply a hashed version of a username
	 * @param hash The userhash to check
	 * @return The {@link AccountInfo} for the account, or null if the account does not exist.
	 */
	public abstract AccountInfo lookupByHash (long hash);
	
	/**
	 * Looks up the account information, based on a display name. The search is case-insensitive and strips symbols.
	 * @param display The display name to check
	 * @return The {@link AccountInfo} for the account, or null if the account does not exist.
	 */
	public abstract AccountInfo lookupByDisplay (String display);
	
	/**
	 * Looks up the account information, based on a username. The search is case-insensitive and strips symbols.
	 * @param name The username to check
	 * @return The {@link AccountInfo} for the account, or null if the account does not exist.
	 */
	public abstract AccountInfo lookupByUsername (String name);
	
	/**
	 * Looks up the account information, based on an email address. The search is case-insensitive and trims all white space.
	 * @param email The email address to check
	 * @return The {@link AccountInfo} for the account, or null if the account does not exist.
	 */
	public abstract AccountInfo lookupByEmail (String email);

}
