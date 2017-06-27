/**
 * Core functions for the chat system
 */
var messages = require('./messages');

module.exports = (function () {
	return {
		sendMessage : messages.send,
		sendSpamMessage : messages.sendSpam,
		sendDebugMessage : messages.sendDebug,
		sendCommandResponse : messages.sendCommandResponse
	};
})();