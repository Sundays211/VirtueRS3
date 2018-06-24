
//NOTE: This should be kept in-sync with ContainerState.java
export enum Inv {
    ADDY_WEAPON_SHOP = 121,
    ALISON_ELMSHAPERS_FLETCH_SHOP = 658,
    AUBURYS_RUNE_SHOP = 5,
    AUBURYS_FREE_STOCK = 557,
	BLURBERRYS_BAR = 99,
    BOBS_AXES = 1,
	BOBS_AXES_FREE_STOCK = 554,
    BRIANS_ARCHERY_SUPPLIES = 250,
    CULINAROMANCER_CHEST = 375, //RFD Completed
    CULINAROMANCER_CHEST_FOOD = 365,
    DAGAS_SHOP = 251,
    DEALGAS_SHOP = 579,
    DIANGOS_TOY_STORE = 137,
    DIANGOS_TOY_STORE_MEMBERS = 609,
    DOMMIKS_CRAFTING_STORE_P2P = 27,
    FALADOR_GEN_STORE = 13,
	FUNCHS_FINE_GROCERIES = 88,
    GAIUS_TWOHANDED_SHOP = 39,
    GNOME_SHOPKEEPERS_ARMOURY_SHOP = 655,
	GNOME_FREE_SHOP = 657,
	GRAND_TREE_GROCERIES = 89,
    HEROES_QUEST_DRAGON_SHOP = 45,
    HOLIDAY_CHEST = 453,
    HORVIKS_ARMOUR_SHOP = 2,
    IFFIE_CUSTOME_SHOP_MALE = 683,
	IFFIE_CUSTOME_SHOP_FEMALE = 684,
    JATIXS_HERBLORE_SHOP = 40,
    LOST_CITY_DRAGON_SHOP = 36,
    LOUIS_ARMOURED_LEGS = 12,
    LOWES_ARCHERY_SHOP = 7,
    LOWES_ARCHERY_FREE_STOCK = 556,
    LUMBRIDGE_FISH_STORE = 562,
	LUMBRIDGE_FISH_STORE_FREE = 561,
    LUMBRIDGE_GEN_STORE = 3,
	LUMBRIDGE_GEN_STORE_FREE_STOCK = 553,
    MAMI_RIMBA = 663,
    MARTIN_THWAITS_LOST_N_FOUND = 455,
    NAFF_KNOCKOFF_STAVES = 744,
    NURMOFS_PICKAXE_SHOP = 68,
    OLD_EVENT_SHOP = 448,
    OZIACHS_ARMOUR = 35,
    POLYPORE_SHOP = 622,
    RANAELS_SUPER_SKIRT_STORE = 16,
	ROMETTIS_FINE_FASHIONS = 86,
    ROMMIKS_CRAFTY_SUPPLIES = 146,
    SCAVVOS_RUNE_STORE = 33,
    SEDDU_SHOP = 344,
    SLAYER_SHOP_1 = 633,
    SPIKED_GAUNTLETS_SLAYER = 634,
	SUMMONING_SHOP_1 = 628,
	SUMMONING_SHOP_FREE = 629,
	THESSALIAS_FINE_SHOP = 8,
    TZHAAR_CITY_SHOP = 325,
    VALAINES_SHOP_OF_CHAMPIONS = 18,
	VARROCK_GEN_STORE = 4,
    VARROCK_SWORD_SHOP = 6,
	VARROCK_SWORD_FREE_STOCK = 555,
	WYDINS_FOOD_STORE = 76,
	ZAFF_STAFF_SHOP = 9,

	/**
	 * The player's current trade offer. Also used for the price checker screen.
	 * Contains 28 slots.
	 */
	TRADE = 90,

	/**
	 * The player's current backpack inventory. Contains 28 slots.
	 */
	BACKPACK = 93,

	/**
	 * The player's current worn equipment. Contains 19 slots. Each slot is associated with a particular equipment type
	 */
	EQUIPMENT = 94,

	/**
	 * The player's bank.
	 * Note that there should not be any empty slots in this container between the first item and the last item, so call {@link ItemContainer#shift = boolean) ItemContainer.shift = true)} every time you remove an item.
	 */
	BANK = 95,
	EXCHANGE_OFFER_0 = 517,
	EXCHANGE_OFFER_1 = 518,
	EXCHANGE_OFFER_2 = 519,
	EXCHANGE_OFFER_3 = 520,
	EXCHANGE_OFFER_4 = 521,
	EXCHANGE_OFFER_5 = 522,
    EXCHANGE_OFFER_6 = 781,
	EXCHANGE_OFFER_7 = 782,
	EXCHANGE_RETURN_0 = 523,
	EXCHANGE_RETURN_1 = 524,
	EXCHANGE_RETURN_2 = 525,
	EXCHANGE_RETURN_3 = 526,
	EXCHANGE_RETURN_4 = 527,
	EXCHANGE_RETURN_5 = 528,
	EXCHANGE_RETURN_6 = 783,
	EXCHANGE_RETURN_7 = 784,

	BEAST_OF_BURDEN = 530,
	/**
	 * Contains the item the player currently has loaned out.
	 */
	LOAN_RETURN = 540,
	LOAN_OFFER = 541,
	/**
	 * The player's money pouch. Only has one slot, which contains the coins held by the player.
	 */
	MONEY_POUCH = 623,
	/**
	 * Contains the items worn by the player being inspected
	 */
	PLAYER_INSPECT_EQUIPMENT = 742
}
