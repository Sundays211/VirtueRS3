/**
 * Module containing miscellaneous utility functions
 */
/* globals ENGINE, MesType */
module.exports = init();

function init () {
	var utils = {
		INTEGER_MAX : 2147483647,
		checkOverflow : checkOverflow,
		defaultHandler : defaultHandler,
		sendCommandResponse : sendCommandResponse,
		isAdmin : isAdmin,
		testBit : testBit,
		setBit : setBit,
		unsetBit : unsetBit,
		getName : getName,
		getUserHash : getUserHash,
		fromBase37Hash : fromBase37Hash,
		toBase37Hash : toBase37Hash
	};
	return utils;
	
	/**
	 * Checks whether the addedValue would cause a Java integer overflow if added to currentValue
	 * @param currentValue The currently held value
	 * @param addedValue The value to add
	 * @returns True if an overflow would occur, false otherwise
	 */
	function checkOverflow (currentValue, addedValue) {
		return (utils.INTEGER_MAX-currentValue)<addedValue;
	}

	function defaultHandler (ctx, type) {
		if (ENGINE.isAdmin(ctx.player)) {
			ENGINE.sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: "+ctx.toString());
		} else {
			ENGINE.sendMessage(ctx.player, "Nothing interesting happens.");
		}
	}

	function sendCommandResponse (player, message, console) {
		ENGINE.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
	}
	
	function isAdmin (player) {
		return ENGINE.isAdmin(player);
	}

	function testBit (value, bit) {
		return (value & 1 << bit) !== 0;
	}

	function setBit (value, bit) {
		return value | 1 << bit;
	}

	function unsetBit (value, bit) {
		return value & -1 - (1 << bit);
	}
	
	function getName (entity) {
		return ENGINE.getName(entity);
	}
	
	function getUserHash (player) {
		return ENGINE.getUserHash(player);
	}
	
	function fromBase37Hash (hash) {
		return ENGINE.fromBase37Hash(hash);
	}
	
	function toBase37Hash (hash) {
		return ENGINE.getBase37Hash(hash);
	}
}

