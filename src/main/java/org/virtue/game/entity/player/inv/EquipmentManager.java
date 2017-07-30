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
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.objtype.ObjTypeCustomisation;
import org.virtue.config.util.StringUtility;
import org.virtue.config.vartype.bit.VarBitTypeList;
import org.virtue.game.content.clans.ClanSettingsAPI;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PlayerModel;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.entity.player.var.VarKey;

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
	
	private static final int[] CLAN_RECOL_SLOTS = { 0, 1, 2, 3 };
	
	private static final int[] CLAN_RETEX_SLOTS = { 0, 1 };
	
	private static final Set<Integer> CUSTOMISABLE_CAPES = new HashSet<>(Arrays.asList(new Integer[]{ 20767, 20769, 20771, 32151, 32152, 32153 }));
	
	public static final byte SLOT_HAT = 0, SLOT_CAPE = 1, SLOT_AMULET = 2, SLOT_WEAPON = 3, SLOT_CHEST = 4, SLOT_OFFHAND = 5, SLOT_LEGS = 7, SLOT_HANDS = 9, SLOT_FEET = 10, SLOT_RING = 12, SLOT_ARROWS = 13, SLOT_AURA = 14, SLOT_POCKET = 15;
	
	private Player player;
	
	private PlayerModel model;
	
	private int[] slotOverrides;
	
	private boolean clanItemWorn = false;
	
	public EquipmentManager (Player player) {
		this.player = player;
		this.model = player.getModel();
		this.slotOverrides = new int[19];
		Arrays.fill(this.slotOverrides, -1);
	}
	
	/**
	 * Equips the specified item out of the player's inventory. 
	 * @param invSlot The slot in the player's backpack containing the item
	 * @return True if the item was equip successfully, false otherwise
	 */
	public boolean wearItem (int invSlot) {
		Inventory equipment = player.getInvs().getContainer(ContainerState.EQUIPMENT);
		Inventory backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
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
		player.getModel().refresh();//Refresh the player model
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
		model.setWornObject(slot, item.getId(), Virtue.getInstance().getConfigProvider().getObjTypes());
		model.setObjCustomisation(slot, null);
		if (item.getId() == CLAN_CAPE) {
			this.model.setObjCustomisation(slot, new ObjTypeCustomisation(item.getType()));
			clanItemWorn = true;
		} else if (item.getId() == CLAN_VEX) {
			this.model.setObjCustomisation(slot, new ObjTypeCustomisation(item.getType()));
			clanItemWorn = true;
		} else if (slot == SLOT_CAPE && CUSTOMISABLE_CAPES.contains(item.getId())) {
			this.model.setObjCustomisation(slot, new ObjTypeCustomisation(item.getType()));
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
		model.setWornObject(slot, -1, Virtue.getInstance().getConfigProvider().getObjTypes());
		model.setObjCustomisation(slot, null);
		
		player.getInvs().updateContainer(ContainerState.EQUIPMENT, slot, slot2, slot3);
	}
	
	public void refresh (boolean isLogin) {
		Inventory equipment = player.getInvs().loadContainer(ContainerState.EQUIPMENT);
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
		return isWearing(itemId, Virtue.getInstance().getConfigProvider().getObjTypes().list(itemId).wearpos);
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
		player.getModel().refresh();
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
	
	public boolean meetsEquipRequirements(Item item) {
		for (int i=0;i<6;i+=2) {
			Stat skill = Stat.getById(item.getType().getParam(749+i, -1));
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
	
	public void updateCapeOverrides () {
		if (CUSTOMISABLE_CAPES.contains(getWornId(SLOT_CAPE))) {
			short[] colours = new short[4];
			int col1 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_1);
			int col2 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_2);
			int col3 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_3);
			int col4 = player.getVars().getVarBitValue(VarKey.Bit.CAPE_COLOUR_4);
			colours[0] = col1 == 0 ? -322 : (short) col1;
			colours[1] = col2 == 0 ? -336 : (short) col2;
			colours[2] = col3 == 0 ? -350 : (short) col3;
			colours[3] = col4 == 0 ? -2541 : (short) col4;
			for (int slot=0;slot<CLAN_RECOL_SLOTS.length;slot++) {
				model.getObjCustomisation(SLOT_CAPE).setRecol(CLAN_RECOL_SLOTS[slot], colours[slot]);
			}
		}
	}
	
	public void updateClanOverride () {
		boolean updateCape = false;
		boolean updateVex = false;
		if (getWornId(SLOT_CAPE) == CLAN_CAPE) {
			updateCape = true;
		}
		if (getWornId(SLOT_WEAPON) == CLAN_VEX) {
			updateVex = true;
		}
		if (!updateCape && !updateVex) {
			return;
		}
		
		ClanSettingsAPI clanSettings = Virtue.getInstance().getClans().getSettings();
		if (player.getClanHash() == 0L) {
			if (updateCape) {
				model.setObjCustomisation(SLOT_CAPE, null);
				player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(SLOT_CAPE);
			}
			if (updateVex) {
				model.setObjCustomisation(SLOT_WEAPON, null);
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
				for (int slot=0;slot<CLAN_RECOL_SLOTS.length;slot++) {
					model.getObjCustomisation(SLOT_CAPE).setRecol(CLAN_RECOL_SLOTS[slot], clanColours[slot]);
				}				
			}
			if (updateVex) {
				for (int slot=0;slot<CLAN_RECOL_SLOTS.length;slot++) {
					model.getObjCustomisation(SLOT_WEAPON).setRecol(CLAN_RECOL_SLOTS[slot], clanColours[slot]);
				}
			}
			VarBitTypeList varBitTypeList = Virtue.getInstance().getConfigProvider().getVarBitTypes();
			short[] clanTextures = new short[2];
			int logo1slot = clanSettings.getVarBitValue(player.getClanHash(), varBitTypeList.list(VarKey.ClanSetting.LOGO_1_SLOT));
			int logo2slot = clanSettings.getVarBitValue(player.getClanHash(), varBitTypeList.list(VarKey.ClanSetting.LOGO_2_SLOT));
			EnumType textures = Virtue.getInstance().getConfigProvider().getEnumTypes().list(3685);
			int logo1 = textures.getValueInt(logo1slot);
			int logo2 = textures.getValueInt(logo2slot);
			clanTextures[0] = logo1 == -1 ? 735 : (short) logo1;
			clanTextures[1] = logo2 == -1 ? 642 : (short) logo2;
			if (updateCape) {
				for (int slot=0;slot<CLAN_RETEX_SLOTS.length;slot++) {
					model.getObjCustomisation(SLOT_CAPE).setRetex(CLAN_RETEX_SLOTS[slot], clanTextures[slot]);
				}
			}
			if (updateVex) {
				for (int slot=0;slot<CLAN_RETEX_SLOTS.length;slot++) {
					model.getObjCustomisation(SLOT_WEAPON).setRetex(CLAN_RETEX_SLOTS[slot], clanTextures[slot]);
				}
			}
		}
	}
}
