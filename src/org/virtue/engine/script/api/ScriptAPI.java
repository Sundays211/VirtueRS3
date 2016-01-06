/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.engine.script.api;

import java.util.Iterator;

import org.virtue.Constants;
import org.virtue.cache.config.enumtype.EnumType;
import org.virtue.cache.def.impl.ItemType;
import org.virtue.cache.def.impl.LocType;
import org.virtue.cache.def.impl.NpcType;
import org.virtue.cache.def.impl.StructType;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.content.exchange.ExchangeOffer;
import org.virtue.game.content.social.clan.ClanChannelAPI;
import org.virtue.game.content.social.clan.ClanSettingsAPI;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatMode;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.event.PlayerActionHandler;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.node.Node;
import org.virtue.game.node.ServerNode;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.game.world.region.Tile;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
public interface ScriptAPI {
	
	/**
	 * Gets the current name of the specified entity
	 * @param entity The entity
	 * @return The name
	 */
	public String getName (Entity entity);
	
	/**
	 * Gets the name of the specified entity with formatting (i.e. titles)
	 * @param entity The entity
	 * @return The formatted name
	 */
	public String getFormattedName (Entity entity);
	
	/**
	 * Gets the user hash of the player with the specified display name
	 * @param name The display name
	 * @return The user hash, or null if no player exists
	 */
	public Long getUserHash (String name);
	
	/**
	 * Gets the user hash of the specified player
	 * @param player The player
	 * @return The user hash
	 */
	public Long getUserHash (Player player);
	
	/**
	 * Gets the current display name of the player with the specified hash, or null if no player exists
	 * @param userHash The hash of the player to look up
	 * @return The display name, or null if the player does not exist.
	 */
	public String getName (Long userHash);
	
	/**
	 * Sets the display name of the player with the specified user hash
	 * @param userHash The hash of the player to look up
	 * @param desiredName The new display name
	 * @return True if the name was set, false otherwise
	 */
	public boolean setDisplayName (Player setBy, Long userHash, String desiredName);
	
	/**
	 * Gets the base 37 hash of the specified name
	 * @param name The name to hash
	 * @return The resulting hash
	 */
	public Long getBase37Hash(String name);
	
	/**
	 * Gets the name from the specified base 37 hash
	 * @param hash The hash
	 * @return The resulting name
	 */
	public String fromBase37Hash(Long hash);
	
	/**
	 * Returns whether the specified player holds administrative rights in the server
	 * @param player The player
	 * @return True if the player has admin rights, false otherwise
	 */
	public boolean isAdmin (Player player);
	
	/**
	 * Gets the account type for the specified account
	 * @param userHash The user hash of the account
	 * @return The account type ID, or -1 if the account does not exist.
	 */
	public int getAccountType (Long userHash);
	
	/**
	 * Gets the account type of the specified player
	 * @param player The {@link Player} object for the account
	 * @return The account type ID.
	 */
	public int getAccountType (Player player);
	
	/**
	 * Gets the rights associated with the specified account type
	 * @param type The account type ID
	 * @return The rights associated with the given account type, or -1 if the account does not exist.
	 */
	public int getRights (int type);
	
	/**
	 * Sets the account type of the specified player.
	 * @param changedBy The player performing the account change (used for logging and verification)
	 * @param userHash The user hash
	 * @param type The account type ID, specified by the {@link PrivilegeLevel} enum
	 */
	public void setAccountType (Player changedBy, Long userHash, int type);
	
	/**
	 * Gets the world instance
	 * @return
	 */
	public World getWorld();
	
	/**
	 * Gets the lobby instance
	 * @return
	 */
	public Lobby getLobby();
	
	/**
	 * Gets the player in the game world with the specified user hash
	 * @param userHash The user hash
	 * @return The player, or null if the player is not in the world.
	 */
	public Player getWorldPlayerByHash (Long userHash);
	
	/**
	 * Gets the player in the specified game world at the specified index
	 * @param world The game world
	 * @param index The index (pid) to lookup
	 * @return The player, or null if no player exists at the given index
	 */
	public Player getWorldPlayerByIndex (World world, int index);
	
	public NPC getWorldNpcByIndex (World world, int index);
	
	/**
	 * Returns the node ID of the specified server
	 * @param server The server
	 * @return The node ID
	 */
	public int getNodeId (ServerNode server);
	
	/**
	 * Returns the number of players currently connected to the specified server
	 * @param server The server node (world or lobby) to fetch the player count from
	 * @return The number of players on the server
	 */
	public int getPlayerCount (ServerNode server);
	
