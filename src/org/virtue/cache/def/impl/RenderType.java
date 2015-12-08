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
package org.virtue.cache.def.impl;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/02/2015
 */
public class RenderType {
	
	/**
	 * Decodes a RenderType definition from the cache
	 * @param buffer The buffer containing the data
	 * @param id The RenderType ID
	 * @return the RenderType definition
	 */
	public static RenderType decode (ByteBuffer buffer, int id) {
		RenderType render = new RenderType();
		render.myid = id;
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			if (opcode == 1) {
				render.standAnimation = ByteBufferUtils.getSmartInt(buffer);
				render.walkAnimation = ByteBufferUtils.getSmartInt(buffer);
			} else if (2 == opcode) {
				render.moveType1Anim = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 3) {
				render.type1_180 = ByteBufferUtils.getSmartInt(buffer);
			} else if (4 == opcode) {
				render.type1_90 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 5) {
				render.type1_90_counter = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 6) {
				render.runAnimation = ByteBufferUtils.getSmartInt(buffer);
			} else if (7 == opcode) {
				render.runRotate180Animation = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 8) {
				render.runRotate90Animation = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 9) {
				render.runRotate90CounterAnimation = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 26) {
				render.unknown_26_1 = ((short) ((buffer.get() & 0xff) * 4));
				render.unknown_26_2 = ((short) ((buffer.get() & 0xff) * 4));
			} else if (opcode == 27) {
			    if (render.unknown_27_array_array == null)
			    	render.unknown_27_array_array = new int[200][];
			    int i_21_ = buffer.get() & 0xff;
			    render.unknown_27_array_array[i_21_] = new int[6];
			    for (int i_22_ = 0; i_22_ < 6; i_22_++) {
			    	render.unknown_27_array_array[i_21_][i_22_] = buffer.getShort();
			    }
			} else if (opcode == 28) {
			    int i_23_ = buffer.get() & 0xff;
			    render.unknown_28_array = new int[i_23_];
			    for (int i_24_ = 0; i_24_ < i_23_; i_24_++) {
			    	render.unknown_28_array[i_24_] = buffer.get() & 0xff;
					if (render.unknown_28_array[i_24_] == 255) {
						render.unknown_28_array[i_24_] = -1;
					}
			    }
			} else if (opcode == 29) {
				render.unknown_29 = buffer.get() & 0xff;
			} else if (30 == opcode) {
				render.unknown_30 = buffer.getShort() & 0xffff;
			} else if (opcode == 31) {
				render.unknown_31 = buffer.get() & 0xff;
			} else if (opcode == 32) {
				render.unknown_32 = buffer.getShort() & 0xffff;
			} else if (opcode == 33) {
				render.unknown_33 = buffer.getShort();
			} else if (opcode == 34) {
				render.unknown_34 = buffer.get() & 0xff;
			} else if (35 == opcode) {
				render.unknown_35 = buffer.getShort() & 0xffff;
			} else if (opcode == 36) {
				render.unknown_36 = buffer.getShort();
			} else if (opcode == 37) {
				render.unknown_37 = buffer.get() & 0xff;
			} else if (opcode == 38) {
				render.unknown_38 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 39) {
				render.unknown_39 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 40) {
				render.rotate180Animation = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 41) {
				render.rotate90Animation = ByteBufferUtils.getSmartInt(buffer);
			} else if (42 == opcode) {
				render.rotate90CounterAnimation = ByteBufferUtils.getSmartInt(buffer);
			} else if (43 == opcode) {
				buffer.getShort();// & 0xffff;
			} else if (44 == opcode) {
				buffer.getShort();// & 0xffff;
			} else if (opcode == 45) {
				render.unknown_45 = buffer.getShort() & 0xffff;
			} else if (opcode == 46) {
				render.unknown_46 = ByteBufferUtils.getSmartInt(buffer);
			} else if (47 == opcode) {
				render.unknown_47 = ByteBufferUtils.getSmartInt(buffer);
			} else if (48 == opcode) {
				render.unknown_48 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 49) {
				render.unknown_49 = ByteBufferUtils.getSmartInt(buffer);
			} else if (50 == opcode) {
				render.unknown_50 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 51) {
				render.unknown_51 = ByteBufferUtils.getSmartInt(buffer);
			} else if (opcode == 52) {
			    int i_25_ = buffer.get() & 0xff;
			    render.loopAnimations = new int[i_25_];
			    render.loopAnimDurations = new int[i_25_];
			    for (int i_26_ = 0; i_26_ < i_25_; i_26_++) {
			    	render.loopAnimations[i_26_] = ByteBufferUtils.getSmartInt(buffer);
					int i_27_ = buffer.get() & 0xff;
					render.loopAnimDurations[i_26_] = i_27_;
					render.totalLoopDuration += i_27_;
			    }
			} else if (opcode == 53) {
				render.unknown_53 = false;
			} else if (opcode == 54) {
				render.unknown_54_1 = ((buffer.get() & 0xff) << 6);
			    render.unknown_54_2 = ((buffer.get() & 0xff) << 6);
			} else if (55 == opcode) {
			    if (null == render.unknown_55_array) {
			    	render.unknown_55_array = new int[200];
			    }
			    int i_28_ = buffer.get() & 0xff;
			    render.unknown_55_array[i_28_] = buffer.getShort() & 0xffff;
			} else if (opcode == 56) {
			    if (null == render.unknown_56_array_array) {
			    	render.unknown_56_array_array = new int[200][];
			    }
			    int i_29_ = buffer.get() & 0xff;
			    render.unknown_56_array_array[i_29_] = new int[3];
			    for (int i_30_ = 0; i_30_ < 3; i_30_++) {
			    	render.unknown_56_array_array[i_29_][i_30_] = buffer.getShort();
			    }
			}
		}
		return render;
	}
	
	
	public int unknown_26_1;
	public int standAnimation = -1;
	public int[] loopAnimations = null;
	public int[] loopAnimDurations = null;
	int totalLoopDuration = 0;
	public int unknown_38 = -1;
	public int unknown_39 = -1;
	public int walkAnimation = -1;
	public int rotate180Animation = -1;
	public int rotate90Animation = -1;
	public int rotate90CounterAnimation = -1;
	public int runAnimation = -1;
	public int[] unknown_28_array;
	public int unknown_33;
	public int runRotate90CounterAnimation;
	public int moveType1Anim;
	public int type1_180;
	public int type1_90;
	public int type1_90_counter;
	public int unknown_46;
	public int unknown_47;
	public int unknown_54_1;
	public int unknown_36;
	public int unknown_50;
	public int unknown_48;
	public int unknown_51;
	public int unknown_26_2;
	public int unknown_54_2;
	public int[][] unknown_27_array_array;
	public int[][] unknown_56_array_array;
	public int unknown_49;
	public int[] unknown_55_array;
	public int runRotate180Animation = -1;
	public int unknown_29;
	public int unknown_30;
	public int unknown_31;
	public int unknown_32;
	int myid;
	public int unknown_34;
	public int unknown_35;
	public int unknown_45;
	public int unknown_37;
	public int runRotate90Animation = -1;
	public boolean unknown_53;
	
	public boolean hasWalkAnimation () {
		return walkAnimation != -1 && walkAnimation != standAnimation;
	}
	
	public boolean hasRunAnimation () {
		return runAnimation != -1;
	}

}
