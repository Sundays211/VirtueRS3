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
package org.virtue.game.entity.player.widget;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
public enum WidgetState {

	/**
	 * Represents an open money pouch widget
	 */
	MONEY_POUCH_OPEN(0),
	
	/**
	 * Represents a closed money pouch widget
	 */
	MONEY_POUCH_CLOSED(0),
	
	/**
	 * Represents the confirm dialog widget.
	 */
	LOGOUT_WIDGET(26),
	
	/**
	 * Represents the confirm dialog widget.
	 */
	SWITCH_WIDGET(26),
	
	/**
	 * Represents the chat box widget.
	 */
	CHATBOX_WIDGET(137),
	
	/**
	 * Represents the trade chatbox widget.
	 */
	TRADE_CHATBOX_WIDGET(464),
	
	/**
	 * Represents the friends list widget.
	 */
	FRIENDS_LIST_WIDGET(550),
	
	/**
	 * Represents the ribbon menus widget.
	 */
	SUB_RIBBON_WIDGET(568),
	
	/**
	 * Represents the emotes widget.
	 */
	EMOTES_WIDGET(590),
	
	/**
	 * Represents the friend chat settings widget.
	 */
	FRIEND_CHAT_SETTINGS(1108),
	
	/**
	 * Represents the interface settings widget.
	 */
	INTERFACE_SETTINGS(1442),
	
	/**
	 * Represents the clan block widget.
	 */
	CLAN_WIDGET(1110),
	
	/**
	 * Represents the xp counter widget.
	 */
	EXPERIENCE_COUNTER_WIDGET(1215),
	
	/**
	 * Represents the xp conter settings widget.
	 */
	EXPERIENCE_COUNTER_SETTINGS_WIDGET(1214),
	
	/**
	 * Represents the active task widget.
	 */
	ACTIVE_TASK_WIDGET(1220),
	
	/**
	 * Represents the treasure hunter widget.
	 */
	TREASURE_HUNTER_BUTTON_WIDGET(1252),
	
	/**
	 * Represents the treasure hunter widget.
	 */
	TREASURE_HUNTER_SCREEN_WIDGET(1253),
	
	/**
	 * Represents the music player widget.
	 */
	MUSIC_PLAYER_WIDGET(1416),
	
	/**
	 * Represents the notes widget.
	 */
	NOTES_WIDGET(1417),
	
	/**
	 * Represents the world map widget.
	 */
	WORLDMAP_WIDGET(1422),
	
	/**
	 * Represents the friends chat block widget.
	 */
	FRIENDS_CHAT_WIDGET(1427),
	
	/**
	 * Represents the action bar widget.
	 */
	ACTION_BAR_WIDGET(1430),
	
	/**
	 * Represents the ribbon widget.
	 */
	RIBBON_WIDGET(1431),
	
	/**
	 * Represents the options menu widget.
	 */
	OPTIONS_MENU_WIDGET(1433),
	
	/**
	 * Represents the game play overlay.
	 */
	GAMEPLAY_OVERLAY(1443),
	
	/**
	 * Represents the defence abilities widget.
	 */
	DEFENCE_ABILITIES_WIDGET(1449),
	
	/**
	 * Represents the ranged abilities widget.
	 */
	RANGED_ABILITIES_WIDGET(1452),
	
	/**
	 * Represents the prayer abilities widget.
	 */
	PRAYER_ABILITIES_WIDGET(1458),
	
	/**
	 * Represents the melee abilities widget.
	 */
	MELEE_ABILITIES_WIDGET(1460),
	
	/**
	 * Represents the magic abilities widget.
	 */
	MAGIC_ABILITIES_WIDGET(1461),
	
	/**
	 * Represents the equipment widget.
	 */
	EQUIPMENT_WIDGET(1464),
	
	/**
	 * Represents the minimap widget.
	 */
	MINIMAP_WIDGET(1465),
	
	/**
	 * Represents the skills widget.
	 */
	SKILLS_WIDGET(1466),
	
	/**
	 * Represents the private chat widget.
	 */
	PRIVATE_CHAT_WIDGET(1467),
	
	/**
	 * Represents the guest clan chatbox widget.
	 */
	GUEST_CLAN_CHATBOX_WIDGET(1470),
	
	/**
	 * Represents the clan chat box widget.
	 */
	CLAN_CHATBOX_WIDGET(1471),
	
	/**
	 * Represents the friends chat box widget.
	 */
	FRIENDS_CHATBOX_WIDGET(1472),
	
	/**
	 * Represents the backpack widget.
	 */
	BACKPACK_WIDGET(1473),
	
	/**
	 * Represents the main interface used to built onto.
	 */
	ROOT_WIDGET(1477),
	
	/**
	 * Represents the settings overlay.
	 */
	SETTINGS_OVERLAY(1477),
	
	/**
	 * Represents the hero overlay.
	 */
	HERO_OVERLAY(1477),
	
	/**
	 * Represents the gear overlay.
	 */
	GEAR_OVERLAY(1477),
	
	/**
	 * Represents the adventures overlay.
	 */
	ADVENTURES_OVERLAY(1477),
	
	/**
	 * Represents the powers overlay.
	 */
	POWERS_OVERLAY(1477),
	
	/**
	 * Represents the community overlay.
	 */
	COMMUNITY_OVERLAY(1477),
	
	/**
	 * Represents the landscape widget.
	 */
	GAME_SCENE_WIDGET(1482),
	
	/**
	 * Represents the subscribe button widget
	 */
	SUBSCRIBE_WIDGET(1484),
	
	/**
	 * Represents the combat buffs widget.
	 */
	COMBAT_BUFFS_WIDGET(1485),
	
	/**
	 * Represents the bank widget.
	 */
	BANK_WIDGET(762),
	
	/**
	 * Represents the lodestone teleport widget.
	 */
	LODESTONE_WIDGET(1092),
	
	/**
	 * The widget used to select a product to make
	 */
	SELECT_PRODUCT_WIDGET(1371),
	
	/**
	 * The shop widget
	 */
	SHOP_WIDGET(1265),
	
	/**
	 * The Combat Settings Widget
	 */
	COMBAT_SETTINGS(1503), 
	
	/**
	 * The Cutscene Widget.
	 */
	CUTSCENE_WIDGET(548),
	
	/**
	 * The Widget for the Skilling Interface.
	 */
	SKILL_INTERFACE_WIDGET(1371),
	
	/**
	 * The Legacy Combat Tab Widget.
	 */
	LEGACY_COMBAT_TAB_WIDGET(1507), 
	
	/**
	 * The Hop Worlds Widget
	 */
	HOP_WORLDS_WIDGET(1587),
	
	/**
	 * The Price Checker Widget.
	 */
	PRICE_CHECKER_WIDGET(206), 
	
	/**
	 * The Quests List Widget.
	 */
	QUESTS_LIST_WIDGET(190);
	
	/**
	 * ID of the widget
	 */
	int id;
	
	WidgetState(int id) {
		this.id = id;
	}
	
	/**
	 * Returns the ID of the widget
	 * @return
	 */
	public int getID() {
		return id;
	}
	
}