	/**
	 * Returns an iterator used to loop over the players currently connected to the specified server
	 * @param server The server node (world or lobby) to fetch player data from
	 * @return An iterator for the server player list 
	 */
	public Iterator<Player> getPlayerIterator (ServerNode server);
	
	/**
	 * Returns an iterator used to loop over the NPCs currently loaded on the specified world
	 * @param world The world to fetch NPC data from
	 * @return An iterator for the world NPC list 
	 */
	public Iterator<NPC> getNpcIterator (World world);
	
	/**
	 * Gets the current server cycle (number of ticks since the server was started.
	 * @return The current server cycle.
	 */
	public int getServerCycle();
	
	/**
	 * Kicks the specified player from the server
	 * @param player The player to kick.
	 */
	public void kickPlayer (Player player);
	
	public int getId (Node node);
	
	/**
	 * Opens the specified widget in the central widget frame. 
	 * @param player The player
	 * @param widgetID The id of the widget to open
	 * @param alwaysOpen True if the widget should not close when the cross is pressed, false otherwise
	 * @return True if the widget was opened, false otherwise
	 */
	public boolean openCentralWidget (Player player, int widgetID, boolean alwaysOpen);
	
	/**
	 * Opens a widget as a sub of the overlay widget (id=1477)
	 * @param player The player
	 * @param frameType The HUD slot to open in. This is the slot ID used in enum 7716
	 * @param widgetID The id of the widget to open
	 * @param alwaysOpen True if the widget should not close normally, false otherwise
	 * @return True if the widget was opened, false otherwise
	 */
	public boolean openOverlaySub (Player player, int frameType, int widgetID, boolean alwaysOpen);
	
	/**
	 * Opens a widget as a sub in the provided widget frame
	 * @param player The player
	 * @param parentID The interface ID of the parent widget
	 * @param parentSlot The component ID of the parent widget
	 * @param widgetID The ID of the widget to open
	 * @param alwaysOpen Set to true to prevent the widget from closing when the "closeAllWidgets" code is called
	 * @return True if the widget was opened, false otherwise
	 */
	public boolean openWidget (Player player, int parentID, int parentSlot, int widgetID, boolean alwaysOpen);
	
	/**
	 * Closes all active widgets which are not specified as "alwaysOpen"
	 * @param player The player
	 */
	public void closeCentralWidgets (Player player);
	
	/**
	 * Closes the specified overlay frame
	 * @param player The player
	 * @param frameType The hud slot to close.
	 * @param handleClose If set to false, the "onClose" script will not be run.
	 */
	public void closeOverlaySub (Player player, int frameType, boolean handleClose);
	
	/**
	 * Closes the specified widget
	 * @param player The player
	 * @param parentID The id of the parent interface
	 * @param parentSlot The slot in which the interface is located
	 */
	public void closeWidget (Player player, int parentID, int parentSlot);
	
	/**
	 * Returns the ID of the interface currently displayed as the central widget
	 * @param player The player
	 * @return The ID of the attached interface, or -1 if none exists
	 */
	public int getCentralWidget (Player player);
	
	/**
	 * Returns the ID of the interface attached as a sub to the specified overlay
	 * @param player The player
	 * @param frameType The hud slot
	 * @return The ID of the attached interface, or -1 if none exists
	 */
	public int getOverlaySub (Player player, int frameType);
	
	/**
	 * Returns the ID of the interface attached as a sub to the specified parent
	 * @param player The player
	 * @param parentId The parent interface ID
	 * @param componentId The parent component ID
	 * @return The ID of the attached interface, or -1 if none exists
	 */
	public int getWidgetSub (Player player, int parentId, int componentId);
	
	/**
	 * Sets whether the specified interface component is hidden.
	 * @param player The player
	 * @param widgetID The interface ID
	 * @param componentID The component ID
	 * @param hidden True to hide the component, false to make it visible
	 */
	public void hideWidget (Player player, int widgetID, int componentID, boolean hidden);
	
	public void setWidgetText (Player player, int widgetID, int componentID, String text);
	
	public void setWidgetEvents (Player player, int widgetID, int componentID, int from, int to, int events);
	
	public Long getClanHash (Player player);
	
	public ClanChannelAPI getClanChannels ();
	
	public ClanSettingsAPI getClanSettings ();
	
	/**
	 * Gets the specified friends chat data for the player
	 * @param player The player
	 * @param dataType The data type, as specified in {@link org.virtue.game.content.social.friendchat.FriendChatDataType}
	 * @return The value
	 */
	public Object getFriendChatData(Player player, int dataType);
	
