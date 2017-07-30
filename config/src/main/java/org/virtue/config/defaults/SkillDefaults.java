/**
 * Copyright (c) 2015 Virtue Studios
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
package org.virtue.config.defaults;

import java.nio.ByteBuffer;
import java.util.Iterator;
import java.util.LinkedList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Sundays211
 * @since 23/01/2016
 */
public class SkillDefaults implements Iterable<PlayerSkill> {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(SkillDefaults.class);
	
	PlayerSkill[] skills;
	PlayerSkillXPTable[] xpTables;

	public SkillDefaults(ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			if (1 == code) {
				int i_1_ = buffer.get() & 0xff;
				int maxIndex = 0;
				LinkedList<PlayerSkill> linkedlist = new LinkedList<PlayerSkill>();
				for (int i_3_ = 0; i_3_ < i_1_; i_3_++) {
					int id = buffer.get() & 0xff;
					int maxLevel = buffer.getShort() & 0xffff;
					int flags = buffer.get() & 0xff;
					int nonMemberCap = 0;
					PlayerSkillXPTable xpTable = PlayerSkillXPTable.DEFAULT;
					byte startLevel = 1;
					boolean members = 0 != (flags & 0x1);
					if (0 != (flags & 0x2)) {
						nonMemberCap = buffer.get() & 0xff;
					}
					if (0 != (flags & 0x4)) {
						xpTable = xpTables[buffer.get() & 0xff];
					}
					if (0 != (flags & 0x8)) {
						startLevel = buffer.get();
					}
					boolean bool_9_ = (buffer.get() & 0xff) == 1;
					linkedlist.add(new PlayerSkill(id, maxLevel, members, bool_9_,
							nonMemberCap, xpTable, startLevel));
					if (id > maxIndex) {
						maxIndex = id;
					}
				}
				skills = new PlayerSkill[maxIndex + 1];
				for (PlayerSkill skill : linkedlist) {
					skills[skill.getId()] = skill;
				}
			} else if (code == 2) {
				xpTables = new PlayerSkillXPTable[buffer.get() & 0xff];
				for (int pos = (buffer.get() & 0xff); pos != 255; pos = (buffer.get() & 0xff)) {
					int[] curve = new int[buffer.getShort() & 0xffff];
					for (int level = 0; level < curve.length; level++) {
						curve[level] = buffer.getInt();
					}
					xpTables[pos] = new PlayerSkillXPTable(curve);
				}
			}
		}
		logger.info("Found "+skills.length+" skills and "+(xpTables == null ? 0 : xpTables.length)+" experience tables.");
	}

	public PlayerSkill getSkill(int id) {
		return skills[id];
	}
	
	public int skillCount () {
		return skills.length;
	}

	@Override
	public Iterator<PlayerSkill> iterator() {
		return new Iterator<PlayerSkill>() {			
			private int pos = 0;
			
			@Override
			public boolean hasNext() {
				return pos < skills.length;
			}
			
			@Override
			public PlayerSkill next() {
				return skills[++pos];
			}			
		};
	}

}
