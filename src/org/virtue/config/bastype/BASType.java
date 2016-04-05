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
package org.virtue.config.bastype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/02/2015
 */
public class BASType implements ConfigType {
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
	
	public BASType (int id, BASTypeList list) {
		this.myid = id;
	}
	
	public boolean hasWalkAnimation () {
		return walkAnimation != -1 && walkAnimation != standAnimation;
	}
	
	public boolean hasRunAnimation () {
		return runAnimation != -1;
	}

	/* (non-Javadoc)
	 * @see org.virtue.config.ConfigType#decode(java.nio.ByteBuffer)
	 */
	@Override
	public void decode(ByteBuffer buffer) {
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			decode(buffer, opcode);
		}
	}
	
	private void decode (ByteBuffer buffer, int code) {
		if (code == 1) {
			standAnimation = ByteBufferUtils.getSmartInt(buffer);
			walkAnimation = ByteBufferUtils.getSmartInt(buffer);
		} else if (2 == code) {
			moveType1Anim = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 3) {
			type1_180 = ByteBufferUtils.getSmartInt(buffer);
		} else if (4 == code) {
			type1_90 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 5) {
			type1_90_counter = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 6) {
			runAnimation = ByteBufferUtils.getSmartInt(buffer);
		} else if (7 == code) {
			runRotate180Animation = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 8) {
			runRotate90Animation = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 9) {
			runRotate90CounterAnimation = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 26) {
			unknown_26_1 = ((short) ((buffer.get() & 0xff) * 4));
			unknown_26_2 = ((short) ((buffer.get() & 0xff) * 4));
		} else if (code == 27) {
		    if (unknown_27_array_array == null) {
		    	unknown_27_array_array = new int[200][];
		    }
		    int i_21_ = buffer.get() & 0xff;
		    unknown_27_array_array[i_21_] = new int[6];
		    for (int i_22_ = 0; i_22_ < 6; i_22_++) {
		    	unknown_27_array_array[i_21_][i_22_] = buffer.getShort();
		    }
		} else if (code == 28) {
		    int i_23_ = buffer.get() & 0xff;
		    unknown_28_array = new int[i_23_];
		    for (int i_24_ = 0; i_24_ < i_23_; i_24_++) {
		    	unknown_28_array[i_24_] = buffer.get() & 0xff;
				if (unknown_28_array[i_24_] == 255) {
					unknown_28_array[i_24_] = -1;
				}
		    }
		} else if (code == 29) {
			unknown_29 = buffer.get() & 0xff;
		} else if (30 == code) {
			unknown_30 = buffer.getShort() & 0xffff;
		} else if (code == 31) {
			unknown_31 = buffer.get() & 0xff;
		} else if (code == 32) {
			unknown_32 = buffer.getShort() & 0xffff;
		} else if (code == 33) {
			unknown_33 = buffer.getShort();
		} else if (code == 34) {
			unknown_34 = buffer.get() & 0xff;
		} else if (35 == code) {
			unknown_35 = buffer.getShort() & 0xffff;
		} else if (code == 36) {
			unknown_36 = buffer.getShort();
		} else if (code == 37) {
			unknown_37 = buffer.get() & 0xff;
		} else if (code == 38) {
			unknown_38 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 39) {
			unknown_39 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 40) {
			rotate180Animation = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 41) {
			rotate90Animation = ByteBufferUtils.getSmartInt(buffer);
		} else if (42 == code) {
			rotate90CounterAnimation = ByteBufferUtils.getSmartInt(buffer);
		} else if (43 == code) {
			buffer.getShort();// & 0xffff;
		} else if (44 == code) {
			buffer.getShort();// & 0xffff;
		} else if (code == 45) {
			unknown_45 = buffer.getShort() & 0xffff;
		} else if (code == 46) {
			unknown_46 = ByteBufferUtils.getSmartInt(buffer);
		} else if (47 == code) {
			unknown_47 = ByteBufferUtils.getSmartInt(buffer);
		} else if (48 == code) {
			unknown_48 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 49) {
			unknown_49 = ByteBufferUtils.getSmartInt(buffer);
		} else if (50 == code) {
			unknown_50 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 51) {
			unknown_51 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 52) {
		    int i_25_ = buffer.get() & 0xff;
		    loopAnimations = new int[i_25_];
		    loopAnimDurations = new int[i_25_];
		    for (int i_26_ = 0; i_26_ < i_25_; i_26_++) {
		    	loopAnimations[i_26_] = ByteBufferUtils.getSmartInt(buffer);
				int i_27_ = buffer.get() & 0xff;
				loopAnimDurations[i_26_] = i_27_;
				totalLoopDuration += i_27_;
		    }
		} else if (code == 53) {
			unknown_53 = false;
		} else if (code == 54) {
			unknown_54_1 = ((buffer.get() & 0xff) << 6);
		    unknown_54_2 = ((buffer.get() & 0xff) << 6);
		} else if (55 == code) {
		    if (null == unknown_55_array) {
		    	unknown_55_array = new int[200];
		    }
		    int i_28_ = buffer.get() & 0xff;
		    unknown_55_array[i_28_] = buffer.getShort() & 0xffff;
		} else if (code == 56) {
		    if (null == unknown_56_array_array) {
		    	unknown_56_array_array = new int[200][];
		    }
		    int i_29_ = buffer.get() & 0xff;
		    unknown_56_array_array[i_29_] = new int[3];
		    for (int i_30_ = 0; i_30_ < 3; i_30_++) {
		    	unknown_56_array_array[i_29_][i_30_] = buffer.getShort();
		    }
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.config.ConfigType#postDecode()
	 */
	@Override
	public void postDecode() {
		// TODO Auto-generated method stub
		
	}

}
