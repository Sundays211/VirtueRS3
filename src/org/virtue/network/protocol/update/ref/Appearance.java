package org.virtue.network.protocol.update.ref;

import java.util.Arrays;

import org.virtue.config.enumtype.EnumType;
import org.virtue.config.enumtype.EnumTypeList;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.config.objtype.ItemType;
import org.virtue.config.objtype.ItemTypeList;
import org.virtue.config.structtype.StructTypeList;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.EquipmentStyleOverride;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.utility.MD5Encryption;

/**
 * @author Tom
 *
 */
public class Appearance {

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
	short[][] capeColors;

	public static final byte SLOT_HAT = 0, SLOT_CAPE = 1, SLOT_AMULET = 2, SLOT_WEAPON = 3, SLOT_CHEST = 4, SLOT_OFFHAND = 5, SLOT_LEGS = 7, SLOT_HANDS = 9, SLOT_FEET = 10, SLOT_RING = 12, SLOT_ARROWS = 13, SLOT_AURA = 14, SLOT_POCKET = 15;

	public enum Gender { MALE, FEMALE };
	public enum Render { PLAYER, NPC, INVISIBLE };
	private transient Player player;
	private transient byte[] appearanceHash;
	private transient byte[] appearanceData;

	private transient int[] tempStyles;
	private transient int[] tempColours;

	public int[] styles;
	private int[] colors;
	private int[] textures;
	private Gender gender;
	private Render render;
	private int npcId;
	private int wingsId;
	private boolean showSkill;
	private String prefixTitle;
	private String suffixTitle;

	/**
	 * Custom render animation
	 */
	private int renderAnimation = -1;

	public Appearance(Player player) {
		this.player = player;
		this.styles = new int[8];
		this.colors = new int[10];
		this.textures = new int[10];
		this.gender = Gender.MALE;
		this.render = Render.PLAYER;
		this.npcId = -1;
		this.wingsId = -1;
		this.showSkill = false;
		this.prefixTitle = "";
		this.suffixTitle = "";
		this.set();

		this.capeColors = new short[2][];
		this.capeColors[0] = Arrays.copyOf(ItemTypeList.getInstance().list(20767).recol_s, 4);
		this.capeColors[1] = Arrays.copyOf(ItemTypeList.getInstance().list(20769).recol_s, 4);

	}

