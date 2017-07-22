/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.config.objtype;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.HashMap;

import org.virtue.Virtue;
import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.structtype.StructType;
import org.virtue.utility.text.StringUtility;

/**
 * @author Sundays211
 * @since 22/10/2014
 */
public class ObjType implements ConfigType {
	
	private static enum ItemTransform { SHARD, CERT, LENT, BOUGHT; }

	public static final int SHOWCOUNT_NEVER = 0;
	public static final int SHOWCOUNT_IFNOT1 = 1;
	public static final int SHOWCOUNT_ALWAYS = 2;
	static final int MAX_OP_COUNT = 6;
	static final int MAX_IOP_COUNT = 5;
	public static short[] aShortArray8082 = new short[256];
	static String aString8101 = "</col>";
	
	int model;
	public String name = "null";
	private String desc = null;
	public int zoom2d = 2000;
	public int xan2d = 0;
	public int yan2d = 0;
	public int zan2d = 0;
	public int xof2d = 0;
	public int yof2d = 0;
	public boolean tradeable = false;
	public int weight = 0;
	public int stackable = 0;
	public int multistacksize = -1;
	public int cost = 1;
	public boolean members = false;
	public int wearpos = -1;
	public int wearpos2 = -1;
	public int wearpos3 = -1;
	public int manwear = -1;
	public int manwear2 = -1;
	public int manwear3 = -1;
	public int womanwear = -1;
	public int womanwear2 = -1;
	public int womanwear3 = -1;
	int manwearxoff = 0;
	int womanwearxoff = 0;
	int manwearyoff = 0;
	int womanwearyoff = 0;
	int manwearzoff = 0;
	int womanwearzoff = 0;
	int manhead = -1;
	int manhead2 = -1;
	int womanhead = -1;
	int womanhead2 = -1;
	public int certtemplate = -1;
	public int certlink = -1;
	public int lentlink = -1;
	public int lenttemplate = -1;
	public int shardlink = -1;
	public int shardtemplate = -1;
	String shardname = "null";
	public int shardcount = 0;
	int resizex = 128;
	int resizey = 128;
	int resizez = 128;
	int ambient = 0;
	int contrast = 0;
	public int team = 0;
	public boolean stockmarket = false;
	public int dummyitem = 0;
	public int picksizeshift = 0;
	public int boughtlink = -1;
	public int boughttemplate = -1;
	public boolean hasTooltipColour = false;
	public boolean aBool8154 = false;
	int myid;
	ObjTypeList myList;
	public String[] op;
	public String[] iop;
	public int category = -1;
	
	public short[] recol_s;
	short[] recol_d;
	byte[] recol_d_palette;
	short[] retex_s;
	byte[] retex_d_indicies;
	int[] countco;
	short[] retex_d;
	public int tooltipColour;
	int[] cursorOps;
	int[] cursorIOps;
	int[] countobj;
	byte[] recol_d_indicies;
	HashMap<Integer, Object> params;
	public int[] quests;
	
	public ObjType(int id, ObjTypeList list) {
		myid = id;
		myList = list;
		/*op = (String[]) myList.defaultOps.clone();
		iop = (String[]) myList.defaultIOps.clone();*/
		op = new String[] { null, null, "Take", null, null, "Examine" };
		iop = new String[] { null, null, null, null, "Drop" };
	}
	
	@Override
	public void decode (ByteBuffer buffer) {
		for (int code = buffer.get() & 0xff; code != 0; code = buffer.get() & 0xff) {
			decode(buffer, code);
		}
	}

