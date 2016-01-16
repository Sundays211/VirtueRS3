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
package org.virtue.game.entity.player.var;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/10/2014
 */
public class VarKey {
	
	public static class Bit {
		public static final int PRODUCT_SELECT_CAPACITY = 1002;
		public static final int PRODUCT_SELECT_AMOUNT = 1003;		
		
		public static final int CHAT_COLOUR_SELECTEDMODE = 24562;
		
		public static final int CHAT_COLOUR_FC = 1190;
		public static final int CHAT_COLOUR_CLAN = 1188;
		public static final int CHAT_COLOUR_GUEST_CLAN = 1191;
		public static final int CHAT_COLOUR_GROUP = 24560;
		public static final int CHAT_COLOUR_GROUP_TEAM = 24561;
		public static final int CHAT_COLOUR_TWITCH = 21371;
		
		public static final int BANK_TAB_2 = 280;
		public static final int BANK_TAB_3 = 281;
		public static final int BANK_TAB_4 = 282;
		public static final int BANK_TAB_5 = 283;
		public static final int BANK_TAB_6 = 284;
		public static final int BANK_TAB_7 = 285;
		public static final int BANK_TAB_8 = 286;
		public static final int BANK_TAB_9 = 287;
		
		public static final int SELECTED_BANK_TAB = 288;
		
		public static final int IF_LOCK_STATUS = 19925;
		public static final int IF_SLIM_STATUS = 19924;
		public static final int IF_HIDE_ON_LOCK_STATUS = 19928;
		
		public static final int SELECTED_OVERLAY = 18994;
		public static final int SELECTED_HERO_OVERLAY = 18995;
		public static final int SELECTED_GEAR_OVERLAY = 18996;
		public static final int SELECTED_POWERS_OVERLAY = 18997;
		public static final int SELECTED_ADVENTURES_OVERLAY = 18998;
		public static final int SELECTED_COMMUNITY_OVERLAY = 18999;
		
		public static final int SELECTED_CUSTOMISE_TYPE = 673;
		
		public static final int CUSTOM_APPERANCE_VISIBLE_COUNT = 686;
		
		public static final int MONEY_POUCH_OPEN = 1192;
		
		public static final int PLAYER_HITPOINTS = 1668;
		
		public static final int ACTION_BAR_LOCKED = 1892;
		
		public static final int MAKEOVER_STYLE_CATEGORY = 481;
		
		public static final int RIGHT_CLICK_REPORTING = 16564;
		
		public static final int HOUSE_BUILD_MODE = 1537;
		
		public static final int HOUSE_DOORS_OPEN = 1553;
		
		public static final int HOUSE_TELEPORT_SITE = 1552;
		
		public static final int GUIDANCE_SYSTEM_HINTS = 20924;
		
		public static final int HIDE_FAMILIAR_OPTIONS = 18564;
		
		public static final int ITEM_LOAN_TIME = 1047;
		
		public static final int SELECTED_CLAN_LOGO_1 = 8965;
		public static final int SELECTED_CLAN_LOGO_2 = 8966;
		
		public static final int CAPE_COLOUR_1 = 1039;
		public static final int CAPE_COLOUR_2 = 1040;
		public static final int CAPE_COLOUR_3 = 1041;
		public static final int CAPE_COLOUR_4 = 1042;
		
		public static final int TRADE_LOAN_TO_OFFER = 1046;
		public static final int TRADE_LOAN_FROM_OFFER = 1047;
		
		/**
		 * Represents the minimum value of an item required to trigger the lootbeam
		 */
		public static final int LOOTBEAM_ACTIVATION_VALUE = 21238;
		
		/**
		 * Represents the lootbeam used (0=rotate, 1=default, 2=rainbow, 3=christmas, 4=beach)
		 */
		public static final int LOOTBEAM_TYPE = 23261;
		
