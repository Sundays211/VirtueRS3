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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 19, 2014
 */
public enum ContainerState {	
    ADDY_WEAPON_SHOP(121, true, false),
    ALISON_ELMSHAPERS_FLETCH_SHOP(658, true, false),
    AUBURYS_RUNE_SHOP(5, true, false), 
    AUBURYS_FREE_STOCK(557, true, false),
    BOBS_AXES(1, true, false),
	BOBS_AXES_FREE_STOCK(554, true, false),
    BRIANS_ARCHERY_SUPPLIES(250, true, false),
    CULINAROMANCER_CHEST(375, true, false), //RFD Completed
    CULINAROMANCER_CHEST_FOOD(365, true, false),
    DAGAS_SHOP(251, true, false),
    DEALGAS_SHOP(579, true, false),
    DIANGOS_TOY_STORE(137, true, false),
    DIANGOS_TOY_STORE_MEMBERS(609, true, false),
    DOMMIKS_CRAFTING_STORE_P2P(27, true, false),
    FALADOR_GEN_STORE(13, true, false),
    GAIUS_TWOHANDED_SHOP(39, true, false),
    GNOME_SHOPKEEPERS_ARMOURY_SHOP(655, true, false),
	GNOME_FREE_SHOP(657, true, false),
    HEROES_QUEST_DRAGON_SHOP(45, true, false),
    HOLIDAY_CHEST(453, true, false),
    HORVIKS_ARMOUR_SHOP(2, true, false),
    IFFIE_CUSTOME_SHOP_MALE(683, true, false),
	IFFIE_CUSTOME_SHOP_FEMALE(684, true, false),
    JATIXS_HERBLORE_SHOP(40, true, false),
    LOST_CITY_DRAGON_SHOP(36, true, false),
    LOUIS_ARMOURED_LEGS(12, true, false),
    LOWES_ARCHERY_SHOP(7, true, false),
    LOWES_ARCHERY_FREE_STOCK(556, true, false),
    LUMBRIDGE_FISH_STORE(562, true, false),
	LUMBRIDGE_FISH_STORE_FREE(561, true, false),
    LUMBRIDGE_GEN_STORE(3, true, false),
	LUMBRIDGE_GEN_STORE_FREE_STOCK(553, true, false),
    MAMI_RIMBA(663, true, false),
    MARTIN_THWAITS_LOST_N_FOUND(455, true, false),
    NAFF_KNOCKOFF_STAVES(744, true, false),
    NURMOFS_PICKAXE_SHOP(68, true, false),
    OLD_EVENT_SHOP(448, true, false),
    OZIACHS_ARMOUR(35, true, false),
    POLYPORE_SHOP(622, true, false),
    RANAELS_SUPER_SKIRT_STORE(16, true, false),
    ROMMIKS_CRAFTY_SUPPLIES(146, true, false),
    SCAVVOS_RUNE_STORE(33, true, false),
    SEDDU_SHOP(344, true, false),
    SLAYER_SHOP_1(633, true, false),
    SPIKED_GAUNTLETS_SLAYER(634, true, false),
	SUMMONING_SHOP_1(628, true, false),
	SUMMONING_SHOP_FREE(629, true, false),
	THESSALIAS_FINE_SHOP(8, true, false),
    TZHAAR_CITY_SHOP(325, true, false),
    VALAINES_SHOP_OF_CHAMPIONS(18, true, false),
	VARROCK_GEN_STORE(4, true, false),
    VARROCK_SWORD_SHOP(6, true, false),
	VARROCK_SWORD_FREE_STOCK(555, true, false),
	ZAFF_STAFF_SHOP(9, true, false),
	
	/**
	 * The player's current trade offer. Also used for the price checker screen.
	 * Contains 28 slots.
	 */
	TRADE(90, false, false),
	
	/**
	 * The player's current backpack inventory. Contains 28 slots.
	 */
	BACKPACK(93, false, true),
	
	/**
	 * The player's current worn equipment. Contains 19 slots. Each slot is associated with a particular equipment type
	 */
	EQUIPMENT(94, false, true),
	
	/**
	 * The player's bank. 
	 * Note that there should not be any empty slots in this container between the first item and the last item, so call {@link ItemContainer#shift(boolean) ItemContainer.shift(true)} every time you remove an item.
	 */
	BANK(95, true, true),
	EXCHANGE_OFFER_0(517, true, true),
	EXCHANGE_OFFER_1(518, true, true),
	EXCHANGE_OFFER_2(519, true, true),
	EXCHANGE_OFFER_3(520, true, true),
	EXCHANGE_OFFER_4(521, true, true),
	EXCHANGE_OFFER_5(522, true, true),
    EXCHANGE_OFFER_6(781, true, true),	
	EXCHANGE_OFFER_7(782, true, true),
	EXCHANGE_RETURN_0(523, true, true),
	EXCHANGE_RETURN_1(524, true, true),
	EXCHANGE_RETURN_2(525, true, true),
	EXCHANGE_RETURN_3(526, true, true),
	EXCHANGE_RETURN_4(527, true, true),
	EXCHANGE_RETURN_5(528, true, true),
	EXCHANGE_RETURN_6(783, true, true),	
	EXCHANGE_RETURN_7(784, true, true),
             
	BEAST_OF_BURDEN(530, false, true),
	/**
	 * Contains the item the player currently has loaned out.
	 */
	LOAN_RETURN(540, false, true),
	LOAN_OFFER(541, false, false),
	/**
	 * The player's money pouch. Only has one slot, which contains the coins held by the player.
	 */
	MONEY_POUCH(623, false, true),
	/**
	 * Contains the items worn by the player being inspected
	 */
	PLAYER_INSPECT_EQUIPMENT(742, false, false);

	private int id;
	private boolean stackable;
	private boolean save;
	
	ContainerState (int id, boolean stackable, boolean save) {
		this.id = id;
		this.stackable = stackable;
		this.save = save;
	}
	
	public int getID () {
		return id;
	}
	
	public boolean alwaysStack () {
		return stackable;
	}
	
	public boolean rememberState () {
		return save;
	}
	
	public String getSerialName () {
		return name().toLowerCase();
	}
	
	public static ContainerState getById (int id) {
		for (ContainerState container : ContainerState.values()) {
			if (container.id == id) {
				return container;
			}
		}
		return null;
	}
}