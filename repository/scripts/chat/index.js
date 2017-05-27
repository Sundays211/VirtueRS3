/**
 * Module to initialise the chat system script bindings.
 */
var chat = require('./core');

module.exports = (function () {
	return {
		init : init,
		sendMessage : chat.sendMessage,
		sendSpamMessage : chat.sendSpamMessage,
		sendDebugMessage : chat.sendDebugMessage,
		sendCommandResponse : chat.sendCommandResponse
	};
	
	function init (scriptManager) {
		require('./chatbox')(scriptManager);
		require('./friend-list')(scriptManager);
		require('./friend-chat')(scriptManager);
		require('./friend-chat-settings')(scriptManager);
		require('./chat-settings')(scriptManager);
	}
})();