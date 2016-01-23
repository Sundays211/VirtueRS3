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
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public enum OutgoingEventType {

	KEEP_ALIVE(30, 0),

	/**
	 * Sends (and updates) the world list
	 */
	WORLDLIST(24, -2),

	/**
	 * Updates the "System Update" (reboot) timer.
	 */
	UPDATE_REBOOT_TIMER(98, 2),

	/**
	 * Updates a player variable with a value of less than 127 but more than -127
	 */
	VARP_SMALL(45, 3), // Adjusted by Stefan for 861

	/**
	 * Updates a player variable with a value of more than 127 or less than -127
	 */
	VARP_LARGE(16, 6), // Adjusted by Stefan for 861

	/**
	 * Updates part of a player variable with a value of less than 127 but more than -127
	 */
	VARPBIT_SMALL(147, 3), // Adjusted by Stefan for 861

	/**
	 * Updates part of a player variable with a value of more than 127 or less than -127
	 */
	VARPBIT_LARGE(139, 6), // Adjusted by Stefan for 861

	/**
	 * Updates a client variable with a value of less than 127 but more than -127
	 */
	VARC_SMALL(90, 3),// Checked - Stefan

	/**
	 * Updates a client variable with a value of more than 127 or less than -127
	 */
	VARC_LARGE(177, 6), // Checked - Stefan

	/**
	 * Updates part of a client variable with a value of less than 127 but more than -127
	 */
	VARCBIT_SMALL(180, 3),// Checked - Stefan

	/**
	 * Updates part of a client variable with a value of more than 127 or less than -127
	 */
	VARCBIT_LARGE(76, 6),// Checked - Stefan

	/**
	 * Updates a client variable which has a length of no more than 127 characters
	 */
	VARCSTR_SMALL(10, -1),

	/**
	 * Updates a client variable which has a length of more than 127 characters
	 */
	VARCSTR_LARGE(62, -2),

	/**
	 * Resets all the client varp values to zero
	 */
	VARCACHE_RESET(81, 0),

	/**
	 * Informs the client that the server is ready to receive more varc values
	 */
	RESET_VARC_TRANSMIT(60, 0),

	/**
	 * Tells the client to run the specified client script with the provided paramaters
	 */
	RUNCLIENTSCRIPT(36, -2),

	/**
	 * Causes the client to disconnect from the game and connect to the lobby
	 */
	LOGOUT_LOBBY(95, 0),

	/**
	 * Causes the client to disconnect from the game and return to the login screen
	 */
	LOGOUT_FULL(108, 0),

	/**
	 * Updates the experience (and current level) of the specified skill
	 */
	UPDATE_STAT(4, 6),

	/**
	 * Updates the player's run energy level
	 */
	UPDATE_RUNENERGY(105, 1),

	/**
	 * Updates the player's run weight
	 */
	UPDATE_RUNWEIGHT(14, 2),

	/**
	 * Updates the player's own appearance
	 */
	UPDATE_APPEARANCE(164, -2),

	/**
	 * Sets the text for context-menu options for other players (eg "trade", "attack", "follow", etc)
	 */
	PLAYER_SETOPTION(27, -1),

	/**
	 * Renders and updates the players in the game
	 */
	PLAYER_UPDATE(111, -2),

	/**
	 * Renders and updates the local npcs
	 */
	NPC_UPDATE(8, -2), //added but sceneRadius stuff might not work

	// TODO: below this needs to be checked...


	/**
	 * Sends a system message to the client.
	 */
	MESSAGE_GAME(2, -1),

	/**
	 * Sends a public chat message to the client
	 */
	MESSAGE_PUBLIC(144, -1),

	/**
	 * Sends a private chat message to the client
	 */
	MESSAGE_PRIVATE(152, -2),

	/**
	 * Sends a private quick chat message to the client
	 */
	MESSAGE_PRIVATE_QUICKCHAT(92, -1),

	/**
	 * Sends a copy of the private message that was sent by the player (for the "To: " field)
	 */
	MESSAGE_PRIVATE_ECHO(57, -2),

	/**
	 * Sends a copy of the private quick message that was sent by the player (for the "To: " field)
	 */
	MESSAGE_PRIVATE_ECHO_QUICKCHAT(12, -1),

	/**
	 * Sends a friend channel message to the client
	 */
	MESSAGE_FRIENDCHANNEL(82, -1),

	/**
	 * Sends a friend channel quick message to the client
	 */
	MESSAGE_FRIENDCHANNEL_QUICKCHAT(85, -1),

	/**
	 * Sends a clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL(22, -1),

	/**
	 * Sends a clan channel quick message to the client
	 */
	MESSAGE_CLANCHANNEL_QUICKCHAT(91, -1),

	/**
	 * Sends a broadcast clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL_BROADCAST(31, -1),

	/**
	 * Unlocks the player's client friends list
	 */
	UNLOCK_FRIENDLIST(77, 0),

	/**
	 * Sends the player's current online status.
	 * Note that this does not need to be sent if the status is changed on the client side, but should be sent on login (and if the status is changed on the server side, for whatever reason)
	 */
	ONLINE_STATUS(70, 1),

	/**
	 * Updates or adds one or more entries in the player's friend list.
	 * Note that friend list removals are handled on the client side only, and it is not possible to remotely remove friends.
	 */
	UPDATE_FRIENDLIST(3, -2),

	/**
	 * Updates or adds one or more entries in the player's ignore list.
	 * Note that ignore list removals are handled on the client side only, and it is not possible to remotely remove ignores.
	 */
	UPDATE_IGNORELIST(47, -2),

	/**
	 * Updates the entire friend chat channel that the player is currently in.
	 * This packet is also used to leave the channel (if empty)
	 */
	UPDATE_FRIENDCHANNEL_FULL(23, -2),

	/**
	 * Updates a single user in the current friend chat channel.
	 */
	UPDATE_FRIENDCHANNEL_PART(148, -1),

	/**
	 * Updates/initialises the full clan channel that the player is currently in.
	 * This packet is also used to leave the channel (if empty)
	 */
	CLANCHANNEL_FULL(162, -2),

	/**
	 * Sends a series of updates for the clan channel the player is currently in.
	 */
	CLANCHANNEL_DELTA(146, -2),

	/**
	 * Updates/initialises the full clan settings for the clan that the player is currently in.
	 */
	CLANSETTINGS_FULL(34, -2),

	/**
	 * Sends a series of updates of the settings for the clan the player is currently in.
	 */
	CLANSETTINGS_DELTA(192, -2),

	/**
	 * Represents the status of the chosen display name within the account creation procedure.
	 */
	CREATION_NAME_STATUS(124, 1),

	/**
	 * Represents the status of the chosen email address within the account creation procedure.
	 */
	CREATION_EMAIL_STATUS(56, 1),

	/**
	 * The response code for the account creation procedure submit function.
	 */
	CREATION_SUBMIT_STATUS(159, 1),

	/**
	 * Sets the position of the client minimap flag
	 */
	SET_TARGET(52, 2),

	/**
	 * Represents a static map update
	 */
	MAP_STATIC(101, -2),//added but sceneRadius stuff might not work

	/**
	 * Represents a dynamic map update
	 */
	MAP_DYNAMIC(117, -2),//added but sceneRadius stuff might not work

	/**
	 * Sets the base tile for map updates
	 */
	MAP_SET_BASETILE(28, 3),

	/**
	 * Adds a ground item to the map
	 */
	MAP_ADD_OBJECT(136, 5),

	/**
	 * Adds a ground item to the map which is not visible to a specified entity
	 */
	MAP_ADD_HIDDEN_OBJECT(127, 7),

	/**
	 * Removes a ground item from the map
	 */
	MAP_REMOVE_OBJECT(59, 3),

	/**
	 * Adds or updates a location on the map
	 */
	MAP_UPDATE_LOC(44, 6),

	/**
	 * Removes a location from the map
	 */
	MAP_REMOVE_LOC(93, 2),

	/**
	 * Sends a projectile within the map
	 */
	MAP_PROJECTILE(123, 18),

	/**
	 * Opens the top-level game interface (aka "root" interface)
	 */
	IF_OPENTOP(35, 19),

	/**
	 * Opens an interface as a sub of the specified interface
	 */
	IF_OPENSUB(64, 23),

	/**
	 * Opens an interface as a sub of an npc
	 */
	IF_OPENSUB_ACTIVE_NPC(169, 25),

	/**
	 * Opens an interface as a sub of a location
	 */
	IF_OPENSUB_ACTIVE_LOC(1, 32),

	/**
	 * Closes the interface which is a sub of the provided interface
	 */
	IF_CLOSESUB(39, 4),

	/**
	 * Hides (or unhides) an interface component
	 */
	IF_SETHIDE(80, 5),

	/**
	 * Sets the text of an interface component
	 */
	IF_SETTEXT(65, -2),

	/**
	 * Sets model on an interface component to another player's model
	 */
	IF_SETPLAYERMODEL_OTHER(100, 10),

	/**
	 * Sets the model on an interface component to the active player's model
	 */
	IF_SETPLAYERMODEL_SELF(116, 4),


	/**
	 * Sets the NPC head on an interface component
	 */
	IF_SETNPCHEAD(50, 8),

	/**
	 * Sets the model on an interface component to the player's chathead
	 */
	IF_SETPLAYERHEAD_SELF(40, 4),

	/**
	 * Sets the model on an interface component to another player's chathead
	 */
	IF_SETPLAYERHEAD_OTHER(161, 10),

	/**
	 * Animates a model on an interface component
	 */
	IF_SETANIM(11, 8),

	/**
	 * Sets the events for an interface (including which options are handled by the server, whether it can be used on other elements, etc).
	 */
	IF_SETEVENTS(109, 12),

	/**
	 * Sends a full update of an item container
	 */
	UPDATE_INV_FULL(102, -2),

	/**
	 * Sends a partial update of an item container
	 */
	UPDATE_INV_PARTIAL(49, -2),

	/**
	 * Updates a grand exchange offer
	 */
	UPDATE_EXCHANGE(9, 21),

	/**
	 * Notifies a client to play the specified cutscene
	 */
	CUTSCENE(155, -2),
	
	IF_SETGRAPHIC_EXTERNAL(158, 8),

	PLAY_MUSIC(72,3);
	private int opcode;

	private OutgoingEventType (int opcode) {
		this(opcode, -3);
	}

	private OutgoingEventType (int opcode, int size) {
		this.opcode = opcode;
	}

	public int getOpcode () {
		return opcode;
	}
}