	void decode(ByteBuffer buffer, int code) {
		if (code == 1) {
			model = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 2) {
			name = ByteBufferUtils.getString(buffer);
		} else if (code == 3) {
			desc = ByteBufferUtils.getString(buffer);
		} else if (4 == code) {
			zoom2d = buffer.getShort() & 0xffff;
		} else if (5 == code) {
			xan2d = buffer.getShort() & 0xffff;
		} else if (6 == code) {
			yan2d = buffer.getShort() & 0xffff;
		} else if (code == 7) {
			xof2d = buffer.getShort() & 0xffff;
			if (xof2d > 32767) {
				xof2d -= 65536;
			}
		} else if (8 == code) {
			yof2d = buffer.getShort() & 0xffff;
			if (yof2d > 32767) {
				yof2d -= 65536;
			}
		} else if (9 == code) {//Used in custom data
			tradeable = true;//9 = Boolean
		} else if (10 == code) {//Used in custom data
			weight = buffer.getShort();//10 = Short
		} else if (11 == code) {
			stackable = 1;
		} else if (code == 12) {
			cost = buffer.getInt();
		} else if (code == 13) {
			wearpos = buffer.get() & 0xff;
		} else if (14 == code) {
			wearpos2 = buffer.get() & 0xff;
		} else if (16 == code) {
			members = true;
		} else if (code == 18) {
			multistacksize = buffer.getShort() & 0xffff;
		} else if (code == 23) {
			manwear = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 24) {
			manwear2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (25 == code) {
			womanwear = ByteBufferUtils.getSmartInt(buffer);
		} else if (26 == code) {
			womanwear2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 27) {
			wearpos3 = buffer.get() & 0xff;
		} else if (code >= 30 && code < 35) {
			op[code - 30] = ByteBufferUtils.getString(buffer);
		} else if (code >= 35 && code < 40) {
			iop[code - 35] = ByteBufferUtils.getString(buffer);
		} else if (code == 40) {
			int len = buffer.get() & 0xff;
			recol_s = new short[len];
			recol_d = new short[len];
			for (int pos = 0; pos < len; pos++) {
				recol_s[pos] = (short) (buffer.getShort() & 0xffff);
				recol_d[pos] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (41 == code) {
			int len = buffer.get() & 0xff;
			retex_s = new short[len];
			retex_d = new short[len];
			for (int pos = 0; pos < len; pos++) {
				retex_s[pos] = (short) (buffer.getShort() & 0xffff);
				retex_d[pos] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (code == 42) {
			int len = buffer.get() & 0xff;
			recol_d_palette = new byte[len];
			for (int pos = 0; pos < len; pos++) {
				recol_d_palette[pos] = buffer.get();
			}
		} else if (43 == code) {
			tooltipColour = buffer.getInt();
			hasTooltipColour = true;
		} else if (code == 44) {
			int i_7_ = buffer.getShort() & 0xffff;
			int i_8_ = 0;
			for (int i_9_ = i_7_; i_9_ > 0; i_9_ >>= 1) {
				i_8_++;
			}
			recol_d_indicies = new byte[i_8_];
			byte i_10_ = 0;
			for (int i_11_ = 0; i_11_ < i_8_; i_11_++) {
				if ((i_7_ & 1 << i_11_) > 0) {
					recol_d_indicies[i_11_] = i_10_;
					i_10_++;
				} else {
					recol_d_indicies[i_11_] = (byte) -1;
				}
			}
		} else if (45 == code) {
			int i_12_ = buffer.getShort() & 0xffff;
			int i_13_ = 0;
			for (int i_14_ = i_12_; i_14_ > 0; i_14_ >>= 1) {
				i_13_++;
			}
			retex_d_indicies = new byte[i_13_];
			byte i_15_ = 0;
			for (int i_16_ = 0; i_16_ < i_13_; i_16_++) {
				if ((i_12_ & 1 << i_16_) > 0) {
					retex_d_indicies[i_16_] = i_15_;
					i_15_++;
				} else {
					retex_d_indicies[i_16_] = (byte) -1;
				}
			}
		} else if (code == 65) {
			stockmarket = true;
		} else if (code == 78) {
			manwear3 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 79) {
			womanwear3 = ByteBufferUtils.getSmartInt(buffer);
		} else if (90 == code) {
			manhead = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 91) {
			womanhead = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 92) {
			manhead2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 93) {
			womanhead2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (code == 94) {
			category = buffer.getShort() & 0xffff;
		} else if (code == 95) {
			zan2d = buffer.getShort() & 0xffff;
		} else if (96 == code) {
			dummyitem = buffer.get() & 0xff;
		} else if (97 == code) {
			certlink = buffer.getShort() & 0xffff;
		} else if (code == 98) {
			certtemplate = buffer.getShort() & 0xffff;
		} else if (code >= 100 && code < 110) {
			if (countobj == null) {
				countobj = new int[10];
				countco = new int[10];
			}
			countobj[code - 100] = buffer.getShort() & 0xffff;
			countco[code - 100] = buffer.getShort() & 0xffff;
		} else if (code == 110) {
			resizex = buffer.getShort() & 0xffff;
		} else if (111 == code) {
			resizey = buffer.getShort() & 0xffff;
		} else if (112 == code) {
			resizez = buffer.getShort() & 0xffff;
		} else if (code == 113) {
			ambient = buffer.get();
		} else if (114 == code) {
			contrast = buffer.get();
		} else if (code == 115) {
			team = buffer.get() & 0xff;
		} else if (121 == code) {
			lentlink = buffer.getShort() & 0xffff;
		} else if (122 == code) {
			lenttemplate = buffer.getShort() & 0xffff;
		} else if (125 == code) {
			manwearxoff = (buffer.get() << 2);
			manwearyoff = (buffer.get() << 2);
			manwearzoff = (buffer.get() << 2);
		} else if (code == 126) {
			womanwearxoff = (buffer.get() << 2);
			womanwearyoff = (buffer.get() << 2);
			womanwearzoff = (buffer.get() << 2);
		} else if (code == 127 || code == 128 || 129 == code || code == 130) {
			buffer.get();//& 0xff
			buffer.getShort();// & 0xffff
		} else if (132 == code) {
			int i_17_ = buffer.get() & 0xff;
			quests = new int[i_17_];
			for (int i_18_ = 0; i_18_ < i_17_; i_18_++) {
				quests[i_18_] = buffer.getShort() & 0xffff;
			}
		} else if (134 == code) {
			picksizeshift = buffer.get() & 0xff;
		} else if (139 == code) {
			boughtlink = buffer.getShort() & 0xffff;
		} else if (140 == code) {
			boughttemplate = buffer.getShort() & 0xffff;
		} else if (code >= 142 && code < 147) {
			if (null == cursorOps) {
				cursorOps = new int[6];
				Arrays.fill(cursorOps, -1);
			}
			cursorOps[code - 142] = buffer.getShort() & 0xffff;
		} else if (code >= 150 && code < 155) {
			if (cursorIOps == null) {
				cursorIOps = new int[5];
				Arrays.fill(cursorIOps, -1);
			}
			cursorIOps[code - 150] = buffer.getShort() & 0xffff;
		} else if (code != 156) {
			if (157 == code) {
				aBool8154 = true;
			} else if (code == 161) {
				shardlink = buffer.getShort() & 0xffff;
			} else if (162 == code) {
				shardtemplate = buffer.getShort() & 0xffff;
			} else if (163 == code) {
				shardcount = buffer.getShort() & 0xffff;
			} else if (164 == code) {
				shardname = ByteBufferUtils.getString(buffer);
			} else if (165 == code) {
				stackable = 2;
			} else if (249 == code) {
				int size = buffer.get() & 0xff;
				if (null == params) {
					params = new HashMap<Integer, Object>(size);
				}
				for (int i_21_ = 0; i_21_ < size; i_21_++) {
					boolean bool = (buffer.get() & 0xff) == 1;
					int key = ByteBufferUtils.getTriByte(buffer);
					Object value;
					if (bool) {
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
		if (certtemplate != -1 && certlink != myid) {
			genCert(myList.list(certtemplate), myList.list(certlink));
		} else if (lenttemplate != -1 && lentlink != myid) {
			genLent(myList.list(lenttemplate), myList.list(lentlink));
		} else if (-1 != boughttemplate && boughtlink != myid) {
			genBought(myList.list(boughttemplate), myList.list(boughtlink));
		} else if (shardtemplate != -1 && shardlink != myid) {
			genShard(myList.list(shardtemplate), myList.list(shardlink));
		}
	}

	public void genCert(ObjType template, ObjType item) {
		transform(ItemTransform.CERT, template, item, null);
	}

	public void genLent(ObjType template, ObjType item) {
		transform(ItemTransform.LENT, template, item, "Discard");
	}

	public void genBought(ObjType template, ObjType item) {
		transform(ItemTransform.BOUGHT, template, item, "Discard");
	}

	public void genShard(ObjType template, ObjType item) {
		transform(ItemTransform.SHARD, template, item, "Drop");
	}

	void transform(ItemTransform type, ObjType template, ObjType link, String option) {
		model = template.model;
		zoom2d = template.zoom2d;
		xan2d = template.xan2d;
		yan2d = template.yan2d;
		zan2d = template.zan2d;
		xof2d = template.xof2d;
		yof2d = template.yof2d;
		ObjType class631_25_ = (ItemTransform.CERT == type ? template : link);
		recol_s = ((ObjType) class631_25_).recol_s;
		recol_d = ((ObjType) class631_25_).recol_d;
		recol_d_palette = ((ObjType) class631_25_).recol_d_palette;
		retex_s = ((ObjType) class631_25_).retex_s;
		retex_d = ((ObjType) class631_25_).retex_d;
		name = link.name;
		members = link.members;
		if (type == ItemTransform.CERT) {
			desc = "Swap this note at any bank for the equivalent item.";
			cost = link.cost;
			stackable = 1;
		} else if (ItemTransform.SHARD == type) {
			name = link.shardname;
			cost = ((int) Math.floor((double) (link.cost / link.shardcount)));
			stackable = 1;
			stockmarket = link.stockmarket;
			category = template.category;
			cursorOps = template.cursorOps;
			cursorIOps = template.cursorIOps;
			iop = new String[5];
			iop[0] = "Combine";
			iop[4] = option;
		} else {
			desc = link.desc;
			cost = 0;
			stackable = link.stackable;
			wearpos = link.wearpos;
			wearpos2 = link.wearpos2;
			wearpos3 = link.wearpos3;
			manwear = link.manwear;
			manwear2 = link.manwear2;
			manwear3 = link.manwear3;
			womanwear = link.womanwear;
			womanwear2 = link.womanwear2;
			womanwear3 = link.womanwear3;
			manwearxoff = link.manwearxoff;
			womanwearxoff = link.womanwearxoff;
			manwearyoff = link.manwearyoff;
			womanwearyoff = link.womanwearyoff;
			manwearzoff = link.manwearzoff;
			womanwearzoff = link.womanwearzoff;
			manhead = link.manhead;
			manhead2 = link.manhead2;
			womanhead = link.womanhead;
			womanhead2 = link.womanhead2;
			category = link.category;
			team = link.team;
			op = link.op;
			params = link.params;
			iop = new String[5];
			if (link.iop != null) {
				for (int i_26_ = 0; i_26_ < 4; i_26_++) {
					iop[i_26_] = link.iop[i_26_];
				}
			}
			iop[4] = option;
		}
	}
    
    public int getParam(int key, int defaultInt) {
		if (params == null) {
		    return defaultInt;
		}
		Integer value = ((Integer) params.get(key));
		if (null == value) {
		    return defaultInt;
		}
		return value.intValue();
    }
    
    public String getParam(int key, String defaultStr) {
		if (null == params) {
		    return defaultStr;
		}
		String value = (String) params.get(key);
		if (value == null) {
		    return defaultStr;
		}
		return value;
    }
    
    public int getMeleeDamage() {
    	return (getParam(641, 0)/10);
    }
    
    public int getMagicDamage() {
    	return (getParam(2877, 0)/10);
    }
    
    public int getArmourDefence() {
    	return (getParam(2870, 0)/10);
    }
    
    public int getArrowDamage() {
    	return (getParam(643, 0)/10);
    }
    
    public int getBowDamage() {
    	return (getParam(643, 0)/10);
    }
    
    public int getMagicAccuracy() {
    	return (getParam(3, 0));
    }
    
    public int getRangedAccuracy() {
    	return (getParam(4, 0));
    }
    
    public int getMeleeWeaponAccuracy() {
        return (getParam(3267, 0));
   }
    
    /**
     * Grabs the projectile from cache, magic spells & arrows
     * including other projectiles.
     * @return
     */
    public int getProjectileGFX() {
    	return (getParam(2940, -1));
    }
    
    /**
     * Grabs the end GFX when hits the target.
     * @return
     */
    public int getEndSpellGFX() {
    	return (getParam(2933, -1));
    }
    
    public int getAttackSpeed() {
    	return getParam(14, -1);
    }
    
    public int getWeaponSpecial() {
    	return getParam(4332, -1);
    }

    public int getWeaponTier() {
    	 return (int) ((getMeleeDamage()*10)/9.6);
    }
    
    public int getEquipmentLevel() {
    	return getParam(750, -1); //Weapon Level
    }
    
    public int getEquipmentSecLevel() {
    	return getParam(752, -1);//Secondary Weapon Level
    }
    
    public int getModelOnBackId() {
		return getParam(2820, -1);
	}

    /**
     * Spells uses this to draw the animation off the current weapon. Also
     * used for melee & range weapons.
     * @return
     */
	public int getMainhandEmote() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2914, -1);
	}
	
	/**
	 * Uses Main hand animations for spells, range, and melee.
	 * @return
	 */
	public int getMainhandEmoteLegacy() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(4385, -1);
	}
	
	/**
	 * Uses Main hand animations for spells, range, and melee.
	 * @return
	 */
	public int getMainhandSpellLegacy() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(4390, -1);
	}
	
	public int getOffhandEmoteLegacy() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(4389, -1);
	}
    
	public int getOffhandEmote() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2831, -1);
	}
	
	public int getDefensiveAnimationLegacy() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(4387, -1);
	}
	
	public int getDefensiveAnimation() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2917, -1);
	}
	
