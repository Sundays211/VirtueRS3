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
package org.virtue.config.npctype;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.core.constants.CompassPoint;
import org.virtue.core.constants.MoveSpeed;

/**
 * @author Sundays211
 * @since 13/11/2014
 */
public class NpcType implements ConfigType {

	public static final int anInt8430 = 8;
	static final int anInt8439 = 6;
	public static short[] aShortArray8448 = new short[256];
	public static final int anInt8480 = 1;
	public static final int anInt8481 = 2;	
	short[] retex_s;
	public int[] headMeshes;
	public int attackOpCursor;
	public int id;
	public String name = "null";
	public String desc = null;
	public int size = 1;
	int resize_y;
	public boolean aBool8437;
	public int[] models;
	short[] recol_s;
	public short[] recol_d;
	public int anInt8442;
	public int anInt8443;
	public byte shadowAlpha;
	public byte[] aByteArray8445;
	public byte[] aByteArray8446;
	byte aByte8447;
	byte aByte8449;
	byte aByte8450;
	public String[] op;
	int[] cursorOps;
	public short[] retex_d;
	public int anInt8454;
	public int anInt8455;
	int resize_x;
	public int anInt8457;
	public short shadowTexture;
	public boolean aBool8459;
	public boolean aBool8460;
	int anInt8461;
	int anInt8462;
	public int[] headIconSprites;
	public short[] headIconSubSprites;
	public int anInt8465;
	public int anInt8466;
	public CompassPoint respawnDirection;
	public MoveSpeed speed;
	public int multiNPCVarbit;
	public int anInt8469;
	public boolean visible;
	public int multiNPCVarp;
	public boolean aBool8472;
	public short aShort8473;
	public short aShort8474;
	byte aByte8475;
	public byte aByte8476;
	public byte aByte8477;
	int[][] modelTranslation;
	public int anInt8479;
	public byte moveFlags;
	public int anInt8483;
	public int anInt8484;
	public boolean map_visible;
	public int basTypeID = -1;
	public int anInt8487;
	public int anInt8488;
	Map<Integer, Object> params;
	public int level;
	public boolean aBool8492;
	public int[] quests;
	public byte aByte8494;
	public int anInt8495;
	//public Class219 aClass219_8496;
	public int anInt8497;
	public int[] multiNPCs;
	public int mapIcon;
	public boolean aBool8500;
	byte[] recol_d_palette;
	public boolean hidePlayer;//aBool8502

	//Unknown data (things that may be stored via a cache opcode, but not sure which one)
	public int anim_death = -1;
	public int anim_attack = -1;
	public int hitpoints = -1;
	public int attack_lvl;
	public int defence_lvl;
	public int ranged_lvl;
	public int magic_lvl;
	public int range;

	public Map<String, Object> extraParams;

	public NpcType (int id, NpcTypeList myList) {
		aByte8450 = (byte) 0;
		attackOpCursor = -1;
		map_visible = true;
		level = -1;
		resize_x = 128;
		resize_y = 128;
		aBool8437 = false;
		aBool8459 = false;
		aBool8460 = false;
		anInt8461 = 0;
		anInt8462 = 0;
		headIconSprites = null;
		headIconSubSprites = null;
		anInt8465 = -1;
		anInt8479 = 32;
		multiNPCVarbit = -1;
		multiNPCVarp = -1;
		visible = true;
		aBool8492 = true;
		aBool8472 = true;
		aShort8473 = (short) 0;
		aShort8474 = (short) 0;
		aByte8477 = (byte) -96;
		aByte8476 = (byte) -16;
		shadowTexture = (short) -1;
		shadowAlpha = (byte) 0;
		moveFlags = (byte) 0;
		anInt8466 = -1;
		anInt8483 = -1;
		anInt8484 = -1;
		anInt8455 = -1;
		anInt8457 = 0;
		anInt8487 = 0;
		anInt8488 = 2096998587;
		anInt8443 = -1;
		respawnDirection = CompassPoint.SOUTH;
		mapIcon = -1;
		aByte8494 = (byte) -1;
		anInt8495 = -1;
		anInt8497 = -1673303808;
		anInt8442 = 1585475840;
		anInt8454 = 0;
		aBool8500 = true;
		anInt8469 = 0;
		hidePlayer = false;
		this.id = id;
		//myList = class537;
		//anInterface8_7349 = interface8;
		op = new String[] { null, null, null, null, null, "Examine" };
	}

