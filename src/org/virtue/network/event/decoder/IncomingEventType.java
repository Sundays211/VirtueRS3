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
package org.virtue.network.event.decoder;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public enum IncomingEventType {
	/**
	 * A packet sent by the client to ensure the connection remains open
	 */
	KEEP_ALIVE(58, 0),

	/**
	 * Sends the keys which are currently pressed on the client keyboard
	 */
	EVENT_KEYBOARD(100, -2),

	/**
	 * Transmits whenever the player clicks on an element in the client
	 */
	EVENT_MOUSE_CLICK(75, 6),

	/**
	 * Another version of the mouse click packet. Not sure why there's two of these...
	 */
	EVENT_MOUSE_CLICK_2(104, 7),

	/**
	 * Sends the recent movements of the client mouse. Mostly useless, besides preventing auto-logout or tracking bots.
	 */
	EVENT_MOUSE_MOVE(34, -1),

	/**
	 * Another version of the mouse movement packet. Not sure why there's two of these...
	 */
	EVENT_MOUSE_MOVE_2(112, -1),

	/**
	 * Transmits whenever the client applet window gains or looses focus (eg switching tabs/windows on the client machine)
	 */
	EVENT_APPLET_FOCUS(29, 1),

	/**
	 * Transmits whenever the client's camera is rotated
	 */
	EVENT_CAMERA_POSITION(36, 4),

	/**
	 * Includes the current display mode, window size, and screen size method (fixed, resizable, full screen).
	 * Sent on login and whenever any of the settings change.
	 */
	WINDOW_STATUS(89, 6),

	/**
	 * Transmits once every 30-ish seconds. Includes the frame-per-second rate, ping rate, and heap size of the client.
	 */
	CLIENT_STATISTICS(81, 4),

	/**
	 * Transmits whenever a variable or interface is updated. Increments on every update.
	 */
	TRANSMITVAR_VERIFYID(103, 4),

	/**
	 * Clicked on the minimap in a request to "Walk" to the specified position
	 */
	MOVE_MINIMAP(3, 18),

	/**
	 * Clicked on the game scene in a request to "Walk" to the specified position
	 */
	MOVE_MAP(12, 5),

	/**
	 * The first context-menu option selected on an interface action button component
	 */
	IF_OPTION_1(28, 8),

	/**
	 * The second context-menu option selected on an interface action button component
	 */
	IF_OPTION_2(117, 8),

	/**
	 * The third context-menu option selected on an interface action button component
	 */
	IF_OPTION_3(42, 8),

	/**
	 * The fourth context-menu option selected on an interface action button component
	 */
	IF_OPTION_4(17, 8),

	/**
	 * The fifth context-menu option selected on an interface action button component
	 */
	IF_OPTION_5(1, 8),

	/**
	 * The sixth context-menu option selected on an interface action button component
	 */
	IF_OPTION_6(114, 8),

	/**
	 * The seventh context-menu option selected on an interface action button component
	 */
	IF_OPTION_7(77, 8),

	/**
	 * The eighth context-menu option selected on an interface action button component
	 */
	IF_OPTION_8(37, 8),

	/**
	 * The ninth context-menu option selected on an interface action button component
	 */
	IF_OPTION_9(10, 8),

	/**
	 * The tenth context-menu option selected on an interface action button component
	 */
	IF_OPTION_10(23, 8),

	/**
	 * Called when an item on an interface is used on another item on an interface
	 */
	IF_ON_IF(35, 16),

	/**
	 * Called when an interface is dragged onto another interface
	 */
	IF_DRAG(27, 16),

	/**
	 * Called when the client-side "closeWidgets" code is run
	 */
	CLOSE_MODAL(78, 0),

	/**
	 * The first context-menu option selected on a scene location
	 */
	LOC_OPTION_1(54, 9),

	/**
	 * The second context-menu option selected on a scene location
	 */
	LOC_OPTION_2(2, 9),

	/**
	 * The third context-menu option selected on a scene location
	 */
	LOC_OPTION_3(33, 9),

	/**
	 * The fourth context-menu option selected on a scene location
	 */
	LOC_OPTION_4(41, 9),

	/**
	 * The fifth context-menu option selected on a scene location
	 */
	LOC_OPTION_5(79, 9),

	/**
	 * The sixth context-menu option selected on a scene location (usually "examine")
	 */
	LOC_OPTION_6(49, 9),

	/**
	 * Called when an item on an interface is used on a game scene location
	 */
	IF_ON_LOC(51, 17),

	/**
	 * The first context-menu option selected on a ground item
	 */
	ITEM_OPTION_1(43, 7),

	/**
	 * The second context-menu option selected on a ground item
	 */
	ITEM_OPTION_2(25, 7),

	/**
	 * The third context-menu option selected on a ground item
	 */
	ITEM_OPTION_3(90, 7),

	/**
	 * The fourth context-menu option selected on a ground item
	 */
	ITEM_OPTION_4(80, 7),

	/**
	 * The fifth context-menu option selected on a ground item
	 */
	ITEM_OPTION_5(109, 7),

	/**
	 * The sixth context-menu option selected on a ground item (usually "examine")
	 */
	ITEM_OPTION_6(119, 7),

	/**
	 * The first context-menu option selected on an npc
	 */
	NPC_OPTION_1(71, 3),

	/**
	 * The second context-menu option selected on an npc
	 */
	NPC_OPTION_2(30, 3),

	/**
	 * The third context-menu option selected on an npc
	 */
	NPC_OPTION_3(91, 3),

	/**
	 * The fourth context-menu option selected on an npc
	 */
	NPC_OPTION_4(113, 3),

	/**
	 * The fifth context-menu option selected on an npc
	 */
	NPC_OPTION_5(74, 3),

	/**
	 * The sixth context-menu option selected on an npc (usually "examine")
	 */
	NPC_OPTION_6(44, 3),

	/**
	 * Called when an interface is used on an npc
	 */
	IF_ON_NPC(59, 11),

	/**
	 * The first context-menu option selected on another player
	 */
	PLAYER_OPTION_1(26, 3),

	/**
	 * The second context-menu option selected on another player
	 */
	PLAYER_OPTION_2(46, 3),

	/**
	 * The third context-menu option selected on another player
	 */
	PLAYER_OPTION_3(82, 3),

	/**
	 * The fourth context-menu option selected on another player
	 */
	PLAYER_OPTION_4(53, 3),

	/**
	 * The fifth context-menu option selected on another player
	 */
	PLAYER_OPTION_5(18, 3),

	/**
	 * The sixth context-menu option selected on another player
	 */
	PLAYER_OPTION_6(62, 3),

	/**
	 * The seventh context-menu option selected on another player
	 */
	PLAYER_OPTION_7(5, 3),

	/**
	 * The eighth context-menu option selected on another player
	 */
	PLAYER_OPTION_8(39, 3),

	/**
	 * The ninth context-menu option selected on another player
	 */
	PLAYER_OPTION_9(85, 3),

	/**
	 * The tenth context-menu option selected on another player
	 */
	PLAYER_OPTION_10(108, 3),

	/**
	 * Called when an item on an interface is used on a player
	 */
	IF_ON_PLAYER(73, 11),

	/**
	 * Sends changes to client variables which are specified to transmit on change.
	 * Used to update the interface layout.
	 */
	VARC_TRANSMIT(105, -2),

	/**
	 * A player "report-abuse" request. Includes the player name, ruleID, and whether to mute the player.
	 */
	ABUSE_REPORT(-1, -1), //Hmm no known id D:

	/**
	 * A bug report sent by a player. Includes the category, reproduce steps, and description
	 */
	BUG_REPORT(97, -2),

	/**
	 * Contains the results of an input dialog
	 */
	RESUME_PAUSEBUTTON(57, 6),

	/**
	 * Contains the results of an integer input dialog (or 0 if nothing was entered)
	 */
	RESUME_P_COUNTDIALOG(70, 4),

	/**
	 * Contains the results of a string input dialog
	 */
	RESUME_P_STRINGDIALOG(64, -1),

	/**
	 * Contains the results of a name input dialog
	 */
	RESUME_P_NAMEDIALOG(45, -1),

	/**
	 * Contains the results of an object (item) select dialog
	 */
	RESUME_P_OBJDIALOG(107, 2),

	/**
	 * Contains the result of a colour selection dialog (hsl)
	 */
	RESUME_P_HSLDIALOG(93, 2),

	/**
	 * A client-side request to visit the specified URL.
	 * Sent when a player clicks a link in-game.
	 */
	URL_REQUEST(21, -2),

	/**
	 * Sent whenever the player changes their "online status".
	 * Also includes legacy filters for public chat and trade status (no longer used)
	 */
	ONLINE_STATUS(31, 3),

	/**
	 * Sets the chat mode for the next message.
	 * 	 */
	CHAT_SETMODE(11, 1),

	/**
	 * A request to send a message in public chat to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_PUBLIC(66, -1),

	/**
	 * A request to send a private message to the specified player
	 */
	MESSAGE_PRIVATE(9, -2),

	/**
	 * A request to send a public quick chat message to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_QUICKCHAT_PUBLIC(68, -1),

	/**
	 * A request to send a private quick chat message to the specified player
	 */
	MESSAGE_QUICKCHAT_PRIVATE(67, -1),

	/**
	 * A request to add the specified name to the player's friend list.
	 */
	FRIENDLIST_ADD(65, -1),

	/**
	 * A request to add the specified name to the player's ignore list.
	 * Also includes whether the ignore is temporary (till logout)
	 */
	IGNORELIST_ADD(16, -1),

	/**
	 * A request to remove the specified name from the player's friend list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	FRIENDLIST_DEL(94, -1),

	/**
	 * A request to remove the specified name from the player's ignore list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	IGNORELIST_DEL(13, -1),

	/**
	 * Sets the note of the specified name on the player's ignore list
	 */
	IGNORE_SETNOTE(106, -1),

	/**
	 * Sets the note of the specified friend on the player's friends list
	 */
	FRIEND_SETNOTE(72, -1),

	/**
	 * Sets the rank of a friend within the player's friend chat channel
	 */
	FRIEND_SETRANK(6, -1),

	/**
	 * A request for the player to join the specified friend chat channel, if the length is greater than one.
	 * Otherwise, a request to leave the current channel.
	 */
	FRIENDCHAT_JOIN_LEAVE(118, -1),

	/**
	 * A request to kick/ban a user from the current friend chat channel.
	 */
	FRIENDCHAT_KICK(52, -1),

	/**
	 * Selected an option on an interface relating to chat
	 */
	CHAT_USER_OPTION(50, -1),

	/**
	 * A request for the server to send the world list
	 */
	WORLDLIST_FETCH(88, 4),

	/**
	 * A request to run the specified server-side command
	 */
	COMMAND(86, -1),

	/**
	 * A request to verify the display name chosen for a new account
	 */
	CREATION_CHECK_NAME(14, -1),

	/**
	 * A request to verify the age used for creating a new account
	 */
	CREATION_CHECK_AGE(116, 1),

	/**
	 * A request to verify the email address used for creating a new account
	 */
	CREATION_CHECK_EMAIL(101, -2),

	/**
	 * A request to generate a name for a new account
	 */
	CREATION_GENERATE_NAME(60, 0),

	/**
	 * Sends all the details for the new account
	 */
	CREATION_SUBMIT(24, -2),

	/**
	 * Sent when the client map build is completed
	 */
	MAP_BUILD_COMPLETE(76, 0),

	/**
	 * Sent when the cutscene which is currently playing ends
	 */
	CUTSCENE_END(121, 1);

	private final int opcode;

	IncomingEventType(int opcode) {
		this(opcode, -3);
	}

	IncomingEventType(int opcode, int size) {
		this.opcode = opcode;
	}

	/**
	 * Gets the opcode which the client uses to identify this packet
	 * @return The opcode
	 */
	public int getOpcode () {
		return opcode;
	}

	private static Map<Integer, IncomingEventType> lookupTable;

	public static IncomingEventType forOpcode (int opcode) {
		if (lookupTable == null) {
			lookupTable = new HashMap<>();
			for (IncomingEventType type : values()) {
				lookupTable.put(type.opcode, type);
			}
		}
		return lookupTable.get(opcode);
	}
}