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
package org.virtue.network.event;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public enum OutgoingEventType {

	KEEP_ALIVE(157, 0),

	/**
	 * Sends (and updates) the world list
	 */
	WORLDLIST(63, -2),

	/**
	 * Updates the "System Update" (reboot) timer.
	 */
	UPDATE_REBOOT_TIMER(61, 2),

	/**
	 * Updates a player variable with a value of less than 127 but more than
	 * -127
	 */
	VARP_SMALL(127, 3),

	/**
	 * Updates a player variable with a value of more than 127 or less than -127
	 */
	VARP_LARGE(88, 6),

	/**
	 * Updates part of a player variable with a value of less than 127 but more
	 * than -127
	 */
	VARPBIT_SMALL(59, 3),

	/**
	 * Updates part of a player variable with a value of more than 127 or less
	 * than -127
	 */
	VARPBIT_LARGE(165, 6),

	/**
	 * Updates a client variable with a value of less than 127 but more than
	 * -127
	 */
	VARC_SMALL(106, 3),

	/**
	 * Updates a client variable with a value of more than 127 or less than -127
	 */
	VARC_LARGE(41, 6),

	/**
	 * Updates part of a client variable with a value of less than 127 but more
	 * than -127
	 */
	VARCBIT_SMALL(170, 3),

	/**
	 * Updates part of a client variable with a value of more than 127 or less
	 * than -127
	 */
	VARCBIT_LARGE(32, 6),

	/**
	 * Updates a client variable which has a length of no more than 127
	 * characters
	 */
	VARCSTR_SMALL(109, -1),

	/**
	 * Updates a client variable which has a length of more than 127 characters
	 */
	VARCSTR_LARGE(81, -2),

	/**
	 * Resets all the client varp values to zero
	 */
	VARCACHE_RESET(92, 0),

	/**
	 * Informs the client that the server is ready to receive more varc values
	 */
	RESET_VARC_TRANSMIT(148, 0),

	/**
	 * Tells the client to run the specified client script with the provided
	 * paramaters
	 */
	RUNCLIENTSCRIPT(166, -2),

	/**
	 * Causes the client to disconnect from the game and connect to the lobby
	 */
	LOGOUT_LOBBY(57, 0),

	/**
	 * Causes the client to disconnect from the game and return to the login
	 * screen
	 */
	LOGOUT_FULL(114, 0),

	/**
	 * Updates the experience (and current level) of the specified skill
	 */
	UPDATE_SKILL(65, 6),

	/**
	 * Updates the player's run energy level
	 */
	UPDATE_RUNENERGY(53, 1),

	/**
	 * Updates the player's run weight
	 */
	UPDATE_RUNWEIGHT(14, 2),

	/**
	 * Updates the player's own appearance
	 */
	UPDATE_APPEARANCE(54, -2),

	/**
	 * Sets the text for context-menu options for other players (eg "trade",
	 * "attack", "follow", etc)
	 */
	PLAYER_SETOPTION(17, -1),

	/**
	 * Renders and updates the players in the game
	 */
	PLAYER_UPDATE(1, -2),

	/**
	 * Renders and updates the local npcs
	 */
	NPC_UPDATE(7, -2),

	/**
	 * Renders and updates the local npcs in a large radius
	 */
	NPC_UPDATE_LARGE(55, -2),

	/**
	 * Sends a system message to the client.
	 */
	MESSAGE_GAME(110, -1),

	/**
	 * Sends a public chat message to the client
	 */
	MESSAGE_PUBLIC(95, -1),

	/**
	 * Sends a private chat message to the client
	 */
	MESSAGE_PRIVATE(11, -2),

	/**
	 * Sends a private quick chat message to the client
	 */
	MESSAGE_PRIVATE_QUICKCHAT(155, -1),

	/**
	 * Sends a copy of the private message that was sent by the player (for the
	 * "To: " field)
	 */
	MESSAGE_PRIVATE_ECHO(15, -2),

	/**
	 * Sends a copy of the private quick message that was sent by the player
	 * (for the "To: " field)
	 */
	MESSAGE_PRIVATE_ECHO_QUICKCHAT(9, -1),

	/**
	 * Sends a friend channel message to the client
	 */
	MESSAGE_FRIENDCHANNEL(149, -1),

	/**
	 * Sends a friend channel quick message to the client
	 */
	MESSAGE_FRIENDCHANNEL_QUICKCHAT(16, -1),

	/**
	 * Sends a clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL(143, -1),

	/**
	 * Sends a clan channel quick message to the client
	 */
	MESSAGE_CLANCHANNEL_QUICKCHAT(125, -1),

	/**
	 * Sends a broadcast clan channel message to the client
	 */
	MESSAGE_CLANCHANNEL_BROADCAST(173, -1),

	MESSAGE_GROUP(-1), CHAT_FILTER_SETTINGS(-1),

	/**
	 * Unlocks the player's client friends list
	 */
	UNLOCK_FRIENDLIST(145, 0),

	/**
	 * Sends the player's current online status. Note that this does not need to
	 * be sent if the status is changed on the client side, but should be sent
	 * on login (and if the status is changed on the server side, for whatever
	 * reason)
	 */
	ONLINE_STATUS(178, 1),

	/**
	 * Updates or adds one or more entries in the player's friend list. Note
	 * that friend list removals are handled on the client side only, and it is
	 * not possible to remotely remove friends.
	 */
	UPDATE_FRIENDLIST(104, -2),

	/**
	 * Updates or adds one or more entries in the player's ignore list. Note
	 * that ignore list removals are handled on the client side only, and it is
	 * not possible to remotely remove ignores.
	 */
	UPDATE_IGNORELIST(33, -2),

	/**
	 * Updates the entire friend chat channel that the player is currently in.
	 * This packet is also used to leave the channel (if empty)
	 */
	UPDATE_FRIENDCHANNEL_FULL(67, -2),

	/**
	 * Updates a single user in the current friend chat channel.
	 */
	UPDATE_FRIENDCHANNEL_PART(24, -1),

	/**
	 * Updates/initialises the full clan channel that the player is currently
	 * in. This packet is also used to leave the channel (if empty)
	 */
	CLANCHANNEL_FULL(5, -2),

	/**
	 * Sends a series of updates for the clan channel the player is currently
	 * in.
	 */
	CLANCHANNEL_DELTA(174, -2),

	/**
	 * Updates/initialises the full clan settings for the clan that the player
	 * is currently in.
	 */
	CLANSETTINGS_FULL(0, -2),

	/**
	 * Sends a series of updates of the settings for the clan the player is
	 * currently in.
	 */
	CLANSETTINGS_DELTA(111, -2),

	/**
	 * Represents the status of the chosen display name within the account
	 * creation procedure.
	 */
	CREATION_NAME_STATUS(153, 1),

	/**
	 * Represents the status of the chosen email address within the account
	 * creation procedure.
	 */
	CREATION_EMAIL_STATUS(163, 1),

	/**
	 * The response code for the account creation procedure submit function.
	 */
	CREATION_SUBMIT_STATUS(86, 1),

	/**
	 * Sets the position of the client minimap flag
	 */
	SET_TARGET(137, 2),

	/**
	 * Represents a static map update
	 */
	GAMESCENE_STATIC(49, -2),

	/**
	 * Represents a dynamic map update
	 */
	GAMESCENE_DYNAMIC(30, -2),

	/**
	 * Sets the base tile for game scene updates
	 */
	GAMESCENE_SET_BASETILE(78, 3),

	/**
	 * Adds a ground item to the game scene
	 */
	GAMESCENE_ADD_ITEM(139, 5),

	/**
	 * Adds a ground item to the game scene which is not visible to a specified
	 * entity
	 */
	GAMESCENE_ADD_HIDDEN_ITEM(2, 7),

	/**
	 * Removes a ground item from the game scene
	 */
	GAMESCENE_REMOVE_ITEM(40, 3),

	/**
	 * Adds or updates an object in the game scene
	 */
	GAMESCENE_UPDATE_LOC(89, 6),

	/**
	 * Removes an object from the game scene
	 */
	GAMESCENE_REMOVE_LOC(45, 2),

	/**
	 * Sends a projectile within the game scene
	 */
	GAMESCENE_PROJECTILE(28, 18),

	/**
	 * Opens the top-level game interface (aka "root" interface)
	 */
	IF_OPENTOP(20, 19),

	/**
	 * Opens an interface as a sub of the specified interface
	 */
	IF_OPENSUB(37, 23),

	/**
	 * Opens an interface as a sub of an npc
	 */
	IF_OPENSUB_ACTIVE_NPC(31, 25),

	/**
	 * Opens an interface as a sub of a location
	 */
	IF_OPENSUB_ACTIVE_LOC(121, 32),

	/**
	 * Closes the interface which is a sub of the provided interface
	 */
	IF_CLOSESUB(80, 4),

	/**
	 * Hides (or unhides) an interface component
	 */
	IF_SETHIDE(179, 5),

	/**
	 * Sets the text of an interface component
	 */
	IF_SETTEXT(132, -2),
	
	/**
	 * Sets model on an interface component to another player's model
	 */
	IF_SETPLAYERMODEL_OTHER(101, 10),
	
	/**
	 * Sets the model on an interface component to the active player's model
	 */
	IF_SETPLAYERMODEL_SELF(136, 4),

	/**
	 * Sets the NPC head on an interface component
	 */
	IF_SETNPCHEAD(46, 8),

	/**
	 * Sets the model on an interface component to the active player's chathead
	 */
	IF_SETPLAYERHEAD_SELF(107, 4),

	/**
	 * Sets the model on an interface component to another player's chathead
	 */
	IF_SETPLAYERHEAD_OTHER(119, 10),

	/**
	 * Animates a model on an interface component
	 */
	IF_SETANIM(3, 8),

	/**
	 * Sets the events for an interface (including which options are handled by
	 * the server, whether it can be used on other elements, etc).
	 */
	IF_SETEVENTS(162, 12),

	/**
	 * Sends a full update of an item container
	 */
	UPDATE_INV_FULL(97, -2),

	/**
	 * Sends a partial update of an item container
	 */
	UPDATE_INV_PARTIAL(172, -2),

	/**
	 * Updates a grand exchange offer
	 */
	UPDATE_EXCHANGE(171, 20),

	/**
	 * Notifies a client to play the specified cutscene
	 */
	CUTSCENE(13, -2);

	private int opcode;

	private OutgoingEventType(int opcode) {
		this(opcode, -3);
	}

	private OutgoingEventType(int opcode, int size) {
		this.opcode = opcode;
	}

	public int getOpcode() {
		return opcode;
	}
}
