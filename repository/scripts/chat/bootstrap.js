/**
 * Module to initialise the chat system script bindings.
 */
module.exports = function (scriptManager) {
	require('./chatbox')(scriptManager);
	require('./friend-list')(scriptManager);
	require('./friend-chat')(scriptManager);
	require('./friend-chat-settings')(scriptManager);
	require('./chat-settings')(scriptManager);
};