		/**
		 * Represents whether the lootbeam is enabled (1=enabled, 0=disabled)
		 */
		public static final int LOOTBEAM_ENABLED = 26778;
		
		public static final int PLAYER_INSPECT_STATUS = 26172;
		public static final int PLAYER_INSPECT_TITLE = 26173;
		
		public static final int PLAYER_INSPECT_LIFEPOINTS = 26128;		
		public static final int PLAYER_INSPECT_PRAYERPOINTS = 26130;
		
		public static final int PLAYER_INSPECT_ATTACK = 26071;
		public static final int PLAYER_INSPECT_ATTACK_BASE = 26072;
		public static final int PLAYER_INSPECT_CONSTITUTION = 26073;
		public static final int PLAYER_INSPECT_CONSTITUTION_BASE = 26074;
		public static final int PLAYER_INSPECT_MINING = 26075;
		public static final int PLAYER_INSPECT_MINING_BASE = 26076;
		public static final int PLAYER_INSPECT_STRENGTH = 26077;
		public static final int PLAYER_INSPECT_STRENGTH_BASE = 26078;
		public static final int PLAYER_INSPECT_AGILITY = 26079;
		public static final int PLAYER_INSPECT_AGILITY_BASE = 26080;
		public static final int PLAYER_INSPECT_SMITHING = 26081;
		public static final int PLAYER_INSPECT_SMITHING_BASE = 26082;		
		public static final int PLAYER_INSPECT_DEFENSE = 26083;
		public static final int PLAYER_INSPECT_DEFENSE_BASE = 26084;
		public static final int PLAYER_INSPECT_HERBLORE = 26085;
		public static final int PLAYER_INSPECT_HERBLORE_BASE = 26086;
		public static final int PLAYER_INSPECT_FISHING = 26087;
		public static final int PLAYER_INSPECT_FISHING_BASE = 26088;
		public static final int PLAYER_INSPECT_RANGED = 26089;
		public static final int PLAYER_INSPECT_RANGED_BASE = 26090;
		public static final int PLAYER_INSPECT_THIEVING = 26091;
		public static final int PLAYER_INSPECT_THIEVING_BASE = 26092;
		public static final int PLAYER_INSPECT_COOKING = 26093;
		public static final int PLAYER_INSPECT_COOKING_BASE = 26094;
		public static final int PLAYER_INSPECT_PRAYER = 26095;
		public static final int PLAYER_INSPECT_PRAYER_BASE = 26096;
		public static final int PLAYER_INSPECT_CRAFTING = 26097;
		public static final int PLAYER_INSPECT_CRAFTING_BASE = 26098;
		public static final int PLAYER_INSPECT_FIREMAKING = 26099;
		public static final int PLAYER_INSPECT_FIREMAKING_BASE = 26100;		
		public static final int PLAYER_INSPECT_MAGIC = 26101;
		public static final int PLAYER_INSPECT_MAGIC_BASE = 26102;
		public static final int PLAYER_INSPECT_FLETCHING = 26103;
		public static final int PLAYER_INSPECT_FLETCHING_BASE = 26104;
		public static final int PLAYER_INSPECT_WOODCUTTING = 26105;
		public static final int PLAYER_INSPECT_WOODCUTTING_BASE = 26106;
		public static final int PLAYER_INSPECT_RUNECRAFTING = 26107;
		public static final int PLAYER_INSPECT_RUNECRAFTING_BASE = 26108;
		public static final int PLAYER_INSPECT_SLAYER = 26109;
		public static final int PLAYER_INSPECT_SLAYER_BASE = 26110;
		public static final int PLAYER_INSPECT_FARMING = 26111;
		public static final int PLAYER_INSPECT_FARMING_BASE = 26112;		
		public static final int PLAYER_INSPECT_CONSTRUCTION = 26113;
		public static final int PLAYER_INSPECT_CONSTRUCTION_BASE = 26114;
		public static final int PLAYER_INSPECT_HUNTER = 26115;
		public static final int PLAYER_INSPECT_HUNTER_BASE = 26116;
		public static final int PLAYER_INSPECT_SUMMONING = 26117;
		public static final int PLAYER_INSPECT_SUMMONING_BASE = 26118;
		public static final int PLAYER_INSPECT_DUNGEONEERING = 26119;
		public static final int PLAYER_INSPECT_DUNGEONEERING_BASE = 26120;
		public static final int PLAYER_INSPECT_DIVINATION = 26121;
		public static final int PLAYER_INSPECT_DIVINATION_BASE = 26122;
		
		
		public static final int LOOT_INVENTORY_ENABLED = 27942;
		public static final int AREA_LOOT_ENABLED = 27943;
		public static final int LOOT_INVENTORY_RIGHTCLICK = 27961;
	}
	