	/**
	 * Sets the specified friends chat data for the player to the specified value
	 * @param player The player
	 * @param dataType The data type, as specified in {@link org.virtue.game.content.social.friendchat.FriendChatDataType}
	 * @param value The data value.
	 */
	public void setFriendChatData(Player player, int dataType, Object value);
	
	/**
	 * Returns the {@link EnumType} for the specified enum ID.
	 * Note that enumTypes are referred to as "cs2 maps" in some servers
	 * @param enumID The id of the enum to lookup
	 * @return The enumType, or null if none were found.
	 */
	public EnumType getEnumType (int enumID);
	
	/**
	 * Returns the value of the {@link EnumType} with the specified key
	 * @param enumId The id of the enum to lookup
	 * @param key The key to lookup
	 * @return The value linked to the specified key or the default value if no key was found
	 */
	public Object getEnumValue (int enumId, int key);
	
	/**
	 * Returns the size of the given enum
	 * @param enumId The id of the enum to lookup
	 * @return The enum size, or -1 if the enum does not exist
	 */
	public int getEnumSize (int enumId);
	
	/**
	 * Gets the {@link StructType} for the specified struct ID.
	 * Note that structTypes are referred to as "general maps" in some servers
	 * @param structID The id of the struct to lookup
	 * @return The structType, or null if none were found.
	 */
	public StructType getStructType (int structID);
	
	/**
	 * Gets the paramater of the specified {@link StructType}
	 * @param structId The ID of the struct to lookup
	 * @param paramType The param to get
	 * @return The struct param value or default value if the struct does not contain the given param
	 * @throws IllegalArgumentException If an invalid structId or paramType is specified
	 */
	public Object getStructParam(int structId, int paramType) throws IllegalArgumentException;
	
	public LocType getLocType (int locTypeID);
	
	public LocType getLocType (SceneLocation location);
	
	/**
	 * Gets the transformed/morphed location type, based on the value of variables the player has.
	 * This method is used by transformable locations which appear differently to different players, such as farming patches.
	 * @param player The player
	 * @param baseID The id of the base location
	 * @return The transformed locType, or the locType of the base if the location cannot be transformed.
	 */
	public LocType getLocType (Player player, int baseID);
	
	public boolean itemExists (int itemID);
	
	public ItemType getItemType (int itemID);
	
	public ItemType getItemType (Item item);
	
	/**
	 * Gets the name of the given item
	 * @param itemId The ID of the item to lookup
	 * @return The name
	 */
	public String getItemName(int itemId);
	
	/**
	 * Gets the name of the given item
	 * @param item The item to lookup
	 * @return The name
	 */
	public String getItemName(Item item);
		
	/**
	 * Gets the description (examine text) for the given item
	 * @param itemId The ID of the item to lookup
	 * @return The description
	 */
	public String getItemDesc(int itemId);
	
	/**
	 * Gets the description (examine text) for the given item
	 * @param itemType The ItemType of the item to lookup
	 * @return The description
	 */
	public String getDesc(ItemType itemType);
	
	public String getItemDesc(Item item);
	
	/**
	 * Gets the current grand exchange price of the given item
	 * @param itemId The ID of the item to lookup
	 * @return The grand exchange value, or -1 if the item isn't tradable on the exchange
	 */
	public int getExchangeCost(int itemId);
	
	public int getExchangeCost(Item item);
	
	public NpcType getNpcType (int npcID);
	
	public NpcType getNpcType (NPC npc);
	
	public boolean addCarriedItem (Player player, int itemID, int amount);
	
	public int delCarriedItem (Player player, int itemID, int amount);
	
	public int delCarriedItem (Player player, int itemID, int amount, int slot);
	
	public int carriedItemTotal (Player player, int itemID);
	
	public Item getItem (Player player, int invId, int slot);
	
	/**
	 * Gets the item in the specified slot in the player's inventory
	 * @param player The player
	 * @param invName The inventory to get the item from. See {@link org.virtue.game.entity.player.inv.ContainerState} for the names of valid containers
	 * @param slot The slot to check
	 * @return The {@link Item} in the slot, or null if no item exists
	 */
	public Item getItem (Player player, String invName, int slot);
	
	public boolean addItem (Player player, int invId, int itemID, int amount);
	
	/**
	 * Adds an item to the player's inventory
	 * @param player The player
	 * @param inv The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the names of valid containers
	 * @param itemID The id of the item to add
	 * @param amount The amount of the item to add
	 */
	public void addItem (Player player, String inv, int itemID, int amount);
	
