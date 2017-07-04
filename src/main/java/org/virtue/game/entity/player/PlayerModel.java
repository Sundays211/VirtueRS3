/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.entity.player;

import java.util.Arrays;

import org.virtue.Virtue;
import org.virtue.config.defaults.WearposDefaults;
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.objtype.ObjTypeCustomisation;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.utility.MD5Encryption;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/04/2016
 */
public class PlayerModel {
	
	private static int[] BASE_PART_MAP = { 8, 11, 4, 6, 9, 7, 10, 0 };

	private static int[] DISABLED_SLOTS = new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0 };

	public static final int HAIR_WITH_HAT_PARAM = 790;
	public static final int HAIR_WITH_FACE_MASK_PARAM = 791;

	//Params: 788 = normal, 789 = Beard with hair, 790 = Hat with hair, 791 = Hat with face mask

	public static final int FEMALE_HAIR_STRUCT_LOOKUP = 2341;

	public static final int MALE_HAIR_STRUCT_LOOKUP = 2338;

	public static final int MALE_HAIR_SLOT_LOOKUP = 2339;

	public static final int FEMALE_HAIR_SLOT_LOOKUP = 2342;

	private static final int[] STYLE_LOOKUP = { -1, -1, -1, -1, 2, -1, 3, 5, 0, 4, 6, 1, -1, -1, -1, -1, -1, -1, -1 };
	//private static final int[] STYLE_LOOKUP = { 7, -1, -1, -1, 2, -1, 3, 5, 0, 4, 6, 1, -1, -1, -1, -1, -1, -1, -1 };

	public static final byte SLOT_HAT = 0, SLOT_CAPE = 1, SLOT_AMULET = 2, SLOT_WEAPON = 3, SLOT_CHEST = 4, SLOT_OFFHAND = 5, SLOT_LEGS = 7, SLOT_HANDS = 9, SLOT_FEET = 10, SLOT_RING = 12, SLOT_ARROWS = 13, SLOT_AURA = 14, SLOT_POCKET = 15;

	public enum Gender { MALE, FEMALE };
	public enum Render { PLAYER, NPC, INVISIBLE };
	private transient Player player;
	private transient byte[] appearanceHash;
	private transient byte[] appearanceData;

	private transient int[] tempStyles;
	private transient int[] tempColours;

	public int[] baseidkit;
	private int[] basecolours;
	private int[] basematerials;
	private Gender gender;
	private Render render;
	private int npcId;
	private int wingsId;
	private boolean showSkill;
	private String prefixTitle;
	private String suffixTitle;
	
	private ObjTypeCustomisation[] objCustomisations;
	
	private int[] parts;

	/**
	 * Custom render animation
	 */
	private int basTypeId = -1;

	public PlayerModel(Player player, WearposDefaults wearposDefaults) {
		this.player = player;
		this.baseidkit = new int[8];
		this.basecolours = new int[10];
		this.basematerials = new int[10];
		this.gender = Gender.MALE;
		this.render = Render.PLAYER;
		this.npcId = -1;
		this.wingsId = -1;
		this.showSkill = false;
		this.prefixTitle = "";
		this.suffixTitle = "";
		this.set();

		this.objCustomisations = new ObjTypeCustomisation[wearposDefaults.slots.length];
		this.parts = new int[wearposDefaults.slots.length];
		Arrays.fill(this.parts, -1);
	}

	private void set() {
		if (gender == Gender.MALE) {
			baseidkit[0] = 261;//8//261
			baseidkit[1] = 10;//11
			baseidkit[2] = 881;//4
			baseidkit[3] = 945;//6//945
			baseidkit[4] = 817;//9
			baseidkit[5] = 833;//7
			baseidkit[6] = 849;//10
			baseidkit[7] = -1;
			/*styles[0] = 264;//Slot 8 (Hair)
			styles[1] = 16;//Slot 11 (Facial hair)
			styles[2] = 880;//Slot 4 (Gloves/Hands)
			styles[3] = -1;//Slot 6 (Arms)
			styles[4] = 816;//Slot 9 (Body)
			styles[5] = 832;//Slot 7 (Legs)
			styles[6] = 848;//Slot 10 (Footware)
			styles[7] = -1;//Slot 0 (Unknown)*/
			basecolours[9] = 0;
			basecolours[8] = 0;
			basecolours[7] = 0;
			basecolours[6] = 0;
			basecolours[5] = 0;
			basecolours[4] = 0;
			basecolours[3] = 180;
			basecolours[2] = 218;
			basecolours[1] = 218;
			basecolours[0] = 12;
		} else {
			/*styles[0] = 278;//Slot 8
			styles[1] = 0;//Slot 11
			styles[2] = 57;//Slot 4
			styles[3] = 65;//Slot 6
			styles[4] = 68;//Slot 9
			styles[5] = 72;//Slot 11
			styles[6] = 80;//Slot 10*/
			baseidkit[0] = 141;//Slot 8 (Hair)
			baseidkit[1] = -1;//Slot 11 (Not used for female avatars)
			baseidkit[2] = 912;//Slot 4 (Gloves/Hands)
			baseidkit[3] = -1;//Slot 6 (Arms)
			baseidkit[4] = 896;//Slot 9 (Body)
			baseidkit[5] = 800;//Slot 7 (Legs)
			baseidkit[6] = 864;//Slot 10 (Footware)
			baseidkit[7] = -1;//Slot 0 (Unknown)
			basecolours[9] = 0;
			basecolours[8] = 0;
			basecolours[7] = 0;
			basecolours[6] = 0;
			basecolours[5] = 0;
			basecolours[4] = 0;
			basecolours[3] = 0;//Legs colour
			basecolours[0] = 3;//Skin colour
			basecolours[1] = 16;//Hair colour
			basecolours[2] = 16;//Top colour
		}
		if (tempStyles != null) {
			System.arraycopy(baseidkit, 0, tempStyles, 0, baseidkit.length);
			System.arraycopy(basecolours, 0, tempColours, 0, basecolours.length);
		}
	}

	public void refresh() {
		OutboundBuffer update = new OutboundBuffer();
		int flagData = 0x0;

		if (gender.equals(Gender.FEMALE)) {
			flagData |= 0x1;
		}

		if (showSkill) {
			flagData |= 0x4;
		}

		if(!prefixTitle.equals("")){
			flagData |= 0x40;
		}

		if(!suffixTitle.equals("")){
			flagData |= 0x80;
		}

		/* Append flag data. */
		update.putByte((byte) flagData);

		if(!prefixTitle.equals("")){
			update.putJagString(prefixTitle);
		}

		if(!suffixTitle.equals("")){
			update.putJagString(suffixTitle);
		}

		/* hide player. */
		update.putByte(Render.INVISIBLE.equals(render) ? 1 : 0);

		/* Pack the appearance block for the player */
		if (Render.NPC.equals(render) && npcId >= 0) {
			update.putShort(-1);
			update.putBigSmart(npcId);
			update.putByte(0);
		} else {
			encodeBaseAppearance1(update, gender, player.getInvs().getContainer(ContainerState.EQUIPMENT) == null, baseidkit);
		}

		// Colour data.
		for (int index = 0; index < basecolours.length; index++) {
			update.putByte((byte) basecolours[index]);
		}

		// Textures data.
		for (int index = 0; index < basematerials.length; index++) {
			update.putByte((byte) basematerials[index]);
		}


		// Base Animation Set
		update.putShort(basTypeId == -1 ? player.getBASId() : basTypeId);

		update.putString(player.getName());
		update.putByte((byte) player.getSkills().getCombatLevel());

		if (!showSkill) {
			update.putByte((byte) 0);
			update.putByte((byte) -1);
		} else {
			update.putShort(player.getSkills().getTotalLevel());
		}
		update.putByte(render.equals(Render.NPC) && npcId >= 0 ? 1 : 0);
		if (render.equals(Render.NPC) && npcId >= 0) {
			NpcType npcType = Virtue.getInstance().getConfigProvider().getNpcTypes().list(npcId);
			update.putShort(npcType.anInt8466);
			update.putShort(npcType.anInt8483);
			update.putShort(npcType.anInt8484);
			update.putShort(npcType.anInt8455);
			update.putByte(npcType.anInt8488);
		}

		byte[] appeareanceData = new byte[update.offset()];
		System.arraycopy(update.buffer(), 0, appeareanceData, 0, appeareanceData.length);



		byte[] md5Hash = MD5Encryption.encrypt(appeareanceData);
		this.appearanceData = appeareanceData;
		this.appearanceHash = md5Hash;
	}

	public void sendBlock(boolean isTemp, WearposDefaults wearposDefaults) {
		OutboundBuffer update = new OutboundBuffer();
		update.putVarShort(ServerProtocol.UPDATE_APPEARANCE, player);
		update.putByte(gender.equals(Gender.FEMALE) ? 1 : 0);//Gender

		encodeBaseAppearance1(update, gender, player.getInvs().getContainer(ContainerState.EQUIPMENT) == null, isTemp ? tempStyles : baseidkit);

		int[] colours = isTemp ? tempColours : basecolours;

		/* Write colour data. */
		for (int index = 0; index < colours.length; index++) {
			update.putByte((byte) colours[index]);
		}
		
		/* Write texture data. */
		for (int index = 0; index < 10; index++) {
			update.putByte((byte) -1);
		}

		update.putShort(basTypeId == -1 ? player.getBASId() : basTypeId);

		update.finishVarShort();
		player.getDispatcher().sendBuffer(update);
	}
	
	private void encodeBaseAppearance (OutboundBuffer block, WearposDefaults wearposDefaults, ObjTypeList objTypeList) {
		for (int slot=0;slot<wearposDefaults.slots.length;slot++) {
			if (wearposDefaults.slots[slot] == 1) {
				continue;
			}
			if ((parts[slot] & 0x40000000) != 0) {
				block.putShort(0x4000 + (parts[slot] & 0x3fffffff));
			} else if ((parts[slot] & ~0x7fffffff) != 0) {
				block.putShort(0x100 + (parts[slot] & 0x3fffffff));
			} else {
				block.putByte(0);
			}
		}
		
		int flagsPosition = block.offset();
		block.putShort(0);

		int flags = 0, slotFlag = -1;
		for (int slot = 0; slot < wearposDefaults.slots.length; slot++) {
			if (wearposDefaults.slots[slot] != 0) {
				continue;
			}
			slotFlag++;
			if (objCustomisations[slot] != null) {
				int objId = parts[slot] & 0x3fffffff;
				ObjTypeCustomisation customisation = objCustomisations[slot];
				customisation.encode(block, objTypeList.list(objId));
				flags |= 1 << slotFlag;
			}
		}

		int currentPosition = block.offset();
		block.offset(flagsPosition);

		block.putShort(flags);
		block.offset(currentPosition);
	}

	private void encodeBaseAppearance1 (OutboundBuffer update, Gender gender, boolean ignoreWorn, int[] styles) {
		if (ignoreWorn) {
			for (int slot=0;slot<DISABLED_SLOTS.length;slot++) {
				if (DISABLED_SLOTS[slot] == 1) {
					continue;
				}
				if (STYLE_LOOKUP[slot] != -1 && styles[STYLE_LOOKUP[slot]] != -1) {
					update.putShort(styles[STYLE_LOOKUP[slot]] + 0x100);
				} else {
					update.putByte(0);
				}
			}
			update.putShort(0);
		} else {
			/* Handles first four equipment slots. */
			for (int index = 0; index < 4; index++) {
				Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(index);
				if (item == null) {
					update.putByte(0);
				} else {
					update.putShort(0x4000 + item.getId());
				}
			}

			/* Append chest (slot=4). */
			Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_CHEST);
			if (item == null) {
				update.putShort(0x100 + styles[2]);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append Shield (slot=5). */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_OFFHAND);
			if (item == null) {
				update.putByte(0);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append arms (slot=6). */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_CHEST);
			if (item == null && styles[3] != -1) {
				update.putShort(0x100 + styles[3]);
			} else {
				update.putByte(0);
			}

			/* Append legs. (slot=7) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_LEGS);
			if (item == null) {
				update.putShort(0x100 + styles[5]);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append hat (slot=8). */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_HAT);
			if (styles[0] != -1 && (item == null || !item.hideHair())) {
				if (item == null) {
					update.putShort(0x100 + styles[0]);
				} else {
					int hatHairStyle = getHatHairStyle(styles[0], item.isFaceMask());
					if (hatHairStyle != -1) {
						update.putShort(0x100 + hatHairStyle);
					} else {
						update.putByte(0);
					}
				}
			} else {
				update.putByte(0);
			}

			/* Append Hands. (slot=9) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_HANDS);
			if (item == null) {
				update.putShort(0x100 + styles[4]);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append Feet. (slot=10) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_FEET);
			if (item == null) {
				update.putShort(0x100 + styles[6]);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append Beard. (slot=11) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(gender.equals(Gender.MALE) ? SLOT_HAT : SLOT_CHEST);
			if (gender.equals(Gender.MALE) && (item == null || item.showBeard()) && styles[1] != -1) {
				update.putShort(0x100 + styles[1]);
			} else {
				update.putByte(0);
			}

			/* Append Aura. (slot=14) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_AURA);
			if (item == null) {
				update.putByte(0);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			/* Append Pocket. (slot=15) */
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_POCKET);
			if (item == null) {
				update.putByte(0);
			} else {
				update.putShort(0x4000 + item.getId());
			}

			// Append special appearance.
			update.putByte((byte) 0);

			// Wings
			if (wingsId != -1) {
				update.putShort(0x4000 + wingsId);
			} else {
				update.putByte((byte) 0);
			}

			int initialPosition = update.offset();
			update.putShort(0);

			int hashData = 0, slotFlag = -1;
			for (int slotId = 0; slotId < DISABLED_SLOTS.length; slotId++) {
				if (DISABLED_SLOTS[slotId] != 0) {
					continue;
				}
				slotFlag++;
				if (objCustomisations[slotId] != null) {
					item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slotId);
					ObjTypeCustomisation customisation = objCustomisations[slotId];
					customisation.encode(update, item.getType());
					hashData |= 1 << slotFlag;
				} else if ((slotId == SLOT_WEAPON || slotId == SLOT_OFFHAND) && player.isSheathing()) {
					item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slotId);
					if (item == null) {
						continue;
					}
					ObjType def = item.getType();
					if (def == null) {
						continue;
					}
					hashData |= 1 << slotFlag;
					update.putByte(0x1);
					update.putBigSmart(def.getModelOnBackId());
					update.putBigSmart(def.getModelOnBackId());
					if (def.manwear2 == -1 || def.womanwear2 == -1) {
						continue;
					}
					update.putBigSmart(def.manwear2);
					update.putBigSmart(def.womanwear2);
					if (def.manwear3 == -1 || def.womanwear3 == -1) {
						continue;
					}
					update.putBigSmart(def.manwear3);
					update.putBigSmart(def.womanwear2);
				}
			}

			int currentPosition = update.offset();
			update.offset(initialPosition);

			update.putShort(hashData);
			update.offset(currentPosition);
		}
	}

	private int getHatHairStyle (int baseStyle, boolean isFaceMask) {
		EnumType lookup = Virtue.getInstance().getConfigProvider().getEnumTypes().list(Gender.MALE.equals(gender) ? MALE_HAIR_SLOT_LOOKUP : FEMALE_HAIR_SLOT_LOOKUP);
		int slot = lookup.getValueInt(baseStyle);
		EnumType structLookup = Virtue.getInstance().getConfigProvider().getEnumTypes().list(Gender.MALE.equals(gender)? MALE_HAIR_STRUCT_LOOKUP : FEMALE_HAIR_STRUCT_LOOKUP);
		int structID = structLookup.getValueInt(slot);
		return Virtue.getInstance().getConfigProvider().getStructTypes().list(structID).getParam(isFaceMask ? HAIR_WITH_FACE_MASK_PARAM : HAIR_WITH_HAT_PARAM, -1);
	}

	/**
	 * Creates a "Temporary" appearance, which can be modified without changing the player's actual appearance
	 */
	public void setTemp () {
		//if (tempStyles == null) {
		tempStyles = new int[baseidkit.length];
		System.arraycopy(baseidkit, 0, tempStyles, 0, baseidkit.length);
		tempColours = new int[basecolours.length];
		System.arraycopy(basecolours, 0, tempColours, 0, basecolours.length);
		sendBlock(true, null);
		//}
	}

	/**
	 * Applies the temporary styles to the player's main appearance
	 */
	public void applyTemp () {
		if (tempStyles != null) {
			baseidkit = tempStyles;
			basecolours = tempColours;
			//tempStyles = null;
			//tempColours = null;
		}
	}

	public void clearTemp () {
		if (tempStyles != null) {
			tempStyles = null;
			tempColours = null;
			sendBlock(false, null);
		}
	}

	public Entity getPlayer() {
		return player;
	}

	public byte[] getHash() {
		return appearanceHash;
	}

	public byte[] getData() {
		return appearanceData;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
		this.set();
	}

	public void setBaseKit (int slot, int idkit) {
		this.baseidkit[slot] = idkit;
		int partSlot = BASE_PART_MAP[slot];
		if ((this.parts[partSlot] & 0x40000000) == 0) {
			if (idkit == -1) {
				this.parts[partSlot] = 0;
			} else {
				this.parts[partSlot] = idkit | ~0x7fffffff;
			}
		}
	}
	
	public void setWornObject (int slot, int objectId, ObjTypeList objTypes) {
		if (objectId == -1) {
			this.parts[slot] = 0;
			setBaseKit(0, this.baseidkit[0]);
		} else if (objTypes.list(objectId) != null) {
			this.parts[slot] = objectId | 0x40000000;
		}
	}

	public int getBaseKit (int slot) {
		return this.baseidkit[slot];
	}
	
	public int getWornObject (int slot) {
		return this.parts[slot];
	}
	
	public void setObjCustomisation (int slot, ObjTypeCustomisation customisation) {
		this.objCustomisations[slot] = customisation;
	}
	
	public ObjTypeCustomisation getObjCustomisation (int slot) {
		return this.objCustomisations[slot];
	}

	public void setPrefixTitle(String title) {
		this.prefixTitle = title;
	}

	public String getPrefixTitle() {
		return prefixTitle;
	}

	public void setSuffixTitle(String title) {
		this.suffixTitle = title;
	}

	public String getSuffixTitle() {
		return suffixTitle;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public int getTempStyle (int slot) {
		if (slot < 0 || slot >= tempStyles.length) {
			return -1;
		}
		return tempStyles[slot];
	}

	public void setTempStyle(int slot, int style) {
		this.tempStyles[slot] = style;
		//setStyle(slot, style);
	}

	public int getTempColour (int slot) {
		if (slot < 0 || slot >= tempColours.length) {
			return -1;
		}
		return tempColours[slot];
	}

	public void setTempColour(int slot, int colour) {
		this.tempColours[slot] = colour;
		//setColor(slot, colour);
	}

	public void setStyles(int[] styles) {
		this.baseidkit = styles;
	}

	public int[] getStyles() {
		return baseidkit;
	}

	public void setColour(int index, int color) {
		this.basecolours[index] = color;
	}

	public void setColors(int[] colors) {
		this.basecolours = colors;
	}

	public void setMaterials(int[] textures) {
		this.basematerials = textures;
	}

	public int[] getMaterials() {
		return basematerials;
	}

	public int[] getColors() {
		return basecolours;
	}

	public boolean showSkillLevel() {
		return showSkill;
	}

	public void setShowSkillLevel(boolean showSkill) {
		this.showSkill = showSkill;
	}

	public int getBASId() {
		if (basTypeId == -1) {
			return player.getBASId();
		}
		return basTypeId;
	}

	public void setBAS (int renderID) {
		this.basTypeId = renderID;
	}

	public Render getRender() {
		return render;
	}

	public void setRender(Render render) {
		this.render = render;
		this.basTypeId = -1;
	}
	//Select skin colour and gender.
	public Gender getGender() {
		return gender;
	}

	public void setNPCId(int id) {
		this.npcId = id;
		setBAS(Virtue.getInstance().getConfigProvider().getNpcTypes().list(id).basTypeID);
	}

	public int getRenderNpc() {
		return this.npcId;
	}

	public void setWings(int id) {
		this.wingsId = id;
	}

	public boolean isMale() {
		return gender.equals(Gender.MALE);
	}
}