	public int getLegacyPassiveRender() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(4383, -1);
	}
	
	public int getPassiveRender() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2954, -1);
	}

	public int getAggressiveRender() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2955, -1);
	}
	
	public int getAggressiveEndRender() {
		int structID = getParam(686, -1);
		if (structID == -1) {
			return -1;
		}
		StructType type = Virtue.getInstance().getConfigProvider().getStructTypes().list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2918, -1);
	}
	
	public int getStageOnDeath() {
		return getParam(1397, 0);
	}
	
	/*public int getSheathingAnim() {
		if (params == null) {
			return -1;
		}
		StructType type = StructTypeList.list((int) params.get(686));
		if (type == null) {
			return -1;
		}
		return type.getParam(1100, -1);
	}*/

	/**
	 * Finds whether the item should stack or not when added to a non-stacking container
	 * @return True if the item should always stack, false otherwise
	 */
	public boolean isStackable() {
		if (certtemplate != -1) {
			return true;
		}
		if (stackable == 1) {
			return true;
		}
		return false;
	}
	
	/**
	 * Checks whether the item can be traded between players
	 * @return True if the item can be traded, false otherwise
	 */
	public boolean isTradable () {
		if (tradeable || stockmarket) {
			return true;
		}
		if (certtemplate != -1) {
			return myList.list(certlink).isTradable();
		}
		if (myid == 995) {
			return true;//Coins should be tradable
		}
		return false;
	}
	
	/**
	 * Checks whether the item can be sold to a general store
	 * @return True if the item can be sold, false otherwise
	 */
	public boolean canSellToGeneralStore () {
		if (stockmarket) {
			return true;
		}
		return false;
	}
	
	public String getDescription () {
		if (desc != null) {
			return desc;
		} else if (certtemplate != -1) {
			return "Swap this note at any bank for the equivalent item.";
		} else {
			return "It's "+(StringUtility.startsWithVowel(name) ? "an" : "a")+" "+name+".";
		}
	}
	
	/**
	 * Returns the grand exchange value of the item.
	 * Currently, this just returns the shop value
	 * @return The exchange value
	 */
	public int getExchangeValue () {
		if (stockmarket) {
			int price = Virtue.getInstance().getExchange().lookupPrice(myid);
			if (price != -1) {
				return price;
			} else if (certtemplate != -1) {
				return myList.list(certlink).getExchangeValue();
			} else {
				return cost;
			}
		} else {
			return -1;
		}
	}
	
	@Override
	public String toString () {
		return new StringBuilder().append(myid).append(" - ").append(name).toString();
	}
}
