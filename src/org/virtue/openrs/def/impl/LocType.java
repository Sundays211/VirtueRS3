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
package org.virtue.openrs.def.impl;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.openrs.utility.ByteBufferUtils;
import org.virtue.utility.text.StringUtility;

/**
 * @author Sundays211
 * @since 29/10/2014
 */
public class LocType {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(LocType.class);

    public static short[] aShortArray7351 = new short[256];
    static final int MAX_OP_COUNT = 6;
    static final int anInt7353 = 127007;
	
    /**
     * Retrieves the specified location type definition from the cache
     * @param id The location type ID
     * @param buffer The buffer containing the data
     * @return The LocType definition
     */
	public static LocType load (int id, ByteBuffer buffer) {
		LocType locType = new LocType(id);
		try {
			for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
				locType.decode(buffer, opcode);
			}
		} catch (RuntimeException ex) {
			logger.error("Failed to load locationType "+id, ex);
		}
		return locType;
	}
	
    byte aByte7346;
    public byte[] nodeTypes;
    int[][] meshes;
    short[] recol_s;
    short[] recol_d;
    short[] retex_s;
    short[] retex_d;
    byte[] recol_d_palette;
    byte[] aByteArray7358;
    byte[] aByteArray7359;
    byte aByte7362;
    int[] cursorOps;
    byte aByte7401;
    public int[] anIntArray7411;
    public int[] anIntArray7418;
    Map<Integer, Object> params;
    //public Class379 aClass379_7424;

    public String name = "null";
    public String desc = null;
    byte aByte7375 = (byte) 0;
    public int sizeX = 1;
    public int sizeY = 1;
    public int clipType = 2;
    public int interactable = -1;
    byte aByte7368 = (byte) 0;
    int anInt7369 = -1;
    public boolean aBool7370 = false;
    public int anInt7391 = -1;
    public int anInt7365 = 960;
    public int anInt7373 = 0;
    int[] anIntArray7400 = null;
	int[] anIntArray7345 = null;
    public boolean aBool7422 = false;
    public int anInt7377 = 64;
    int anInt7378 = 0;
    int anInt7379 = 0;
    public int mapIcon = -1;
    public int mapSpriteType = -1;
    public boolean aBool7384 = false;
    public int mapSpriteRotation = 0;
    public boolean flipMapSprite = false;
    public boolean aBool7423 = false;
    public boolean aBool7380 = true;
    int anInt7389 = 128;
    int anInt7390 = 128;
    int anInt7367 = 128;
    int anInt7382 = 0;
    int anInt7392 = 0;
    int anInt7394 = 0;
    int anInt7395 = 0;
    int anInt7356 = 0;
    int anInt7397 = 0;
    public boolean aBool7398 = false;
    public boolean allowInteract = false;//aBool7399
    public int anInt7360 = -1;
    public int anInt7425 = 0;
    public int transVarBit = -1;
    public int transVar = -1;
    public int[] transforms;
    public int anInt7405 = -1;
    public int anInt7406 = 0;
    public int anInt7374 = 0;
    public int anInt7408 = -412477991;
    public int anInt7409 = 0;
    public int anInt7410 = 0;
    public boolean aBool7412 = true;
    public boolean hidden = false;
    public boolean aBool7414 = true;
    public boolean members = false;
    public boolean aBool7371 = false;
    public int anInt7363 = 413562112;
    public int anInt7420 = -412471040;
    public boolean aBool7421 = false;
    public boolean aBool7393 = false;
    //public Class535 aClass535_7347 = Class535.aClass535_7304;
    public int myid;
    //Class537 myList;
    //Interface8 anInterface8_7349;
    public String[] op;

	public int walkingFlag;
    
    LocType(int id) {
		myid = id;
		//myList = class537;
		//anInterface8_7349 = interface8;
		op = new String[] { null, null, null, null, null, "Examine" };
    }
    
    void decode(ByteBuffer buffer, int opcode) {
		if (1 == opcode) {
		    int typeCount = buffer.get() & 0xff;
		    nodeTypes = new byte[typeCount];
		    meshes = new int[typeCount][];
		    for (int typePos = 0; typePos < typeCount; typePos++) {
		    	nodeTypes[typePos] = buffer.get();
				int meshCount = buffer.get() & 0xff;
				meshes[typePos] = new int[meshCount];
				for (int meshPos = 0; meshPos < meshCount; meshPos++) {
					meshes[typePos][meshPos] = ByteBufferUtils.getSmartInt(buffer);
				}
		    }
		} else if (opcode == 2) {
		    name = ByteBufferUtils.getString(buffer).intern();
		} else if (opcode == 3) {
			desc = ByteBufferUtils.getString(buffer).intern();
		} else if (opcode == 14) {
		    sizeX = buffer.get() & 0xff;
		} else if (opcode == 15) {
		    sizeY = buffer.get() & 0xff;
		} else if (17 == opcode) {
		    clipType = 0;
		} else if (18 != opcode) {
		    if (19 == opcode) {
		    	interactable = buffer.get() & 0xff;
		    } else if (21 == opcode) {
		    	aByte7368 = (byte) 1;
		    } else if (22 == opcode) {
		    	aBool7370 = true;
		    } else if (opcode == 23) {
		    	anInt7391 = 1001522659;
		    } else if (opcode == 24) {
				int i_16_ = ByteBufferUtils.getSmartInt(buffer);
				if (i_16_ != -1)
				    anIntArray7400 = new int[] { i_16_ };
		    } else if (27 == opcode) {
		    	clipType = 1;
		    } else if (28 == opcode) {
		    	anInt7377 = (buffer.get() << 2);
		    } else if (opcode == 29) {
		    	anInt7378 = buffer.get();
		    } else if (39 == opcode) {
		    	anInt7379 = buffer.get();
		    } else if (opcode >= 30 && opcode < 35) {
		    	op[opcode - 30] = ByteBufferUtils.getString(buffer).intern();
		    } else if (opcode == 40) {
				int count = buffer.get() & 0xff;
				recol_s = new short[count];
				recol_d = new short[count];
				for (int index = 0; index < count; index++) {
				    recol_s[index] = (short) (buffer.getShort() & 0xffff);
				    recol_d[index] = (short) (buffer.getShort() & 0xffff);
				}
		    } else if (opcode == 41) {
				int count = buffer.get() & 0xff;
				retex_s = new short[count];
				retex_d = new short[count];
				for (int index = 0; index < count; index++) {
				    retex_s[index] = (short) (buffer.getShort() & 0xffff);
				    retex_d[index] = (short) (buffer.getShort() & 0xffff);
				}
		    } else if (opcode == 42) {
				int count = buffer.get() & 0xff;
				recol_d_palette = new byte[count];
				for (int index = 0; index < count; index++) {
				    recol_d_palette[index] = buffer.get();
				}
		    } else if (opcode == 44) {
				int i_23_ = buffer.getShort() & 0xffff;
				int i_24_ = 0;
				for (int i_25_ = i_23_; i_25_ > 0; i_25_ >>= 1) {
				    i_24_++;
				}
				aByteArray7358 = new byte[i_24_];
				byte i_26_ = 0;
				for (int i_27_ = 0; i_27_ < i_24_; i_27_++) {
				    if ((i_23_ & 1 << i_27_) > 0) {
						aByteArray7358[i_27_] = i_26_;
						i_26_++;
				    } else {
				    	aByteArray7358[i_27_] = (byte) -1;
				    }
				}
		    } else if (45 == opcode) {
				int i_28_ = buffer.getShort() & 0xffff;
				int i_29_ = 0;
				for (int i_30_ = i_28_; i_30_ > 0; i_30_ >>= 1)
				    i_29_++;
				aByteArray7359 = new byte[i_29_];
				byte i_31_ = 0;
				for (int i_32_ = 0; i_32_ < i_29_; i_32_++) {
				    if ((i_28_ & 1 << i_32_) > 0) {
					aByteArray7359[i_32_] = i_31_;
					i_31_++;
				    } else
					aByteArray7359[i_32_] = (byte) -1;
				}
		    } else if (62 == opcode) {
		    	aBool7423 = true;
		    } else if (64 == opcode) {
		    	aBool7380 = false;
		    } else if (opcode == 65) {
		    	anInt7389 = buffer.getShort() & 0xffff;
		    } else if (66 == opcode) {
		    	anInt7390 = buffer.getShort() & 0xffff;
		    } else if (opcode == 67) {
		    	anInt7367 = buffer.getShort() & 0xffff;
		    } else if (opcode == 69) {
		    	walkingFlag = buffer.get() & 0xff;
		    } else if (opcode == 70) {
		    	anInt7382 = (buffer.getShort() << 2);
		    } else if (71 == opcode) {
		    	anInt7392 = (buffer.getShort() << 2);
		    } else if (opcode == 72) {
		    	anInt7394 = (buffer.getShort() << 2);
		    } else if (73 == opcode) {
		    	aBool7398 = true;
		    } else if (opcode == 74) {
		    	allowInteract = true;
		    } else if (opcode == 75) {
		    	anInt7360 = buffer.get() & 0xff;
		    } else if (77 == opcode || 92 == opcode) {
		    	transVarBit = buffer.getShort() & 0xffff;
				if (transVarBit == 65535) {
				    transVarBit = -1;
				}
				transVar = buffer.getShort() & 0xffff;
				if (65535 == transVar) {
				    transVar = -1;
				}
				int i_33_ = -1;
				if (opcode == 92) {
				    i_33_ = ByteBufferUtils.getSmartInt(buffer);
				}
				int count = buffer.get() & 0xff;
				transforms = new int[count + 2];
				for (int i_35_ = 0; i_35_ <= count; i_35_++) {
				    transforms[i_35_] = ByteBufferUtils.getSmartInt(buffer);
				}
				transforms[count + 1] = i_33_;
		    } else if (78 == opcode) {
				anInt7405 = buffer.getShort() & 0xffff;
				anInt7406 = buffer.get() & 0xff;
		    } else if (opcode == 79) {
				anInt7409 = buffer.getShort() & 0xffff;
				anInt7410 = buffer.getShort() & 0xffff;
				anInt7406 = buffer.get() & 0xff;
				int i_36_ = buffer.get() & 0xff;
				anIntArray7411 = new int[i_36_];
				for (int i_37_ = 0; i_37_ < i_36_; i_37_++) {
				    anIntArray7411[i_37_] = buffer.getShort() & 0xffff;
				}
		    } else if (81 == opcode) {
				aByte7368 = (byte) 2;
				anInt7369 = buffer.get() & 0xff;
		    } else if (opcode == 82) {
		    	hidden = true;
		    } else if (88 == opcode) {
		    	aBool7414 = false;
		    } else if (89 == opcode) {
		    	aBool7412 = false;
		    } else if (opcode == 91) {
		    	members = true;
		    } else if (93 == opcode) {
				aByte7368 = (byte) 3;
				anInt7369 = buffer.getShort() & 0xffff;
		    } else if (opcode == 94) {
		    	aByte7368 = (byte) 4;
		    } else if (95 == opcode) {
				aByte7368 = (byte) 5;
				anInt7369 = buffer.getShort();
		    } else if (97 == opcode) {
		    	aBool7384 = true;
		    } else if (opcode == 98) {
		    	aBool7371 = true;
		    } else if (opcode == 99 || 100 == opcode) {
				buffer.get();// & 0xff
				buffer.getShort();// & 0xffff
		    } else if (opcode == 101) {
		    	mapSpriteRotation = buffer.get() & 0xff;
		    } else if (102 == opcode) {
		    	mapSpriteType = buffer.getShort() & 0xffff;
		    } else if (opcode == 103) {
		    	anInt7391 = 0;
		    } else if (opcode == 104) {
		    	anInt7408 = buffer.get() & 0xff;
		    } else if (opcode == 105) {
		    	flipMapSprite = true;
		    } else if (106 == opcode) {
				int i_38_ = buffer.get() & 0xff;
				int i_39_ = 0;
				anIntArray7400 = new int[i_38_];
				anIntArray7345 = new int[i_38_];
				for (int i_40_ = 0; i_40_ < i_38_; i_40_++) {
				    anIntArray7400[i_40_] = ByteBufferUtils.getSmartInt(buffer);
				    i_39_ += anIntArray7345[i_40_] = buffer.get() & 0xff;
				}
				for (int i_41_ = 0; i_41_ < i_38_; i_41_++) {
				    anIntArray7345[i_41_] = (65535 * anIntArray7345[i_41_] / i_39_);
				}
		    } else if (107 == opcode) {
		    	mapIcon = buffer.getShort() & 0xffff;
		    } else if (opcode >= 150 && opcode < 155) {
				op[opcode - 150] = ByteBufferUtils.getString(buffer).intern();
				/*if (!((Class537) myList).allowMembers) {
				    op[opcode - 150] = null;
				}*/
		    } else if (160 == opcode) {
				int i_42_ = buffer.get() & 0xff;
				anIntArray7418 = new int[i_42_];
				for (int i_43_ = 0; i_43_ < i_42_; i_43_++) {
				    anIntArray7418[i_43_] = buffer.getShort() & 0xffff;
				}
		    } else if (162 == opcode) {
				aByte7368 = (byte) 3;
				anInt7369 = buffer.getInt();
		    } else if (opcode == 163) {
				aByte7401 = buffer.get();
				aByte7346 = buffer.get();
				aByte7362 = buffer.get();
				aByte7375 = buffer.get();
		    } else if (164 == opcode) {
		    	anInt7395 = buffer.getShort();
		    } else if (165 == opcode) {
		    	anInt7356 = buffer.getShort();
		    } else if (opcode == 166) {
		    	anInt7397 = buffer.getShort();
		    } else if (167 == opcode) {
		    	anInt7425 = buffer.getShort() & 0xffff;
		    } else if (168 != opcode && 169 != opcode) {
				if (170 == opcode) {
				    anInt7365 = ByteBufferUtils.getSmallSmartInt(buffer);
				} else if (171 == opcode) {
				    anInt7373 = ByteBufferUtils.getSmallSmartInt(buffer);
				} else if (173 == opcode) {
				    anInt7363 = buffer.getShort() & 0xffff;
				    anInt7420 = buffer.getShort() & 0xffff;
				} else if (opcode == 177) {
				    aBool7421 = true;
				} else if (178 == opcode) {
				    anInt7374 = buffer.get() & 0xff;
				} else if (opcode == 186) {
					buffer.get();//aClass535_7347 = Class535.forId(buffer.get() & 0xff);
				} else if (189 == opcode) {
				    aBool7393 = true;
				} else if (opcode >= 190 && opcode < 196) {
				    if (cursorOps == null) {
						cursorOps = new int[6];
						Arrays.fill(cursorOps, -1);
				    }
				    cursorOps[opcode - 190] = buffer.getShort() & 0xffff;
				} else if (196 == opcode) {
				    //Class408.method6716(Class541.method16390(-1604838913),
					//		buffer.readUnsignedByte(), -2141711906);
					buffer.get();// & 0xff
				} else if (197 == opcode) {
				    //Class408.method6716(Class547.method802(1878044460),
					//		buffer.readUnsignedByte(), -2147133224);
					buffer.get();// & 0xff
				} else if (opcode != 198 && opcode != 199) {
				    if (200 == opcode) {
				    	aBool7422 = true;
				    } else if (201 == opcode) {
						//aClass379_7424 = new Class379();
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    	ByteBufferUtils.getSmallSmartInt(buffer);
				    } else if (249 == opcode) {
						int count = buffer.get() & 0xff;
						if (params == null) {
						    params = new HashMap<Integer, Object>(count);
						}
						for (int i_46_ = 0; i_46_ < count; i_46_++) {
						    boolean bool = (buffer.get() & 0xff) == 1;
						    int key = ByteBufferUtils.getTriByte(buffer);
						    Object value;
						    if (bool) {
						    	value = ByteBufferUtils.getString(buffer).intern();
						    } else {
						    	value = new Integer(buffer.getInt());
						    }
						    params.put(key, value);
						}
				    }
				}
		    }
		}
    }
    
    public boolean hasMesh (int mesh) {
    	if (meshes == null) {
    		return false;
    	}
    	for (int i=0; i<meshes[0].length;i++) {
    		if (meshes[0][i] == mesh) {
    			return true;
    		}
    	}
    	return false;
    }
    
    public String getDescription () {
    	if (desc != null) {
    		return desc;
    	}
    	return "It's "+(StringUtility.startsWithVowel(name) ? "an" : "a")+" "+name;
    }

}