	/**
	 * Replaces an item in the player's inventory with a new item.
	 * This should be used with care, as it deletes the old item without warning and can cause issues in some inventories (such as shops and banks).
	 * @param player The player
	 * @param invName The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the names of valid containers
	 * @param slot The slot to set
	 * @param itemID The id of the new item to add
	 * @param amount The number of items to add
	 */
	public void setInvSlot (Player player, String invName, int slot, int itemID, int amount);
	
	/**
	 * Replaces an item in the player's inventory with a new item.
	 * This should be used with care, as it deletes the old item without warning and can cause issues in some inventories (such as shops and banks).
	 * @param player The player
	 * @param invId The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid containers
	 * @param slot The slot to set
	 * @param itemID The id of the new item to add
	 * @param amount The number of items to add
	 */
	public void setInvSlot (Player player, int invId, int slot, int itemId, int amount);
		
	public int delItem (Player player, int invId, int itemID, int amount);
	
	public int delItem (Player player, String container, int itemID, int amount);

	public int delItem (Player player, int invId, int itemID, int amount, int slot);
	
	/**
	 * Removes an item of the specified type from the player's inventory
	 * @param player The player
	 * @param invName The inventory to delete the item from. See {@link org.virtue.game.entity.player.inv.ContainerState} for the names of valid containers
	 * @param itemID The id of the item to delete
	 * @param amount The number of items to delete
	 * @param slot The prefered slot to delete from
	 * @return The number of items actually removed
	 */
	public int delItem (Player player, String invName, int itemID, int amount, int slot);
	
	public int itemTotal (Player player, int invId, int itemID);
	
	/**
	 * Counts the number of items held by the player in the specified inventory
	 * @param player The player
	 * @param container The inventory to check. See {@link org.virtue.game.entity.player.inv.ContainerState} for the names of valid containers
	 * @param itemID The type of items to count
	 * @return The number of items of the specified id held in the specified container
	 */
	public int itemTotal (Player player, String container, int itemID);
	
	/**
	 * Counts the number of empty slots in the specified inventory
	 * @param player The player.
	 * @param containerID The inventory to check. 
	 * @return The number of free slots
	 */
	public int freeSpaceTotal (Player player, int invId);
	
	public int defaultItemTotal (Player player, int invId, int itemID);
	
	public int invCapacity (Player player, int invId);
	
	/**
	 * @param player
	 * @param offhand
	 * @return
	 */
	public Item getWeapon(Player player, boolean offhand);
	
	public boolean containerReady(Player player, int invId);	
	
	/**
	 * Combat Mode
	 * @return 
	 */
	public CombatMode getMode(Player player, CombatMode mode);
	
	/**
	 * Loads the specified inventory and sends it to the player
	 * @param player The player
	 * @param invId The ID of the inventory to send. 
	 */
	public void sendInv (Player player, int invId);

	/**
	 * Sends the specified container to another player. Mainly used for trade.
	 * @param player The player who owns the container
	 * @param target The player to send the container to
	 * @param invName The inventory to send. 
	 */
	public void sendInvTo(Player player, Player target, int invId);
	
	public void clearContainer (Player player, int invId);
	
	public void unloadContainer (Player player, int invId);
	
	/**
	 * Triggers a client script to be run on the player's client
	 * @param player The player
	 * @param scriptID The id of the script to run
	 * @param params The paramaters to pass to the script. This should be an array containing only strings and integers.
	 */
	public void runClientScript (Player player, int scriptID, Object... params);
	
	/**
	 * Gets the int value of the player variable (varp) with the specified key
	 * @param player The player
	 * @param key The id of the variable to get
	 * @return The variable value, or null if the value has not yet been set
	 */
	public Object getVarp (Player player, int key);
	
	/**
	 * Sets the value of the player variable (varp) with the specified key
	 * @param player The player
	 * @param key The id of the variable to set
	 * @param value The value to change to
	 */
	public void setVarp (Player player, int key, Object value);
	
	/**
	 * Increases the value of a player variable by the specified amount.
	 * Providing a negative amount will decrease the value
	 * @param player The player
	 * @param key The id of the variable to increment
	 * @param amount The amount to increment by
	 */
	public void incrementVarp (Player player, int key, int amount);
	
	/**
	 * Gets a part of a variable.
	 * Note that this method will fail if the base variable isn't retained by the server (client variables) or isn't yet supported.
	 * @param player The player
	 * @param key The id of the varbit to get
	 * @return The varbit value
	 */
	public int getVarBit (Player player, int key);
	
	public boolean setVarBit (Player player, int key, int value);
	
	public void incrementVarBit (Player player, int key, int value);
	