	public int getId() {
		return id;
	}

	@Override
	public void decode (ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}

	void decode(ByteBuffer buffer, int code) {
		if (1 == code) {
			int count = buffer.get() & 0xff;
			models = new int[count];
			for (int index = 0; index < count; index++) {
				models[index] = ByteBufferUtils.getSmartInt(buffer);
			}
		} else if (2 == code) {
			name = ByteBufferUtils.getString(buffer).intern();
		} else if (3 == code) {
			desc = ByteBufferUtils.getString(buffer);
		} else if (12 == code) {
			size = buffer.get() & 0xff;
		} else if (15 == code) {//Used by the custom data (actual opcode unknown)
			anim_death = buffer.getShort() & 0xffff;
		} else if (16 == code) {//Used by the custom data (actual opcode unknown)
			anim_attack = buffer.getShort() & 0xffff;
		} else if (code >= 30 && code < 35) {
			op[code - 30] = ByteBufferUtils.getString(buffer);
		} else if (code == 40) {
			int count = buffer.get() & 0xff;
			recol_s = new short[count];
			recol_d = new short[count];
			for (int slot = 0; slot < count; slot++) {
				recol_s[slot] = (short) (buffer.getShort() & 0xffff);
				recol_d[slot] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (code == 41) {
			int length = buffer.get() & 0xff;
			retex_s = new short[length];
			retex_d = new short[length];
			for (int slot = 0; slot < length; slot++) {
				retex_s[slot] = (short) (buffer.getShort() & 0xffff);
				retex_d[slot] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (code == 42) {
			int length = buffer.get() & 0xff;
			recol_d_palette = new byte[length];
			for (int slot = 0; slot < length; slot++) {
				recol_d_palette[slot] = buffer.get();
			}
		} else if (44 == code) {
			int i_13_ = buffer.getShort() & 0xffff;
			int i_14_ = 0;
			for (int i_15_ = i_13_; i_15_ > 0; i_15_ >>= 1) {
				i_14_++;
			}
			aByteArray8445 = new byte[i_14_];
			byte i_16_ = 0;
			for (int i_17_ = 0; i_17_ < i_14_; i_17_++) {
				if ((i_13_ & 1 << i_17_) > 0) {
					aByteArray8445[i_17_] = i_16_;
					i_16_++;
				} else {
					aByteArray8445[i_17_] = (byte) -1;
				}
			}
		} else if (code == 45) {
			int i_18_ = buffer.getShort() & 0xffff;
			int i_19_ = 0;
			for (int i_20_ = i_18_; i_20_ > 0; i_20_ >>= 1) {
				i_19_++;
			}
			aByteArray8446 = new byte[i_19_];
			byte i_21_ = 0;
			for (int i_22_ = 0; i_22_ < i_19_; i_22_++) {
				if ((i_18_ & 1 << i_22_) > 0) {
					aByteArray8446[i_22_] = i_21_;
					i_21_++;
				} else {
					aByteArray8446[i_22_] = (byte) -1;
				}
			}
		} else if (code == 60) {
			int i_23_ = buffer.get() & 0xff;
			headMeshes = new int[i_23_];
			for (int i_24_ = 0; i_24_ < i_23_; i_24_++) {
				headMeshes[i_24_] = ByteBufferUtils.getSmartInt(buffer);
			}
		} else if (code == 80) {//Used by the custom data (actual opcode unknown)
			hitpoints = buffer.getInt();
		} else if (code == 81) {//Used by the custom data (actual opcode unknown)
			attack_lvl = buffer.get() & 0xff;
		} else if (code == 82) {//Used by the custom data (actual opcode unknown)
			defence_lvl = buffer.get() & 0xff;
		} else if (code == 83) {//Used by the custom data (actual opcode unknown)
			ranged_lvl = buffer.get() & 0xff;
		} else if (code == 84) {//Used by the custom data (actual opcode unknown)
			magic_lvl = buffer.get() & 0xff;
		} else if (code == 93) {
			map_visible = false;
		} else if (code == 95) {
			level = buffer.getShort() & 0xffff;
		} else if (97 == code) {
			resize_x = buffer.getShort() & 0xffff;
		} else if (code == 98) {
			resize_y = buffer.getShort() & 0xffff;
		} else if (99 == code) {
			aBool8437 = true;
		} else if (code == 100) {
			anInt8461 = buffer.get();
		} else if (code == 101) {
			anInt8462 = buffer.get();
		} else if (code == 102) {
			int i_25_ = buffer.get() & 0xff;
			int i_26_ = 0;
			for (int i_27_ = i_25_; i_27_ != 0; i_27_ >>= 1) {
				i_26_++;
			}
			headIconSprites = new int[i_26_];
			headIconSubSprites = new short[i_26_];
			for (int i_28_ = 0; i_28_ < i_26_; i_28_++) {
				if ((i_25_ & 1 << i_28_) == 0) {
					headIconSprites[i_28_] = -1;
					headIconSubSprites[i_28_] = (short) -1;
				} else {
					headIconSprites[i_28_] = ByteBufferUtils.getSmartInt(buffer);
					headIconSubSprites[i_28_] = (short) ByteBufferUtils.getSmallSmartInt(buffer);
				}
			}
		} else if (103 == code) {
			anInt8479 = buffer.getShort() & 0xffff;
		} else if (106 == code || code == 118) {
			multiNPCVarbit = buffer.getShort() & 0xffff;
			if (65535 == multiNPCVarbit) {
				multiNPCVarbit = -1;
			}
			multiNPCVarp = buffer.getShort() & 0xffff;
			if (65535 == multiNPCVarp) {
				multiNPCVarp = -1;
			}
			int defaultType = -1;
			if (code == 118) {
				defaultType = buffer.getShort() & 0xffff;
				if (65535 == defaultType) {
					defaultType = -1;
				}
			}
			int tCount = buffer.get() & 0xff;
			multiNPCs = new int[2 + tCount];
			for (int index = 0; index <= tCount; index++) {
				multiNPCs[index] = buffer.getShort() & 0xffff;
				if (multiNPCs[index] == 65535) {
					multiNPCs[index] = -1;
				}
			}
			multiNPCs[tCount + 1] = defaultType;
		} else if (code == 107) {
			visible = false;
		} else if (code == 109) {
			aBool8492 = false;
		} else if (111 == code) {
			aBool8472 = false;
		} else if (code == 113) {
			aShort8473 = (short) (buffer.getShort() & 0xffff);
			aShort8474 = (short) (buffer.getShort() & 0xffff);
		} else if (114 == code) {
			aByte8477 = buffer.get();
			aByte8476 = buffer.get();
		} else if (code == 119) {
			moveFlags = buffer.get();
		} else if (code == 121) {
			modelTranslation = new int[models.length][];
			int i_32_ = buffer.get() & 0xff;
			for (int i_33_ = 0; i_33_ < i_32_; i_33_++) {
				int i_34_ = buffer.get() & 0xff;
				int[] is = (modelTranslation[i_34_] = new int[3]);
				is[0] = buffer.get();
				is[1] = buffer.get();
				is[2] = buffer.get();
			}
		} else if (code == 123) {
			anInt8443 = buffer.getShort() & 0xffff;
		} else if (125 == code) {
			respawnDirection = CompassPoint.getById(buffer.get());
		} else if (127 == code) {
			basTypeID = buffer.getShort() & 0xffff;
		} else if (code == 128) {
			speed = MoveSpeed.getById(buffer.get() & 0xff);
		} else if (code == 134) {
			anInt8466 = buffer.getShort() & 0xffff;
			if (65535 == anInt8466) {
				anInt8466 = -796096443;
			}
			anInt8483 = buffer.getShort() & 0xffff;
			if (anInt8483 == 65535) {
				anInt8483 = 413101365;
			}
			anInt8484 = buffer.getShort() & 0xffff;
			if (anInt8484 == 65535) {
				anInt8484 = 1769508037;
			}
			anInt8455 = buffer.getShort() & 0xffff;
			if (65535 == anInt8455) {
				anInt8455 = 142728049;
			}
			anInt8457 = buffer.get() & 0xff;
		} else if (135 == code || code == 136) {
			buffer.get();// & 0xff
			buffer.getShort();// & 0xffff
		} else if (code == 137) {
			attackOpCursor = buffer.getShort() & 0xffff;
		} else if (138 == code) {
			anInt8465 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 140) {
			anInt8488 = buffer.get() & 0xff;
		} else if (141 == code) {
			aBool8460 = true;
		} else if (142 == code) {
			mapIcon = buffer.getShort() & 0xffff;
		} else if (143 == code) {
			aBool8459 = true;
		} else if (code >= 150 && code < 155) {
			op[code - 150] = ByteBufferUtils.getString(buffer);
			/*if (!myList.allowMembers) {
				op[opcode - 150] = null;
			}*/
		} else if (155 == code) {
			aByte8447 = buffer.get();
			aByte8475 = buffer.get();
			aByte8449 = buffer.get();
			aByte8450 = buffer.get();
		} else if (158 == code) {
			aByte8494 = (byte) 1;
		} else if (code == 159) {
			aByte8494 = (byte) 0;
		} else if (160 == code) {
			int len = buffer.get() & 0xff;
			quests = new int[len];
			for (int pos = 0; pos < len; pos++) {
				quests[pos] = buffer.getShort() & 0xffff;
			}
		} else if (code != 162) {
			if (code == 163) {
				anInt8495 = buffer.get() & 0xff;
			} else if (code == 164) {
				anInt8497 = buffer.getShort() & 0xffff;
				anInt8442 = buffer.getShort() & 0xffff;
			} else if (165 == code) {
				anInt8454 = buffer.get() & 0xff;
			} else if (168 == code) {
				anInt8487 = buffer.get() & 0xff;
			} else if (code == 169) {
				aBool8500 = false;
			} else if (code >= 170 && code < 176) {
				if (cursorOps == null) {
					cursorOps = new int[6];
					Arrays.fill(cursorOps, -1);
				}
				int cursor = buffer.getShort() & 0xffff;
				if (65535 == cursor) {
					cursor = -1;
				}
				cursorOps[code - 170] = cursor;
			} else if (code != 178) {
				if (code == 179) {
					//aClass219_8496 = new Class219();
					ByteBufferUtils.getSmallSmartInt(buffer);
					ByteBufferUtils.getSmallSmartInt(buffer);
					ByteBufferUtils.getSmallSmartInt(buffer);
					ByteBufferUtils.getSmallSmartInt(buffer);
					ByteBufferUtils.getSmallSmartInt(buffer);
					ByteBufferUtils.getSmallSmartInt(buffer);
				} else if (180 == code) {
					anInt8469 = ((buffer.get() & 0xff));
				} else if (code == 181) {
					shadowTexture = (short) (buffer.getShort() & 0xffff);
					shadowAlpha = (byte) (buffer.get()  & 0xff);
				} else if (code == 182) {
					hidePlayer = true;
				} else if (249 == code) {
					int count = buffer.get() & 0xff;
					if (null == params) {
						params = new HashMap<Integer, Object>(count);
					}
					for (int index = 0; index < count; index++) {
						boolean stringVal = (buffer.get() & 0xff) == 1;
						int key = ByteBufferUtils.getTriByte(buffer);
						Object value;
						if (stringVal) {
							value = ByteBufferUtils.getString(buffer);
						} else {
							value = new Integer(buffer.getInt());
						}
						params.put(key, value);
					}
				} else {
					throw new RuntimeException("Unsupported config code: "+code);
				}
			}
		}
	}

	@Override
	public void postDecode() {
		// TODO Auto-generated method stub
		
	}

	public int getDefence() {
		return (getParam(2865, -1)/10);
	}

	public int getDamage() {
		return (getParam(641, -1)/10);
	}

	public int getRangeDamage() {
		return (getParam(643, -1)/10);
	}

	public int getMagicDamage() {
		return (getParam(965, -1)/10);
	}

	public int getMeleeAccuracy() {
		return (getParam(29, -1)/10);
	}

	public int getRangeAccuracy() {
		return (getParam(4, -1)/10);
	}
	
	public int getMagicAccuracy() {
		return (getParam(3, -1)/10);
	}

	public int getParam(int key, int defaultInt) {
		if (null == params) {
			return defaultInt;
		}
		Integer param = ((Integer) params.get(key));
		if (param == null) {
			return defaultInt;
		}
		return param.intValue();
	}

	public String getParam(int key, String defaultStr) {
		if (params == null) {
			return defaultStr;
		}
		String param = ((String) params.get(key));
		if (null == param) {
			return defaultStr;
		}
		return param;
	}

	/**
	 * Checks if this NPC type has the action.
	 * @param action The action.
	 * @return {@code True} if the NPC has this action.
	 */
	public boolean hasAction(String action) {
		for (String option : op) {
			if (option != null && option.equalsIgnoreCase(action)) {
				return true;
			}
		}
		return false;
	}
}