	private void set() {
		if (gender == Gender.MALE) {
			styles[0] = 261;//8//261
			styles[1] = 10;//11
			styles[2] = 881;//4
			styles[3] = 945;//6//945
			styles[4] = 817;//9
			styles[5] = 833;//7
			styles[6] = 849;//10
			styles[7] = -1;
			/*styles[0] = 264;//Slot 8 (Hair)
			styles[1] = 16;//Slot 11 (Facial hair)
			styles[2] = 880;//Slot 4 (Gloves/Hands)
			styles[3] = -1;//Slot 6 (Arms)
			styles[4] = 816;//Slot 9 (Body)
			styles[5] = 832;//Slot 7 (Legs)
			styles[6] = 848;//Slot 10 (Footware)
			styles[7] = -1;//Slot 0 (Unknown)*/
			colors[9] = 0;
			colors[8] = 0;
			colors[7] = 0;
			colors[6] = 0;
			colors[5] = 0;
			colors[4] = 0;
			colors[3] = 180;
			colors[2] = 218;
			colors[1] = 218;
			colors[0] = 12;
		} else {
			/*styles[0] = 278;//Slot 8
			styles[1] = 0;//Slot 11
			styles[2] = 57;//Slot 4
			styles[3] = 65;//Slot 6
			styles[4] = 68;//Slot 9
			styles[5] = 72;//Slot 11
			styles[6] = 80;//Slot 10*/
			styles[0] = 141;//Slot 8 (Hair)
			styles[1] = -1;//Slot 11 (Not used for female avatars)
			styles[2] = 912;//Slot 4 (Gloves/Hands)
			styles[3] = -1;//Slot 6 (Arms)
			styles[4] = 896;//Slot 9 (Body)
			styles[5] = 800;//Slot 7 (Legs)
			styles[6] = 864;//Slot 10 (Footware)
			styles[7] = -1;//Slot 0 (Unknown)
			colors[9] = 0;
			colors[8] = 0;
			colors[7] = 0;
			colors[6] = 0;
			colors[5] = 0;
			colors[4] = 0;
			colors[3] = 0;//Legs colour
			colors[0] = 3;//Skin colour
			colors[1] = 16;//Hair colour
			colors[2] = 16;//Top colour
		}
		if (tempStyles != null) {
			System.arraycopy(styles, 0, tempStyles, 0, styles.length);
			System.arraycopy(colors, 0, tempColours, 0, colors.length);
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
			packStyles(update, player.getInvs().getContainer(ContainerState.EQUIPMENT) == null, styles);
		}

		// Colour data.
		for (int index = 0; index < colors.length; index++) {
			update.putByte((byte) colors[index]);
		}

		// Textures data.
		for (int index = 0; index < textures.length; index++) {
			update.putByte((byte) textures[index]);
		}


		// Render animation
		update.putShort(renderAnimation == -1 ? player.getRenderAnimation() : renderAnimation);

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
			NpcType npcType = NpcTypeList.list(npcId);
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

	public void sendBlock(boolean isTemp) {
		OutboundBuffer update = new OutboundBuffer();
		update.putVarShort(ServerProtocol.UPDATE_APPEARANCE, player);
		update.putByte(gender.equals(Gender.FEMALE) ? 1 : 0);//Gender

		packStyles(update, player.getInvs().getContainer(ContainerState.EQUIPMENT) == null, isTemp ? tempStyles : styles);

		int[] colours = isTemp ? tempColours : colors;

		/* Write colour data. */
		for (int index = 0; index < colours.length; index++) {
			update.putByte((byte) colours[index]);
		}
		
		/* Write texture data. */
		for (int index = 0; index < 10; index++) {
			update.putByte((byte) -1);
		}

		update.putShort(renderAnimation == -1 ? player.getRenderAnimation() : renderAnimation);

		update.finishVarShort();
		player.getDispatcher().sendBuffer(update);
	}

	private void packStyles (OutboundBuffer update, boolean ignoreWorn, int[] styles) {
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
				if (player.getEquipment().getOverride(slotId) != null) {
					item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slotId);
					EquipmentStyleOverride override = player.getEquipment().getOverride(slotId);
					if (item == null || item.getId() != override.getObjId()) {
						continue;//Invalid override
					}
					int flags = 0;
					if (override.getRecol() != null) {
						flags |= 0x4;
					}
					if (override.getRetex() != null) {
						flags |= 0x8;
					}
					hashData |= 1 << slotFlag;
					update.putByte(flags);
					if (override.getRecol() != null) {
						int slotFlags = 0;
						byte[] slots = override.getRecolSlots();
						for (int slot = 0; slot < 4; slot++) {
							if (slot < slots.length) {
								slotFlags |= (slots[slot] & 0xf) << (slot*4);
							} else {
								slotFlags |= 15 << (slot*4);
							}
						}
						update.putShort(slotFlags);
						for (int slot = 0; slot < 4; slot++) {
							if (slot < slots.length) {
								update.putShort(override.getRecol()[slot]);
							}
						}
					}
					if (override.getRetex() != null) {
						int slotFlags = 0;
						byte[] slots = override.getRetexSlots();
						for (int slot = 0; slot < 2; slot++) {
							if (slot < slots.length) {
								slotFlags |= (slots[slot] & 0xf) << (slot*4);
							} else {
								slotFlags |= 15 << (slot*4);
							}
						}
						update.putByte(slotFlags);
						for (int slot = 0; slot < 2; slot++) {
							if (slot < slots.length) {
								update.putShort(override.getRetex()[slot]);
							}
						}
					}
				} else if ((slotId == SLOT_WEAPON || slotId == SLOT_OFFHAND) && player.isSheathing()) {
					item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slotId);
					if (item == null) {
						continue;
					}
					ItemType def = item.getType();
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
				} else if (slotId == SLOT_CAPE) {
					Item cape = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(SLOT_CAPE);
					if (cape == null) {
						continue;
					}

					if (cape.getId() != 20769 && cape.getId() != 20771 && cape.getId() != 20767) {
						continue;
					}

					hashData |= 1 << slotFlag;
					update.putByte(0x4);

					short[] capeColours = capeColors[cape.getId() == 20767 ? 0 : 1];
					int slots = 0 | 1 << 4 | 2 << 8 | 3 << 12;

					update.putShort(slots);
					for (int curSlot = 0; curSlot < 4; curSlot++) {
						update.putShort(capeColours[curSlot]);
					}
				}
			}

			int currentPosition = update.offset();
			update.offset(initialPosition);

			update.putShort(hashData);
			update.offset(currentPosition);
		}
	}

	private int getHatHairStyle (int baseStyle, boolean isFaceMask) {
		EnumType lookup = EnumTypeList.list(Gender.MALE.equals(gender) ? MALE_HAIR_SLOT_LOOKUP : FEMALE_HAIR_SLOT_LOOKUP);
		int slot = lookup.getValueInt(baseStyle);
		EnumType structLookup = EnumTypeList.list(Gender.MALE.equals(gender)? MALE_HAIR_STRUCT_LOOKUP : FEMALE_HAIR_STRUCT_LOOKUP);
		int structID = structLookup.getValueInt(slot);
		return StructTypeList.list(structID).getParam(isFaceMask ? HAIR_WITH_FACE_MASK_PARAM : HAIR_WITH_HAT_PARAM, -1);
	}

	/**
	 * Creates a "Temporary" appearance, which can be modified without changing the player's actual appearance
	 */
	public void setTemp () {
		//if (tempStyles == null) {
		tempStyles = new int[styles.length];
		System.arraycopy(styles, 0, tempStyles, 0, styles.length);
		tempColours = new int[colors.length];
		System.arraycopy(colors, 0, tempColours, 0, colors.length);
		sendBlock(true);
		//}
	}

	/**
	 * Applies the temporary styles to the player's main appearance
	 */
	public void applyTemp () {
		if (tempStyles != null) {
			styles = tempStyles;
			colors = tempColours;
			//tempStyles = null;
			//tempColours = null;
		}
	}

	public void clearTemp () {
		if (tempStyles != null) {
			tempStyles = null;
			tempColours = null;
			sendBlock(false);
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

	public void setStyle(int slot, int style) {
		this.styles[slot] = style;
	}

	public void setStyles(int[] styles) {
		this.styles = styles;
	}

	public int[] getStyles() {
		return styles;
	}

	public void setColor(int index, int color) {
		this.colors[index] = color;
	}

	public void setColors(int[] colors) {
		this.colors = colors;
	}

	public void setTextures(int[] textures) {
		this.textures = textures;
	}

	public int[] getTextures() {
		return textures;
	}

	public int[] getColors() {
		return colors;
	}

	public boolean showSkillLevel() {
		return showSkill;
	}

	public void setShowSkillLevel(boolean showSkill) {
		this.showSkill = showSkill;
	}

	public int getRenderAnimation() {
		if (renderAnimation == -1) {
			return player.getRenderAnimation();
		}
		return renderAnimation;
	}

	public void setRenderAnimation (int renderID) {
		this.renderAnimation = renderID;
	}

	public Render getRender() {
		return render;
	}

	public void setRender(Render render) {
		this.render = render;
		this.renderAnimation = -1;
	}
	//Select skin colour and gender.
	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
		this.set();
	}

	public void setNPCId(int id) {
		this.npcId = id;
		setRenderAnimation(NpcTypeList.list(id).renderTypeID);
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