	/**
	 * Sets the specified client variable for the player
	 * @param player The player
	 * @param key The ID of the client variable
	 * @param value The new value
	 */
	public void setVarc (Player player, int key, Object value);
	
	/**
	 * Returns the value of the specified clan setting variable
	 * @param player The player who's clan to lookup the settings variable from
	 * @param key The ID of the variable to lookup
	 * @return The variable value, or null if no variable exists or the player is not in a clan.
	 */
	public Object getVarClanSetting (Player player, int key);
	
	/**
	 * Sets the value of the specified clan setting variable.
	 * Note that the specified player must hold a rank of admin or above in their clan for this method to work
	 * @param player The player who's clan to set the variable of
	 * @param key The ID of the variable to change
	 * @param value The new value of the variable
	 * @return True if the variable was changed, false otherwise
	 */
	public boolean setVarClanSetting (Player player, int key, Object value);
	
	/**
	 * Gets the stat ID for the given name. This method is case-insensitive.
	 * @param name The stat name
	 * @return The ID, or -1 if no stat exists with the specified name
	 */
	public int getStatByName (String name);
	
	/**
	 * Gets the current level of the specified stat (eg 74 in 74/99)
	 * @param player The player
	 * @param statId The ID of the stat to get the level of
	 * @return The current stat level, or -1 if no stat exists with the given ID
	 */
	public int getStatLevel (Player player, int statId);
	
	/**
	 * Sets the specified stat to the specified level (note: this does not effect the base level, ie y/x where x is base)
	 * @param player The player
	 * @param statId The ID of the stat to set the level of
	 * @param level The desired level
	 */
	public void setStatLevel (Player player, int statId, int level);
	
	
	/**
	 * Returns the level of a player in the stat. This level is based only on the amount of experience the player has; it is not affected by temporary boosts.
	 * @param player The player
	 * @param skill The ID of the stat.
	 * @return The base stat level
	 */
	public int getBaseLevel (Player player, int statId);
	
	/**
	 * Adds experience to the player's skill.
	 * @param player The player
	 * @param skill The id of the skill to add xp to.
	 * @param xp The amount of xp to add. You should use only positive values, otherwise this method can behave unexpectedly.
	 * @param boostable Whether bonus xp can be applied to this xp gain. Should be false for one-off xp gains (xp lamps, quest rewards, etc)
	 */
	public void addExperience (Player player, int statId, double xp, boolean boostable);
	
	/**
	 * Temporarily increases the player's stat by the specified amount
	 * @param player The player
	 * @param skill The id of the stat to boost
	 * @param amount The number of levels to boost by
	 */
	public void boostStat (Player player, int statId, int amount);
	
	/**
	 * Resets the specified stat to its base level
	 * @param player The player
	 * @param stat The ID of the stat to reset
	 */
	public void resetStat (Player player, int statId);
	
	/**
	 * Restores the lifepoints of the specified entity to full
	 * @param entity The entity to restore
	 */
	public void restoreLifePoints (Entity entity);
	
	/**
	 * Sends an unfiltered game message to the player
	 * @param player The player
	 * @param message The message to send
	 */
	public void sendMessage (Player player, String message);
	
	/**
	 * Sends a message of the specified type to the player
	 * @param player The player
	 * @param message The message to send
	 * @param channel The type of the message
	 */
	public void sendMessage (Player player, String message, int channel);
	
	/**
	 * Sends a filtered game message to the player.
	 * @param player The player
	 * @param message The message to send
	 */
	public void sendFilterMessage (Player player, String message);
	
	/**
	 * Sends a message to the player's developer console
	 * @param player The player
	 * @param message The message to send
	 */
	public void sendConsoleMessage (Player player, String message);
	
	/**
	 * Sets the handler for the next input the player enters. This includes strings, counts, colour pickers, and the general resume_p (which is used in most dialogs)
	 * @param player The player
	 * @param handler The function for handling the input
	 */
	public void setInputHandler (Player player, InputEnteredHandler handler);
	
	/**
	 * Opens a dialog prompting the player to enter a string
	 * @param player The player
	 * @param message The dialog request message
	 * @param callback The function to run when the string has been entered.
	 */
	public void requestString (Player player, String message, InputEnteredHandler callback);
	
	/**
	 * Opens a dialog prompting the player to enter a player name
	 * @param player The player
	 * @param message The dialog request message
	 * @param callback The function to run when the string has been entered.
	 */
	public void requestName (Player player, String message, InputEnteredHandler callback);
	
	public void requestCount (Player player, String message, InputEnteredHandler callback);
	
	public void requestMulti (Player player, String message, String[] options, int[] steps, InputEnteredHandler callback);
	
		
	public void setAction (Player player, PlayerActionHandler action);
	
