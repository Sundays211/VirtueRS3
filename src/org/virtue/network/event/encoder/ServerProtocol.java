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
package org.virtue.network.event.encoder;

/**
 * Represents the server -> client protocol opcodes & sizes
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public enum ServerProtocol {

	NO_TIMEOUT(187, 0),

	/**
	 * Sends (and updates) the world list
	 */
	WORLDLIST_FETCH_REPLY(33, -2),

	/**
	 * Updates the "System Update" (reboot) timer.
	 */
	UPDATE_REBOOT_TIMER(60, 2),

	/**
	 * Updates a player variable with a value of less than 127 but more than -127
	 */
	VARP_SMALL(79, 3),

	/**
	 * Updates a player variable with a value of more than 127 or less than -127
	 */
	VARP_LARGE(102, 6),

	/**
	 * Updates part of a player variable with a value of less than 127 but more than -127
	 */
	VARBIT_SMALL(26, 3),

	/**
	 * Updates part of a player variable with a value of more than 127 or less than -127
	 */
	VARBIT_LARGE(27, 6),

	/**
	 * Updates a client variable with a value of less than 127 but more than -127
	 */
	VARC_SMALL(17, 3),

	/**
	 * Updates a client variable with a value of more than 127 or less than -127
	 */
	VARC_LARGE(182, 6),

	/**
	 * Updates part of a client variable with a value of less than 127 but more than -127
	 */
	VARCBIT_SMALL(54, 3),

	/**
	 * Updates part of a client variable with a value of more than 127 or less than -127
	 */
	VARCBIT_LARGE(19, 6),

	/**
	 * Updates a client variable which has a length of no more than 127 characters
	 */
	VARCSTR_SMALL(56, -1),

	/**
	 * Updates a client variable which has a length of more than 127 characters
	 */
	VARCSTR_LARGE(188, -2),

	/**
	 * Resets all the client varp values to zero
	 */
	VARCACHE_RESET(124, 0),

	/**
	 * Informs the client that the server is ready to receive more varc values
	 */
	RESET_VARC_TRANSMIT(118, 0),

	/**
	 * Tells the client to run the specified client script with the provided paramaters
	 */
	RUNCLIENTSCRIPT(36, -2),

	/**
	 * Causes the client to disconnect from the game and connect to the lobby
	 */
	LOGOUT_LOBBY(189, 0),

	/**
	 * Causes the client to disconnect from the game and return to the login screen
	 */
	LOGOUT_FULL(97, 0),

	/**
	 * Updates the experience (and current level) of the specified skill
	 */
	UPDATE_STAT(185, 6),

	/**
	 * Updates the player's run energy level
	 */
	UPDATE_RUNENERGY(22, 1),

	/**
	 * Updates the player's run weight
	 */
	UPDATE_RUNWEIGHT(186, 2),

	/**
	 * Updates the player's own appearance
	 */
	UPDATE_APPEARANCE(117, -2),

	/**
	 * Sets the text for context-menu options for other players (eg "trade", "attack", "follow", etc)
	 */
	SET_PLAYER_OP(46, -1),

	/**
	 * Renders and updates the players in the game
	 */
	PLAYER_INFO(119, -2),

	/**
	 * Renders and updates the local npcs
	 */
	NPC_INFO(7, -2),

	/**
	 * Sends a system message to the client.
	 */
	MESSAGE_GAME(137, -1),

	/**
	 * Sends a public chat message to the client
	 */
	MESSAGE_PUBLIC(9, -1),

	/**
	 * Sends a private chat message to the client
	 */
	MESSAGE_PRIVATE(38, -2),

	/**
	 * Sends a private quick chat message to the client
	 */
	MESSAGE_QUICKCHAT_PRIVATE(39, -1),

	/**
	 * Sends a copy of the private message that was sent by the player (for the "To: " field)
	 */
	MESSAGE_PRIVATE_ECHO(53, -2),

	/**
	 * Sends a copy of the private quick message that was sent by the player (for the "To: " field)
	 */
	MESSAGE_QUICKCHAT_PRIVATE_ECHO(24, -1),

	/**
	 * Sends a friend channel message to the client
	 */
	MESSAGE_FRIENDCHAT(123, -1),

	/**
	 * Sends a friend channel quick message to the client
	 */
	MESSAGE_QUICKCHAT_FRIENDCHAT(71, -1),

	/**
	 * Sends a clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL(153, -1),

	/**
	 * Sends a clan channel quick message to the client
	 */
	MESSAGE_QUICKCHAT_CLANCHANNEL(51, -1),

	/**
	 * Sends a broadcast clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL_SYSTEM(105, -1),

	/**
	 * Unlocks the player's client friends list
	 */
	FRIENDLIST_LOADED(18, 0),

	/**
	 * Sends the player's current online status.
	 * Note that this does not need to be sent if the status is changed on the client side, but should be sent on login (and if the status is changed on the server side, for whatever reason)
	 */
	ONLINE_STATUS(157, 1),

	/**
	 * Updates or adds one or more entries in the player's friend list.
	 * Note that friend list removals are handled on the client side only, and it is not possible to remotely remove friends.
	 */
	UPDATE_FRIENDLIST(58, -2),

	/**
	 * Updates or adds one or more entries in the player's ignore list.
	 * Note that ignore list removals are handled on the client side only, and it is not possible to remotely remove ignores.
	 */
	UPDATE_IGNORELIST(10, -2),

	/**
	 * Updates the entire friend chat channel that the player is currently in.
	 * This packet is also used to leave the channel (if empty)
	 */
	UPDATE_FRIENDCHANNEL_FULL(61, -2),

	/**
	 * Updates a single user in the current friend chat channel.
	 */
	UPDATE_FRIENDCHANNEL_PART(110, -1),

	/**
	 * Updates/initialises the full clan channel that the player is currently in.
	 * This packet is also used to leave the channel (if empty)
	 */
	CLANCHANNEL_FULL(85, -2),

	/**
	 * Sends a series of updates for the clan channel the player is currently in.
	 */
	CLANCHANNEL_DELTA(109, -2),

	/**
	 * Updates/initialises the full clan settings for the clan that the player is currently in.
	 */
	CLANSETTINGS_FULL(98, -2),

	/**
	 * Sends a series of updates of the settings for the clan the player is currently in.
	 */
	CLANSETTINGS_DELTA(6, -2),

	/**
	 * Represents the status of the chosen display name within the account creation procedure.
	 */
	CREATE_CHECK_NAME_REPLY(108, 1),

	/**
	 * Represents the status of the chosen email address within the account creation procedure.
	 */
	CREATE_CHECK_EMAIL_REPLY(96, 1),

	/**
	 * The response code for the account creation procedure submit function.
	 */
	CREATE_ACCOUNT_REPLY(128, 1),

	/**
	 * Sets the position of the client minimap flag
	 */
	SET_MAP_FLAG(16, 2),

	/**
	 * Represents a static map update
	 */
	REBUILD_NORMAL(40, -2),

	/**
	 * Represents a dynamic map update
	 */
	REBUILD_DYNAMIC(121, -2),

	/**
	 * Sets the base tile for map updates
	 */
	UPDATE_ZONE_PARTIAL_FOLLOWS(112, 3),

	/**
	 * Adds an item to the floor
	 */
	OBJ_ADD(180, 5),

	/**
	 * Adds a ground item to the map which is not visible to a specified entity
	 */
	OBJ_REVEAL(161, 7),

	/**
	 * Removes a ground item from the map
	 */
	OBJ_DEL(114, 3),

	/**
	 * Adds or updates a location on the map
	 */
	LOC_ADD_CHANGE(130, 6),

	/**
	 * Removes a location from the map
	 */
	LOC_DEL(141, 2),

	/**
	 * Sends a projectile within the map
	 */
	MAP_PROJECTILE(93, 18),

	/**
	 * Opens the top-level game interface (aka "root" interface)
	 */
	IF_OPENTOP(4, 19),

	/**
	 * Opens an interface as a sub of the specified interface
	 */
	IF_OPENSUB(91, 23),

	/**
	 * Opens an interface as a sub of an npc
	 */
	IF_OPENSUB_ACTIVE_NPC(23, 25),

	/**
	 * Opens an interface as a sub of a location
	 */
	IF_OPENSUB_ACTIVE_LOC(84, 32),

	/**
	 * Closes the interface which is a sub of the provided interface
	 */
	IF_CLOSESUB(11, 4),

	/**
	 * Hides (or unhides) an interface component
	 */
	IF_SETHIDE(156, 5),

	/**
	 * Sets the text of an interface component
	 */
	IF_SETTEXT(34, -2),

	/**
	 * Sets model on an interface component to another player's model
	 */
	IF_SETPLAYERMODEL_OTHER(82, 10),

	/**
	 * Sets the model on an interface component to the active player's model
	 */
	IF_SETPLAYERMODEL_SELF(148, 4),


	/**
	 * Sets the NPC head on an interface component
	 */
	IF_SETNPCHEAD(133, 8),

	/**
	 * Sets the model on an interface component to the player's chathead
	 */
	IF_SETPLAYERHEAD_SELF(31, 4),

	/**
	 * Sets the model on an interface component to another player's chathead
	 */
	IF_SETPLAYERHEAD_OTHER(106, 10),
	
	/**
	 * Sets the model on an interface component to an object (item)
	 */
	IF_SETOBJECT(127, 10),

	/**
	 * Animates a model on an interface component
	 */
	IF_SETANIM(122, 8),

	/**
	 * Sets the events for an interface (including which options are handled by the server, whether it can be used on other elements, etc).
	 */
	IF_SETEVENTS(166, 12),
	
	/**
	 * Sets an external (HTTP) image ID for an interface
	 */
	IF_SET_HTTP_IMAGE(146, 8),

	/**
	 * Sends a full update of an item container
	 */
	UPDATE_INV_FULL(159, -2),

	/**
	 * Sends a partial update of an item container
	 */
	UPDATE_INV_PARTIAL(47, -2),

	/**
	 * Updates a grand exchange offer
	 */
	UPDATE_EXCHANGE(55, 21),

	/**
	 * Notifies a client to play the specified cutscene
	 */
	CUTSCENE(92, -2),

	PLAY_MUSIC(-1, 3),
	
	/**
	 * Sends the full data contained within the player's telemetry (RuneMetrics) grid
	 */
	TELEMETRY_GRID_FULL(52, -2);
	
	private int opcode;

	private ServerProtocol (int opcode) {
		this(opcode, -3);
	}

	private ServerProtocol (int opcode, int size) {
		this.opcode = opcode;
	}

	public int getOpcode () {
		return opcode;
	}
}
