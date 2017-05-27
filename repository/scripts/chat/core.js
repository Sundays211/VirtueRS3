/**
 * Core functions for the chat system
 */
/* globals ENGINE, MesType */

module.exports = (function () {
	return {
		sendMessage : sendMessage,
		sendSpamMessage : sendSpamMessage,
		sendDebugMessage : sendDebugMessage,
		sendCommandResponse : sendCommandResponse
	};
	
	function sendMessage(player, message, type) {
		if (typeof(type) !== "undefined") {
			ENGINE.sendMessage(player, message, type);
		}  else {
			ENGINE.sendMessage(player, message);
		}
	}
	
	function sendSpamMessage (player, message) {
		ENGINE.sendFilteredMessage(player, message);
	}
	
	function sendDebugMessage (player, message) {
		//For now just send a regular message, though ultimately this will be sent to admins only
		ENGINE.sendMessage(player, message);
	}

	function sendCommandResponse (player, message, console) {
		ENGINE.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
	}
})();