	/**
	 * Initiates a dialog with the player
	 * @param player The player
	 * @param dialog The name of the dialog to start
	 */
	public void openDialog (Player player, String dialog);
	
	/**
	 * Prevents the player from moving for a number of ticks
	 * @param player The player
	 * @param duration The number of ticks to pause for
	 */
	public void pausePlayer (Player player, int duration);
	
	/**
	 * Checks whether the player is currently unable to move
	 * @param player The player
	 * @return False if the player is able to move, true otherwise
	 */
	public boolean isPaused (Player player);
	
	/**
	 * Runs a task on a worker thread. Should be used for particularly intensive tasks where disrupting the main thread is not desireable.
	 * @param task The task to run
	 */
	public void executeTask (Runnable task);
	
	/**
	 * Checks whether the player's gender is female or male
	 * @param player The player
	 * @return True if the player is female, false if they are male.
	 */
	public boolean isFemale (Player player);
	
	/**
	 * Gets the style used by the player in a slot. Used for checking hairstyle, beard, torso, legs, boots, and arms.
	 * Note that this method, along with the other player style/colour methods, checks the "temporary" style rather than the actual one. See {@link startStyleEdit()} for more information. 
	 * @param player The player
	 * @param slot The slot to check
	 * @return The style, or -1 if one is not set.
	 */
	public int getPlayerKit (Player player, int slot);
	
	public void setPlayerKit (Player player, int slot, int style);
	
	public int getPlayerColour (Player player, int slot);
	
	public void setPlayerColour (Player player, int slot, int colour);
	
	/**
	 * Initiates the style edit sequence. 
	 * This copied the player's current styles and colours into a temporary buffer which can be modified and "tried out" without affecting the originals.
	 * Calling {@link #applyPlayerStyles(Player) applyPlayerStyles()} will cause the temporary styles to replace the old ones, while {@link #clearStyleEdit(Player) clearStyleEdit()} will revert to the originals.
	 * @param player The player
	 */
	public void startStyleEdit (Player player);
	
	public void applyPlayerStyles (Player player);
	
	public void clearStyleEdit (Player player);
	
	/**
	 * Sets the render base for the specified player
	 * @param player The player
	 * @param renderId The desired render animation
	 */
	public void setRenderAnim (Player player, int renderId);
	
	public void refreshEquipment (Player player);
	
	public Player getInteractionTarget (Player player);
	
	public void clearInteractionTarget (Player player);
	
	/**
	 * Checks whether the player has accepted their last trade/challenge offer recently.
	 * Since there is not a varp for this, it must be tracked using a hard-coded field within the player object.
	 * @param player The player.
	 * @return True if the player has accepted their last trade offer, false otherwise
	 */
	public boolean tradeAccepted (Player player);
	
	public void setTradeAccepted (Player player, boolean accepted);
	
	public ExchangeOffer getExchangeOffer (Player player, int exchange, int slot);
	
	public void sendExchangeOffer (Player player, int exchange, int slot, boolean isSell, int itemID, int amount, int price);
	
	public void abortExchangeOffer (Player player, int exchange, int slot);
	
	public boolean exchangeOfferFinished (Player player, int exchange, int slot);
	
	public void clearExchangeOffer (Player player, int exchange, int slot);
	
	public void runAnimation (Entity entity, int animationID);
	
	public void clearAnimation (Entity entity);
	
	/**
	 * Queues a spot (aka graphics/gfx) on an entity.
	 * @param entity The entity
	 * @param slot The slot to use. This should be between 0 and 4.
	 * @param id The spotType id (aka gfx id)
	 */
	public void queueSpot (Entity entity, int slot, int id);
	
	public void queueSpot (Entity entity, int slot, int id, int height, int speed, int rotation);
	
	/**
	 * Tells an entity to face the specified coordinates
	 * @param entity The entity
	 * @param coords The coords to face
	 */
	public void faceCoords (Entity entity, Tile coords);
	
	public void forceMovement (Entity entity, Tile t1, int delay1, Tile t2, int delay2, int direction);
	
	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to teleport
	 * @param coords The destination coordinates
	 * @return True if the teleport was successful, false otherwise
	 */
	public boolean teleportEntity (Entity entity, Tile coords);
	
	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to teleport
	 * @param x The new x-coordinate of the entity
	 * @param y The new y-coordinate of the entity
	 * @param z The new z-coordinate of the entity
	 * @return True if the teleport was successful, false otherwise
	 */
	public boolean teleportEntity (Entity entity, int x, int y, int z);
	
	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to move
	 * @param level The level/plane to move the entity to
	 * @param squareX The x-coordinate of the map square to move onto
	 * @param squareY The y-coordinate of the map square to move onto
	 * @param localX The local x tile within the map square to move onto
	 * @param localY The local y tile within the map square to move onto
	 * @return
	 */
	public boolean teleportEntity (Entity entity, int level, int squareX, int squareY, int localX, int localY);
	
