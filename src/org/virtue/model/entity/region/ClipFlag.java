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
package org.virtue.model.entity.region;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class ClipFlag {
	public static final int FLOOR_BLOCKSWALK = 0x200000;
	public static final int FLOORDECO_BLOCKSWALK = 0x40000;

	public static final int LOC = 0x100;
	public static final int LOC_BLOCKSFLY = 0x20000;
	public static final int LOC_BLOCKSWALK_ALTERNATIVE = 0x40000000;

	public static final int WALL_NORTH = 0x2;
	public static final int WALL_EAST = 0x8;
	public static final int WALL_SOUTH = 0x20;
	public static final int WALL_WEST = 0x80;

	public static final int CORNEROBJ_NORTHWEST = 0x1;
	public static final int CORNEROBJ_NORTHEAST = 0x4;
	public static final int CORNEROBJ_SOUTHEAST = 0x10;
	public static final int CORNEROBJ_SOUTHWEST = 0x40;

	public static final int WALL_NORTH_BLOCKSFLY = 0x400;
	public static final int WALL_EAST_BLOCKSFLY = 0x1000;
	public static final int WALL_SOUTH_BLOCKSFLY = 0x4000;
	public static final int WALL_WEST_BLOCKSFLY = 0x10000;

	public static final int CORNEROBJ_NORTHWEST_BLOCKSFLY = 0x200;
	public static final int CORNEROBJ_NORTHEAST_BLOCKSFLY = 0x800;
	public static final int CORNEROBJ_SOUTHEAST_BLOCKSFLY = 0x2000;
	public static final int CORNEROBJ_SOUTHWEST_BLOCKSFLY = 0x8000;

	public static final int WALL_NORTH_BLOCKSWALK_ALTERNATIVE = 0x800000;
	public static final int WALL_EAST_BLOCKSWALK_ALTERNATIVE = 0x2000000;
	public static final int WALL_SOUTH_BLOCKSWALK_ALTERNATIVE = 0x8000000;
	public static final int WALL_WEST_BLOCKSWALK_ALTERNATIVE = 0x20000000;

	public static final int CORNEROBJ_NORTHWEST_BLOCKSWALK_ALTERNATIVE = 0x400000;
	public static final int CORNEROBJ_NORTHEAST_BLOCKSWALK_ALTERNATIVE = 0x1000000;
	public static final int CORNEROBJ_SOUTHEAST_BLOCKSWALK_ALTERNATIVE = 0x4000000;
	public static final int CORNEROBJ_SOUTHWEST_BLOCKSWALK_ALTERNATIVE = 0x10000000;
}
