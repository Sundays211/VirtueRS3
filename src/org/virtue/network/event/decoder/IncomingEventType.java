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
	KEEP_ALIVE(14, 0),
	
	/**
	 * Sends the keys which are currently pressed on the client keyboard
	 */
	EVENT_KEYBOARD(51, -2),
	
	/**
	 * Transmits whenever the player clicks on an element in the client
	 */
	EVENT_MOUSE_CLICK(60, 6),
	
	/**
	 * Another version of the mouse click packet. Not sure why there's two of these...
	 */
	EVENT_MOUSE_CLICK_2(3, 7),
	
	/**
	 * Sends the recent movements of the client mouse. Mostly useless, besides preventing auto-logout or tracking bots.
	 */
	EVENT_MOUSE_MOVE(70, -1),
	
	/**
	 * Another version of the mouse movement packet. Not sure why there's two of these...
	 */
	EVENT_MOUSE_MOVE_2(80, -1),
	
	/**
	 * Transmits whenever the client applet window gains or looses focus (eg switching tabs/windows on the client machine)
	 */
	EVENT_APPLET_FOCUS(111, 1),
	
	/**
	 * Transmits whenever the client's camera is rotated
	 */
	EVENT_CAMERA_POSITION(39, 4),
	
	/**
	 * Includes the current display mode, window size, and screen size method (fixed, resizable, full screen).
	 * Sent on login and whenever any of the settings change.
	 */
	WINDOW_STATUS(79, 6),
	
	/**
	 * Transmits once every 30-ish seconds. Includes the frame-per-second rate, ping rate, and heap size of the client.
	 */
	CLIENT_STATISTICS(81, 4),
	
	/**
	 * Transmits whenever a variable or interface is updated. Increments on every update.
	 */
	TRANSMITVAR_VERIFYID(77, 4),
	
	/**
	 * Clicked on the minimap in a request to "Walk" to the specified position
	 */
	MOVE_MINIMAP(78, 18),
	
	/**
	 * Clicked on the game scene in a request to "Walk" to the specified position
	 */
	MOVE_GAMESCENE(8, 5),
	
	/**
	 * The first context-menu option selected on an interface action button component
	 */
	IF_OPTION_1(64, 8),
	
	/**
	 * The second context-menu option selected on an interface action button component
	 */
	IF_OPTION_2(109, 8),
	
	/**
	 * The third context-menu option selected on an interface action button component
	 */
	IF_OPTION_3(16, 8),	
	
	/**
	 * The fourth context-menu option selected on an interface action button component
	 */
	IF_OPTION_4(88, 8),	
	
	/**
	 * The fifth context-menu option selected on an interface action button component
	 */
	IF_OPTION_5(41, 8),
	
	/**
	 * The sixth context-menu option selected on an interface action button component
	 */
	IF_OPTION_6(12, 8),
	
	/**
	 * The seventh context-menu option selected on an interface action button component
	 */
	IF_OPTION_7(45, 8),
	
	/**
	 * The eighth context-menu option selected on an interface action button component
	 */
	IF_OPTION_8(19, 8),
	
	/**
	 * The ninth context-menu option selected on an interface action button component
	 */
	IF_OPTION_9(56, 8),
	
	/**
	 * The tenth context-menu option selected on an interface action button component
	 */
	IF_OPTION_10(110, 8),
	
	/**
	 * Called when an item on an interface is used on another item on an interface
	 */
	IF_ON_IF(25, 16),
	
	/**
	 * Called when an interface is dragged onto another interface
	 */
	IF_DRAG(75, 16),
	
	/**
	 * Called when the client-side "closeWidgets" code is run
	 */
	CLOSE_MODAL(115, 0),
	
	/**
	 * The first context-menu option selected on a scene location
	 */
	LOC_OPTION_1(86, 9),
	
	/**
	 * The second context-menu option selected on a scene location
	 */
	LOC_OPTION_2(100, 9),
	
	/**
	 * The third context-menu option selected on a scene location
	 */
	LOC_OPTION_3(0, 9),
	
	/**
	 * The fourth context-menu option selected on a scene location
	 */
	LOC_OPTION_4(95, 9),
	
	/**
	 * The fifth context-menu option selected on a scene location
	 */
	LOC_OPTION_5(40, 9),
	
	/**
	 * The sixth context-menu option selected on a scene location (usually "examine")
	 */
	LOC_OPTION_6(69, 9),
	
	/**
	 * Called when an item on an interface is used on a game scene location
	 */
	IF_ON_LOC(44, 17),
	
	/**
	 * The first context-menu option selected on a ground item
	 */
	ITEM_OPTION_1(24, 7),
	
	/**
	 * The second context-menu option selected on a ground item
	 */
	ITEM_OPTION_2(30, 7),
	
	/**
	 * The third context-menu option selected on a ground item
	 */
	ITEM_OPTION_3(26, 7),
	
	/**
	 * The fourth context-menu option selected on a ground item
	 */
	ITEM_OPTION_4(74, 7),
	
	/**
	 * The fifth context-menu option selected on a ground item
	 */
	ITEM_OPTION_5(59, 7),
	
	/**
	 * The sixth context-menu option selected on a ground item (usually "examine")
	 */
	ITEM_OPTION_6(32, 7),
	
	/**
	 * The first context-menu option selected on an npc
	 */
	NPC_OPTION_1(106, 3),
	
	/**
	 * The second context-menu option selected on an npc
	 */
	NPC_OPTION_2(49, 3),
	
	/**
	 * The third context-menu option selected on an npc
	 */
	NPC_OPTION_3(33, 3),
	
	/**
	 * The fourth context-menu option selected on an npc
	 */
	NPC_OPTION_4(99, 3),
	
	/**
	 * The fifth context-menu option selected on an npc
	 */
	NPC_OPTION_5(103, 3),
	
	/**
	 * The sixth context-menu option selected on an npc (usually "examine")
	 */
	NPC_OPTION_6(66, 3),
	
	/**
	 * Called when an interface is used on an npc
	 */
	IF_ON_NPC(37, 11),
	
	/**
	 * The first context-menu option selected on another player
	 */
	PLAYER_OPTION_1(10, 3),
	
	/**
	 * The second context-menu option selected on another player
	 */
	PLAYER_OPTION_2(43, 3),
	
	/**
	 * The third context-menu option selected on another player
	 */
	PLAYER_OPTION_3(93, 3),
	
	/**
	 * The fourth context-menu option selected on another player
	 */
	PLAYER_OPTION_4(114, 3),
	
	/**
	 * The fifth context-menu option selected on another player
	 */
	PLAYER_OPTION_5(91, 3),
	
	/**
	 * The sixth context-menu option selected on another player
	 */
	PLAYER_OPTION_6(89, 3),
	
	/**
	 * The seventh context-menu option selected on another player
	 */
	PLAYER_OPTION_7(72, 3),
	
	/**
	 * The eighth context-menu option selected on another player
	 */
	PLAYER_OPTION_8(92, 3),
	
	/**
	 * The ninth context-menu option selected on another player
	 */
	PLAYER_OPTION_9(53, 3),
	
	/**
	 * The tenth context-menu option selected on another player
	 */
	PLAYER_OPTION_10(28, 3),
	
	/**
	 * Called when an item on an interface is used on a player
	 */
	IF_ON_PLAYER(55, 11),
	
	/**
	 * Sends changes to client variables which are specified to transmit on change. 
	 * Used to update the interface layout.
	 */
	VARC_TRANSMIT(104, -2),
	
	/**
	 * A player "report-abuse" request. Includes the player name, ruleID, and whether to mute the player.
	 */
	ABUSE_REPORT(-1, -1),
	
	/**
	 * A bug report sent by a player. Includes the category, reproduce steps, and description
	 */
	BUG_REPORT(97, -2),
	
	/**
	 * Contains the results of an input dialog
	 */
	RESUME_PAUSEBUTTON(105, 6),
	
	/**
	 * Contains the results of an integer input dialog (or 0 if nothing was entered)
	 */
	RESUME_P_COUNTDIALOG(62, 4),
	
	/**
	 * Contains the results of a string input dialog
	 */
	RESUME_P_STRINGDIALOG(38, -1),
	
	/**
	 * Contains the results of a name input dialog
	 */
	RESUME_P_NAMEDIALOG(17, -1),
	
	/**
	 * Contains the results of an object (item) select dialog
	 */
	RESUME_P_OBJDIALOG(5, 2),
	
	/**
	 * Contains the result of a colour selection dialog (hsl)
	 */
	RESUME_P_HSLDIALOG(87, 2),
	
	/**
	 * A client-side request to visit the specified URL. 
	 * Sent when a player clicks a link in-game.
	 */
	URL_REQUEST(35, -2),
	
	/**
	 * Sent whenever the player changes their "online status". 
	 * Also includes legacy filters for public chat and trade status (no longer used)
	 */
	ONLINE_STATUS(1, 3),
	
	/**
	 * Sets the chat mode for the next message. 
	 * Modes include public (0), friendchat (1), clanchat (2), guestclanchat (3), groupchat (4), and teamgroupchat (5)
	 */
	CHAT_SETMODE(18, 1),
	
	/**
	 * A request to send a message in public chat to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_PUBLIC(54, -1),
	
	/**
	 * A request to send a private message to the specified player
	 */
	MESSAGE_PRIVATE(83, -2),
	
	/**
	 * A request to send a public quick chat message to nearby players.
	 * This packet includes chats for all other types (friendchat, clanchat, groupchat, etc), apart from private messages.
	 */
	MESSAGE_QUICKCHAT_PUBLIC(36, -1),
	
	/**
	 * A request to send a private quick chat message to the specified player
	 */
	MESSAGE_QUICKCHAT_PRIVATE(63, -1),
	
	/**
	 * A request to add the specified name to the player's friend list.
	 */
	FRIENDLIST_ADD(23, -1),
	
	/**
	 * A request to add the specified name to the player's ignore list. 
	 * Also includes whether the ignore is temporary (till logout)
	 */
	IGNORELIST_ADD(9, -1),
	
	/**
	 * A request to remove the specified name from the player's friend list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	FRIENDLIST_DEL(20, -1),
	
	/**
	 * A request to remove the specified name from the player's ignore list
	 * Note that the name is automatically removed on the client side; this only requires it to be removed on the server side
	 */
	IGNORELIST_DEL(65, -1),
	
	/**
	 * Sets the note of the specified name on the player's ignore list
	 */
	IGNORE_SETNOTE(68, -1),
	
	/**
	 * Sets the note of the specified friend on the player's friends list
	 */
	FRIEND_SETNOTE(108, -1),
	
	/**
	 * Sets the rank of a friend within the player's friend chat channel
	 */
	FRIEND_SETRANK(42, -1),
	
	/**
	 * A request for the player to join the specified friend chat channel, if the length is greater than one.
	 * Otherwise, a request to leave the current channel.
	 */
	FRIENDCHAT_JOIN_LEAVE(13, -1),
	
	/**
	 * A request to kick/ban a user from the current friend chat channel. 
	 */
	FRIENDCHAT_KICK(2, -1),
	
	/**
	 * Selected an option on an interface relating to chat
	 */
	CHAT_USER_OPTION(34, -1),
	
	/**
	 * A request for the server to send the world list
	 */
	WORLDLIST_FETCH(7, 4),
	
	/**
	 * A request to run the specified server-side command
	 */
	COMMAND(82, -1),
	
	/**
	 * A request to verify the display name chosen for a new account
	 */
	CREATION_CHECK_NAME(117, -1),
	
	/**
	 * A request to verify the age used for creating a new account
	 */
	CREATION_CHECK_AGE(15, 1),
	
	/**
	 * A request to verify the email address used for creating a new account
	 */
	CREATION_CHECK_EMAIL(21, -2),
	
	/**
	 * A request to generate a name for a new account
	 */
	CREATION_GENERATE_NAME(116, 0),
	
	/**
	 * Sends all the details for the new account
	 */
	CREATION_SUBMIT(11, -2),
	
	/**
	 * Sent when the client map build is completed
	 */
	MAP_BUILD_COMPLETE(46, 0),
	
	/**
	 * Sent when the cutscene which is currently playing ends
	 */
	CUTSCENE_END(52, 1);
	
	private final int opcode;
	
	private IncomingEventType (int opcode) {
		this(opcode, -3);
	}
	
	private IncomingEventType (int opcode, int size) {
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
			lookupTable = new HashMap<Integer, IncomingEventType>();
			for (IncomingEventType type : values()) {
				lookupTable.put(type.opcode, type);
			}
		}
		return lookupTable.get(Integer.valueOf(opcode));
	}
}
