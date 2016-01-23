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
package org.virtue.config.defaults;

/**
 * 
 * @author Sundays211
 * @since 23/01/2016
 */
public class ExperienceCurve {
	public static final ExperienceCurve DEFAULT = new ExperienceCurve();
	
	private int[] lookup;

	private ExperienceCurve() {
		lookup = new int[120];
		int xp = 0;
		for (int level = 1; level <= 120; level++) {
			int difference = (int) ((double) level + 300.0 * Math.pow(2.0, (double) level / 7.0));
			xp += difference;
			lookup[level-1] = xp / 4;
		}
		validate();
	}

	ExperienceCurve(int[] lookup) {
		if (null == lookup) {
			throw new NullPointerException();
		}
		this.lookup = lookup;
		validate();
	}

	private final void validate() {
		for (int pos = 1; pos < lookup.length; pos++) {
			if (lookup[pos - 1] < 0) {
				throw new IllegalArgumentException("Negative XP at pos:"+(pos - 1));
			}
			if (lookup[pos] < lookup[pos - 1]) {
				throw new IllegalArgumentException("XP goes backwards at pos:"+pos);
			}
		}
	}

	public int levelForXp(int xp) {
		int level = 0;
		for (int pos = 0; (pos < lookup.length && xp >= lookup[pos]); pos++) {
			level = 1 + pos;
		}
		return level;
	}

	public int xpForLevel(int level) {
		if (level < 1) {
			return 0;
		}
		if (level > lookup.length) {
			level = lookup.length;
		}
		return lookup[level - 1];
	}
}
