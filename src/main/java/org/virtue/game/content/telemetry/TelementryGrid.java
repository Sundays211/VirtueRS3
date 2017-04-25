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
package org.virtue.game.content.telemetry;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/03/2016
 */
public class TelementryGrid implements GameEventContext, Iterable<TelemetryGridGroup> {
	
	private List<TelemetryGridGroup> groups = new ArrayList<>();

	public TelementryGrid() {
		
	}
	
	public int getGroupIndex(int groupId) {
		for (int index = 0; index < groups.size(); index++) {
			if (groups.get(index).getId() == groupId) {
				return index;
			}
		}
		return -1;
	}
	
	public int addGroup (TelemetryGridGroup group) {
		return addGroup(group, -1);
	}

	public int addGroup (TelemetryGridGroup group, int index) {
		if (groups.size() >= 5) {
			throw new RuntimeException("");
		}
		if (getGroupIndex(group.getId()) != -1) {
			throw new RuntimeException("");
		}
		if (index == -1) {
			index = groups.size();
		}
		groups.add(index, group);
		return index;
	}
	
	public void removeGroup (int index) {
		groups.remove(index);
	}
	
	public TelemetryGridGroup getGroup (int index) {
		return groups.get(index);
	}
	
	public int getGroupCount () {
		return groups.size();
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<TelemetryGridGroup> iterator() {
		return groups.iterator();
	}
}