	/**
	 * Shifts the entity by the specified amount
	 * @param entity The entity to move
	 * @param xOff The number of x tiles to move by
	 * @param yOff The number of y tiles to move by
	 * @param zOff The number of planes to move by
	 */
	public void teleportEntityBy (Entity entity, int xOff, int yOff, byte zOff);
	
	/**
	 * Moves the specified entity to an adjacent tile
	 * @param entity The entity to move
	 */
	public void moveAdjacent (Entity entity);
	
	/**
	 * Moves the specified entity to the specified coordinates
	 * @param entity The entity to move
	 * @param destX The destination x-coord
	 * @param destY The destination y-coord
	 */
	public void moveTo (Entity entity, int destX, int destY);
	
	public void moveTo (Entity entity, int destX, int destY, Runnable onTarget);
	
	public void moveTo (Entity entity, Node dest);
	
	public void moveTo (Entity entity, Node dest, Runnable onTarget);
	
	/**
	 * Gets the coordinates for the specified game node
	 * @param node The game node
	 * @return The current coords of the node
	 */
	public Tile getCoords (Node node);
	
	/**
	 * Gets the x-coord of the specified game node
	 * @param node The game node
	 * @return The x-coord
	 */
	public int getCoordX (Node node);
	
	/**
	 * Gets the y-coord of the specified game node
	 * @param node The game node
	 * @return The y-coord
	 */
	public int getCoordY (Node node);
	
	/**
	 * Gets the level of the specified game node
	 * @param node The game node
	 * @return The level
	 */
	public int getCoordLevel (Node node);
	
	/**
	 * Gets the current tile for the specified entity
	 * @param entity The entity
	 * @return The current tile of the entity
	 */
	public Tile getTile (Entity entity);
	
	/**
	 * Gets the x-coord of the specified tile
	 * @param tile The tile
	 * @return The x-coord
	 */
	public int getCoordX (Tile tile);
	
	/**
	 * Gets the y-coord of the specified tile
	 * @param tile The tile
	 * @return The y-coord
	 */
	public int getCoordY (Tile tile);
	
	/**
	 * Gets the level of the specified tile
	 * @param tile The tile
	 * @return The level
	 */
	public int getCoordLevel (Tile tile);
	
	/**
	 * Gets the map square x-coord of the specified tile
	 * @param tile The tile
	 * @return The map square x-coord
	 */
	public int getSquareX (Tile tile);
	
	/**
	 * Gets the map square y-coord of the specified tile
	 * @param tile The tile
	 * @return The map square y-coord
	 */
	public int getSquareY (Tile tile);
	
	/**
	 * Gets the region ID of the specified tile
	 * @param tile The tile
	 * @return The region ID
	 */
	public int getRegionId (Tile tile);
	
	/**
	 * Gets the coordinate from the specified components
	 * @param x The x-component of the coordinate
	 * @param y The y-component of the coordinate
	 * @param level The level-component of the coordinate
	 * @return The coordinate
	 */
	public Tile getCoords (int x, int y, int level);
	
	/**
	 * Gets the coordinate offset by the specified values
	 * @param coords The base coordinates
	 * @param x The amount to offset the x-coord by
	 * @param y The amount to offset the y-coord by
	 * @param level The amount to offset the level-coord by
	 * @return The new coordinate
	 */
	public Tile offsetCoords (Tile coords, int xOff, int yOff, byte levelOff);
	
	public Region getRegion (int regionID);
	
	/**
	 * Gets the region in which the given coordinates lie
	 * @param coords The coordinates
	 * @return The region in which the coordinates lie
	 */
	public Region getRegion (Tile coords);
	
	/**
	 * Drops an item on the ground at the specified coordinates.
	 * @param coords The coords to drop the item at
	 * @param itemId The ID of the item to drop
	 * @param amount The number of items to add to the drop pile
	 * @param removalDelay The number of game ticks before the item is removed.
	 */
	public void dropItem (Tile coords, int itemId, int amount, int removalDelay);
	
	/**
	 * Removes an item which was dropped on the ground
	 * @param coords The coords of the dropped item
	 * @param itemId The ID of the item to remove
	 * @return The number of items in the removed stack
	 */
	public int removeDroppedItem (Tile coords, int itemId);
	
