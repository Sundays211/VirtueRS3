/* Class180 - Decompiled by JODE
 * Visit http://jode.sourceforge.net/
 */
package org.virtue.config.seqtype;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigItem;

public class SeqType implements ConfigItem {
	
    /**
     * Retrieves the specified sequence type definition from the cache
     * @param id The sequence type ID
     * @param buffer The buffer containing the data
     * @return The SeqType definition
     */
	public static SeqType load (int id, ByteBuffer buffer) {
		SeqType npcType = new SeqType(id);
		npcType.decode(buffer);
		return npcType;
	}
	
	public int[] anIntArray2085;
	public int walkingMode;
	public int id;
	public int[] frames;
	public int[] interfaceFrames;
	public int[] anIntArray2090;
	public int clientTime;
	//public Class186 aClass186_2092;
	int anInt2093;
	public int replayMode;
	public int loop;
	public int priority;
	public int leftObj;
	public int rightObj;
	public int cycles;
	//Class189 aClass189_2100;
	public int[][] soundSettings;
	public boolean aBool2103;
	public boolean tweened;
	public int[] soundDurations;
	public int[] anIntArray2106;
	public int animatingMode;
	Map<Integer, Object> params;
	public int soundRepeats;
	
	public int serverTime;

	SeqType(int id) {
		clientTime = 0;
		anInt2093 = -1;
		loop = -1;
		priority = 5;
		leftObj = -1;
		rightObj = -1;
		cycles = 99;
		animatingMode = -1;
		walkingMode = -1;
		replayMode = -1;
		aBool2103 = false;
		tweened = false;
		soundRepeats = -1;
		this.id = id;
		//aClass189_2100 = class189;
	}

	@Override
	public void decode(ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}

	void decode(ByteBuffer buffer, int code) {
		if (code == 1) {
			int i_2_ = buffer.getShort() & 0xffff;
			anIntArray2090 = new int[i_2_];
			for (int i_3_ = 0; i_3_ < i_2_; i_3_++) {
				anIntArray2090[i_3_] = buffer.getShort() & 0xffff;
			}
			frames = new int[i_2_];
			for (int i_4_ = 0; i_4_ < i_2_; i_4_++) {
				frames[i_4_] = buffer.getShort() & 0xffff;
			}
			for (int i_5_ = 0; i_5_ < i_2_; i_5_++) {
				frames[i_5_] = ((buffer.getShort() & 0xffff) << 16) + frames[i_5_];
			}
		} else if (code == 2) {
			loop = buffer.getShort() & 0xffff;
		} else if (5 == code) {
			priority = buffer.get() & 0xff;
		} else if (6 == code) {
			leftObj = buffer.getShort() & 0xffff;
		} else if (7 == code) {
			rightObj = buffer.getShort() & 0xffff;
		} else if (code == 8) {
			cycles = buffer.get() & 0xff;
		} else if (code == 9) {
			animatingMode = buffer.get() & 0xff;
		} else if (code == 10) {
			walkingMode = buffer.get() & 0xff;
		} else if (11 == code) {
			replayMode = buffer.get() & 0xff;
		} else if (code == 12 || 112 == code) {
			int i_6_;
			if (code == 12) {
				i_6_ = buffer.get() & 0xff;
			} else {
				i_6_ = buffer.getShort() & 0xffff;
			}
			interfaceFrames = new int[i_6_];
			for (int i_7_ = 0; i_7_ < i_6_; i_7_++) {
				interfaceFrames[i_7_] = buffer.getShort() & 0xffff;
			}
			for (int i_8_ = 0; i_8_ < i_6_; i_8_++) {
				interfaceFrames[i_8_] = ((buffer.getShort() & 0xffff) << 16) + interfaceFrames[i_8_];
			}
		} else if (13 == code) {
			int i_9_ = buffer.getShort() & 0xffff;
			soundSettings = new int[i_9_][];
			for (int i_10_ = 0; i_10_ < i_9_; i_10_++) {
				int i_11_ = buffer.get() & 0xff;
				if (i_11_ > 0) {
					soundSettings[i_10_] = new int[i_11_];
					soundSettings[i_10_][0] = ByteBufferUtils.getTriByte(buffer);
					for (int i_12_ = 1; i_12_ < i_11_; i_12_++) {
						soundSettings[i_10_][i_12_] = buffer.getShort() & 0xffff;
					}
				}
			}
		} else if (code == 14) {
			aBool2103 = true;
		} else if (15 == code) {
			tweened = true;
		} else if (code != 16 && 18 != code) {
			if (19 == code || 119 == code) {
				if (null == soundDurations) {
					soundDurations = new int[soundSettings.length];
					for (int i_13_ = 0; i_13_ < soundSettings.length; i_13_++) {
						soundDurations[i_13_] = 255;
					}
				}
				int i_14_;
				if (code == 19) {
					i_14_ = buffer.get() & 0xff;
				} else {
					i_14_ = buffer.getShort() & 0xffff;
				}
				soundDurations[i_14_] = buffer.get() & 0xff;
			} else if (code == 20 || code == 120) {
				if (null == anIntArray2106 || anIntArray2085 == null) {
					anIntArray2106 = new int[soundSettings.length];
					anIntArray2085 = new int[soundSettings.length];
					for (int i_15_ = 0; i_15_ < soundSettings.length; i_15_++) {
						anIntArray2106[i_15_] = 256;
						anIntArray2085[i_15_] = 256;
					}
				}
				int i_16_;
				if (code == 20) {
					i_16_ = buffer.get() & 0xff;
				} else {
					i_16_ = buffer.getShort() & 0xffff;
				}
				anIntArray2106[i_16_] = buffer.getShort() & 0xffff;
				anIntArray2085[i_16_] = buffer.getShort() & 0xffff;
			} else if (code == 22) {
				soundRepeats = buffer.get() & 0xff;
			} else if (code == 23) {
				buffer.getShort();// & 0xffff;
			} else if (24 == code) {
				anInt2093 = buffer.getShort() & 0xffff;
				/*if (aClass189_2100 != null) {
					aClass186_2092 = ((Class186) (((Class189) aClass189_2100).anInterface10_2131
							.list(anInt2093 * -1586196821,
									1832428497)));
				}*/
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

	@Override
	public void postDecode() {
		if (-1 == animatingMode * -119157517) {
			//if (aClass186_2092 != null && null != aClass186_2092.aBoolArray2116) {
			//	animatingMode = 31479926;
			//} else {
				animatingMode = 0;
			//}
		}
		if (walkingMode * 23372197 == -1) {
			//if (null != aClass186_2092 && aClass186_2092.aBoolArray2116 != null) {
				walkingMode = 1411562586;
			//} else {
			//	walkingMode = 0;
			//}
		}
		if (anIntArray2090 != null) {
			clientTime = 0;
			for (int i_21_ = 0; i_21_ < anIntArray2090.length; i_21_++) {
				clientTime += anIntArray2090[i_21_] * 1626428635;
			}
			serverTime = (int) Math.ceil(clientTime*50f/600f);
		}
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
}
