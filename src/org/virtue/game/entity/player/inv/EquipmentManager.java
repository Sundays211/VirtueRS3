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
package org.virtue.game.entity.player.inv;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.virtue.Virtue;
import org.virtue.cache.def.impl.EnumType;
import org.virtue.game.content.skills.StatType;
import org.virtue.game.content.social.clan.ClanSettingsAPI;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.var.VarBitTypeList;
import org.virtue.game.entity.player.var.VarKey;
import org.virtue.network.protocol.update.ref.Appearance.Gender;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.text.StringUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/10/2014
 */
public class EquipmentManager {
	
	public static final int CLAN_CAPE = 20708;
	
	public static final int CLAN_VEX = 20709;
	
	private static final byte[] CLAN_RECOL_SLOTS = { 0, 1, 2, 3 };
	
	private static final byte[] CLAN_RETEX_SLOTS = { 0, 1 };
	
	private static final Set<Integer> CUSTOMISABLE_CAPES = new HashSet<>(Arrays.asList(new Integer[]{ 20767, 20769, 20771, 32151, 32152, 32153 }));
	
	public static final byte SLOT_HAT = 0, SLOT_CAPE = 1, SLOT_AMULET = 2, SLOT_WEAPON = 3, SLOT_CHEST = 4, SLOT_OFFHAND = 5, SLOT_LEGS = 7, SLOT_HANDS = 9, SLOT_FEET = 10, SLOT_RING = 12, SLOT_ARROWS = 13, SLOT_AURA = 14, SLOT_POCKET = 15;
	
	private Player player;
	
	private EquipmentStyleOverride[] styleOverrides;
	
	private int[] slotOverrides;
	
	private boolean clanItemWorn = false;
	
	public EquipmentManager (Player player) {
		this.player = player;
		this.styleOverrides = new EquipmentStyleOverride[InvRepository.getInvCapacity(ContainerState.EQUIPMENT.getID())];
		this.slotOverrides = new int[this.styleOverrides.length];
		Arrays.fill(this.slotOverrides, -1);
	}
	
	/**
	 * Equips the specified item out of the player's inventory. 
	 * @param invSlot The slot in the player's backpack containing the item
	 * @return True if the item was equip successfully, false otherwise
	 */
	public boolean wearItem (int invSlot) {
		ItemContainer equipment = player.getInvs().getContainer(ContainerState.EQUIPMENT);
		ItemContainer backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
		Item item = backpack.get(invSlot);
		
		if (item == null) {
			return false;
		}
		
		int slot = item.getType().wearpos;
		int slot2 = item.getType().wearpos2;
		int slot3 = item.getType().wearpos3;		
		if (slot == -1) {
			player.getDispatcher().sendGameMessage("You cannot wear that item.");
			return false;
		}
		int invFreeSpace = backpack.freeSlots();
		if (slot2 != -1 && equipment.get(slot2) != null) {
			if (invFreeSpace < 1) {
				player.getDispatcher().sendGameMessage("You do not have enough space in your backpack to equip that item.");
				return false;
			} else {
				invFreeSpace--;
			}
		}
		if (slot3 != -1 && equipment.get(slot3) != null) {
			if (invFreeSpace < 1) {
				player.getDispatcher().sendGameMessage("You do not have enough space in your backpack to equip that item.");
				return false;
			} else {
				invFreeSpace--;
			}
		}
		Item oldItem = equipment.swap(item, slot);
		int oldSlot = slot;
		if (slotOverrides[slot] != -1) {
			oldSlot = slotOverrides[slot];
			oldItem = equipment.clearSlot(oldSlot);
			slotOverrides[slot] = -1;			
		}
		backpack.set(invSlot, oldItem);
		if (oldItem != null) {
			handleRemoveEvent(oldItem, oldSlot);
		}
		
		if (slot2 != -1) {
			slotOverrides[slot2] = slot;
			oldItem = equipment.clearSlot(slot2);
			if (oldItem != null) {
				backpack.add(oldItem);
				handleRemoveEvent(oldItem, slot2);
			}
		}
		if (slot3 != -1) {
			slotOverrides[slot3] = slot;
			oldItem = equipment.clearSlot(slot3);
			if (oldItem != null) {
				backpack.add(oldItem);
				handleRemoveEvent(oldItem, slot3);
			}
		}
		
		handleWearEvent(item, slot);//Process any onwear events
		player.getAppearance().refresh();//Refresh the player model
		player.getInvs().updateContainer(ContainerState.EQUIPMENT, item.getType().wearpos, slot2, slot3);
		player.getInvs().sendContainer(ContainerState.BACKPACK);
		return true;
	}
	