	public static class Player {
		public static final int RUN_STATUS = 463;
		
		public static final int BANK_WITHDRAW_AMOUNT = 111;	
		public static final int BANK_DEPOSIT_AMOUNT = 3922;
		public static final int BANK_NOTE_WITHDRAW = 160;

		public static final int BONUS_ATTACK_XP = 3304;	
		public static final int BONUS_DEFENSE_XP = 3306;
		public static final int BONUS_STRENGTH_XP = 3305;
		public static final int BONUS_CONSTITUTION_XP = 3324;
		public static final int BONUS_RANGED_XP = 3308;
		public static final int BONUS_PRAYER_XP = 2850;
		public static final int BONUS_MAGIC_XP = 3307;
		public static final int BONUS_COOKING_XP = 3317;
		public static final int BONUS_WOODCUTTING_XP = 3313;
		public static final int BONUS_FLETCHING_XP = 3326;
		public static final int BONUS_FISHING_XP = 3316;
		public static final int BONUS_FIREMAKING_XP = 3315;
		public static final int BONUS_CRAFTING_XP = 3312;
		public static final int BONUS_SMITHING_XP = 3311;
		public static final int BONUS_MINING_XP = 3310;
		public static final int BONUS_HERBLORE_XP = 3327;
		public static final int BONUS_AGILITY_XP = 3325;
		public static final int BONUS_THIEVING_XP = 3322;
		public static final int BONUS_SLAYER_XP = 3319;
		public static final int BONUS_FARMING_XP = 3314;
		public static final int BONUS_RUNECRAFTING_XP = 3320;
		public static final int BONUS_HUNTER_XP = 3321;
		public static final int BONUS_CONSTRUCTION_XP = 3323;
		public static final int BONUS_SUMMONING_XP = 3309;
		public static final int BONUS_DUNGEONEERING_XP = 3318;
		public static final int BONUS_DIVINATION_XP = 3836;
		
		public static final int CHAT_COLOUR_PRIVATE = 457;	
		
		public static final int CHAT_EFFECTS_ENABLED = 456;
		
		public static final int CLAN_MEMBER_VAR = 1845;		
		public static final int CLAN_MEMBER_RANK = 1846;
		
		public static final int CLAN_COLOUR_1 = 2067;
		public static final int CLAN_COLOUR_2 = 2068;
		public static final int CLAN_COLOUR_3 = 2069;
		public static final int CLAN_COLOUR_4 = 2070;
		
		public static final int CURRENT_SHOP_INV = 304;
	
		public static final int PRODUCT_SELECT_CATEGORY = 1168;
		public static final int PRODUCT_SELECT_CATEGORY_SUB = 1169;
		public static final int PRODUCT_SELECT_ITEM = 1170;
		
		public static final int ACCEPT_AID = 459;
		public static final int ADRENALINE = 679;
		public static final int SPECIAL_BAR = 680;
		public static final int AUTO_RETALIATE_DISABLED = 462;
		
		public static final int LOAN_FROM_PLAYER = 428;
		public static final int LOAN_TO_PLAYER = 429;
		
