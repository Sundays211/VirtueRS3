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
package org.virtue.openrs.def.impl;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.entity.player.inv.ItemTypeList;
import org.virtue.openrs.utility.ByteBufferUtils;
import org.virtue.utility.StructTypeList;
import org.virtue.utility.text.StringUtility;

/**
 * @author Sundays211
 * @since 22/10/2014
 */
public class ItemType {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ItemType.class);
	
	private static enum ItemTransform { SHARD, CERT, LENT, BOUGHT; }

	public static final int SHOWCOUNT_NEVER = 0;
	public static final int SHOWCOUNT_IFNOT1 = 1;
	public static final int SHOWCOUNT_ALWAYS = 2;
	static final int MAX_OP_COUNT = 6;
	static final int MAX_IOP_COUNT = 5;
	public static short[] aShortArray8082 = new short[256];
	static String aString8101 = "</col>";
	
	public static ItemType load (int id, ByteBuffer buffer) {
		ItemType itemType = new ItemType(id);
		try {
			for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
				itemType.decode(buffer, opcode);
			}
		} catch (RuntimeException ex) {
			logger.error("Failed to load item "+id, ex);
		}
		return itemType;
	}
	
	/**
	 * Retrieves the specified npc type definition from the cache, using extra data alongside cache data
	 * @param id The item type ID
	 * @param cacheData The buffer containing data from the cache
	 * @param extraData The buffer containing extra data (such as descriptions and weights)
	 * @return the ItemType config
	 */
	public static ItemType load (int id, ByteBuffer cacheData, ByteBuffer extraData) {
		ItemType objType = load(id, extraData);
		try {
			for (int opcode = cacheData.get() & 0xff; opcode != 0; opcode = cacheData.get() & 0xff) {
				objType.decode(cacheData, opcode);
			}
		} catch (RuntimeException ex) {
			logger.error("Failed to load objtype "+id, ex);
		}
		return objType;
	}
	
	int mesh;
	public String name = "null";
	public String desc = null;
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
	//ItemTypeList myList;
	public String[] op;
	public String[] iop;
	public int contentType = -1;
	
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
	
	public ItemType(int id) {
		myid = id;
		/*myList = list;
		op = (String[]) myList.defaultOps.clone();
		iop = (String[]) myList.defaultIOps.clone();*/
		op = new String[] { null, null, "Take", null, null, "Examine" };
		iop = new String[] { null, null, null, null, "Drop" };
	}

	void decode(ByteBuffer buffer, int opcode) {
		if (opcode == 1) {
			mesh = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 2) {
			name = ByteBufferUtils.getString(buffer);
		} else if (opcode == 3) {
			desc = ByteBufferUtils.getString(buffer);
		} else if (4 == opcode) {
			zoom2d = buffer.getShort() & 0xffff;
		} else if (5 == opcode) {
			xan2d = buffer.getShort() & 0xffff;
		} else if (6 == opcode) {
			yan2d = buffer.getShort() & 0xffff;
		} else if (opcode == 7) {
			xof2d = buffer.getShort() & 0xffff;
			if (xof2d > 32767) {
				xof2d -= 65536;
			}
		} else if (8 == opcode) {
			yof2d = buffer.getShort() & 0xffff;
			if (yof2d > 32767) {
				yof2d -= 65536;
			}
		} else if (9 == opcode) {//Used in custom data
			tradeable = true;//9 = Boolean
		} else if (10 == opcode) {//Used in custom data
			weight = buffer.getShort();//10 = Short
		} else if (11 == opcode) {
			stackable = 1;
		} else if (opcode == 12) {
			cost = buffer.getInt();
		} else if (opcode == 13) {
			wearpos = buffer.get() & 0xff;
		} else if (14 == opcode) {
			wearpos2 = buffer.get() & 0xff;
		} else if (16 == opcode) {
			members = true;
		} else if (opcode == 18) {
			multistacksize = buffer.getShort() & 0xffff;
		} else if (opcode == 23) {
			manwear = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 24) {
			manwear2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (25 == opcode) {
			womanwear = ByteBufferUtils.getSmartInt(buffer);
		} else if (26 == opcode) {
			womanwear2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 27) {
			wearpos3 = buffer.get() & 0xff;
		} else if (opcode >= 30 && opcode < 35) {
			op[opcode - 30] = ByteBufferUtils.getString(buffer);
		} else if (opcode >= 35 && opcode < 40) {
			iop[opcode - 35] = ByteBufferUtils.getString(buffer);
		} else if (opcode == 40) {
			int len = buffer.get() & 0xff;
			recol_s = new short[len];
			recol_d = new short[len];
			for (int pos = 0; pos < len; pos++) {
				recol_s[pos] = (short) (buffer.getShort() & 0xffff);
				recol_d[pos] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (41 == opcode) {
			int len = buffer.get() & 0xff;
			retex_s = new short[len];
			retex_d = new short[len];
			for (int pos = 0; pos < len; pos++) {
				retex_s[pos] = (short) (buffer.getShort() & 0xffff);
				retex_d[pos] = (short) (buffer.getShort() & 0xffff);
			}
		} else if (opcode == 42) {
			int len = buffer.get() & 0xff;
			recol_d_palette = new byte[len];
			for (int pos = 0; pos < len; pos++) {
				recol_d_palette[pos] = buffer.get();
			}
		} else if (43 == opcode) {
			tooltipColour = buffer.getInt();
			hasTooltipColour = true;
		} else if (opcode == 44) {
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
		} else if (45 == opcode) {
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
		} else if (opcode == 65) {
			stockmarket = true;
		} else if (opcode == 78) {
			manwear3 = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 79) {
			womanwear3 = ByteBufferUtils.getSmartInt(buffer);
		} else if (90 == opcode) {
			manhead = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 91) {
			womanhead = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 92) {
			manhead2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 93) {
			womanhead2 = ByteBufferUtils.getSmartInt(buffer);
		} else if (opcode == 94) {
			contentType = buffer.getShort() & 0xffff;
		} else if (opcode == 95) {
			zan2d = buffer.getShort() & 0xffff;
		} else if (96 == opcode) {
			dummyitem = buffer.get() & 0xff;
		} else if (97 == opcode) {
			certlink = buffer.getShort() & 0xffff;
		} else if (opcode == 98) {
			certtemplate = buffer.getShort() & 0xffff;
		} else if (opcode >= 100 && opcode < 110) {
			if (countobj == null) {
				countobj = new int[10];
				countco = new int[10];
			}
			countobj[opcode - 100] = buffer.getShort() & 0xffff;
			countco[opcode - 100] = buffer.getShort() & 0xffff;
		} else if (opcode == 110) {
			resizex = buffer.getShort() & 0xffff;
		} else if (111 == opcode) {
			resizey = buffer.getShort() & 0xffff;
		} else if (112 == opcode) {
			resizez = buffer.getShort() & 0xffff;
		} else if (opcode == 113) {
			ambient = buffer.get();
		} else if (114 == opcode) {
			contrast = buffer.get();
		} else if (opcode == 115) {
			team = buffer.get() & 0xff;
		} else if (121 == opcode) {
			lentlink = buffer.getShort() & 0xffff;
		} else if (122 == opcode) {
			lenttemplate = buffer.getShort() & 0xffff;
		} else if (125 == opcode) {
			manwearxoff = (buffer.get() << 2);
			manwearyoff = (buffer.get() << 2);
			manwearzoff = (buffer.get() << 2);
		} else if (opcode == 126) {
			womanwearxoff = (buffer.get() << 2);
			womanwearyoff = (buffer.get() << 2);
			womanwearzoff = (buffer.get() << 2);
		} else if (opcode == 127 || opcode == 128 || 129 == opcode || opcode == 130) {
			buffer.get();//& 0xff
			buffer.getShort();// & 0xffff
		} else if (132 == opcode) {
			int i_17_ = buffer.get() & 0xff;
			quests = new int[i_17_];
			for (int i_18_ = 0; i_18_ < i_17_; i_18_++) {
				quests[i_18_] = buffer.getShort() & 0xffff;
			}
		} else if (134 == opcode) {
			picksizeshift = buffer.get() & 0xff;
		} else if (139 == opcode) {
			boughtlink = buffer.getShort() & 0xffff;
		} else if (140 == opcode) {
			boughttemplate = buffer.getShort() & 0xffff;
		} else if (opcode >= 142 && opcode < 147) {
			if (null == cursorOps) {
				cursorOps = new int[6];
				Arrays.fill(cursorOps, -1);
			}
			cursorOps[opcode - 142] = buffer.getShort() & 0xffff;
		} else if (opcode >= 150 && opcode < 155) {
			if (cursorIOps == null) {
				cursorIOps = new int[5];
				Arrays.fill(cursorIOps, -1);
			}
			cursorIOps[opcode - 150] = buffer.getShort() & 0xffff;
		} else if (opcode != 156) {
			if (157 == opcode) {
				aBool8154 = true;
			} else if (opcode == 161) {
				shardlink = buffer.getShort() & 0xffff;
			} else if (162 == opcode) {
				shardtemplate = buffer.getShort() & 0xffff;
			} else if (163 == opcode) {
				shardcount = buffer.getShort() & 0xffff;
			} else if (164 == opcode) {
				shardname = ByteBufferUtils.getString(buffer);
			} else if (165 == opcode) {
				stackable = 2;
			} else if (249 == opcode) {
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
			}
		}
	}

	public void genCert(ItemType template, ItemType item) {
		transform(ItemTransform.CERT, template, item, null);
	}

	public void genLent(ItemType template, ItemType item) {
		transform(ItemTransform.LENT, template, item, "Discard");
	}

	public void genBought(ItemType template, ItemType item) {
		transform(ItemTransform.BOUGHT, template, item, "Discard");
	}

	public void genShard(ItemType template, ItemType item) {
		transform(ItemTransform.SHARD, template, item, "Drop");
	}

	void transform(ItemTransform type, ItemType template, ItemType item, String option) {
		mesh = template.mesh * 1;
		zoom2d = template.zoom2d * 1;
		xan2d = 1 * template.xan2d;
		yan2d = 1 * template.yan2d;
		zan2d = template.zan2d * 1;
		xof2d = 1 * template.xof2d;
		yof2d = template.yof2d * 1;
		ItemType class631_25_ = (ItemTransform.CERT == type ? template : item);
		recol_s = ((ItemType) class631_25_).recol_s;
		recol_d = ((ItemType) class631_25_).recol_d;
		recol_d_palette = ((ItemType) class631_25_).recol_d_palette;
		retex_s = ((ItemType) class631_25_).retex_s;
		retex_d = ((ItemType) class631_25_).retex_d;
		name = item.name;
		members = item.members;
		if (type == ItemTransform.CERT) {
			cost = 1 * item.cost;
			stackable = 1;
		} else if (ItemTransform.SHARD == type) {
			name = item.shardname;
			cost = ((int) Math.floor((double) (item.cost / item.shardcount)));
			stackable = 1;
			stockmarket = item.stockmarket;
			contentType = 1 * template.contentType;
			cursorOps = template.cursorOps;
			cursorIOps = template.cursorIOps;
			iop = new String[5];
			iop[0] = "Combine";
			iop[4] = option;
		} else {
			cost = 0;
			stackable = 1 * item.stackable;
			wearpos = 1 * item.wearpos;
			wearpos2 = 1 * item.wearpos2;
			wearpos3 = 1 * item.wearpos3;
			manwear = item.manwear * 1;
			manwear2 = item.manwear2 * 1;
			manwear3 = item.manwear3 * 1;
			womanwear = 1 * item.womanwear;
			womanwear2 = 1 * item.womanwear2;
			womanwear3 = item.womanwear3 * 1;
			manwearxoff = item.manwearxoff * 1;
			womanwearxoff = item.womanwearxoff * 1;
			manwearyoff = 1 * item.manwearyoff;
			womanwearyoff = 1 * item.womanwearyoff;
			manwearzoff = item.manwearzoff * 1;
			womanwearzoff = item.womanwearzoff * 1;
			manhead = 1 * item.manhead;
			manhead2 = 1 * item.manhead2;
			womanhead = 1 * item.womanhead;
			womanhead2 = 1 * item.womanhead2;
			contentType = 1 * item.contentType;
			team = item.team * 1;
			op = item.op;
			params = item.params;
			iop = new String[5];
			if (item.iop != null) {
				for (int i_26_ = 0; i_26_ < 4; i_26_++)
					iop[i_26_] = item.iop[i_26_];
			}
			iop[4] = option;
		}
	}

	/*public void postDecode() throws IOException {
		if (certtemplate != -1) {
			genCert(myList.list(certtemplate), myList.list(certlink));
		} else if (lenttemplate != -1) {
			genLent(myList.list(lenttemplate), myList.list(lentlink));
		} else if (-1 != boughttemplate) {
			genBought(myList.list(boughttemplate), myList.list(boughtlink));
		} else if (shardtemplate != -1) {
			genShard(myList.list(shardtemplate),  myList.list(shardlink));
		}
	}*/
    
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
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
		StructType type = StructTypeList.list(structID);
		if (type == null) {
			return -1;
		}
		return type.getParam(2918, -1);
	}
	
	public int getStageOnDeath() {
		if (params == null)
			return 0;
		Object protectedOnDeath = params.get(1397);
		if (protectedOnDeath != null && protectedOnDeath instanceof Integer)
			return (Integer) protectedOnDeath;
		return 0;
	}
	
	public void testt() {
		for (Integer key : params.keySet()) {
			System.out.println(key + ", " + params.get(key));
		}
		System.out.println();
		StructType type = StructTypeList.list((int) params.get(686));
		if (type != null) {
			for (Integer key : type.values.keySet()) {
				System.out.println(key + ", " + type.values.get(key));
			}
		}
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

	public boolean isStackable() {
		if (certtemplate != -1) {
			return true;
		}
		if (stackable == 1) {
			return true;
		}
		if (myid == 9075 || myid == 15243 || myid >= 554 && myid <= 566 || myid >= 863 && myid <= 869) {
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
			return ItemTypeList.list(certlink).isTradable();
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
				return ItemTypeList.list(certlink).getExchangeValue();
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