	/**
	 * Processes any events that need to be triggered when the item is equipped
	 * @param item The item equipped
	 * @param slot The position in which the item was equipped
	 */
	private void handleWearEvent (Item item, int slot) {
		styleOverrides[slot] = null;
		if (item.getId() == CLAN_CAPE) {
			styleOverrides[slot] = new EquipmentStyleOverride(CLAN_CAPE, slot);
			clanItemWorn = true;
		} else if (item.getId() == CLAN_VEX) {
			styleOverrides[slot] = new EquipmentStyleOverride(CLAN_VEX, slot);
			clanItemWorn = true;
		} else if (slot == SLOT_CAPE && CUSTOMISABLE_CAPES.contains(item.getId())) {
			styleOverrides[slot] = new EquipmentStyleOverride(item.getId(), slot);
			updateCapeOverrides();
		}
	}
	
	/**
	 * Processes any events that need to be triggered when the item is removed
	 * @param item The item removed
	 * @param slot The position in which the item was removed from
	 */
	private void handleRemoveEvent (Item item, int slot) {
		int slot2 = item.getType().wearpos2;
		int slot3 = item.getType().wearpos3;
		if (slot2 != -1) {
			slotOverrides[slot2] = -1;
		}
		if (slot3 != -1) {
			slotOverrides[slot3] = -1;
		}
		styleOverrides[slot] = null;
		
		player.getInvs().updateContainer(ContainerState.EQUIPMENT, slot, slot2, slot3);
	}
	
	public void refresh (boolean isLogin) {
		ItemContainer equipment = player.getInvs().loadContainer(ContainerState.EQUIPMENT);
		for (int slot=0;slot<slotOverrides.length;slot++) {
			Item item = equipment.get(slot);
			if (item == null) {
				continue;
			}
			if (isLogin) {
				handleWearEvent(item, slot);
			}
			if (item.getType().wearpos2 != -1) {
				slotOverrides[item.getType().wearpos2] = slot;
			}
			if (item.getType().wearpos3 != -1) {
				slotOverrides[item.getType().wearpos3] = slot;
			}
		}
		if (clanItemWorn) {
			updateClanOverride();
		}
	}
	
	/**
	 * Checks if the player is wearing the item.
	 * @param itemId The item id.
	 * @return {@code True} if so.
	 */
	public boolean isWearing(int itemId) {
		return isWearing(itemId, ItemTypeList.list(itemId).wearpos);
	}
	
	/**
	 * Checks if the player is wearing the item.
	 * @param itemId The item id.
	 * @param slot The equipment slot.
	 * @return {@code True} if so.
	 */
	public boolean isWearing(int itemId, int slot) {
		return getWornId(slot) == itemId;
	}
	
