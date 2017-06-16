/* globals ENGINE, MesType */

/**
 * 
 */
module.exports = (function () {
	return {
		send : sendMessage,
		sendSpam : sendSpamMessage,
		sendDebug : sendDebugMessage,
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
		ENGINE.sendFilterMessage(player, message);
	}
	
	function sendDebugMessage (player, message) {
		//For now just send a regular message, though ultimately this will be sent to admins only
		ENGINE.sendMessage(player, message);
	}

	function sendCommandResponse (player, message, console) {
		ENGINE.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
	}
})();