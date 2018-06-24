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
import java.util.Map;

import org.virtue.Constants;
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.loctype.LocType;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.structtype.StructType;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.ExchangeOffer;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.event.PlayerActionHandler;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.node.Node;
import org.virtue.game.node.ServerNode;

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
	public boolean setDisplayName (Entity setBy, Long userHash, String desiredName);

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
	 * Checks whether this is a member's world
	 * @return True if this is a members world, false otherwise
	 */
	public boolean mapMembers();

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
	public Entity getWorldPlayerByHash (Long userHash);

	/**
	 * Gets the player in the specified game world at the specified index
	 * @param world The game world
	 * @param index The index (pid) to lookup
	 * @return The player, or null if no player exists at the given index
	 */
	public Entity getWorldPlayerByIndex (World world, int index);

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
	 * @param toLobby If true, the player will be kicked to the lobby. If false, they will be kicked to the login screen
	 */
	public void kickPlayer (Player player, boolean toLobby);

	public int getId (Node node);

	/**
	 * Legacy work-around so we can provide either a node or an id
	 * @param id
	 * @return
	 */
	public int getId (int id);

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

	/**
	 * Sets an object (item) on an interface component
	 * @param player The player
	 * @param widgetID The interface ID
	 * @param componentID The component ID
	 * @param objectId The object type ID to add to the interface
	 * @param num The number of objects in the stack
	 */
	public void setWidgetObject (Player player, int widgetID, int componentID, int objectId, int num);

	public void setWidgetEvents (Player player, int widgetID, int componentID, int from, int to, int events);

	public Long getClanHash (Player player);

	/**
	 * Gets the specified friends chat data for the player
	 * @param player The player
	 * @param dataType The data type, as specified in {@link org.virtue.game.content.friendchats.FriendChatDataType}
	 * @return The value
	 */
	public Object getFriendChatData(Player player, int dataType);

	/**
	 * Sets the specified friends chat data for the player to the specified value
	 * @param player The player
	 * @param dataType The data type, as specified in {@link org.virtue.game.content.friendchats.FriendChatDataType}
	 * @param value The data value.
	 */
	public void setFriendChatData(Player player, int dataType, Object value);

	/**
	 * Returns the value of the {@link EnumType} with the specified key
	 * Note that enumTypes are referred to as "cs2 maps" in some servers
	 * @param enumId The id of the enum to lookup
	 * @param key The key to lookup
	 * @return The value linked to the specified key or the default value if no key was found
	 */
	public Object getEnumValue (int enumId, int key);

	/**
	 * Returns the size of the given {@link EnumType}
	 * Note that enumTypes are referred to as "cs2 maps" in some servers
	 * @param enumId The id of the enum to lookup
	 * @return The enum size, or 0 if the enum does not exist
	 */
	public int getEnumSize (int enumId);

	/**
	 * Gets the paramater of the specified {@link StructType}
	 * Note that structTypes are referred to as "general maps" in some servers
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

	public ObjType getItemType (int itemID);

	public ObjType getItemType (Item item);

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
	public String getItemDesc(ObjType itemType);

	public String getItemDesc(Item item);

	/**
	 * Checks whether the specified item stacks in the player's inventory
	 * @param itemId The item to check
	 * @return True if the item stacks in the player's inventory, false otherwise
	 */
	public boolean itemStacks(int itemId);

	/**
	 * Gets the paramater of the specified {@link ObjType}
	 * @param itemId The ID of the item to lookup
	 * @param paramType The param to get
	 * @return The item param value or default value if the item does not contain the given parameter
	 * @throws IllegalArgumentException If an invalid itemId or paramType is specified
	 */
	public Object getItemParam(int itemId, int paramType);

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

	public boolean wearingItem(Player player, int itemID);

	/**
	 * Gets the item in the specified slot in the player's inventory
	 * @param player The player
	 * @param invName The inventory to get the item from. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid inventories
	 * @param slot The slot to check
	 * @return The {@link Item} in the slot, or null if no item exists
	 */
	public Item getItem (Player player, int invId, int slot);

	/**
	 * Gets the number of items in the specified item stack
	 * @param item The item to count
	 * @return The number of items
	 */
	public int getCount (Item item);

	/**
	 * Adds an item to the player's inventory
	 * @param player The player
	 * @param invId The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid inventories
	 * @param itemID The id of the item to add
	 * @param amount The amount of the item to add
	 */
	public void addItem (Player player, int invId, int itemID, int count);

	/**
	 * Inserts an item in the given slot within a player's inventory.
	 * All items in later slots will be shifted by one
	 * @param player The player
	 * @param invId The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid inventories
	 * @param slot The slot to insert the item into
	 * @param itemID The id of the item to insert
	 * @param count The amount of the item to insert
	 */
	public void insertItem (Player player, int invId, int slot, int itemID, int count);

	/**
	 * Replaces an item in the player's inventory with a new item.
	 * This should be used with care, as it deletes the old item without warning and can cause issues in some inventories (such as shops and banks).
	 * @param player The player
	 * @param invId The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid containers
	 * @param slot The slot to set
	 * @param itemID The id of the new item to add
	 * @param count The number of items to add
	 */
	public void setInvSlot (Player player, int invId, int slot, int itemId, int count);

	/**
	 * Removes an item from the player's inventory
	 * This should be used with care, as can cause issues in some inventories (such as shops and banks) which do not work properly with empty slots.
	 * @param player The player
	 * @param invId The inventory to clear the slot from. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid containers
	 * @param slot The slot to clear
	 */
	public void clearInvSlot (Player player, int invId, int slot);

	/**
	 * Replaces an item in the player's inventory with a new item.
	 * This should be used with care, as it deletes the old item without warning and can cause issues in some inventories (such as shops and banks).
	 * @param player The player
	 * @param invId The inventory to add the item into. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid containers
	 * @param slot The slot to set
	 * @param item The new item to add
	 */
	public void setInvSlot (Player player, int invId, int slot, Item item);

	public int delItem (Player player, int invId, int itemID, int count);

	/**
	 * Removes an item of the specified type from the player's inventory
	 * @param player The player
	 * @param invId The inventory to delete the item from. See {@link org.virtue.game.entity.player.inv.ContainerState} for the ids of valid inventories
	 * @param itemID The id of the item to delete
	 * @param amount The number of items to delete
	 * @param slot The prefered slot to delete from
	 * @return The number of items actually removed
	 */
	public int delItem (Player player, int invId, int itemID, int count, int slot);

	/**
	 * Counts the number of items held by the player in the specified inventory
	 * @param player The player
	 * @param invId The inventory to check.
	 * @param itemId The type of items to count
	 * @return The number of items of the specified id held in the specified container
	 */
	public int itemTotal (Player player, int invId, int itemId);

	/**
	 * Counts the number of empty slots in the specified inventory
	 * @param player The player.
	 * @param invId The inventory to check.
	 * @return The number of free slots
	 */
	public int freeSpaceTotal (Player player, int invId);

	public int defaultItemTotal (int invId, int itemID);

	public int invCapacity (int invId);

	public boolean containerReady(Player player, int invId);

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

	/**
	 * Removes all items currently in the specified inventory
	 * @param player The player to remove items from
	 * @param invId The inventory ID
	 */
	public void emptyInv (Player player, int invId);

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

	public int getVarBit (Item item, int key);

	public void setVarBit (Item item, int key, int value);

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
	 * Hits the entitiy for the specified number of lifepoints
	 * @param entity The entity to hit
	 * @param hitAmount The number of lifepoints to decrease their helth by
	 */
	public void hitEntity (Entity entity, int hitAmount);

	/**
	 * Restores the entities lifepoints by the specified amount. Displays a "heal" hitsplat.
	 * NOTE: This will only heal the entity up to its maximum lifepoints
	 * @param entity The entity to heal
	 * @param healAmount The number of lifepoints to heal by
	 */
	public void healEntity (Entity entity, int healAmount);

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

	public void requestMulti (Player player, String message, String[] options, int[] steps, InputEnteredHandler callback);

	public void setAction (Player player, PlayerActionHandler action);

	/**
	 * Stops the current movement for the player until unpaused.
	 * The player will automatically unpause once they proceed in any open dialogs.
	 * @param player The player
	 */
	public void pausePlayer (Player player);

	/**
	 * Prevents the entity from moving for a number of ticks
	 * @param entity The entity
	 * @param duration The number of game cycles to freeze the entity for
	 */
	public void freezeEntity (Entity entity, int duration);

	/**
	 * Check wether the specified entity is currently frozen
	 * @param entity the entity
     */
	public boolean isFrozen (Entity entity);

	/**
	 * Stops the entity, clearing all queued move steps & stopping any running animations
	 * @param entity
	 */
	public void stop (Entity entity);

	/**
	 * Interupts all currently running delayed tasks on the entity
	 * @param entity
	 */
	public void interrupt (Entity entity);

	/**
	 * Checks whether the player is currently unable to move
	 * @param player The player
	 * @return False if the player is able to move, true otherwise
	 */
	public boolean isPaused (Entity player);

	/**
	 * Runs a task on a worker thread. Should be used for particularly intensive tasks where disrupting the main thread is not desireable.
	 * @param task The task to run
	 */
	public void executeTask (Runnable task);

	/**
	 * Delays the execution of a task by the given number of server cycles.
	 * The task will be cancelled if interrupted (such as if the player moves) and task.run() will never be called.
	 * @param entity The entity to delay on
	 * @param task The task to run after the delay
	 * @param ticks The number of server cycles to delay by
	 */
	public void delay (Entity entity, Runnable task, int ticks);

	/**
	 * Delays the execution of a task by the given number of server cycles.
	 * @param entity The entity to delay on
	 * @param task The task to run after the delay
	 * @param ticks The number of server cycles to delay by
	 * @param interruptable If true, the task will be cancelled if interrupted (such as if the player moves)
	 * @param onInterrupt The function to run if the task is interrupted
	 */
	public void delay (Entity entity, Runnable task, int ticks, boolean interruptable, Runnable onInterrupt);

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

	public void refreshModel (Player player);

	public void refreshEquipment (Player player);

	public Entity getInteractionTarget (Player player);

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

	/**
	 * Sets the render base for the specified player
	 * @param player The player
	 * @param renderId The desired render animation
	 */
	public void setRenderAnim (Player player, int renderId);

	/**
	 * Resets the render base for the specified player to the default value
	 * @param player The player
	 */
	public void resetRenderAnim (Player player);

	public boolean runAnimation (Entity entity, int animId);

	public boolean runAnimation(Entity entity, int animationID, Runnable onComplete);

	/**
	 * Stops the currently running animation on the entity.
	 * If no animation is running, this method has no effect.
	 * @param entity The entity
	 */
	public void stopAnimation (Entity entity);

	public boolean isRunningAnim(Entity entity);

	/**
	 * Forces the specified message to appear above the head of the player
	 * @param player The player on which to display the given message
	 * @param message The message to display
	 * @param appearInChat True if the message should appear in the chatbox of players, false otherwise
	 */
	public void playerForceSay(Entity player, String message, boolean appearInChat);

	/**
	 * Forces the specified message to appear above the head of the entity
	 * @param entity The entity on which to display the given message
	 * @param message The message to display
	 */
	public void entitySay (Entity entity, String message);

	/**
	 * Sets the spot animation (aka graphics/gfx) at the specified slot on an entity.
	 * @param entity The entity
	 * @param slot The slot to use. This should be between 0 and 4.
	 * @param id The spotType id (aka gfx id)
	 */
	public void setSpotAnim (Entity entity, int slot, int id);

	public void setSpotAnim (Entity entity, int slot, int id, int height, int speed, int rotation);

	/**
	 * Clears the current spot animation at the specified slot on an entity
	 * @param entity The entity
	 * @param slot The slot to clear. This should be between 0 and 4.
	 */
	public void clearSpotAnim (Entity entity, int slot);

	/**
	 * Tells an entity to face the specified coordinates
	 * @param entity The entity
	 * @param coords The coords to face
	 */
	public void faceCoords (Entity entity, CoordGrid coords);

	/**
	 * Tells an entity to face the specified target entity
	 * @param entity The entity
	 * @param target The target entity
	 */
	public void faceEntity (Entity entity, Entity target);

	/**
	 * Tells an entity to stop facing the specified target entity
	 * @param entity The entity
	 */
	public void clearFaceEntity (Entity entity);

	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to teleport
	 * @param coords The destination coordinates
	 */
	public void teleportEntity (Entity entity, CoordGrid coords);

	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to teleport
	 * @param x The new x-coordinate of the entity
	 * @param y The new y-coordinate of the entity
	 * @param z The new z-coordinate of the entity
	 */
	public void teleportEntity (Entity entity, int x, int y, int z);

	/**
	 * Moves the entity to the specified coordinates
	 * @param entity The entity to move
	 * @param level The level/plane to move the entity to
	 * @param squareX The x-coordinate of the map square to move onto
	 * @param squareY The y-coordinate of the map square to move onto
	 * @param localX The local x tile within the map square to move onto
	 * @param localY The local y tile within the map square to move onto
	 */
	public void teleportEntity (Entity entity, int level, int squareX, int squareY, int localX, int localY);

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
	public CoordGrid getCoords (Node node);

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
	public CoordGrid getTile (Entity entity);

	/**
	 * Gets the x-coord of the specified tile
	 * @param tile The tile
	 * @return The x-coord
	 */
	public int getCoordX (CoordGrid tile);

	/**
	 * Gets the y-coord of the specified tile
	 * @param tile The tile
	 * @return The y-coord
	 */
	public int getCoordY (CoordGrid tile);

	/**
	 * Gets the level of the specified tile
	 * @param tile The tile
	 * @return The level
	 */
	public int getCoordLevel (CoordGrid tile);

	/**
	 * Gets the map square x-coord of the specified tile
	 * @param tile The tile
	 * @return The map square x-coord
	 */
	public int getSquareX (CoordGrid tile);

	/**
	 * Gets the map square y-coord of the specified tile
	 * @param tile The tile
	 * @return The map square y-coord
	 */
	public int getSquareY (CoordGrid tile);

	/**
	 * Gets the region ID of the specified tile
	 * @param tile The tile
	 * @return The region ID
	 */
	public int getRegionId (CoordGrid tile);

	/**
	 * Gets the hash for the given coordinates
	 * @param coords The coordinates
	 * @return The coord hash (format: y | (x << 14) | (level << 28))
	 */
	public int getCoordHash(CoordGrid coords);

	/**
	 * Gets the coordinate from the specified components
	 * @param x The x-component of the coordinate
	 * @param y The y-component of the coordinate
	 * @param level The level-component of the coordinate
	 * @return The coordinate
	 */
	public CoordGrid getCoords (int x, int y, int level);

	/**
	 * Gets the coordinate offset by the specified values
	 * @param coords The base coordinates
	 * @param x The amount to offset the x-coord by
	 * @param y The amount to offset the y-coord by
	 * @param level The amount to offset the level-coord by
	 * @return The new coordinate
	 */
	public CoordGrid offsetCoords (CoordGrid coords, int xOff, int yOff, byte levelOff);

	public MapSquare getRegion (int regionID);

	/**
	 * Gets the region in which the given coordinates lie
	 * @param coords The coordinates
	 * @return The region in which the coordinates lie
	 */
	public MapSquare getRegion (CoordGrid coords);

	/**
	 * Drops an item on the ground at the specified coordinates.
	 * Uses the default removalDelay specified in the server properties
	 * @param coords The coords to drop the item at
	 * @param itemId The ID of the item to drop
	 * @param amount The number of items to add to the drop pile
	 */
	public void dropItem (CoordGrid coords, int itemId, int amount);

	/**
	 * Drops an item on the ground at the specified coordinates.
	 * Uses the default removalDelay specified in the server properties
	 * @param coords The coords to drop the item at
	 * @param itemId The ID of the item to drop
	 * @param amount The number of items to add to the drop pile
	 * @param owner The player who can see the dropped item initially
	 */
	public void dropItem (CoordGrid coords, int itemId, int amount, Player owner);

	/**
	 * Drops an item on the ground at the specified coordinates.
	 * @param coords The coords to drop the item at
	 * @param itemId The ID of the item to drop
	 * @param amount The number of items to add to the drop pile
	 * @param removalDelay The number of game ticks before the item is removed.
	 */
	public void dropItem (CoordGrid coords, int itemId, int amount, int removalDelay);

	/**
	 * Drops an item on the ground at the specified coordinates.
	 * @param coords The coords to drop the item at
	 * @param itemId The ID of the item to drop
	 * @param amount The number of items to add to the drop pile
	 * @param owner The player who can see the dropped item initially
	 * @param removalDelay The number of game ticks before the item is removed.
	 */
	public void dropItem (CoordGrid coords, int itemId, int amount, Player owner, int removalDelay);

	/**
	 * Removes an item which was dropped on the ground
	 * @param coords The coords of the dropped item
	 * @param itemId The ID of the item to remove
	 * @return The number of items in the removed stack
	 */
	public int removeDroppedItem (CoordGrid coords, int itemId);

	public Object getRandomChoice (Object[] objects);

	/**
	 * Creates a new NPC. NOTE: This method doesn't add the NPC to the world: to add the NPC, use {@link #spawnNpc(NPC)}
	 * @param id The NPC type ID
	 * @param coords The spawn coordinates
	 * @return The new NPC instance
	 */
	public NPC createNpc (int id, CoordGrid coords);

	/**
	 * Transforms the specified NPC to another NPC of the provided type ID
	 * @param npc The npc to transform
	 * @param newID The npcType ID of the new npc.
	 */
	public void transformNpc (NPC npc, int newID);

	/**
	 * Adds the npc to the world. This NPC will not respawn if killed
	 * @param npc The npc to spawn
	 */
	public void spawnNpc (NPC npc);

	/**
	 * Adds the npc to the world
	 * @param npc The npc to add
	 * @param respawn True if the npc will respawn if/when killed, false otherwise
	 */
	public void spawnNpc (NPC npc, boolean respawn);

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
	 * Formats the specified number as a readable string (separated by commas)
	 * @param num The number to format
	 * @return The formatted string
	 */
	public String getFormattedNumber (int num);

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

	/**
	 * Gets the string server property of the provided name. Returns the default value if no property exists with that name
	 * @param property The property name
	 * @param defaultValue The value to use if no property is found
	 * @return The server property, or the default value if none is found
	 */
	public String getProperty (String property, String defaultValue);

	/**
	 * Gets the integer server property of the provided name. Returns the default value if no property exists with that name
	 * @param property The property name
	 * @param defaultValue The value to use if no property is found
	 * @return The server property, or the default value if none is found
	 */
	public int getProperty (String property, int defaultValue);

	/**
	 * Gets the boolean server property of the provided name. Returns the default value if no property exists with that name
	 * @param property The property name
	 * @param defaultValue The value to use if no property is found
	 * @return The server property, or the default value if none is found
	 */
	public boolean getProperty (String property, boolean defaultValue);

	/**
	 * Invokes another script event on the same thread as the current event
	 * @param eventType The {@link ScriptEventType} ID of the event
	 * @param trigger
	 * @param args
	 */
	public void invokeEvent (int eventType, Object trigger, Map<String, Object> args);

	public boolean hasEvent (int eventType, Object trigger);

}
