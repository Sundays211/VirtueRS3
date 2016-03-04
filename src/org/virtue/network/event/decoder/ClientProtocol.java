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
 * Represents the client -> server protocol opcodes & sizes
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public enum ClientProtocol {
	
	/**
	 * A packet sent by the client to ensure the connection remains open
	 */
	NO_TIMEOUT(51, 0),

	/**
	 * Sends the keys which are currently pressed on the client keyboard
	 */
	EVENT_KEYBOARD(109, -2),

	/**
	 * Transmits whenever the player clicks on an element in the client
	 */
	EVENT_MOUSE_CLICK(101, 6),

	/**
	 * Transmits whenever the player clicks on an element in the client
	 */
	EVENT_NATIVE_MOUSE_CLICK(56, 7),

	/**
	 * Sends the recent movements of the client mouse. Mostly useless, besides preventing auto-logout or tracking bots.
	 */
	EVENT_MOUSE_MOVE(54, -1),

	/**
	 * Sends the recent movements of the client mouse.
	 */
	EVENT_NATIVE_MOUSE_MOVE(56, -1),

	/**
	 * Transmits whenever the client applet window gains or looses focus (eg switching tabs/windows on the client machine)
	 */
	EVENT_APPLET_FOCUS(79, 1),

	/**
	 * Transmits whenever the client's camera is rotated
	 */
	EVENT_CAMERA_POSITION(28, 4),

	/**
	 * Includes the current display mode, window size, and screen size method (fixed, resizable, full screen).
	 * Sent on login and whenever any of the settings change.
	 */
	WINDOW_STATUS(9, 6),

	/**
	 * Transmits once every 30-ish seconds. Includes the frame-per-second rate, ping rate, and heap size of the client.
	 */
	PING_STATISTICS(90, 4),

	/**
	 * Transmits whenever a variable or interface is updated. Increments on every update.
	 */
	TRANSMITVAR_VERIFYID(97, 4),

	/**
	 * Clicked on the minimap in a request to "Walk" to the specified position
	 */
	MOVE_MINIMAPCLICK(13, 18),

	/**
	 * Clicked on the game scene in a request to "Walk" to the specified position
	 */
	MOVE_GAMECLICK(57, 5),

	/**
	 * The first context-menu option selected on an interface action button component
	 */
	IF_BUTTON1(45, 8),

	/**
	 * The second context-menu option selected on an interface action button component
	 */
	IF_BUTTON2(81, 8),

	/**
	 * The third context-menu option selected on an interface action button component
	 */
	IF_BUTTON3(16, 8),

	/**
	 * The fourth context-menu option selected on an interface action button component
	 */
	IF_BUTTON4(11, 8),

	/**
	 * The fifth context-menu option selected on an interface action button component
	 */
	IF_BUTTON5(41, 8),

	/**
	 * The sixth context-menu option selected on an interface action button component
	 */
	IF_BUTTON6(19, 8),

	/**
	 * The seventh context-menu option selected on an interface action button component
	 */
	IF_BUTTON7(96, 8),

	/**
	 * The eighth context-menu option selected on an interface action button component
	 */
	IF_BUTTON8(1, 8),

	/**
	 * The ninth context-menu option selected on an interface action button component
	 */
	IF_BUTTON9(112, 8),

	/**
	 * The tenth context-menu option selected on an interface action button component
	 */
	IF_BUTTON10(10, 8),

	/**
	 * Called when an item on an interface button is targeted on another interface component
	 */
	IF_BUTTONT(55, 16),

	/**
	 * Called when an interface button is dragged onto another interface
	 */
	IF_BUTTOND(2, 16),

	/**
	 * Selected an option on an interface relating to chat
	 */
	IF_PLAYER(6, -1),

	/**
	 * Called when the client-side "closeWidgets" code is run
	 */
	CLOSE_MODAL(63, 0),

	/**
	 * The first context-menu option selected on a scene location
	 */
	OPLOC1(34, 9),

	/**
	 * The second context-menu option selected on a scene location
	 */
	OPLOC2(39, 9),

	/**
	 * The third context-menu option selected on a scene location
	 */
	OPLOC3(117, 9),

	/**
	 * The fourth context-menu option selected on a scene location
	 */
	OPLOC4(5, 9),

	/**
	 * The fifth context-menu option selected on a scene location
	 */
	OPLOC5(80, 9),

	/**
	 * The sixth context-menu option selected on a scene location (usually "examine")
	 */
	OPLOC6(43, 9),

	/**
	 * Called when an item on an interface is targeted on a game scene location
	 */
	OPLOCT(8, 17),

	/**
	 * The first context-menu option selected on a ground item
	 */
	OPOBJ1(27, 7),

	/**
	 * The second context-menu option selected on a ground item
	 */
	OPOBJ2(75, 7),

	/**
	 * The third context-menu option selected on a ground item
	 */
	OPOBJ3(65, 7),

	/**
	 * The fourth context-menu option selected on a ground item
	 */
	OPOBJ4(99, 7),

	/**
	 * The fifth context-menu option selected on a ground item
	 */
	OPOBJ5(89, 7),

	/**
	 * The sixth context-menu option selected on a ground item (usually "examine")
	 */
	OPOBJ6(29, 7),

	/**
	 * The first context-menu option selected on an npc
	 */
	OPNPC1(113, 3),

	/**
	 * The second context-menu option selected on an npc
	 */
	OPNPC2(31, 3),

	/**
	 * The third context-menu option selected on an npc
	 */
	OPNPC3(4, 3),

	/**
	 * The fourth context-menu option selected on an npc
	 */
	OPNPC4(21, 3),

	/**
	 * The fifth context-menu option selected on an npc
	 */
	OPNPC5(53, 3),

	/**
	 * The sixth context-menu option selected on an npc (usually "examine")
	 */
	OPNPC6(36, 3),

	/**
	 * Called when an interface is used on an npc
	 */
	IF_ON_NPC(-1, 11),

	/**
	 * The first context-menu option selected on another player
	 */
	OPPLAYER1(116, 3),

	/**
	 * The second context-menu option selected on another player
	 */
	OPPLAYER2(91, 3),

	/**
	 * The third context-menu option selected on another player
	 */
	OPPLAYER3(32, 3),

	/**
	 * The fourth context-menu option selected on another player
	 */
	OPPLAYER4(93, 3),

	/**
	 * The fifth context-menu option selected on another player
	 */
	OPPLAYER5(22, 3),

	/**
	 * The sixth context-menu option selected on another player
	 */
	OPPLAYER6(50, 3),

	/**
	 * The seventh context-menu option selected on another player
	 */
	OPPLAYER7(23, 3),

	/**
	 * The eighth context-menu option selected on another player
	 */
	OPPLAYER8(73, 3),

	/**
	 * The ninth context-menu option selected on another player
	 */
	OPPLAYER9(24, 3),

	/**
	 * The tenth context-menu option selected on another player
	 */
	OPPLAYER10(49, 3),

	/**
	 * Called when an item on an interface is used on a player
	 */
	OPPLAYERT(119, 11),

	/**
	 * Sends changes to client variables which are specified to transmit on change.
	 * Used to update the interface layout.
	 */
	STORE_SERVERPERM_VARCS(14, -2),

	/**
	 * A player "report-abuse" request. Includes the player name, ruleID, and whether to mute the player.
	 */
	ABUSE_REPORT(-1, -1),

	/**
	 * A bug report sent by a player. Includes the category, reproduce steps, and description
	 */
	BUG_REPORT(98, -2),

	/**
	 * Contains the results of an input dialog
	 */
	RESUME_PAUSEBUTTON(47, 6),

	/**
	 * Contains the results of an integer input dialog (or 0 if nothing was entered)
	 */
	RESUME_P_COUNTDIALOG(58, 4),

	/**
	 * Contains the results of a string input dialog
	 */
	RESUME_P_STRINGDIALOG(7, -1),

	/**
	 * Contains the results of a name input dialog
	 */
	RESUME_P_NAMEDIALOG(88, -1),

	/**
	 * Contains the results of an object (item) select dialog
	 */
	RESUME_P_OBJDIALOG(69, 2),

	/**
	 * Contains the result of a colour selection dialog (hsl)
	 */
	RESUME_P_HSLDIALOG(61, 2),

	/**
	 * A client-side request to visit the specified URL.
	 * Sent when a player clicks a link in-game.
	 */
	URL_REQUEST(102, -2),

	/**
	 * Sent whenever the player changes their "online status".
	 * Also includes legacy filters for public chat and trade status (no longer used)
	 */
	SET_CHATFILTERSETTINGS(121, 3),

	/**
	 * Sets the chat mode for the next message.
	 * 	 */
	CHAT_SETMODE(100, 1),

	/**
	 * A request to send a message in public chat to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_PUBLIC(86, -1),

	/**
	 * A request to send a private message to the specified player
	 */
	MESSAGE_PRIVATE(83, -2),

	/**
	 * A request to send a public quick chat message to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_QUICKCHAT_PUBLIC(26, -1),

	/**
	 * A request to send a private quick chat message to the specified player
	 */
	MESSAGE_QUICKCHAT_PRIVATE(67, -1),

	/**
	 * A request to add the specified name to the player's friend list.
	 */
	FRIENDLIST_ADD(64, -1),

	/**
	 * A request to add the specified name to the player's ignore list.
	 * Also includes whether the ignore is temporary (till logout)
	 */
	IGNORELIST_ADD(114, -1),

	/**
	 * A request to remove the specified name from the player's friend list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	FRIENDLIST_DEL(87, -1),

	/**
	 * A request to remove the specified name from the player's ignore list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	IGNORELIST_DEL(40, -1),

	/**
	 * Sets the note of the specified friend on the player's friends list
	 */
	FRIEND_SETNOTES(68, -1),

	/**
	 * Sets the rank of a friend within the player's friend chat channel
	 */
	FRIEND_SETRANK(74, -1),

	/**
	 * Sets the note of the specified name on the player's ignore list
	 */
	IGNORE_SETNOTES(105, -1),

	/**
	 * A request for the player to join the specified friend chat channel, if the length is greater than one.
	 * Otherwise, a request to leave the current channel.
	 */
	FRIENDCHAT_JOIN_LEAVE(3, -1),

	/**
	 * A request to kick/ban a user from the current friend chat channel.
	 */
	FRIENDCHAT_KICK(71, -1),

	/**
	 * A request for the server to send the world list
	 */
	WORLDLIST_FETCH(108, 4),

	/**
	 * A request to run the specified server-side command
	 */
	COMMAND(92, -1),

	/**
	 * A request to verify the display name chosen for a new account
	 */
	CREATE_CHECK_NAME(118, -1),

	/**
	 * A request to verify the age used for creating a new account
	 */
	CREATE_LOG_PROGRESS(70, 1),

	/**
	 * A request to verify the email address used for creating a new account
	 */
	CREATE_CHECK_EMAIL(78, -2),

	/**
	 * A request to generate a name for a new account
	 */
	CREATE_SUGGEST_NAMES(12, 0),

	/**
	 * Sends all the details for the new account
	 */
	CREATE_ACCOUNT(35, -2),

	/**
	 * Sent when the client map build is completed
	 */
	MAP_BUILD_COMPLETE(-1, 0),

	/**
	 * Sent when the cutscene which is currently playing ends
	 */
	CUTSCENE_FINISHED(107, 1);

	private final int opcode;

	ClientProtocol(int opcode, int size) {
		this.opcode = opcode;
	}

	/**
	 * Gets the opcode which the client uses to identify this packet
	 * @return The opcode
	 */
	public int getOpcode () {
		return opcode;
	}

	private static Map<Integer, ClientProtocol> lookupTable;

	public static ClientProtocol forOpcode (int opcode) {
		if (lookupTable == null) {
			lookupTable = new HashMap<>();
			for (ClientProtocol type : values()) {
				lookupTable.put(type.opcode, type);
			}
		}
		return lookupTable.get(opcode);
	}
}