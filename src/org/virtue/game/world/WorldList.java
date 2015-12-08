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
package org.virtue.game.world;

import java.util.LinkedList;
import java.util.List;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 5, 2014
 */
public class WorldList {

	/**
	 * The {@link WorldEntry} List
	 */
	private static final List<WorldEntry> entries = new LinkedList<>();
	
	static {
		entries.add(new WorldEntry(1, "-", "127.0.0.1", "ZRS3 Economy", 255, true, true));
		entries.add(new WorldEntry(2, "-", "127.0.0.1", "ZRS3 PK", 255, true, true));
	}
	
	/**
	 * Returns the {@link List} of world entries
	 */
	public static List<WorldEntry> entries() {
		return entries;
	}
	
}
