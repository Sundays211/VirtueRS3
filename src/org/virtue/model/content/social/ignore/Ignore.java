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
package org.virtue.model.content.social.ignore;

import org.virtue.utility.text.Base37Utility;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 12, 2014
 */
public class Ignore {

	/**
	 * Represents the {@code Ignore}'s username.
	 */
	private final long userhash;

	/**
	 * Represents the {@code Ignore}'s display name.
	 */
	private String displayName;
	
	/**
	 * Represents the previous display name of the {@code Ignore}
	 */
	private String prevName;
	
	/**
	 * Represents the note associated with this {@code Ignore}.
	 */
	private String note = "";

	/**
	 * Constructs a new {@code Ignore}.
	 */
	public Ignore(long userhash) {
		this.userhash = userhash;
	}

	/**
	 * Constructs a new {@code Ignore}.
	 */
	public Ignore(long userhash, String note) {
		this.userhash = userhash;
		this.note = note;
	}
	
	/**
	 * Sets the current and previous names for this ignore
	 * @param display The current display name
	 * @param prev The previous display name
	 */
	protected void setNames (String display, String prev) {
		this.displayName = display;
		this.prevName = prev;
	}
	
	/**
	 * Gets the {@code Ignore} user hash
	 * @return The user hash
	 */
	public long getHash () {
		return userhash;
	}

	/**
	 * Gets the username of the {@code Ignore}.
	 * @return the username
	 */
	public String getUsername() {
		return Base37Utility.decodeBase37(userhash);
	}

	/**
	 * Gets the display name of the {@code Ignore}.
	 * @return the displayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * Gets the {@code Ignore} previous display name.
	 * @return the previous name
	 */
	public String getPrevName() {
		return prevName;
	}
	
	/**
	 * Gets the {@code Ignore} note.
	 * @return the note
	 */
	public String getNote () {
		return note;
	}
	
	/**
	 * Sets the {@code Ignore} note.
	 * @param note The note
	 */
	protected void setNote (String note) {
		this.note = note;
	}

}
