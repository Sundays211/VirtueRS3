
//NOTE: This should be kept in-sync with ScriptEventType.java
export enum EventType {
	/**
	 * The first option on a location
	 */
	OPLOC1 = 1,

	/**
	 * The second option on a location
	 */
	OPLOC2 = 2,

	/**
	 * The third option on a location
	 */
	OPLOC3 = 3,

	/**
	 * The fourth option on a location
	 */
	OPLOC4 = 4,

	/**
	 * The fifth option on a location
	 */
	OPLOC5 = 5,

	/**
	 * Called when a backpack item is used on a location
	 */
	OPLOCU = 6,

	/**
	 * Called when an interface component is targeted on a location
	 */
	OPLOCT = 7,

	/**
	 * The first option on an NPC
	 */
	OPNPC1 = 21,

	/**
	 * The second option on an NPC
	 */
	OPNPC2 = 22,

	/**
	 * The third option on an NPC
	 */
	OPNPC3 = 23,

	/**
	 * The fourth option on an NPC
	 */
	OPNPC4 = 24,

	/**
	 * The fifth option on an NPC
	 */
	OPNPC5 = 25,

	/**
	 * Called when an inventory item is used on an NPC
	 */
	OPNPCU = 26,

	/**
	 * Called when an interface component is targeted on an NPC
	 */
	OPNPCT = 27,

	/**
	 * The first option on a ground object
	 */
	OPOBJ1 = 41,

	/**
	 * The second option on a ground object
	 */
	OPOBJ2 = 42,

	/**
	 * The third option on a ground object
	 */
	OPOBJ3 = 43,

	/**
	 * The fourth option on a ground object
	 */
	OPOBJ4 = 44,

	/**
	 * The fifth option on a ground object
	 */
	OPOBJ5 = 45,

	/**
	 * Called when an inventory item is used on a ground object
	 */
	OPOBJU = 46,

	/**
	 * Called when an interface component is targeted on a ground object
	 */
	OPOBJT = 47,

	/**
	 * The first option on an item held in the player's inventory
	 */
	OPHELD1 = 61,

	/**
	 * The second option on an item held in the player's inventory
	 */
	OPHELD2 = 62,

	/**
	 * The third option on an item held in the player's inventory
	 */
	OPHELD3 = 63,

	/**
	 * The fourth option on an item held in the player's inventory
	 */
	OPHELD4 = 64,

	/**
	 * The fifth option on an item held in the player's inventory
	 */
	OPHELD5 = 65,

	/**
	 * Called when an inventory item is <b>used on</b> the specified inventory item
	 */
	OPHELDU = 66,

	/**
	 * The first custom option on an item the player is currently wearing
	 */
	OPWORN1 = 67,

	/**
	 * The second custom option on an item the player is currently wearing
	 */
	OPWORN2 = 68,

	/**
	 * The third custom option on an item the player is currently wearing
	 */
	OPWORN3 = 69,

	/**
	 * The fourth custom option on an item the player is currently wearing
	 */
	OPWORN4 = 70,

	/**
	 * The fifth custom option on an item the player is currently wearing
	 */
	OPWORN5 = 71,

	/**
	 * The first custom option on an item in the player's bank  = in both the withdraw and deposit screen)
	 */
	OPBANK1 = 72,

	/**
	 * The second custom option on an item in the player's bank  = deposit screen only)
	 */
	OPBANK2 = 73,

	/**
	 * The first option on an interface component
	 */
	IF_BUTTON1 = 81,

	/**
	 * The second option on an interface component
	 */
	IF_BUTTON2 = 82,

	/**
	 * The third option on an interface component
	 */
	IF_BUTTON3 = 83,

	/**
	 * The fourth option on an interface component
	 */
	IF_BUTTON4 = 84,

	/**
	 * The fifth option on an interface component
	 */
	IF_BUTTON5 = 85,

	/**
	 * The sixth option on an interface component
	 */
	IF_BUTTON6 = 86,

	/**
	 * The seventh option on an interface component
	 */
	IF_BUTTON7 = 87,

	/**
	 * The eight option on an interface component
	 */
	IF_BUTTON8 = 88,

	/**
	 * The ninth option on an interface component
	 */
	IF_BUTTON9 = 89,

	/**
	 * The tenth option on an interface component
	 */
	IF_BUTTON10 = 90,

	/**
	 * Called when an interface component is targeted on another interface component
	 */
	IF_BUTTONT = 91,

	/**
	 * Called when an interface component is dragged onto another interface component
	 */
	IF_DRAG = 92,

	/**
	 * Called when an option is selected on a chat line or chat list  = eg friends list, friends chat list, group chat, etc)
	 */
	IF_PLAYER = 93,

	/**
	 * Called when an interface is opened
	 */
	IF_OPEN = 94,

	/**
	 * Called when an interface is closed
	 */
	IF_CLOSE = 95,

	/**
	 * A catch-all event for any button on any component within the specified interface
	 */
	IF_BUTTON = 96,

	/**
	 * Called when an interface component is targeted on a player
	 */
	OPPLAYERT = 98,

	/**
	 * Called when an inventory item is used on a player. Note: In this case, the objType ID is used as the binding
	 */
	OPPLAYERU = 99,

	/**
	 * Called once every server cycle  = 600ms)
	 */
	WORLD_CYCLE = 100,

	/**
	 * Called when the specified command is entered
	 */
	COMMAND = 101,

	/**
	 * Called when the specified administrator-only command is entered
	 */
	COMMAND_ADMIN = 102,

	/**
	 * Called when the specified moderator-only command is entered
	 */
	COMMAND_MOD = 103,

	/**
	 * Called whenever a player logs in.
	 * Only one listener can be bound to this event, which should be used to call any other dependent functions
	 */
	PLAYER_LOGIN = 110,

	/**
	 * Called whenever a player logs out.
	 * Only one listener can be bound to this event, which should be used to call any other dependent functions
	 */
	PLAYER_LOGOUT = 111,
}
