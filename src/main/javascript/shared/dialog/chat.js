/**
 * 
 */
var builder = require('./builder');

module.exports = (function () {
	return {
		chatplayer : chatplayer,
		chatnpc : chatnpc,
		mesbox : mesbox,
		objbox : objbox
	};

	function chatplayer (player, message, expression) {
		return builder(player).chatplayer(message, expression);
	}

	function chatnpc (player, npc, message, expression) {
		return builder(player).chatnpc(npc, message, expression);
	}

	function mesbox (player, message) {
		return builder(player).mesbox(message);
	}

	function objbox (player, obj, message) {
		return builder(player).objbox(obj, message);
	}
})();