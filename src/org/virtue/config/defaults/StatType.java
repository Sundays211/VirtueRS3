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

/**
 * @author Sundays211
 * @since 23/01/2016
 */
public class StatType {
	int nonMemberXpCap;
	int levelCap;
	boolean members;
	int id;
	int nonMemberLevelCap;
	ExperienceCurve xpCurve;
	int initialLevel;
	
	StatType(int id, int maxLevel, boolean members, boolean bool_12_, int nonMemberCap,
			ExperienceCurve xpCurve, int initialLevel) {
		this.id = id;
		this.levelCap = maxLevel;
		this.members = members;
		this.xpCurve = xpCurve;
		this.initialLevel = initialLevel;
		if (members) {
			nonMemberLevelCap = nonMemberCap;
			//nonMemberXpCap = method7186(nonMemberCap);
		} else {
			nonMemberLevelCap = -1;
			nonMemberXpCap = -1;
		}
	}

	public int getId() {
		return id;
	}

	public int getNonMemberXpCap() {
		return nonMemberXpCap;
	}

	public int getLevelCap() {
		return levelCap;
	}

	public boolean isMembers() {
		return members;
	}

	public int getNonMemberLevelCap() {
		return nonMemberLevelCap;
	}

	public ExperienceCurve getXpCurve() {
		return xpCurve;
	}

	public int getInitialLevel() {
		return initialLevel;
	}
}