		public static final int LOAN_FROM_TIME_REMAINING = 430;
		public static final int LOAN_TO_TIME_REMAINING = 431;
		
		public static final int PLAYER_INSPECT_MH_DAMAGE = 4964;
		public static final int PLAYER_INSPECT_OH_DAMAGE = 4965;
		public static final int PLAYER_INSPECT_A_DAMAGE = 4966;
		
		public static final int PLAYER_INSPECT_ARMOUR = 4975;
		
		public static final int PLAYER_INSPECT_MESSAGE = 4982;
		
		public static final int PLAYER_INSPECT_RENDER = 5005;
		
		public static final int PLAYER_INSPECT_ATTACK_XP = 4934;
		public static final int PLAYER_INSPECT_CONSTITUTION_XP = 4943;
		public static final int PLAYER_INSPECT_MINING_XP = 4952;
		public static final int PLAYER_INSPECT_STRENGTH_XP = 4935;
		public static final int PLAYER_INSPECT_AGILITY_XP = 4944;
		public static final int PLAYER_INSPECT_SMITHING_XP = 4953;		
		public static final int PLAYER_INSPECT_DEFENSE_XP = 4936;
		public static final int PLAYER_INSPECT_HERBLORE_XP = 4945;
		public static final int PLAYER_INSPECT_FISHING_XP = 4954;		
		public static final int PLAYER_INSPECT_RANGED_XP = 4937;
		public static final int PLAYER_INSPECT_THIEVING_XP = 4946;
		public static final int PLAYER_INSPECT_COOKING_XP = 4955;
		public static final int PLAYER_INSPECT_PRAYER_XP = 4938;
		public static final int PLAYER_INSPECT_CRAFTING_XP = 4947;
		public static final int PLAYER_INSPECT_FIREMAKING_XP = 4956;
		public static final int PLAYER_INSPECT_MAGIC_XP = 4939;
		public static final int PLAYER_INSPECT_FLETCHING_XP = 4948;
		public static final int PLAYER_INSPECT_WOODCUTTING_XP = 4957;
		public static final int PLAYER_INSPECT_RUNECRAFTING_XP = 4940;
		public static final int PLAYER_INSPECT_SLAYER_XP = 4949;
		public static final int PLAYER_INSPECT_FARMING_XP = 4958;
		
		public static final int PLAYER_INSPECT_CONSTRUCTION_XP = 4941;
		public static final int PLAYER_INSPECT_HUNTER_XP = 4950;
		public static final int PLAYER_INSPECT_SUMMONING_XP = 4959;
		public static final int PLAYER_INSPECT_DUNGEONEERING_XP = 4942;
		public static final int PLAYER_INSPECT_DIVINATION_XP = 4951;
	}
	
	public static class Client {
		public static final int BANK_TOTAL_SLOTS = 192;
		public static final int BANK_FREE_SLOTS = 1038;
		
		public static final int SELECTED_TOP_STYLE = 1010;
		
		public static final int SELECTED_HAIR_PRIMARY_COLOUR = 2017;
		public static final int SELECTED_HAIR_SECONDARY_COLOUR = 2018;
		
		public static final int TRADING_WITH_NAME = 2519;
		public static final int TRADE_WEALTH_OFFERED = 729;
		public static final int TRADE_WEALTH_RECEIVED = 697;
		
		public static final int PLAYER_INSPECT_NAME = 4669;
		public static final int PLAYER_INSPECT_MESSAGE = 4671;
		public static final int PLAYER_INSPECT_CLAN = 4672;
		
	}
	
	public static class ClanSetting {
		public static final int LOGO_1_COL = 16;
		public static final int LOGO_2_COL = 17;
		public static final int PRIMARY_COL = 18;
		public static final int SECONDARY_COL = 19;
		
		public static final int LOGO_1_SLOT = 8815;
		public static final int LOGO_2_SLOT = 8816;
	}
	
}