	public Object getRandomChoice (Object[] objects);
	
	/**
	 * Creates a new {@link SceneLocation} at the provided tile with the specified data.
	 * Note that this method does not add the location to the region; this must be done separately
	 * @param id The locType ID of the new location
	 * @param coords The coordinates on which to spawn the location
	 * @param type The node type of the location
	 * @param rotation The rotation
	 * @return The newly created SceneLocation.
	 */
	public SceneLocation createLocation (int id, Tile coords, int type, int rotation);
	
	public SceneLocation createLocation (int id, int x, int y, int z, int type, int rotation);
	
	/**
	 * Adds the specified location to the map. The location will not be removed until either the server restarts or it is manually removed.
	 * @param loc The location to add
	 */
	public void spawnLocation (SceneLocation loc);
	
	/**
	 * Adds the specified location to the map
	 * @param loc The location to add
	 * @param removalDelay The number of ticks before the location is destroyed
	 */
	public void spawnLocation (SceneLocation loc, int removalDelay);
	
	/**
	 * Retrieves the location of the specified node type at the specified coordinates on the map
	 * @param coords The coordinates of the location
	 * @param type The node type of the location
	 * @return The {@link SceneLocation} of the specified type at the specified coordinates, or null if no location exists
	 */
	public SceneLocation getLocationByNodeType (Tile coords, int type);
	
	/**
	 * Retrieves the location of the specified node type at the specified position on the map
	 * @param posX The x-tile of the location
	 * @param posY The y-tile of the location
	 * @param plane The plane of the location
	 * @param type The node type of the location
	 * @return The {@link SceneLocation} of the specified type at the specified coordinates, or null if no location exists
	 */
	public SceneLocation getLocationByNodeType (int posX, int posY, int plane, int type);
	
	/**
	 * Transforms the specified location to another location with the specified ID.
	 * NB: "Location" was previously known as "Object", but was changed for consistency with the proper naming scheme
	 * @param loc The location to transform
	 * @param newID The locType ID of the new location
	 * @param revertDelay The number of game ticks before the location reverts
	 */
	public void transformLoc (SceneLocation loc, int newID, int revertDelay);
	
	/**
	 * Removes the specified location from the map.
	 * @param loc The location to destroy
	 */
	public void destroyLoc (SceneLocation loc);
	
	/**
	 * Creates a new NPC. NOTE: This method doesn't add the NPC to the world: to add the NPC, use {@link #spawnNpc(NPC)}
	 * @param id The NPC type ID
	 * @param coords The spawn coordinates
	 * @param respawn True if the npc will respawn if/when killed, false otherwise
	 * @return The new NPC instance
	 */
	public NPC createNpc (int id, Tile coords, boolean respawn);
	
	/**
	 * Transforms the specified NPC to another NPC of the provided type ID
	 * @param npc The npc to transform
	 * @param newID The npcType ID of the new npc.
	 */
	public void transformNpc (NPC npc, int newID);
	
	/**
	 * Adds the npc to the world
	 * @param npc The npc to add
	 */
	public void spawnNpc (NPC npc);
	
	/**
	 * Despawns the specified npc. If "respawnDelay" is not -1, it will respawn after the numer of ticks specified 
	 * @param npc The NPC to despawn
	 * @param respawnDelay The number of ticks before the NPC respawns
	 */
	public void despawnNpc (NPC npc, int respawnDelay);
	
	/**
	 * Gets the number of days since "Server Day Zero" (Specified in {@link Constants})
	 * @return The number of days since server day zero
	 */
	public int getServerDay ();
	
	/**
	 * Gets the number of elapsed ticks since the day began. Note that the day begins at 00:00:00 UTC
	 * @return The number of ticks since 00:00 UTC
	 */
	public int getTickInDay ();
	
	/**
	 * Formats the specified number of ticks as either hours, minutes, or seconds
	 * @param ticks The time, in 600ms ticks
	 * @return A string representing the formatted time.
	 */
	public String getFormattedTime (int ticks);
	
	/**
	 * Gets the player's run energy level
	 * @param player The player
	 * @return A number between 0 and 100 representing the player's current run energy level
	 */
	public int getRunEnergy (Player player);
	
	public void setRunEnergy (Player player, int energy);
	
	/**
	 * Logs a debug message to the appropriate logging framework.
	 * @param message The desired debug message
	 */
	public void logDebug (String message);
	
	/**
	 * Logs an error message to the appropriate logging framework.
	 * @param message The desired error message
	 */
	public void logError (String message);

}
