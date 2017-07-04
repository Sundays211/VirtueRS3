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
package org.virtue.network.event.context.impl.in;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Oct 26, 2014
 */
public class UrlRequestEventContext implements GameEventContext {

	/**
	 * Prefix of the link (www)
	 */
	private String module;
	
	/**
	 * The link
	 */
	private String link;
	
	private String unknown;
	
	/**
	 * Flags of the link (0x1 & 0x2) (Don't know what they are for yet)
	 */
	private int flag;
	
	public UrlRequestEventContext(String prefix, String link, String string, int flag) {
		this.module = prefix;
		this.link = link;
		this.unknown = string;
		this.flag = flag;
	}
	
	/**
	 * Returns the link prefix
	 * @return
	 */
	public String getModule() {
		return module;
	}
	
	/**
	 * Return the link
	 * @return
	 */
	public String getLink() {
		return link;
	}
	
	public String getUnknown() {
		return unknown;
	}
	
	/**
	 * Returns the flag
	 * @return
	 */
	public int getFlag() {
		return flag;
	}
}