	/**
	 * Gets a worn item.
	 * @param slot The slot.
	 * @return The item.
	 */
	public Item getWorn(int slot) {
		return player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slot);
	}
	
	/**
	 * Gets a worn item.
	 * @param slot The equipment slot.
	 * @return The worn item ID, or -1 if no item is worn in the specified slot.
	 */
	public int getWornId(int slot) {
		Item item = getWorn(slot);
		if (item == null) {
			return -1;
		}
		return item.getId();
	}
	
	/**
	 * Removes the specified equipped item, and places it in the player's inventory. 
	 * Checks that the player has enough space for the item (otherwise it returns false and does not continue)
	 * @param slot The slot to remove the item from
	 * @param itemId The id of the item to remove. This should be equal to the item currently in the slot
	 * @return True if the item was successfully removed, false if something prevented it from being moved.
	 */
	public boolean removeItem (int slot, int itemId) {
		Item item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(slot);
		if (item == null || item.getId() != itemId || player.getInvs().getContainer(ContainerState.BACKPACK).freeSlots() < 1) {
			return false;
		}
		
		handleRemoveEvent(item, slot);

		int[] addedTo = player.getInvs().getContainer(ContainerState.BACKPACK).add(item);
		player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(slot);
		player.getAppearance().refresh();
		player.getInvs().updateContainer(ContainerState.EQUIPMENT, slot);
		player.getInvs().updateContainer(ContainerState.BACKPACK, addedTo);		
		return true;
	}

	/**
	 * Checks whether or not the specified item can be worn
	 * @param item The item to check
	 * @return True if the item can be worn, false otherwise.
	 */
	public boolean isEquipable (Item item) {
		return item.getType().wearpos != -1;
	}
	
	public EquipmentStyleOverride getOverride (int slot) {
		return styleOverrides[slot];
	}
	
	public void setOverride (EquipmentStyleOverride styleOverride) {
		this.styleOverrides[styleOverride.getEquipSlot()] = styleOverride;
	}
	
	public boolean meetsEquipRequirements(Item item) {
		for (int i=0;i<6;i+=2) {
			StatType skill = StatType.getById(item.getType().getParam(749+i, -1));
			if (skill == null) {
				return true;
			} else {
				int level = item.getType().getParam(750+i, 0);
				if (player.getSkills().getBaseLevel(skill) < level) {
					String skillName = skill.getName();
					String skillPart = StringUtility.startsWithVowel(skillName) ? "an " : "a "+skillName;
					player.getDispatcher().sendGameMessage("You need to have "+skillPart+" level of "
							+ level + " to equip this item.");
					return false;
				}
			}
		}
		return true;
	}
	
	public void returnBorrowedItem () {
		if (player.getVars().getVarValue(VarKey.Player.LOAN_FROM_PLAYER) != null
				&& player.getVars().getVarValue(VarKey.Player.LOAN_FROM_PLAYER) instanceof Player) {
			Player owner = (Player) player.getVars().getVarValue(VarKey.Player.LOAN_FROM_PLAYER);
			if (owner.exists()) {
				owner.getVars().setVarValueInt(VarKey.Player.LOAN_TO_PLAYER, -1);
				owner.getDispatcher().sendGameMessage(player.getName()+" has returned the item "+(Gender.MALE.equals(player.getAppearance().getGender()) ? "he" : "she")+" borrowed from you.");
				owner.getDispatcher().sendGameMessage("You may retrieve it from your Returned Items box by speaking to a banker.");
			}
		}		
	}
	
	public boolean destroyBorrowedItems () {
		ItemContainer equipment = player.getInvs().getContainer(ContainerState.EQUIPMENT);
		for (int slot=0; slot<equipment.getSize(); slot++) {
			Item item = equipment.get(slot);
			if (item != null && item.getType().lenttemplate != -1) {
				equipment.clearSlot(slot);
				player.getInvs().updateContainer(ContainerState.EQUIPMENT, slot);
				player.getAppearance().refresh();
				return true;
			}
		}
		ItemContainer backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
		for (int slot=0; slot<backpack.getSize(); slot++) {
			Item item = backpack.get(slot);
			if (item != null && item.getType().lenttemplate != -1) {
				backpack.clearSlot(slot);
				player.getInvs().updateContainer(ContainerState.BACKPACK, slot);
				return true;
			}
		}
		
		ItemContainer bank = player.getInvs().getContainer(ContainerState.BANK);
		if (bank == null){
			return false;
		}
		for (int slot=0; slot<bank.getSize(); slot++) {
			Item item = bank.get(slot);
			if (item == null) {
				break;
			}
			if (item.getType().lenttemplate != -1) {
				bank.clearSlot(slot);
				player.getInvs().updateContainer(ContainerState.BANK, slot);
				return true;
			}
		}
		return false;
	}
	
	public void updateCapeOverrides () {
		if (styleOverrides[SLOT_CAPE] == null ) {
			return;
		}
		if (CUSTOMISABLE_CAPES.contains(styleOverrides[SLOT_CAPE].getObjId())) {
			short[] colours = new short[4];
			int col1 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_1);
			int col2 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_2);
			int col3 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_3);
			int col4 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_4);
			colours[0] = col1 == 0 ? -322 : (short) col1;
			colours[1] = col2 == 0 ? -336 : (short) col2;
			colours[2] = col3 == 0 ? -350 : (short) col3;
			colours[3] = col4 == 0 ? -2541 : (short) col4;
			styleOverrides[SLOT_CAPE].setRecol(colours, CLAN_RECOL_SLOTS);
		}
	}
	
	public void updateClanOverride () {
		boolean updateCape = false;
		boolean updateVex = false;
		if (styleOverrides[SLOT_CAPE] != null 
				&& styleOverrides[SLOT_CAPE].getObjId() == CLAN_CAPE) {
			updateCape = true;
		}
		if (styleOverrides[SLOT_WEAPON] != null 
				&& styleOverrides[SLOT_WEAPON].getObjId() == CLAN_VEX) {
			updateVex = true;
		}
		if (!updateCape && !updateVex) {
			return;
		}
		
		ClanSettingsAPI clanSettings = Virtue.getInstance().getClans().getSettings();
		if (player.getClanHash() == 0L) {
			if (updateCape) {
				styleOverrides[SLOT_CAPE].setRecol(null, null);
				styleOverrides[SLOT_CAPE].setRetex(null, null);
				player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(SLOT_CAPE);
			}
			if (updateVex) {
				styleOverrides[SLOT_WEAPON].setRecol(null, null);
				styleOverrides[SLOT_WEAPON].setRetex(null, null);
				player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(SLOT_WEAPON);
			}
		} else {
			short[] clanColours = new short[4];
			Object col1 = clanSettings.getVarValue(player.getClanHash(), VarKey.ClanSetting.LOGO_1_COL);
			Object col2 = clanSettings.getVarValue(player.getClanHash(), VarKey.ClanSetting.LOGO_2_COL);
			Object col3 = clanSettings.getVarValue(player.getClanHash(), VarKey.ClanSetting.PRIMARY_COL);
			Object col4 = clanSettings.getVarValue(player.getClanHash(), VarKey.ClanSetting.SECONDARY_COL);
			clanColours[0] = col1 == null ? 6716 : ((Integer) col1).shortValue();
			clanColours[1] = col2 == null ? 6716 : ((Integer) col2).shortValue();
			clanColours[2] = col3 == null ? -22986 : ((Integer) col3).shortValue();
			clanColours[3] = col4 == null ? -26154 : ((Integer) col4).shortValue();
			if (updateCape) {
				styleOverrides[SLOT_CAPE].setRecol(clanColours, CLAN_RECOL_SLOTS);
			}
			if (updateVex) {
				styleOverrides[SLOT_WEAPON].setRecol(clanColours, CLAN_RECOL_SLOTS);
			}
			short[] clanTextures = new short[2];
			int logo1slot = clanSettings.getVarBitValue(player.getClanHash(), VarBitTypeList.list(VarKey.ClanSetting.LOGO_1_SLOT));
			int logo2slot = clanSettings.getVarBitValue(player.getClanHash(), VarBitTypeList.list(VarKey.ClanSetting.LOGO_2_SLOT));
			EnumType textures = EnumTypeList.list(3685);
			int logo1 = textures.getValueInt(logo1slot);
			int logo2 = textures.getValueInt(logo2slot);
			clanTextures[0] = logo1 == -1 ? 735 : (short) logo1;
			clanTextures[1] = logo2 == -1 ? 642 : (short) logo2;
			if (updateCape) {
				styleOverrides[SLOT_CAPE].setRetex(clanTextures, CLAN_RETEX_SLOTS);
			}
			if (updateVex) {
				styleOverrides[SLOT_WEAPON].setRetex(clanTextures, CLAN_RETEX_SLOTS);
			}
		}
		
	}
	
	public enum WearPos {
		HAT(0),
		CAPE(1),
		AMULET(2),
		WEAPON(3),
		TOP(4),
		OFFHAND(5),
		LEGS(7),
		HANDS(9),
		FEET(10),
		RING(12),
		QUIVER(13),
		AURA(14),
		POCKET(15);
		
		private int slot;
		
		WearPos (int id) {
			this.slot = id;
		}
		
		public int getSlot () {
			return slot;
		}
	}

	
}
